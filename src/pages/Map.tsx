import React, { useRef, useCallback } from "react";
import { routeMockData } from "../mocks/route-mock";
import {
  GoogleMap,
//   LoadScript,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import GoBackHeader from "../components/GoBackHeader/GoBackHeader";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  width: "375px",
  height: "400px",
};

const Map: React.FC = () => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  }

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_Google_API_KEY,
  });

  const handleOnLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const handleStepFocus = (lat: number, lng: number) => {
    if (mapRef.current) {
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(16);
    }
  };

  const getPolylineData = (linestring: string) => {
    return linestring.split(" ").map((coord) => {
      const [lng, lat] = coord.split(",").map(Number);
      return { lat, lng };
    });
  };

  const startLocation = {
    lat: parseFloat(routeMockData.metaData.requestParameters.startY),
    lng: parseFloat(routeMockData.metaData.requestParameters.startX),
  };

  const endLocation = {
    lat: parseFloat(routeMockData.metaData.requestParameters.endY),
    lng: parseFloat(routeMockData.metaData.requestParameters.endX),
  };

  const polylines = routeMockData.metaData.plan.itineraries[0].legs.map(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (leg, _index) => ({
      path: getPolylineData(
        leg.steps
          ? leg.steps.map((step) => step.linestring).join(" ")
          : leg.passShape?.linestring
      ),
      color: leg.mode === "WALK" ? "#8F8F8F" : `#${leg.routeColor}`,
    })
  );

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
        <GoBackHeader onBack={handleGoBack} />
        <div className="w-full flex flex-col items-center justify-center">
        {/* <LoadScript googleMapsApiKey={import.meta.env.VITE_Google_API_KEY}> */}
            <GoogleMap
            mapContainerStyle={containerStyle}
            center={{
                lat: Number(routeMockData.metaData.requestParameters.startY),
                lng: Number(routeMockData.metaData.requestParameters.startX),
            }}
            zoom={14}
            onLoad={handleOnLoad}
            >
            {/* 출발지 도착지 마커 (컴포넌트화 가능) */}
            <Marker
                position={startLocation}
                label={`My current location`}
            />
            <Marker
                position={endLocation}
                label={`고궁의 아침(Gogungui Achim)`}
            />

            {/* Polyline 그려주기 (컴포넌트화 필요) */}
            {polylines.map((polyline, index) => (
                <Polyline
                path={polyline.path}
                key={index}
                options={{
                    strokeColor: polyline.color,
                    strokeWeight: 6,
                    strokeOpacity: 0.8,
                }}
                />
            ))}
            </GoogleMap>
        {/* </LoadScript> */}
        {/* 바텀시트 */}
        <div className="w-full h-72 flex flex-col justify-start items-start pt-4 gap-4 overflow-y-auto">
        {routeMockData.metaData.plan.itineraries[0].legs.map((leg, index) => {
            const routeInfo = leg.Lane
                ? leg.Lane.filter((lane) => lane.service === 1)
                    .map((lane) => lane.route)
                    .join(", ")
                : "";

            return (
                <div
                key={index}
                className="w-full border rounded-lg p-4 flex flex-col items-start justify-center mb-2"
                onClick={() => handleStepFocus(leg.start.lat, leg.start.lon)}
                >
                <div className="flex items-center mb-2">
                    {leg.mode === "WALK" ? (
                    <span className="text-lg mr-2">🚶</span>
                    ) : (
                    <span className="text-lg mr-2">🚌</span>
                    )}
                    <span className="font-bold">
                    {leg.mode === "WALK"
                        ? `Walk to ${leg.end.name}`
                        : `Board Bus ${routeInfo} at ${leg.start.name}`}
                    </span>
                </div>
                <div className="text-sm text-gray-500">
                    {leg.distance / 1000} km in {Math.ceil(leg.sectionTime / 60)}{" "}
                    minutes
                </div>
                {leg.mode === "BUS" && (
                    <div className="text-xs text-gray-400">
                    Move {leg.passStopList?.stationList.length} stops
                    </div>
                )}
                </div>
            );
            })}
        </div>
        </div>
    </>
  );
};

export default Map;

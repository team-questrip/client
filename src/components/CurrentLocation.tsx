import { useNavigate } from "react-router-dom";

interface CurrentLocationProps {
  show?: boolean;
}

const lat = localStorage.getItem("latitude");
const lng = localStorage.getItem("longitude");

const CurrentLocation = ({ show = true }: CurrentLocationProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/", {
      state: {
        location: {
          lat,
          lng,
        },
      },
    });
  };

  return (
    <div
      hidden={!show}
      className="absolute left-0 top-[8.5%] h-screen w-[375px] z-10 bg-white"
    >
      <button onClick={handleClick} className="opacity-50">
        Use Current Location
      </button>
    </div>
  );
};

export default CurrentLocation;

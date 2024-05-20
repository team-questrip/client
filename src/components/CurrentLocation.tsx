import React from "react";

interface CurrentLocationProps {
  show?: boolean;
}

const CurrentLocation = ({ show = true }: CurrentLocationProps) => {
  const handleClick = () => {
    // to do: 현재 위치 넘겨주기.
  };
  return (
    <div hidden={!show}>
      <button onClick={handleClick}>Use Current Location</button>
    </div>
  );
};

export default CurrentLocation;

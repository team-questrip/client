interface CurrentLocationProps {
  show?: boolean;
}

const CurrentLocation = ({ show = true }: CurrentLocationProps) => {
  const handleClick = () => {
    // to do: 현재 위치 넘겨주기.
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

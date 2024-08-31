interface OpenNowProps {
  openNow: string;
}

// base ui의 Tag로 구현하려고 했는데 타입이 이상해서 작동을 안함;
const OpenNow = ({ openNow }: OpenNowProps) => {
  return (
    <>
      <span
        className={`${
          openNow === 'OPEN'
            ? 'bg-success'
            : openNow === 'CLOSE'
            ? 'bg-error'
            : 'bg-warning'
        } text-white inline-block py-1 px-2 rounded-md text-sm`}
      >
        {openNow}
      </span>
    </>
  );
};

export default OpenNow;

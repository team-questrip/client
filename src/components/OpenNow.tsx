import Label from './ui/Label';

interface OpenNowProps {
  openNow: string;
}

// base ui의 Tag로 구현하려고 했는데 타입이 이상해서 작동을 안함;
const OpenNow = ({ openNow }: OpenNowProps) => {
  return (
    <>
      <Label
        className={`${
          openNow === 'OPEN'
            ? 'bg-success'
            : openNow === 'CLOSE'
            ? 'bg-error'
            : 'bg-warning'
        }`}
      >
        {openNow}
      </Label>
    </>
  );
};

export default OpenNow;

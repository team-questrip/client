import Label from './Label';

interface TagProps {
  openNow: string;
}

const Tag = ({ openNow }: TagProps) => {
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

export default Tag;

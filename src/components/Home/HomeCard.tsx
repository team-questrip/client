import { Link } from 'react-router-dom';

interface HomeCardProps {
  img: string;
  category: string;
  categoryEnumName: string;
  cnt: number;
  onClick?: () => void;
}

const HomeCard = ({
  img,
  category,
  categoryEnumName,
  cnt,
  onClick,
}: HomeCardProps) => {
  return (
    <Link
      to={`/discover?category=${categoryEnumName}`}
      onClick={onClick}
      className="cursor-pointer"
    >
      <div className="w-full h-40 p-4 bg-white rounded-2xl border flex-col justify-start items-start gap-3 inline-flex">
        <div className="h-12 flex-col justify-start items-start flex">
          <div className="w-12 h-12 relative">
            <img className="w-12 h-12 left-0 top-0 absolute" src={img} />
            <div className="w-5 h-5 left-0 top-0 absolute" />
          </div>
        </div>
        <div className="h-11 flex-col justify-start items-start gap-1 flex">
          <div className="flex-col justify-start items-start flex">
            <div className="text-primaryText font-bold text-sm">{category}</div>
          </div>
          <div className="flex-col justify-start items-start flex">
            <div className="text-secondaryText text-sm">{cnt} Places</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HomeCard;

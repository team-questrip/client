import '/img/undraw_page_not_found.svg';

interface NotFoundProps {
  description?: string;
}

const NotFound = ({ description }: NotFoundProps) => {
  return (
    <div className="w-full h-[70vh] flex flex-col justify-center items-center ">
      <div>
        <img src="/img/undraw_page_not_found.svg" alt="logo" />
        <div className=" font-bold text-xl text-center pt-10">
          {description ? description : 'Not Found'}
        </div>
      </div>
    </div>
  );
};

export default NotFound;

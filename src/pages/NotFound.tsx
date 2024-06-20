import '/img/undraw_page_not_found.svg';

const NotFound = () => {
  return (
    <div className="w-full h-[70vh] flex flex-col justify-center items-center ">
      <div>
        <img src="/img/undraw_page_not_found.svg" alt="logo" />
        <div className=" font-bold text-xl text-center pt-10">Not Found</div>
      </div>
    </div>
  );
};

export default NotFound;

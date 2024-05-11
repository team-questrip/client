import { useQuery } from '@tanstack/react-query';
import FetchAddress from '../api/FetchAddress';

const Home = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['address'],
    queryFn: FetchAddress,
  });

  let content;

  if (isPending) {
    content = <div>Loading...</div>;
  }

  if (isError) {
    content = <div>error</div>;
  }

  if (data) {
    content = <div>{data as string}</div>;
  }

  return (
    <div>
      <div className="text-right">⚙️</div>
      <h1 className="font-semibold text-3xl mb-3">Questrip</h1>
      <div className="flex justify-between items-center">
        {content}
        <button className="ml-2 bg-mainColor rounded-xl text-center w-20 p-1 cursor-pointer">
          Change
        </button>
      </div>
    </div>
  );
};
export default Home;

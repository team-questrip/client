import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const DetailPage = () => {
  const latitudeValue = useSelector(
    (state: RootState) => state.addressData.latitude
  );
  const longitudeValue = useSelector(
    (state: RootState) => state.addressData.longitude
  );

  console.log(latitudeValue);
  console.log(longitudeValue);

  return (
    <div>
      <header className="pb-3">⬅️</header>
      <div>dd</div>
    </div>
  );
};

export default DetailPage;

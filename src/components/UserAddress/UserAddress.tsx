import { useEffect, useState } from 'react';
import { UserCurrentPosition } from '../../types/current-position';
import { fetchAddress } from '../../api/address';
import { useErrorBoundary } from 'react-error-boundary';

interface UserAddressProps {
  userCurrentPosition: UserCurrentPosition;
}

const UserAddress = ({
  userCurrentPosition: { latitude, longitude },
}: UserAddressProps) => {
  const [address, setAddress] = useState<string>();
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    fetchAddress(latitude, longitude).then(
      (res) => {
        setAddress(res.data.formattedAddress);
      },
      (error) => {
        showBoundary(error);
      }
    );
  }, [latitude, longitude, showBoundary]);
  return <div>{address}</div>;
};

export default UserAddress;

import { useEffect, useState } from 'react';
import { UserCurrentPosition } from '../types/current-position';
import { fetchAddress } from '../api/address';

interface UserAddressProps {
  userCurrentPosition: UserCurrentPosition;
}

const UserAddress = ({
  userCurrentPosition: { latitude, longitude },
}: UserAddressProps) => {
  const [address, setAddress] = useState<string>();

  useEffect(() => {
    fetchAddress(latitude, longitude).then((res) => {
      setAddress(res.data.formattedAddress);
    });
  }, [latitude, longitude]);
  return <div>{address}</div>;
};

export default UserAddress;

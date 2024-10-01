import { useNavigate } from 'react-router-dom';
import GoBackHeader from '../components/GoBackHeader/GoBackHeader';
import { Avatar } from 'baseui/avatar';
import { Select, Value } from 'baseui/select';
import { useState } from 'react';
import { useUserStore } from '../store/user';
import { logout } from '../api/user';

const MyPage = () => {
  const [language, setLanguage] = useState<Value>([]);
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  const handleSignOut = () => {
    logout();
    navigate('/sign-in');
  };

  return (
    <>
      <div>
        <GoBackHeader
          onBack={() => {
            navigate(-1);
          }}
        />
        <div className="w-full h-12 inline-flex justify-start items-center">
          <div className="text-2xl text-primaryText font-bold">My Page</div>
        </div>
      </div>
      <div className="w-full p-4 justify-center items-center inline-flex">
        <div className="flex-col justify-center items-center gap-4 inline-flex">
          <div className="flex-col justify-start items-center gap-4 flex">
            <Avatar name="Username Goese Here" size="114px" />
            <div className="flex-col justify-center items-center flex">
              <div className="flex-col justify-start items-center flex">
                <div className="text-primaryText font-bold text-xl">
                  {user?.username}
                </div>
              </div>
              <div className="flex-col justify-start items-center flex">
                <div className="text-secondaryText">{user?.email}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-14 px-4 justify-between items-center inline-flex">
        <div className="flex-col justify-start items-start inline-flex">
          <div className="self-stretch text-sm font-normal">Language</div>
        </div>
        <div className="w-[170px] h-[35px] pl-[22px] pr-[13px] bg-white rounded-[10px] justify-between items-center flex">
          <Select
            options={[
              { label: 'English', value: 'EN' },
              { label: 'Chinese', value: 'CN' },
              { label: 'Japanese', value: 'JP' },
            ]}
            labelKey="label"
            valueKey="value"
            onChange={({ value }) => setLanguage(value)}
            value={language}
          />
        </div>
      </div>
      <button
        className="w-full h-14 flex justify-center items-center"
        onClick={handleSignOut}
      >
        <span className="text-sm font-bold">Sign Out</span>
      </button>
    </>
  );
};

export default MyPage;

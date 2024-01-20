import { useSelector } from 'react-redux';

const UserPage = () => {
  const { user } = useSelector((state) => state.user.user);
  return <div>{user.name}</div>;
};

export default UserPage;

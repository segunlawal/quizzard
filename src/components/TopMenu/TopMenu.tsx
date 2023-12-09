import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import NavItems from './NavItems';

const TopMenu = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-indigo-100 lg:pl-56 pr-3 pl-10 py-3 border-b-[1px] border-b-custom-black flex justify-between items-center">
      <h2 className="text-lg font-semibold text-custom-black">
        Welcome, {session?.user?.name}
      </h2>
      <div>
        <NavItems />
      </div>
    </div>
  );
};

export default TopMenu;

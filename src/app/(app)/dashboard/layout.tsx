import Sidebar from '@/components/Sidebar/Sidebar';
import TopMenu from '@/components/TopMenu/TopMenu';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const layout = (props: Props) => {
  return (
    <div className="flex mx-auto w-full">
      <Sidebar />
      <main className="w-full">
        <TopMenu />
        {props.children}
      </main>
    </div>
  );
};

export default layout;

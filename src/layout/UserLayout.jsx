
import React from 'react';

import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
     <Header/>
      <main >
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;

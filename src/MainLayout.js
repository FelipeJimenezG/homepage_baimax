import React from 'react';
import NavBar from './Components/NavBar';

const MainLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default MainLayout;

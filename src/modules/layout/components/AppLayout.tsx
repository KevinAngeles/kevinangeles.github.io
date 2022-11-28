import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

interface Props {
  children: React.ReactNode;
}

export const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="container">
      <Header/>
      {children}
      <Footer/>
    </div>
  )
};
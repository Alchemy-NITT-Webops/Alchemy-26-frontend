import React from "react";
import sub1 from "../../assets/Subtract.svg";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className=" border-b-2 border-white py-5 px-8 h-20 flex w-screen">
      <h1 className="h-8 text-white font-montserrat text-3xl">{title}</h1>
      <button className=" px-4 py-2 font-chakraPetch text-xs font-extrabold invisible md:visible fixed right-48 top-3 flex items-center">
        <img src={sub1} className="h-9" />
        <p className="bg-cyan h-9 px-4 py-2.5 text-center">REGISTER</p>
        <img src={sub1} className="h-9 rotate-180" />
      </button>
    </header>
  );
};

export default Header;

import React from "react";
import logo from "../ASSETS/logo.svg";

const AnimatedLogo = () => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center min-h-screen bg-white">
      <img src={logo} alt="logo" className="w-[120px] h-[120px] animate-rotateAndColor" />
      <p className="font-bold uppercase">Nexangle</p>
    </div>
  );
};

export default AnimatedLogo;

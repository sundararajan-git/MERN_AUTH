import React, { useState } from "react";
import logo from "../../ASSETS/logo.svg";
import { FaUserAstronaut } from "react-icons/fa";
import Profile from "../../COMPONENTS/Profile";
import { useSelector } from "react-redux";

const Home = () => {
  // USER INFO FROM THE REDUX
  const user = useSelector((state) => {
    return state.userInfo.user;
  });

  // CONTROL THE COMPONENTS
  const [conHome, setConHome] = useState({
    profile: false,
  });

  // PROFILE CLCIK HANDLER
  const profileHanlder = () => {
    try {
      setConHome((prev) => {
        return { ...prev, profile: true };
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="w-full h-full flex flex-col overflow-auto">
      <header className="container flex items-center justify-between w-full sm:w-5/6 mx-auto p-4 sticky top-0 left-0 right-0 bg-white">
        <div className="flex items-center gap-2">
          <img src={logo} className="w-[30px]" />
          <span className="font-bold sm:text-lg">AUTH .</span>
        </div>
        <div
          className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full cursor-pointer"
          onClick={profileHanlder}
        >
          <p className="font-medium  hidden sm:block">{user?.name}</p>
          <FaUserAstronaut size={25} className="text-red-1100" />
        </div>
      </header>
      <body className="flex flex-col w-full sm:w-3/4 h-full mx-auto">
        {[1, 2, 3, 4, 5].map((item) => {
          return (
            <div
              className="container mx-auto px-5 py-2 lg:px-32 sm:w-full"
              key={item}
            >
              <div className="-m-1 flex flex-wrap md:-m-2">
                <div className="flex w-1/2 flex-wrap">
                  <div className="w-1/2 p-1 md:p-2">
                    <img
                      alt="gallery"
                      className="block h-full w-full rounded-lg object-cover object-center"
                      src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp"
                    />
                  </div>
                  <div className="w-1/2 p-1 md:p-2">
                    <img
                      alt="gallery"
                      className="block h-full w-full rounded-lg object-cover object-center"
                      src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp"
                    />
                  </div>
                  <div className="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      className="block h-full w-full rounded-lg object-cover object-center"
                      src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
                    />
                  </div>
                </div>
                <div className="flex w-1/2 flex-wrap">
                  <div className="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      className="block h-full w-full rounded-lg object-cover object-center"
                      src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp"
                    />
                  </div>
                  <div className="w-1/2 p-1 md:p-2">
                    <img
                      alt="gallery"
                      className="block h-full w-full rounded-lg object-cover object-center"
                      src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp"
                    />
                  </div>
                  <div className="w-1/2 p-1 md:p-2">
                    <img
                      alt="gallery"
                      className="block h-full w-full rounded-lg object-cover object-center"
                      src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(77).webp"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </body>
      {conHome?.profile && (
        <Profile data={conHome?.profile} close={setConHome} />
      )}
    </section>
  );
};

export default Home;

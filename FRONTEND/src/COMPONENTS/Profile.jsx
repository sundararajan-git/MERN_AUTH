import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import axios from "../LIB/axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Profile = (props) => {
  // PROPS
  const { data, close } = props;

  // USER INFO FROM THE REDUX
  const user = useSelector((state) => {
    return state.userInfo.user;
  });

  // CONTROL THE COMPONETS
  const [conPro, setConPro] = useState({
    btnloading: false,
  });

  // NAVIGATE HOOK
  const navigate = useNavigate();

  // MODEL CLOSE HANDLER
  const modelCloseHandler = () => {
    try {
      close((prev) => {
        return { ...prev, profile: false };
      });
    } catch (err) {
      console.error(err);
    }
  };

  // LOGOUT HANLDER
  const logoutHanlder = async () => {
    try {
      setConPro((prev) => {
        return { ...prev, btnloading: true };
      });

      const logRes = await axios.post("logout", {
        email: "sundararajan.sfhl@gmail.com",
      });

      if (logRes.data.success) {
        toast.success("Logout successfuly");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response.data.message);
      setConPro((prev) => {
        return { ...prev, btnloading: false };
      });
    }
  };

  return (
    <section className="fixed top-0 left-0 right-0 w-full h-full bg-gray-300/70 p-4 flex  justify-center">
      <div className="bg-white w-full sm:w-1/2 md:w-2/5 lg:w-1/4 h-fit rounded-lg mt-24 p-4">
        <div className="flex items-center justify-between pb-4">
          <h1 className="text-red-1100 uppercase font-medium text-center">
            Profile
          </h1>
          <button
            type="button"
            className="end-2.5 text-gray-900 bg-transparent hover:bg-red-200 hover:text-red-600 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            onClick={modelCloseHandler}
            disabled={conPro?.btnloading}
          >
            <IoMdClose size={18} />
          </button>
        </div>

        <div className="w-full  mx-auto text-sm pt-4">
          <ul className="flex justify-between pb-2">
            <li>Name</li>
            <li>{user?.name}</li>
          </ul>
          <ul className="flex justify-between">
            <li>Email</li>
            <li>{user?.email}</li>
          </ul>
          <br />
          <div className="flex justify-between items-center">
            <Link
              to="/forgot-password"
              className="hover:text-green-600 cursor-pointer hover:underline"
            >
              Forgot password ?
            </Link>
            <button
              type="button"
              className="p-2 bg-gray-50 rounded-lg font-medium hover:text-red-1100 shadow flex items-center gap-2"
              onClick={logoutHanlder}
              disabled={conPro?.btnloading}
            >
              Logout
              <RiLogoutCircleRLine size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;

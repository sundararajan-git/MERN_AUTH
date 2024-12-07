import React, { useEffect, useState } from "react";
import axios from "../../LIB/axios.js";
import { validateForm } from "../COMMON/Common.js";
import toast from "react-hot-toast";
import { BtnLoader } from "../../COMPONENTS/BtnLoader.jsx";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  // CONTROL THE COMPONENT
  const [controlSig, setControSig] = useState({
    btnloading: false,
  });

  // NAVAIGATE HOOK
  const navigate = useNavigate();

  // SIGNUP HANDLER
  const signUpHandler = async () => {
    try {
      const form = document.forms["signup"];
      const isValid = validateForm(form);

      if (!isValid) {
        toast.error("Invalid Filed !");
        return null;
      }

      setControSig((prev) => {
        return { ...prev, btnloading: true };
      });

      const data = new FormData(form);
      const Datajson = Object.fromEntries(data);
      const signupRes = await axios.post("signup", Datajson);

      if (signupRes?.data?.success) {
        toast.success("Sign up sucessfully");
        navigate("/verification");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
      setControSig((prev) => {
        return { ...prev, btnloading: false };
      });
    }
  };

  return (
    <section className="flex items-center justify-center w-full h-full">
      <form
        className="w-full p-4 sm:p-0 sm:w-1/2 md:w-2/5 lg:w-1/3 xl:w-1/4  text-sm flex flex-col gap-3"
        name="signup"
      >
        <h4 className="text-red-1100 font-bold text-base sm:text-lg">
          SIGN UP
        </h4>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="border border-gray-300 outline-none rounded-lg p-2 focus:ring-1 focus:ring-red-400 focus:border-red-1100"
            name="name"
            id="name"
            placeholder="name"
            required
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="border border-gray-300 outline-none rounded-lg p-2 focus:ring-1 focus:ring-red-400 focus:border-red-1100"
            name="email"
            id="email"
            placeholder="email"
            required
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="border border-gray-300 outline-none rounded-lg p-2 focus:ring-1 focus:ring-red-400 focus:border-red-1100"
            name="password"
            id="password"
            placeholder="password"
            required
          />
        </div>
        <div className="flex flex-col gap-2 w-full pt-2">
          <button
            type="button"
            className="p-2 w-full h-full bg-red-1100 rounded-lg text-white"
            onClick={signUpHandler}
          >
            {controlSig.btnloading && <BtnLoader />}
            {controlSig.btnloading ? "Loading" : "SignUp"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Signup;

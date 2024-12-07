import React, { useState } from "react";
import { BtnLoader } from "../../COMPONENTS/BtnLoader";
import axios from "../../LIB/axios";
import { validateForm } from "../COMMON/Common";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // CONTROL THE COMPONENT
  const [conLog, setConLog] = useState({
    btnloading: false,
  });

  // NAVIGATE HOOK
  const navigate = useNavigate();

  // LOGIN BTN HANDELER
  const loginHandler = async () => {
    try {
      const form = document.forms["login"];
      const isValid = validateForm(form);

      if (!isValid) {
        toast.error("Invalid Filed !");
        return null;
      }

      setConLog((prev) => {
        return { ...prev, btnloading: true };
      });

      const data = new FormData(form);
      const Datajson = Object.fromEntries(data);
      const loginRes = await axios.post("login", Datajson);

      if (loginRes?.data?.success) {
        toast.success("Login sucessfull");
        navigate("/");
      }
    } catch (err) {
      console.error(err)
      toast.error(err?.response?.data?.message);
      setConLog((prev) => {
        return { ...prev, btnloading: false };
      });
    }
  };

  return (
    <section className="flex items-center justify-center w-full h-full">
      <form
        className="p-4 sm:p-0 w-full sm:w-1/2 md:w-2/5 lg:w-1/3 text-sm flex flex-col gap-3"
        name="login"
      >
        <h4 className="text-red-1100 font-bold text-base sm:text-lg">LOG IN</h4>
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
        <div className="flex flex-col gap-2 w-full pt-3">
          <button
            type="button"
            className="p-2 w-full h-full bg-red-1100 rounded-lg text-white"
            onClick={loginHandler}
            disabled={conLog.btnloading}
          >
            {conLog.btnloading && <BtnLoader />}
            {conLog.btnloading ? "Loading.." : "Login"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;

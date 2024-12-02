import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BtnLoader } from "../../COMPONENTS/BtnLoader";
import toast from "react-hot-toast";
import axios from "../../LIB/axios";

const ReserPassword = () => {
  // CONTROL THE COMPONENT
  const [conPas, setConPas] = useState({
    btnloading: false,
  });

  // NAVIGATE HOOK
  const navigate = useNavigate();

  // LOCATION HOOK
  const location = useLocation();

  // SUBMIT BTN HANDLER
  const submitHanler = async () => {
    try {
      const pasEle = document.getElementById("password").value;

      if (!pasEle) {
        toast.error("Invalid password");
        return null;
      }

      setConPas((prev) => {
        return { ...prev, btnloading: true };
      });

      const token = location?.pathname?.split("/")?.splice(-1);

      const resRes = await axios.post(`reset-password/${token}`, {
        password: pasEle,
      });

      if (resRes?.data?.success) {
        toast.success("Password reset successfully");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
      setConPas((prev) => {
        return { ...prev, btnloading: false };
      });
    }
  };

  return (
    <section className="flex items-center justify-center w-full h-3/4">
      <form className="w-full sm:w-1/2 md:w-2/5 lg:w-1/3 p-2 text-sm flex flex-col gap-3">
        <h4 className="text-red-1100 font-bold text-base sm:text-lg">
          RESET PASSWORD
        </h4>
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
            onClick={submitHanler}
          >
            {conPas.btnloading && <BtnLoader />}
            {conPas.btnloading ? "Loading.." : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ReserPassword;

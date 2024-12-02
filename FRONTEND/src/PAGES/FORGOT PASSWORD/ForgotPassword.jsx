import React, { useState } from "react";
import { validateForm } from "../COMMON/Common";
import toast from "react-hot-toast";
import axios from "../../LIB/axios.js";
import { BtnLoader } from "../../COMPONENTS/BtnLoader";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  // CONTROL THE COMPONENT
  const [controlFor, setControlFor] = useState({
    btnloading: false,
  });

  // NAVIGATE HOOK
  const navigate = useNavigate();

  // FORGOT BTN HANDLER
  const forgotBtnHandler = async () => {
    try {
      const form = document.forms["forgotpassword"];
      const isValid = validateForm(form);

      if (!isValid) {
        toast.error("Invalid Filed !");
        return null;
      }

      setControlFor((prev) => {
        return { ...prev, btnloading: true };
      });

      const data = new FormData(form);
      const Datajson = Object.fromEntries(data);
      const forgotRes = await axios.post("forgot-password", Datajson);

      if (forgotRes?.data?.success) {
        toast.success("Email Sent Sucessfully");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
      setControlFor((prev) => {
        return { ...prev, btnloading: false };
      });
    }
  };

  return (
    <section className="flex items-center justify-center w-full h-3/4">
      <form
        className="w-full sm:w-1/2 md:w-2/5 lg:w-1/3 p-4 sm:p-0 text-sm flex flex-col gap-3"
        name="forgotpassword"
      >
        <h4 className="text-red-1100 font-bold text-base sm:text-lg">
          FORGOT PASSWORD
        </h4>
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
        <div className="flex flex-col gap-2 w-full pt-3">
          <button
            type="button"
            className="p-2 w-full h-full bg-red-1100 rounded-lg text-white"
            onClick={forgotBtnHandler}
            disabled={controlFor.btnloading}
          >
            {controlFor.btnloading && <BtnLoader />}
            {controlFor.btnloading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ForgotPassword;

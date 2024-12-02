import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BtnLoader } from "../../COMPONENTS/BtnLoader";
import axios from "../../LIB/axios";
import toast from "react-hot-toast";

const VerificationEmail = () => {
  // CONTROL THE COMPONENT
  const [contVer, setConVer] = useState({
    btnloading: false,
  });
  // NAVIAGTE HOOK
  const navigate = useNavigate();

  // SUBMIT BTN HANDLER
  const submitBtnHanlder = async () => {
    try {
      const codeEle = document.getElementById("code")?.value;

      if (!codeEle) {
        toast.error("Code is invalid !");
        return null;
      }

      setConVer((prev) => {
        return { ...prev, btnloading: true };
      });

      const verRes = await axios.post("verify-email", { code: codeEle });

      if (verRes?.data?.success) {
        toast.success("Verified");
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
      setConVer((prev) => {
        return { ...prev, btnloading: false };
      });
    }
  };

  return (
    <section className="flex items-center justify-center w-full h-3/4">
      <div className=" w-full sm:w-1/2  md:w-2/5 lg:w-1/3 p-4 sm:p-2 text-sm flex flex-col gap-3">
        <h4 className="text-red-1100 font-bold text-base sm:text-lg">
          VERIFIY
        </h4>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="code">Code</label>
          <input
            type="number"
            className="border border-gray-300 outline-none rounded-lg p-2 focus:ring-1 focus:ring-red-400 focus:border-red-1100"
            name="code"
            id="code"
            placeholder="code"
            required
          />
        </div>
        <div className="flex flex-col gap-2 w-full pt-3">
          <button
            type="button"
            className="p-2 w-full h-full bg-red-1100 rounded-lg text-white"
            onClick={submitBtnHanlder}
            disabled={contVer.btnloading}
          >
            {contVer.btnloading && <BtnLoader />}
            {contVer.btnloading ? "Loading..." : "Submit"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default VerificationEmail;

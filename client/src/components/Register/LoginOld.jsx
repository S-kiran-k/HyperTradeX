import "./Loginsignup.css";
import { useState } from "react";

function LoginOld() {
  const [values, setValue] = useState();
  const handelSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="2xl:container contain">
      <div className="w-[40%] mx-auto grid grid-cols-1">
        <form
          className="flex flex-col justify-center items-center gap-4 bg-white h-[60vh] mt-36 rounded-2xl"
          onSubmit={handelSubmit}>
          <p className="underline text-2xl">Login</p>
          <div className="flex gap-10">
            <div className="flex flex-col">
              <label htmlFor="Email" className="mb-1 text-[#23153C]">
                Email:
              </label>
              <input
                type="email"
                name="email"
                onChange={(data) => {
                  setValue(data.target.value);
                  console.log(data.target.value);
                }}
                className="border rounded-md px-3 py-2 w-80"
              />
            </div>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col">
              <label htmlFor="Password" className="mb-1 text-[#23153C]">
                Password:
              </label>
              <input
                type="password"
                name="password"
                className="border rounded-md px-3 py-2 w-80"
              />
            </div>
          </div>
          <div className="flex justify-start items-start">
            <p className="text-xs text-[#23153C] flicker-1 underline">
              Forgot Password ?
            </p>
          </div>
          <div className="">
            <button
              className="bg-[#23153C] text-white px-2 py-2 rounded-md hover:bg-blue-600 w-40"
              type="button">
              Login
            </button>
          </div>
        </form>
        {values}
      </div>
    </div>
  );
}

export default LoginOld;

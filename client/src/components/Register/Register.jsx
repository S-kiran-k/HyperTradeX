import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [value, setValue] = useState("");
  // const [name , setName] = useState("");
  // const [lname , setLname] = useState("");
  // const [email,setEmail] = useState("");
  // const [emailError,setEmailerror] = useState("");

  // const [Age , setAge] = useState("");
  // const [password , setPassword] = useState("");
  // const [cpassword , setCpassword] = useState("");
  const navigation = useNavigate();

  const login = () => {
    navigation("/Loginsignup/register");
  };
  const handelSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="2xl:container contain">
      <div className="w-[90%] mx-auto grid grid-cols-1">
        <form
          className="flex flex-col justify-center items-center gap-4 h-[100vh]"
          onSubmit={handelSubmit}>
          <div className="flex gap-10">
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-1 text-white">
                First Name:
              </label>
              <input
                type="text"
                name="name"
                onChange={(data) => {
                  setValue(data.target.value);
                }}
                className="border rounded-md px-3 py-2 w-60 "
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lname" className="mb-1 text-white">
                Last Name:
              </label>
              <input
                type="text"
                name="lname"
                onChange={(data) => {
                  setValue(data.target.value);
                  console.log(data.target.value);
                }}
                className="border rounded-md px-3 py-2 w-60 "
              />
            </div>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col">
              <label htmlFor="Email" className="mb-1 text-white">
                Email:
              </label>
              <input
                type="email"
                name="email"
                onChange={(data) => {
                  setValue(data.target.value);
                  console.log(data.target.value);
                }}
                className="border rounded-md px-3 py-2 w-60"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Age" className="mb-1 text-white">
                Age:
              </label>
              <input
                type="text"
                name="Age"
                onChange={(data) => {
                  setValue(data.target.value);
                  console.log(data.target.value);
                }}
                className="border rounded-md px-3 py-2 w-60"
              />
            </div>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col">
              <label htmlFor="Password" className="mb-1 text-white">
                Password:
              </label>
              <input
                type="password"
                name="password"
                onChange={(data) => {
                  setValue(data.target.value);
                  console.log(data.target.value);
                }}
                className="border rounded-md px-3 py-2 w-60"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="confirmPassword" className="mb-1 text-white ">
                Confirm Password:
              </label>
              <input
                type="password"
                name="confirmPassword"
                onChange={(data) => {
                  setValue(data.target.value);
                  console.log(data.target.value);
                }}
                className="border rounded-md px-3 py-2 w-60"
              />
              {}
            </div>
          </div>
          <div className="">
            <p className="text-xs text-white flicker-1">
              Already have an Account ?
            </p>
            <div className="flex gap-10">
              <button
                className="bg-blue-500 text-white px-2 py-2 rounded-md hover:bg-blue-600 w-40"
                onClick={login}
                type="button">
                Login
              </button>
              <button
                className="bg-blue-500 text-white px-2 py-2 rounded-md hover:bg-blue-600 w-40"
                type="button">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

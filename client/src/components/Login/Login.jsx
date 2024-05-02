import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axiosInstance from "../../axios/axios";
import { useNavigate } from "react-router-dom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { useContext, useState } from "react";
import UserContext from "../Context/userContext";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "required min 6 char" }),
});

const Login = () => {
  const data = useContext(UserContext);
  console.log(data);
  const { setUser } = data;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("/login", data);
      if (res.status === 200) {
        setUser(res.data.data);
        toast.success("Logged in successfully");
        navigate("/stocks");
      }
    } catch (error) {
      // Handle different types of errors
      if (error.response && error.response.status === 401) {
        // Unauthorized: Invalid email or password
        toast.error("Invalid email or password");
      } else {
        // Other errors: Network errors, server errors, etc.
        toast.error(
          "An error occurred while logging in. Please try again later."
        );
        console.error("Error logging in:", error);
      }
    }
  };
  // console.log(errors.email.message);

  return (
    <section className="bg-white contain">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-[#23153C] md:text-2xl">
              Login to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-[#23153C] ">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  {...register("email")}
                  className="bg-gray-50 border border-gray-300 text-[#23153C] sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5      dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
                <p className="text-red-700">{errors?.email?.message}</p>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-[#23153C] ">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className="bg-gray-50 border border-gray-300 text-[#23153C] sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5      dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                <p className="text-red-700">{errors?.password?.message}</p>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Login
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

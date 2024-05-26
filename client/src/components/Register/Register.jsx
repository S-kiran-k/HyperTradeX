import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axiosInstance from "../../axios/axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import "./Login.css"
const registerSchema = z.object({
  username: z.string().min(1, { message: "Required" }),
  email: z.string().email(),
  age: z.string().min(1, { message: "Required" }),
  password: z.string().min(6, { message: "Required min 6 char" }),
  confirmpassword: z.string().min(6, { message: "Required min 6 char" }),
});

const Register = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    console.log(errors.email);
    console.log(data);
    // const { confirmpassword, ...res } = data;

    try {
      const res = await axiosInstance.post("/register", data);

      if (res.status === 200) {

        toast.success("Logged in Sccessfully");
        navigate("/stocks");
      }
    } catch (error) {
      toast.error("Try After Sometime");
    }
  };

  // console.log(errors.email.message);

  return (
    <section className="bg-white py-5 contain">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-[#23153C]">
              Register to your account
            </h1>

            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 text-sm font-medium text-[#23153C]"
                >
                  Your username
                </label>
                <input
                  type="username"
                  name="username"
                  id="username"
                  {...register("username")}
                  className=" border border-gray-300   sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 w-full p-2.5     dark:border-gray-600 dark:placeholder-gray-400 text-[#23153C] dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter username"
                  required=""
                />
                <p className="text-red-700">{errors?.username?.message}</p>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 text-sm font-medium text-[#23153C]"
                >
                  email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter email"
                  {...register("email")}
                  className="   border border-gray-300   sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 w-full p-2.5     dark:border-gray-600 dark:placeholder-gray-400 text-[#23153C] dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                <p className="text-red-700">{errors?.email?.message}</p>
              </div>
              <div>
                <label
                  htmlFor="age"
                  className="mb-2 text-sm font-medium   text-[#23153C]"
                >
                  age
                </label>
                <input
                  type="age"
                  name="age"
                  id="age"
                  placeholder="Enter age"
                  {...register("age")}
                  className="   border border-gray-300   sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 w-full p-2.5     dark:border-gray-600 dark:placeholder-gray-400 text-[#23153C] dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                <p className="text-red-700">{errors?.age?.message}</p>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 text-sm font-medium   text-[#23153C]"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className="   border border-gray-300   sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 w-full p-2.5     dark:border-gray-600 dark:placeholder-gray-400 text-[#23153C] dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                <p className="text-red-700">{errors?.password?.message}</p>
              </div>
              <div>
                <label
                  htmlFor="confirmpassword"
                  className="mb-2 text-sm font-medium   text-[#23153C]"
                >
                  confirmpassword
                </label>
                <input
                  type="confirmpassword"
                  name="confirmpassword"
                  id="confirmpassword"
                  placeholder="••••••••"
                  {...register("confirmpassword")}
                  className="   border border-gray-300   sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 w-full p-2.5     dark:border-gray-600 dark:placeholder-gray-400 text-[#23153C] dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                <p className="text-red-700">
                  {errors?.confirmpassword?.message}
                </p>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Register
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
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

export default Register;
'use client'

import { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import Link from "next/link";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [active, setActive] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [user , setUser] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/auth/signup/new-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setSuccess(data.message);
        setFormData({ name: "", email: "", phone: "", password: "" });
      }
    } catch (err) {
      setError("Failed to connect to the server");
    }
  };

  useEffect(() => {
    fetch('/api/auth/signup/new-user')
     .then(res => res.json())
     .then(data => setUser(data))
     .catch(err => console.log(err))
  },[])
  return (
    <main className="w-full min-h-[100vh] h-auto bg-blue-500 flex items-center justify-center sm:py-12 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-[900px] sm:max-w-[1000px]: bg-white rounded-lg sm:py-6 sm:px-8 p-4 flex flex-col gap-5"
      >
        <h3 className="text-[1.8rem] font-[700] text-gray-900 text-center">
          Sign Up
        </h3>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <div className="flex items-center justify-between gap-4 w-full mt-5 sm:flex-row flex-col">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="py-3 px-4 border focus:outline-blue-500 border-gray-300  rounded-lg w-full"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="py-3 px-4 border focus:outline-blue-500 border-gray-300  rounded-lg w-full"
          />
        </div>

        <div className="flex items-center justify-between gap-4 w-full sm:flex-row flex-col">
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone number"
            className="py-3 px-4 border focus:outline-blue-500 border-gray-300  rounded-lg w-full"
          />
          <div className="w-full relative">
            <input
              type={active ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="py-3 px-4 border focus:outline-blue-500 border-gray-300 rounded-lg w-full"
            />
            {active ? (
              <BsEyeSlash
                className=" absolute top-[30%] right-[5%] text-[1.2rem] text-gray-500 cursor-pointer"
                onClick={() => setActive(false)}
              />
            ) : (
              <BsEye
                className=" absolute top-[30%] right-[5%] text-[1.2rem] text-gray-500 cursor-pointer"
                onClick={() => setActive(true)}
              />
            )}
          </div>
        </div>

        <div className="text-[1rem] ">
          <input type="checkbox" name="checkbox" id="checkbox" />{" "}
          <label htmlFor="checkbox" className="cursor-pointer">
            By clicking, I agree to signup{" "}
            <a href="#" className=" text-blue-500">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="#" className=" text-blue-500">
              Privacy Policy
            </a>
          </label>
        </div>

        <div className="w-full flex items-center justify-center">
          <button
            type="submit"
            className="w-full sm:w-[50%] py-3 px-4 bg-blue-500 text-white border-none outline-none rounded-lg mt-3"
          >
            Sign up
          </button>
        </div>
        <div className="flex items-center justify-center w-full gap-1">
          <span className="text-[1rem] text-gray-600 font-[500]">
            have already an account?{" "}
          </span>
          <span>
            <Link
              href="/api/auth/signin"
              className="text-[1rem] text-blue-500 font-[500]"
            >
              Signin
            </Link>
          </span>
        </div>

        <div className="w-full my-1 flex items-center justify-center gap-3">
          <hr className="w-[45%] bg-gray-400 h-[2px]" />
          <p>or</p>
          <hr className="w-[45%] bg-gray-400 h-[2px]" />
        </div>

        <div className="flex items-center justify-between w-full gap-5 sm:flex-row flex-col">
          <button className="flex items-center justify-center py-2.5 px-4 gap-4 bg-[#4267b2] rounded-lg w-full text-[1rem] font-[500] text-white">
            <FaFacebook className="text-[1.8rem] text-white" />
            Signup with Facebook
          </button>
          <button className="flex items-center justify-center py-2 px-4 gap-4 border border-gray-300 rounded-lg w-full text-[1rem] font-[500] text-gray-600">
            <FcGoogle className="text-[2rem]" />
            Signup with Google
          </button>
        </div>
      </form>
    </main>
  );
};

export default Signup;
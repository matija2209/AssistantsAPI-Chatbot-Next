"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function SignIn() {
  const router = useRouter();
  const { handleSubmit, register } = useForm();

  const handlePasswordLogin = async (data: any) => {
    const { username, password } = data;
    try {
      const config = {
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/auth`,
        data,
      };
      const response = await axios<{ token: string }>(config);
      Cookies.set("session", response.data.token, { expires: 30 }); // Expires in 1 day
      router.push("/info");
    } catch (error: any) {
      alert("Failed login" + error.message);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 uppercase mb-8">
          Login Page
        </h2>

        <form
          onSubmit={handleSubmit(handlePasswordLogin)}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Username"
            {...register("username")}
            className="w-full p-3 rounded border focus:ring focus:ring-indigo-200"
          />
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full p-3 rounded border focus:ring focus:ring-indigo-200"
          />
          <button
            type="submit"
            className="w-full p-4 rounded-lg bg-indigo-600 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

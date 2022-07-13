import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Head from "next/head";

const CreateAccount: NextPage = () => {
  const { register, reset, handleSubmit } = useForm();
  const [isAccount, setIsAccount] = useState(true);
  const onValid = () => {};
  const router = useRouter();
  useEffect(() => {}, []);
  return (
    <div className="mt-16 px-4">
      <Head>
        <title>Create Account</title>
      </Head>
      <h3 className="text-center text-3xl font-bold">Sign Up Carroter</h3>
      <div className="mt-8">
        <div className="flex flex-col items-center">
          <h5 className="text-sm font-medium text-gray-700">Enter using:</h5>
        </div>
        <form
          onSubmit={handleSubmit(onValid)}
          className="mt-8 flex flex-col space-y-4 justify-center items-center"
        >
          <label>
            Email Address :{" "}
            <input
              {...register("email", { required: true })}
              name="email"
              type="email"
              className="border-2 border-teal-300 rounded-md"
            />
          </label>
          <button className="bg-teal-300 px-4 py-2 rounded-md active:ring-1">
            {isAccount ? "Get login link" : "Go to Login"}
          </button>
          <button
            className="bg-teal-300 px-4 py-2 rounded-md active:ring-1"
            onClick={() => setIsAccount((prev) => !prev)}
          >
            "Create Account"
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;

import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import useMutation from "@libs/client/useMutation";

interface LoginForm {
  email: string;
}

interface MutationResult {
  ok: boolean;
  error?: boolean;
}

const Login: NextPage = () => {
  const { register, reset, handleSubmit } = useForm<LoginForm>({
    mode: "onChange",
  });
  const [login, { data, loading }] =
    useMutation<MutationResult>("/api/account");
  const onValid = (validFrom: LoginForm) => {
    if (loading) return;
    login(validFrom);
    reset();
  };
  const router = useRouter();
  useEffect(() => {
    if (data?.ok) {
      router.replace("/");
    } else if (data?.error) {
      if (
        confirm("We not found your account. Do you want to create new account?")
      ) {
        router.replace("/create-account");
      }
    }
  }, [data]);
  return (
    <div className="mt-16 px-4 flex flex-col justify-center items-center">
      <Head>
        <title>Log in</title>
      </Head>
      <h3 className="text-center text-3xl font-bold">Log In Carroter</h3>
      <div className="mt-8">
        <div className="divide-y-2 space-y-5">
          <form
            onSubmit={handleSubmit(onValid)}
            className="mt-8 flex flex-col space-y-4 justify-center"
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
              Get login link
            </button>
          </form>
          <div className="flex flex-col justify-center py-2">
            <div>Do you want to create New Account?</div>
            <Link href="/create-account">
              <a className="bg-teal-300 px-4 py-2 rounded-md active:ring-1 text-center">
                Go to Sign Up
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

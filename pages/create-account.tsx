import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import useMutation from "@libs/client/useMutation";

interface AccountForm {
  ok: boolean;
  email: string;
  name: string;
}

interface MutationResult {
  ok: boolean;
}

const CreateAccount: NextPage = () => {
  const { register, reset, handleSubmit } = useForm<AccountForm>({
    mode: "onChange",
  });
  const [account, { data, loading }] =
    useMutation<MutationResult>("/api/newAccount");
  const onValid = (validFrom: AccountForm) => {
    if (loading) return;
    account(validFrom);
    reset();
  };
  const router = useRouter();
  useEffect(() => {
    if (data?.ok) {
      router.replace("/log-in");
    }
  }, [data]);
  return (
    <div className="mt-16 px-4 flex flex-col justify-center items-center">
      <Head>
        <title>Create Account</title>
      </Head>
      <h3 className="text-center text-3xl font-bold">Sign Up Carroter</h3>
      <div className="mt-8">
        <div className="divide-y-2 space-y-5">
          <form
            onSubmit={handleSubmit(onValid)}
            className="mt-8 flex flex-col space-y-4 justify-center"
          >
            <label>Email Address</label>
            <input
              {...register("email", { required: true })}
              name="email"
              type="email"
              className="border-2 border-teal-300 rounded-md"
            />
            <label>Your Nickname</label>
            <input
              {...register("name", { required: true })}
              name="name"
              type="text"
              className="border-2 border-teal-300 rounded-md"
            />
            <button className="bg-teal-300 px-4 py-2 rounded-md active:ring-1">
              Sign Up
            </button>
          </form>
          <div className="flex flex-col justify-center py-2">
            <div>Are you have Account already?</div>
            <Link href="/log-in">
              <a className="bg-teal-300 px-4 py-2 rounded-md active:ring-1 text-center">
                Go to Log In
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;

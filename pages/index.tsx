import { NextPage } from "next";
import React from "react";
import { useForm } from "react-hook-form";
import Message from "@components/message";

const Home: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const onValid = () => {};
  return (
    <div className="flex flex-col justify-center max-w-xl mx-auto w-full">
      <div className="flex flex-row justify-center my-10 space-x-5">
        <img
          src="https://picsum.photos/200/300?random=1"
          className="w-20 h-20 bg-gray-600 rounded-2xl"
        />
        <img
          src="https://picsum.photos/200/300?random=2"
          className="w-20 h-20 bg-yellow-600 rounded-2xl"
        />
      </div>
      <div className="flex flex-col justify-center space-y-6">
        <form onSubmit={handleSubmit(onValid)} className="w-3/4 mx-auto">
          <textarea
            {...register("tweet", { minLength: 2, maxLength: 140 })}
            className="placeholder:px-2 mt-1 rounded-md shadow-sm w-full border-teal-400 border-2 focus:border-teal-500 focus:ring-4 focus:ring-teal-500"
            rows={4}
            placeholder="Write your Carrotweet!"
          />
          <button className="bg-teal-300 px-4 py-2 rounded-md active:ring-1">
            Upload Tweet
          </button>
        </form>
        <div className="flex justify-center">
          <Message />
        </div>
      </div>
    </div>
  );
};

export default Home;

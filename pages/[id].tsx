import { NextPage } from "next";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const TweetDetail: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const [isLiked, setIsLiked] = useState(false);
  const [isAnswer, setIsAnswer] = useState(false);
  const toggleLike = () => setIsLiked((prev) => !prev);
  const toggleAnswer = () => setIsAnswer((prev) => !prev);
  const onValid = () => {};
  return (
    <div className="flex flex-col justify-center max-w-xl mx-auto w-full">
      <div className="flex flex-row justify-center my-10 space-x-5">
        <Link href="/">
          <a>
            <img
              src="https://picsum.photos/200/300?random=1"
              className="w-20 h-20 bg-gray-600 rounded-2xl"
            />
          </a>
        </Link>
        <img
          src="https://picsum.photos/200/300?random=2"
          className="w-20 h-20 bg-yellow-600 rounded-2xl"
        />
      </div>
      <div className="flex flex-col justify-center space-y-6">
        <div className="flex justify-center">
          <div className="w-3/4 h-[fit-content] bg-teal-400 rounded-md py-2">
            <div className="p-3 flex flex-row space-x-1 justify-start">
              <img
                src="https://picsum.photos/200?random=4"
                className="w-16 h-16 bg-gray-400 rounded-full"
              />
              <p className="font-medium text-lg">
                {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis
              mauris nibh. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Aliquam justo quam, pretium id sapien non, bibendum feugiat
              est. Cras nec leo nec felis tristique interdum. In sed dui ipsum.
              Mauris non vestibulum massa, vel porta tortor. Morbi tincidunt
              orci interdum mi interdum euismod. Maecenas sem erat, mattis in
              porttitor vitae, posuere id mauris. Curabitur mattis dolor in urna
              hendrerit consequat.`.slice(0, 140)}
              </p>
            </div>
            <div>
              <button onClick={toggleAnswer}>답글하기</button>
            </div>
            <div className="flex flex-row justify-end pr-5">
              <button onClick={toggleLike}>
                {isLiked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                )}
              </button>
              <span>0</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        {isAnswer ? (
          <form onSubmit={handleSubmit(onValid)} className="w-3/4 mx-auto">
            <textarea
              {...register("answer", { minLength: 2, maxLength: 140 })}
              className="placeholder:px-2 mt-1 rounded-md shadow-sm w-full border-teal-400 border-2 focus:border-teal-500 focus:ring-4 focus:ring-teal-500"
              rows={4}
              placeholder="Write your Carrotweet!"
            />
            <button className="bg-teal-300 px-4 py-2 rounded-md active:ring-1">
              Upload Answer
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default TweetDetail;

import Layout from "@components/layout";
import Message from "@components/message";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { cls } from "@libs/client/utils";
import { Post, User } from "@prisma/client";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface PostWithProps extends Post {
  user: User;
  _count: {
    fav: number;
  };
}

interface PostResponse {
  ok: boolean;
  post: PostWithProps;
  isLike: boolean;
}

const TweetDetail: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { data, mutate } = useSWR<PostResponse>(
    router.query.id ? `/api/posts/${router.query.id}` : null,
    {}
  );
  const [toggleFav] = useMutation(`/api/posts/${router.query.id}/fav`);
  const toggleLike = () => {
    if (!data) return;
    mutate((prev) => prev && { ...prev, isLike: !prev.isLike }, false);
    toggleFav({});
  };
  return (
    <Layout
      head={`${data?.post.user.name} || Carroter`}
      title={`${data?.post.user.name}'s tweet`}
    >
      <div className="flex flex-col justify-center max-w-xl mx-auto w-full">
        <div className="flex flex-row justify-center my-10 space-x-5">
          <Link href="/">
            <a>
              <img
                src="https://picsum.photos/200/300?random=1"
                className="w-20 h-20 bg-gray-600 rounded-2xl"
              />
              <span>Go Home</span>
            </a>
          </Link>
          <div>
            <img
              src="https://picsum.photos/200/300?random=2"
              className="w-20 h-20 bg-yellow-600 rounded-2xl"
            />
            <div className="text-center">{user?.name}</div>
          </div>
        </div>
        <div className="flex flex-col justify-center space-y-6">
          <div className="flex justify-center">
            <div className="w-3/4 h-[fit-content] bg-teal-400 rounded-md py-2">
              <div className="p-3 flex flex-row space-x-1 justify-start">
                <div className="space-y-1">
                  <div className="w-16">
                    <img
                      src="https://picsum.photos/200?random=4"
                      className="w-16 h-16 bg-gray-400 rounded-full"
                    />
                  </div>
                  <div className="text-center">{data?.post.user.name}</div>
                </div>
                <p className="font-medium text-lg w-[26rem] pl-2">
                  {data?.post.content}
                </p>
              </div>
              <div className="flex flex-row justify-end items-center py-3">
                <div className="flex flex-row justify-end pr-5">
                  <button onClick={toggleLike}>
                    {data?.isLike ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-red-500"
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
                  <span>{data?.post._count.fav}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TweetDetail;

import { NextPage } from "next";
import React from "react";
import { useForm } from "react-hook-form";
import Message from "@components/message";
import useUser from "@libs/client/useUser";
import useSWR from "swr";
import { Fav, Post, User } from "@prisma/client";
import useMutation from "@libs/client/useMutation";
import Link from "next/link";
import Layout from "@components/layout";

interface PostWithProps extends Post {
  user: User;
  _count: {
    fav: number;
  };
  fav: Fav[];
}

interface PostResponse {
  ok: boolean;
  tweets: PostWithProps[];
}

interface TweetForm {
  tweet: string;
}

interface MutationResult {
  ok: boolean;
  error?: boolean;
}

const Home: NextPage = () => {
  const { user } = useUser();
  const { data } = useSWR<PostResponse>("/api/posts");
  const { register, handleSubmit, reset } = useForm<TweetForm>();
  const [uploadTweet] = useMutation<MutationResult>("/api/posts");
  const onValid = (validForm: TweetForm) => {
    uploadTweet(validForm);
    reset();
  };
  return (
    <Layout title="Home" head="Home">
      <div className="flex flex-col justify-center max-w-xl mx-auto w-full">
        <div className="flex flex-row justify-center my-10 space-x-5">
          <div>
            <img
              src="https://picsum.photos/200/300?random=1"
              className="w-20 h-20 bg-gray-600 rounded-2xl"
            />
            <div className="text-center">Go Home</div>
          </div>
          <div>
            <img
              src="https://picsum.photos/200/300?random=2"
              className="w-20 h-20 bg-yellow-600 rounded-2xl"
            />
            <div className="text-center">{user?.name}</div>
          </div>
        </div>
        <div className="flex flex-col justify-center space-y-6">
          <form onSubmit={handleSubmit(onValid)} className="w-3/4 mx-auto">
            <textarea
              {...register("tweet", { minLength: 2, maxLength: 140 })}
              className="placeholder:px-2 mt-1 rounded-md shadow-sm w-full border-teal-400 border-2 focus:border-teal-500 focus:ring-4 focus:ring-teal-500"
              rows={4}
              placeholder="Write your Carrotweet!"
            />
            <div className="flex justify-end">
              <button className="bg-teal-300 px-4 py-2 rounded-md active:ring-1 hover:bg-teal-400">
                Upload Tweet
              </button>
            </div>
          </form>
          <div className="flex justify-center">
            {data?.tweets?.map((post) => (
              <Link key={post.id} href={`/${post.id}`}>
                <a>
                  <Message
                    content={post.content}
                    owner={post.user.name}
                    fav={post._count.fav}
                    isFav={post.fav
                      .map((like) => {
                        if (like.userId === user?.id) return true;
                      })
                      .includes(true)}
                  />
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

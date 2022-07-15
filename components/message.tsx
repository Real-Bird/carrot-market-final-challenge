import React from "react";

interface TweetProps {
  content: string | null | undefined;
  owner: string | null | undefined;
  fav: number | null | undefined;
  isFav: boolean;
}

export default function Message({ content, owner, fav, isFav }: TweetProps) {
  return (
    <div className="flex justify-center cursor-pointer">
      <div className="w-3/4 h-[fit-content] bg-teal-400 rounded-md py-2">
        <div className="p-3 flex flex-row space-x-1 justify-start">
          <div className="space-y-1">
            <div className="w-16">
              <img
                src="https://picsum.photos/200?random=4"
                className="w-16 h-16 bg-gray-400 rounded-full"
              />
            </div>
            <div className="text-center">{owner}</div>
          </div>
          <p className="font-medium text-lg w-[26rem] pl-2">{content}</p>
        </div>
        <div className="flex flex-row justify-end pr-5">
          <span>
            {isFav ? (
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
          </span>
          <span>{fav}</span>
        </div>
      </div>
    </div>
  );
}

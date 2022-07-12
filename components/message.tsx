import { NextPage } from "next";
import Link from "next/link";
import React from "react";

const Message: NextPage = () => {
  return (
    <div className="flex justify-center cursor-pointer">
      <Link href="/1">
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
          <div className="flex flex-row justify-end pr-5">
            <span>
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
            </span>
            <span>0</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Message;

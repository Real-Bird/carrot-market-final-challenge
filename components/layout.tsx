import React from "react";
import Link from "next/link";
import Head from "next/head";
import useMutation from "@libs/client/useMutation";

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
  head: string;
  [key: string]: any;
}

export default function Layout({
  title,
  children,
  head,
  ...rest
}: LayoutProps) {
  const [logout] = useMutation("/api/logout");
  const onLogout = () => {
    logout({});
    location.reload();
  };
  return (
    <div className="overflow-x-hidden">
      <Head>
        <title>{head}</title>
      </Head>
      <div className="flex justify-center">
        <div
          {...rest}
          className="fixed top-0 flex h-12 w-full max-w-xl items-center justify-center border-b bg-white text-lg font-medium text-gray-800"
        >
          {title ? <span className="mx-auto">{title}</span> : null}
          <button
            className="absolute right-5 bg-teal-400 p-1 rounded-md hover:bg-teal-500"
            onClick={onLogout}
          >
            Log-out
          </button>
        </div>
      </div>
      <div className="py-12">{children}</div>
    </div>
  );
}

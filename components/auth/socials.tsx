"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { AuthError } from "next-auth";

const Socials = ({ disabled }: { disabled: boolean }) => {
  const onClick = (provider: "google" | "github") => {
    try {
      signIn(provider, {
        redirectTo: DEFAULT_LOGIN_REDIRECT,
      });
    } catch (err) {
      if (err instanceof AuthError) {
        console.log(err.message);
      }
    }
  };
  return (
    <div className="flex w-full gap-x-2">
      <Button
        size={"lg"}
        className="hover:ring-primary-500 light-border-2 cursor-pointer hover:ring-1"
        variant={"outline"}
        disabled={disabled}
        onClick={() => {
          onClick("google");
        }}
      >
        <FcGoogle />
      </Button>
      <Button
        size={"lg"}
        className="hover:ring-primary-500 light-border-2 cursor-pointer hover:ring-1"
        variant={"outline"}
        disabled={disabled}
        onClick={() => {
          signIn("github");
        }}
      >
        <FaGithub />
      </Button>
    </div>
  );
};

export default Socials;

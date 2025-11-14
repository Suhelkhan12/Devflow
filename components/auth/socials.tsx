"use client";

import { Button } from "../ui/button";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Socials = () => {
  return (
    <div className="flex w-full gap-x-2">
      <Button
        size={"lg"}
        className="hover:ring-primary-500 light-border-2 cursor-pointer hover:ring-1"
        variant={"outline"}
      >
        <FcGoogle />
      </Button>
      <Button
        size={"lg"}
        className="hover:ring-primary-500 light-border-2 cursor-pointer hover:ring-1"
        variant={"outline"}
      >
        <FaGithub />
      </Button>
    </div>
  );
};

export default Socials;

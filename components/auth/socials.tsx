"use client";

import { Button } from "../ui/button";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Socials = () => {
  return (
    <div className="flex w-full gap-x-2">
      <Button size={"lg"} className="dark:border-dark-500 cursor-pointer" variant={"outline"}>
        <FcGoogle />
      </Button>
      <Button size={"lg"} className="dark:border-dark-500 cursor-pointer" variant={"outline"}>
        <FaGithub />
      </Button>
    </div>
  );
};

export default Socials;

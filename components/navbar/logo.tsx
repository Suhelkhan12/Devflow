/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const logo = () => {
  return (
    <Link href={"/"} className="font-space-grotesk flex items-center gap-1">
      <img src={"/icons/logo.svg"} alt="Devoverflow logo which is like a sun" className="size-7" />
      <p className="text-dark-light100_light-dark900 text-2xl max-sm:hidden">
        Dev<span className="text-primary-500 font-medium">Overflow</span>
      </p>
    </Link>
  );
};

export default logo;

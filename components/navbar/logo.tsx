/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const Logo = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <Link href={"/"} className="font-space-grotesk flex items-center gap-1">
      <img
        src={"/icons/logo.svg"}
        alt="Devoverflow logo which is like a sun"
        className={`${isMobile ? "size-5" : "size-7"}`}
      />
      <p
        className={`text-dark-light100_light-dark900 font-medium ${isMobile ? "text-xl" : "text-2xl"} ${!isMobile && "max-sm:hidden"}`}
      >
        Dev<span className="text-primary-500 font-bold">Overflow</span>
      </p>
    </Link>
  );
};

export default Logo;

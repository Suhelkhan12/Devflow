import { HotNetworkLinkProps } from "@/lib/types";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const HOTNETWORKS = [
  {
    id: "first0",
    href: "/",
    text: "Would it be appropriate to point out an error in another paper during a referee report?",
  },
  {
    id: "second",
    href: "/",
    text: "How can an airconditioning machine exist?",
  },
  {
    id: "third",
    href: "/",
    text: "Interrogated every time crossing UK Border as citizen",
  },
  {
    id: "fourth",
    href: "/",
    text: "Low digit addition generator",
  },
  {
    id: "fifth",
    href: "/",
    text: "What is an example of 3 numbers that do not make up a vector?",
  },
];

const HotNetworkLink = ({ href, text }: HotNetworkLinkProps) => {
  return (
    <Link href={href} className="group flex justify-between gap-6 transition hover:opacity-70">
      <p className="max-w-64 text-[14px] font-normal">{text}</p>
      <ChevronRight className="mt-1 size-3.5 transition-transform group-hover:translate-x-1" />
    </Link>
  );
};
const HotNetwork = () => {
  return (
    <div className="flex flex-col justify-between gap-6">
      <h2 className="h3-semibold">Hot network</h2>
      <div className="flex flex-col gap-6">
        {HOTNETWORKS.map((ht) => (
          <HotNetworkLink key={ht.id} {...ht} />
        ))}
      </div>
    </div>
  );
};

export default HotNetwork;

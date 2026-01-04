import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

interface EmptyComponentProps {
  heading: string;
  description: string;
  buttonLabel: string;
  href: string;
}
const Empty = ({ heading, description, buttonLabel, href }: EmptyComponentProps) => {
  return (
    <div className="flex-center font-inter flex h-full flex-col gap-8">
      <Image
        src={"/images/not-found.svg"}
        alt="page not found image which will be rendered when server give 404 and no such page exists"
        width={300}
        height={300}
        preload
      />
      <div className="flex max-w-lg flex-col items-center gap-6 text-center max-sm:px-2">
        <div className="flex flex-col gap-1">
          <h2 className="h2-bold text-dark200_light900">{heading}</h2>
          <p className="text-dark500_light700">{description}</p>
        </div>
        <Button asChild variant={"primary"}>
          <Link href={href}>{buttonLabel}</Link>
        </Button>
      </div>
    </div>
  );
};

export default Empty;

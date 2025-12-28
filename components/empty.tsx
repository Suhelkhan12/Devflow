import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const Empty = () => {
  return (
    <div className="flex-center font-inter flex h-full flex-col gap-8">
      <Image
        src={"/images/not-found.svg"}
        alt="page not found image which will be rendered when server give 404 and no such page exists"
        width={300}
        height={300}
        preload
      />
      <div className="flex max-w-lg flex-col items-center gap-3.5 text-center max-sm:px-2">
        <h2 className="h2-bold text-dark200_light900">There’s no question to show</h2>
        <p className="text-dark500_light700">
          Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next
          big thing others learn from. Get involved! 💡
        </p>
        <Button asChild variant={"primary"}>
          <Link href={"/ask-question"}>Ask a question</Link>
        </Button>
      </div>
    </div>
  );
};

export default Empty;

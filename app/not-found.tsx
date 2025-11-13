import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <section className="flex-center font-inter flex h-screen flex-col gap-8">
      <Image
        src={"/images/not-found.svg"}
        alt="page not found image which will be rendered when server give 404 and no such page exists"
        width={300}
        height={300}
        preload
      />
      <div className="flex max-w-lg flex-col items-center gap-3.5 text-center max-sm:px-2">
        <h2 className="h2-bold text-dark200_light900">Oops! Page Not Found</h2>
        <p className="text-dark500_light700">
          The page you’re looking for doesn’t exist or may have been moved. Double-check the URL or go back to the
          homepage.
        </p>
        <Button asChild variant={"primary"}>
          <Link href={"/"}>Go Home</Link>
        </Button>
      </div>
    </section>
  );
};

export default NotFound;

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import { RouteParams } from "@/types/types";
import Link from "next/link";

const page = async ({ params }: RouteParams) => {
  const { id } = await params;
  return (
    <div className="flex flex-col gap-2">
      <p>{JSON.stringify(id)}</p>
      <Button asChild variant={"primary"}>
        <Link href={ROUTES.QUESTIONEDIT(id)}>Edit Question</Link>
      </Button>
    </div>
  );
};

export default page;

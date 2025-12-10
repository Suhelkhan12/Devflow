"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Header from "./header";
import Socials from "./socials";
import { Separator } from "../ui/separator";
import { CardWrapperProps } from "@/types/types";

const CardWrapper = ({
  children,
  headerLabel,
  backBtnHref,
  backBtnLabel,
  socialsDisabled,
  showSocials,
}: CardWrapperProps) => {
  return (
    <Card className="shadow-light100_dark100 background-light800_dark200 light-border-2 w-full max-w-xl">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>
        {showSocials && <Socials disabled={socialsDisabled} />}
        <Separator className="background-light700_dark400 my-4" />
        {children}
      </CardContent>
      <CardFooter className="flex-center">
        <Button variant={"link"} size={"sm"} className="font-normal" asChild>
          <Link href={backBtnHref}>{backBtnLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;

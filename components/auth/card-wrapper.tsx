"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Header from "./header";
import Socials from "./socials";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  headerDescription: string;
  backBtnLabel: string;
  backBtnHref: string;
  showSocials?: boolean;
}
const CardWrapper = ({
  children,
  headerDescription,
  headerLabel,
  backBtnHref,
  backBtnLabel,
  showSocials,
}: CardWrapperProps) => {
  return (
    <Card className="shadow-light100_dark100 background-light800_dark200 w-full max-w-xl border-0">
      <CardHeader>
        <Header label={headerLabel} description={headerDescription} />
      </CardHeader>
      <CardContent className="space-y-7">
        {showSocials && <Socials />}
        {children}
      </CardContent>
      <CardFooter>
        <Button variant={"link"} size={"sm"} className="w-full font-normal" asChild>
          <Link href={backBtnHref}>{backBtnLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;

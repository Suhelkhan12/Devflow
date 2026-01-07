"use client";
import { useSearchParams } from "next/navigation";
import { Card, CardHeader, CardFooter, CardContent } from "../ui/card";
import Header from "./header";
import { Button } from "../ui/button";
import Link from "next/link";
import { Spinner } from "../ui/spinner";
import { useEffect, useState } from "react";
import { newVerifcation } from "@/actions/auth/new-verification";
import FormSuccess from "./form-success";
import FormError from "./form-error";

const VerificationForm = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  // getting the token from the url
  const token = searchParams.get("token");

  // it will be an effect to verify the token on component mount
  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setError("Verification token is missing.");
        return;
      }

      try {
        const result = await newVerifcation(token);
        if (result?.error) {
          setError(result.error);
        }
        if (result?.success) {
          setSuccess(result.success);
        }
      } catch {
        setError("An unexpected error occurred. Please try again later.");
      }
    };
    verifyEmail();
  }, [token]);

  return (
    <Card className="shadow-light100_dark100 background-light800_dark200 light-border-2 w-full max-w-xl">
      <CardHeader className="flex-center">
        <Header label="Confirming your email" />
      </CardHeader>
      <CardContent className="flex-center">
        {!error && !success && <Spinner />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </CardContent>
      <CardFooter className="flex-center">
        <Button variant={"link"} size={"sm"} className="font-normal" asChild>
          <Link href={"/auth/log-in"}>Back to login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerificationForm;

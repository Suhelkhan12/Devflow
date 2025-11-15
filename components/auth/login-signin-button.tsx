import { Button } from "../ui/button";
import AuthButton from "./auth-button";

const LoginSigninButtons = () => {
  return (
    <div className="flex flex-col gap-3">
      <AuthButton route="/auth/log-in">
        <Button
          variant={"default"}
          className="background-light800_dark400! text-primary-500 w-full cursor-pointer hover:shadow-sm"
        >
          Log in
        </Button>
      </AuthButton>
      <AuthButton route="/auth/sign-in">
        <Button
          variant={"default"}
          className="background-light700_dark300 border-light-700 dark:border-dark-400 w-full cursor-pointer border hover:shadow-sm"
        >
          Sign in
        </Button>
      </AuthButton>
    </div>
  );
};

export default LoginSigninButtons;

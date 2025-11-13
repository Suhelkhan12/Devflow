import CardWrapper from "./card-wrapper";

const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel="Welcome"
      headerDescription="log in to DevOverflow"
      backBtnHref="/auth/sign-in"
      backBtnLabel="Don't have an account?"
      showSocials
    >
      <p>login </p>
    </CardWrapper>
  );
};

export default LoginForm;

import Logo from "../navbar/Logo";

const Header = ({ label, description }: { label: string; description: string }) => {
  return (
    <div className="flex flex-col gap-6">
      <Logo isMobile={false} />
      <div className="flex w-full flex-col gap-1">
        <h1 className="h2-semibold font-space-grotesk">{label}</h1>
        <p className="font-inter text-dark400_light700">{description}</p>
      </div>
    </div>
  );
};

export default Header;

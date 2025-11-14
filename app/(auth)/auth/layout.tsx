const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-center bg-auth-light dark:bg-auth-dark h-screen bg-contain bg-center bg-no-repeat px-4 max-md:bg-repeat">
      {children}
    </div>
  );
};

export default layout;

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex-center bg-auth-light dark:bg-auth-dark h-screen bg-contain bg-center bg-no-repeat px-4 max-md:bg-repeat">
      {children}
    </main>
  );
};

export default layout;

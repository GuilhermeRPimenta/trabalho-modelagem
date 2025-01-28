const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-grow justify-center px-2 xl:px-0 py-6 text-center">
      {children}
    </div>
  );
};

export default Main;

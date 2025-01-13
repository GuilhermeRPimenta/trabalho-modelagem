const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-grow justify-center py-6 px-6 text-center">
      {children}
    </div>
  );
};

export default Main;

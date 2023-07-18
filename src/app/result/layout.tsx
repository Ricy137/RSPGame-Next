import { ReactNode, Suspense } from "react";

const ResultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  //todo: start time should be an atome variable
  return (
    <div className="py-[40px] flex flex-col items-center min-h-screen">
      <div className="flex flex-col items-center grow gap-y-[24px] w-4/5">
        <Suspense fallback={<div>loading...</div>}>{children}</Suspense>
      </div>
    </div>
  );
};

export default ResultLayout;

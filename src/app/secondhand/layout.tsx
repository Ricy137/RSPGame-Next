"use client";
import { ReactNode, Suspense } from "react";
import RoundBoard, { RoundBoardLoading } from "@/modules/RoundBoard";

const SecondHandLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  //todo: start time should be an atome variable
  return (
    <div className="py-[40px] flex flex-col items-center">
      <div className="flex flex-col items-center gap-y-[24px] w-4/5">
        <Suspense fallback={<RoundBoardLoading />}>
          <RoundBoard />
        </Suspense>
        {children}
      </div>
    </div>
  );
};

export default SecondHandLayout;

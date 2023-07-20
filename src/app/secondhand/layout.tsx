"use client";
import { ReactNode, Suspense } from "react";
import RoundBoard, { RoundBoardLoading } from "@/modules/RoundBoard";
import ResultListener from "@/modules/ResultListener";

const SecondHandLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ResultListener>
      <div className="py-[40px] flex flex-col items-center min-h-screen w-full">
        <div className="flex flex-col items-center grow gap-y-[24px] w-4/5">
          <Suspense fallback={<RoundBoardLoading />}>
            <RoundBoard />
          </Suspense>
          {children}
        </div>
      </div>
    </ResultListener>
  );
};

export default SecondHandLayout;

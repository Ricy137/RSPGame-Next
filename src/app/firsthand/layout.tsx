import { ReactNode } from "react";
import RoundBoard from "@/modules/RoundBoard";

const FirstHandLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  //todo: start time should be an atome variable
  return (
    <div className="py-[40px] flex flex-col items-center">
      <div className="flex flex-col items-center gap-y-[24px] w-4/5">
        <RoundBoard
          turn="first hand"
          started={false}
          startTime={1689506676034}
        />
        {/* <MoveBard /> */}
        {children}
      </div>
    </div>
  );
};

export default FirstHandLayout;

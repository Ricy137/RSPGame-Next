"use client";
import { PropsWithChildren } from "react";
import { useAtomValue } from "jotai";
import ToolTip from "@/components/Tooltip";
import { QuestionIcon } from "@/components/Icons";
import { WrapperCard } from "@/components/Card";
import gameEssentialAtom, { syncGameAtom } from "@/services/game";
import FirstHandSolvingForm from "./FirstHandSolvingFrom";

const FirstHandSolving: React.FC = () => {
  return (
    <FirstHandWaiting>
      <FirstHandSolvingForm />
    </FirstHandWaiting>
  );
};

const FirstHandWaiting: React.FC<PropsWithChildren> = ({ children }) => {
  const gameEssential = useAtomValue(gameEssentialAtom);
  const data = useAtomValue(syncGameAtom);

  if (data?.status === "J2Moving")
    return (
      <WrapperCard className="flex flex-col gap-y-[24px] grow w-full">
        <div className="text-[16px] sm:text-[24px] leading-[24px] sm:leading-[32px] font-medium uppercase">
          Waiting for the second hand to play
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-x-[8px] break-all">
          <span className="flex flex-row items-center whitespace-nowrap">
            Game contract address
            <ToolTip text="Send the address to the second hand player for playing">
              <QuestionIcon />
            </ToolTip>
            {": "}
          </span>
          <span className="break-all">
            {gameEssential?.contractAdd ?? "--"}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-x-[8px]">
          <span className="flex flex-row items-center whitespace-nowrap">
            Salt &#40;don&#39;t leak!&#41;
            <ToolTip text="Secrete variable only existed locally. First hand need to save it to resolve the result.">
              <QuestionIcon />
            </ToolTip>
            {": "}
          </span>
          <span className="break-all">{gameEssential?.salt ?? "--"}</span>
        </div>
      </WrapperCard>
    );

  return <>{children}</>;
};

export default FirstHandSolving;

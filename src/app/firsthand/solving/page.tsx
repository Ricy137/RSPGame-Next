"use client";
import { useAtomValue } from "jotai";
import ToolTip from "@/components/Tooltip";
import { QuestionIcon } from "@/components/Icons";
import { WrapperCard } from "@/components/Card";
import gameEssentialAtom, { syncGameAtom } from "@/services/game";
import FirstHandSolvingForm from "./FirstHandSolvingFrom";

const FirstHandSolving: React.FC = () => {
  const gameEssential = useAtomValue(gameEssentialAtom);
  const data = useAtomValue(syncGameAtom);
  if (data?.status === "J1Solving") {
    return <FirstHandSolvingForm />;
  }

  return (
    <WrapperCard className="flex flex-col gap-y-[24px] grow w-full">
      <div className="text-[24px] leading-[32px] font-medium uppercase">
        Waiting for the second hand to play
      </div>
      <div className="flex flex-row items-center gap-x-[8px]">
        Game contract address
        <ToolTip text="Send the address to the second hand player for playing">
          <QuestionIcon />
        </ToolTip>
        {": "}
        {gameEssential?.contractAdd ?? "--"}
      </div>
      <div className="flex flex-row items-center gap-x-[8px]">
        Salt &#40; don&#39;t leak! &#41;
        <ToolTip text="Secrete variable only existed locally. Only useful for the first hand to resume game.">
          <QuestionIcon />
        </ToolTip>
        {": "}
        {gameEssential?.salt ?? "--"}
      </div>
    </WrapperCard>
  );
};

export default FirstHandSolving;

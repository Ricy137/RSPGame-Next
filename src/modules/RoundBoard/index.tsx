"use client";
import { useCallback, useState, useEffect, useDeferredValue } from "react";
import { useAtom } from "jotai";
import { countDownAtom } from "@/services/game";
import { WrapperCard } from "@/components/Card";
import { secondToFormat } from "@/utils/time";

const RoundBoard: React.FC = () => {
  const [gameInfo] = useAtom(countDownAtom);
  const defferedGameInfo = useDeferredValue(gameInfo);
  const endTime =
    new Date().getTime() + (defferedGameInfo?.leftTime ?? 0) * 1000;
  const [leftTime, setLeftTime] = useState<number>(
    defferedGameInfo?.leftTime ?? 0
  );

  const refreshTime = useCallback(() => {
    const now = new Date().getTime();
    const diff = endTime - now;
    setLeftTime(Math.floor(diff / 1000));
  }, [endTime]);

  useEffect(() => {
    if (!defferedGameInfo) return;
    const intervalId = setInterval(refreshTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <WrapperCard className="w-full">
      <div className="flex flex-row justify-between uppercase">
        <div className="text-[24px] leading-[32px] font-medium">
          turn: {defferedGameInfo?.turn ?? "--"}
        </div>
        <div className="text-[16px] leading-[24px] font-medium">
          count down: {defferedGameInfo ? secondToFormat(leftTime) : "--"}
        </div>
      </div>
    </WrapperCard>
  );
};

export const RoundBoardLoading: React.FC = () => (
  <WrapperCard className="w-full">
    <div className="flex flex-row justify-between uppercase">
      <div className="text-[24px] leading-[32px] font-medium">turn: "--"</div>
      <div className="text-[16px] leading-[24px] font-medium">
        count down: "--"
      </div>
    </div>
  </WrapperCard>
);

export default RoundBoard;

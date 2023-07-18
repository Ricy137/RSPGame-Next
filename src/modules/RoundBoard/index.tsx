"use client";
import { useCallback, useState, useEffect, useDeferredValue } from "react";
import { useAtom } from "jotai";
import { countDownAtom } from "@/services/game";
import { WrapperCard } from "@/components/Card";
import { secondToFormat } from "@/utils/time";
import TimeoutBtn from "./timeout";

const RoundBoard: React.FC = () => {
  const [gameInfo] = useAtom(countDownAtom);
  const defferedGameInfo = useDeferredValue(gameInfo);
  const started = defferedGameInfo?.started;
  const endTime =
    new Date().getTime() + (defferedGameInfo?.leftTime ?? 0) * 1000;
  const [leftTime, setLeftTime] = useState<number | undefined>(
    defferedGameInfo?.leftTime
  );
  console.log("leftTime", leftTime);

  const refreshTime = useCallback(() => {
    const now = new Date().getTime();
    const diff = endTime - now;
    setLeftTime(Math.floor(diff / 1000));
  }, [endTime]);

  useEffect(() => {
    if (!defferedGameInfo || !leftTime || leftTime < 0) return;
    const intervalId = setInterval(refreshTime, 1000);
    return () => clearInterval(intervalId);
  }, [leftTime]);

  useEffect(() => {
    if (!defferedGameInfo) return;
    setLeftTime(defferedGameInfo.leftTime);
  }, [defferedGameInfo, defferedGameInfo?.leftTime]);

  return (
    <WrapperCard className="w-full">
      <div className="flex flex-row justify-between items-center uppercase">
        <div className="text-[24px] leading-[32px] font-medium">
          turn: {defferedGameInfo?.turn ?? "--"}
        </div>
        <div className="flex flex-col items-center justify-between gap-y-[8px]">
          <div className="text-[16px] leading-[24px] font-medium">
            count down: {leftTime && started ? secondToFormat(leftTime) : "--"}
          </div>
        </div>
      </div>
    </WrapperCard>
  );
};

export const RoundBoardLoading: React.FC = () => (
  <WrapperCard className="w-full">
    <div className="flex flex-row justify-between uppercase">
      <div className="text-[24px] leading-[32px] font-medium">turn: --</div>
      <div className="text-[16px] leading-[24px] font-medium">
        count down: --
      </div>
    </div>
  </WrapperCard>
);

export default RoundBoard;

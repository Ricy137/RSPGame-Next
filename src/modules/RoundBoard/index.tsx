"use client";
import { useCallback, useState, useEffect, useMemo } from "react";
import { useAtom } from "jotai";
import { CountDownInfo, countDownAtom } from "@/services/game";
import { WrapperCard } from "@/components/Card";
import { secondToFormat } from "@/utils/time";

const RoundBoard: React.FC = () => {
  const [gameInfo] = useAtom(countDownAtom);
  // const gameInfo: CountDownInfo | null = null;
  const endTime = new Date().getTime() + (gameInfo?.leftTime ?? 0) * 1000;
  const [leftTime, setLeftTime] = useState<number>(gameInfo?.leftTime ?? 0);

  const refreshTime = useCallback(() => {
    const now = new Date().getTime();
    const diff = endTime - now;
    setLeftTime(Math.floor(diff / 1000));
  }, [endTime]);

  useEffect(() => {
    if (!gameInfo) return;
    const intervalId = setInterval(refreshTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <WrapperCard className="w-full">
      <div className="flex flex-row justify-between uppercase">
        <div className="text-[24px] leading-[32px] font-medium">
          turn: {gameInfo?.turn ?? "--"}
        </div>
        <div className="text-[16px] leading-[24px] font-medium">
          count down: {gameInfo ? secondToFormat(leftTime) : "--"}
        </div>
      </div>
    </WrapperCard>
  );
};

export default RoundBoard;

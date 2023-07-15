"use client";
import { useCallback, useState, useEffect } from "react";
import { WrapperCard } from "@/components/Card";
import { secondToFormat } from "@/utils/time";

interface RoundBoardProps {
  turn: "first hand" | "second hand";
  started: boolean;
  startTime: number;
}

const RoundBoard: React.FC<RoundBoardProps> = ({
  turn,
  started,
  startTime,
}) => {
  const [leftTime, setLeftTime] = useState<number>(5 * 60 * 1000);
  const refreshTime = useCallback(() => {
    const now = new Date().getTime();
    const diff = now - startTime;
    setLeftTime(leftTime - diff);
  }, []);

  useEffect(() => {
    if (!started) return;
    const intervalId = setInterval(refreshTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <WrapperCard className="w-full">
      <div className="flex flex-row justify-between uppercase">
        <div className="text-[24px] leading-[32px] font-medium">
          turn: {turn}
        </div>
        <div className="text-[16px] leading-[24px] font-medium">
          count down: {started ? secondToFormat(leftTime) : "infinity"}
        </div>
      </div>
    </WrapperCard>
  );
};

export default RoundBoard;

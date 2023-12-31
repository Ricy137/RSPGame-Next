"use client";
import { useCallback, useState, useEffect, useDeferredValue } from "react";
import { useAtom } from "jotai";
import { countDownAtom, DefaultGameInfo } from "@/services/game";
import { WrapperCard } from "@/components/Card";
import { secondToFormat } from "@/utils/time";
import TimeoutBtn from "./timeout";

const RoundBoard: React.FC = () => {
  const [gameInfo] = useAtom(countDownAtom);
  const defferedGameInfo = useDeferredValue(gameInfo);
  const { started, timeoutStamp: endTime } =
    defferedGameInfo ?? DefaultGameInfo;
  const [leftTime, setLeftTime] = useState<number | undefined>();

  const refreshTime = useCallback(() => {
    const now = new Date().getTime();
    const diff = endTime - now;
    setLeftTime(Math.floor(diff / 1000));
  }, [endTime]);

  useEffect(() => {
    if (!defferedGameInfo || !defferedGameInfo.started) return;
    const now = new Date().getTime();
    setLeftTime(Math.floor((endTime - now) / 1000));
    const intervalId = setInterval(refreshTime, 1000);
    return () => clearInterval(intervalId);
  }, [defferedGameInfo, defferedGameInfo?.timeoutStamp]);

  return (
    <WrapperCard className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-center uppercase">
        <div className="text-[16px] sm:text-[24px] leading-[24px] sm:leading-[32px] font-medium">
          turn: {defferedGameInfo?.turn ?? "--"}
        </div>
        <div className="flex flex-col items-center justify-between gap-y-[8px]">
          <div className="flex flex-col sm:flex-row items-center text-[12px] sm:text-[16px] leading-[20px] sm:leading-[24px] font-medium">
            count down:
            <span>{leftTime && started ? secondToFormat(leftTime) : "--"}</span>
          </div>
          {leftTime &&
            leftTime < 0 &&
            defferedGameInfo &&
            defferedGameInfo.started && (
              <TimeoutBtn timeout={defferedGameInfo.turn} />
            )}
        </div>
      </div>
    </WrapperCard>
  );
};

export const RoundBoardLoading: React.FC = () => (
  <WrapperCard className="w-full">
    <div className="flex flex-col md:flex-row justify-between uppercase">
      <div className="text-[24px] leading-[32px] font-medium">turn: --</div>
      <div className="text-[16px] leading-[24px] font-medium">
        count down: --
      </div>
    </div>
  </WrapperCard>
);

export default RoundBoard;

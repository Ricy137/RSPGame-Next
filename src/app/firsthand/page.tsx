"use client";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSetAtom } from "jotai";
import { isAddress } from "ethers";
import cx from "clsx";
import useInTransaction from "@/hooks/useInTransaction";
import MoveBoard from "@/modules/MoveBoard";
import AuthConnect from "@/modules/AuthConnect";
import Input from "@/components/Input";
import { WrapperCard } from "@/components/Card";
import { useShowToast } from "@/components/Toast";
import gameEssentialAtom, { useStartGame } from "@/services/game";
import { errorMessage } from "@/utils/error";

interface StartForm {
  move: number;
  stake: number;
  j2: string;
}

const FirstHand: React.FC = () => {
  const setGameEssential = useSetAtom(gameEssentialAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<StartForm>();
  const { startGame } = useStartGame();
  const showToast = useShowToast();

  const onSubmit = useCallback(async ({ move, j2, stake }: StartForm) => {
    try {
      await startGame(move, j2, stake);
    } catch (err) {
      if (err instanceof Error) {
        const message = errorMessage(err);
        showToast({ content: message, type: "failed" });
      }
      console.log(err);
    }
  }, []);

  const { loading, handleExecAction } = useInTransaction(onSubmit);

  useEffect(() => {
    setGameEssential(null);
  }, []);

  return (
    <WrapperCard className="w-full">
      <form
        className="flex flex-col items-center gap-y-[24px]"
        onSubmit={handleSubmit(handleExecAction)}
      >
        <MoveBoard
          {...register("move", {
            required: true,
            validate: (value) => value > 0,
          })}
          setValue={setValue}
          error={!!errors.move}
        />
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-x-[8px] w-full sm:w-fit">
          <Input
            title="Please enter second player's EVM address"
            lableClassName="w-[300px] sm:text-end"
            type="text"
            error={!!errors.j2}
            {...register("j2", {
              required: true,
              validate: (value) => isAddress(value),
            })}
          />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-x-[8px] w-full sm:w-fit">
          <Input
            title="Stake amount in ether:"
            type="number"
            lableClassName="w-[300px] sm:text-end"
            {...register("stake", {
              required: true,
              validate: (value) => value > 0,
            })}
            min={0.000000000000000001}
          />
        </div>
        <AuthConnect>
          <input
            type="submit"
            value={
              loading ? "pending..." : "Create the game and commit you move"
            }
            className={cx(
              "px-[14px] flex flex-row justify-center items-center h-[32px] whitespace-nowrap cursor-pointer border-[1px] text-[14px] rounded-[8px] leading-[22px] bg-[#111111] text-[#F1F1F3] hover:bg-[#292E41] hover:text-[#F1F1F3]",
              loading && "pointer-events-none cursor-not-allowed opacity-30"
            )}
          />
        </AuthConnect>
      </form>
    </WrapperCard>
  );
};

export default FirstHand;

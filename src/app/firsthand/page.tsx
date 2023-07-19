"use client";
import { useForm } from "react-hook-form";
import cx from "clsx";
import useInTransaction from "@/hooks/useInTransaction";
import MoveBoard from "@/modules/MoveBoard";
import AuthConnect from "@/modules/AuthConnect";
import Input from "@/components/Input";
import { WrapperCard } from "@/components/Card";
import { useStartGame } from "@/services/game";
import { useCallback } from "react";

interface StartForm {
  move: number;
  stake: number;
  j2: string;
}

const FirstHand: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<StartForm>();
  const { startGame } = useStartGame();

  const onSubmit = useCallback(async ({ move, j2, stake }: StartForm) => {
    try {
      await startGame(move, j2, stake);
      reset();
    } catch (err) {
      if (err instanceof Error) alert(err?.message);
      console.log(err);
    }
  }, []);

  const { loading, handleExecAction } = useInTransaction(onSubmit);

  return (
    <WrapperCard className="w-full">
      <form
        className="flex flex-col items-center gap-y-[24px]"
        onSubmit={handleSubmit(handleExecAction)}
      >
        <MoveBoard
          {...register("move", { required: true })}
          setValue={setValue}
        />
        <div className="flex flex-row items-center gap-x-[8px]">
          <Input
            title="Please enter the address of the second player"
            lableClassName="w-[300px] text-end"
            type="text"
            {...register("j2", {
              required: true,
            })}
          />
        </div>
        <div className="flex flex-row items-center gap-x-[8px]">
          <Input
            title="Stake amount in ether:"
            type="number"
            lableClassName="w-[300px] text-end"
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

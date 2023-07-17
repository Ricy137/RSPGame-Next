"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import MoveBard from "@/modules/MoveBoard";
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
  } = useForm<StartForm>();
  const { startGame } = useStartGame();

  const onSubmit: SubmitHandler<StartForm> = useCallback(
    async ({ move, j2, stake }: StartForm) => {
      try {
        await startGame(move, j2, stake);
      } catch (err) {
        console.log(err);
      }
    },
    []
  );
  return (
    <WrapperCard className="w-full">
      <form
        className="flex flex-col items-center gap-y-[24px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <MoveBard
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
            title="Staket amount in ether:"
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
            value="Create the game and commit you move"
            className="px-[14px] flex flex-row justify-center items-center h-[32px] whitespace-nowrap cursor-pointer border-[1px] text-[14px] rounded-[8px] leading-[22px] bg-[#111111] text-[#F1F1F3] hover:bg-[#292E41] hover:text-[#F1F1F3]"
          />
        </AuthConnect>
      </form>
    </WrapperCard>
  );
};

export default FirstHand;

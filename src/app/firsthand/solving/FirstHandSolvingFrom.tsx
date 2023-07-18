"use client";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import cx from "clsx";
import useInTransaction from "@/hooks/useInTransaction";
import { WrapperCard } from "@/components/Card";
import Input from "@/components/Input";
import AuthConnect from "@/modules/AuthConnect";
import { useResolveGame } from "@/services/game";

interface SolveForm {
  move: number;
  salt: string;
}

const FirstHandSolvingForm: React.FC = () => {
  const resolveGame = useResolveGame();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SolveForm>();
  const onSubmit = useCallback(async ({ move, salt }: SolveForm) => {
    try {
      await resolveGame(move, salt);
      reset();
    } catch (err) {
      if (err instanceof Error) alert(err?.message);
      console.log(err);
    }
  }, []);

  const { loading, handleExecAction } = useInTransaction(onSubmit);

  return (
    <WrapperCard className="flex flex-col gap-y-[24px] grow w-full">
      <form
        className="flex flex-col items-center gap-y-[24px]"
        onSubmit={handleSubmit(handleExecAction)}
      >
        <div className="flex flex-row items-center gap-x-[8px]">
          <Input
            title="Move:"
            type="number"
            lableClassName="w-[100px] text-end"
            {...register("move", {
              required: true,
            })}
          />
        </div>
        <div className="flex flex-row items-center gap-x-[8px]">
          <Input
            title="Salt:"
            type="text"
            lableClassName="w-[100px] text-end"
            {...register("salt", {
              required: true,
            })}
          />
        </div>
        <AuthConnect>
          <input
            type="submit"
            value={loading ? "pending" : "resolve the result"}
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

export default FirstHandSolvingForm;

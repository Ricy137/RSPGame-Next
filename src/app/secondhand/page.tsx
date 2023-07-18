"use client";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import cx from "clsx";
import useInTransaction from "@/hooks/useInTransaction";
import { WrapperCard } from "@/components/Card";
import MoveBard from "@/modules/MoveBoard";
import AuthConnect from "@/modules/AuthConnect";
import { playAtom } from "@/services/game";
import { useCallback } from "react";

interface PlayForm {
  move: number;
}

const SecondHand: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<PlayForm>();
  const [, mutate] = useAtom(playAtom);
  const router = useRouter();

  const onSubmit = useCallback(async (formData: PlayForm) => {
    try {
      await mutate([formData.move]);
      reset();
      router.push("/secondhand/solving");
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
        return;
      }
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
        <MoveBard
          {...register("move", { required: true })}
          setValue={setValue}
        />
        <AuthConnect gameInfoRequired={true}>
          <input
            type="submit"
            value={loading ? "pending" : "Make the move"}
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

export default SecondHand;

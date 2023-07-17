"use client";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
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
  } = useForm<PlayForm>();
  const [data, mutate] = useAtom(playAtom);

  const onSubmit = useCallback(async (formData: PlayForm) => {
    try {
      await mutate([formData.move]);
    } catch (err) {
      console.log(err);
    }
  }, []);

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
        <AuthConnect>
          <input
            type="submit"
            value="Make the move"
            className="px-[14px] flex flex-row justify-center items-center h-[32px] whitespace-nowrap cursor-pointer border-[1px] text-[14px] rounded-[8px] leading-[22px] bg-[#111111] text-[#F1F1F3] hover:bg-[#292E41] hover:text-[#F1F1F3]"
          />
        </AuthConnect>
      </form>
    </WrapperCard>
  );
};

export default SecondHand;

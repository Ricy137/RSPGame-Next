"use client";
import { WrapperCard } from "@/components/Card";
import { useForm, SubmitHandler } from "react-hook-form";
import MoveBard from "@/modules/MoveBoard";
import Input from "@/components/Input";
import { useStartGame } from "@/services/game";

interface StartForm {
  move: number;
  staked: number;
}

const FirstHand: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<StartForm>();
  // console.log(errors);
  const onSubmit: SubmitHandler<StartForm> = (data) => console.log(data);
  const { startGame } = useStartGame();
  startGame(1);

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
            title="Staket amount in ether:"
            {...register("staked", {
              required: true,
              validate: (value) => value > 0,
            })}
            min={0.000000000000000001}
          />
        </div>
        <input
          type="submit"
          value="Create the game and commit you move"
          className="px-[14px] flex flex-row justify-center items-center h-[32px] whitespace-nowrap cursor-pointer border-[1px] text-[14px] rounded-[8px] leading-[22px] bg-[#111111] text-[#F1F1F3] hover:bg-[#292E41] hover:text-[#F1F1F3]"
        />
      </form>
    </WrapperCard>
  );
};

export default FirstHand;

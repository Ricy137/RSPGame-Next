"use client";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { WrapperCard } from "@/components/Card";
import Input from "@/components/Input";
import Button from "@/components/Button";
import AuthConnect from "@/modules/AuthConnect";
import { useJoinGame } from "@/services/game";
import useInTransaction from "@/hooks/useInTransaction";

interface JoinForm {
  contractAddress: string;
}
const SecondHandCard: React.FC = () => {
  const { joinGame } = useJoinGame();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JoinForm>();

  const onSubmit = useCallback(
    async (data: JoinForm) => {
      try {
        await joinGame(data.contractAddress);
        reset();
      } catch (err) {
        console.log(err);
        if (err instanceof Error) alert(err?.message);
      }
    },
    [joinGame]
  );

  const { loading, handleExecAction } = useInTransaction(onSubmit);

  return (
    <WrapperCard className="flex flex-col justify-between items-center gap-y-[24px] w-[350px] h-[350px]">
      <div className="text-[24px] leading-[32px]">Join as the Second Hand</div>
      <form
        className="flex flex-col items-center gap-y-[24px]"
        onSubmit={handleSubmit(handleExecAction)}
      >
        <div>
          <Input
            {...register("contractAddress", { required: true })}
            title="Enter the contract address the first player has created:"
          />
        </div>
        <AuthConnect>
          <Button disabled={loading}>
            {loading ? "pending..." : "Join the game"}
          </Button>
        </AuthConnect>
      </form>
    </WrapperCard>
  );
};

export default SecondHandCard;

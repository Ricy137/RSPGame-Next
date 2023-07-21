"use client";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { isAddress } from "ethers";
import { WrapperCard } from "@/components/Card";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useShowToast } from "@/components/Toast";
import AuthConnect from "@/modules/AuthConnect";
import { useJoinGame } from "@/services/game";
import useInTransaction from "@/hooks/useInTransaction";
import { errorMessage } from "@/utils/error";

interface JoinForm {
  contractAddress: string;
}
const SecondHandCard: React.FC = () => {
  const { joinGame } = useJoinGame();
  const showToast = useShowToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinForm>();

  const onSubmit = useCallback(
    async (data: JoinForm) => {
      try {
        await joinGame(data.contractAddress);
      } catch (err) {
        console.log(err);
        if (err instanceof Error) {
          const message = errorMessage(err);
          showToast({ content: message, type: "failed" });
        }
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
            error={!!errors.contractAddress}
            {...register("contractAddress", {
              required: true,
              validate: (value) => isAddress(value),
            })}
            title="Enter the EVM contract address the first player has created:"
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

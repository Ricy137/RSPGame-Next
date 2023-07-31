"use client";
import { useCallback } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { isAddress } from "ethers";
import { WrapperCard } from "@/components/Card";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useShowToast } from "@/components/Toast";
import AuthConnect from "@/modules/AuthConnect";
import { useResumeGame } from "@/services/game";
import useInTransaction from "@/hooks/useInTransaction";
import { errorMessage } from "@/utils/error";

interface ResumeForm {
  contractAdd: string;
}
const FirstHandCard: React.FC = () => {
  const { resumeGame } = useResumeGame();
  const showToast = useShowToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResumeForm>();

  const onSubmit = useCallback(async (data: ResumeForm) => {
    try {
      const { contractAdd } = data;
      await resumeGame(contractAdd);
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        const message = errorMessage(err);
        showToast({ content: message, type: "failed" });
      }
    }
  }, []);
  const { loading, handleExecAction } = useInTransaction(onSubmit);

  return (
    <WrapperCard className="flex flex-col justify-between items-center gap-y-[24px] w-[350px] h-[350px]">
      <div className="text-[16px] sm:text-[24px] leading-[24px] smleading-[32px]">
        Join as First Hand
      </div>
      <AuthConnect>
        <Link href="/firsthand">
          <Button>Create and start the game</Button>
        </Link>
      </AuthConnect>
      <form
        className="flex flex-col items-center gap-y-[24px]"
        onSubmit={handleSubmit(handleExecAction)}
      >
        <div className="text-center">
          <Input
            error={!!errors.contractAdd}
            {...register("contractAdd", {
              required: true,
              validate: (value) => isAddress(value),
            })}
            title="Or enter the EVM contract address you created to resume:"
          />
        </div>
        <AuthConnect>
          <Button disabled={loading}>
            {loading ? "pending..." : "Resume the game"}
          </Button>
        </AuthConnect>
      </form>
    </WrapperCard>
  );
};

export default FirstHandCard;

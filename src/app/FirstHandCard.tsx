"use client";
import { useCallback } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { isAddress } from "ethers";
import { WrapperCard } from "@/components/Card";
import Button from "@/components/Button";
import Input from "@/components/Input";
import AuthConnect from "@/modules/AuthConnect";
import { useResumeGame } from "@/services/game";
import { errorMessage } from "@/utils/error";

interface ResumeForm {
  contractAdd: string;
}
const FirstHandCard: React.FC = () => {
  const { resumeGame } = useResumeGame();
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
        alert(message);
      }
    }
  }, []);

  return (
    <WrapperCard className="flex flex-col justify-between items-center gap-y-[24px] w-[350px] h-[350px]">
      <div className="text-[24px] leading-[32px]">Join as First Hand</div>
      <AuthConnect>
        <Link href="/firsthand">
          <Button>Create and start the game</Button>
        </Link>
      </AuthConnect>
      <form
        className="flex flex-col items-center gap-y-[24px]"
        onSubmit={handleSubmit(onSubmit)}
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
          <Button>Resume the game</Button>
        </AuthConnect>
      </form>
    </WrapperCard>
  );
};

export default FirstHandCard;

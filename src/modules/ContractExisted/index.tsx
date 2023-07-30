import { PropsWithChildren } from "react";
import { useAtomValue } from "jotai";
import Button from "@/components/Button";
import gameEssentialAtom from "@/services/game";
import { WrapperCard } from "@/components/Card";
import Link from "next/link";

const ContractExisted: React.FC<PropsWithChildren> = ({ children }) => {
  const gameEssential = useAtomValue(gameEssentialAtom);
  if (gameEssential?.contractAdd) return <>{children}</>;

  return (
    <WrapperCard className="flex flex-col justify-center items-center gap-y-[24px] w-full h-full text-[16px] leading-[24px]">
      <Link href="/">
        <Button>Contract address lost,resume from landing</Button>
      </Link>
    </WrapperCard>
  );
};

export default ContractExisted;

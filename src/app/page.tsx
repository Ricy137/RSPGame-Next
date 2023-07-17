import Link from "next/link";
import { WrapperCard } from "@/components/Card";
import Button from "@/components/Button";
import AuthConnect from "@/modules/AuthConnect";
import SecondHandCard from "./SecondHandCard";

export default function Home() {
  return (
    <main className="p-[24px] flex flex-col gap-y-[32px] min-h-screen max-w-[1920px] items-center justify-center">
      <div className="flex flex-row gap-x-[32px]">
        <FirstHandCard />
        <SecondHandCard />
      </div>
    </main>
  );
}

const FirstHandCard: React.FC = () => {
  return (
    <WrapperCard className="flex flex-col justify-between items-center gap-y-[24px] w-[350px] h-[300px]">
      <div className="text-[24px] leading-[32px]">Join as Second Hand</div>
      <AuthConnect>
        <Link href="/firsthand">
          <Button>Create and start the game</Button>
        </Link>
      </AuthConnect>
    </WrapperCard>
  );
};

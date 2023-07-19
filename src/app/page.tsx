import FirstHandCard from "./FirstHandCard";
import SecondHandCard from "./SecondHandCard";
import { WrapperCard } from "@/components/Card";

export default function Home() {
  return (
    <main className="p-[24px] flex flex-col gap-y-[32px] min-h-screen max-w-[1920px] items-center justify-center">
      <WrapperCard className="w-[732px] text-[24px] leading-[32px]">
        Goerli Network
      </WrapperCard>
      <div className="flex flex-row gap-x-[32px]">
        <FirstHandCard />
        <SecondHandCard />
      </div>
    </main>
  );
}

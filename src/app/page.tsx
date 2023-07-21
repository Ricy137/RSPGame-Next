import FirstHandCard from "./FirstHandCard";
import SecondHandCard from "./SecondHandCard";
import { WrapperCard } from "@/components/Card";

export default function Home() {
  return (
    <main className="p-[24px] flex justify-center items-center min-h-screen max-w-[1920px]">
      <div className="grid grid-cols-2 gap-[32px]">
        <WrapperCard className="col-span-2 flex flex-row justify-between w-[732px] h-fit text-[24px] leading-[32px]">
          Goerli Network
          <a
            href="https://en.wikipedia.org/wiki/Rock_paper_scissors#Additional_weapons"
            target="_blank"
            className="ml-[8px]"
          >
            Game rules
          </a>
        </WrapperCard>
        <FirstHandCard />
        <SecondHandCard />
      </div>
    </main>
  );
}

import FirstHandCard from "./FirstHandCard";
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

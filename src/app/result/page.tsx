"use client";
// import { useEffect } from "react";
import { useAtom } from "jotai";
import Link from "next/link";
import Button from "@/components/Button";
import { resultAtom } from "@/services/result";
import { WrapperCard } from "@/components/Card";
const Result: React.FC = () => {
  const [resultDate] = useAtom(resultAtom);
  // let resultDate: string[] | undefined;
  // useEffect(() => {
  //   const [data] = useAtom(resultAtom);
  //   resultDate = data;
  // }, []);
  // if (!resultDate)
  //   return (
  //     <div className="flex flex-col items-center gap-y-[24px] w-full">
  //       <h2>Something went wrong!</h2>
  //       <Link href="/">
  //         <Button>Back to landing to resume game data first</Button>
  //       </Link>
  //     </div>
  //   );
  if (resultDate && resultDate?.length && resultDate.length > 1)
    return (
      <WrapperCard className="flex flex-col items-center w-full min-h-500px">
        <div className="text-[24px] leading-[32px] font-medium">TIE</div>
        <div className="text-[16px] leading-[24px]">
          stake will be splited and return to:
        </div>
        <div className="text-[16px] leading-[24px]">
          {resultDate.join(", ")}
        </div>
      </WrapperCard>
    );
  return (
    <WrapperCard className="flex flex-col items-center w-full min-h-500px">
      <div className="text-[24px] leading-[32px] font-medium">
        WINNER Address:
      </div>
      <div className="text-[16px] leading-[24px]">{resultDate ?? ""}</div>
    </WrapperCard>
  );
};

export default Result;

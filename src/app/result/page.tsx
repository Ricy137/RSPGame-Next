"use client";
import { useState, useEffect, useCallback } from "react";
import { useAtom, useAtomValue } from "jotai";
import Button from "@/components/Button";
import { resultAtom } from "@/services/result";
import gameEssentialAtom from "@/services/game";
import { WrapperCard } from "@/components/Card";
import useInTransaction from "@/hooks/useInTransaction";
import Link from "next/link";

const Result: React.FC = () => {
  const gameEssential = useAtomValue(gameEssentialAtom);
  const [data, dispatch] = useAtom(resultAtom);
  const [resultData, setResultData] = useState<string[] | null>();

  useEffect(() => {
    if (data && data.pages) {
      let reverse = data.pages.reverse();
      setResultData(reverse[0]);
    }
  }, [data]);

  const handleRefetch = useCallback(async () => {
    await dispatch({ type: "fetchNextPage" });
  }, [dispatch]);

  const { loading, handleExecAction } = useInTransaction(handleRefetch);

  if (resultData && resultData?.length && resultData.length > 1)
    return (
      <WrapperCard className="flex flex-col items-center w-full min-h-500px">
        <div className="text-[16px] sm:text-[24px] leading-[24px] sm:leading-[32px] font-medium">
          TIE
        </div>
        <div className="text-[16px] sm:text-[24px] leading-[24px] sm:leading-[32px]">
          stake will be splited and return to:
        </div>
        <div className="w-full flex flex-col">
          {resultData.map((result) => (
            <div
              key={result}
              className="w-full text-[16px] leading-[24px] text-center truncate"
            >
              {result}
            </div>
          ))}
        </div>
      </WrapperCard>
    );
  return (
    <WrapperCard className="flex flex-col items-center gap-y-[24px] w-full min-h-500px">
      <div className="text-[16px] sm:text-[24px] leading-[24px] sm:leading-[32px] font-medium">
        WINNER Address:
      </div>
      <div className="w-full flex justify-center text-[16px] leading-[24px] text-center truncate">
        {resultData ??
          (gameEssential && gameEssential.contractAdd ? (
            <>
              <Button disabled={loading} onClick={handleExecAction}>
                Refetch data
              </Button>
            </>
          ) : (
            <Link href="/">
              <Button>
                Contract address lost, back to landing page to resume
              </Button>
            </Link>
          ))}
      </div>
      <div>
        It takes a while for the result to be fetched, you can also try to
        refetch
      </div>
    </WrapperCard>
  );
};

export default Result;

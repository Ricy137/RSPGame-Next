"use client";
import { useState, useEffect, useCallback } from "react";
import { useAtom } from "jotai";
import Button from "@/components/Button";
import { resultAtom } from "@/services/result";
import { WrapperCard } from "@/components/Card";
import useInTransaction from "@/hooks/useInTransaction";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [data, dispatch] = useAtom(resultAtom);
  const [resultData, setResultData] = useState<string[] | null>();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

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
        <div className="text-[24px] leading-[32px] font-medium">TIE</div>
        <div className="text-[16px] leading-[24px]">
          stake will be splited and return to:
        </div>
        <div className="text-[16px] leading-[24px]">
          {resultData.join(", ")}
        </div>
      </WrapperCard>
    );
  return (
    <WrapperCard className="flex flex-col items-center gap-y-[24px] w-full min-h-500px">
      <div className="text-[24px] leading-[32px] font-medium">
        WINNER Address:
      </div>
      <div className="text-[16px] leading-[24px]">{resultData ?? ""}</div>
      <div>
        It takes a while for the result to be fetched, you can try to refetch
      </div>
      <Button disabled={loading} onClick={handleExecAction}>
        Refetch data
      </Button>
    </WrapperCard>
  );
}

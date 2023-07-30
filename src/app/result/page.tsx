"use client";
import { useState, useEffect, useCallback } from "react";
import { useAtom } from "jotai";
import Button from "@/components/Button";
import { WrapperCard } from "@/components/Card";
import ContractExisted from "@/modules/ContractExisted";
import { resultAtom } from "@/services/result";
import useInTransaction from "@/hooks/useInTransaction";

const Result: React.FC = () => {
  const [data] = useAtom(resultAtom);
  const [resultData, setResultData] = useState<string[] | null>();

  useEffect(() => {
    if (data && data.pages) {
      let reverse = data.pages.reverse();
      setResultData(reverse[0]);
    }
  }, [data]);
  if (!resultData)
    return (
      <ContractExisted>
        <ResultRefetch />
      </ContractExisted>
    );
  return <ResultSuccess resultData={resultData} />;
};

const ResultSuccess: React.FC<{ resultData: string[] }> = ({ resultData }) => {
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
        {resultData[0]}
      </div>
    </WrapperCard>
  );
};

const ResultRefetch: React.FC = () => {
  const [, dispatch] = useAtom(resultAtom);
  const handleRefetch = useCallback(async () => {
    await dispatch({ type: "fetchNextPage" });
  }, [dispatch]);

  const { loading, handleExecAction } = useInTransaction(handleRefetch);

  return (
    <WrapperCard className="py-[80px] w-full flex flex-col justify-center gap-y-[24px] text-[16px] leading-[24px]">
      <div>
        It takes a while for the result data to be available, please try to
        refetch
      </div>
      <Button disabled={loading} onClick={handleExecAction}>
        Refetch data
      </Button>
    </WrapperCard>
  );
};

export default Result;

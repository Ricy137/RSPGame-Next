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
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const handleRefresh = useCallback(async () => {
    location.reload();
  }, []);

  return (
    <WrapperCard className="flex flex-col items-center gap-y-[24px] w-full min-h-500px">
      <div className="text-[16px] sm:text-[24px] leading-[24px] sm:leading-[32px] font-medium">
        Errors occured
      </div>
      <Button onClick={handleRefresh}>Refresh the page to try again</Button>
    </WrapperCard>
  );
}

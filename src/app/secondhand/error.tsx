"use client";
import { useEffect } from "react";
import Link from "next/link";
import Button from "@/components/Button";

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

  return (
    <div className="flex flex-col items-center gap-y-[24px] w-full">
      <h2>Something went wrong!</h2>
      <Link href="/">
        <Button>Back to landing to resume game data first</Button>
      </Link>
    </div>
  );
}

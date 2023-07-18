"use client";
import { useAtomValue } from "jotai";
import useInTransaction from "@/hooks/useInTransaction";
import Button from "@/components/Button";
import { timeoutAtom, useTimeout } from "@/services/timeout";
import { Suspense } from "react";

const TimeoutBtnContent: React.FC = () => {
  const timeout = useAtomValue(timeoutAtom);

  if (timeout === "first hand") return <J1TimeoutBtn />;
  if (timeout === "second hand") return <J2TimeoutBtn />;
  return <></>;
};

const TimeoutBtn: React.FC = () => {
  return (
    <Suspense fallback={<></>}>
      <TimeoutBtnContent />
    </Suspense>
  );
};

const J1TimeoutBtn: React.FC = () => {
  const { j1Timeout } = useTimeout();
  const { loading, handleExecAction } = useInTransaction(j1Timeout);
  return loading ? (
    <Button disabled={true}>pending</Button>
  ) : (
    <Button onClick={handleExecAction}>withdraw&#40; for j2 &#41;</Button>
  );
};

const J2TimeoutBtn: React.FC = () => {
  const { j2Timeout } = useTimeout();
  const { loading, handleExecAction } = useInTransaction(j2Timeout);
  return loading ? (
    <Button disabled={true}>pending</Button>
  ) : (
    <Button>withdraw&#40; for j1 &#41;</Button>
  );
};

export default TimeoutBtn;

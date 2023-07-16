"use client";
import { PropsWithChildren, useCallback, MouseEvent } from "react";
import { useAtom } from "jotai";
import { accountsAtom } from "@/services/accounts";
import Button from "@/components/Button";

const AuthConnect: React.FC<PropsWithChildren> = ({ children, ...props }) => {
  const [accounts, mutate] = useAtom(accountsAtom);
  const connect = useCallback(async (e: MouseEvent) => {
    e.preventDefault();
    mutate([{ type: "connect" }]);
  }, []);

  if (accounts.data?.length && accounts.data?.length > 0)
    return <>{children}</>;
  return <Button onClick={connect}>Connect Wallet</Button>;
};

export default AuthConnect;

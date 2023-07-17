"use client";
import { PropsWithChildren, useCallback, MouseEvent } from "react";
import Link from "next/link";
import { useAtom, useAtomValue } from "jotai";
import { accountsAtom } from "@/services/accounts";
import gameEssentialAtom from "@/services/game";
import Button from "@/components/Button";

const AuthConnect: React.FC<
  PropsWithChildren & { gameInfoRequired?: boolean }
> = ({ children, gameInfoRequired, ...props }) => {
  const [accounts, mutate] = useAtom(accountsAtom);
  const gameEssential = useAtomValue(gameEssentialAtom);
  const connect = useCallback(async (e: MouseEvent) => {
    e.preventDefault();
    mutate([{ type: "connect" }]);
  }, []);

  if (!accounts.data || accounts.data.length == 0)
    return <Button onClick={connect}>Connect Wallet</Button>;

  if (gameInfoRequired && (!gameEssential || !gameEssential.contractAdd))
    return (
      <Link href="/">
        <Button>Back to landing to resume game data first</Button>
      </Link>
    );
  return <>{children}</>;
};

export default AuthConnect;

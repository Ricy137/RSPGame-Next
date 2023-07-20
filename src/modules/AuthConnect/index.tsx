"use client";
import { PropsWithChildren } from "react";
import Link from "next/link";
import { useAtomValue } from "jotai";
import {
  useAccountsAtom,
  accountsAtom,
  networkAtom,
} from "@/services/accounts";
import gameEssentialAtom from "@/services/game";
import Button from "@/components/Button";
import useInTransaction from "@/hooks/useInTransaction";

const AuthConnect: React.FC<
  PropsWithChildren & { gameInfoRequired?: boolean }
> = ({ children, gameInfoRequired, ...props }) => {
  const { connect } = useAccountsAtom();
  const accounts = useAtomValue(accountsAtom);
  const network = useAtomValue(networkAtom);
  const networkMatch = network === "5";
  const gameEssential = useAtomValue(gameEssentialAtom);
  const { loading, handleExecAction } = useInTransaction(connect);

  if (accounts && accounts.length > 0 && networkMatch) return <>{children}</>;

  if (gameInfoRequired && (!gameEssential || !gameEssential.contractAdd))
    return (
      <Link href="/">
        <Button>Back to landing to resume game data first</Button>
      </Link>
    );
  return (
    <Button onClick={handleExecAction} disabled={loading}>
      {!accounts || (accounts.length === 0 && "Connect Wallet")}
      {accounts && !networkMatch && "Switch Wallet"}
    </Button>
  );
};

export default AuthConnect;

"use client";
import { PropsWithChildren } from "react";
import Link from "next/link";
import { useAtomValue } from "jotai";
import {
  useAccountsAtom,
  accountsAtom,
  networkAtom,
} from "@/services/accounts";
import Button from "@/components/Button";
import useInTransaction from "@/hooks/useInTransaction";

const AuthConnect: React.FC<PropsWithChildren> = ({ children, ...props }) => {
  const { connect } = useAccountsAtom();
  const accounts = useAtomValue(accountsAtom);
  const network = useAtomValue(networkAtom);
  const networkMatch = network === "5";
  const { loading, handleExecAction } = useInTransaction(connect);

  if (accounts && accounts.length > 0 && networkMatch) return <>{children}</>;

  return (
    <Button onClick={handleExecAction} disabled={loading} {...props}>
      {!accounts || (accounts.length === 0 && "Connect Wallet")}
      {accounts && !networkMatch && "Switch Wallet"}
    </Button>
  );
};

export default AuthConnect;

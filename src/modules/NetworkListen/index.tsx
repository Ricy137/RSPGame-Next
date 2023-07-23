"use client";
import { PropsWithChildren, useEffect } from "react";
import { useSetAtom, useAtom } from "jotai";
import { accountsAtom } from "@/services/accounts";

const NetworkListener: React.FC<PropsWithChildren> = ({ children }) => {
  const setAccount = useSetAtom(accountsAtom);
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts);
      });
    }
  }, []);

  return <>{children}</>;
};

export default NetworkListener;

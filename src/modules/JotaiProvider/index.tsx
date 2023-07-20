"use client";
import { ReactNode, useCallback, useEffect } from "react";
import { Provider } from "jotai";
import { useAtom } from "jotai";
import { useAccountsAtom } from "@/services/accounts";

const JotaiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Provider>
      <AccountWrapper>{children}</AccountWrapper>
    </Provider>
  );
};

export default JotaiProvider;

const AccountWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { initial } = useAccountsAtom();

  useEffect(() => {
    try {
      initial();
    } catch (e) {
      console.log(e);
      if (e instanceof Error) alert(e?.message);
    }
  }, []);
  return <>{children}</>;
};

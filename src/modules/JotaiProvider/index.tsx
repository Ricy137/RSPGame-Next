"use client";
import { ReactNode, useCallback, useEffect } from "react";
import { Provider } from "jotai";
import { useAtom } from "jotai";
import { accountsAtom } from "@/services/accounts";

const JotaiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Provider>
      <AccountWrapper>{children}</AccountWrapper>
    </Provider>
  );
};

export default JotaiProvider;

const AccountWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [, mutate] = useAtom(accountsAtom);
  const connect = useCallback(async () => {
    await mutate([{ type: "initial" }]);
  }, []);
  useEffect(() => {
    try {
      connect();
    } catch (e) {
      console.log(e);
    }
  }, []);
  return <>{children}</>;
};

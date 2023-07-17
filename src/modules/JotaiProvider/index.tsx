"use client";
import { ReactNode, useCallback, useEffect } from "react";
import { Provider } from "jotai";
import { useAtom } from "jotai";
import { accountsAtom } from "@/services/accounts";
import { syncGameAtom } from "@/services/game";

const JotaiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Provider>
      <AccountWrapper>
        <GameInfoWrapper>{children}</GameInfoWrapper>
      </AccountWrapper>
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

const GameInfoWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data] = useAtom(syncGameAtom);

  return <>{children}</>;
};

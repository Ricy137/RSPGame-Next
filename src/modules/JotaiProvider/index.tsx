"use client";
import { ReactNode, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [data] = useAtom(syncGameAtom);

  useEffect(() => {
    if (!data) return;
    const { status } = data;
    if (status === "ended") {
      //delay the time to jump is because winner data is read from blockchain and it takes time to be updated
      router.push("/result");
    }
  }, [data]);

  return <>{children}</>;
};

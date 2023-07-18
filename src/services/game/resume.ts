import { useCallback } from "react";
import { useSetAtom, useAtom } from "jotai";
import { useRouter } from "next/navigation";
import gameEssentialAtom, { syncGameAtom, useJoinGame } from ".";

export const useResumeGame = () => {
  const router = useRouter();
  const setAdd = useSetAtom(gameEssentialAtom);
  //   const [syncGame] = useAtom(syncGameAtom);
  const { fetchGameInfo } = useJoinGame();

  const directByStatus = useCallback((status: string) => {
    switch (status) {
      case "notStarted":
        return;
      case "ended":
        router.push("/result");
        return;
      default:
        router.push("/result");
        return;
    }
  }, []);
  const resumeGame = useCallback(
    async (contractAdd: string) => {
      try {
        setAdd({ contractAdd });
        let gameInfo = await fetchGameInfo(contractAdd);
        if (!gameInfo) return;
        directByStatus(gameInfo.status);
      } catch (err) {
        console.log(err);
      }
    },
    [window]
  );
  return { resumeGame };
};

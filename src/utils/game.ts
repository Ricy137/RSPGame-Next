import { Game_Status } from "@/services/game";

export const getGameStatus = (
  existency: boolean,
  c2: string,
  stake: string,
  lastAction: string
) => {
  if (!existency) return Game_Status[0];
  if (c2 === "0") return Game_Status[1];
  if (stake === "0") return Game_Status[3];
  return Game_Status[2];
};

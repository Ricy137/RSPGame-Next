import { atom } from "jotai";

export const accountsAtom = atom<string[]>([]);
export const networkAtom = atom<string | undefined>("");

//Write-only atom;
export const asyncAccountsAtom = atom(
  null,
  async (get, set, type: "initial" | "connect") => {
    if (typeof window === "undefined") return;
    if (!window.ethereum) {
      throw new Error("Please install MetaMask");
    }
    if (type === "initial") {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      set(accountsAtom, accounts);
      const network = window.ethereum.networkVersion;
      set(networkAtom, network);
      return;
    }
    if (type === "connect") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      set(accountsAtom, accounts);
      const network = window.ethereum.networkVersion;
      if (network !== "5") {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x5" }],
        });
      }
      set(networkAtom, "5");
    }
  }
);

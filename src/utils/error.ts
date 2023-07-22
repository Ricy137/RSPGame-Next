// import Error from "next/error"
export const errorMessage = (error: Error & { code?: string }) => {
  if (error.code === "ACTION_REJECTED") {
    return "User rejected the transaction";
  } else if (error.code === "CALL_EXCEPTION") {
    return "Transaction reverted, you may not have rights or entered wrong data";
  } else if (error.code === "INSUFFICIENT_FUNDS") {
    return "Insufficient funds";
  }
  return error.message;
};

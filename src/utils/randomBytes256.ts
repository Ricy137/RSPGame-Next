import { randomBytes, toBigInt } from "ethers";

//Make the random number random enough and has long enough length
export const randomBytes256 = () => {
  let salt = toBigInt(randomBytes(32));
  return `0x${salt.toString(16)}`;
};

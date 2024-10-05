import { Contract } from 'ethers';
import { IExec } from 'iexec';
import { jsonAbi } from "./ABI/dpabi.js";
import { interfaceJsonAbi as IDataProtector } from "./ABI/idpabi.js";
import { AddressOrENS } from './types';

export async function getDataProtectorCoreContract(
  iexec: IExec,
  contractAddress: AddressOrENS,
): Promise<typeof IDataProtector> {
  const { signer } = await iexec.config.resolveContractsClient();
  return new Contract(contractAddress, jsonAbi).connect(signer) as unknown as typeof IDataProtector;
}

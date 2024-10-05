import { NextResponse } from "next/server";
import { iexec } from "~~/components/ScaffoldEthAppWithProviders";
import scaffoldConfig from "~~/scaffold.config";
// address _datasetOwner,
// 		string calldata _datasetName,
// 		string calldata _datasetSchema,
// 		bytes calldata _datasetMultiaddr,
// 		bytes32 _datasetChecksum
type WhitelistRequest = {
  datasetOwner: string;
  datasetName: string;
  datasetSchema: string;
  datasetMultiaddr: string;
  datasetChecksum: string;
};

export async function POST(request: Request) {
  // const { datasetOwner, datasetName, datasetSchema, datasetMultiaddr, datasetChecksum } =
  //   (await request.json()) as WhitelistRequest;

  // console.log("BRRR schema", datasetOwner, datasetName, datasetSchema, datasetMultiaddr, datasetChecksum);

  // try {
  //   // Assuming you want to use the first target network specified in the config
  //   const targetNetwork = iexec;
  //   const adminClient = adminClients[targetNetwork.id];
  //   const dataContract = dataContracts[targetNetwork.id];

  //   // Call the updateWhitelist function on the DataContract
  //   const tx = await adminClient.writeContract({
  //     address: dataContract.address,
  //     abi: dataContract.abi,
  //     functionName: "updateWhitelist",
  //     args: [publicKey, true],
  //   });
  //   console.log("whitelist tx, ", tx);

  //   return NextResponse.json({ message: "Public key whitelisted successfully", transactionHash: tx }, { status: 200 });
  // } catch (error) {
  //   console.error("Error whitelisting public key:", error);
  //   return NextResponse.json({ message: "Error whitelisting public key" }, { status: 500 });
  // }
}
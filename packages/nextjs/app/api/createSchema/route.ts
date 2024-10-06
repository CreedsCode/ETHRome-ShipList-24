import { NextResponse } from "next/server";
import { secp256k1 } from "@noble/curves/secp256k1";
import {
  Hex,
  WriteContractReturnType,
  createWalletClient,
  defineChain,
  hexToNumber,
  http,
  recoverTypedDataAddress,
} from "viem";
import scaffoldConfig from "~~/scaffold.config";
import { adminAccount } from "~~/utils/admin";
import { getAlchemyHttpUrl } from "~~/utils/scaffold-eth";

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
  metaTransaction: string;
  signature: string;
  chainId: number;
};

const iexec = defineChain({
  id: 134,
  name: "iExec Sidechain",
  network: "iexec",
  nativeCurrency: {
    decimals: 18,
    name: "xRLC",
    symbol: "xRLC",
  },
  rpcUrls: {
    default: {
      http: ["https://bellecour.iex.ec"],
    },
    public: {
      http: ["https://bellecour.iex.ec"],
    },
  },
  blockExplorers: {
    default: { name: "BlockScout", url: "https://blockscout-bellecour.iex.ec/" },
  },
  testnet: false,
});
export async function POST(request: Request) {
  const {
    datasetOwner,
    datasetName,
    datasetSchema,
    datasetMultiaddr,
    datasetChecksum,
    metaTransaction,
    signature,
  } = (await request.json()) as WhitelistRequest;

  console.log("BRRR schema", datasetOwner, datasetName, datasetSchema, datasetMultiaddr, datasetChecksum);

  try {
    // Assuming you want to use the first target network specified in the config
    const targetNetwork = iexec;
    const adminClient = createWalletClient({
      account: adminAccount,
      chain: iexec,
      transport: http(getAlchemyHttpUrl(targetNetwork.id)),
    });

    const schemaContract = scaffoldConfig.targetNetworks[3];
    console.log("schemaContract", schemaContract);

    console.log("Verifying signature...");

    // Convert string representations back to BigInt
    const convertedMetaTransaction = {
      ...metaTransaction,
      nonce: BigInt(metaTransaction.nonce),
    };

    // Verify the signature
    const signerAddress = await recoverTypedDataAddress({
      domain: {
        name: "DataProtector",
        version: "1",
        chainId: BigInt(targetNetwork.id),
        verifyingContract: "0x2A76641f67E7B8CD4081a94a2505EFE20d2c22f3",
      },
      types: {
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" },
        ],
        MetaTransactionStruct: [
          { name: "nonce", type: "uint256" },
          { name: "from", type: "address" },
          { name: "functionSignature", type: "bytes" },
        ],
      },
      primaryType: "MetaTransactionStruct",
      message: convertedMetaTransaction,
      signature: signature as Hex,
    });

    console.log("Signature verified, its from: ", signerAddress);

    if (signerAddress.toLowerCase() !== metaTransaction.from.toLowerCase()) {
      throw new Error("Invalid signature");
    }

    // Split the signature
    const signatureHex = signature.slice(2); // Remove '0x' prefix
    const { r, s } = secp256k1.Signature.fromCompact(signatureHex.slice(0, 128));
    const v = hexToNumber(`0x${signatureHex.slice(128)}`);

    // Convert r and s to hexadecimal strings
    const rHex = `0x${r.toString(16).padStart(64, "0")}`;
    const sHex = `0x${s.toString(16).padStart(64, "0")}`;

    console.log("=============", "calling");

    // Call executeMetaTransaction on the DataContract
    const tx: WriteContractReturnType = await adminClient.writeContract({
      address: dataContract.address,
      abi: dataContract.abi,
      functionName: "executeMetaTransaction",
      args: [metaTransaction.from, metaTransaction.functionSignature, rHex, sHex, v],
    });
    console.log("=============", tx);
    return NextResponse.json({ message: "called successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error whitelisting public key:", error);
    return NextResponse.json({ message: "Error whitelisting public key" }, { status: 500 });
  }
}

import { DataObject } from "@iexec/dataprotector";
import { utils } from "ethers";
import { ValidationError } from "iexec/errors";
import forge from "node-forge";
import { encodeFunctionData } from "viem";
import { mixed, string } from "yup";
import { iexec } from "~~/components/ScaffoldEthAppWithProviders";
import { createZipFromObject, ensureDataObjectIsValid, extractDataSchema } from "~~/services/fuckfuckfuck/data";
import { WorkflowError } from "~~/services/fuckfuckfuck/errors";
import { add } from "~~/services/fuckfuckfuck/ipfs";

export const protectData = async (data: DataObject, wallet, deployedDataProtectorData, nonce) => {
  // 1. have the data
  let vData: DataObject;
  try {
    ensureDataObjectIsValid(data);
    vData = data;
    console.log("data is valid");
  } catch (e: any) {
    console.log("data is not valid", e);
    throw new ValidationError(`data is not valid: ${e.message}`);
  }
  // 2. extract the data schma
  console.log("extracting data schema");
  const schema = await extractDataSchema(vData);
  console.log("schema", schema);


  // 2.1 create a zip file
  let file: Buffer;
  try {
    file = await createZipFromObject(vData);
    console.log("file", file);
  } catch (e: any) {
    console.log("error creating zip file", e);
    throw new WorkflowError({
      message: "Failed to serialize data object",
      errorCause: e,
    });
  }

  // 3. generate encryption key
  const encryptionKey = generateAes256Key();
  console.log("encryptionKey", encryptionKey);

  // 4. encrypt the data
  let encryptedFile: Buffer;
  try {
    encryptedFile = await encryptAes256Cbc(file, encryptionKey);
    console.log("encryptedFile", encryptedFile);
  } catch (e: any) {
    console.log("error encrypting file", e);
    throw new WorkflowError({
      message: "Failed to encrypt data",
      errorCause: e,
    });
  }

  let checksum;
  try {
    checksum = await sha256Sum(encryptedFile);
    console.log("checksum", checksum);
  } catch (e: any) {
    console.log("error computing checksum", e);
    throw new WorkflowError({
      message: "Failed to compute encrypted data checksum",
      errorCause: e,
    });
  }

  // 5. upload the encrypted data to ipfs
  const cid = "QmZKng9aXpr7t7GUmYHo4d9FzEenTn2g9bFwAHeeAd9hsK";
  // try {
  //   cid = await add(encryptedFile, {
  //     ipfsNode: "https://ipfs.infura.io:5001",
  //     ipfsGateway: "https://ipfs.io",
  //   });
  //   console.log("cid", cid);
  // } catch (e: any) {
  //   console.log("error uploading to ipfs", e);
  //   throw new WorkflowError({
  //     message: "Failed to upload encrypted data",
  //     errorCause: e,
  //   });
  // }
  const multiaddr = `/p2p/${cid}`;
  console.log("multiaddr", multiaddr);
  // 6. call createDataSetWithSchema on the dataprotector contract args: encryptedData uri and data schema
  let signature;
  let metaTransaction;
  try {
    console.log("deployedDataProtectorData", deployedDataProtectorData);
    console.log("multiaddr", multiaddr);
    const inputWalletAddress = wallet.address;
    const inputDatasetName = "test";
    const inputDatasetSchema = JSON.stringify(schema);
    const inputDatasetMultiaddr = "0x" + Buffer.from(multiaddr).toString("hex");
    const inputDatasetChecksum = checksum;
    const functionSignature = encodeFunctionData({
      abi: deployedDataProtectorData?.abi,
      functionName: "createDatasetWithSchema",
      args: [
        inputWalletAddress,
        inputDatasetName,
        inputDatasetSchema,
        inputDatasetMultiaddr,
        inputDatasetChecksum as `0x${string}`,
      ],
    });
    console.log("encoded function content: ", wallet.address, "test", inputDatasetSchema, multiaddr, checksum);
    console.log("functionSignature", functionSignature);

    metaTransaction = {
      nonce: BigInt(nonce?.toString() || "0"),
      from: wallet.address,
      functionSignature: functionSignature,
    };
    console.log("metaTransaction", metaTransaction);

    // Get the Ethereum provider from the wallet
    const provider = await wallet.getEthereumProvider();

    // Use the provider to sign the typed data
    console.log("signing", deployedDataProtectorData?.address);
    const signatureJsonDataString = JSON.stringify(
      {
        domain: {
          name: "DataProtector",
          version: "1",
          chainId: BigInt(iexec.id),
          verifyingContract: deployedDataProtectorData?.address as `0x${string}`,
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
        message: metaTransaction,
      },
      (_, v) => (typeof v === "bigint" ? v.toString() : v),
    );
    console.log("signatureJsonDataString", signatureJsonDataString);
    signature = await provider.request({
      method: "eth_signTypedData_v4",
      params: [wallet.address, signatureJsonDataString],
    });
    console.log("signature", signature);
  } catch (error) {
    console.error("Error submitting:", error);
  }

  try {
    const createShemaJsonstring = JSON.stringify(
      {
        datasetOwner: wallet.address,
        datasetName: "test",
        datasetSchema: JSON.stringify(schema),
        datasetMultiaddr: multiaddr,
        datasetChecksum: checksum,
        metaTransaction: metaTransaction,
        signature: signature,
      },
      (_, v) => (typeof v === "bigint" ? v.toString() : v),
    );
    console.log("SEEEENDING:: ", createShemaJsonstring);
    const response = await fetch("/api/createSchema", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: createShemaJsonstring,
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("creatingSchema tx", data.transactionHash);
      console.log("Public key sent for whitelisting");
    } else {
      console.error("Failed to create schema");
    }
  } catch (error) {
    console.error("Error sending data to contract:", error);
  }

  // 6.1 dataprotector contract is calling the dataset regestry

  // 7. push encryption key to the secret managment service
  // 8. return the protected data

  return data + "psssss!";
};

export const generateAes256Key = () => Buffer.from(utils.randomBytes(32)).toString("base64");

export const encryptAes256Cbc = async (fileBytes: Buffer, base64Key: string) => {
  const keyBuffer = Buffer.from(await base64Encoded256bitsKeySchema().validate(base64Key), "base64");
  console.log("keyBuffer", keyBuffer);
  let fileBuffer = await fileBufferSchema().validate(fileBytes);
  const iv = utils.randomBytes(16);
  const cipher = forge.cipher.createCipher("AES-CBC", forge.util.createBuffer(keyBuffer));
  cipher.start({ iv: forge.util.createBuffer(iv) });

  const CHUNK_SIZE = 10 * 1000 * 1000; // 10MB chunks
  let encryptionBuffer = Buffer.alloc(0);

  while (fileBuffer.length > 0) {
    const chunk = fileBuffer.slice(0, CHUNK_SIZE);
    fileBuffer = fileBuffer.slice(CHUNK_SIZE);
    cipher.update(forge.util.createBuffer(chunk));

    const tmpBuffer = Buffer.from(cipher.output.getBytes(), "binary");
    encryptionBuffer = Buffer.concat([encryptionBuffer, tmpBuffer]);
  }

  cipher.finish();
  const finalizationBuffer = Buffer.from(cipher.output.getBytes(), "binary");
  return Buffer.concat([iv, encryptionBuffer, finalizationBuffer]);
};

export const sha256Sum = async (fileBytes: any): Promise<`0x${string}`> => {
  const fileBuffer = await fileBufferSchema().validate(fileBytes);
  const md = forge.md.sha256.create();
  md.update(fileBuffer.toString("binary"));
  return `0x${md.digest().toHex()}` as `0x${string}`;
};

export const base64Encoded256bitsKeySchema = () =>
  string().test(
    "is-base64-256bits-key",
    "${originalValue} is not a valid encryption key (must be base64 encoded 256 bits key)",
    async value => {
      try {
        if (!value) {
          console.log("Value is undefined");
          throw Error("Value is undefined");
        }
        const keyBuffer = Buffer.from(value, "base64");
        if (keyBuffer.length !== 32) {
          console.log("Invalid key length");
          throw Error("Invalid key length");
        }
        return true;
      } catch (e) {
        console.log("is-base64-256bits-key", e);
        return false;
      }
    },
  );

export const fileBufferSchema = () =>
  mixed().transform(value => {
    try {
      if (typeof value === "string") {
        throw Error("unsupported string");
      }
      return Buffer.from(value);
    } catch (e) {
      console.log("fileBufferSchema", e);
      throw new ValidationError("Invalid file buffer, must be ArrayBuffer or Buffer");
    }
  });

import { DataObject } from "@iexec/dataprotector";
import { utils } from "ethers";
import { ValidationError } from "iexec/errors";
import forge from "node-forge";
import { mixed, string } from "yup";
import { createZipFromObject, ensureDataObjectIsValid, extractDataSchema } from "~~/services/fuckfuckfuck/data";
import { WorkflowError } from "~~/services/fuckfuckfuck/errors";
import { add } from "~~/services/fuckfuckfuck/ipfs";

export const protectData = async (data: DataObject) => {
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
  // const encryptedFile = await iexec.dataset.encrypt(file, encryptionKey).catch((e: Error) => {
  //   throw new WorkflowError({
  //     message: "Failed to encrypt data",
  //     errorCause: e,
  //   });
  // });

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
  let cid: string;
  try {
    cid = await add(encryptedFile, {
      ipfsNode: "https://ipfs.infura.io:5001",
      ipfsGateway: "https://ipfs.io",
    });
    console.log("cid", cid);
  } catch (e: any) {
    console.log("error uploading to ipfs", e);
    throw new WorkflowError({
      message: "Failed to upload encrypted data",
      errorCause: e,
    });
  }
  const multiaddr = `/p2p/${cid}`;
  console.log("multiaddr", multiaddr);
  // 6. call createDataSetWithSchema on the dataprotector contract args: encryptedData uri and data schema


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

export const sha256Sum = async (fileBytes: any) => {
  const fileBuffer = await fileBufferSchema().validate(fileBytes);
  const md = forge.md.sha256.create();
  md.update(fileBuffer.toString("binary"));
  return md.digest().toHex();
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

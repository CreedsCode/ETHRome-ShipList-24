/* eslint-disable @typescript-eslint/no-empty-interface */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { IExecConfigOptions } from "@iexec/solidity";
import { GraphQLClient } from "graphql-request";
import { EnhancedWallet } from "iexec";
import { IExec } from "iexec";

/***************************************************************************
 *                        Common Types                                     *
 ***************************************************************************/

type ENS = string;

export type Address = string;

export type Web3SignerProvider = EnhancedWallet;

/**
 * ethereum address or ENS name (Ethereum Name Service)
 */
export type AddressOrENS = Address | ENS;

export type OnStatusUpdateFn<T> = (params: { title: T; isDone: boolean; payload?: Record<string, any> }) => void;

// ---------------------Constructor Types------------------------------------
/**
 * Configuration options for DataProtector.
 */
export type DataProtectorConfigOptions = {
  /**
   * The Ethereum contract address or ENS (Ethereum Name Service) for dataProtector smart contract.
   * If not provided, the default dataProtector contract address will be used.
   * @default{@link DEFAULT_CONTRACT_ADDRESS}
   */
  dataprotectorContractAddress?: AddressOrENS;

  /**
   * The Ethereum contract address or ENS (Ethereum Name Service) for dataProtector sharing smart contract.
   * If not provided, the default dataProtector sharing contract address will be used.
   * @default{@link DEFAULT_SHARING_CONTRACT_ADDRESS}
   */
  sharingContractAddress?: AddressOrENS;

  /**
   * The subgraph URL for querying data.
   * If not provided, the default dataProtector subgraph URL will be used.
   * @default{@link DEFAULT_SUBGRAPH_URL}
   */
  subgraphUrl?: string;

  /**
   * The IPFS node URL.
   * If not provided, the default dataProtector IPFS node URL will be used.
   * @default{@link DEFAULT_IEXEC_IPFS_NODE}
   */
  ipfsNode?: string;

  /**
   * The IPFS gateway URL.
   * If not provided, the default dataProtector IPFS gateway URL will be used.
   * @default{@link DEFAULT_IPFS_GATEWAY}
   */
  ipfsGateway?: string;

  /**
   * Options specific to iExec integration.
   * If not provided, default iexec options will be used.
   */
  iexecOptions?: IExecConfigOptions;
};

// ---------------------ProtectedData Schema Types------------------------------------
export type MimeType =
  | "application/octet-stream"
  | "application/pdf"
  | "application/xml"
  | "application/zip"
  | "audio/midi"
  | "audio/mpeg"
  | "audio/x-wav"
  | "image/bmp"
  | "image/gif"
  | "image/jpeg"
  | "image/png"
  | "image/webp"
  | "video/mp4"
  | "video/mpeg"
  | "video/x-msvideo";

export type ScalarType = "bool" | "i128" | "f64" | "string";

export type DataSchemaEntryType = ScalarType | MimeType;

export interface DataSchema extends Record<string, DataSchema | DataSchemaEntryType> { }

// these scalar types existed prior to dataprotector v2 and can still be used for searching pre-v2 protected data
export type LegacyScalarType = "boolean" | "number" | "string";

export type SearchableSchemaEntryType = ScalarType | MimeType | LegacyScalarType;

export interface SearchableDataSchema
  extends Record<string, SearchableDataSchema | SearchableSchemaEntryType | SearchableSchemaEntryType[]> { }

/***************************************************************************
 *                        DataProtector Types                              *
 ***************************************************************************/
export type DataScalarType = boolean | number | bigint | string | Uint8Array | ArrayBuffer | File;
export interface DataObject extends Record<string, DataObject | DataScalarType> { }

// ---------------------ProtectData Types------------------------------------
export type IpfsNodeAndGateway = {
  /**
   * use it to upload the encrypted data on a specific IPFS node
   */
  ipfsNode?: string;

  /**
   * use a specific IPFS gateway
   */
  ipfsGateway?: string;
};

export type ProtectDataStatuses =
  | "EXTRACT_DATA_SCHEMA"
  | "CREATE_ZIP_FILE"
  | "CREATE_ENCRYPTION_KEY"
  | "ENCRYPT_FILE"
  | "UPLOAD_ENCRYPTED_FILE"
  | "DEPLOY_PROTECTED_DATA"
  | "PUSH_SECRET_TO_SMS";

export type OneProtectDataStatus = {
  title: ProtectDataStatuses;
  isDone: boolean;
  payload?: Record<string, string>;
};

export type ProtectDataParams = {
  /**
   * data to protect
   */
  data: DataObject;

  /**
   * name of the data (this is public)
   *
   * if no `name` is specified, the protected data name will be an empty string
   */
  name?: string;

  /**
   * Callback function that will get called at each step of the process
   */
  onStatusUpdate?: OnStatusUpdateFn<ProtectDataStatuses>;
};

/**
 * Public props of a protected data
 */
export type ProtectedData = {
  name: string;
  address: Address;
  owner: Address;
  schema: DataSchema;
  creationTimestamp: number;
  multiaddr?: string; // Ex: "/p2p/QmaiUykRQKPC2PDXvmiqdhDm553JybgLurUUiDYy78rMgY"
};

/**
 * Secret props of a protected data
 * Exported as it is mentioned in the docs
 */
export type ProtectedDataCreationProps = {
  transactionHash: string;
  zipFile: Uint8Array;
  encryptionKey: string;
};

export type ProtectedDataWithSecretProps = ProtectedData & ProtectedDataCreationProps;

export type IExecConsumer = {
  iexec: IExec;
};

export type DataProtectorContractConsumer = {
  dataprotectorContractAddress: AddressOrENS;
};

export type SubgraphConsumer = {
  graphQLClient: GraphQLClient;
};

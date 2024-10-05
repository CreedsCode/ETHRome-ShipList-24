export const interfaceJsonAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract IDataset",
        name: "dataset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "schema",
        type: "string",
      },
    ],
    name: "DatasetSchema",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_datasetOwner",
        type: "address",
      },
      {
        internalType: "string",
        name: "_datasetName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_datasetSchema",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "_datasetMultiaddr",
        type: "bytes",
      },
      {
        internalType: "bytes32",
        name: "_datasetChecksum",
        type: "bytes32",
      },
    ],
    name: "createDatasetWithSchema",
    outputs: [
      {
        internalType: "contract IDataset",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

import { Buffer } from "buffer";
import { create } from "kubo-rpc-client";

interface AddOptions {
  ipfsNode?: string;
  ipfsGateway?: string;
}

const add = async (content: Uint8Array, { ipfsNode, ipfsGateway }: AddOptions = {}): Promise<string> => {
  try {
    const ipfs = create({
      url: ipfsNode,
      headers: {
        authorization: `Basic ${Buffer.from(
          `${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}:${process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET}`,
        ).toString("base64")}`,
      },
    });
    const uploadResult = await ipfs.add(content);
    const { cid } = uploadResult;
    const multiaddr = `ipfs/${cid.toString()}`;
    console.log("multiaddr", multiaddr);
    const publicUrl = `${ipfsGateway}/${multiaddr}`;
    console.log("publicUrl", publicUrl);

    await fetch(publicUrl).then(res => {
      if (!res.ok) {
        throw Error(`Failed to load uploaded file at ${publicUrl}`);
      }
    });

    return cid.toString();
  } catch (e) {
    throw Error(e);
  }
};

export { add };

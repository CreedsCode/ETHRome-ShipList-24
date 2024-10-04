import {useState} from 'react';
import {create, IPFSHTTPClient} from 'ipfs-http-client';
import scaffoldConfig from "~~/scaffold.config";

const IPFS_ERRORS = {
    unknownError: 'AN UNKNOWN ERROR OCCURRED',
    missingApiKey: 'MISSING_ALCHEMY_API_KEY',
};

export const useIpfs = () => {
    const [ipfsHash, setIpfsHash] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getIpfsClient = (): IPFSHTTPClient | null => {
        const apiKey = scaffoldConfig.alchemyApiKey;
        if (!apiKey) {
            setError(IPFS_ERRORS.missingApiKey);
            return null;
        }

        return create({
            host: 'ipfs-gateway.alchemy.com',
            port: 443,
            protocol: 'https',
            headers: {
                authorization: `Basic ${Buffer.from(apiKey).toString('base64')}`,
            },
        });
    };

    const uploadToIpfs = async (data: any) => {
        setLoading(true);
        setError(null);

        const ipfs = getIpfsClient();
        if (!ipfs) {
            setLoading(false);
            return;
        }

        try {
            const jsonString = JSON.stringify(data);
            const result = await ipfs.add(jsonString);
            setIpfsHash(result.path); // IPFS-Hash setzen
        } catch (err) {
            setError(IPFS_ERRORS.unknownError);
        } finally {
            setLoading(false);
        }
    };

    return {
        ipfsHash,
        loading,
        error,
        uploadToIpfs,
    };
};

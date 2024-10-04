import { useState } from 'react';

const IPFS_ERRORS = {
    unknownError: 'AN UNKNOWN ERROR OCCURRED',
    missingApiKey: 'MISSING_INFURA_API_KEY',
};

export const useIpfs = () => {
    const [ipfsHash, setIpfsHash] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const uploadToIpfs = async (data: any) => {

        setLoading(true);
        setError(null);

        const projectId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;
        const projectSecret = process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET;

        if (!projectId || !projectSecret) {
            setError(IPFS_ERRORS.missingApiKey);
            setLoading(false);
            return;
        }

        const auth = 'Basic ' + btoa(`${projectId}:${projectSecret}`);

        const formData = new FormData();
        formData.append('file', new Blob([JSON.stringify(data)], { type: 'application/json' }));

        try {
            const response = await fetch('https://ipfs.infura.io:5001/api/v0/add', {
                method: 'POST',
                headers: {
                    Authorization: auth,
                },
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                console.log(response);
                setIpfsHash(result.Hash)
            } else {
                setError(`Error: ${result.Message}`);
            }
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

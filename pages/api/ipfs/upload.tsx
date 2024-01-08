import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
    api: {
        bodyParser: false,
    },
};

interface uploadMetadata {
    image: File;
    name: string;
    description: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const formData = req.body;

    //   const nft : uploadMetadata = {
    //     image: formData.get("image"),
    //     name: formData.get("name"),
    //     description: formData.get("description")
    //   };
    console.log(req);
    //   const apiKey = process.env.IPFS_API_KEY||"";
    //   const client = new NFTStorage({ token: apiKey });
    //   const metadata = client.store(nft);
    //     console.log(metadata);
    //   res.status(200).json({url : metadata.url});
};

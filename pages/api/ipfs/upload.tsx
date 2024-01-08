import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable'
import { NFTStorage } from 'nft.storage';
import fs from 'fs';

export const config = {
    api: {
        bodyParser: false
    }
}

interface ipfsStore {
    image: File;
    name: string;
    description: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const reqData : ipfsStore = await new Promise((resolve, reject) => {
        const form = new IncomingForm({
            keepExtensions: true
        })

        form.parse(req, (err, fields, files) => {
            if(err) return reject(err)

            if (files && files.image && files.image[0] && fields && fields.name && fields.description) {
                const fileName = files.image[0].newFilename;
                const fileContent = fs.readFileSync(files.image[0].filepath);
                const blob = new Blob([fileContent], { type: 'image/*' });
                const file = new File([blob], fileName, { type: 'image/*' });
        
                resolve({
                  name: fields.name[0],
                  description: fields.description[0],
                  image: file,
                });
              } else {
                reject(new Error('Image file is missing.'));
              }
        })
    });

    const apiKey = process.env.IPFS_API_KEY || "";
    const client = new NFTStorage({ token: apiKey });
    const metadata = await client.store(reqData);
    res.status(200).json({ url: metadata.url });
};

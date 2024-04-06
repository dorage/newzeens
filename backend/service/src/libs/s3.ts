import { PutObjectCommand, PutObjectCommandInput, S3Client } from "@aws-sdk/client-s3";

const bucket = process.env.R2_BUCKET;
const s3Client = new S3Client({
	region: process.env.R2_REGION,
	endpoint: process.env.R2_ENDPOINT,
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY_ID,
		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
	},
});

export const uploadObject = (input: Pick<PutObjectCommandInput, "Body" | "Key">) => {
	const command = new PutObjectCommand({
		Body: input.Body,
		Bucket: bucket,
		Key: input.Key,
	});

	return s3Client.send(command);
};

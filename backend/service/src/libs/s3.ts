import {
	GetObjectCommand,
	PutObjectCommand,
	PutObjectCommandInput,
	S3Client,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client({
	region: process.env.R2_REGION,
	endpoint: process.env.R2_ENDPOINT,
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY_ID,
		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
	},
});

export const uploadObject = async (input: Pick<PutObjectCommandInput, "Body" | "Key">) => {
	const command = new PutObjectCommand({
		Body: input.Body,
		Bucket: process.env.R2_BUCKET,
		Key: input.Key,
	});

	await s3Client.send(command);

	const src = `${process.env.ORIGIN_IMAGE}/${process.env.R2_BUCKET}/${input.Key}`;

	return src;
};

export const getObject = async (key: string) => {
	const command = new GetObjectCommand({
		Bucket: process.env.R2_BUCKET,
		Key: key,
	});

	const result = await s3Client.send(command);

	if (result.Body == null) throw new Error("No body");

	return result.Body.transformToByteArray();
};

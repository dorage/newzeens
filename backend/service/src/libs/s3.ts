import {
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";

const s3Client = () =>
  new S3Client({
    region: process.env.R2_REGION,
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });

const getImageUrlFromKey = (key: string) => {
  return `${process.env.ORIGIN_IMAGE}/${process.env.R2_BUCKET}/${key}`;
};

const getKeyFromImageUrl = (url: string) => {
  return url.split(`/${process.env.R2_BUCKET}/`).pop();
  return url.replace(`${process.env.ORIGIN_IMAGE}/${process.env.R2_BUCKET}/`, "");
};

export const uploadObject = async (input: {
  Body: Exclude<PutObjectCommandInput["Body"], undefined>;
  Key: Exclude<PutObjectCommandInput["Key"], undefined>;
}) => {
  const command = new PutObjectCommand({
    Body: input.Body,
    Bucket: process.env.R2_BUCKET,
    Key: input.Key,
  });

  await s3Client().send(command);

  return getImageUrlFromKey(input.Key);
};

export const getObject = async (url: string) => {
  const key = getKeyFromImageUrl(url);
  console.debug("r2 object key", key);

  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET,
    Key: key,
  });

  const result = await s3Client().send(command);

  if (result.Body == null) throw new Error("No body");

  return result.Body.transformToByteArray();
};

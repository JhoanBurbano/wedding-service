const environment = () => ({
  AWS: {
    BUCKET: process.env.NODE_AWS_BUCKET,
    BUCKET_REGION: process.env.NODE_AWS_BUCKET_REGION,
    PUBLIC_ACCESS_KEY: process.env.NODE_AWS_PUBLIC_ACCESS_KEY,
    SECRET_KEY: process.env.NODE_AWS_SECRET_KEY,
    QR_PATH: 'images/qr-codes/',
  },
  CLIENT: {
    WEB_APP_URL: process.env.NODE_CLIENT_WEB_APP_URL,
    VIEW_INVITE: process.env.NODE_CLIENT_STATUS_INVITE,
  },
  MONGO: {
    USER: process.env.NODE_MONGO_USER,
    PASSWORD: process.env.NODE_MONGO_PASSWORD,
    DATABASE: process.env.NODE_MONGO_DATABASE,
  },
});

export default environment;

export function getAWSPATH(NAME: string) {
  const {
    AWS: { BUCKET_REGION, BUCKET },
    AWS: { QR_PATH },
  } = environment();
  return `https://${BUCKET}.s3.${BUCKET_REGION}.amazonaws.com/${QR_PATH}${NAME}`;
}

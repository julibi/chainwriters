import axios from 'axios';

const url = process.env.NX_PUBLIC_PINATA_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const API_SECRET = process.env.NEXT_PUBLIC_PINATA_API_SECRET;

const pinToPinata = async (
  hash: string,
  projectId: string,
  type: string,
  title?: string
) => {
  const timestamp = new Date().getTime();
  const name = `${projectId ?? title}-${type}-${timestamp}`;
  try {
    await axios.post(
      url,
      {
        hashToPin: hash,
        pinataMetadata: {
          name,
          keyvalues: {},
        },
      },
      {
        headers: {
          pinata_api_key: API_KEY,
          pinata_secret_api_key: API_SECRET,
          'Content-Type': 'application/json',
        },
      }
    );
    return 'ok';
  } catch (e) {
    console.log({ e });
    return 'error';
  }
};

export default pinToPinata;

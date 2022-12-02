export const getCoverImageUrl = async (
  projectId: string,
  imgIpfsHash: undefined | string
) => {
  // if available fetch from Metadata BE
  // otherwise from IPFS directly
  if (imgIpfsHash) {
    const imgUrl = `${process.env.NEXT_PUBLIC_MOONPAGE_METADATA_API}/file/project-${projectId}`;
    let response;
    try {
      response = await fetch(imgUrl);
      if (response.ok) {
        return imgUrl;
      } else {
        return `https://ipfs.io/ipfs/${imgIpfsHash}`;
      }
    } catch (e) {
      // do nothing
    }
  }
};

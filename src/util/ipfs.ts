export const IPFS_GATEWAY_DOMAIN = "https://ipfs.io/ipfs/";

/**
 * コミュニティリストを初期化
 * @param url ipfs://~
 * @return {string} https://ipfs.io/ipfs/~
 */
export const toIPFSGatewayURL = (url: string): string => {
  const protocol = url.split(":")[0];
  if (protocol !== "ipfs") return url;
  const tmp = url.split("//");
  const cid = tmp[tmp.length - 1];
  return `${IPFS_GATEWAY_DOMAIN}${cid}`;
};

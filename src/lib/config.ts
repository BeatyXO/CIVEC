import { studionet } from 'genlayer-js/chains';

type ContractAddress = `0x${string}`;

const contractAddress = process.env.NEXT_PUBLIC_CIVEC_CONTRACT_ADDRESS;

export const config={
  chain:studionet,
  chainName:'studionet',
  chainId:61999,
  rpc:'https://studio.genlayer.com/api',
  address:contractAddress ? contractAddress as ContractAddress : undefined,
  explorer:'https://explorer-studio.genlayer.com'
};

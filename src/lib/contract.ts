import { createClient, createAccount } from 'genlayer-js';
import { TransactionStatus, type CalldataEncodable } from 'genlayer-js/types';
import { config } from './config';
export type { Proposal } from './types';
import type { Proposal } from './types';
const read=()=>createClient({chain:config.chain,account:createAccount()});
const publicOwner='0x0000000000000000000000000000000000000000';
export async function listProposals():Promise<Proposal[]>{if(!config.address)return [];return await read().readContract({address:config.address,functionName:'list_proposals',args:[publicOwner]}) as Proposal[];}
export async function getProposal(id:string):Promise<Proposal>{if(!config.address)throw new Error('CIVEC contract address is not configured.');return await read().readContract({address:config.address,functionName:'get_proposal',args:[publicOwner,id]}) as Proposal;}
async function write(functionName:string,args:CalldataEncodable[]){const eth=(window as any).ethereum;if(!eth)throw new Error('No injected wallet found. Install MetaMask or Rabby.');const accounts=await eth.request({method:'eth_accounts'});if(!accounts?.[0])throw new Error('Connect your wallet before submitting.');if(!config.address)throw new Error('CIVEC contract address is not configured.');const client=createClient({chain:config.chain,account:accounts[0],provider:eth});await client.connect('studionet');const hash=await client.writeContract({address:config.address,functionName,args,value:0n});const receipt=await client.waitForTransactionReceipt({hash,status:TransactionStatus.FINALIZED,interval:5000,retries:90});if(!receipt)throw new Error('The transaction did not return a receipt.');return {hash};}
export async function createProposal(i:{title:string;neighborhood:string;description:string;criteria:string}){const id=`${Date.now()}-${crypto.randomUUID().slice(0,8)}`;await write('create_proposal',[id,i.title,i.neighborhood,i.description,i.criteria]);return id;}
export const addEvidence=(id:string,reference:string)=>write('add_evidence',[id,reference]);
export const endorse=(owner:string,id:string)=>write('endorse',[owner,id]);
export const requestScreening=(id:string)=>write('request_screening',[id]);
export const closeProposal=(id:string)=>write('close_proposal',[id]);

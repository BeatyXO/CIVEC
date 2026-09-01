import { createClient, createAccount } from 'genlayer-js';
import { ExecutionResult, TransactionStatus, type CalldataEncodable } from 'genlayer-js/types';
import { config } from './config';
export type { Proposal } from './types';
import type { Proposal } from './types';
const read=()=>createClient({chain:config.chain,account:createAccount()});
export async function listProposals():Promise<Proposal[]>{if(!config.address)return [];return await read().readContract({address:config.address,functionName:'list_proposals',args:[]}) as Proposal[];}
export async function getProposal(id:string):Promise<Proposal>{if(!config.address)throw new Error('CIVEC contract address is not configured.');return await read().readContract({address:config.address,functionName:'get_proposal',args:[id]}) as Proposal;}
async function write(functionName:string,args:CalldataEncodable[]){const eth=(window as any).ethereum;if(!eth)throw new Error('No injected wallet found. Install MetaMask or Rabby.');const accounts=await eth.request({method:'eth_accounts'});if(!accounts?.[0])throw new Error('Connect your wallet before submitting.');if(!config.address)throw new Error('CIVEC contract address is not configured.');const client=createClient({chain:config.chain,account:accounts[0],provider:eth});await client.connect('studionet');const hash=await client.writeContract({address:config.address,functionName,args,value:0n});const receipt=await client.waitForTransactionReceipt({hash,status:TransactionStatus.FINALIZED,interval:5000,retries:90});if(!receipt)throw new Error('The transaction did not return a receipt.');if(receipt.txExecutionResultName!==ExecutionResult.FINISHED_WITH_RETURN)throw new Error(`Transaction finalized without a successful contract execution (${receipt.txExecutionResultName||'UNDETERMINED'}).`);return {hash};}
export async function createProposal(i:{title:string;neighborhood:string;description:string;criteria:string}){const id=`${Date.now()}-${crypto.randomUUID().slice(0,8)}`;await write('create_proposal',[id,i.title,i.neighborhood,i.description,i.criteria]);return id;}
export const addEvidence=(id:string,reference:string)=>write('add_evidence',[id,reference]);
export const replaceEvidence=(id:string,index:number,reference:string)=>write('replace_evidence',[id,index,reference]);
export const endorse=(id:string)=>write('endorse',[id]);
export const requestScreening=(id:string)=>write('request_screening',[id]);
export const rescreenProposal=(id:string)=>write('rescreen_proposal',[id]);
export const closeProposal=(id:string)=>write('close_proposal',[id]);

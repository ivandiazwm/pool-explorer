import { ethers } from 'ethers';
import { network } from '../config';
import contractABI from './contractABI';

const provider = new ethers.providers.JsonRpcProvider(network.rpc);

class ContractInteractor {
  private contract: ethers.Contract;

  constructor(contractAddress: string) {
    this.contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
  }

  async getAgentsLength(poolId) {
    return await this.contract.agentLength(poolId)
  }

  async getAgentAt(poolId, index) {
    return await this.contract.agentAt(poolId, index)
  }
}

export default ContractInteractor;
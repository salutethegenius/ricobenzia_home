import { useState, useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';

// NFT Contract Configuration
const NFT_CONTRACT_ADDRESS = '0xe732b48CF38cFE538ddE868823379B3c64AA2484' as `0x${string}`;
const NFT_TOKEN_ID = 1n; // Token ID to check for ERC1155

// ERC1155 ABI for balanceOf
const erc1155Abi = [
  {
    inputs: [
      { name: 'account', type: 'address' },
      { name: 'id', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

interface NFTGateResult {
  hasAccess: boolean;
  isLoading: boolean;
  error: string | null;
  checkAccess: () => Promise<void>;
}

export function useNFTGate(): NFTGateResult {
  const { address, isConnected } = useAccount();
  const [hasAccess, setHasAccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use wagmi's useReadContract to check NFT balance (ERC1155)
  const { data: balance, isLoading, error: contractError } = useReadContract({
    address: isConnected && address ? NFT_CONTRACT_ADDRESS : undefined,
    abi: erc1155Abi,
    functionName: 'balanceOf',
    args: address ? [address, NFT_TOKEN_ID] : undefined,
    query: {
      enabled: isConnected && !!address,
    },
  });

  // Update hasAccess based on balance
  useEffect(() => {
    if (!isConnected || !address) {
      setHasAccess(false);
      setError(null);
      return;
    }

    if (contractError) {
      setError(contractError.message);
      setHasAccess(false);
      return;
    }

    if (balance !== undefined) {
      setHasAccess(balance > 0n);
      setError(null);
    }
  }, [balance, isConnected, address, contractError]);

  const checkAccess = async () => {
    // Access is automatically checked via useReadContract hook
    // This function is kept for API compatibility
  };

  return {
    hasAccess,
    isLoading,
    error,
    checkAccess,
  };
}

import { BigNumber, ethers, utils } from "ethers";
import { formatEther } from "ethers/lib/utils.js";
import React from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { GetAllItems } from "./ListedTokens";
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS


const Staking = (id) => {
  const { trades } = GetAllItems();
  const { address, isConnected } = useAccount();
  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    chainId: 5,
    overrides: {
      from: address,
      gasLimit: BigNumber.from(30000000),
    },
    functionName: "staking",
    abi: [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_itemId",
            "type": "uint256"
          }
        ],
        "name": "staking",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
    ],
    args: [id.id],
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const { data, isLoading, isSuccess, write, isError } = useContractWrite(config);
  console.log(trades)

  const bool = trades.some((trade) => trade.isSold === true);
  console.log(bool, "bool")
  return (
    <>
      {bool ? (
        < button
          disabled={!isConnected || isLoading}
          onClick={() => write?.()}
          className="text-white bg-blue-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isLoading ? (
            'Check Wallet'
          ) : isSuccess ? ('Bought') : 'Confirm and send money to the seller'}
        </button>
      ) : (
        null
      )
      }
    </>
  );

};

export default Staking;
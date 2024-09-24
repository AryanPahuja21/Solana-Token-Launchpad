import {
  createInitializeMint2Instruction,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";

const Launchpad = () => {
  const wallet = useWallet();
  const { connection } = useConnection();

  if (!wallet.publicKey) {
    return (
      <div className="w-full mt-24 flex flex-col gap-14 justify-center items-center">
        <h1 className="text-2xl sm:text-4xl font-bold text-center">
          Solana Token Launchpad
        </h1>
        <p className="text-center">
          Please connect your wallet to create a token.
        </p>
      </div>
    );
  }

  const createToken = async () => {
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const keypair = Keypair.generate();

    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey!,
        newAccountPubkey: keypair.publicKey,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMint2Instruction(
        keypair.publicKey,
        6,
        wallet.publicKey!,
        wallet.publicKey,
        TOKEN_PROGRAM_ID
      )
    );

    transaction.partialSign(keypair);

    alert("Token created successfully!");
    window.location.reload();
  };

  return (
    <div className="w-full mt-24 flex flex-col gap-14 justify-center items-center">
      <h1 className="text-2xl sm:text-4xl font-bold text-center">
        Solana Token Launchpad
      </h1>
      <div className="flex flex-col gap-7 justify-center items-center">
        <input
          type="text"
          id="name"
          placeholder="Name"
          className="sm:w-80 bg-white/20 px-4 py-2 rounded-lg outline-white"
        />
        <input
          type="text"
          id="ticker"
          placeholder="Ticker"
          className="sm:w-80 bg-white/20 px-4 py-2 rounded-lg outline-white"
        />
        <input
          type="text"
          id="image-url"
          placeholder="Image URL"
          className="sm:w-80 bg-white/20 px-4 py-2 rounded-lg outline-white"
        />
        <input
          type="text"
          id="initial-supply"
          placeholder="Initial Supply"
          className="sm:w-80 bg-white/20 px-4 py-2 rounded-lg outline-white"
        />
      </div>
      <button
        onClick={createToken}
        className="bg-white/10 p-4 rounded-lg hover:bg-white/20 hover:scale-105 hover:font-semibold"
      >
        Create a Token
      </button>
    </div>
  );
};

export default Launchpad;

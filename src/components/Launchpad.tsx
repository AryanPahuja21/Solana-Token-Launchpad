import {
  createInitializeMint2Instruction,
  getMinimumBalanceForRentExemptMint,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Transaction,
  SystemProgram,
  Keypair,
  Connection,
  clusterApiUrl,
} from "@solana/web3.js";

const Launchpad = () => {
  const wallet = useWallet();
  const connection = new Connection(clusterApiUrl("devnet"));
  const MINT_SIZE = 82;
  const programId = TOKEN_PROGRAM_ID;
  const mintAuthority = wallet.publicKey!;
  const freezeAuthority = wallet.publicKey!;
  const decimals = 9;

  const createToken = async () => {
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const keypair = Keypair.generate();

    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey!,
        newAccountPubkey: keypair.publicKey,
        space: MINT_SIZE,
        lamports,
        programId,
      }),
      createInitializeMint2Instruction(
        keypair.publicKey,
        decimals,
        mintAuthority,
        freezeAuthority,
        programId
      )
    );

    transaction.partialSign(keypair);
    if (wallet.signTransaction) wallet.signTransaction(transaction);
  };

  return (
    <div className="mt-24 flex flex-col gap-14 justify-center items-center">
      <h1 className="text-4xl font-bold">Solana Token Launchpad</h1>
      <div className="flex flex-col gap-7">
        <input
          type="text"
          placeholder="Name"
          className="w-80 bg-white/20 px-4 py-2 rounded-lg outline-white"
        />
        <input
          type="text"
          placeholder="Ticker"
          className="w-80 bg-white/20 px-4 py-2 rounded-lg outline-white"
        />
        <input
          type="text"
          placeholder="Image URL"
          className="w-80 bg-white/20 px-4 py-2 rounded-lg outline-white"
        />
        <input
          type="text"
          placeholder="Initial Supply"
          className="w-80 bg-white/20 px-4 py-2 rounded-lg outline-white"
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

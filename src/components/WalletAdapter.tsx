import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const WalletAdapter = () => {
  return (
    <div>
      <div className="text-center py-10">
        <WalletMultiButton
          style={{
            backgroundColor: "#2d2d2d",
          }}
        />
      </div>
    </div>
  );
};

export default WalletAdapter;

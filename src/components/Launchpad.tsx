const Launchpad = () => {
  return (
    <div className="h-screen flex flex-col gap-14 justify-center items-center">
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
      <button className="bg-white/10 p-4 rounded-lg hover:bg-white/20 hover:scale-105 hover:font-semibold">
        Create a Token
      </button>
    </div>
  );
};

export default Launchpad;

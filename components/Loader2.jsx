const Loader2 = () => {
  const keyframes = `
    @keyframes bounceCustom {
      0%, 66%, 100% { transform: scale(1); }
      33% { transform: scale(0.3); }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div className="flex gap-2">
        <span
          className="h-5 w-5 rounded-full bg-gradient-to-r from-neutral-800 via-[#111] to-black shadow-[20px_20px_18px_#666,-20px_-20px_18px_#fff]"
          style={{
            animation: 'bounceCustom 3s infinite',
            animationDelay: '0.3s',
          }}
        />
        <span
          className="h-5 w-5 rounded-full bg-gradient-to-r from-neutral-800 via-[#111] to-black shadow-[20px_20px_18px_#666,-20px_-20px_18px_#fff]"
          style={{
            animation: 'bounceCustom 3s infinite',
            animationDelay: '0.6s',
          }}
        />
        <span
          className="h-5 w-5 rounded-full bg-gradient-to-r from-neutral-800 via-[#111] to-black shadow-[20px_20px_18px_#666,-20px_-20px_18px_#fff]"
          style={{
            animation: 'bounceCustom 3s infinite',
            animationDelay: '0.9s',
          }}
        />
      </div>
    </>
  );
};

export default Loader2;

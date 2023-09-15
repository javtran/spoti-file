const ProgressBar = ({ score, feature, i }) => {
  const animation = `
    @keyframes show-bar-${i} {
        0% {
            width: 0;
        }
        100% {
            width: ${score * 100}%;
        }
    }
  `;
  return (
    <div className=" flex gap-4 items-center">
      <p className="capitalize text-slate-400 text-sm w-40">{feature}</p>
      <div className="relative w-full bg-stone-800 select-none">
        <style>{animation}</style>
        <div
          className="relative p-1 bg-[#1DB954] w-0"
          style={{ animation: `show-bar-${i} 1s ${i * 0.1}s forwards` }}
        >
          <div className="absolute right-[-4px] top-[-2px] bg-white rounded-full w-3 h-3"></div>
          <p className="absolute w-16 text-center right-[-1.75rem] bottom-[-1.5rem] text-slate-400 text-xs">
            {Number(score * 100).toFixed(2)}
          </p>
        </div>

        {/* <span className="absolute left-[-1rem]">asd</span> */}
      </div>
    </div>
  );
};
export default ProgressBar;

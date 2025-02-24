const ProgressBar = ({ maximum, value }) => {
  return (
    <div className="bg-white flex rounded-xl border border-gray-300 dark:border-[#6F9BFC] dark:bg-secondary">
      <div
        className="bg-[#6F9BFC] dark:bg-dark-primary flex items-center justify-center rounded-xl font-bold py-.5 relative overflow-x-hidden transition-width ease-out duration-500"
        style={{ width: `${(value / maximum) * 100}%` }}
      >
        <span className="z-10 dark:text-white tracking-wider">
          {(value * 100) / maximum}%
        </span>
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/3 animate-flow"></div>
      </div>
    </div>
  );
};

export default ProgressBar;

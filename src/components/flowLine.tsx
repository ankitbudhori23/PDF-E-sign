interface dotStatus {
  label: string;
  color: string | undefined;
}

interface lineStatus {
  style: object;
}

const Dot: React.FC<dotStatus> = ({ label, color }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="relative rounded-full w-[22px] h-[22px] bg-white flex items-center justify-center">
        <span
          style={{ color: `${color === "#fff" && "#a5a39c"}`}}
          className="absolute tracking-wide top-[-24px] xs:top-[-20px] w-24 text-base xs:text-xs text-dark-gray"
        >
          {label}
        </span>
        <div
          className="rounded-full w-4 h-4"
          style={{ backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
};

const Line: React.FC<lineStatus> = ({ style }) => {
  return (
    <div className="min-w-[100px]">
      <div className="h-[9px] w-full bg-white flex items-center">
        <div className="h-[3px] w-full" style={style}></div>
      </div>
    </div>
  );
};

const FlowLine: React.FC<{ step: number }> = ({ step }) => {
  // 1:upload 2:signing 3:download
  const dotStatus = (sort: number) => {
    if (sort < step) return "#51a8bc";
    if (sort === step) return "#f9b471";
    if (sort > step) return "#fff";
  };

  const lineStatus = (sort: number) => {
    if (sort < step) return "#51a8bc";
    if (sort >= step) return "#fff";
  };
  return (
    <div className="grid grid-cols-[22px_1fr_22px_1fr_22px] items-center mx-7">
      <Dot label="上傳文件" color={dotStatus(1)} />
      <Line style={{ backgroundColor: lineStatus(1) }} />
      <Dot label="進行簽署" color={dotStatus(2)} />
      <Line style={{ backgroundColor: lineStatus(2) }} />
      <Dot label="下載文件" color={dotStatus(3)} />
    </div>
  );
};
export default FlowLine;

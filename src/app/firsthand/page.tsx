import RoundBoard from "@/modules/RoundBoard";

const FirstHand: React.FC = () => {
  const startTime = new Date().getTime();
  return (
    <div className="py-[40px] flex flex-col items-center">
      <div className="flex flex-col items-center gap-y-[24px] w-4/5">
        <RoundBoard turn="first hand" started={true} startTime={startTime} />
      </div>
    </div>
  );
};

export default FirstHand;

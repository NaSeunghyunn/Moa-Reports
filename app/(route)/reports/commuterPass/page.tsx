import CommuterPassList from "./components/CommuterPassList";

export default function CommuterPass() {
  return (
    <div className="grid p-5 h-dvh">
      <div className="flex flex-col gap-10 justify-center items-center -mt-16">
        <CommuterPassList
          indicatorTitle="使用中"
          indicatorColor="primary"
          commuterPassList={[1, 2, 3]}
          commuterPassColor="green"
        />
        <CommuterPassList
          indicatorTitle="未使用"
          indicatorColor="neutral"
          commuterPassList={[1, 2, 3]}
          commuterPassColor="neutral"
        />
      </div>
    </div>
  );
}

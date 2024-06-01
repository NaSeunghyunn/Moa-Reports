import JoinFrom from "./components/joinForm";

export default function CreateAccount() {
  return (
    <div className="py-8 px-6 flex flex-col">
      <div className="pb-10">
        <h1 className="text-2xl">Welcome to MOA REPORTS!</h1>
      </div>
      <JoinFrom />
    </div>
  );
}

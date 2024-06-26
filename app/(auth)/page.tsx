import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col p-6 justify-between min-h-screen">
      <div className="my-auto flex flex-col gap-2 items-center">
        <h1 className="text-5xl font-semibold text-center text-gray-300">
          MORE REPORTS.
        </h1>
      </div>
      <div className="flex flex-col items-center gap-3">
        <Link
          href="/sign"
          className="text-center w-full bg-green-500 rounded-md text-black py-2.5 hover:bg-green-400 transition-colors font-medium"
        >
          開始する
        </Link>
      </div>
    </div>
  );
}

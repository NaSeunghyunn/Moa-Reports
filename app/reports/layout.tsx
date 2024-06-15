import ReprotsBar from "@/components/reports-bar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-neutral-900 text-white">
      {children}
      <ReprotsBar />
    </div>
  );
}

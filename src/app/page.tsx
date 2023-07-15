import Card from "@/components/Card";
export default function Home() {
  return (
    <main className="flex flex-col gap-y-[32px] min-h-screen items-center justify-center">
      <div className="flex flex-row  gap-x-[32px]">
        <Card title="First Hand" content="start the game!" link="/firsthand" />
        {/* <Card title="Second Hand" content="join the game!" link="/secondhand" /> */}
      </div>
    </main>
  );
}

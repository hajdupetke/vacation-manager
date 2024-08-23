import Cal from "~/_components/Cal";
import { getEventsForCalendar } from "~/server/action";

export default async function HomePage() {
  const events = await getEventsForCalendar();

  return (
    <main className="flex h-full items-center justify-center">
      <Cal events={events} />
    </main>
  );
}

"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Cal = (props: any) => (
  <div className="w-[calc(100%/2)]">
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      fixedWeekCount={false}
      height="auto"
      firstDay={1}
      events={[
        {
          title: "lajos",
          start: "2024-08-23",
          end: "2024-09-02",
        },
      ]}
    />
  </div>
);

export default Cal;

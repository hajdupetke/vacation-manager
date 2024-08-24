"use client";

import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

const Date = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [value, setValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

  function handleChange(newValue: DateValueType) {
    const params = new URLSearchParams(searchParams);

    console.log(newValue?.startDate?.toISOString().split("T")[0]);
    newValue?.endDate?.setDate(newValue?.endDate.getDate() + 1);
    console.log(newValue?.endDate?.toISOString().split("T")[0]);
    params.set(
      "startDate",
      newValue?.startDate?.toISOString().split("T")[0] as string,
    );
    params.set(
      "endDate",
      newValue?.endDate?.toISOString().split("T")[0] as string,
    );

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Datepicker
      value={value}
      primaryColor={"blue"}
      separator="to"
      useRange={false}
      containerClassName={"border rounded-md"}
      onChange={(newValue) => {
        handleChange(newValue);
        setValue(newValue);
      }}
    />
  );
};

export default Date;

import { create } from "zustand";
import { IWeekTable } from "@/lib/type";

type ScheduleState = {
  data:
    | {
        first: IWeekTable;
        second: IWeekTable;
      }
    | undefined;
  fetch: () => Promise<void>;
};

export const useSchedule = create<ScheduleState>((set) => ({
  data: undefined,
  fetch: async () => {
    const data = await fetch("https://midis-api.damirlut.online/schedule").then((res) =>
      res.json()
    );
    set({ data });
  },
}));

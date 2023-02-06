import { create } from "zustand";
import { IScheduleResponse } from "@/lib/type";

type ScheduleState = {
  data: Record<string, IScheduleResponse>;

  fetch: (group: string) => Promise<void>;
};

export const useSchedule = create<ScheduleState>((set, get) => ({
  data: {},
  fetch: async (group) => {
    const data = await fetch(
      "https://midis-api.damirlut.online/schedule?group=" + group
    ).then((res) => res.json());
    set({ data: { ...get().data, [group]: data } });
  },
}));

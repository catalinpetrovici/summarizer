import { ChromeLocalStorage } from '@/lib/zustand-chrome-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Summary = {
  id: string;
  url: string;
  summary: string;
  tokens: number;
  timeSaved: number;
  createdAt: string;
};

interface SummarizeStore {
  active: string | undefined;
  summaries: Summary[] | [];
  addSummary: (summary: Summary) => void;
}

export const useSummarizeStore = create<SummarizeStore>()(
  persist(
    (set) => ({
      active: undefined,
      summaries: [],
      addSummary: (summary) => set((store) => ({ summaries: [...store.summaries, summary] })),
    }),
    {
      name: 'summarize-store',
      storage: createJSONStorage(() => ChromeLocalStorage),
    }
  )
);

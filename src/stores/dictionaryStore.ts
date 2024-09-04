import { DictItem, DictMap } from "@/app/api/config/route";
import { create } from "zustand";

interface DictionaryState {
  dictMap: DictMap;
  setDictMap: (dictMap: DictMap) => void;
  getDictItems: (key: string) => DictItem[];
  getDictItem: (key: string, value: string) => DictItem | undefined;
}

export const useDictionaryStore = create<DictionaryState>()((set, get) => ({
  dictMap: {},
  setDictMap: (dictMap) => set({ dictMap }),
  getDictItems: (key) => get().dictMap[key]?.data || [],
  getDictItem: (key, value) =>
    get().dictMap[key]?.data.find((item) => item.value === value),
}));

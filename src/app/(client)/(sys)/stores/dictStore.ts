import { DictItem, DictMap } from "@/app/(server)/(sys)/api/config/route";
import { create } from "zustand";

interface DictState {
    dictMap: DictMap;
    setDictMap: (dictMap: DictMap) => void;
    getDictItem: (key: string, value: string) => DictItem | undefined;
    getDictItems: (key: string) => DictItem[];
    getDictLabel: (key: string, value: string) => string;
}

export const useDictStore = create<DictState>()((set, get) => ({
    dictMap: {},
    setDictMap: (dictMap) => set({ dictMap }),
    getDictItems: (key) => get().dictMap[key]?.data || [],
    getDictItem: (key, value) =>
        get().dictMap[key]?.data.find((item) => item.value === value),
    getDictLabel: (key, value) => {
        const item = get().getDictItem(key, value);
        return item ? item.label : "";
    },
}));

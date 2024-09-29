import api from "@/utils/request";
import { create } from "zustand";
import { UserInfo } from "@/app/(server)/(sys)/api/user/info/route";
import { ResponseType } from "@/app/(server)/(sys)/types";
import { SYS_DEFAULT_USER_AVATAR } from "@/app/(client)/(sys)/constans";
import { SysDetailUser } from "@prisma/client";

type StoreUser = UserInfo;

interface UserState {
  user: StoreUser;
  setUser: (user: StoreUser) => void;
  getUser: () => StoreUser;
  setUserId: (id: string) => void;
  getUserId: () => string;
  updateAvatar: (avatar: string) => void;
  resetAvatar: () => void;
  updatePassword: (password: string) => Promise<ResponseType<unknown>>;
  updateUserInfo: (user: SysDetailUser) => Promise<ResponseType<unknown>>;
}

export const useUserStore = create<UserState>()((set, get) => ({
  user: {
    id: "",
    avatar: SYS_DEFAULT_USER_AVATAR,
    superAdmin: false,
    authorityList: [],
  },
  setUserId: (id: string) => {
    set({ user: { ...get().user, id } });
  },
  getUserId: () => get().user.id || "",
  setUser: (user: StoreUser) => {
    set({ user: { ...get().user, ...user } });
  },
  getUser: () => get().user,
  updateAvatar: async (avatar: string) => {
    await api.put("/api/user/" + get().user.id, { avatar });
    set({ user: { ...get().user, avatar } });
  },
  resetAvatar: async () => {
    await api.put("/api/user/" + get().user.id, { avatar: "" });
    set({ user: { ...get().user, avatar: "" } });
  },
  updatePassword: async (password: string): Promise<ResponseType<unknown>> => {
    const res = await api.put("/api/user/" + get().user.id, { password });
    return res;
  },
  updateUserInfo: async (user: SysDetailUser): Promise<ResponseType<unknown>> => {
    const res = await api.put("/api/user/" + get().user.id, user);
    set({ user: { ...get().user, ...user } });
    return res;
  },
}));

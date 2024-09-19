import api from "@/utils/request";
import { Gender, User, UserStatus } from "@prisma/client";
import { create } from "zustand";

interface UserState {
  user: User;
  setUser: (user: User) => void;
  getUser: () => User;
  setUserId: (id: string) => void;
  getUserId: () => string;
  updateAvatar: (avatar: string) => void;
  resetAvatar: () => void;
}

export const useUserStore = create<UserState>()((set, get) => ({
  user: {
    id: "",
    nickname: "",
    email: "",
    // avatar: "https://materialpro-nextjs-pro.vercel.app/images/profile/user-1.jpg",
    avatar: "/api/image/cm194nkzl0005pukjug05s25k",
    password: "",
    gender: Gender.MALE,
    mobile: "",
    status: UserStatus.NORMAL,
    superAdmin: false,
    createdAt: new Date(),
  },
  setUserId: (id: string) => {
    set({ user: { ...get().user, id } });
  },
  getUserId: () => get().user.id,
  updateAvatar: async (avatar: string) => {
    await api.put("/api/user/" + get().user.id, { avatar });
    set({ user: { ...get().user, avatar } });
  },
  resetAvatar: () => {
    set({ user: { ...get().user, avatar: "" } });
  },
  setUser: (user: User) => {
    set({ user });
  },
  getUser: () => get().user,
}));

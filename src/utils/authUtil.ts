import { config } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";

export const getUser = async (): Promise<User> => {
  const session = await getServerSession(config);
  return session?.user as User;
};

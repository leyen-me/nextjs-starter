import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession, Session } from "next-auth"

export const getUserId = async () => {
    const session = await getServerSession(authOptions)
    // @ts-ignore
    return session?.user?.id
}
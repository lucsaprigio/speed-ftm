import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { getServerSession } from "next-auth";
import { ReactNode } from "react"
import { Toaster } from "sonner";
import { nextAuthOptions } from "../api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";

export default async function PrivateLayout({ children }: { children: ReactNode }) {
    const session = await getServerSession(nextAuthOptions);

    if (!session) {
        redirect('/signin')
    }

    return (
        <SidebarProvider>
            <AppSidebar
                userId={session?.user.userId}
                username={session?.user.username}
            />
            <SidebarTrigger />
            <Toaster />
            {children}
        </SidebarProvider>
    )
}
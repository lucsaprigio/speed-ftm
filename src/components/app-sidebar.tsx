'use client'

import { Home, CirclePlus, LogOut } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";

type SidebarProps = {
    userId: number | undefined;
    username: string | undefined;
}

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home
    },
    {
        title: "Registrar",
        url: "/register",
        icon: CirclePlus
    },
]

export function AppSidebar({ userId, username }: SidebarProps) {
    const router = useRouter();

    async function logout() {
        await signOut({
            redirect: false,
        })

        return router.replace('/')
    }

    return (
        <>
            {/*             <Dialog open={dialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tem certeza que quer sair?</DialogTitle>
                        <Button onClick={logout}>
                            Sim
                        </Button>
                    </DialogHeader>
                </DialogContent>
            </Dialog> */}

            <Sidebar variant="sidebar" collapsible="icon">
                <SidebarHeader>
                    <SidebarContent>
                        <SidebarMenu>
                            <SidebarMenuItem key={"speed"}>
                                <SidebarMenuButton asChild>
                                    <div>
                                        <strong className="text-lg font-semibold text-slate-950">
                                            {userId && userId} - {username && username}
                                        </strong>
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarContent>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Cadastros</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem key={"user"}>
                            <SidebarMenuButton asChild>
                                {/*                                 <button
                                    className="flex items-center justify-center w-full h-12 text-sm font-semibold text-slate-950 bg-slate-300 hover:bg-slate-200"
                                    onClick={() => setDialog(true)}
                                >
                                    <LogOut />
                                    Sair
                                </button> */}
                                <Dialog>
                                    <DialogTrigger className="flex gap-3 bg-slate-950 text-gray-50 p-3 rounded-md w-full hover:brightness-75 transition-all">
                                        <LogOut />
                                        <span>
                                            Sair
                                        </span>
                                    </DialogTrigger>
                                    <DialogContent className="flex flex-col items-center sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Tem certeza que quer sair?</DialogTitle>
                                        </DialogHeader>
                                        <DialogDescription>
                                            <Button onClick={logout}>
                                                Sim
                                            </Button>
                                        </DialogDescription>
                                    </DialogContent>
                                </Dialog>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
        </>
    )
}
'use client'

import { Home, CirclePlus, LogOut, User } from "lucide-react"

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
} from "@/components/ui/dialog";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";

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
    const [open, setOpen] = useState(false);

    async function logout() {
        await signOut({
            redirect: false,
        })

        return router.replace('/')
    }

    return (
        <>
            <Dialog open={open} onOpenChange={() => setOpen(!open)}>
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
            <Sidebar variant="sidebar" collapsible="icon">
                <SidebarHeader>
                    <SidebarContent>
                        <SidebarMenu>
                            <SidebarMenuItem key={"speed"}>
                                <SidebarMenuButton asChild>
                                    <div>
                                        <User />
                                        <strong className="text-lg font-semibold text-gray-50">
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
                    <SidebarGroup>
                        <SidebarGroupLabel>Ações</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem key={"logout"}>
                                    <SidebarMenuButton asChild>
                                        <button onClick={() => setOpen(!open)}>
                                            <LogOut />
                                            <span>
                                                Sair
                                            </span>
                                        </button>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                </SidebarFooter>
            </Sidebar>
        </>
    )
}
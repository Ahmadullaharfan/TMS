import { Link } from '@inertiajs/react';
import { BookOpen, Folder, GraduationCap, LayoutGrid, Users } from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';
import AppLogo from './app-logo';
import { dashboard } from '@/routes';
import teachers from '@/routes/teachers';
import students from '@/routes/students';

const mainNavItems: NavItem[] = [
    {
        title: 'اصلي صفحه',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'د صنفونو تنظیمات',
        href: dashboard(),
        icon: BookOpen,
    },
    {
        title: 'د استادانو تنظیمات',
        href: teachers.index(),
        icon: GraduationCap,
    },
    {
        title: 'د شاگردانو تنظیمات',
        href: students.index(),
        icon: Users,
    },
    {
        title: 'د راپورونو تنظیمات',
        href: dashboard(),
        icon: Folder,
    },
];

export function AppSidebar() {
    return (
        <Sidebar side="right" collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
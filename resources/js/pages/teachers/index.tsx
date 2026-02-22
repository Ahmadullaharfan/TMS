import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { UserPlus  } from "lucide-react";
import AppLayout from '@/layouts/app-layout';
import teachers from '@/routes/teachers';
import type { BreadcrumbItem } from '@/types';
import * as React from "react"
import { PanelBottom } from 'lucide-react';


import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const pageTitle = 'د استادانو تنظیمات';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: pageTitle,
        href: teachers.index().url,
    },
];

export default function TeachersIndex() {


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={pageTitle} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <section className="teachers-header">
                    <div className="teachers-header-content">
                        <h1 className="teachers-header-title">{pageTitle}</h1>
                        <p className="teachers-header-subtitle">
                           د استادانو معلومات په اساني سره ذخیره کړي 
                        </p>
                    </div>

                    <div className="header-actions-container">
                      
                        <Button
                            className="icon-btn"
                            onClick={() => {
                                window.location.href = teachers.create().url;
                            }}
                        >
                            <div className="icon-wrapper">
                                <UserPlus className="w-4 h-4 mr-2" />
                                <span className="tooltip-text">د استاد اضافه کول</span>
                            </div>
                        </Button>

                    </div>
                </section>


            <Table>
                <TableCaption>د ټول ذخیره شویو استادانو لیست </TableCaption>
                <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">آیډي</TableHead>
                    <TableHead>نوم</TableHead>
                    <TableHead>تخلص</TableHead>
                    <TableHead>اوسني حالت</TableHead>
                    <TableHead className="text-right">عمل</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                <TableRow>
                    <TableCell className="font-medium">U001</TableCell>
                    <TableCell>احمد الله</TableCell>
                    <TableCell>عرفان</TableCell>
                    <TableCell className="text-right">فعال</TableCell>
                    <TableCell className="text-right">
                        <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            ایډیټ
                        </Button>
                          <Button variant="destructive" size="sm">
                            حذف
                        </Button>
                        </div>
                    </TableCell>
                </TableRow>

                </TableBody>
            </Table>

              
            </div>
        </AppLayout>
    );
}
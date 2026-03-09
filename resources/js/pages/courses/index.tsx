import { Head, router, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { FaRegEye } from 'react-icons/fa';
import { LuDelete } from 'react-icons/lu';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import courses from '@/routes/courses';
import type { BreadcrumbItem } from '@/types';

const pageTitle = 'د کورسونو تنظیمات';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: pageTitle,
        href: courses.index().url,
    },
];

type Course = {
    id: number;
    title: string;
    description: string | null;
    course_fee: number;
    start_date: string | null;
    end_date: string | null;
    teacher?: {
        id: number;
        first_name: string;
        last_name: string;
    } | null;
};

type PageProps = {
    courses?: Course[];
};

export default function CoursesIndex() {
    const { props } = usePage<PageProps>();
    const data = props.courses ?? [];
    const [deletingCourseId, setDeletingCourseId] = useState<number | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleDeleteCourse = (course: Course) => {
        const confirmed = window.confirm(`ایا د "${course.title}" کورس حذف شي؟`);
        if (!confirmed) {
            return;
        }

        setDeletingCourseId(course.id);

        router.delete(courses.destroy(course.id).url, {
            preserveScroll: true,
            onSuccess: () => {
                setSuccessMessage('کورس په بریالیتوب سره حذف شو.');
                window.setTimeout(() => setSuccessMessage(null), 3000);
            },
            onFinish: () => {
                setDeletingCourseId(null);
            },
        });
    };

    const columns = [
        {
            accessorKey: 'id',
            header: 'آیډي',
        },
        {
            accessorKey: 'title',
            header: 'عنوان',
        },
        {
            id: 'teacher_name',
            header: 'استاد',
            cell: ({ row }: { row: { original: Course } }) => {
                const teacher = row.original.teacher;
                return teacher ? `${teacher.first_name} ${teacher.last_name}` : '-';
            },
        },
        {
            accessorKey: 'course_fee',
            header: 'فیس',
        },
        {
            accessorKey: 'start_date',
            header: 'پیل نیټه',
        },
        {
            accessorKey: 'end_date',
            header: 'پای نیټه',
        },
        {
            id: 'actions',
            header: 'عمل',
            cell: ({ row }: { row: { original: Course } }) => (
                <div className="flex gap-2 text-right">
                    <Button variant="secondary" size="sm" onClick={() => router.visit(courses.show(row.original.id).url)}>
                        <FaRegEye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => router.visit(courses.edit(row.original.id).url)}>
                        <CiEdit className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteCourse(row.original)}
                        disabled={deletingCourseId === row.original.id}
                    >
                        <LuDelete className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={pageTitle} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card className="teacher-carde">
                    <CardHeader>
                        <CardTitle>ضروري صفحي</CardTitle>
                        <CardDescription>دلته د کورس اړوند مهمي صفحي په اساني سره ومومي</CardDescription>
                        <CardAction>عمومي</CardAction>
                    </CardHeader>
                </Card>

                <section className="teachers-header">
                    <div className="teachers-header-content">
                        <h1 className="teachers-header-title">{pageTitle}</h1>
                        <p className="teachers-header-subtitle">د کورسونو معلومات په اساني سره ذخیره کړي</p>
                    </div>

                    <div className="header-actions-container">
                        <Button className="icon-btn" onClick={() => router.visit(courses.create().url)}>
                            <div className="icon-wrapper">
                                <Plus className="h-4 w-4" />
                                <span className="tooltip-text">د کورس اضافه کول</span>
                            </div>
                        </Button>
                    </div>
                </section>

                <DataTable columns={columns} data={data} />
            </div>
            {successMessage && (
                <div className="fixed bottom-4 right-4 z-50 rounded-md bg-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-lg">
                    {successMessage}
                </div>
            )}
        </AppLayout>
    );
}

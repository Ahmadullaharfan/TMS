import { Head, router, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import courses from '@/routes/courses';
import type { BreadcrumbItem } from '@/types';

type Course = {
    id: number;
    title: string;
    description: string | null;
    teacher_id: number;
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
    course: Course;
};

export default function ShowCourse() {
    const { course } = usePage<PageProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'د کورس معلومات',
            href: courses.show(course.id).url,
        },
    ];

    const teacherName = course.teacher ? `${course.teacher.first_name} ${course.teacher.last_name}` : '-';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="د کورس معلومات" />
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 1 }}
                className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl bg-gray-50 p-4"
            >
                <div className="mx-auto w-full max-w-4xl">
                    <div className="overflow-hidden rounded-xl bg-white shadow-lg">
                        <div className="p-6 md:p-8">
                            <h1 className="mb-2 text-2xl font-bold text-gray-800">د کورس معلومات</h1>
                            <p className="mb-6 text-gray-600">دلته تاسي د کورس بشپړ معلومات لیدلی شئ</p>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">د کورس عنوان</label>
                                    <p className="mt-1 text-gray-900">{course.title}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">استاد</label>
                                    <p className="mt-1 text-gray-900">{teacherName}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">د کورس فیس</label>
                                    <p className="mt-1 text-gray-900">{course.course_fee}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-500">تفصیل</label>
                                    <p className="mt-1 whitespace-pre-wrap text-gray-900">{course.description || '-'}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">د پیل نیټه</label>
                                    <p className="mt-1 text-gray-900">{course.start_date || '-'}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">د پای نیټه</label>
                                    <p className="mt-1 text-gray-900">{course.end_date || '-'}</p>
                                </div>
                            </div>

                            <div className="mt-8 flex gap-3">
                                <Button type="button" variant="outline" onClick={() => router.visit(courses.index().url)}>
                                    بیرته لیست ته
                                </Button>
                                <Button type="button" onClick={() => router.visit(courses.edit(course.id).url)}>
                                    Edit
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AppLayout>
    );
}

import { Head, router, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import teachers from '@/routes/teachers';
import type { BreadcrumbItem } from '@/types';

type Teacher = {
    id: number;
    first_name: string;
    last_name: string;
    father_name: string;
    grandfather_name: string | null;
    email: string;
    phone: string | null;
    salary: number | null;
    date_of_birth: string | null;
    gender: 'male' | 'female' | null;
    specialization: string | null;
    profile_photo: string | null;
    created_at?: string;
};

type PageProps = {
    teacher: Teacher;
};

export default function ShowTeacher() {
    const { teacher } = usePage<PageProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'د استاد معلومات',
            href: teachers.show(teacher.id).url,
        },
    ];

    const fullName = `${teacher.first_name ?? ''} ${teacher.last_name ?? ''}`.trim();
    const photoUrl = teacher.profile_photo ? `/storage/${teacher.profile_photo}` : null;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="د استاد معلومات" />
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
                            <h1 className="mb-2 text-2xl font-bold text-gray-800">د استاد معلومات</h1>
                            <p className="mb-6 text-gray-600">
                                دلته تاسي د یو استاد بشپړ معلومات لیدلی شئ
                            </p>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">د استاد نوم</label>
                                    <p className="mt-1 text-gray-900">{teacher.first_name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">تخلص</label>
                                    <p className="mt-1 text-gray-900">{teacher.last_name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">دپلارنوم</label>
                                    <p className="mt-1 text-gray-900">{teacher.father_name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">دنیکه نوم</label>
                                    <p className="mt-1 text-gray-900">{teacher.grandfather_name || '-'}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">ایمل</label>
                                    <p className="mt-1 text-gray-900">{teacher.email}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">دټلیفون نمبر</label>
                                    <p className="mt-1 text-gray-900">{teacher.phone || '-'}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">معاش</label>
                                    <p className="mt-1 text-gray-900">{teacher.salary ?? '-'}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">دزیږیدو نیټه</label>
                                    <p className="mt-1 text-gray-900">{teacher.date_of_birth || '-'}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">جنسیت</label>
                                    <p className="mt-1 text-gray-900">
                                        {teacher.gender === 'male'
                                            ? 'نارینه'
                                            : teacher.gender === 'female'
                                              ? 'ښځینه'
                                              : '-'}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">تخصص</label>
                                    <p className="mt-1 text-gray-900">{teacher.specialization || '-'}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-500">تصویر</label>
                                    <div className="mt-1">
                                        {photoUrl ? (
                                            <img
                                                src={photoUrl}
                                                alt={fullName || 'Teacher'}
                                                className="h-32 w-32 rounded-lg border border-gray-200 object-cover"
                                            />
                                        ) : (
                                            <p className="text-gray-900">-</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.visit(teachers.index().url)}
                                >
                                    بیرته لیست ته
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => router.visit(teachers.edit(teacher.id).url)}
                                >
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

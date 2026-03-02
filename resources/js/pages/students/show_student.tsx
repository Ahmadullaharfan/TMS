import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import students from '@/routes/students';
import {motion } from 'framer-motion';

type Student = {
    id: number;
    first_name: string;
    last_name: string;
    father_name: string;
    grandfather_name: string | null;
    email: string;
    phone: string | null;
    date_of_birth: string | null;
    gender: 'male' | 'female' | null;
    profile_photo: string | null;
    created_at?: string;
};

type PageProps = {
    student: Student;
};

export default function ShowStudent() {
    const { student } = usePage<PageProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'د شاګرد معلومات',
            href: students.show(student.id).url,
        },
    ];

    const fullName = `${student.first_name ?? ''} ${student.last_name ?? ''}`.trim();
    const photoUrl = student.profile_photo ? `/storage/${student.profile_photo}` : null;

    return (
<AppLayout breadcrumbs={breadcrumbs}>
  <Head title="د شاګرد معلومات" />
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
          {/* Header */}
          <h1 className="mb-2 text-2xl font-bold text-gray-800">
            د شاګرد معلومات
          </h1>
          <p className="mb-6 text-gray-600">
            دلته تاسي د یو شاګرد بشپړ معلومات لیدلی شئ
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-500">
                د شاګرد نوم
              </label>
              <p className="mt-1 text-gray-900">{student.first_name}</p>
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-500">
                تخلص
              </label>
              <p className="mt-1 text-gray-900">{student.last_name}</p>
            </div>

            {/* Father's Name */}
            <div>
              <label className="block text-sm font-medium text-gray-500">
                دپلارنوم
              </label>
              <p className="mt-1 text-gray-900">{student.father_name}</p>
            </div>

            {/* Grandfather's Name */}
            <div>
              <label className="block text-sm font-medium text-gray-500">
                دنیکه نوم
              </label>
              <p className="mt-1 text-gray-900">
                {student.grandfather_name || '-'}
              </p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-500">
                ایمل
              </label>
              <p className="mt-1 text-gray-900">{student.email}</p>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-500">
                دټلیفون نمبر
              </label>
              <p className="mt-1 text-gray-900">{student.phone || '-'}</p>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-500">
                دزیږیدو نیټه
              </label>
              <p className="mt-1 text-gray-900">{student.date_of_birth || '-'}</p>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-500">
                جنسیت
              </label>
              <p className="mt-1 text-gray-900">
                {student.gender === 'male'
                  ? 'نارینه'
                  : student.gender === 'female'
                  ? 'ښځینه'
                  : '-'}
              </p>
            </div>

            {/* Photo - Full width on mobile, spans both columns on larger screens */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-500">
                تصویر
              </label>
              <div className="mt-1">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt={fullName || 'Student'}
                    className="h-32 w-32 rounded-lg border border-gray-200 object-cover"
                  />
                ) : (
                  <p className="text-gray-900">-</p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.visit(students.index().url)}
            >
              بیرته لیست ته
            </Button>
            <Button
              type="button"
              onClick={() => router.visit(students.edit(student.id).url)}
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

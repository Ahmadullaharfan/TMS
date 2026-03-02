import { Head, router, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { FaRegEye } from 'react-icons/fa';
import { LuDelete } from 'react-icons/lu';
import { DataTable } from '@/components/data-table'; // <-- import the new DataTable
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import students from '@/routes/students';
import teachers from '@/routes/teachers';
import type { BreadcrumbItem } from '@/types';


const pageTitle = 'دشاګردانو تنظیمات';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: pageTitle,
    href: teachers.index().url,
  },
];

type Student = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

type PageProps = {
  students?: Student[];
};

export default function StudentsIndex() {
  const { props } = usePage<PageProps>();
  const data = props.students ?? [];
  const [deletingStudentId, setDeletingStudentId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const playSuccessSound = () => {
    const audio = new Audio('/sounds/freesound_community-coin-clatter-6-87110.mp3');
    audio.play().catch(() => {
      // Ignore autoplay restrictions silently.
    });
  };

  const handleDeleteStudent = (student: Student) => {
    const confirmed = window.confirm(`ایا د "${student.first_name} ${student.last_name}" ریکارډ حذف شي؟`);
    if (!confirmed) {
      return;
    }

    setDeletingStudentId(student.id);

    router.delete(students.destroy(student.id).url, {
      preserveScroll: true,
      onSuccess: () => {
        setSuccessMessage('شاګرد په بریالیتوب سره حذف شو.');
        playSuccessSound();
        window.setTimeout(() => setSuccessMessage(null), 3000);
      },
      onFinish: () => {
        setDeletingStudentId(null);
      },
    });
  };

  // Define columns – now with string headers for better dropdown labels
  const columns = [
    {
      accessorKey: 'id',
      header: 'آیډي',
    },
    {
      accessorKey: 'first_name',
      header: 'نوم', // will appear in column visibility dropdown
    },
    {
      accessorKey: 'last_name',
      header: 'تخلص',
    },
    {
      accessorKey: 'email',
      header: 'ایمیل',
    },
    {
      id: 'actions',
      header: 'عمل',
      cell: ({ row }: { row: { original: Student } }) => (
        <div className="flex gap-2 text-right">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => router.visit(students.show(row.original.id).url)}
          >
            <FaRegEye className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.visit(students.edit(row.original.id).url)}
          >
            <CiEdit className="w-4 h-4" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDeleteStudent(row.original)}
            disabled={deletingStudentId === row.original.id}
          >
            <LuDelete className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={pageTitle} />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

        <section className="teachers-header">
          <div className="teachers-header-content">
            <h1 className="teachers-header-title">{pageTitle}</h1>
            <p className="teachers-header-subtitle">
              د شاګردانو معلومات په اساني سره ذخیره کړي
            </p>
          </div>

          <div className="header-actions-container">
            <Button
              className="icon-btn"
              onClick={() => {
                window.location.href = students.create().url;
              }}
            >
              <div className="icon-wrapper">
                <Plus className="w-4 h-4" />
                <span className="tooltip-text">د شاګرد اضافه کول</span>
              </div>
            </Button>
          </div>
        </section>

        {/* Use the DataTable component */}
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

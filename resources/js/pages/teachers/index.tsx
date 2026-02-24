import { Head, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import teachers from '@/routes/teachers';
import type { BreadcrumbItem } from '@/types';
import { LuDelete } from 'react-icons/lu';
import { CiEdit } from 'react-icons/ci';
import { DataTable } from '@/components/data-table'; // <-- import the new DataTable

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const pageTitle = 'د استادانو تنظیمات';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: pageTitle,
    href: teachers.index().url,
  },
];

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
    cell: ({ row }) => (
      <div className="flex gap-2 text-right">
        <Button variant="outline" size="sm">
          <CiEdit className="w-4 h-4" />
        </Button>
        <Button variant="destructive" size="sm">
          <LuDelete className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
];

export default function TeachersIndex() {
  const { props } = usePage();
  const data = props.teachers ?? [];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={pageTitle} />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <Card className="teacher-carde">
          <CardHeader>
            <CardTitle>ضروري صفحي</CardTitle>
            <CardDescription>دلته موهیمي صفحي په اساني سره ومومي</CardDescription>
            <CardAction>ومومي</CardAction>
          </CardHeader>
          {/* Optional content */}
        </Card>

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
                <Plus className="w-4 h-4" />
                <span className="tooltip-text">د استاد اضافه کول</span>
              </div>
            </Button>
          </div>
        </section>

        {/* Use the DataTable component */}
        <DataTable columns={columns} data={data} />
      </div>
    </AppLayout>
  );
}
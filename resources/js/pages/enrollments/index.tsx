import { Head, router, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import enrollments from '@/routes/enrollments';
import type { BreadcrumbItem } from '@/types';

const pageTitle = 'د شاګردانو داخله';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: pageTitle,
        href: enrollments.index().url,
    },
];

type Enrollment = {
    id: number;
    enrollment_date: string | null;
    status: 'active' | 'completed' | 'dropped';
    total_paid: number;
    fee_status: 'unpaid' | 'partial' | 'paid';
    student?: {
        id: number;
        first_name: string;
        last_name: string;
    } | null;
    course?: {
        id: number;
        title: string;
    } | null;
};

type PageProps = {
    enrollments?: Enrollment[];
};

export default function EnrollmentIndex() {
    const { props } = usePage<PageProps>();
    const data = props.enrollments ?? [];

    const columns = [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            id: 'student',
            header: 'شاګرد',
            cell: ({ row }: { row: { original: Enrollment } }) => {
                const student = row.original.student;
                return student ? `${student.first_name} ${student.last_name}` : '-';
            },
        },
        {
            id: 'course',
            header: 'صنف',
            cell: ({ row }: { row: { original: Enrollment } }) => row.original.course?.title ?? '-',
        },
        {
            accessorKey: 'enrollment_date',
            header: 'د شامیلیدو نیټه',
        },
        {
            accessorKey: 'status',
            header: 'حالت',
        },
        {
            accessorKey: 'total_paid',
            header: 'ورکړل شوی فیس',
        },
        {
            accessorKey: 'fee_status',
            header: 'د فیس حالت',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={pageTitle} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <section className="teachers-header">
                    <div className="teachers-header-content">
                        <h1 className="teachers-header-title">{pageTitle}</h1>
                        <p className="teachers-header-subtitle">د شاګردانو په صنفونو کی د داخلي تنظیم .</p>
                    </div>

                    <div className="header-actions-container">
                        <Button className="icon-btn" onClick={() => router.visit(enrollments.create().url)}>
                            <div className="icon-wrapper">
                                <Plus className="h-4 w-4" />
                                <span className="tooltip-text">د داخلي اضافه کول</span>
                            </div>
                        </Button>
                    </div>
                </section>

                <DataTable columns={columns} data={data} />
            </div>
        </AppLayout>
    );
}

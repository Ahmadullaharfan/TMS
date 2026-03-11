import { Head, router, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import enrollments from '@/routes/enrollments';
import type { BreadcrumbItem } from '@/types';
import { FaRegEye } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import { LuDelete } from 'react-icons/lu';

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
    const [deletingEnrollmentId, setDeletingEnrollmentId] = useState<number | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleDeleteEnrollment = (enrollment: Enrollment) => {
        const confirmed = window.confirm('ایا ډاډه  یاست چي داریکارډ حذب کړي؟');
        if (!confirmed) {
            return;
        }

        setDeletingEnrollmentId(enrollment.id);

        router.delete(enrollments.destroy(enrollment.id).url, {
            preserveScroll: true,
            onSuccess: () => {
                setSuccessMessage('ریکارډ په کامیابي سره حذب شو');
                window.setTimeout(() => setSuccessMessage(null), 3000);
            },
            onFinish: () => {
                setDeletingEnrollmentId(null);
            },
        });
    };

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
        
        {
            id: 'actions',
            header: 'عمل',
            cell: ({ row }: { row: { original: Enrollment } }) => (
                <div className="flex gap-2 text-right">
                    <Button variant="secondary" size="sm" onClick={() => router.visit(enrollments.show(row.original.id).url)}>
                        <FaRegEye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => router.visit(enrollments.edit(row.original.id).url)}>
                        <CiEdit className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteEnrollment(row.original)}
                        disabled={deletingEnrollmentId === row.original.id}
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
            {successMessage && (
                <div className="fixed bottom-4 right-4 z-50 rounded-md bg-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-lg">
                    {successMessage}
                </div>
            )}
        </AppLayout>
    );
}

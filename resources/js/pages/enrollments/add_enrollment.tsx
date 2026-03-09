// resources/js/pages/enrollments/add_enrollment.tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SearchableSelect, type SearchableOption } from '@/components/ui/searchable-select';
import AppLayout from '@/layouts/app-layout';
import courseRoutes from '@/routes/courses';
import enrollments from '@/routes/enrollments';
import studentRoutes from '@/routes/students';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'شموليت اضافه کول',
        href: enrollments.index().url,
    },
];

const schema = z.object({
    student_id: z.coerce.number().min(1, 'مهرباني وکړئ شاګرد وټاکئ'),
    course_id: z.coerce.number().min(1, 'مهرباني وکړئ صنف وټاکئ'),
    enrollment_date: z.string().trim().optional().or(z.literal('')),
    status: z.enum(['active', 'completed', 'dropped']),
    payment_amount: z.preprocess(
        (value) => (value === '' || value == null ? undefined : Number(value)),
        z.number().min(0, 'مقدار منفي نشي کېدای').optional(),
    ),
    payment_date: z.string().trim().optional().or(z.literal('')),
    receipt_no: z.string().trim().optional().or(z.literal('')),
    payment_note: z.string().trim().optional().or(z.literal('')),
});

type FormData = z.infer<typeof schema>;

type StudentOption = {
    id: number;
    first_name: string;
    last_name: string;
};

type CourseOption = {
    id: number;
    title: string;
    course_fee: number;
};

type PageProps = {
    students: StudentOption[];
    courses: CourseOption[];
};

export default function AddEnrollment() {
    const { students, courses } = usePage<PageProps>().props;

    // Transform options for searchable select
    const studentOptions = useMemo(
        () =>
            students.map((student) => ({
                value: student.id,
                label: `${student.first_name} ${student.last_name}`,
                description: `ID: ${student.id}`,
            })),
        [students],
    );

    const courseOptions = useMemo(
        () =>
            courses.map((course) => ({
                value: course.id,
                label: course.title,
                description: course.course_fee ? `Fee: ${course.course_fee}` : undefined,
            })),
        [courses],
    );

    const {
        control,
        register,
        watch,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            student_id: 0,
            course_id: 0,
            enrollment_date: '',
            status: 'active',
            payment_amount: undefined,
            payment_date: '',
            receipt_no: '',
            payment_note: '',
        },
    });

    const selectedCourseId = watch('course_id');
    const selectedCourse = courses.find((course) => course.id === selectedCourseId);

    const onSubmit = (values: FormData) => {
        router.post(enrollments.store().url, values, {
            onError: (serverErrors) => {
                Object.entries(serverErrors).forEach(([field, message]) => {
                    setError(field as keyof FormData, {
                        type: 'server',
                        message: Array.isArray(message) ? message[0] : String(message),
                    });
                });
            },
        });
    };

    // Custom option loader example (if you want async loading)
    // const loadStudents = async (search: string): Promise<SearchableOption[]> => {
    //     const response = await fetch(`/api/students?search=${search}`);
    //     const data = await response.json();
    //     return data.map((student: any) => ({
    //         value: student.id,
    //         label: `${student.first_name} ${student.last_name}`,
    //     }));
    // };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="شموليت اضافه کول" />
            <div className="flex h-full flex-1 flex-col items-center gap-4 overflow-x-auto rounded-xl p-4">
                <div className="page-container max-w-3xl">
                    <h1 className="form-title text-2xl font-bold">شموليت اضافه کول</h1>
                    <p className="form-subtitle mb-6 text-muted-foreground">
                        د شمولیت اړوند معلومات اضافه کړي او وروسته د فیس اړوند معلومات اضافه کړي
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Student Select */}
                            <Controller
                                name="student_id"
                                control={control}
                                render={({ field }) => (
                                    <SearchableSelect
                                        label="شاګرد"
                                        value={field.value}
                                        options={studentOptions}
                                        onChange={(value) => field.onChange(value)}
                                        placeholder="شاګرد وټاکئ"
                                        searchPlaceholder="دشاګردانو لټون"
                                        noResultsMessage="شاګرد ونه موندل شو"
                                        error={errors.student_id?.message}
                                        creatable
                                        onCreateNew={() => router.visit(studentRoutes.create().url)}
                                        createNewLabel="نوی شاګرد"
                                        required
                                        clearable
                                    />
                                )}
                            />

                            {/* Course Select */}
                            <Controller
                                name="course_id"
                                control={control}
                                render={({ field }) => (
                                    <SearchableSelect
                                        label="صنف"
                                        value={field.value}
                                        options={courseOptions}
                                        onChange={(value) => field.onChange(value)}
                                        placeholder="صنف وټاکئ"
                                        searchPlaceholder="د صنفونو لټون"
                                        noResultsMessage="صنف ونه موندل شو"
                                        error={errors.course_id?.message}
                                        creatable
                                        onCreateNew={() => router.visit(courseRoutes.create().url)}
                                        createNewLabel="نوی صنف"
                                        required
                                        clearable
                                    />
                                )}
                            />
                        </div>

                        {/* Course Fee Display */}
                        {selectedCourse && selectedCourse.course_fee > 0 && (
                            <div className="rounded-md bg-muted/50 p-3">
                                <p className="text-sm">
                                    <span className="font-medium">د صنف فيس:</span>{' '}
                                    {selectedCourse.course_fee} افغانۍ
                                </p>
                            </div>
                        )}

                        <div className="column-2">
                            {/* Enrollment Date */}
                            <div className="input-box">
                                <Label htmlFor="enrollment_date">د شموليت نيټه</Label>
                                <Input
                                    id="enrollment_date"
                                    type="date"
                                    {...register('enrollment_date')}
                                />
                                {errors.enrollment_date && (
                                    <p className="text-sm text-red-500">{errors.enrollment_date.message}</p>
                                )}
                            </div>
                            
                                                               {/* Status */}
                            <div className="input-box">
                                <Label htmlFor="status">حالت</Label>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger id="status">
                                                <SelectValue placeholder="حالت وټاکئ" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">فعال</SelectItem>
                                                <SelectItem value="completed">بشپړ شوی</SelectItem>
                                                <SelectItem value="dropped">لغوه شوی</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.status && (
                                    <p className="text-sm text-red-500">{errors.status.message}</p>
                                )}
                            </div>

                        </div>

                        {/* Payment Section */}
                        <div className="rounded-md border border-border p-4">
                            <h3 className="mb-4 text-sm font-semibold">د نغدي تاديې برخه (اختياري)</h3>
                            
                            <div className="column-2">
                                <div className="input-box">
                                    <Label htmlFor="payment_amount">تاديه شوې اندازه</Label>
                                    <Input
                                        id="payment_amount"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        placeholder="0.00"
                                        {...register('payment_amount')}
                                    />
                                    {errors.payment_amount && (
                                        <p className="text-sm text-red-500">{errors.payment_amount.message}</p>
                                    )}
                                </div>

                                <div className="input-box">
                                    <Label htmlFor="payment_date">د تاديې نيټه</Label>
                                    <Input
                                        id="payment_date"
                                        type="date"
                                        {...register('payment_date')}
                                    />
                                    {errors.payment_date && (
                                        <p className="text-sm text-red-500">{errors.payment_date.message}</p>
                                    )}
                                </div>

                                <div className="input-box">
                                    <Label htmlFor="receipt_no">رسيد شمېره</Label>
                                    <Input
                                        id="receipt_no"
                                        placeholder="اختياري"
                                        {...register('receipt_no')}
                                    />
                                    {errors.receipt_no && (
                                        <p className="text-sm text-red-500">{errors.receipt_no.message}</p>
                                    )}
                                </div>

                                <div className="input-box">
                                    <Label htmlFor="payment_note">يادښت</Label>
                                    <Input
                                        id="payment_note"
                                        placeholder="اختياري"
                                        {...register('payment_note')}
                                    />
                                    {errors.payment_note && (
                                        <p className="text-sm text-red-500">{errors.payment_note.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? 'په تياره کې...' : 'ذخيره'}
                        </Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
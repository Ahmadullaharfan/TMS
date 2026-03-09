import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router, usePage } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import courses from '@/routes/courses';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'دلته تاسي کولاي شي د کورس اړوند معلومات اضافه کړي',
        href: courses.index().url,
    },
];

const schema = z
    .object({
        title: z.string().trim().min(1, 'د کورس عنوان ولیکي'),
        description: z.string().trim().optional().or(z.literal('')),
        teacher_id: z.coerce.number().min(1, 'استاد انتخاب کړي'),
        course_fee: z.coerce.number().min(0, 'د کورس فیس منفي نشي کیدی'),
        start_date: z.string().trim().optional().or(z.literal('')),
        end_date: z.string().trim().optional().or(z.literal('')),
    })
    .refine(
        (data) => !data.start_date || !data.end_date || new Date(data.end_date) >= new Date(data.start_date),
        {
            message: 'د پای نیټه باید د پیل نیټې نه وروسته یا مساوي وي',
            path: ['end_date'],
        },
    );

type FormData = z.infer<typeof schema>;

type TeacherOption = {
    id: number;
    first_name: string;
    last_name: string;
};

type PageProps = {
    teachers: TeacherOption[];
};

export default function CreateCourse() {
    const { teachers } = usePage<PageProps>().props;

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: '',
            description: '',
            teacher_id: 0,
            course_fee: 0,
            start_date: '',
            end_date: '',
        },
    });

    const onSubmit = (values: FormData) => {
        router.post(courses.store().url, values, {
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="د کورس اضافه کول" />
            <div className="flex h-full flex-1 flex-col items-center gap-4 overflow-x-auto rounded-xl p-4">
                <div className="page-container">
                    <h1 className="form-title">د کورس اضافه کول</h1>
                    <p className="form-subtitle">دلته تاسي کولاي شي د کورس اړوند معلومات اضافه کړي</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-container">
                            <div className="column-1">
                                <div className="input-box">
                                    <Label>د کورس عنوان</Label>
                                    <Input placeholder="د کورس عنوان ولیکي" {...register('title')} />
                                    {errors.title && <span className="error-message">{errors.title.message}</span>}
                                </div>
                            </div>

                            <div className="column-1">
                                <div className="input-box">
                                    <Label>تفصیل</Label>
                                    <textarea
                                        className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                                        placeholder="د کورس تفصیل ولیکي"
                                        rows={4}
                                        {...register('description')}
                                    />
                                    {errors.description && (
                                        <span className="error-message">{errors.description.message}</span>
                                    )}
                                </div>
                            </div>

                            <div className="column-2">
                                <div className="input-box">
                                    <Label>استاد</Label>
                                    <select
                                        className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                                        {...register('teacher_id')}
                                    >
                                        <option value={0}>استاد انتخاب کړي</option>
                                        {teachers.map((teacher) => (
                                            <option key={teacher.id} value={teacher.id}>
                                                {teacher.first_name} {teacher.last_name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.teacher_id && (
                                        <span className="error-message">{errors.teacher_id.message}</span>
                                    )}
                                </div>
                                <div className="input-box">
                                    <Label>د کورس فیس</Label>
                                    <Input type="number" min="0" step="0.01" {...register('course_fee')} />
                                    {errors.course_fee && (
                                        <span className="error-message">{errors.course_fee.message}</span>
                                    )}
                                </div>
                            </div>

                            <div className="column-2">
                                <div className="input-box">
                                    <Label>د پیل نیټه</Label>
                                    <Input type="date" {...register('start_date')} />
                                    {errors.start_date && (
                                        <span className="error-message">{errors.start_date.message}</span>
                                    )}
                                </div>
                                <div className="input-box">
                                    <Label>د پای نیټه</Label>
                                    <Input type="date" {...register('end_date')} />
                                    {errors.end_date && <span className="error-message">{errors.end_date.message}</span>}
                                </div>
                            </div>

                            <Button type="submit" className="mt-4" disabled={isSubmitting}>
                                ذخیره
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

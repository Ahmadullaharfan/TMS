import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import teachers from '@/routes/teachers';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'دلته تاسي کولاي شي د استاډ اړوند معلومات اضافه کړي',
        href: teachers.index().url,
    },
];

const schema = z.object({
    first_name: z
        .string()
        .trim()
        .min(1, 'نوم ولیکي')
        .regex(/^[\p{L}\s'-]+$/u, 'نوم کې شمیرې نشي راتلای'),
    last_name: z
        .string()
        .trim()
        .min(1, 'تخلص ولیکي')
        .regex(/^[\p{L}\s'-]+$/u, 'تخلص کې شمیرې نشي راتلای'),
    father_name: z
        .string()
        .trim()
        .min(1, 'دپلارنوم ولیکي')
        .regex(/^[\p{L}\s'-]+$/u, 'دپلارنوم کې شمیرې نشي راتلای'),
    grandfather_name: z
        .string()
        .trim()
        .min(1, 'دنیکه نوم ولیکي')
        .regex(/^[\p{L}\s'-]+$/u, 'دنیکه نوم کې شمیرې نشي راتلای'),
    email: z
        .string()
        .trim()
        .email('معتبر ایمل ولیکي'),
    phone: z
        .string()
        .trim()
        .min(1, 'دتلیفون شمیره ولیکي'),
    date_of_birth: z
        .string()
        .trim()
        .min(1, 'دزیږیدو نیټه انتخاب کړي'),
    gender: z.enum(['male', 'female']),
    specialization: z
        .string()
        .trim()
        .min(1, 'تخصص ولیکي'),
    profile_photo: z.any().optional(),
});

type FormData = z.infer<typeof schema>;

export default function CreateTeacher() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            first_name: '',
            last_name: '',
            father_name: '',
            grandfather_name: '',
            email: '',
            phone: '',
            date_of_birth: '',
            gender: 'male',
            specialization: '',
            profile_photo: undefined,
        },
    });

    const onSubmit = (values: FormData) => {
        const payload = {
            ...values,
            profile_photo: values.profile_photo?.[0] ?? null,
        };

        router.post(teachers.store().url, payload, {
            forceFormData: true,
            onError: (serverErrors) => {
                Object.entries(serverErrors).forEach(([field, messages]) => {
                    setError(field as keyof FormData, {
                        type: 'server',
                        message: Array.isArray(messages) ? messages[0] : String(messages),
                    });
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="د استاد اضافه کول" />
            <div className="flex h-full flex-1 flex-col items-center gap-4 overflow-x-auto rounded-xl p-4">
                <div className="page-container">
                    <h1 className="form-title">د استاد اضافه کول</h1>
                    <p className="form-subtitle">
                        دلته تاسي کولاي شي د استاد اړوند معلومات اضافه کړي
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-container">
                            <div className="column-2">
                                <div className="input-box">
                                    <Label>د استاد نوم</Label>
                                    <Input placeholder="داستاد نوم ولیکي" {...register('first_name')} />
                                    {errors.first_name && (
                                        <span className="error-message">{errors.first_name.message}</span>
                                    )}
                                </div>
                                <div className="input-box">
                                    <Label>تخلص</Label>
                                    <Input placeholder="تخلص ولیکي" {...register('last_name')} />
                                    {errors.last_name && (
                                        <span className="error-message">{errors.last_name.message}</span>
                                    )}
                                </div>
                            </div>

                            <div className="column-2">
                                <div className="input-box">
                                    <Label>دپلارنوم</Label>
                                    <Input placeholder="دپلارنوم ولیکي" {...register('father_name')} />
                                    {errors.father_name && (
                                        <span className="error-message">{errors.father_name.message}</span>
                                    )}
                                </div>
                                <div className="input-box">
                                    <Label>دنیکه نوم</Label>
                                    <Input placeholder="دنیکه نوم ولیکي" {...register('grandfather_name')} />
                                    {errors.grandfather_name && (
                                        <span className="error-message">{errors.grandfather_name.message}</span>
                                    )}
                                </div>
                            </div>

                            <div className="column-2">
                                <div className="input-box">
                                    <Label>ایمل</Label>
                                    <Input placeholder="ایمل ولیکي" {...register('email')} />
                                    {errors.email && (
                                        <span className="error-message">{errors.email.message}</span>
                                    )}
                                </div>
                                <div className="input-box">
                                    <Label>دټلیفون نمبر</Label>
                                    <Input placeholder="دټلیفون نمبر ولیکي" {...register('phone')} />
                                    {errors.phone && (
                                        <span className="error-message">{errors.phone.message}</span>
                                    )}
                                </div>
                            </div>

                            <div className="column-2">
                                <div className="input-box">
                                    <Label>د زیږیدو نیټه</Label>
                                    <Input type="date" placeholder="د زیږیدو نیټه انتخاب کړي" {...register('date_of_birth')} />
                                    {errors.date_of_birth && (
                                        <span className="error-message">{errors.date_of_birth.message}</span>
                                    )}
                                </div>
                                <div className="input-box">
                                    <Label>جنس</Label>
                                    <div className="flex gap-1">
                                        <input type="radio" id="male" value="male" {...register('gender')} />
                                        <Label htmlFor="male">نارینه</Label>
                                        <input type="radio" id="female" value="female" {...register('gender')} />
                                        <Label htmlFor="female">ښځه</Label>
                                    </div>
                                    {errors.gender && (
                                        <span className="error-message">{errors.gender.message}</span>
                                    )}
                                </div>
                            </div>

                            <div className="column-2">
                                <div className="input-box">
                                    <Label>تخصص</Label>
                                    <Input placeholder="تخصص" {...register('specialization')} />
                                    {errors.specialization && (
                                        <span className="error-message">{errors.specialization.message}</span>
                                    )}
                                </div>
                                <div className="input-box">
                                    <Label>تصویر</Label>
                                    <Input type="file" accept="image/*" placeholder="تصویر انتخاب کړي" {...register('profile_photo')} />
                                    {errors.profile_photo && (
                                        <span className="error-message">{errors.profile_photo.message as string}</span>
                                    )}
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

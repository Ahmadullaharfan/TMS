import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import students from '@/routes/students';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'دلته تاسي کولاي شي د استاډ اړوند معلومات اضافه کړي',
        href: students.index().url,
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
    date_of_birth: z.
        string()
        .trim()
        .min(1, 'دزیږیدو نیټه انتخاب کړي'),
    gender: z
        .enum(['male', 'female', ]),
    profile_photo: z.
        any()
        .optional(),
});

type FormData = z.infer<typeof schema>;

export default function CreateStudent() {
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
            email:'',
            phone:'',
            date_of_birth:'',
            gender:'male',
            profile_photo: undefined,
        },
    });

    const onSubmit = (values: FormData) => {
        const payload = {
            ...values,
            profile_photo: values.profile_photo?.[0] ?? null,
        };

        router.post(students.store().url, payload, {
            forceFormData: true,
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
            <Head title="د شاګرد اضافه کول" />
            <div className="flex h-full flex-1 flex-col items-center gap-4 overflow-x-auto rounded-xl p-4">
                <div className="page-container">
                    <h1 className="form-title">د شاګرد اضافه کول</h1>
                    <p className="form-subtitle">
                        دلته تاسي کولاي شي د شاګرد اړوند معلومات اضافه کړي
                    </p>
                 <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-container">
                        <div className="column-2">
                            <div className="input-box">
                                <label htmlFor="first_name">دشاګرد نوم</label>
                                <Input {...register('first_name')} placeholder="دشاګرد نوم ولیکي" />
                                {errors.first_name && <p className="error-message">{errors.first_name.message}</p>}
                            </div>
                            <div className="input-box">
                                <label htmlFor="last_name">تخلص</label>
                                <Input {...register('last_name')} placeholder="تخلص ولیکي" />
                                {errors.last_name && <p className="error-message">{errors.last_name.message}</p>}
                            </div>
                        </div>
                         <div className="column-2">
                            <div className="input-box">
                                <label htmlFor="father_name">دپلارنوم</label>
                                <Input {...register('father_name')} placeholder="دپلارنوم ولیکي" />
                                {errors.father_name && <p className="error-message">{errors.father_name.message}</p>}
                            </div>
                            <div className="input-box">
                                <label htmlFor="grandfather_name">دنیکه نوم</label>
                                <Input {...register('grandfather_name')} placeholder="دنیکه نوم" />
                                {errors.grandfather_name && <p className="error-message">{errors.grandfather_name.message}</p>}
                            </div>
                        </div>
                        
                        <div className="column-2">
                            <div className="input-box">
                                <label htmlFor="email">ایمل</label>
                                <Input {...register('email')} placeholder="ایمل  ولیکي" />
                                {errors.email && <p className="error-message">{errors.email.message}</p>}
                            </div>
                            <div className="input-box">
                                <label htmlFor="phone">دټلیفون نمبر</label>
                                <Input {...register('phone')} placeholder="دتلیفون نمبر ولیکي" />
                                {errors.phone && <p className="error-message">{errors.phone.message}</p>}
                            </div>
                        </div>
                         <div className="column-2">
                            <div className="input-box">
                                <label htmlFor="date_of_birth">دزیږیدو نیټه</label>
                                <Input {...register('date_of_birth')} placeholder="دزیږیدو نیټه انتخاب کړي" type="date" />
                                {errors.date_of_birth && <p className="error-message">{errors.date_of_birth.message}</p>}
                            </div>
                            <div className="input-box">
                                <label htmlFor="gender">جنسیت</label>
                                <div className='flex gap-1'>
                                <input type="radio" id="male" value="male" {...register('gender')} />
                                <label htmlFor="male">نارینه</label>
                                <input type="radio" id="female" value="female" {...register('gender')} />
                                <label htmlFor="female">ښځینه</label>
                                {errors.gender && <p className="error-message">{errors.gender.message}</p>}

                                </div>
                            </div>
                        </div>

                        <div className='column-1'>
                            <div className="input-box">
                                <label htmlFor="profile_photo">تصویر</label>
                                <input type="file" accept='image/*' placeholder='image' {...register('profile_photo')} />
                                {errors.profile_photo && <p className="error-message">{errors.profile_photo.message}</p>}

                            </div>
                        </div>
                        <Button type='submit' className="mt-4" disabled={isSubmitting}>ذخیره</Button>
                    </div>
                 </form>
                </div>
            </div>
        </AppLayout>
    );
}

import { Head, useForm } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'دلته تاسي کولاي شي د استاډ اړوند معلومات اضافه کړي',
        href: dashboard().url,
    },
];

export default function CreateTeacher() {
     const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        father_name: '',
        grandfather_name: '',
        email: '',
        phone: '',
        date_of_birth: '',
        gender: '',
        specialization: '',
        profile_photo: null,
    });

   function handleSubmit(e) {
    e.preventDefault();
    post('/teachers');
   }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="د استاد اضافه کول" />
            <div className="flex h-full flex-1 flex-col items-center gap-4 overflow-x-auto rounded-xl p-4">
                <div className="page-container">
                    <h1 className="form-title">د استاد اضافه کول</h1>
                    <p className="form-subtitle">
                        دلته تاسي کولاي شي د استاد اړوند معلومات اضافه کړي
                    </p>
                 <form onSubmit={handleSubmit}>
                    <div className="form-container">
                        <div className="column-2">
                            <div className='input-box'>
                                <Label>د استاد نوم</Label>
                                <Input
                                    placeholder="د استاد نوم"
                                    value={data.first_name}
                                    onChange={e => setData('first_name', e.target.value)}
                                />
                            </div>
                            <div className='input-box'>
                                <Label>د استاد تخلص</Label>
                                <Input
                                    placeholder="د استاد تخلص"
                                    value={data.last_name}
                                    onChange={e => setData('last_name', e.target.value)}
                                />
                            </div>
                        </div>

                          <div className="column-2">
                            <div className='input-box'>
                                <Label>دپلارنوم</Label>
                                <Input
                                    placeholder="دپلارنوم"
                                    value={data.father_name}
                                    onChange={e => setData('father_name', e.target.value)}
                                />
                            </div>
                            <div className='input-box'>
                                <Label>دنیکه نوم </Label>
                                <Input
                                    placeholder="دنیکه نوم"
                                    value={data.grandfather_name}
                                    onChange={e => setData('grandfather_name', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="column-2">
                            <div className='input-box'>
                                <Label>ایمل آدرس</Label>
                                <Input
                                    placeholder="ایمل آدرس"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                />
                            </div>
                            <div className='input-box'>
                                <Label>د ټلیفون نمبر</Label>
                                <Input
                                    placeholder="د ټلیفون نمبر"
                                    value={data.phone}
                                    onChange={e => setData('phone', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="column-2">
                            <div className='input-box'>
                                <Label>د زیږیدو نیټه</Label>
                                <Input
                                    type="date"
                                    placeholder="د زیږیدو نیټه"
                                    value={data.date_of_birth}
                                    onChange={e => setData('date_of_birth', e.target.value)}
                                />
                            </div>
                            <div className='input-box'>
                                <Label>جنس</Label>
                                <div className="flex gap-2">
                                    <input
                                        type="radio"
                                        id="male"
                                        name="gender"
                                        value="male"
                                        checked={data.gender === 'male'}
                                        onChange={e => setData('gender', e.target.value)}
                                    />
                                    <Label htmlFor="male">نارینه</Label>
                                    <input
                                        type="radio"
                                        id="female"
                                        name="gender"
                                        value="female"
                                        checked={data.gender === 'female'}
                                        onChange={e => setData('gender', e.target.value)}
                                    />
                                    <Label htmlFor="female">ښځه</Label>
                                </div>
                            </div>
                        </div>
                        <div className="column-2">
                            <div className='input-box'>
                                <Label>تخصص</Label>
                                <Input
                                    placeholder="تخصص"
                                    value={data.specialization}
                                    onChange={e => setData('specialization', e.target.value)}
                                />
                            </div>
                            <div className='input-box'>
                                <Label>د پروفایل عکس</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setData('profile_photo', e.target.files[0])}
                                />
                            </div>
                        </div>
                        <Button type='submit' className="mt-4" disabled={processing}>ذخیره</Button>
                    </div>
                 </form>
                </div>
            </div>
        </AppLayout>
    );
}

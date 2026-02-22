import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'دلته تاسي کولاي شي د استاډ اړوند معلومات اضافه کړي',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="د استاد اضافه کول" />
            <div className="flex h-full flex-1 flex-col items-center gap-4 overflow-x-auto rounded-xl p-4">
                <div className="page-container">
                    <h1 className="form-title">د استاد اضافه کول</h1>
                    <p className="form-subtitle">
                        دلته تاسي کولاي شي د استاډ اړوند معلومات اضافه کړي
                    </p>
                    <div className="form-container">
                        <div className="column-2">
                            <div className='input-box'>
                                <Label>د استاد نوم</Label>
                                <Input placeholder="د استاد نوم" />
                            </div>
                           
                            <div className='input-box'>
                                <Label>د استاد تخلص</Label>
                                <Input placeholder="د استاد تخلص" />
                            </div>
                        </div>
                        <div className="column-2">
                            <div className='input-box'>
                                <Label>دپلار نوم</Label>
                                <Input placeholder="دپلار نوم" />
                            </div>
                           
                            <div className='input-box'>
                                <Label>دنیکه نوم</Label>
                                <Input placeholder="دنیکه نوم" />
                            </div>
                        </div>
                        <div className="column-1">
                               <div className='input-box'>
                                <Label>ایمل آدرس</Label>
                                <Input placeholder="ایمل آدرس" />
                            </div>
                        </div>
                    </div>
                </div>
        
            </div>
        </AppLayout>
    );
}

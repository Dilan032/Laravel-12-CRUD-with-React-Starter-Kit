import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import products from '@/routes/products';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { SquareCheckBig, CircleAlert } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: products.index.url(),
    },
];


export default function index() {

    const { flash } = usePage<{ flash: { success?: string; error?: string } }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className='m-4'>
                <Link href={products.create.url()}><Button className='cursor-pointer'>Create a Product</Button></Link>
            </div>
            <div className='m-4'>
                {/* success alert message */}
                {flash.success && (
                    <Alert variant="success">
                        <SquareCheckBig />
                        <AlertTitle>Notification!</AlertTitle>
                        <AlertDescription>
                            <div className="alert">{flash.success}</div>
                        </AlertDescription>
                    </Alert>
                 )}

                {/* error alert message */}
                {flash.error && (
                    <Alert variant="destructive">
                        <CircleAlert />
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>{flash.error}</AlertDescription>
                    </Alert>
                )} 
            </div>
        </AppLayout>
    );
}


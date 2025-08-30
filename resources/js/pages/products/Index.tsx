import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import products from '@/routes/products';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { SquareCheckBig, CircleAlert } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: products.index.url(),
    },
];

interface product{
    id: number;
    name: string;
    price: number;
    description: string;
    created_at: string;
}

export default function index() {

    const { product, flash } = usePage<{ flash: { success?: string; error?: string }, product: product[] }>().props;
    const { processing, delete: destroy } = useForm();

    // product delete fuction
    const handleDelete =(id: number, name: string) =>{
        if (confirm(`Are you sure you want to delete the product: ${name}?`)) {
            destroy(products.destroy.url(id));
    }}

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

            <div className="m-4">
            {product.length > 0 ? (
                <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-4 py-2 text-center">ID</th>
                        <th className="border px-4 py-2 text-center">Name</th>
                        <th className="border px-4 py-2 text-center">Price</th>
                        <th className="border px-4 py-2 text-center">Description</th>
                        <th className="border px-4 py-2 text-center">Created At</th>
                        <th className="border px-4 py-2 text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {product.map((p: product) => (
                        <tr key={p.id}>
                            <td className="border px-4 py-2 text-center">{p.id}</td>
                            <td className="border px-4 py-2 text-center">{p.name}</td>
                            <td className="border px-4 py-2 text-center">Rs. {p.price}</td>
                            <td className="border px-4 py-2 text-center">{p.description}</td>
                            <td className="border px-4 py-2 text-center">{new Date(p.created_at).toLocaleDateString()}</td>
                            <td className="border px-4 py-2 text-center">
                                <Button disabled={processing} onClick={()=> handleDelete(p.id, p.name)} className='bg-red-500 hover:bg-red-700 cursor-pointer'>Delete</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            ) : (
                <p>No products found.</p>
            )}
            </div>

        </AppLayout>
    );
}


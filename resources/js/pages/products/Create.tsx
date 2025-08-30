import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import products from '@/routes/products';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CircleAlert } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a new Product',
        href: products.create.url(),
    },
];

export default function create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        price: '',
        description: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
         e.preventDefault()
        // console.log(data);
        post(products.store.url())
    }
        

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Creat a new Product" />
            <div className='w-8/12 p-4'>
                <form onSubmit={handleSubmit} className='space-y-4'>  

                    {/* Display Errors */}
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive">
                        <CircleAlert />
                        <AlertTitle>Errors!</AlertTitle>
                        <AlertDescription>
                            <ul>
                                {Object.values(errors).map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </AlertDescription>
                        </Alert>
                    )}
                    
                    <div className='gap-1.5'>
                        <Label htmlFor="product name">Product Name</Label>
                        <Input placeholder='product name' id='product name' value={data.name} onChange={e => setData('name', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="product price">price</Label>
                        <Input placeholder='price' id='product price' value={data.price} onChange={e => setData('price', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="product description">Description</Label>
                        <Textarea placeholder='description' id='product description' value={data.description} onChange={e => setData('description', e.target.value)}/>
                    </div>
                    <Button type='submit' className='cursor-pointer'>Add product</Button>
                </form>
            </div>
        </AppLayout>
    );
}


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

// const breadcrumbs: BreadcrumbItem[] = [
//     {
//         title: 'Edit Product',
//         href: products.create.url(),
//     },
// ];

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}
interface Props{
    product: Product;
}

export default function edit({product} : Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        price: product.price,
        description: product.description,
    })

    const handleUpdate = (e: React.FormEvent) => {
         e.preventDefault()
        // console.log(data);
        put(products.update.url(product.id))
    }
        

    return (
        <AppLayout breadcrumbs={[{ title: 'Update Product', href: products.edit.url(product.id) }]}>
            <Head title="Update Product" />
            <div className='w-8/12 p-4'>
                <form onSubmit={handleUpdate} className='space-y-4'>  

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
                        <Input placeholder='price' id='product price' value={data.price} onChange={e => setData('price', Number(e.target.value))}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="product description">Description</Label>
                        <Textarea placeholder='description' id='product description' value={data.description} onChange={e => setData('description', e.target.value)}/>
                    </div>
                    <Button type='submit' className='cursor-pointer'>Update product</Button>
                </form>
            </div>
        </AppLayout>
    );
}


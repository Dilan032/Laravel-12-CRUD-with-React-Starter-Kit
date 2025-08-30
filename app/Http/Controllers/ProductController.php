<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $product = Product::all();
        return Inertia::render('products/Index', compact('product'));
    }

    public function create()
    {
        return Inertia::render('products/Create', []);
    }

    public function store(Request $request)
    {
        // dd($request);
        
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'price' => 'required|numeric',
                'description' => 'nullable|string',
            ]);

            Product::create($request->all());
            return redirect()->route('products.index')->with('success', 'Product created successfully.');
        
        } catch (ValidationException $e) {
            return redirect()->back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to create product: ' . $e->getMessage());
        }
    }
}

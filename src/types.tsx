export interface Product {
    id: number;
    category: string;
    name: string;
    description: string;
    price: number;
}

export interface ProductFormProps {
    onFinish: (product: Product) => void;
    product?: Product;
}

export interface ProductListProps {
    products: Product[];
    onAdd: (newProduct: Product) => void;  // Update this line
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
}

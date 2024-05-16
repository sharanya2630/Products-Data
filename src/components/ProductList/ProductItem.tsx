import React from 'react';
import { Button } from 'antd';
import {Product} from '../../types'
import './ProductList.css'

interface ProductItemProps {
  product: Product;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onEdit, onDelete }) => {
  const handleEdit = () => {
    onEdit(product.id);
  };

  const handleDelete = () => {
    onDelete(product.id);
  };

  return (
    <div className="product-item">
      <div>{product.category}</div>
      <div>{product.name}</div>
      <div>{product.description}</div>
      <div>{product.price}</div>
      <Button onClick={handleEdit}>Edit</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </div>
  );
};

export default ProductItem;

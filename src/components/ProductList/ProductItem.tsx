import React, { useState } from "react";
import { Button } from "antd";
import { Product } from "../../types";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface ProductItemProps {
  product: Product;
  onDelete: (id: number) => void;
  onEdit: (editedProduct: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    onDelete(product.id);
  };
  const navigate = useNavigate();

  const handleEdit = (editedProduct: Product) => {
    onEdit(editedProduct);
    setIsEditing(false);
  };

  return (
    <div className="product-item">

        <>
          <div>{product.category}</div>
          <div>{product.name}</div>
          <div>{product.description}</div>
          <div>{product.price}</div>
          <Button onClick={() => navigate("/add")}>Edit</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </>
   
    </div>
  );
};

export default ProductItem;

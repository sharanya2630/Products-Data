import React from 'react';
import { Table, Button, Modal } from 'antd';
import { Product } from '../../types';
import { useNavigate } from 'react-router-dom';
import './ProductList.css'

interface ProductListProps {
  products: Product[];
  onEdit: (editedProduct: Product) => void;
  onDelete: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete }) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);
  const navigate = useNavigate();

  const showEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalVisible(true);
  };

  const handleEditSubmit = () => {
    if (editingProduct) {
      onEdit(editingProduct);
      setIsModalVisible(false);
    }
  };

  const columns = [
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Product) => (
        <>
          <Button onClick={() => showEditModal(record)}>Edit</Button>
          <Button onClick={() => onDelete(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div className='table-container'>
      <Button className='add-button' onClick={() => navigate('/add')}>Add Product</Button>
      <Table className='table' columns={columns} dataSource={products} rowKey="id" />

      <Modal title="Edit Product" visible={isModalVisible} onOk={handleEditSubmit} onCancel={() => setIsModalVisible(false)}>
        {/* Your form elements for editing the product go here */}
      </Modal>
    </div>
  );
};

export default ProductList;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList/ProductList';
import AddProduct from './components/AddProductForm/AddProductForm';
import { Product } from './types';
import { Layout } from 'antd';
import './App.css'

const { Header, Content } = Layout;

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, category: 'Electronics', name: 'Laptop', description: 'A powerful laptop', price: 1000 },
    { id: 2, category: 'Books', name: 'Book', description: 'A great book', price: 20 },
  ]);

  const handleAdd = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const handleEdit = (editedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => (product.id === editedProduct.id ? editedProduct : product))
    );
  };

  const handleDelete = (id: number) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  return (
    <Router>
      <Layout>
        <Header className='header'>
          <h1 style={{ color: 'white', marginBottom : '20px' }}>Product Management</h1>
        </Header>
        <Content style={{ padding: '20px', }}>
          <Routes>
            <Route
              path="/"
              element={<ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />}
            />
            <Route path="/add" element={<AddProduct onAdd={handleAdd} />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;

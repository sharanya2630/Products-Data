import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList/ProductList";
import AddProduct from "./components/AddProductForm/AddProductForm";
import { Product } from "./types";
import { Layout } from "antd";
import "./App.css";

const { Header, Content } = Layout;

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      category: "Electronics",
      name: "Laptop",
      description: "A powerful laptop",
      price: 1000,
    },
    {
      id: 2,
      category: "Books",
      name: "Book",
      description: "A great book",
      price: 20,
    },
    {
      id: 3,
      category: "clothes",
      name: "Dresses",
      description: "A powerful laptop",
      price: 1000,
    },
    {
      id: 4,
      category: "spectacles",
      name: "glasses",
      description: "A great book",
      price: 20,
    },
    {
      id: 5,
      category: "Electronics",
      name: "Laptop",
      description: "A powerful laptop",
      price: 1000,
    },
    {
      id: 6,
      category: "Books",
      name: "Book",
      description: "A great book",
      price: 20,
    },
    {
      id: 7,
      category: "clothes",
      name: "Dresses",
      description: "A powerful laptop",
      price: 1000,
    },
    {
      id: 8,
      category: "spectacles",
      name: "glasses",
      description: "A great book",
      price: 20,
    },
  ]);

  const handleAdd = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const handleEdit = (editedProduct: Product) => {
    console.log("edit products", editedProduct);
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === editedProduct.id ? editedProduct : product
      )
    );
  };

  const handleDelete = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  return (
    <Router>
      <Layout>
        <div className="header">
          <h1 className="heading">
            Product Management
          </h1>
        </div>
        <Content style={{ padding: "20px" }}>
          <Routes>
            <Route
              path="/"
              element={
                <ProductList
                  products={products}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              }
            />
            <Route
              path="/add"
              element={<AddProduct onAdd={handleAdd} onEdit={handleEdit} />}
            />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;

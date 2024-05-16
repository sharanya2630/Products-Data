import React, { useState } from "react";
import { Table, Button, Modal, Input, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Product } from "../../types";
import { useNavigate } from "react-router-dom";

import "./ProductList.css";

interface ProductListProps {
  products: Product[];
  onEdit: (editedProduct: Product) => void;
  onDelete: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchName, setSearchName] = useState<string>("");
  const [searchDescription, setSearchDescription] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

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

  const handleNameSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const handleDescriptionSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchDescription(e.target.value);
  };
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchName.toLowerCase()) &&
      product.description
        .toLowerCase()
        .includes(searchDescription.toLowerCase()) &&
      (selectedCategory === "" ||
        selectedCategory === "All Categories" ||
        product.category === selectedCategory)
  );

  const categoryMenu = (
    <Menu>
      <Menu.Item key="" onClick={() => handleCategorySelect("All Categories")}>
        All Categories
      </Menu.Item>
      <Menu.Divider />
      {Array.from(new Set(products.map((product) => product.category))).map(
        (category) => (
          <Menu.Item
            key={category}
            onClick={() => handleCategorySelect(category)}
            style={{
              border: selectedCategory === category ? "1px solid red" : "none",
            }}
          >
            {category}
          </Menu.Item>
        )
      )}
    </Menu>
  );

  // const handleCategorySelect = (category: string) => {
  //   setSelectedCategory(category);
  // };

  // const filteredProducts = products.filter(
  //   (product) =>
  //     product.name.toLowerCase().includes(searchName.toLowerCase()) &&
  //     product.description
  //       .toLowerCase()
  //       .includes(searchDescription.toLowerCase()) &&
  //     (selectedCategory === "" || product.category === selectedCategory)
  // );
  // const filteredProducts = products.filter(
  //   (product) =>
  //     product.name.toLowerCase().includes(searchName.toLowerCase()) &&
  //     product.description
  //       .toLowerCase()
  //       .includes(searchDescription.toLowerCase()) &&
  //     (selectedCategory === "" ||
  //       selectedCategory === "All Categories" ||
  //       product.category === selectedCategory)
  // );
  // const categoryMenu = (
  //   <Menu>
  //     <Menu.Item key="">All Categories</Menu.Item>
  //     <Menu.Divider />
  //     {Array.from(new Set(products.map((product) => product.category))).map(
  //       (category) => (
  //         <Menu.Item
  //           key={category}
  //           onClick={() => handleCategorySelect(category)}
  //           style={{
  //             border: selectedCategory === category ? "1px solid red" : "none",
  //           }}
  //         >
  //           {category}
  //         </Menu.Item>
  //       )
  //     )}
  //   </Menu>
  // );

  const columns = [
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: (
        <div
          className="d-flex justify-content-end"
          style={{ marginRight: "62px" }}
        >
          Actions
        </div>
      ),
      key: "actions",

      render: (text: string, record: Product) => (
        <div className="btn-card">
          <Button
            className="add-button"
            onClick={() => navigate("/add", { state: record })}
          >
            Edit
          </Button>
          <Button className="add-button" onClick={() => onDelete(record.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="table-container container">
      <div className="search-buttons">
        <Input
          className="search-btn"
          placeholder="Search by name"
          value={searchName}
          onChange={handleNameSearch}
          style={{ marginRight: 10 }}
        />
        <Input
          className="search-btn"
          placeholder="Search by description"
          value={searchDescription}
          onChange={handleDescriptionSearch}
          style={{ marginRight: 10 }}
        />
        <Dropdown overlay={categoryMenu}>
          <Button style={{ border: "2px solid red" }}>
            {selectedCategory || "Select Category"} <DownOutlined />
          </Button>
        </Dropdown>
        <Button className="add-button" onClick={() => navigate("/add")}>
          Add Product
        </Button>
      </div>

      {/* <Table
        className="table"
        columns={columns}
        dataSource={filteredProducts}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      /> */}
      <Table
        className="table"
        columns={columns}
        dataSource={filteredProducts}
        rowKey="id"
        pagination={{
          pageSize: 7,
          showSizeChanger: false,
          showQuickJumper: false,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          onChange: (page) => {
            console.log("Current page:", page);
          },
        }}
      />

      <Modal
        title="Edit Product"
        visible={isModalVisible}
        onOk={handleEditSubmit}
        onCancel={() => setIsModalVisible(false)}
      ></Modal>
    </div>
  );
};

export default ProductList;

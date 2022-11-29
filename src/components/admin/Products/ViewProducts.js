import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productsApi from "../../../Api/productApi";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "View Products";
    const getProducts = async () => {
      try {
        const response = await productsApi.fetchProducts();
        console.log(response);
        if (response.status === 201) {
          setProducts(response.products);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  let displayProducts = "";

  if (loading) {
    return (
      <div className="container text-center">
        <h4>Loading Products...</h4>
      </div>
    );
  } else {
    let productStatus = "";

    displayProducts = products.map((item) => {
      if (item.status === 0) {
        productStatus = "Shown";
      } else if (item.status === 1) {
        productStatus = "Hidden";
      }
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.category.name}</td>
          <td>{item.name}</td>
          <td>{item.selling_price}</td>
          <td>
            <img
              src={`http://localhost:8000/${item.image}`}
              width="50px"
              alt={item.name}
            />
          </td>
          <td>
            <Link
              to={`/admin/edit-product/${item.id}`}
              className="btn btn-success btn-sm"
            >
              Edit
            </Link>
          </td>
          <td>{productStatus}</td>
        </tr>
      );
    });
  }

  return (
    <div className="card px-4 mt-3">
      <div className="card-header">
        <h4>
          View Products
          <Link to="/admin/add-product" className="btn btn-primary float-end">
            Add Product
          </Link>
        </h4>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Category Name</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{displayProducts}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewProducts;

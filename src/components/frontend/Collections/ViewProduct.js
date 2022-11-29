import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import productsApi from "../../../Api/productApi";

const ViewProduct = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const productCount = products.length;

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const response = await productsApi.getProducts(slug);
        if (isMounted) {
          if (response.status === 200) {
            setProducts(response.product_data.product);
            setCategories(response.product_data.category);
          } else if (response.status === 400) {
            swal("Warning", response.message, "");
          } else if (response.status === 404) {
            navigate("/collections");
            swal("Warning", response.message, "error");
          }
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [navigate, slug]);

  let productList = "";

  if (loading) {
    return <h4>Loading Products ...</h4>;
  } else {
    if (productCount) {
      productList = products.map((item, idx) => {
        return (
          <div className="col-md-3" key={idx}>
            <div className="card">
              <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                <img
                  src={`http://localhost:8000/${item.image}`}
                  className="w-100"
                  alt={item.name}
                />
              </Link>
              <div className="card-body">
                <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                  <h5>{item.name}</h5>
                </Link>
              </div>
            </div>
          </div>
        );
      });
    } else {
      productList = (
        <div className="col-md-12">
          <h4>No Product Available for {categories.name}</h4>
        </div>
      );
    }
  }
  return (
    <div>
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Collections / {categories.name}</h6>
        </div>
      </div>
      <div className="py-3">
        <div className="container">
          <div className="row">{productList}</div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;

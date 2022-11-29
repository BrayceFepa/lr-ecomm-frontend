import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import productsApi from "../../../Api/productApi";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { category, product } = useParams();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const response = await productsApi.viewProduct(category, product);
        if (isMounted) {
          if (response.status === 200) {
            console.log(response);
            setProducts(response.product);
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
  }, [navigate, category, product]);

  let avail_stock = "";

  if (loading) {
    return <h4>Loading Products ...</h4>;
  } else {
    avail_stock = (
      <div>
        <label className="btn-sm btn-success px-4 mt-2">In stock</label>
        <div className="row">
          <div className="col-md-3 mt-3">
            <div className="input-group">
              <button type="button" className="input-group-text">
                -
              </button>
              <input type="text" className="form-control text-center" />
              <button type="button" className="input-group-text">
                +
              </button>
            </div>
          </div>
          <div className="col-md-3 mt-3">
            <button type="button" className="btn btn-primary w-100">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    );
  }
  let productList = products.map((item, idx) => {
    return (
      <div key={idx}>
        <div className="py-3 bg-warning">
          <div className="container">
            <h6>
              Collections / {item.category.name} / {item.name}
            </h6>
          </div>
        </div>
        <div className="py-3">
          <div className="container">
            <div className="row">
              <div className="col-md-4 border-end">
                <img
                  src={`http://localhost:8000/${item.image}`}
                  alt={item.name}
                  className="w-100"
                />
              </div>

              <div className="col-md-8">
                <h4>
                  {item.name}
                  <span className="float-end badge btn-sm btn-danger badge-pill">
                    {item.brand}
                  </span>
                </h4>
                <p>{item.description}</p>
                <h4 className="mb-1">
                  Rs: {item.selling_price}
                  <s className="ms-2">{item.original_price}</s>
                </h4>
                <div>
                  {item.qty > 0 ? (
                    avail_stock
                  ) : (
                    <label className="btn-sm btn-danger px-4 mt-2">
                      Out of stock
                    </label>
                  )}
                </div>
                <button type="button" className="btn btn-danger mt-3">
                  Add to WishList
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return <>{productList}</>;
};

export default ProductDetails;

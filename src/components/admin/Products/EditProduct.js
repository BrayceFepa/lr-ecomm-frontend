import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import productsApi from "../../../Api/productApi";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [categoriesList, setCategoriesList] = useState([]);
  const [productInput, setproductInput] = useState({
    category_id: "",
    slug: "",
    name: "",
    description: "",

    meta_title: "",
    meta_keyword: "",
    meta_descrip: "",

    selling_price: "",
    original_price: "",
    qty: "",
    brand: "",
  });

  const [picture, setPicture] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allCheckbox, setCheckBoxes] = useState([]);

  const handleCheckbox = (e) => {
    e.persist();
    setCheckBoxes({ ...allCheckbox, [e.target.name]: e.target.checked });
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await productsApi.getAllCategories();
        console.log(response);
        if (response.status === 200) {
          setCategoriesList(response.categories);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();

    const editProduct = async () => {
      try {
        const response = await productsApi.fetchProductById(productId);
        if (response.status === 200) {
          //   console.log(response.product);
          setproductInput(response.product);
          setCheckBoxes(response.product);
          setLoading(false);
        } else if (response.status === 404) {
          swal("Error", response.message, "error");
          navigate("/admin/view-products");
        }
      } catch (error) {
        console.log(error);
      }
    };

    editProduct();
  }, [productId, navigate]);

  const handleInput = (e) => {
    e.persist();
    setproductInput({ ...productInput, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] });
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    console.log(picture.image);

    const formData = new FormData();

    formData.append("image", picture.image);
    formData.append("category_id", productInput.category_id);
    formData.append("slug", productInput.slug);
    formData.append("name", productInput.name);
    formData.append("description", productInput.description);

    formData.append("meta_title", productInput.meta_title);
    formData.append("meta_keyword", productInput.meta_keyword);
    formData.append("meta_descrip", productInput.meta_descrip);

    formData.append("selling_price", productInput.selling_price);
    formData.append("original_price", productInput.original_price);
    formData.append("qty", productInput.qty);
    formData.append("brand", productInput.brand);
    formData.append("featured", allCheckbox.featured ? "1" : "0");
    formData.append("popular", allCheckbox.popular ? "1" : "0");
    formData.append("status", allCheckbox.status ? "1" : "0");

    try {
      const response = await productsApi.updateProduct(formData, productId);
      console.log(response);
      if (response.status === 201) {
        swal("Success", response.message, "success");
        console.log(allCheckbox);
        setErrors([]);
      } else if (response.status === 422) {
        swal("All fields are mandetory", "", "error");
        setErrors(response.errors);
      } else if (response.status === 404) {
        swal("Error", response.message, "error");
        navigate("/admin/view-products");
      }
    } catch (error) {}
  };

  if (loading) {
    return <h4>Edit Product Data Laoding ...</h4>;
  }

  return (
    <div className="container-fluid px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4>
            Edit Product
            <Link
              to="/admin/view-products"
              className="btn btn-primary btn-sm float-end"
            >
              View Product
            </Link>
          </h4>
        </div>

        <div className="card-body">
          <form onSubmit={updateProduct} encType="multipart/form-data">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="home-tab-pane"
                  aria-selected="true"
                >
                  Home
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="seotags-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#seotags"
                  type="button"
                  role="tab"
                  aria-controls="seotags"
                  aria-selected="false"
                >
                  SEO Tags
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="otherdetails-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#otherdetails"
                  type="button"
                  role="tab"
                  aria-controls="otherdetails"
                  aria-selected="false"
                >
                  Other Details
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane card-body border fade show active"
                id="home-tab-pane"
                role="tabpanel"
                aria-labelledby="home-tab"
                tabIndex="0"
              >
                <div className="form-group mb-3">
                  <label>Select Category</label>
                  <select
                    name="category_id"
                    onChange={handleInput}
                    value={productInput.category_id}
                    className="form-control"
                  >
                    <option>Select Category</option>
                    {categoriesList.map((item) => {
                      return (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  <small className="text-danger">{errors.category_id}</small>
                </div>
                <div className="form-group mb-3">
                  <label>Slug</label>
                  <input
                    type="text"
                    name="slug"
                    onChange={handleInput}
                    value={productInput.slug}
                    className="form-control"
                  />
                  <small className="text-danger">{errors.slug}</small>
                </div>
                <div className="form-group mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleInput}
                    value={productInput.name}
                    className="form-control"
                  />
                  <small className="text-danger">{errors.name}</small>
                </div>
                <div className="form-group mb-3">
                  <label>Description</label>
                  <textarea
                    name="description"
                    onChange={handleInput}
                    value={productInput.description}
                    className="form-control"
                  ></textarea>
                </div>
              </div>
              <div
                className="tab-pane card-body border fade"
                id="seotags"
                role="tabpanel"
                aria-labelledby="seotags-tab"
                tabIndex="0"
              >
                <div className="form-group mb-3">
                  <label>Metal Title</label>
                  <input
                    type="text"
                    name="meta_title"
                    onChange={handleInput}
                    value={productInput.meta_title}
                    className="form-control"
                  />
                  <small className="text-danger">{errors.meta_title}</small>
                </div>
                <div className="form-group mb-3">
                  <label>Meta Keywords</label>
                  <textarea
                    name="meta_keyword"
                    onChange={handleInput}
                    value={productInput.meta_keyword}
                    className="form-control"
                  ></textarea>
                </div>
                <div className="form-group mb-3">
                  <label>Meta Description</label>
                  <textarea
                    name="meta_descrip"
                    onChange={handleInput}
                    value={productInput.meta_descrip}
                    className="form-control"
                  ></textarea>
                </div>
              </div>
              <div
                className="tab-pane card-body border fade"
                id="otherdetails"
                role="tabpanel"
                aria-labelledby="contact-tab"
                tabIndex="0"
              >
                <div className="row">
                  <div className="col-md-4 form-group mb-3">
                    <label>Selling Price</label>
                    <input
                      type="text"
                      name="selling_price"
                      onChange={handleInput}
                      value={productInput.selling_price}
                      className="form-control"
                    />
                    <small className="text-danger">
                      {errors.selling_price}
                    </small>
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Original Price</label>
                    <input
                      type="text"
                      name="original_price"
                      onChange={handleInput}
                      value={productInput.original_price}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Quantity</label>
                    <input
                      type="text"
                      name="qty"
                      onChange={handleInput}
                      value={productInput.qty}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Brand</label>
                    <input
                      type="text"
                      name="brand"
                      onChange={handleInput}
                      value={productInput.brand}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-8 form-group mb-3">
                    <label>Image</label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleImage}
                      className="form-control"
                    />
                    <img
                      src={`http://localhost:8000/${productInput.image}`}
                      width="50px"
                      alt={`http://localhost:8000/${productInput.image}`}
                    />
                    <small className="text-danger">{errors.image}</small>
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Featured (checked=shown)</label>
                    <input
                      type="checkbox"
                      name="featured"
                      onChange={handleCheckbox}
                      defaultChecked={allCheckbox.featured === 1 ? true : false}
                      className="w-50 h-50"
                    />
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Popular (checked=shown)</label>
                    <input
                      type="checkbox"
                      name="popular"
                      onChange={handleCheckbox}
                      defaultChecked={allCheckbox.popular === 1 ? true : false}
                      className="w-50 h-50"
                    />
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Status (checked=Hidden)</label>
                    <input
                      type="checkbox"
                      name="status"
                      onChange={handleCheckbox}
                      defaultChecked={allCheckbox.status === 1 ? true : false}
                      className="w-50 h-50"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary px-4 mt-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;

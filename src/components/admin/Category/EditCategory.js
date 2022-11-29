import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import productsApi from "../../../Api/productApi";

const EditCategory = () => {
  let { category_id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [categoryInput, setCategoryInput] = useState([]);
  const [errors, setErrors] = useState([]);

  const handleInput = (e) => {
    e.persist();
    setCategoryInput({ ...categoryInput, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await productsApi.editCategory(category_id);
        if (response.status === 200) {
          console.log(response);
          setCategoryInput(response.category);
        } else if (response.status === 404) {
          console.log(response);
          swal("Error", response.message, "error");
          navigate("/admin/view-categories");
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, [category_id]);

  const updateCategory = async (e) => {
    e.preventDefault();
    const data = categoryInput;
    try {
      const response = await productsApi.updateCategory(category_id, data);
      if (response.status === 201) {
        swal("Success", response.message, "success");
        setErrors([]);
      } else if (response.status === 422) {
        swal("All fields are mandetory", "", "error");
        setErrors(response.errors);
      } else if (response.status === 404) {
        swal("Error", response.message, "error");
        navigate("/admin/view-categories");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <h4>Loading Category ...</h4>;
  }

  return (
    <div className="container px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4>Edit Category</h4>
          <Link
            to="/admin/view-categories"
            className="btn btn-primary btn-sm float-end"
          >
            Back
          </Link>
        </div>

        <div className="card-body">
          <form className="p-3 pb-5 card-body border" onSubmit={updateCategory}>
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
                  id="seo-tags-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#seo-tags"
                  type="button"
                  role="tab"
                  aria-controls="seo-tags"
                  aria-selected="false"
                >
                  SEO Tags
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane p-3 fade show active"
                id="home-tab-pane"
                role="tabpanel"
                aria-labelledby="home-tab"
                tabIndex="0"
              >
                <div className="form-group mb-3">
                  <label>Slug</label>
                  <input
                    type="text"
                    name="slug"
                    onChange={handleInput}
                    value={categoryInput.slug}
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
                    value={categoryInput.name}
                    className="form-control"
                  />
                  <small className="text-danger">{errors.name}</small>
                </div>

                <div className="form-group mb-3">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    onChange={handleInput}
                    value={categoryInput.description}
                  ></textarea>
                </div>

                <div className="form-group mb-3">
                  <label>Status</label>
                  <input
                    type="checkbox"
                    name="status"
                    onChange={handleInput}
                    value={categoryInput.status}
                  />{" "}
                  Status 0=shown/1=hidden
                </div>
              </div>
              <div
                className="tab-pane p-3 fade"
                id="seo-tags"
                role="tabpanel"
                aria-labelledby="seo-tags-tab"
                tabIndex="0"
              >
                <div className="form-group mb-3">
                  <label>Meta Title</label>
                  <input
                    type="text"
                    name="meta_title"
                    onChange={handleInput}
                    value={categoryInput.meta_title}
                    className="form-control"
                  />
                  <small className="text-danger">{errors.meta_title}</small>
                </div>

                <div className="form-group mb-3">
                  <label>Meta Keyword</label>
                  <textarea
                    name="meta_keyword"
                    onChange={handleInput}
                    value={categoryInput.meta_keyword}
                    className="form-control"
                  ></textarea>
                </div>

                <div className="form-group mb-3">
                  <label>Meta Description</label>
                  <textarea
                    onChange={handleInput}
                    value={categoryInput.meta_description}
                    className="form-control"
                    name="meta_description"
                  ></textarea>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary px-4 float-end">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;

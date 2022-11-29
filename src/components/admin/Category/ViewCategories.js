import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import productsApi from "../../../Api/productApi";

const ViewCategories = () => {
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await productsApi.fetchCategories();
        console.log(response);
        setCategoryList(response.categories);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);

  const deleteCategory = async (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting...";

    try {
      const response = await productsApi.deleteCategory(id);
      console.log(response);
      if (response.status === 200) {
        swal("Success", response.message, "success");
        thisClicked.closest("tr").remove();
      } else if (response.status === 404) {
        swal("Error", response.message, "error");
        thisClicked.innerText = "Delete";
      }
    } catch (error) {
      console.log(error);
    }
  };

  let viewcategory_HTMLTABLE = "";

  if (loading) {
    return <h4>Loading Categories ...</h4>;
  } else {
    viewcategory_HTMLTABLE = categoryList.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.slug}</td>
          <td>{item.status}</td>
          <td>
            <Link
              to={`/admin/edit-category/${item.id}`}
              className="btn btn-success btn-sm"
            >
              Edit
            </Link>
          </td>
          <td>
            <button
              type="button"
              onClick={(e) => deleteCategory(e, item.id)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="container px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4>
            Categories List
            <Link
              to="/admin/add-category"
              className="btn btn-primary float-end"
            >
              Add Category
            </Link>
          </h4>
        </div>

        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{viewcategory_HTMLTABLE}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewCategories;

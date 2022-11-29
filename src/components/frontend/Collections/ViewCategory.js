import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productsApi from "../../../Api/productApi";

const ViewCategory = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getFrontendCategories = async () => {
      try {
        const response = await productsApi.getCategories();
        if (response.status === 200) {
          //   console.log(response.categories);
          setCategories(response.categories);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getFrontendCategories();
  }, []);
  let showCategoriesList = "";
  if (loading) {
    return <h4>Loading categories...</h4>;
  } else {
    showCategoriesList = categories.map((item) => {
      return (
        <div key={item.id} className="col-md-4">
          <div className="card">
            <Link to={`collections`}>
              <img src={``} alt={item.name} />
            </Link>
            <div className="card-body">
              <Link to={`/collections/${item.slug}`}>
                <h5>{item.name}</h5>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <div>
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Category Page</h6>
        </div>
      </div>
      <div className="py-3">
        <div className="container">
          <div className="row">{showCategoriesList}</div>
        </div>
      </div>
    </div>
  );
};

export default ViewCategory;

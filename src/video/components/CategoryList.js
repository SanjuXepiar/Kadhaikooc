import React from "react";
import { useFilterContext } from "../../context/filterContext";
import "./CategoryList.css";
function CategoryList() {
  const {
    filters: { category },
    updateFilters,
  } = useFilterContext();
  const catgryName = ["indian", "japanese", "korean", "italian"];
  return (
    <section className="category-list">
      <div className="category">
        <input
          type="radio"
          name="category"
          checked={category === "all"}
          value="all"
          onChange={updateFilters}
        />{" "}
        All
      </div>
      {catgryName.map((cat, index) => {
        return (
          <div className="category" key={index}>
            <input
              type="radio"
              name="category"
              checked={category === cat}
              value={cat}
              onChange={updateFilters}
            />{" "}
            {cat}
          </div>
        );
      })}
    </section>
  );
}

export default CategoryList;

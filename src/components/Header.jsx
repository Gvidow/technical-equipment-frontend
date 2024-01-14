import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import { FaShoppingCart } from "react-icons/fa";
import "./Header.css";

const Header = ({ breadcrumbs, showCart, showApp }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { draft_id } = useSelector((state) => state.bucket);

  const isCartActive = draft_id !== null;

  return (
    <div className="header">
      <div className="breadcrumbs-container">
        <Breadcrumbs list={breadcrumbs} />
      </div>
      {isAuthenticated && showApp && (
        <Link to="/modelings/applications" className="applications-link">
          <a className="applications-button">Заявки</a>
        </Link>
      )}
      {isAuthenticated && showCart && (
        <Link to={isCartActive ? "/modelings/cart" : "#"} className="cart-link">
          <div className={`cart-icon-container bucket-style ${isCartActive ? '' : 'inactive-cart'}`} disabled={!isCartActive}>
            <FaShoppingCart size={30} className="" />
          </div>
        </Link>
      )}
    </div>
  );
};

export default Header;

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import { FaShoppingCart } from "react-icons/fa";
import "./Header.css";

const Header = ({ breadcrumbs, showCart, showApp, showConstructor=false }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { draft_id } = useSelector((state) => state.bucket);
  const user = useSelector((state) => state.auth.user)

  const isCartActive = draft_id !== null;
  const isModerator = (user && user.role === 'moderator') ? true : false;

  return (
    <div className="header">
      <div className="breadcrumbs-container">
        <Breadcrumbs list={breadcrumbs} />
      </div>
      {isAuthenticated && showCart && (
        // <Link to={isCartActive ? "/equipment/cart" : "#"} className="cart-link">
        <Link to={isCartActive ? `/request/${draft_id}` : "#"} className="cart-link">
          <div className={`cart-icon-container bucket-style ${isCartActive ? '' : 'inactive-cart'}`} disabled={!isCartActive}>
            <FaShoppingCart size={30} className="" />
          </div>
        </Link>
      )}
      {isModerator && showConstructor && (
        <Link to={"/equipment/edit/0"} className="cart-link">
          <div className="applications-button">
            Добавить оборудование
          </div>
        </Link>
      )}
    </div>
  );
};

export default Header;

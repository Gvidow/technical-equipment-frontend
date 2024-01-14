import { Link, useLocation } from "react-router-dom";
import { FaHome, FaChevronRight } from "react-icons/fa";

import "./Breadcrumbs.css";

const Breadcrumbs = ({ list }) => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((crumb) => crumb !== "");

  const breadcrumbTexts = {
    equipment: "Оборудование",
    signup: "Регистрация",
    login: "Войти",
    cart: "Мои заявки",
    applications: "Заявки",
    detail: "Детали",
  };

  const mapTitleToURL = {
    'Оборудование': '/equipment/feed'
  }

  const isDetailView = paths.length === 3 && paths[0] === "equipment" && paths[1] === "get" && /^\d+$/.test(paths[2]);

  const breadcrumbs = list ? 
    list.map((element, index) => {
      return (
        <div className="crumb" key={element}>
          <Link to={mapTitleToURL[element] || '#'} className="breadcrumb-link">
            {element}
          </Link>
          {index < list.length - 1 && <FaChevronRight className="chevron-icon" />}
        </div>
      );
    }) : paths.map((path, index) => {
    const currentPath = `/${paths.slice(0, index + 1).join("/")}`;
    const text = isDetailView && index === paths.length - 1 ? "Подробнее" : breadcrumbTexts[path] || path;

    return (
      <div className="crumb" key={path}>
        <Link to={currentPath} className="breadcrumb-link">
          {text}
        </Link>
        {index < paths.length - 1 && <FaChevronRight className="chevron-icon" />}
      </div>
    );
  });

  return (
    <div className="breadcrumbs">
      <div className="crumb">
        <Link to="/equipment/feed" className="breadcrumb-link">
          <FaHome size={25} className="home-icon home-style" />
        </Link>
        {paths.length > 0 && <FaChevronRight className="chevron-icon firts-style" />}
      </div>
      <div className="breadcrumbs-list">{breadcrumbs}</div>
    </div>
  );
};

export default Breadcrumbs;

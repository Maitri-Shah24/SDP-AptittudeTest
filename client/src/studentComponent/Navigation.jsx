import React from "react";
import { navigationMenu } from "./NavigationMenu";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen sticky top-0 mx-auto">
      <div className="space-y-4 mt-20 ">
        {navigationMenu.map((item) => (
          <div
            className="cursor-pointer flex space-x-3 items-center"
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <p
              className="text-xl"
              style={{ color: "rgb(24, 192, 161)", transition: "color 0.3s" }}
              onMouseEnter={(e) => (e.target.style.color = "black")}
              onMouseLeave={(e) => (e.target.style.color = "rgb(24, 192, 161)")}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navigation;

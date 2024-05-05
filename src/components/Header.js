import React from "react";
import adidasLogo from "../assests/adidas-logo.jpeg";

const headerStyle = {
  backgroundColor: "black",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
  padding: "10px 20px",
};

const logoStyle = {
  height: "50px",
  marginRight: "20px",
};

const titleStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  letterSpacing: "1.2px",
};

function Header() {
  return (
    <div style={headerStyle}>
      <img src={adidasLogo} alt="Adidas Logo" style={logoStyle} />
      <h1 style={titleStyle}>Adidas Store Finder</h1>
    </div>
  );
}

export default Header;

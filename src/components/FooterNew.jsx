// FooterNew.js
import React from "react";
// import "./Footer.css";

function FooterNew() {
  return (
    <footer className="text-center py-6 text-gray-400 text-sm">
      <p>
        &copy; {new Date().getFullYear()} Olle Tengnér. All rights reserved.
      </p>
    </footer>
  );
}

export default FooterNew;

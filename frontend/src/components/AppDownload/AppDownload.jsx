import React from "react";
import "./AppDownload.css";
import appstore from "../../images/appstore.png";
import playstore from "../../images/playstore.png";

const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
      <p>
        For Better Experience Download <br /> Sushi App{" "}
      </p>
      <div className="app-download-platforms">
        <img src={appstore} alt="" />
        <img src={playstore} alt="" />
      </div>
    </div>
  );
};

export default AppDownload;

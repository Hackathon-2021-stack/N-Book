import React from "react";
import Notes from "./Notes";

export const Home = (props) => {
  const {ShowAlert}=props

  return (
    <div className="container">
      <Notes ShowAlert={ShowAlert}/>
    </div>
  );
};

import React from "react";

import Events from "./Events";
const Home = (props) => {
  const { showAlert } = props;
  return (
    <div>
      <Events showAlert={showAlert} />
    </div>
  );
};

export default Home;

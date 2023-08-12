import React from "react";

const ProgressBar = ({ threshold }) => {
  const calculateFillPercentage = (threshold) => {
    if (threshold <= 5) {
      return (threshold / 5) * 100;
    } else {
      return 100 - (threshold - 5) * 10;
    }
  };

  const fillPercentage = calculateFillPercentage(threshold);

  const divStyle = {
    height: "5px",
    width: "100%",
    borderRadius:'10px',
    background: `linear-gradient(to right, green ${
    fillPercentage
    }%, #918d8d67 ${fillPercentage}%)`,
    TransitionDelay:'3s'
  };

  console.log(fillPercentage);
  return <div className="m-auto mt-4" style={divStyle}></div>;
};

export default ProgressBar;

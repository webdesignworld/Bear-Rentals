"use client";
import  ClipLoader  from "react-spinners/Cliploader";

const override = {
  display: "block",
  margin: "100px auto",
};

const Spinner = () => {
  return (
    <ClipLoader
      color="purple"
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
};

export default Spinner;
import React, { forwardRef } from "react";
import { Slide } from "@mui/material";

//Animates the form to come from upwards direction
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export { Transition };

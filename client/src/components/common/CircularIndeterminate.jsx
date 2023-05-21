import React from "react";
import { CircularProgress } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  root: {
    display: "flex",
    float: "right",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  progress: {
    color: "black",
  },
}));

const CircularIndeterminate = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress
        className={classes.progress}
        size={"1em"}
        thickness={5}
        color="success"
      />
    </div>
  );
};

export { CircularIndeterminate };

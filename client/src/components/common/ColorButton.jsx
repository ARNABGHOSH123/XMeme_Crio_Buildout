import { withStyles } from "tss-react/mui";
import { Button, colors } from "@mui/material";

const { purple } = colors;

const ColorButton = withStyles(Button, (theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}));

export { ColorButton };

/**
 * This component displays the meta information about XMeme in a dialog.
 */
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
  IconButton,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import { Transition, ColorButton } from "../common";

const AboutUs = (props) => {
  const handleClose = () => {
    props.setAboutOpen(false);
  };
  return (
    <Dialog
      open={props.aboutOpen}
      onClose={handleClose}
      scroll={"body"}
      fullWidth
      TransitionComponent={Transition}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">
        About XMeme
        <div className="float-right">
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
          XMeme is a meme community.It allows users to create unique memes and
          edit them. Unleash,enjoy and have a laugh :).
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <ColorButton
          variant="contained"
          onClick={handleClose}
          startIcon={<ChevronLeftIcon />}
        >
          Continue
        </ColorButton>
      </DialogActions>
    </Dialog>
  );
};

export default AboutUs;

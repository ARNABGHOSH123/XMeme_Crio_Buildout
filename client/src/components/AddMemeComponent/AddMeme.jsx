/**
 * This React Component is responsible for adding a meme to the timeline.
 * If creation is success the user is scrolled to the latest meme posted with a success message.
 */
import React, { useCallback, useState } from "react";
import validator from "validator";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  Snackbar,
  DialogTitle,
  IconButton,
  DialogActions,
  DialogContent,
  Dialog,
  Button,
  TextField,
  Alert,
} from "@mui/material";
import { Transition, ColorButton, CircularIndeterminate } from "../common";
import { addMeme } from "../../queries";

const AddMeme = ({ params, open, setOpen }) => {
  //Snackbars used to display success/failure messages whenever user clicks on Create Button
  const [snackSuccessOpen, setSnackSucess] = useState(false);
  const [snackFailOpen, setSnackFail] = useState(false);
  //Contains the state of the meme object from the form dynamically on change events and used for submitting as well
  const [memePostObj, setMemePostObjState] = useState({
    name: "",
    caption: "",
    url: "",
  });
  //errors object is used to check if all the fields passes validation and displays error if not fulfilled
  const [errors, setErrorState] = useState({
    name: "*This field is required",
    caption: "*This field is required",
    url: "*This field is required",
  });
  const [isSubmitting, setSubmitting] = useState(false); //enables state when user is submitting

  //validates the add form
  const isFormValid = useCallback(() => {
    return (
      errors["name"] === "" && errors["caption"] === "" && errors["url"] === ""
    );
  }, [errors]);

  const handleClose = (_, reason) => {
    if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
      // Set 'open' to false, however you would do that with your particular code.
      setOpen(false);
    }
  };

  //call to addMeme() axios call when create button is clicked.
  const submitForm = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (isFormValid()) {
      addMeme(memePostObj)
        .then((response) => {
          if (response !== null && response !== undefined) {
            //post is successful
            //toggles the reload req prop to render the MemeList component
            params.setReloadReq(params.reloadReq === true ? false : true);
            setSubmitting(false);
            setSnackSucess(true);
            setOpen(false);
          } else {
            //otherwise it doesn't changes the list state
            params.setReloadReq(params.reloadReq);
            setSubmitting(false);
            setSnackFail(true);
          }
        })
        .catch((error) => {
          //It shows the error snackbar if POST request was failed
          setSubmitting(false);
          setSnackFail(true);
        });
    } else {
      //If user directly clicks on create and if the form is not valid
      setSubmitting(false);
      setSnackFail(true);
    }
  };
  //updates the memePostObj state object on each field change
  const handleChangeEvent = (e, field) => {
    const newMemePostObj = memePostObj;
    newMemePostObj[field] = e.target.value;
    setMemePostObjState(newMemePostObj);

    const validateName = (val) => {
      for (let i = 0; i < val.length; i++) {
        if (val[i] >= "0" && val[i] <= "9") {
          return false;
        }
      }
      return true;
    };

    const val = e.target.value.toString();

    if (field === "name" && (validator.isEmpty(val) || !validateName(val))) {
      //name validation
      errors[field] = "Invalid name";
    } else if (field === "caption" && validator.isEmpty(val)) {
      //caption validation
      errors[field] = "Invalid caption";
    } else if (field === "url" && !validator.isURL(val)) {
      //url validation
      errors[field] = "Invalid url";
    } else {
      errors[field] = "";
    }
    setErrorState(errors);
  };

  const handleSnackSuccessClose = () => {
    setSnackSucess(false);
  };

  const handleSnackFailClose = () => {
    setSnackFail(false);
  };

  return (
    <React.Fragment>
      <Snackbar
        open={snackSuccessOpen}
        autoHideDuration={4000}
        onClose={handleSnackSuccessClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <div>
          <Alert
            elevation={6}
            variant="filled"
            onClose={handleSnackSuccessClose}
            severity="success"
          >
            Your meme has been posted!!
          </Alert>
        </div>
      </Snackbar>
      <Snackbar
        open={snackFailOpen}
        autoHideDuration={2000}
        onClose={handleSnackFailClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <div>
          <Alert
            elevation={6}
            variant="filled"
            onClose={handleSnackFailClose}
            severity="error"
          >
            {isFormValid()
              ? "Invalid image or meme already exists"
              : "Invalid Meme details"}
          </Alert>
        </div>
      </Snackbar>
      <Dialog
        onClose={handleClose}
        scroll={"body"}
        aria-labelledby="simple-dialog-title"
        TransitionComponent={Transition}
        keepMounted
        open={open}
        fullWidth={true}
      >
        {/* Dialog heading  */}
        <DialogTitle id="simple-dialog-title">
          Create a meme
          <div>
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

        {/* Meme create form */}
        <DialogContent>
          <TextField
            error
            margin="dense"
            autoFocus
            key={"name"}
            label="Name"
            variant="outlined"
            helperText={errors["name"]}
            type="text"
            fullWidth
            onChange={(e) => handleChangeEvent(e, "name")}
          />
          <br />
          <br />

          <TextField
            error
            margin="dense"
            key={"caption"}
            label="Caption"
            variant="outlined"
            helperText={errors["caption"]}
            type="text"
            fullWidth
            onChange={(e) => handleChangeEvent(e, "caption")}
          />

          <br />
          <br />

          <TextField
            error
            margin="dense"
            key={"url"}
            label="URL"
            variant="outlined"
            helperText={errors["url"]}
            type="text"
            fullWidth
            onChange={(e) => handleChangeEvent(e, "url")}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="secondary">
            Close
          </Button>
          <ColorButton
            variant="contained"
            onClick={submitForm}
            startIcon={
              isSubmitting === true ? <CircularIndeterminate /> : <AddIcon />
            }
            disabled={isSubmitting}
          >
            Create
          </ColorButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddMeme;

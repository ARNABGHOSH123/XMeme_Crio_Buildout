/**
 * This React Component is responsible for editing a meme being posted ont the timeline.
 * Click on the pen icon to open edit form.
 * If update is successful, the changes can be seen on the meme card.
 */
import React, { useState } from "react";
import validator from "validator";
import {
  DialogTitle,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  IconButton,
  Alert,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { updateMeme } from "../../queries";
import { CircularIndeterminate, ColorButton, Transition } from "../common";

const EditMeme = ({ params }) => {
  //Snackbars used to display success/failure messages whenever user clicks on Save Button
  const [snackSuccessOpen, setSnackSucess] = useState(false);
  const [snackFailOpen, setSnackFail] = useState(false);
  //Contains the state of the meme object from the form dynamically on change events and used for submitting as well
  const [memePatchObj, setMemePatchObjState] = useState({
    id: params.selectedValue.id,
    name: params.selectedValue.name,
    caption: params.selectedValue.caption,
    url: params.selectedValue.url,
  });
  //errors object is used to check if all the fields passes validation and displays error if not fulfilled
  const [errors, setErrorState] = useState({
    caption: "",
    url: "",
    formValidMessage: "",
  });
  const [isSubmitting, setSubmitting] = useState(false); //enables state when user is submitting

  const handleSnackSuccessClose = () => {
    setSnackSucess(false);
  };

  const handleSnackFailClose = () => {
    setSnackFail(false);
  };

  const handleClose = (_, reason) => {
    if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
      // Set 'open' to false, however you would do that with your particular code.
      params.setOpen(false);
    }
  };

  //validated the edit form
  const isFormValid = () => {
    return errors["caption"] === "" && errors["url"] === "";
  };

  const handleChangeEvent = (e, field) => {
    const newMemePatchObj = memePatchObj;
    newMemePatchObj[field] = e.target.value;
    setMemePatchObjState(newMemePatchObj);

    const val = e.target.value.toString();
    if (field === "caption" && validator.isEmpty(val)) {
      //caption validation same as AddMeme Component
      errors[field] = "*Invalid caption";
    } else if (field === "url" && !validator.isURL(val)) {
      //url validation same as AddMeme Component
      errors[field] = "*Invalid url";
    } else {
      errors[field] = "";
    }
    setErrorState(errors);
  };

  //Calls updateMeme() axios call to edit the meme
  const submitEditForm = (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (isFormValid()) {
      updateMeme(memePatchObj.id, {
        caption: memePatchObj.caption,
        url: memePatchObj.url,
      })
        .then((status) => {
          //edit is successful
          params.setSelectedValue(memePatchObj);
          setSubmitting(false);
          params.setOpen(false);
          setSnackSucess(true);
        })
        .catch((error) => {
          //edit failure as url/caption conflicts with the already existing memes.
          errors["formValidMessage"] = "*URL or caption already exists";
          setErrorState(errors);
          //alert(errors['formValidMessage']);
          setSubmitting(false);
          setSnackFail(true);
        });
    } else {
      //If edit button was clicked without validation failure snackbar pops up.
      errors["formValidMessage"] = "*Invalid meme details";
      //alert(errors['formValidMessage']);
      setSubmitting(false);
      setSnackFail(true);
    }
  };

  return (
    <React.Fragment>
      <Snackbar
        open={snackSuccessOpen}
        autoHideDuration={2000}
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
            Meme updated!!
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
      {/* Edit Form Dialog */}
      <Dialog
        onClose={handleClose}
        scroll={"body"}
        aria-labelledby="simple-dialog-title"
        TransitionComponent={Transition}
        keepMounted
        open={params.open}
        fullWidth={true}
      >
        <DialogTitle id="simple-dialog-title">
          Edit Meme
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
          <TextField
            margin="dense"
            autoFocus
            key="name"
            label="Name"
            variant="outlined"
            type="text"
            fullWidth
            defaultValue={params.selectedValue.name}
            disabled={true}
          />
          <br />
          <br />
          <TextField
            error
            margin="dense"
            autoFocus
            key="Caption"
            label="Caption"
            variant="outlined"
            helperText={errors["caption"]}
            type="text"
            fullWidth
            onChange={(e) => handleChangeEvent(e, "caption")}
            defaultValue={params.selectedValue.caption}
          />
          <br />
          <br />
          <TextField
            error
            margin="dense"
            key="Url"
            label="URL"
            variant="outlined"
            helperText={errors["url"]}
            type="text"
            fullWidth
            onChange={(e) => handleChangeEvent(e, "url")}
            defaultValue={params.selectedValue.url}
          />
          <br />
          <br></br>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="secondary">
            Close
          </Button>
          <ColorButton
            variant="contained"
            onClick={submitEditForm}
            color="primary"
            startIcon={
              isSubmitting === true ? <CircularIndeterminate /> : <SaveIcon />
            }
            disabled={isSubmitting}
          >
            Save
          </ColorButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default EditMeme;

/**
 * This React Component is responsible for editing a meme being posted ont the timeline.
 * Click on the pen icon to open edit form.
 * If update is successful, the changes can be seen on the meme card.
 */
import React,{useState} from 'react';
import { withStyles, makeStyles} from '@material-ui/core/styles';
import validator from 'validator';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import { purple } from '@material-ui/core/colors';
import {updateMeme} from '../../queries/queries';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme)=> ({
    root: {
        display: 'flex',
        float: 'right',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    progress: {
        color: 'black',
    }
}));

function CircularIndeterminate(){
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className="row justify-content-center">
                <CircularProgress className={classes.progress} size='1em' thickness={5}/>
            </div>
        </div>
    )
}

function Alert(props){
    return <MuiAlert elevation={6} variant="filled" {...props} />
}
//Animates the form to come from upwards direction
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[500],
      '&:hover': {
        backgroundColor: purple[700],
      },
    },
  }))(Button);

function EditMeme({params}){

    //Snackbars used to display success/failure messages whenever user clicks on Save Button
    const [snackSuccessOpen,setSnackSucess] = useState(false);
    const [snackFailOpen,setSnackFail] = useState(false);
    //Contains the state of the meme object from the form dynamically on change events and used for submitting as well
    const [memePatchObj,setMemePatchObjState] = useState({id: params.selectedValue.id, name: params.selectedValue.name, caption: params.selectedValue.caption, url: params.selectedValue.url});
    //errors object is used to check if all the fields passes validation and displays error if not fulfilled
    const [errors,setErrorState] = useState({caption: '',url: '',formValidMessage: ''});
    const [isSubmitting,setSubmitting] = useState(false);//enables state when user is submitting

    function handleSnackSuccessClose(){
        setSnackSucess(false);
    }

    function handleSnackFailClose(){
        setSnackFail(false);
    }
    const handleClose = () => {
        params.setOpen(false);
    };

    //validated the edit form
    function isFormValid(){
        return (errors["caption"] === '' &&
                errors["url"] === '');
    }
    
    const handleChangeEvent= (e,field) =>{
        const newMemePatchObj = memePatchObj;
        newMemePatchObj[field] = e.target.value;
        setMemePatchObjState(newMemePatchObj);

        const val= e.target.value.toString();
        if(field==='caption' && (validator.isEmpty(val))){ //caption validation same as AddMeme Component
            errors[field] = '*Invalid caption';
        }
        else if(field==='url' && !validator.isURL(val)){ //url validation same as AddMeme Component
            errors[field]='*Invalid url';
        }
        else{
            errors[field]='';
        }
        setErrorState(errors);
    }

    //Calls updateMeme() axios call to edit the meme
    const submitEditForm = (e) => {
        e.preventDefault();
        setSubmitting(true);
        if(isFormValid()){
            updateMeme(memePatchObj.id,{caption: memePatchObj.caption,url: memePatchObj.url})
            .then((status)=>{
                //edit is successful
                params.setSelectedValue(memePatchObj);
                setSubmitting(false);
                params.setOpen(false);
                setSnackSucess(true);
            })
            .catch((error)=>{
                //edit failure as url/caption conflicts with the already existing memes.
                errors['formValidMessage']='*URL or caption already exists';
                setErrorState(errors);
                //alert(errors['formValidMessage']);
                setSubmitting(false);
                setSnackFail(true);
            })
        }
        else{
            //If edit button was clicked without validation failure snackbar pops up.
            errors['formValidMessage']='*Invalid meme details';
            //alert(errors['formValidMessage']);
            setSubmitting(false);
            setSnackFail(true);
        }
    }

    return (
        <React.Fragment>
            <Snackbar open={snackSuccessOpen} autoHideDuration={2000} onClose={handleSnackSuccessClose}>
                <Alert onClose={handleSnackSuccessClose} severity="success">
                    Meme updated!!
                </Alert>
            </Snackbar>
            <Snackbar open={snackFailOpen} autoHideDuration={2000} onClose={handleSnackFailClose}>
                <Alert onClose={handleSnackFailClose} severity="error">
                    {(isFormValid())?"Invalid image or meme already exists" : "Invalid Meme details"}
                </Alert>
            </Snackbar>
            {/* Edit Form Dialog */}
            <Dialog onClose={handleClose} scroll={'body'} disableBackdropClick aria-labelledby="simple-dialog-title" TransitionComponent={Transition} keepMounted open={params.open} fullWidth={true}>
                <DialogTitle id="simple-dialog-title">
                    Edit Meme
                    <div className="float-right">
                        <IconButton onClick={handleClose}>
                            <CloseIcon/>
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
                        disabled={true}/>
                    <br/><br/>
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
                        onChange={(e)=>handleChangeEvent(e,'caption')} 
                        defaultValue={params.selectedValue.caption}/>
                    <br/><br/>
                    <TextField 
                        error 
                        margin="dense" 
                        key="Url"
                        label="URL" 
                        variant="outlined" 
                        helperText={errors["url"]} 
                        type="text" 
                        fullWidth 
                        onChange={(e)=>handleChangeEvent(e,'url')} 
                        defaultValue={params.selectedValue.url}/>
                    <br/><br></br>
                
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={handleClose} color="secondary">
                        Close
                    </Button>
                    <ColorButton variant='contained' onClick={submitEditForm} color="primary" startIcon={(isSubmitting === true)?<CircularIndeterminate/>:<SaveIcon/>} disabled={isSubmitting}>
                        Save
                    </ColorButton>
                </DialogActions>
            </Dialog> 
        </React.Fragment>
    )
}

export default EditMeme;
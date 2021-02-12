/**
 * This React Component is responsible for adding a meme to the timeline.
 * If creation is success the user is scrolled to the latest meme posted with a success message.
 */
import React,{useState} from 'react';
import {addMeme} from '../../queries/queries';
import { withStyles,makeStyles} from '@material-ui/core/styles';
import validator from 'validator';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AddIcon from '@material-ui/icons/Add';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import { purple } from '@material-ui/core/colors';
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

function AddMeme({params,open,setOpen}){
    
    //Snackbars used to display success/failure messages whenever user clicks on Create Button
    const [snackSuccessOpen,setSnackSucess] = useState(false);
    const [snackFailOpen,setSnackFail] = useState(false);
    //Contains the state of the meme object from the form dynamically on change events and used for submitting as well
    const [memePostObj,setMemePostObjState] = useState({name: '',caption: '',url: ''});
    //errors object is used to check if all the fields passes validation and displays error if not fulfilled
    const [errors,setErrorState] = useState({name: '*This field is required',caption: '*This field is required',url: '*This field is required'});
    const [isSubmitting,setSubmitting] = useState(false);//enables state when user is submitting
    
    //validates the add form
    function isFormValid(){
        return (errors['name'] === '' && 
                errors["caption"] === '' &&
                errors["url"] === '');
    }

    const handleClose = () => {
        setOpen(false);
    };

    //call to addMeme() axios call when create button is clicked.
    async function submitForm(e) {
        e.preventDefault();
        setSubmitting(true);
        if(isFormValid()){
            addMeme(memePostObj)
            .then((response)=>{
                if(response!==null && response!==undefined){
                    //post is successful
                    //toggles the reload req prop to render the MemeList component
                    params.setReloadReq(params.reloadReq===true?false:true);
                    setSubmitting(false);
                    setSnackSucess(true);
                    setOpen(false);
                }else{
                    //otherwise it doesn't changes the list state
                    params.setReloadReq(params.reloadReq);
                    setSubmitting(false);
                    setSnackFail(true);
                }
            })
            .catch((error)=>{
                //It shows the error snackbar if POST request was failed
                setSubmitting(false);
                setSnackFail(true);
            });
        }
        else{
            //If user directly clicks on create and if the form is not valid
            setSubmitting(false);
            setSnackFail(true);
        }
    }
    //updates the memePostObj state object on each field change
    const handleChangeEvent = (e,field) => {
        const newMemePostObj = memePostObj;
        newMemePostObj[field] = e.target.value;
        setMemePostObjState(newMemePostObj);
        
        const validateName = (val) => {
            for(let i=0;i<val.length;i++){
                if(val[i]>='0' && val[i]<='9'){
                    return false;
                }
            }
            return true;
        }

        const val= e.target.value.toString();
        
        if(field==='name' && (validator.isEmpty(val) || !validateName(val))){ //name validation
            errors[field] = 'Invalid name';
        }
        else if(field==='caption' && (validator.isEmpty(val))){ //caption validation
            errors[field] = 'Invalid caption';
        }
        else if(field==='url' && !validator.isURL(val)){ //url validation
            errors[field]='Invalid url';
        }
        else{
            errors[field]='';
        }
        setErrorState(errors);
    }

    function handleSnackSuccessClose(){
        setSnackSucess(false);
    }

    function handleSnackFailClose(){
        setSnackFail(false);
    }

    return (
        <React.Fragment>
            <Snackbar open={snackSuccessOpen} autoHideDuration={4000} onClose={handleSnackSuccessClose}>
                <Alert onClose={handleSnackSuccessClose} severity="success">
                    Your meme has been posted!!
                </Alert>
            </Snackbar>
            <Snackbar open={snackFailOpen} autoHideDuration={2000} onClose={handleSnackFailClose}>
                <Alert onClose={handleSnackFailClose} severity="error">
                    {(isFormValid())?"Invalid image or meme already exists" : "Invalid Meme details"}
                </Alert>
            </Snackbar>
            <Dialog 
                onClose={handleClose}
                scroll={'body'} 
                aria-labelledby="simple-dialog-title" 
                TransitionComponent={Transition} 
                keepMounted 
                open={open}
                disableBackdropClick 
                fullWidth={true}>
                
                {/* Dialog heading  */}
                <DialogTitle id="simple-dialog-title">
                    Create a meme
                    <div className="float-right">
                        <IconButton onClick={handleClose}>
                            <CloseIcon/>
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
                        onChange={(e)=>handleChangeEvent(e,'name')}/>
                    <br/><br/>

                    <TextField 
                        error 
                        margin="dense" 
                        key={"caption"} 
                        label="Caption" 
                        variant="outlined" 
                        helperText={errors["caption"]} 
                        type="text" 
                        fullWidth 
                        onChange={(e)=>handleChangeEvent(e,'caption')}/>
                    
                    <br/><br/>
                    
                    <TextField 
                        error 
                        margin="dense" 
                        key={"url"} 
                        label="URL" 
                        variant="outlined" 
                        helperText={errors["url"]} 
                        type="text" 
                        fullWidth 
                        onChange={(e)=>handleChangeEvent(e,'url')}/>

                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={handleClose} color="secondary">
                        Close
                    </Button>
                    <ColorButton variant='contained' onClick={submitForm} startIcon={(isSubmitting === true)?<CircularIndeterminate/>:<AddIcon/>} disabled={isSubmitting}>
                        Create
                    </ColorButton>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default AddMeme;
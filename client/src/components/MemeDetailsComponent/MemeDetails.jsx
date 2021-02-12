/**
 * This React Component is responsible for rendering each Meme in a Card like structure.
 * Additional Features: A Meme can be liked or unliked by clicking on the heart button
 *                      or by double tapping the image (Mobile + Desktop).
 *                      (Note: For desktop , the image animates when it is hovered.)
 */
import React,{useState} from 'react';
import EditMeme from '../EditMemeComponent/EditMeme';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {getMemeById} from '../../queries/queries';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import "./MemeDetails.css";

const useStyles = makeStyles((theme)=> ({
    root: {
        display: 'flex',
        float: 'right',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

function CircularIndeterminate(){
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress color="secondary"/>
        </div>
    )
}

function Alert(props){
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

function MemeDetails({meme}){

    /**
     * 1) open - state variable to open or close the EditMeme Component when edit pen icon is clicked.
     * 2) selectedValue - state variable which stores the state of the meme across the EditMeme Component.(before and after edit).
     * 3) snackOpen - state variable which gives a little message when user likes a meme.
     * 4) clickTimeout - state variable to maintain the double clicks with a timeout of 2s within the first click.See code below for more information.
     */
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(meme);
    const [clickLikeBtn,setClickLikeBtn] = useState(0);
    const [snackOpen,setSnack] = useState(false);
    const [clickTimeout,setClickTimeout] = useState(null);
    const [isLoadingMemeDetailsForEdit,setIsLoadingMemeDetailsForEdit] = useState(false);

    
    const handleSnackClose = (event, reason) => { //handles the Like Snack 
        if(reason === 'clickaway') {
            return;
        }

        setSnack(false);
    }
    
    function toggleLike(){ //toggles the state of like button to like or unlike based on user action
        if(clickLikeBtn === 0){
            setSnack(true);
        }
        setClickLikeBtn(clickLikeBtn===0?1:0);
    }

    function doubleClickImgLike(){ //checks and triggers the double click upon user double tap on image
        if(clickTimeout !== null){
            if(clickLikeBtn===0){
                toggleLike();
            }
        }
        else{
            setClickTimeout(setTimeout(()=>{
                clearTimeout(clickTimeout)
                setClickTimeout(null)
            },2000)) //timeout of 2s within first click to check whether the event was a single click / double click.
        }
    }
    
    const LikeUnlikeBtn = () => {
        if(clickLikeBtn===0){
            return <FavoriteBorderIcon/>
        }
        else{
            return <FavoriteIcon color="secondary"/>
        }
    }
    //getMemeById() axios get call to fetch the meme details and place them as default on EditMeme Component fields.
    function initiateEdit(id){
       setIsLoadingMemeDetailsForEdit(true);
       getMemeById(id)
        .then((response)=>{
            setSelectedValue(response);
            setIsLoadingMemeDetailsForEdit(false);
            setOpen(true);
        })
        .catch((error)=>{
            setIsLoadingMemeDetailsForEdit(false);
            alert('Meme data not found or removed');
        });
    }
    //props for EditMeme components.
    const params ={
        open,
        setOpen,
        selectedValue,
        setSelectedValue
    };

    return (
        <React.Fragment>
            <Snackbar open={snackOpen} autoHideDuration={1000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity="success">
                    Hurray! You liked the meme!
                </Alert>
            </Snackbar>
            <React.Fragment>
                <div className="card text-left shadow center">
                    <div className="card-body text-dark">
                        {(isLoadingMemeDetailsForEdit === true)?(
                            <CircularIndeterminate/>
                        ):(
                            <IconButton 
                                className="float-right shadow"
                                style={{borderRadius: '100px'}} 
                                onClick={()=>initiateEdit(selectedValue.id)}>
                                    <EditIcon/>
                            </IconButton>
                        )}
                        <h5 className="card-title">{selectedValue.name}</h5>
                        <h6 className="card-text text-left text-secondary">{selectedValue.caption}</h6>
                    </div>
                    <div className="overflow">
                        <img src={selectedValue.url} alt="Meme not found" onClick={doubleClickImgLike} className='card-img-top img-thumbnail img-responsive'/>
                    </div>
                    <div className="card-body text-center text-dark">
                        <div className="float-left">
                            <Button onClick={toggleLike}>
                                <LikeUnlikeBtn/>
                            </Button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
            <EditMeme params={params}/>
        </React.Fragment>
    )
}

export default MemeDetails;
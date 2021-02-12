/**
 * This component displays the meta information about XMeme in a dialog.
 */
import {forwardRef} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { purple } from '@material-ui/core/colors';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import { withStyles} from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const Transition = forwardRef(function Transition(props, ref) {
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

function AboutUs(props){
    const handleClose = () => {
        props.setAboutOpen(false);
    }
    return (
        <Dialog
            open={props.aboutOpen}
            onClose={handleClose}
            scroll={'body'}
            fullWidth
            TransitionComponent={Transition} 
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description">
                <DialogTitle id="scroll-dialog-title">
                    About XMeme
                    <div className="float-right">
                        <IconButton onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                        XMeme is a meme community.It allows users to create unique memes and edit them.
                        Unleash,enjoy and have a laugh :).
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <ColorButton variant='contained' onClick={handleClose} startIcon={<ChevronLeftIcon/>}>
                        Continue
                    </ColorButton>
                </DialogActions>     
        </Dialog>
    )
    
}

export default AboutUs;
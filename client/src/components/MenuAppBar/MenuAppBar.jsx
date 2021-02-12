/**
 * This React Component is responsible for rendering the top navigation bar.
 * Features: This navbar is responsive. It has renderings for both mobile and desktop versions.
 * Clicking on XMeme icon redirects to the root url of the application.
 */
import React from 'react';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1
    },
  }));
  
  function MenuAppBar({setOpen,setAboutOpen}) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openAnchor = Boolean(anchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));//Media Query for mobile versions.
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
        setAnchorEl(null); 
    };

    const handleClickMenu = () => {
        setOpen(true);
        handleClose();
    }

    const handleAboutMenu =()=> {
        setAboutOpen(true);
        handleClose();
    }
  
    return (
      <div className={classes.root}>
        <AppBar position="fixed" style={{background: 'black'}}>
          <Toolbar>
            
            <Typography variant="h6" className={classes.title} style={{cursor:'pointer'}} onClick={()=>{window.location.reload()}}>
              XMeme
            </Typography>
              <div>
                {isMobile?
                    (
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenu}>
                        <MenuIcon />
                    </IconButton>):
                    (
                      <>
                      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleClickMenu}>
                        <Typography><AddIcon/>Create Meme</Typography>
                      </IconButton>
                      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleAboutMenu}>
                        <Typography><InfoIcon/>About XMeme</Typography>
                      </IconButton>
                    </>
                    )}
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }} 
                  open={openAnchor}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClickMenu} onClose={handleClose}><AddIcon/>Create Meme</MenuItem>
                  <MenuItem onClick={handleAboutMenu} onClose={handleClose}><InfoIcon/>About XMeme</MenuItem>
                </Menu>
              </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  export default MenuAppBar;
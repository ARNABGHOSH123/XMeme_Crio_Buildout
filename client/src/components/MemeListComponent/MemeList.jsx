/**
 * This React Component is responsible for rendering memes list fetched from XMeme Backend.
 * Each Meme is rendered by using MemeDetails component.Go to MemeDetails component for more information.
 */
import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import Footer from "../FooterComponent/Footer";
import { Transition } from "../common";
import { getAllMemes } from "../../queries";
import MemeDetails from "../MemeDetailsComponent/MemeDetails";
import "./MemeList.css";

//Loading dialog whenever the user opens the application for the first time.
const CircularProgressWithLabel = (props) => {
  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      style={{ textAlign: "center" }}
      TransitionComponent={Transition}
      keepMounted
      open={true}
    >
      <DialogTitle id="simple-dialog-title" className="float-center">
        Loading Memes...
      </DialogTitle>
      <DialogContent style={{ display: "flex", justifyContent: "center" }}>
        <Box position="relative" display="inline-flex">
          <CircularProgress
            color="secondary"
            variant="determinate"
            {...props}
          />
          <Box
            top={0}
            bottom={0}
            left={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="caption"
              component="div"
              color="textSecondary"
            >{`${Math.round(props.value)}%`}</Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const CircularStatic = () => {
  const [progress, setProgress] = useState(10);

  const setNewProgress = (prevProgress) => {
    return prevProgress >= 100 ? 100 : prevProgress + 10;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(setNewProgress);
    }, 200); //sets the progress value with each millisecond.
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <CircularProgressWithLabel value={progress} />;
};

const MemeList = ({ params }) => {
  /**
   * 1) memes - state variable to contain the latest 100(maximum) objects from backend.
   * 2) allMemesFetched - state variable to check if the api call was successful and to display the memes when it is true.
   */
  const [memes, setMemeState] = useState([]);
  const [allMemesFetched, setAllMemesFetchedState] = useState(false);

  useEffect(() => {
    getAllMemes()
      .then((response) => {
        setMemeState(response);
        setAllMemesFetchedState(true);
        window.scrollTo(0, 0);
      })
      .catch((error) => alert(error));
  }, [params.reloadReq]); //checks whether if reload is required or not on the main screen.

  //JSX when all the memes are loaded
  const MemesLoaded = () => {
    return (
      <div>
        <div className="container-fluid d-flex justify-content-center">
          <div className="row">
            {memes.map((meme) => {
              return (
                <div key={meme.id} className="col-md-12">
                  <MemeDetails meme={meme} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  //JSX when the returned list is empty.
  const NoMemesLoaded = () => {
    if (allMemesFetched === false) {
      return (
        <React.Fragment>
          <CircularStatic />
        </React.Fragment>
      );
    }
    return (
      <div className="row justify-content-center">
        <h4 style={{ marginTop: "20vh" }}>
          No memes found.Check your network connection
        </h4>
      </div>
    );
  };

  const AllMemesContent = () => {
    if (memes != null && memes !== undefined && memes.length > 0) {
      return <MemesLoaded />;
    } else {
      return <NoMemesLoaded />;
    }
  };
  return (
    <>
      <AllMemesContent />
      <Footer memesLength={memes.length} />
    </>
  );
};

export default MemeList;

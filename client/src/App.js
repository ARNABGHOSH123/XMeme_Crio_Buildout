/**
 * This is the Root Component of the Frontend.
 */
import React, { useState } from "react";
import AddMeme from "./components/AddMemeComponent/AddMeme";
import AboutUs from "./components/AboutUsComponent/AboutUs";
import MemeList from "./components/MemeListComponent/MemeList";
import MenuAppBar from "./components/MenuAppBar/MenuAppBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

const App = () => {
  //Listens for loading of memes whenever new post is made
  const [reloadReq, setReloadReq] = useState(true);
  //Listens for opening the AddMeme dialog.
  const [open, setOpen] = useState(false);
  //Meta data about XMeme
  const [aboutOpen, setAboutOpen] = useState(false);
  //props maintained across the frontend to listen for changes in the meme list.
  const params = {
    reloadReq,
    setReloadReq,
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
        <MenuAppBar setOpen={setOpen} setAboutOpen={setAboutOpen} />
        {/* Routing is only set for getting MemeList component.Kept as scope of having more routes. */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MemeList params={params} />} />
            {/* <Route exact path="/create_meme" render={(props)=> <AddMeme params={params} {...props} />} /> */}
          </Routes>
        </BrowserRouter>
        <AboutUs aboutOpen={aboutOpen} setAboutOpen={setAboutOpen} />
        <AddMeme params={params} open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default App;

/**
 * This file contains all the axios API calls to XMeme backend.
 * Root URL for the backend is in .env file in environment variable REACT_APP_BACKEND_BASE_URL.
 * Head over to XMeme Backend application to know more information.
 */
import axios from 'axios';

//API Call to backend_url/memes -> gives the latest 100 memes
let getAllMemes = async ()=>{
    return await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/memes`)
                .then((response)=>response.data);
}

//API Call to backend_url/memes -> creates a new meme.
let addMeme = async (data)=>{
    return await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/memes`,data,{
                    headers: {'Content-Type': 'application/json'}
                })
                .then((response)=>response.data);
}

//API Call to backend_url/memes/<id> -> Fetches a particular Meme object
let getMemeById = async (id)=>{
    return await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/memes/${id}`)
            .then((response)=>response.data);
}

//API Call to backend_url/memes/<id> -> Updates a specific Meme object
let updateMeme = async (id,data)=>{
    return await axios.patch(`${process.env.REACT_APP_BACKEND_BASE_URL}/memes/${id}`, data, {
                    headers: {'Content-Type': 'application/json'}
                })
                .then((response)=>response.status)
}
export {getAllMemes,getMemeById,addMeme,updateMeme};
import React,{useState} from "react";
import {handleInsertData} from '../uploadService'

const UploadPage = () =>{
    const [title, setTitle] = useState("")
    const [categories, setCategories] = useState("")
    const [posterFile, setPosterFile] = useState("")
    const [movieSnapshots, setMovieSnapshots] = useState([])
    const [imdbScore, setImdbScore] = useState("")
    const [description, setDescription] = useState("")
    const [runTime, setRunTime] = useState("")



    const handleMovieSnapshots = (event) =>{
        const files = event.target.files;      
        setMovieSnapshots(files)
    }

    const handlePosterFile = async (event) => {
        setPosterFile(event.target.files[0]);
    }

    const handleSubmit = async ()=>{
     
        handleInsertData(
            title,categories, description,imdbScore,movieSnapshots,posterFile
        )
    }

    return <div style={{display:"flex", flexDirection:"column", width: "250px", justifyContent:"space-around", height: "50vh"}} >
        <input type="text" placeholder="title" onChange={(event) => setTitle(event.target.value)} />
        <textarea placeholder="description" rows={4} onChange={(event) => setDescription(event.target.value)} style={{resize: "none"}}/>
        <input type="text" placeholder="imdb" onChange={(event) => setImdbScore(event.target.value)} />
        <input type="text" placeholder="runtime" onChange={(event) => setRunTime(event.target.value)} />

        <label> Poster image</label>
        <input type="file" accept="image/*" name="poster image" onChange={handlePosterFile}/>
        <br></br>
        <input type="text" placeholder="categories" onChange={(event) => setCategories(event.target.value)} />


        <label> Movie Snapshots</label>

         <input type="file" accept="image/*" multiple="multiple" onChange={handleMovieSnapshots}/>
           
        
         <button onClick={handleSubmit}>Upload to Firebase</button>
    </div>

}

export default UploadPage;
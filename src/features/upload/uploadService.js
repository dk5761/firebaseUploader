import {storage, fireStore} from '../utils/firebase'
import { ref as sRef, uploadBytes, getDownloadURL} from 'firebase/storage'
import {addDoc, collection, updateDoc, doc} from 'firebase/firestore'




const handleImageUpload = async (file, filePath, fileName) =>{

    if (!file) {
        alert("Please upload an image first!");
    }

    const storageRef = sRef(storage, `/${filePath}/${fileName}`);
    const task = await uploadBytes(storageRef, file)
    
    const x = await getDownloadURL(task.ref)

    return x;
}

const handleInsertData = async (title, categories, description, imdbScore, movieSnapshots, posterFile)=>{

    var x = await addDoc(collection(fireStore, "movies"), {
        title,
        categories: categories.split(","),
        imdb_score:imdbScore,
        description,
        movie_screenshots: [],
        poster_url: ""
    });


    var posterUrl = await handleImageUpload(posterFile, x.id, "poster.jpg");
    var movieSnaps = []
    
    console.log("snapshots file list:", movieSnapshots);

    for (var i = 0; i < movieSnapshots.length; i++) {
        console.log( "snapshot name",movieSnapshots[i])
        movieSnaps.push(await handleImageUpload(movieSnapshots[i], x.id, i))
    }
    console.log("Snaps ",movieSnaps);


    await updateDoc(doc(fireStore, 'movies', x.id), {
        movie_screenshots: movieSnaps,
        poster_url: posterUrl
    })

}

export {handleImageUpload, handleInsertData}
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

const handleInsertData = async (title, categories, imdbScore, description, movieSnapshots, posterFile)=>{

    var x = await addDoc(collection(fireStore, "movies"), {
        title,
        categories: categories.split(","),
        imdbScore,
        description,
        movieSnapshots: [],
        posterFile: ""
    });


    var posterUrl = await handleImageUpload(posterFile, x.id, "poster.jpg");
    var movieSnaps = []
    
    console.log(movieSnapshots);

    for (var i = 0; i < movieSnapshots.length; i++) {
        console.log(movieSnapshots[i])
        movieSnaps.push(await handleImageUpload(movieSnapshots[i], x.id, i))
    }

    await updateDoc(doc(fireStore, 'movies', x.id), {
        movieSnapshots: movieSnaps,
        posterFile: posterUrl
    })

}

export {handleImageUpload, handleInsertData}
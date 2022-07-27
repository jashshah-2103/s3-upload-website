import { useState } from 'react'
import axios from 'axios'
import './styles.css';

import './App.css'

async function postImage({image, description}) {
  const formData = new FormData();
  formData.append("image", image)
  formData.append("description", description)

  const result = await axios.post('/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
  return result.data
}


function App() {

  const [file, setFile] = useState()
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])

  const submit = async event => {
    event.preventDefault()
    const result = await postImage({image: file, description})
    setImages([result.image, ...images])
  }

  const fileSelected = event => {
    const file = event.target.files[0]
		setFile(file)
    // const [file1] = e.target.files;
    setImages(URL.createObjectURL(file));
	}

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImages(URL.createObjectURL(file));
  };

  return (
    <div className="App">

    <nav>
      <div class="topnav">
        <a class="active" href="#home">Image Verification</a>
      </div>
    </nav>

    <div id="app">
      <h2>Upload your image to S3</h2>
      <h3 style={{color: '#333'}}>Classify the images based on car present in the image or not present!</h3>

      <form onSubmit={submit}>
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <img class="displayimage" src={images} alt="" />
        <input placeholder="Write a description" value={description} onChange={e => setDescription(e.target.value)} type="text"></input>
        <button id="buttonstyle" type="submit" onClick={<h3>Image Uploaded to S3!</h3>}>Submit</button>
      </form>

      {/* { images.map( image => (
        <div key={image}>
          <img src={image}></img>
        </div>
      ))} */}

      {/* <img src="/images/9fa06d3c5da7aec7f932beb5b3e60f1d"></img> */}

      <div class="footer">
        <p>Project By - AWS Group 3: Image Verification</p>
        <p></p>
      </div>

    </div>

    </div>
  );
}

export default App;

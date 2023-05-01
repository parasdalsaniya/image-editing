import React, { useState } from 'react'
import imageUrl from "../assets/image.jpg";
import Draggable from 'react-draggable';
import "../assets/styles.css";

const EditImage2 = () => {
  const [position, setPosition] = useState({ x: 150, y: 150 });
  const [text, setText] = useState("init text");
  const [file, setFile] = useState(imageUrl);
  const [image, setImage] = useState();

  console.log('file', file)
  const sendFile = async () => {
    try {

      var formdata = new FormData();
      formdata.append("file", file);
      formdata.append("x", position.x);
      formdata.append("y", position.y);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      fetch("http://localhost:4000/image-text", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

      // const formData = new FormData();
      // formData.append("file", file)
      // formData.append("position", position)
      // const result = await fetch('http://localhost:4000/image-text', {
      //   method: "POST",
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   },
      //   body: formData
      // })
      // console.log('result', result);
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleOnChange = (e) => {
    setFile(e.target.files[0])
    setImage(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <>
      <h1>
        EditImage2
      </h1>
      <input type='text' value={text} onChange={(e) => setText(e.target.value)} />
      <input type='file' onChange={handleOnChange} />
      <button onClick={sendFile}>SUBMIT</button>
      <main>
        <img src={image || imageUrl} alt='' />
        <p className='p'>{text}</p>
        <Draggable
          position={position}
          onDrag={(e, { x, y }) => setPosition({ x, y })}
        >
          <h2>{text}</h2>
        </Draggable>
      </main>
    </>
  )
}

export default EditImage2
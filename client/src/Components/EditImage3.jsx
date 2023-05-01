import React, { useEffect, useRef, useState } from 'react'
import imageUrl from "../assets/image.jpg";
import Draggable from 'react-draggable';
import "../assets/styles.css";



function DraggableText({ image, text }) {
  const imgRef = useRef(null);
  const pRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const imgRect = imgRef.current.getBoundingClientRect();
    const pRect = pRef.current.getBoundingClientRect();

    const newX = e.clientX - imgRect.left - pRect.width / 2;
    const newY = e.clientY - imgRect.top - pRect.height / 2;

    setPos({ x: newX, y: newY });
  };

  const handleMouseUp = (e) => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className='image3-img-div'>
      <img src={image} ref={imgRef} alt='' />
      <p
        className='p'
        ref={pRef}
        style={{ position: 'absolute', left: pos.x, top: pos.y }}
        onMouseDown={handleMouseDown}
      >
        {text}
      </p>
    </div>
  );
}








const EditImage3 = () => {
  const [position, setPosition] = useState({ x: 150, y: 150 });
  const [text, setText] = useState("init text");
  const [file, setFile] = useState(imageUrl);
  const [image, setImage] = useState();


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

  const imgRef = useRef(null);
  const pRef = useRef(null);

  useEffect(() => {
    const imgElement = imgRef.current;
    const pElement = pRef.current;
    if (imgElement && pElement) {
      const imgRect = imgElement.getBoundingClientRect();
      const pRect = pElement.getBoundingClientRect();
      const x = pRect.left - imgRect.left;
      const y = pRect.top - imgRect.top;
      console.log(`x: ${x}, y: ${y}`);
    }
  }, []);


  return (
    <>
      <h1>
        EditImage3
      </h1>
      <input type='text' value={text} onChange={(e) => setText(e.target.value)} />
      <input type='file' onChange={handleOnChange} style={{ margin: "2rem" }} />
      <button onClick={sendFile}>SUBMIT</button>
      {/* <main className='image3-main'>
        <div className='image3-img-div'>
            <img src={imageUrl}  alt=''  />
            <p ref={imgRef}>sjdnasfksmkfmdksmfksdfkmsdf</p>
        </div>
      </main> */}
      {/* <main>
        <img src={image || imageUrl} alt='' />
        <p className='p'  ref={pRef}>{text}</p>
        <Draggable
          position={position}
          onDrag={(e, { x, y }) => {
            console.log('{x,y}', {x,y})
            setPosition({ x, y })
          }}
        >
          <h2 ref={imgRef}>{text}</h2>
        </Draggable>
      </main> */}
      <DraggableText image={image || imageUrl} text={text}/>
    </>
  )
}

export default EditImage3
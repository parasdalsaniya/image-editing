import React, { useEffect, useRef, useState } from "react";
import "../assets/styles4.css";
import imageUrl from "../assets/image.jpg";

const EditImage4 = () => {
    const [position, setPosition] = useState({ x: 150, y: 150 });
    const [text, setText] = useState("init text");
    const [file, setFile] = useState(imageUrl);
    const [image, setImage] = useState();

    const imgRef = useRef();
    const pRef = useRef();

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
        setImage(URL.createObjectURL(e.target.files[0]));
    };

    const sendFile = async () => {
        try {
            var formdata = new FormData();
            formdata.append("file", file);
            formdata.append("x", position.x);
            formdata.append("y", position.y);
            var requestOptions = {
                method: "POST",
                body: formdata,
                redirect: "follow",
            };
            const result = await fetch(
                "http://localhost:4000/image-text",
                requestOptions
            );
            const resultJson = await result.text();
            console.log("resultJson", resultJson);
        } catch (error) {
            console.log("sendFile error", error);
        }
    };

    useEffect(() => {
        if (position.x == 0 || position == 1)
        alert("sdksmkdmksmdm")
      console.log('position....................', position);
    }, [position])
    

    const getCordinates = () => {
        try {
            let element = document.getElementById("element");
            var rect = element.getBoundingClientRect();
            console.log(rect.top, rect.right, rect.bottom, rect.left);
        } catch (error) {
            console.log("getCordinates error", error);
        }
    };

    const handleMouseDown = (e) => {
        console.log("handleMouseDown called");
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      };
    
      const handleMouseMove = (e) => {
        console.log('handleMouseMove called')
        const imgRect = imgRef.current.getBoundingClientRect();
        const pRect = pRef.current.getBoundingClientRect();
    
        const newX = e.clientX - imgRect.left - pRect.width / 2;
        const newY = e.clientY - imgRect.top - pRect.height / 2;
    
        setPosition({ x: newX, y: newY });
      };
    
      const handleMouseUp = (e) => {
        console.log("handleMouseUp called");
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };


    return (
        <div className="container">
            <section1>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <input
                    type="file"
                    onChange={handleOnChange}
                    style={{ margin: "2rem" }}
                />
                <button onClick={sendFile}>SUBMIT</button>
                <button onClick={getCordinates}>Get Test</button>
            </section1>
            <section2>
                <div className="image4-img-div" id="image4-img-div">
                    <img src={imageUrl} ref={imgRef} alt="" />
                    <p
                        ref={pRef}
                        style={{
                            position: "absolute",
                            left: position.x,
                            top: position.y,
                        }}
                        onMouseDown={handleMouseDown}
                    >
                        HELOOO THIS IS DEMO TEXT
                    </p>
                </div>
            </section2>
        </div>
    );
};

export default EditImage4;

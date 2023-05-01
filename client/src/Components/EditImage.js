import React, { useEffect, useRef, useState } from 'react'

const EditImage = () => {

    const canvasRef = useRef(null);
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(text, 50, 50);
        if (image) {
            ctx.drawImage(image, 0, 0);
        }
    }, [text, image]);

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.onload = () => {
                setImage(img);
            };
            img.src = reader.result;
            img.width = "100%";
            img.height = "100%";

        };
        reader.readAsDataURL(file);
    };

    const handleSave = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.download = 'image.png';
        link.href = canvas.toDataURL();
        link.click();
    };

    return (
        <>
            <div>EditImage</div>
            <div>
                <canvas ref={canvasRef}  style={{ border: "1px solid black", }}/>
                <input type="text" value={text} onChange={handleTextChange} />
                <input type="file" onChange={handleImageChange} />
                <button onClick={handleSave}>Save Image</button>
            </div>
        </>
    )
}

export default EditImage
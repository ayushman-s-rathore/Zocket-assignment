import { CiImageOn } from "react-icons/ci";

import Canvas from "../Canvas/canvas";
import { useState } from "react";




const Editor = () => {
  const [color,setColor] = useState("#0369A1")
  const [content, setContent] = useState("")
  const [ctaText, setCtaText] = useState("")
  const [imgSrc, setImgSrc] = useState("")
  const [pickedColors, setPickedColors] = useState(["#0369A1"])
  
  console.log(pickedColors)
  const handleCtaChange = (event) => {
    const text = event.target.value
    setCtaText(text)
  }
  const handleAdContentChange = (event) => {
    const text = event.target.value
    setContent(text)
  }
  const handleImageChange = (event) =>{
    const url = URL.createObjectURL(event.target.files[0])
    setImgSrc(url)
  }

  const handleColorChange = (event) => {
    const selectedColor = event.target.value;
    setColor(selectedColor)
    setPickedColors((prev)=>[...prev, selectedColor])
  };
  return (
    <>
      <div className="flex flex-row">
        <Canvas content={content} color={color} img={imgSrc} ctaText={ctaText} />
        <div className="flex flex-col items-center w-3/4 h-screen justify-center">
          <p className="font-bold text-xl">Ad customization</p>
          <p className="text-xs text-gray-500">
            Customise your ad and get the templates accordingly
          </p>
          <div className="border flex flex-row items-center w-4/5 h-10 rounded-lg p-2 mt-6">
            <CiImageOn className="h-8 w-8" />
            <p className="text-sm text-gray-400 ml-2">
              Change the ad creative image.
            </p>
            <label
              htmlFor="file-input"
              className="text-sm ml-1 text-blue-600 underline hover:cursor-pointer"
            >
              <a>select file</a>
            </label>
            <input
              id="file-input"
              type="file"
              style={{ display: "none" }}
              onChange={handleImageChange}
            ></input>
          </div>
          <div className="flex flex-row w-4/5 items-center justify-center mt-4">
            <div className="border h-0 w-80 mr-2" />
            <p className="text-sm text-gray-400">Edit contents</p>
            <div className="border h-0 w-80 ml-2"></div>
          </div>
          <div className="flex flex-col border rounded-xl w-4/5 my-2 p-2 px-4">
            <p className="text-xs text-gray-400">Ad Content</p>
            <input
              type="text"
              className="border-none focus:border-none focus:outline-none"
              onChange={handleAdContentChange}
            ></input>
          </div>
          <div className="flex flex-col border rounded-xl w-4/5 my-2 p-2 px-4">
            <p className="text-xs text-gray-400">CTA</p>
            <input
              type="text"
              className="border-none focus:border-none focus:outline-none"
              onChange={handleCtaChange}
            ></input>
          </div>
          <div className="flex flex-col w-4/5">
            <p className="text-sm text-gray-400">Choose your color</p>
            <div className="flex flex-row">
              {
                pickedColors.slice(-5).map((item,index)=>(
                  <div
                  key={index}
                  className="h-8 w-8 rounded-full m-1"
                  onClick={()=>setColor(item)}
                  style={{                  
                    backgroundColor: item
                  }}/>
                ))
              }
              <input type="color"
              value={color} 
              onChange={handleColorChange}></input>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Editor;

import { useEffect, useRef } from "react";


const Canvas = ({ ...props }) => {

  const canvasRef = useRef(null);
  const templateData = {
    caption: {
      text: props.content || "1 & 2 BHK Luxury Apartments at just Rs.34.97 Lakhs",
      position: { x: 50, y: 100 },
      max_characters_per_line: 31,
      font_size: 44,
      alignment: "left",
      text_color: "#FFFFFF",
    },
    cta: {
      text: props.ctaText || "Shop Now",
      position: { x: 190, y: 320 },
      font_size: 30,
      text_color: "#FFFFFF",
      background_color: "#000000",
      wrap_length: 200,
    },
    image_mask: {
      x: 56,
      y: 442,
      width: 970,
      height: 600,
    },
    urls: {
      mask: "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_mask.png",
      stroke:
        "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Mask_stroke.png",
      design_pattern:
        "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Design_Pattern.png",
    },
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = props.color;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const patternImg = new Image();
    patternImg.src = templateData.urls.design_pattern;
    patternImg.onload = () => {
      const pattern = ctx.createPattern(patternImg, "repeat");
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    const maskImg = new Image();
    maskImg.src = templateData.urls.mask;
    maskImg.onload = () => {
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(
        maskImg,
        0,
        0,
        ctx.canvas.width,
        ctx.canvas.height
      );
      const pic = new Image()
      pic.src= props.img
      pic.onload=()=>{
        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(pic, templateData.image_mask.x,templateData.image_mask.y,templateData.image_mask.width,templateData.image_mask.height)
      }
      const strokeImg = new Image();
      strokeImg.src = templateData.urls.stroke ;
      
      strokeImg.onload = () => {
        ctx.drawImage(
          strokeImg,
          0,
        0,
        ctx.canvas.width,
        ctx.canvas.height
        );

        ctx.fillStyle = templateData.caption.text_color;
        ctx.font = `${templateData.caption.font_size}px Arial`;
        ctx.textAlign = templateData.caption.alignment;
        drawTextWithWrap(ctx, templateData.caption.text, templateData.caption.position.x, templateData.caption.position.y, templateData.caption.max_characters_per_line, templateData.caption.font_size+10);

        // Draw CTA
        ctx.fillStyle = templateData.cta.background_color;
        ctx.beginPath()
        ctx.roundRect(templateData.cta.position.x-99, templateData.cta.position.y-55, templateData.cta.text.length+200, templateData.caption.font_size + 48, 10);
        ctx.fill()
        
        ctx.fillStyle = templateData.cta.text_color;
        ctx.font = `${templateData.cta.font_size}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(templateData.cta.text, templateData.cta.position.x, templateData.cta.position.y,templateData.cta.wrap_length);
        
      };
    };
    }, [props.content,props.ctaText, props.color, props.img]);

    const drawTextWithWrap = (ctx, text, x, y, maxWidth, lineHeight) => {
      const texts= text.split(" ")
      let curr_pos=texts[0].length
      let content=texts[0]
      let line=0;
      for(let i=1;i<texts.length;i++){
        if(curr_pos+texts[i].length+1<=maxWidth){
          content+=" "+texts[i]
          curr_pos+=texts[i].length+1
        }else{
          ctx.fillText(content,x,y+(lineHeight*line))
          line+=1
          content=texts[i]
          curr_pos=texts[i].length
        }
      }
      if(content) ctx.fillText(content,x,y+(lineHeight*line))
      
    };

    return (
    <>
      <div className="flex items-center w-2/4 h-screen justify-center bg-zinc-300">
        <canvas
          ref={canvasRef}
          height="1080"
          width="1080"
          style={{ height: 400, width: 400, backgroundColor: "white" }}
        ></canvas>
      </div>
    </>
  );
};

export default Canvas;

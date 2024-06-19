import { Dialog } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";

const SignDialog: React.FC<any> = ({
  signDialog,
  handlerClose,
  addSignImg,
}) => {
  const [text, setText] = useState("");
  const canvasRefs = useRef<any[]>([]);

  const styles = [
    { font: "30px Arial" },
    { font: "30px Verdana" },
    { font: "30px Georgia" },
    { font: "30px Courier New" },
    { font: "30px Impact" },
  ];

  useEffect(() => {
    if (!signDialog) return;

    canvasRefs.current.forEach((canvas, index) => {
      const ctx = canvas.getContext("2d");
      const style = styles[index];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = style.font;
      const textWidth = ctx.measureText(text).width;
      const textHeight = parseInt(style.font, 10);
      const yPosition = canvas.height / 2 + textHeight / 2;
      ctx.fillText(text, (canvas.width - textWidth) / 2, yPosition);
    });
  }, [text, signDialog]);

  const onChangeName = (e: any) => {
    setText(e.target.value);
  };

  const handleCanvasClick = (index: number) => {
    const canvas = canvasRefs.current[index];
    const image = canvas.toDataURL();
    addSignImg(image);
    handlerClose();
  };

  return (
    <Dialog
      open={signDialog}
      handler={handlerClose}
      className="min-w-max w-[800px] md:w-[600px]"
    >
      <div className="p-[20px]">
        <div className="m-auto h-[auto] w-[auto] border-dashed border mb-2 border-dark-gray rounded-lg">
          <input
            type="text"
            className="w-full mb-4"
            placeholder="Name"
            onChange={onChangeName}
          />
          <div className="grid grid-cols-1 gap-4">
            {styles.map((style, index) => (
              <canvas
                key={index}
                ref={(el) => (canvasRefs.current[index] = el)}
                width={500}
                height={60}
                onClick={() => handleCanvasClick(index)}
                style={{
                  border: "1px solid black",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button
            className="h-[60px] w-[180px] bg-white text-secondary hover:text-primary rounded-full shadow-[0_4px_4px_#eeede8]"
            onClick={handlerClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default SignDialog;

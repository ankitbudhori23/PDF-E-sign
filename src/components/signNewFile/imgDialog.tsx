import { Dialog } from "@material-tailwind/react";
import React, { useRef, useState } from "react";

const Img: React.FC<any> = ({ signDialog, handlerClose, addSignImg }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const canvasRef = useRef<any>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string;
        setUploadedImage(imageDataUrl);
      };
      reader.readAsDataURL(event.target.files[0]);
      drawCanvas();
    }
  };

  const drawCanvas = () => {
    if (!canvasRef.current || !uploadedImage) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = uploadedImage;

    img.onload = () => {
      const scale = Math.min(
        canvasRef.current.width / img.width,
        canvasRef.current.height / img.height
      );
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;

      const x = (canvasRef.current.width - scaledWidth) / 2;
      const y = (canvasRef.current.height - scaledHeight) / 2;

      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
    };
  };

  const handleOk = () => {
    if (canvasRef.current) {
      const image = canvasRef.current.toDataURL();
      addSignImg(image);
    }
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
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-4"
          />
          <canvas ref={canvasRef} width={500} height={200} />
        </div>
        <div className="flex justify-between items-center">
          <button
            className="h-[60px] w-[180px] bg-white text-secondary hover:text-primary rounded-full shadow-[0_4px_4px_#eeede8]"
            onClick={handlerClose}
          >
            Cancel
          </button>
          <button
            className="h-[60px] w-[180px] bg-white text-secondary hover:text-primary rounded-full shadow-[0_4px_4px_#eeede8]"
            onClick={handleOk}
          >
            OK
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default Img;

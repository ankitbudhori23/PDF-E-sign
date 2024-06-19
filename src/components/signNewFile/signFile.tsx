import React, { useEffect, useMemo, useRef, useState } from "react";
import SideBar from "@/components/signNewFile/sideBar";
import { useAtom } from "jotai";
import { fabric } from "fabric";
import { signAtom } from "../../data";
import { jsPDF } from "jspdf";

const SignFile: React.FC<any> = ({ file, fileName, resetFlow }) => {
  const [signData, setSignData] = useAtom(signAtom);
  const pdfScreenHeight = `${window.innerHeight - 160}px`;
  const selectSign = (item: any) => {
    setSignData(item);
  };

  const canvasRef = useRef<any>(null);
  const [canvas, setCanvas] = useState<any>(null);

  useEffect(() => {
    const c = new fabric.Canvas(canvasRef.current);
    setCanvas(c);
  }, []);

  useEffect(() => {
    if (!canvas) return;
    showPDF(file);
  }, [canvas]);

  useEffect(() => {
    if (canvas && signData) {
      fabric.Image.fromURL(signData, (image: any) => {
        image.top = 400;
        image.scaleX = 0.5;
        image.scaleY = 0.5;
        canvas.add(image);
      });
    }
  }, [signData]);

  const showPDF = async (file: any) => {
    canvas.requestRenderAll();
    canvas.setWidth(file.width / window.devicePixelRatio);
    canvas.setHeight(file.height / window.devicePixelRatio);
    canvas.setBackgroundImage(file, canvas.renderAll.bind(canvas));
  };

  const onDownLoad = () => {
    const pdf = new jsPDF();
    const image = canvas.toDataURL("image/png");

    const width = pdf.internal.pageSize.width;
    const height = pdf.internal.pageSize.height;
    pdf.addImage(image, "png", 0, 0, width, height);

    pdf.save(`${fileName}`);
  };

  const step = useMemo(() => (signData ? 3 : 2), [signData]);

  return (
    <div className="h-full w-full grid grid-rows-[1fr_auto]">
      <div className="bg-mid-gray">
        <div className="h-full grid grid-cols-[400px_1fr] tracking-normal">
          <SideBar
            fileName={fileName}
            file={file}
            selectSign={(e: any) => selectSign(e)}
          />
          <div
            className="flex justify-center overflow-y-auto py-9 text-center"
            style={{ height: pdfScreenHeight }}
          >
            <canvas id="canvas" ref={canvasRef} />
          </div>
        </div>
      </div>
      <button onClick={onDownLoad}>download</button>
    </div>
  );
};
export default SignFile;

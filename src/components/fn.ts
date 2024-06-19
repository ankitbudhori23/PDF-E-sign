import { pdfjs } from "react-pdf";
import { fabric } from "fabric";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const printPDF = async (pdfData: any) => {
  const Base64Prefix = "data:application/pdf;base64,";
  pdfData = await readBlob(pdfData);

  const data = atob(pdfData.substring(Base64Prefix.length));

  const pdfDoc = await pdfjs.getDocument({ data }).promise;
  const pdfPage = await pdfDoc.getPage(1);

  const viewport = pdfPage.getViewport({ scale: window.devicePixelRatio });
  const _canvas = document.createElement("canvas");
  const context = _canvas.getContext("2d");

  _canvas.height = viewport.height;
  _canvas.width = viewport.width;

  const renderContext = {
    canvasContext: context,
    viewport,
  };
  const renderTask = pdfPage.render(renderContext);
  return renderTask.promise.then(() => _canvas);
};

const readBlob = (blob: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", reject);
    reader.readAsDataURL(blob);
  });
};
async function pdfToImage(pdfData: any) {
  const scale = 1 / window.devicePixelRatio;

  return new fabric.Image(pdfData, {
    id: "renderPDF",
    scaleX: scale,
    scaleY: scale,
  });
}
export { pdfToImage, printPDF };
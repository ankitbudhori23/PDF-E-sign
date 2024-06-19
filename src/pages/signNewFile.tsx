import React, { useState } from "react";
import FileChoose from "../components/signNewFile/fileChoose";
import SignFile from "../components/signNewFile/signFile";
import { pdfToImage, printPDF } from "@/components/fn";

const SignNewFile: React.FC = () => {
  const [selectFile, setSelectFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<String | "">("");
  const [step, setStep] = useState<Number>(0);

  const getNewFile = async (file: File) => {
    setFileName(file.name);
    const pdfImage = await pdfToImg(file);
    setSelectFile(pdfImage);
    setStep(1);
  };

  const pdfToImg = async (selectFile: File) => {
    const pdfData = await printPDF(selectFile);
    return await pdfToImage(pdfData);
  };

  const resetFlow = () => {
    setStep(0);
  };

  return (
    <>
      {step === 0 && <FileChoose openFile={getNewFile} />}

      {step === 1 && (
        <SignFile
          file={selectFile}
          fileName={fileName}
          resetFlow={resetFlow}
        ></SignFile>
      )}
    </>
  );
};
export default SignNewFile;

import { FileUploader } from "react-drag-drop-files";

const FileChoose: React.FC<any> = ({ openFile }) => {
  return (
    <FileUploader
      types={["PDF"]}
      name="file"
      multiple={false}
      handleChange={(e: File) => openFile(e)}
      disabled={false}
    ></FileUploader>
  );
};
export default FileChoose;

import React, { useEffect, useState } from "react";
import SignDialog from "@/components/signNewFile/signDialog";
import IconPen from "@/assets/icons/pen.png";
import IconImage from "@/assets/icons/impge.png";
import IconDel from "@/assets/icons/del.png";

const SideBar: React.FC<any> = ({ file, fileName, selectSign }) => {
  const [signDialog, setSignDialog] = useState<boolean>(false);
  const [src, setSrc] = useState<any>([]);

  const addSign = () => {
    setSignDialog(true);
  };

  const handlerClose = () => setSignDialog((e) => !e);

  const addSignImg = (image: any) => {
    setSrc((arr: []) => [...arr, image]);
    handlerClose();
  };

  const cooseSign = (item: any) => {
    selectSign(item);
  };

  const delSign = (idx: number) => {
    const _arr = [...src];
    _arr.splice(idx, 1);
    setSrc(_arr);
  };

  return (
    <>
      <div className="w-[400px] md:flex lg:flex flex-col bg-white pt-[25px]">
        <div className="px-9 mb-6">
          <p className="text-left">{fileName}</p>
        </div>
        <span className="border-mid-gray border-solid border-t"></span>
        <div className=" mt-6 px-9 tracking-normal flex flex-col gap-4">
          {src.map((item: any, idx: number) => {
            return (
              <div
                key={idx}
                className="grid grid-cols-[1fr_auto] items-center px-1 border border-dashed"
              >
                <img
                  src={item}
                  className="h-[60px] m-auto"
                  onClick={() => cooseSign(item)}
                />
                <img
                  src={IconDel}
                  className="hover:cursor-pointer"
                  width="24"
                  height="24"
                  onClick={() => delSign(idx)}
                />
              </div>
            );
          })}
          <div
            className="flex items-center justify-center py-[18px] border border-dashed hover:cursor-pointer"
            onClick={addSign}
          >
            Add sign
            <img src={IconPen} width="24" height="24" />
          </div>
        </div>
      </div>
      <SignDialog
        signDialog={signDialog}
        handlerClose={handlerClose}
        addSignImg={(e: any) => addSignImg(e)}
      />
    </>
  );
};

export default SideBar;

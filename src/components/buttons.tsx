import React from "react";
interface btnProps {
  text: string;
  isDisabled: boolean;
  action: any;
}

const BiggestButton: React.FC<btnProps> = (props) => {
  return (
    <>
      <button
        className="
          w-full h-full
          bg-light-main text-dark
          tracking-[1em]
          text-center
          indent-4
          hover:bg-primary hover:text-white hover:cursor-pointer
          disabled:bg-[#fafafa] disabled:text-[#e5e5e3] disabled:hover:cursor-not-allowed
          shadow-[0_4px_4px_rgba(0,0,0,0.25)]
          xs:text-sm
          sm:text-sm
        "
        disabled={props.isDisabled}
        onClick={() => props.action()}
      >
        {props.text}
      </button>
    </>
  );
};

const TextButton: React.FC<btnProps> = (props) => {
  return (
    <>
      <button
        className="
          text-base
          text-center
          w-full h-full
          text-secondary
          hover:text-primary
          active:text-primary
          focus:text-primary
          disabled:text-[#e2e1dd]
        "
        disabled={props.isDisabled}
        onClick={() => props.action()}
      >
        {props.text}
      </button>
    </>
  );
};

const ConfirmButton: React.FC<btnProps> = (props) => {
  return (
    <>
      <button
        className="
          text-xl
          sm:text-base
          xs:text-xs
          text-center
          w-full h-full
          text-white
          px-11
          sm:px-7
          xs:px-3
          bg-secondary
          hover:bg-primary
          disabled:bg-mid-gray
          rounded-full
          shadow-[0_4px_4px_#eeede8]
        "
        disabled={props.isDisabled}
        onClick={() => props.action()}
      >
        {props.text}
      </button>
    </>
  );
};

const CancelButton: React.FC<btnProps> = (props) => {
  return (
    <>
      <button
        className="
          text-xl
          sm:text-base
          xs:text-xs
          text-center
          w-full h-full
          bg-white
          text-secondary
          px-11
          sm:px-7
          xs:px-3
          hover:text-primary
          rounded-full
          shadow-[0_4px_4px_#eeede8]
        "
        disabled={props.isDisabled}
        onClick={() => props.action()}
      >
        {props.text}
      </button>
    </>
  );
};
export { BiggestButton, TextButton, ConfirmButton, CancelButton };

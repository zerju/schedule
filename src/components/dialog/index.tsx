import React, { ReactNode, useEffect } from 'react';
import Button, { IButtonProps } from '../button';

export interface IDialogProps {
  open: boolean;
  content: ReactNode;
  actionButtons: IButtonProps[];
  headerText: string;
  onClose: () => void;
}

const Dialog = (props: IDialogProps) => {
  const { open, content, actionButtons, headerText, onClose } = props;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  return (
    <div
      className={`bg-gray-600 bg-opacity-75 z-50 fixed top-0 bottom-0 pin w-full h-full overflow-hidden inset-0 content-center ${
        open ? '' : 'hidden'
      }`}
    >
      <div className="top-50 transform -translate-y-1/2 border-box overflow-auto md:w-auto md:h-auto flex relative p-8 pl-4 pt-2 flex-col md:min-w-1/4 max-w-full w-full h-full max-h-1/2 md:max-h-1/2 md:min-h-1/4 md:max-w-xl bg-white shadow-md m-auto">
        <div className="flex border-b -ml-8 -mr-8 pb-2 pl-8 pt-1">
          <h1 className="uppercase">{headerText}</h1>
          <Button onClick={onClose} type="circle" additionalClasses="ml-auto mr-0">
            X
          </Button>
        </div>
        <div>{content}</div>
        <div className="absolute bottom-0 w-full flex border-t -ml-4 pb-2 pl-4 pr-2 pt-2">
          {actionButtons.map((button: IButtonProps, i: number) => (
            <div key={i} className="flex">
              <Button {...button}>{button.children}</Button>
            </div>
          ))}
          <Button onClick={onClose} color="white" additionalClasses="ml-auto mr-2">
            cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;

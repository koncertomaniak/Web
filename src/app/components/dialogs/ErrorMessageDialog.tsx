import styles from "./ErrorMessageDialog.module.sass";
import React, { MouseEventHandler } from "react";
import Button from "@/app/components/buttons/Button";
import NetworkErrorCodes from "@/app/resources/errorCodes.json";

interface ErrorMessageDialogProps {
  errorCode: string;
  refreshHandler: MouseEventHandler<HTMLButtonElement> | undefined;
}

const ErrorMessageDialog: React.FC<ErrorMessageDialogProps> = ({
  errorCode,
  refreshHandler,
}) => {
  const translateErrorCode = (): string => {
    console.log(errorCode);
    if (errorCode !== errorCode.toUpperCase()) return errorCode;

    const errorCodeTranslation = NetworkErrorCodes.find(
      (t) => t.code === errorCode
    );

    if (errorCodeTranslation == undefined) return "Couldn't connect to server";

    return errorCodeTranslation!.message;
  };

  return (
    <div className={styles.errorDialogContainer}>
      <section>{translateErrorCode()}</section>
      <Button label="Refresh data" clickHandler={refreshHandler} />
    </div>
  );
};

export default ErrorMessageDialog;

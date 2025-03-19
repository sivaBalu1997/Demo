import React from "react";
import ReportNotFound from "../ReportsNotFound";
import ErrorState from "../errorstatecomponents/ErrorState";

interface ErrorHandlerProps {
  children: React.ReactNode;
  errorType?:
    | ""
    | "checkinNotFound"
    | "error"
    | "salesNotFound"
    | "noContent"
    | "reportNotFound"
    |"customerNotFound";
  isError?: boolean;
  data: any;
  isLoading?: boolean;
}
const ErrorHandler = ({
  children,
  isError = false,
  data,
  errorType = "",
  isLoading = false,
}: ErrorHandlerProps) => {
  if (isError) {
    return <ReportNotFound errorType={"error"} />;
  } else if (isLoading) {
    return <>{children}</>;
  } else if (data?.status === "204") {
    return <ReportNotFound errorType={"noContent"} />;
  } else if (Array.isArray(data) && data.length === 0) {
    return errorType ? (
      <ReportNotFound errorType={errorType} />
    ) : (
      <ReportNotFound errorType={"reportNotFound"} />
    );
  } else if (
    !data ||
    (Array.isArray(data?.content) && !data?.content?.length)
  ) {
    return <ReportNotFound errorType={"reportNotFound"} />;
  }

  return <>{children}</>;
};
export default ErrorHandler;

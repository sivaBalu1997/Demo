import React from "react";
import ReportNotFound from "../ReportsNotFound";
import ErrorState from "../errorstatecomponents/ErrorState";

interface ErrorHandlerProps {
    children: React.ReactNode;
    errorType?: ""| "checkinNotFound" | "error"| "salesNotFound"|"noContent"
    isError?:boolean;
    data:any;
}
const ErrorHandler = ({ children,isError = false, data, errorType = "" }: ErrorHandlerProps) => {
if(isError ){
        return  <ReportNotFound  errorType={"error"}/>
        
    }else  if(data?.status==="204"){
        return (
            <ReportNotFound  errorType={"noContent"}/>
        )
    }else if(Array.isArray(data) && data.length===0){
        return (
            errorType? <ReportNotFound  errorType={errorType}/>:
            <ErrorState isDataNotAvailable={true} />
        )
    }else if(Array.isArray(data?.content) && data?.content?.length===0){
        return (
            <ReportNotFound  errorType={"error"}/>
        )
    }
    else if(isError ){
        return  <ReportNotFound  errorType={"error"}/>
        
    }
    return (
        <>
            {children}
        </>
    )
}
export default ErrorHandler
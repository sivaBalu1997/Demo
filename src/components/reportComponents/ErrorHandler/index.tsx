import React from "react";
import ReportNotFound from "../ReportsNotFound";

interface ErrorHandlerProps {
    children: React.ReactNode;
    errorType?: "default" | "report";
    isError?:boolean;
    data:any;
}
const ErrorHandler = ({ children,isError = false, data, errorType = "default" }: ErrorHandlerProps) => {
    if(data?.status==="204"){
        return (
            <ReportNotFound  errorType={"notStarted"}/>
        )
    }else if(Array.isArray(data) && data.length===0){
        return (
            <ReportNotFound  errorType={"notStarted"}/>
        )
    }else if(Array.isArray(data?.content) && data?.content?.length===0){
        return (
            <ReportNotFound  errorType={"notStarted"}/>
        )
    }
    else if(isError ){
        return  <ReportNotFound  errorType={"notStarted"}/>
        
    }
    return (
        <>
            {children}
        </>
    )
}
export default ErrorHandler
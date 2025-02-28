import React from 'react'
import { ReactComponent as PageNotAvailableIcon } from "../../../../assets/svg/page-data-not-available-icon.svg";
import { ReactComponent as PageErrorIcon } from "../../../../assets/svg/page-error-icon.svg";
import "./style.scss"

interface ErrorStateProps {
    pageTitle: string;
    isError?: boolean;
    isNotAvailable?: boolean;
}

const ErrorState: React.FC<ErrorStateProps> = ({ pageTitle, isError, isNotAvailable }) => {
    return (
        <>
            {isNotAvailable &&
                <div className='rep-page-error-not-available-container'>
                    <PageNotAvailableIcon />
                    <p className='rep-page-error-not-available-content-title'>{`Today's ${pageTitle} Report Not Available`}</p>
                    <span className='rep-page-error-not-available-content-sub'>{`${pageTitle} data for today will be available after business hours when the day is closed. Please check back later or view previous days' reports`}</span>
                </div>
            }
            {isError &&
                <div className='rep-page-error-not-available-container'>
                    <PageErrorIcon />
                    <p className='rep-page-error-not-available-content-title'>Error loading Data</p>
                    <span className='rep-page-error-not-available-content-sub'>{`will take a look and come back`}</span>
                </div>
            }
        </>
    )
}

export default ErrorState

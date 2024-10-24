import React from 'react'
import './ReviewValues.scss'

interface Reviewvalue {
  label: string;
  textvalue: string | number | React.ReactNode; 
}

const ReviewValues: React.FC<Reviewvalue> = ({ label, textvalue }) => {
  return (
    <div className="Review-values">
      <p className="Review-values-label">{label}</p>
      <span className="Review-values-text">{textvalue}</span>
    </div>
  );
};

export default ReviewValues
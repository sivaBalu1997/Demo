import React from 'react';
import StringDisplay from '../StringDisplay/StringDisplay';

interface TableRowProps {
  subheaders: string[];
  index: number;
  className: string;
  listingobject: any;
  classNames: string[];
}

const TableSecondHeader: React.FC<TableRowProps> = ({
  subheaders,
  index,
  className,
  listingobject,
  classNames,
}) => {
  return (
    <>
      {listingobject[classNames[index].replace(/-class/g, '')] && (
        <th key={index} className={`${className}   fontstyle`}>
          {subheaders.map((subheader, subIndex) => (
            <span key={subIndex} className={subheader}>
              <StringDisplay text={subheader} length={5}/>
            </span>
          ))}
        </th>
      )}
    </>
  );
};

export default TableSecondHeader;

import React from 'react';
// import StringDisplay from '../StringDisplay/StringDisplay';
import HoverText from '../HoverText/HoverText';

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
<<<<<<< HEAD
            <HoverText text={subheader} lengthvale={5} />
=======
              <StringDisplay text={subheader} />
>>>>>>> productCatalog/sprint-99v3
            </span>
          ))}
        </th>
      )}
    </>
  );
};

export default TableSecondHeader;

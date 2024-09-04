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
        <tr key={index} className={className}>
          {subheaders.map((subheader, subIndex) => (
            <td key={subIndex} className={subheader}>
              <StringDisplay text={subheader} />
            </td>
          ))}
        </tr>
      )}
    </>
  );
};

export default TableSecondHeader;

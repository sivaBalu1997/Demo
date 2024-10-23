import { Contextpagejs } from 'pages/productCatalog/contextpage';
import React, { useCallback, useContext, useEffect } from 'react';

interface InsertColumnListProps {
  listingobject: {
    showPricing: boolean;
    Dinein1: boolean;
    Pickup1: boolean;
    Delivery1: boolean;
    showavail: boolean;
    Dinein2: boolean;
    Pickup2: boolean;
    Delivery2: boolean;
    Inventory1: boolean;
    Customize1: boolean;
  };
  setlistingobject: (value: any) => void;
  insertlists: {
    Pricing: { show: string; Dinein: string; Pickup: string; Delivery: string };
    Available: { show: string; Dinein: string; Pickup: string; Delivery: string };
    Inventory: string;
    Customization: string;
  };
  showheadinglist: boolean;
  setshowheadinglist: (value: boolean) => void;
  closeicon: string;
  dollaricon: string;
  toggleround: string;
  togglebtns: string;
  Outsideref: React.RefObject<HTMLDivElement>;
}

const InsertColumnList: React.FC<InsertColumnListProps> = ({
  listingobject,
  setlistingobject,
  insertlists,
  showheadinglist,
  setshowheadinglist,
  closeicon,
  dollaricon,
  toggleround,
  togglebtns,
  Outsideref,
}) => {
  const handleToggle = useCallback(
    (key: keyof typeof listingobject, dependentKeys?: (keyof typeof listingobject)[]) => {
      setlistingobject((prev: any) => {
        const updatedState = {
          ...prev,
          [key]: !prev[key],
        };
        if (dependentKeys) {
          dependentKeys.forEach((depKey) => {
            updatedState[depKey] = !prev[key];
          });
        }
        return updatedState;
      });
    },
    [setlistingobject]);

    const{isExpanded}=useContext(Contextpagejs)


  useEffect(() => {
    if (
      !listingobject.Dinein1 &&
      !listingobject.Pickup1 &&
      !listingobject.Delivery1
    ) {
      setlistingobject({ ...listingobject, showPricing: false });
    }
    if (
      listingobject.Dinein1 ||
      listingobject.Pickup1 ||
      listingobject.Delivery1
    ) {
      setlistingobject({ ...listingobject, showPricing: true });
    }
  }, [listingobject.Dinein1, listingobject.Pickup1, listingobject.Delivery1]);

  useEffect(() => {
    if (
      !listingobject.Dinein2 &&
      !listingobject.Pickup2 &&
      !listingobject.Delivery2
    ) {
      setlistingobject({ ...listingobject, showavail: false });
    }
    if (
      listingobject.Dinein2 ||
      listingobject.Pickup2 ||
      listingobject.Delivery2
    ) {
      setlistingobject({ ...listingobject, showavail: true });
    }
  }, [listingobject.Dinein2, listingobject.Pickup2, listingobject.Delivery2]);
  
  return (
    <div className="headaadbtnclass" ref={Outsideref}>
      {showheadinglist && (
        <div className={isExpanded ? "headingstextlist1" : "headingstextlist"}>
          <div className="insertheading">
            <h3>
              <span>Insert Column</span>
              <img
                src={closeicon}
                alt=""
                onClick={() => setshowheadinglist(false)}
              />
            </h3>
          </div>
          <div className="inserbody">
            <ul>
              <li>
                <div className="headtext-fieldsselection pricingheadtext">
                  <input
                    type="checkbox"
                    checked={listingobject.showPricing}
                    onClick={() =>
                      handleToggle('showPricing', ['Dinein1', 'Delivery1', 'Pickup1'])
                    }
                  />
                  <span>
                    {insertlists.Pricing.show}
                    <img src={dollaricon} alt="" className="dollaricon" />
                  </span>
                </div>
                <ul className="indenttexts">
                  {['Dinein1', 'Pickup1', 'Delivery1'].map((key) => (
                    <li key={key}>
                      <div className='inner-text-input'>
                        <input
                          type="checkbox"
                          checked={listingobject[key as keyof typeof listingobject]}
                          onClick={() => handleToggle(key as keyof typeof listingobject)}
                        />
                        <span className='sub-texts-fileds'>{insertlists.Pricing[key.replace('1', '') as keyof typeof insertlists.Pricing]}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>

              <li>
                <div className="headtext-fieldsselection availheadtext">
                  <input
                    type="checkbox"
                    checked={listingobject.showavail}
                    onClick={() =>
                      handleToggle('showavail', ['Dinein2', 'Delivery2', 'Pickup2'])
                    }
                  />
                  <span>
                    {insertlists.Available.show}
                    <img src={toggleround} alt="" />
                    <img src={togglebtns} alt="" className="toggleicon" />
                  </span>
                </div>
                <ul className="indenttexts">
                  {['Dinein2', 'Pickup2', 'Delivery2'].map((key) => (
                    <li key={key}>
                      <div className='inner-text-input'>
                        <input
                          type="checkbox"
                          checked={listingobject[key as keyof typeof listingobject]}
                          onClick={() => handleToggle(key as keyof typeof listingobject)}
                        />
                        <span className='sub-texts-fileds'>{insertlists.Available[key.replace('2', '') as keyof typeof insertlists.Available]}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>

              {/* <li>
                <div className="headtext inventoryheadtext">
                  <input
                    type="checkbox"
                    checked={listingobject.Inventory1}
                    onClick={() => handleToggle('Inventory1')}
                  />
                  <span>{insertlists.Inventory}</span>
                </div>
              </li> */}

              <li>
                <div className="headtext-fieldsselection customheadtext">
                  <input
                    type="checkbox"
                    checked={listingobject.Customize1}
                    onClick={() => handleToggle('Customize1')}
                  />
                  <span>{insertlists.Customization}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsertColumnList;

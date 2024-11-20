import { Contextpagejs } from "pages/productCatalog/contextpage";
import React, { useCallback, useContext, useEffect, useState } from "react";

interface InsertColumnListProps {
  listingobject: any;
  setlistingobject: (value: any) => void;
  uniqueOrderTypeNames: any;
  insertlists: {
    Pricing: any;
    Available: any;

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
  uniqueOrderTypeNames,
}) => {
  const handleToggle = useCallback(
    (
      key: keyof typeof listingobject,
      dependentKeys?: (keyof typeof listingobject)[]
    ) => {
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
    [setlistingobject]
  );

  const handlecheckbox = (key: any) => {
    setlistingobject((prev: any) => {
      const updatedState = {
        ...prev,
        [key]: !prev[key],
      };

      return updatedState;
    });
  };

  const { isExpanded } = useContext(Contextpagejs);

  const [uniqueKeys, setuniqueKeys] = useState<any>([]);

  useEffect(() => {
    setuniqueKeys(
      uniqueOrderTypeNames &&
        (Object.keys(uniqueOrderTypeNames) as Array<keyof typeof listingobject>)
    );
  }, [uniqueOrderTypeNames]);

  const pricelist = uniqueKeys?.map(
    (item: any) => `${item}1` as keyof typeof insertlists.Pricing
  );
  const aviallist = uniqueKeys?.map(
    (item: any) => `${item}2` as keyof typeof insertlists.Available
  );

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
              {/* Pricing Section */}
              <li>
                <div className="headtext-fieldsselection pricingheadtext">
                  <input
                    type="checkbox"
                    checked={listingobject?.showPricing}
                    onChange={() => handleToggle("showPricing", pricelist)}
                  />
                  <span>
                    {insertlists.Pricing.show}
                    <img src={dollaricon} alt="" className="dollaricon" />
                  </span>
                </div>
                <ul className="indenttexts">
                  {pricelist.map((list: any) => (
                    <li key={list}>
                      <div className="inner-text-input">
                        <input
                          type="checkbox"
                          checked={listingobject[list]}
                          onChange={() => handlecheckbox(list)}
                        />
                        <span className="sub-texts-fileds">
                          {insertlists.Pricing[list.replace("1", "")]}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>

              {/* Availability Section */}
              <li>
                <div className="headtext-fieldsselection availheadtext">
                  <input
                    type="checkbox"
                    checked={listingobject?.showAvail}
                    onChange={() => handleToggle("showAvail", aviallist)}
                  />
                  <span>
                    {insertlists?.Available?.show}
                    {/* <img src={toggleround} alt="" /> */}
                    <img src={togglebtns} alt="tog" className="toggleiconNew" />
                  </span>
                </div>
                <ul className="indenttexts">
                  {aviallist.map((key: any) => (
                    <li key={key}>
                      <div className="inner-text-input">
                        <input
                          type="checkbox"
                          checked={
                            listingobject[key as keyof typeof listingobject]
                          }
                          onChange={() =>
                            handleToggle(key as keyof typeof listingobject)
                          }
                        />
                        <span className="sub-texts-fileds">
                          {
                            insertlists.Available[
                              key.replace(
                                "2",
                                ""
                              ) as keyof typeof insertlists.Available
                            ]
                          }
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>

              {/* Customization Section */}
              <li>
                <div className="headtext-fieldsselection customheadtext">
                  <input
                    type="checkbox"
                    checked={listingobject?.Customize1}
                    onChange={() => handleToggle("Customize1")}
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

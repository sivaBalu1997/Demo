import { Contextpagejs } from "pages/productCatalog/contextpage";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface InsertColumnListProps {
  listingobject: any;
  setlistingobject: (value: any) => void;
  uniqueOrderTypeNames: any;
  insertlist: {
    Pricing: any;
    Available: any;

    Customization: string;
  };
  setHasScrollbar:any;
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
  insertlist,
  showheadinglist,
  setshowheadinglist,
  closeicon,
  dollaricon,
  toggleround,
  togglebtns,
  Outsideref,
  setHasScrollbar,
  uniqueOrderTypeNames,
}) => {
  // const [pricing, setPricing] = useState<string | undefined>(
  //   insertlists?.Pricing?.show
  // );
  // const [availability, setAvailability] = useState<string | undefined>(
  //   insertlists?.Available?.show
  // );

  const [pricing, setPricing] = useState<string | undefined>("");
  const [availability, setAvailability] = useState<string | undefined>("");

  const insertlists = {
    Pricing: {
      show: listingobject?.showPricing ? "Pricing" : "",
      ...(listingobject &&
        Object.keys(listingobject && listingobject)
          .filter((key) => key.endsWith("1") && key !== "Customize1")
          .reduce((acc:any, key:any) => {
            acc[key.replace("1", "")] = key.replace("1", "");
            return acc;
          }, {})),
    },
    Available: {
      show: listingobject?.showAvail ? "Available" : "",
      ...(listingobject &&
        Object.keys(listingobject)
          .filter((key) => key.endsWith("2") && key !== "Customize1")
          .reduce((acc:any, key:any) => {
            acc[key.replace("2", "")] = key.replace("2", "");
            return acc;
          }, {})),
    },

    Customization: "Customization",
  };

  useEffect(() => {
    if (insertlists?.Pricing?.show !== "") {
      setPricing(insertlists?.Pricing?.show);
    }
    if (insertlists?.Available?.show !== "") {
      setAvailability(insertlists?.Available?.show);
    }
  }, [insertlists?.Pricing?.show, insertlists?.Available?.show]);

 
  
 
  
  

  const handlecheckbox = (
    key: any,
    parentKey: keyof typeof listingobject,
    dependentKeys: (keyof typeof listingobject)[]
  ) => {
    setlistingobject((prev: any) => {
      const updatedState = {
        ...prev,
        [key]: !prev[key],
      };

      const areAllChildrenChecked = dependentKeys?.every(
        (depKey) => updatedState[depKey]
      );
      updatedState[parentKey] = areAllChildrenChecked;

      return updatedState;
    });
  };

  const { isExpanded } = useContext(Contextpagejs);

  const [uniqueKeys, setuniqueKeys] = useState<any>([]);

  useEffect(() => {
    setuniqueKeys(
      uniqueOrderTypeNames
        ? (Object.keys(uniqueOrderTypeNames) as Array<
            keyof typeof listingobject
          >)
        : []
    );
  }, [uniqueOrderTypeNames]);

  const pricelist = uniqueKeys?.map(
    (item: any) => `${item}1` as keyof typeof insertlists.Pricing
  );
  const availlist = uniqueKeys?.map(
    (item: any) => `${item}2` as keyof typeof insertlists.Available
  );


  const isAllPricingChecked = pricelist?.every(
    (key: any) => listingobject[key]
  );
  const isAllAvailabilityChecked = availlist?.every(
    (key: any) => listingobject[key]
  );
   const orderTypess = useSelector(
          (state:any) => state.auth?.restaurantDetails?.branch[0]?.orderTypes
        );
          const selectedBranch = useSelector(
            (state:any) => state.auth.selectedBranch || null
          );
        
  
        const nameOfOrderTypes=selectedBranch.orderTypes?.filter((item:any) => item.isEnabled).map((item:any)=>item.typeName)
 
  
  const handleToggle = useCallback(
    (key: keyof typeof listingobject, dependentKeys?: (keyof typeof listingobject)[]) => {
      setlistingobject((prev: any) => {
        const isParentChecked = prev[key];
  
        // Update the parent key
        const updatedState = {
          ...prev,
          [key]: !isParentChecked,
        };
  
        // Update dependent keys only if provided
        if (dependentKeys?.length) {
          dependentKeys.forEach((depKey) => {
            updatedState[depKey] = !isParentChecked;
          });
        }
  
        return updatedState;
      });
    },
    [setlistingobject]
  );
  useEffect(() => {
    setlistingobject((prev:any) => ({
      ...prev,
      showPricing: isAllPricingChecked, 
    }));
  }, [isAllPricingChecked, setlistingobject]);
        // const nameOfOrderTypes=orderTypess?.map((item:any)=>item.typeName)

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
                  style={{cursor:'pointer'}}
                    type="checkbox"
                    checked={isAllPricingChecked}
                    onChange={() => handleToggle("showPricing", pricelist)}
                  />
                  <span onClick={() => handleToggle("showPricing", pricelist)} className="insert-column-header" >
                    {pricing}
                    <img src={dollaricon} alt="" className="dollaricon" />
                  </span>
                </div>
                <ul className="indenttexts">
  {pricelist
    ?.filter((list: any) =>
      nameOfOrderTypes?.includes(list.replace("1", "")) 
    )
    .map((list: any) => (
      <li key={list}>
        <div className="inner-text-input">
          <input
            type="checkbox"
            checked={listingobject[list]}
            onChange={() =>
              handlecheckbox(list, "showPricing", pricelist)
            }
          />
          <span
            onClick={() =>
              handlecheckbox(list, "showPricing", pricelist)
            }
            className="sub-texts-fileds"
          >
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
                    checked={isAllAvailabilityChecked}
                    onChange={() => handleToggle("showAvail", availlist)}
                  />
               <span onClick={() => handleToggle("showAvail", availlist)}>
                    {availability}
                    {/* <img src={toggleround} alt="" /> */}
                    <img
                      src={togglebtns}
                      alt="toggle-btn"
                      className="toggleiconNew"
                    />
                  </span>
                </div>
                <ul className="indenttexts">
                  {availlist?.filter((list: any) =>
      nameOfOrderTypes?.includes(list.replace("2", "")) 
    ).map((key: any) => (
                    <li key={key}>
                      <div className="inner-text-input">
                        <input
                          type="checkbox"
                          checked={listingobject[key]}
                          onChange={() =>
                            handlecheckbox(key, "showAvail", availlist)
                          }
                        />
                        <span 
                          onClick={() =>
                            handlecheckbox(key, "showAvail", availlist)
                          }
                        className="sub-texts-fileds">
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
                  <span style={{cursor:'pointer'}} onClick={() => handleToggle("Customize1")}>{insertlists.Customization}</span>
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

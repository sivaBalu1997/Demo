import React, { useState, useEffect, useContext } from "react";
import "./Filter.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import Reset from '../../../assets/svg/Reset.svg'
import { combinedItemsData } from "assets/mockData/Moca_data";
import { useDispatch } from "react-redux";
import { storeMockDataRequest } from "redux/productCatalog/productCatalogActions";
import { Contextpagejs } from "pages/productCatalog/contextpage";


const Filter = () => {
  const{isExpanded}=useContext(Contextpagejs)

  const dispatch=useDispatch()

  useEffect(() => {
    AOS.init();
    dispatch(storeMockDataRequest(combinedItemsData))
  }, []);

  const data1 = [
    { mainHeading: "Meal Type", items: ["Breakfast", "Lunch", "Dinner", "Happy Hours"] },
    { mainHeading: "Kitchen Station", items: ["Main Kitchen", "Chinese Kitchen", "Juice Kitchen"] },
    { mainHeading: "Allergens content", items: ["Contain Allergens", "Allergens free", "Prepared allerge"] },
  ];
  
  const data2 = [
    { mainHeading: "Cuisine", items: ["South Indian", "North Indian", "Chinese", "Italian", "Japanese"] },
    { mainHeading: "Dietary", items: ["Vegan Food", "Jain Food", "Halal Food", "Veg Food"] },
    { mainHeading: "Unavailable items", items: ["Popular items", "Special available", "Hidden"] },
  ];
  
  const data3 = [
    { mainHeading: "Cuisine", items: ["South Indian", "North Indian", "Chinese", "Italian"] },
  ];

  const allData = [data1, data2, data3];
  
  const initializeCheckedState = () => {
    return allData.map(group =>
      group.map(item => ({
        mainHeading: item.mainHeading,
        checked: false,
        items: item.items.map(() => false)
      }))
    );
  };

  const [checkedState, setCheckedState] = useState(initializeCheckedState());

  const handleMainHeadingChange = (groupIndex, itemIndex) => {
    const newCheckedState = [...checkedState];
    const isChecked = !newCheckedState[groupIndex][itemIndex].checked;

    newCheckedState[groupIndex][itemIndex].checked = isChecked;
    newCheckedState[groupIndex][itemIndex].items = newCheckedState[groupIndex][itemIndex].items.map(() => isChecked);

    setCheckedState(newCheckedState);
  };

  const handleSubItemChange = (groupIndex, itemIndex, subItemIndex) => {
    const newCheckedState = [...checkedState];
    newCheckedState[groupIndex][itemIndex].items[subItemIndex] = !newCheckedState[groupIndex][itemIndex].items[subItemIndex];

    const allChecked = newCheckedState[groupIndex][itemIndex].items.every(item => item);
    newCheckedState[groupIndex][itemIndex].checked = allChecked;

    setCheckedState(newCheckedState);
  };

  const handleReset = () => {
    setCheckedState(initializeCheckedState());
  };

  return (
    <div className={isExpanded?"Filter-Container":"Filter-Container1"} data-aos="fade-left">
      <div className="Filter-Heading-container">
        <h3 className="Filter-Heading-org">Filter</h3>
      </div>
      <table className="data-table">
        <div className="items-container">
          {allData.map((group, groupIndex) => (
            <div key={groupIndex}>
              <div className="items-container-flex-justify">
                {group.map((elem, itemIndex) => (
                  <div key={itemIndex}>
                    <tr>
                      <td>
                        <input
                          className="check-items"
                          type="checkbox"
                          checked={checkedState[groupIndex][itemIndex].checked}
                          onChange={() => handleMainHeadingChange(groupIndex, itemIndex)}
                        />
                      </td>
                      <td>
                        <a className="heading-items">{elem.mainHeading}</a>
                      </td>
                    </tr>
                    <div className="items-container-flex-direction">
                      {elem.items.map((item, subItemIndex) => (
                        <div key={subItemIndex}>
                          <input
                            className="input-subitems"
                            type="checkbox"
                            checked={checkedState[groupIndex][itemIndex].items[subItemIndex]}
                            onChange={() => handleSubItemChange(groupIndex, itemIndex, subItemIndex)}
                          />
                          <a className="heading-subitems">{item}</a>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>  
      </table>

      {/* Button Footer */}
      <div className="filter-footer-container">
        <div className="reset-Button-contanier" onClick={handleReset}>
          <img className="resetButton" src={Reset} alt="" />
          <h3 className="Reset-Heading-filter">Reset</h3>
        </div>
        <div className="Apply-Footer-Container">
          <h3 className="Apply-Footer-Heading">Apply</h3>
        </div>
      </div>
    </div>
  );
};

export default Filter;

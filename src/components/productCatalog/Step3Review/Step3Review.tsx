import React, { useContext } from "react";
import "./Step3Review.scss";
import Edit from "../../../assets/images/edit.png";
import { useSelector } from "react-redux";
import { Contextpagejs } from "../../../pages/productCatalog/contextpage";
import { Link } from "react-router-dom";
interface modifierOptions {
  modifierOptionName: string;
  cost: number;
  isModifierOptionChanged: any;
}
export interface ItemCustomization {
  modifierId?: string;
  isModifierChanged?: boolean;
  modifierName: string;
  selectionType: string;
  minSelection?: number;
  maxSelection?: number;
  modifierOptions?: modifierOptions[];
  price?: any;
  name?: any;
  freeCustomization?: string;
  selectedValue?: string[];
  serviceStreams?: string[];
}
export interface RootStateIC {
  itemCustomizationsReducer1: {
    itemData: ItemCustomization[];
  };
}

const Step3Review: React.FC = () => {
  // Access itemCustomizationsReducer1 from the Redux store
  const itemCustomizationData = useSelector(
    (state: RootStateIC) => state.itemCustomizationsReducer1.itemData
  );
  console.log({itemCustomizationData});
  

  const minSelectionArray = Array.isArray(itemCustomizationData) &&
      itemCustomizationData.length > 0 ? (
        itemCustomizationData
          .filter((elem) => elem.modifierName !== "")
          .map((elem, index) => (elem?.minSelection))):""

  const maxSelectionArray = Array.isArray(itemCustomizationData) &&
  itemCustomizationData.length > 0 ? (
    itemCustomizationData
      .filter((elem) => elem.modifierName !== "")
      .map((elem, index) => (elem?.maxSelection))):""

  const { setActiveCategory } = useContext(Contextpagejs);

  // Log the data to inspect its structure
  // console.log(itemCustomizationData);
  const restaurantDetails = useSelector(
    (state: any) => state?.auth.restaurantDetails
  );

  const { isExpanded } = useContext(Contextpagejs);


  return (
    <div className="step3-Review-Container">
      {/* Step 3 Item Customizations Heading and Edit Button */}
      <div className={isExpanded ? "step3-Review-Container-heading-and-button-container1" : "step3-Review-Container-heading-and-button-container"}>
        <h3 className="step3-Review-Container-heading">
          Step 3: Item customizations
        </h3>
        <div>
          {/* <img src={Edit} className="step3-Review-Container-heading-EditImage" alt="Edit" />
          <h3 className="Edit-heading" >Edit</h3> */}
          <Link
            to="/productCatalog/Itemcustomizations"
            className="step3-Review-img-edit-Container"
            onClick={() => setActiveCategory("Step 3: Item customizations")}
          >
            <img
              src={Edit}
              alt=""
              // className="step3-Review-Container-heading-EditImage"
              width={15}
              height={15}
            />
            <h3 className="Edit-heading">Edit</h3>
          </Link>{" "}
        </div>
      </div>

      {/* Render itemCustomizationData if it's an array */}
      {Array.isArray(itemCustomizationData) &&
      itemCustomizationData.length > 0 ? (
        itemCustomizationData
          .filter((elem) => elem.modifierName !== "")
          .map((elem, index) => (
            <div key={index} className="item-customization">
              {/* Example of how to display properties of each item */}
              <div className="step3-Review-modifier-section">
                {itemCustomizationData.length === 1 && (
                  <h3 className="step3-Review-modifier-section-heading">
                    Modifiers
                  </h3>
                )}

                <div className="step3-Review-modifier-name-container">
                  <h3 className="step3-Review-modifier-name-heading">
                    {index + 1}.
                  </h3>
                  <h3 className="step3-Review-modifier-name-heading">
                    {elem.modifierName}
                  </h3>
                  <h3 className="step3-Review-modifier-name-heading">
                    ({elem.selectionType})
                  </h3>
                </div>
              </div>

              <div className="Step-3-Modifier-Section-Menu-container">
                <div className="Step-3-Modifier-Section-Each-Menu-container">
                  <h3 className="Step-3-Modifier-Section-Menu-heading">
                    Min Selection
                  </h3>
                  <h3 className="Step-3-Modifier-Section-Menu-details">
                    {elem.selectionType === "Optional" ? 0 : elem?.minSelection? elem?.minSelection:1}{!minSelectionArray?.length && "N/A"}
                  </h3>
                </div>
                <div className="Step-3-Modifier-Section-Each-Menu-container">
                  <h3 className="Step-3-Modifier-Section-Menu-heading">
                    Max Selection
                  </h3>
                  <h3 className="Step-3-Modifier-Section-Menu-details">
                    {elem?.maxSelection && elem?.maxSelection}{!maxSelectionArray?.length && "N/A"}
                  </h3>
                </div>
                <div className="Step-3-Modifier-Section-Each-Menu-container-item">
                  <h3 className="Step-3-Modifier-Section-Menu-heading">Item</h3>
                  {elem.modifierOptions &&
                    elem.modifierOptions.map((subItem:any, subIndex:any) => (
                      <h2
                        key={subIndex}
                        className="Step-3-Modifier-Section-Menu-details-items"
                      >
                        {subItem.modifierOptionName}
                      </h2>
                    ))}
                </div>
                <div className="Step-3-Modifier-Section-Each-Menu-container-price">
                  <h3 className="Step-3-Modifier-Section-Menu-heading">
                    Price
                  </h3>
                  {elem.modifierOptions &&
                    elem.modifierOptions.map((price, priceIndex) => (
                      <h2
                        key={priceIndex}
                        className="Step-3-Modifier-Section-Menu-details-price"
                      >
                          {restaurantDetails?.country === "US" ? "$" : "Rs."}{Number(price.cost).toFixed(2)} 
                          {/* {(typeof price.cost === "number" ? price.cost : 0).toFixed(2)} */}
                      </h2>
                    ))}
                </div>
              </div>

              <div className="Free-Modification-Section">
                <h3 className="Step-3-Modifier-Section-Menu-heading">
                  Free modification
                </h3>
                <h3 className="Step-3-free-details">
                  {elem.freeCustomization || "N/A"}
                </h3>
              </div>

              <div className="Free-Modification-Section">
                <h3 className="Step-3-Modifier-Section-Menu-heading">
                  Service Stream
                </h3>
                <h3 className="Step-3-free-details">
                  {(elem?.selectedValue &&
                    elem?.selectedValue.map((e) => e + " " + "")) ||
                    "N/A"}{" "}
                </h3>
                <div className="Step-3-Review-Stream-Modification-container">
                  {elem.serviceStreams &&
                    elem.serviceStreams.map((stream, streamIndex) => (
                      <h1
                        key={streamIndex}
                        className="Step-3-Review-Stream-Modification-heading"
                      >
                        {stream}{" "}
                      </h1>
                    ))}
                </div>
              </div>
            </div>
          ))
      ) : (
        <p className="Nodata">N/A</p>
      )}
    </div>
  );
};

export default Step3Review;

import React, { useContext, useState, useEffect } from "react";
import "./PrimaryDetailsReviewpage.scss";
import axios from "axios";
import edit from "../../../assets/images/edit.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Step2 from "../../../components/productCatalog/Step2/Step2";
import { Contextpagejs } from "../contextpage";
import ReviewValues from "../../../components/productCatalog/ReviewValues/ReviewValues";
import ImagePillsSelected from "../../../components/productCatalog/ImagePillsSelected/ImagePillsSelected";
import Step3Review from "../../../components/productCatalog/Step3Review/Step3Review";
import PrimaryImageSelected from "../../../components/productCatalog/PrimaryImageSelected/PrimaryImageSelected";
import { addMenuItemRequest, addMockDataRequest } from "redux/productCatalog/productCatalogActions";
import SidePanel from "pages/SidePanel";
import { useHistory } from "react-router-dom";

interface Image {
  id: string;
  image: string;
  name: string;
  mimeType?: string;
  base64String?: string;
}
interface AllergenImage {
  id: string;
  name: string;
}
interface Base64Image {
  mimeType: string;
  base64String: string;
}

interface PrimaryData {
  locationId: string;
  altName: string;
  price: string;
  subCategoryId: string;
  categoryId: string;
  kitchenStations: string[];
  taxFeeId: string;
  modifiers: string[];
  availabilityId: string[];
  itemId: string;
  itemName?: string;
  category?: string;
  subCategory?: string;
  itemCode?: string;
  description?: string;
  dietaryType?: string;
  cuisine?: string;
  mealType?: string;
  bestPair?: string;
  ingredients: AllergenImage[];
  alcohol: string;
  barCode: string;
  caloriePoint?: string;
  selectedcolorie: string;
  portionSize?: string;
  selectedPortion: string;
  tax: string;
  masterCode: string;
  imageUrls: Base64Image[];
  allergens: AllergenImage[];
}
interface RootState {
  primarypage: {
    data: PrimaryData;
  };
  PricingDetailReducer: {
    prizingData: {
      mainForm: {
        KitchenStationId?: {
          KitchenStationId: string[];
        };
        normalForm?: {
          availabilityid: {
            availabilityid: string[];
          };
        };
        specialForm?: {
          availabilityid: {
            availabilityid: string[];
          };
        };
      };
    };
  };
}

const PrimaryDetailsReviewpage: React.FC = () => {
  const history=useHistory()
  const dispatch = useDispatch();
  const { isExpanded, setActiveCategory } = useContext(Contextpagejs);
  const primarydata = useSelector((state: RootState) => state.primarypage.data);
  const fetchedprimarydata = primarydata;

  const primarypagedetails = useSelector((state: RootState) => state);

  const data = [{
    
    locationId: "9c485244-afd4-11eb-b6c7-42010a010026",
    itemCode: primarypagedetails.primarypage.data.itemCode,
    altName: "alt name",
    itemName: primarypagedetails.primarypage.data.itemName,
    description: primarypagedetails.primarypage.data.description,
    price: "12",
    categoryId: primarypagedetails.primarypage.data.categoryId,
    subCategoryId: "",
    kitchenStations: ["3bdfa61-0e4f-48e6-b2bb-b4bd1d103950"],
    taxFeeId: "",
    ingredients: ["03348389-4b2a-4fca-affa-6ad4291b0241"],
    modifiers: [],
    availabilityId: ["b1492143-2c4c-4a4f-bc49-a3b99cbb1349"],
    category: primarypagedetails.primarypage.data.category,
    subCategory: primarypagedetails.primarypage.data.subCategory,
    itemId: null,

  }]

  const handleDispatch=()=>{

    dispatch(addMenuItemRequest(data))
    dispatch(addMockDataRequest(data))
    history.push("/menuListing")
    
    
  }

  return (
    <div style={{ display: "flex", width: "93%" }}>
      <SidePanel />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="reviewheading">
          <p>Review menu item - Idli</p>
        </div>
        <div className="reviewpage">
          <div className="reviewpagebody">
            <div className="primaryreview">
              <div className="primaryreviewdetailspart1">
                <div className="primaryreviewheading">
                  <p>Step 1: Primary Details</p>
                </div>
                <div className="primaryreviews">
                  <div className="primaryreviewdetails">
                    <div className="primaryreviewdetails1">
                      <div>
                        <ReviewValues
                          label="Item Name"
                          textvalue={
                            fetchedprimarydata.itemName
                              ? fetchedprimarydata.itemName
                              : "-"
                          }
                        />
                      </div>

                      <div>
                        <ReviewValues
                          label="Dietary type"
                          textvalue={
                            fetchedprimarydata.dietaryType
                              ? fetchedprimarydata.dietaryType
                              : "-"
                          }
                        />
                      </div>

                      <div>
                        <ReviewValues
                          label="Meal type"
                          textvalue={
                            fetchedprimarydata.mealType
                              ? fetchedprimarydata.mealType
                              : "-"
                          }
                        />
                      </div>

                      <div>
                        <ReviewValues
                          label="Category"
                          textvalue={
                            fetchedprimarydata.category
                              ? fetchedprimarydata.category
                              : "-"
                          }
                        />
                      </div>

                      <div>
                        <ReviewValues
                          label="Calorie Point"
                          textvalue={
                            fetchedprimarydata.caloriePoint
                              ? fetchedprimarydata.caloriePoint
                              : "-"
                          }
                        />
                      </div>

                      <div>
                        <ReviewValues
                          label="Portion Size"
                          textvalue={
                            fetchedprimarydata.portionSize
                              ? fetchedprimarydata.portionSize
                              : "-"
                          }
                        />
                      </div>

                      <div>
                        <ReviewValues
                          label="Tax Class Association"
                          textvalue={
                            fetchedprimarydata.tax
                              ? fetchedprimarydata.tax
                              : "-"
                          }
                        />
                      </div>
                    </div>

                    <div className="primaryreviewdetails2">
                      <div>
                        <ReviewValues
                          label="Item code"
                          textvalue={
                            fetchedprimarydata.itemCode
                              ? fetchedprimarydata.itemCode
                              : "-"
                          }
                        />
                      </div>

                      <div>
                        <ReviewValues
                          label="Other dietary details"
                          textvalue={
                            fetchedprimarydata.itemCode
                              ? fetchedprimarydata.itemCode
                              : "-"
                          }
                        />
                      </div>

                      <div>
                        <ReviewValues
                          label="Cuisine"
                          textvalue={
                            fetchedprimarydata.cuisine
                              ? fetchedprimarydata.cuisine
                              : "-"
                          }
                        />
                      </div>

                      <div>
                        <ReviewValues
                          label="SubCategory"
                          textvalue={
                            fetchedprimarydata.subCategory
                              ? fetchedprimarydata.subCategory
                              : "-"
                          }
                        />
                      </div>

                      <div>
                        <ReviewValues
                          label="Unit of measurement"
                          textvalue={
                            fetchedprimarydata.selectedPortion
                              ? fetchedprimarydata.selectedPortion
                              : "-"
                          }
                        />
                      </div>

                      <div>
                        <ReviewValues
                          label="Master product code"
                          textvalue={
                            fetchedprimarydata.masterCode
                              ? fetchedprimarydata.masterCode
                              : "-"
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="primaryreviewdetailspart2">
                <div>
                  <Link
                    to="/Navigationpage"
                    className="primarypageedit"
                    onClick={() => setActiveCategory("Step 1: Primary Details")}
                  >
                    <img
                      src={edit}
                      alt=""
                      className="step3-Review-Container-heading-EditImage"
                      width={15}
                      height={15}
                    />
                    <h3 className="Edit-heading">Edit</h3>
                  </Link>{" "}
                </div>
                {
                  <div className="primaryimages">
                    <p>Primary Image</p>

                    <PrimaryImageSelected
                      fetchedprimarydata={fetchedprimarydata}
                    />
                  </div>
                }

                {fetchedprimarydata.description && (
                  <div className="primarydescription">
                    <p>Description</p>
                    <div className="description">
                      <p>{fetchedprimarydata.description}</p>
                    </div>
                  </div>
                )}
                {
                  <div className="primarybestpairedfood">
                    <p>Best paired with</p>
                    <div className="bestpairfoods">
                      <p>
                        {fetchedprimarydata.bestPair
                          ? fetchedprimarydata.bestPair
                          : "No item selected"}
                      </p>
                    </div>
                  </div>
                }

                <div className="allergensandingredients">
                  <div>
                    <p className="ingredients">Ingredients</p>
                    <ImagePillsSelected
                      imageselected={fetchedprimarydata}
                      name="Ingredients"
                    />
                  </div>

                  <div>
                    <p className="allergen">Allergens</p>{" "}
                    <ImagePillsSelected
                      imageselected={fetchedprimarydata}
                      name="allergens"
                    />
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "20px",
                }}
              >
                <Step2 />
                <div className="verticalLine" />
                <Step3Review />
              </div>
            </div>
          </div>
        </div>{" "}
        <div
          className={isExpanded ? "saveandnextreview" : "saveandnextreview1"}
        >
          <button className={`${isExpanded ? "clearall1" : "clearall"}`}>
            Cancel
          </button>
          <button
            className="saveall"
            onClick={handleDispatch}
          >
            Submit for review
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrimaryDetailsReviewpage;

import "../../styles/menus.scss";
import React, { useState } from "react";
import Dropdown from "../common/Dropdown";
import TextInput from "../common/TextInput";
import Checkbox from "../common/Checkbox";
import { useForm } from "react-hook-form";
import Switch from "react-switch";
import { ReactComponent as AddImageIcon } from "../../assets/svg/addImage.svg";
import { ReactComponent as AppleIcon } from "../../assets/svg/apple.svg";
import { ReactComponent as BananaIcon } from "../../assets/svg/banana.svg";
import { ReactComponent as CheeseIcon } from "../../assets/svg/cheese.svg";
import { ReactComponent as MashroomIcon } from "../../assets/svg/mashroom.svg";
import { ReactComponent as StrowberryIcon } from "../../assets/svg/strawberry.svg";
import { ReactComponent as BeansIcon } from "../../assets/svg/beans.svg";
import { ReactComponent as CrossIcon } from "../../assets/svg/cross.svg";
import { Fragment } from "react";
import { FaTrash } from "react-icons/fa";

const menuCategory = [
  { id: 1, option: "South Indian Lunch" },
  { id: 2, option: "North Indian Lunch" },
  { id: 3, option: "Italian Food" },
];

const Ingredients = [
  {
    id: "1",
    name: "Apple",
    icon: <AppleIcon />,
  },
  {
    id: "2",
    name: "Banana",
    icon: <BananaIcon />,
  },
  {
    id: "3",
    name: "Mashroom",
    icon: <MashroomIcon />,
  },
  {
    id: "4",
    name: "Beans",
    icon: <BeansIcon />,
  },
  {
    id: "5",
    name: "Apple",
    icon: <AppleIcon />,
  },
  {
    id: "6",
    name: "Banana",
    icon: <BananaIcon />,
  },
  {
    id: "7",
    name: "Mashroom",
    icon: <MashroomIcon />,
  },
  {
    id: "8",
    name: "Beans",
    icon: <BeansIcon />,
  },
  {
    id: "9",
    name: "Apple",
    icon: <AppleIcon />,
  },
  {
    id: "10",
    name: "Banana",
    icon: <BananaIcon />,
  },
  {
    id: "11",
    name: "Mashroom",
    icon: <MashroomIcon />,
  },
  {
    id: "12",
    name: "Beans",
    icon: <BeansIcon />,
  },
  {
    id: "13",
    name: "Apple",
    icon: <AppleIcon />,
  },
  {
    id: "14",
    name: "Banana",
    icon: <BananaIcon />,
  },
  {
    id: "15",
    name: "Mashroom",
    icon: <MashroomIcon />,
  },
  {
    id: "16",
    name: "Beans",
    icon: <BeansIcon />,
  },
];

const AddItem = () => {
  const [selectValue, setselectValue] = useState(menuCategory.option);
  const [selectedIngredients, setselectedIngredients] = useState([]);
  const [step, setstep] = useState(1);
  const [cookItemBatch, setcookItemBatch] = useState(false);
  const [dineIn, setdineIn] = useState(false);
  const [online, setonline] = useState(false);
  const [pickUp, setpickUp] = useState(false);
  const [delivery, setdelivery] = useState(false);
  const [customization, setcustomization] = useState(false);
  const [customizedMenu, setcustomizedMenu] = useState([]);
  const [counter, setcounter] = useState(1);

  const {
    register,
    errors,
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    formState,
  } = useForm();
  const onSubmit = (data) => {
    // console.log("Hello", data);
  };

  // console.log(`step`, step);
  return (
    <>
      {/* <div style={{ width: "78%" }}> */}
      <div className="container">
        <div className="innerContainer">
          <div className="header">Menu Item Details</div>
          <div className="tab-panel-container">
            <div className="tab-panel-container1">
              <span
                className={`tab1-panel-text ${
                  step === 2 && "tab1-panel-text-active"
                }`}
              >
                Step 1: Primary Details
              </span>
              <div
                className={`tab-panel ${
                  step === 1 ? "tab1-active" : "tab1-disabled"
                }`}
              ></div>
            </div>
            <div className="tab-panel-container2">
              <span
                className={step === 1 ? "tab2-panel-text" : "tab1-panel-text"}
              >
                Step 2: Outlet related Details
              </span>
              <div
                className={`tab-panel ${
                  step === 2 ? "tab2-active" : "tab2-disabled"
                }`}
              ></div>
            </div>
          </div>
          {step === 1 && (
            <Fragment>
              {/* <div className="title-container">
                <span className="title">Step 1: Primary Details</span>
              </div> */}
              <div className="content-container">
                <div className="portion-one">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Dropdown
                      color={"#979797"}
                      data={menuCategory}
                      selectValue={selectValue}
                      placeholder="Item Name"
                      name="itemName"
                      // {...register("itemName")}
                    />
                    <input {...register("itemName")} placeholder="First name" />
                    <TextInput
                      type={"text"}
                      placeholder={"Item Code"}
                      name="itemCode"
                    />
                    <Dropdown
                      color={"#979797"}
                      data={menuCategory}
                      selectValue={selectValue}
                      placeholder="Menu Category"
                      name="menuCategory"
                    />
                    <Dropdown
                      color={"#979797"}
                      data={menuCategory}
                      selectValue={selectValue}
                      placeholder="Menu Sub Category"
                      name="menuSubCategory"
                    />
                    <TextInput
                      type={"text"}
                      placeholder={"Calorie Point"}
                      name="caloriePoint"
                    />
                    <Dropdown
                      color={"#979797"}
                      data={menuCategory}
                      selectValue={selectValue}
                      placeholder="Tax Class Association"
                      name="taxClassAssociation"
                    />
                    <div className="other-text">Other Details</div>
                    <Dropdown
                      color={"#979797"}
                      data={menuCategory}
                      selectValue={selectValue}
                      placeholder="UOM"
                      name="UOM"
                    />
                    <TextInput
                      type={"text"}
                      placeholder={"Serving Size"}
                      name="servingSize"
                    />
                    <TextInput
                      type={"text"}
                      placeholder={"Portion Size"}
                      name="portionSize"
                    />
                    {/* <input type="submit" /> */}
                  </form>
                </div>
                <div className="portion-two">
                  <div className="imageContainer">
                    <AddImageIcon />

                    <span className="imageText">
                      <span>ⓘ</span> You can add maximum 6 images (png fromat
                      with 120 x 120 pixel size)
                    </span>
                  </div>
                  <textarea
                    type="text"
                    name="description"
                    placeholder="Description"
                    rows="4"
                    cols="50"
                    className="discription"
                  ></textarea>
                  <div className="ingredients-container">
                    <span className="other-text">Ingredients</span>
                    {selectedIngredients.length > 0 && (
                      <div className="selected-ingredient-container">
                        {selectedIngredients.map((u) => {
                          return (
                            <div className="selected-ingredient">
                              {u.icon}
                              <span className="selected-ingredient-text">
                                {u.name}
                              </span>
                              <CrossIcon
                                onClick={() => {
                                  let newArray = [...selectedIngredients];
                                  let data = newArray.filter(function (el) {
                                    return el.id !== u.id;
                                  });

                                  console.log(`newArray`, data);
                                  setselectedIngredients(data);
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {/* <TextInput
                      type={"text"}
                      placeholder={"Search"}
                      name="servingSize"
                      className="search-ingredients"
                    /> */}
                    <div className="ingredient-item-container">
                      {Ingredients.map((i) => {
                        return (
                          <div
                            className="ingredient-icon-container"
                            onClick={() =>
                              setselectedIngredients([
                                ...selectedIngredients,
                                i,
                              ])
                            }
                          >
                            {i.icon}
                            <span className="ingredientName">{i.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
          {step === 2 && (
            <Fragment>
              {/* <div className="title-container">
                <span className="title">Step 2: Primary Details</span>
              </div> */}
              <div className="content-container">
                <div className="outlet-container">
                  <TextInput
                    type={"text"}
                    placeholder={"Cost Price"}
                    name="portionSize"
                  />
                </div>
              </div>
              <div>
                <span className="outlet-title">Kitchen Related</span>
                <div className="kitchen-container">
                  <div className="dropdown-container">
                    <Dropdown
                      color={"#979797"}
                      data={menuCategory}
                      selectValue={selectValue}
                      placeholder="Kitchen Station"
                      name="kitchenStation"
                    />
                  </div>
                  <div className="preparation-dropdown-container">
                    <Dropdown
                      color={"#979797"}
                      data={menuCategory}
                      selectValue={selectValue}
                      placeholder="Preparation time"
                      name="preparationTime"
                    />
                  </div>
                </div>
                <div className="kitchen-container title-container">
                  <div className="outlet-container ">
                    <span> Item cooked in a batch </span>
                    <Switch
                      onChange={() => setcookItemBatch(!cookItemBatch)}
                      checked={cookItemBatch}
                      checkedIcon={false}
                      uncheckedIcon={false}
                      onColor="#00B71D"
                      width={35}
                      height={18}
                    />
                  </div>
                </div>
                {cookItemBatch && (
                  <div className="content-container">
                    <div className="outlet-container">
                      <TextInput
                        type={"text"}
                        placeholder={"Number of items/portion per batch"}
                        name="portionSize"
                      />
                    </div>
                  </div>
                )}
                <span className="outlet-title">Available Service Streams</span>
                <div className="available-stream-container">
                  <div className="dineIn-switch-container">
                    <Switch
                      onChange={() => setdineIn(!dineIn)}
                      checked={dineIn}
                      checkedIcon={false}
                      uncheckedIcon={false}
                      onColor="#00B71D"
                      width={35}
                      height={18}
                    />
                  </div>
                  <div className="dineIn-container">
                    <span>Dine In</span>
                    {dineIn && (
                      <div className="kitchen-container">
                        <div className="dropdown-container">
                          <Dropdown
                            color={"#979797"}
                            data={menuCategory}
                            selectValue={selectValue}
                            placeholder="Service Time"
                            name="serviceTime"
                          />
                        </div>
                        <div style={{ width: "100%", display: "flex" }}>
                          <div className="preparation-dropdown-container">
                            <Dropdown
                              color={"#979797"}
                              data={menuCategory}
                              selectValue={selectValue}
                              placeholder="Preparation time"
                              name="preparationTime"
                            />
                          </div>
                          <div style={{ marginLeft: "4rem" }}>
                            <TextInput
                              type={"text"}
                              placeholder={"Cost Price"}
                              name="portionSize"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="available-stream-container">
                  <div className="dineIn-switch-container">
                    <Switch
                      onChange={() => setonline(!online)}
                      checked={online}
                      checkedIcon={false}
                      uncheckedIcon={false}
                      onColor="#00B71D"
                      width={35}
                      height={18}
                    />
                  </div>
                  <div className="dineIn-container">
                    <span>Online</span>
                    {online && (
                      <>
                        <div className="kitchen-container">
                          <div className="dropdown-container">
                            <TextInput
                              type={"text"}
                              placeholder={"Maximum Count For Online"}
                              name="portionSize"
                            />
                          </div>
                        </div>
                        <div className="kitchen-container">
                          <div className="outlet-container">
                            <span>Pick Up</span>
                            <div
                              className="dineIn-switch-container"
                              style={{ justifyContent: "spaceBetween" }}
                            >
                              <Switch
                                onChange={() => setpickUp(!pickUp)}
                                checked={pickUp}
                                checkedIcon={false}
                                uncheckedIcon={false}
                                onColor="#00B71D"
                                width={35}
                                height={18}
                              />
                            </div>
                          </div>
                        </div>
                        {pickUp && (
                          <div className="kitchen-container">
                            <div className="dropdown-container">
                              <TextInput
                                type={"text"}
                                placeholder={"Selling Price for Pickup"}
                                name="portionSize"
                              />
                            </div>
                            <div className="preparation-dropdown-container">
                              <Dropdown
                                color={"#979797"}
                                data={menuCategory}
                                selectValue={selectValue}
                                placeholder="Service Time"
                                name="preparationTime"
                              />
                            </div>
                          </div>
                        )}
                        <div className="kitchen-container">
                          <div className="outlet-container">
                            <span>Delivery</span>
                            <div
                              className="dineIn-switch-container"
                              style={{ justifyContent: "spaceBetween" }}
                            >
                              <Switch
                                onChange={() => setdelivery(!delivery)}
                                checked={delivery}
                                checkedIcon={false}
                                uncheckedIcon={false}
                                onColor="#00B71D"
                                width={35}
                                height={18}
                              />
                            </div>
                          </div>
                        </div>
                        {delivery && (
                          <div className="kitchen-container">
                            <div className="dropdown-container">
                              <TextInput
                                type={"text"}
                                placeholder={"Selling Price for Pickup"}
                                name="portionSize"
                              />
                            </div>
                            <div className="preparation-dropdown-container">
                              <Dropdown
                                color={"#979797"}
                                data={menuCategory}
                                selectValue={selectValue}
                                placeholder="Service Time"
                                name="preparationTime"
                              />
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div className="  ">
                  <div className="kitchen-container title-container">
                    <div className="outlet-container ">
                      <span> Add Customization </span>
                      <Switch
                        onChange={() => {
                          const customizationMenu = {
                            modifierName: "",
                            numberofItem: "",
                            serviceStream: [],
                            subCategory: [{ name: "", price: "" }],
                            mendatory: false,
                          };
                          setcustomization(!customization);
                          if (customizedMenu.length === 0) {
                            let newArray = [
                              ...customizedMenu,
                              customizationMenu,
                            ];
                            setcustomizedMenu(newArray);
                          }
                        }}
                        checked={customization}
                        checkedIcon={false}
                        uncheckedIcon={false}
                        onColor="#00B71D"
                        width={35}
                        height={18}
                      />
                    </div>
                  </div>

                  {customization && (
                    <div className="dineIn-container">
                      {customizedMenu.map((u, index) => {
                        return (
                          <>
                            <div
                              className="customisation-container"
                              style={{ marginTop: "1.5rem" }}
                            >
                              <div>
                                <TextInput
                                  type={"text"}
                                  placeholder={"Modifier Name"}
                                  name="portionSize"
                                />
                              </div>
                              <div className="preparation-dropdown-container">
                                <Dropdown
                                  color={"#979797"}
                                  data={menuCategory}
                                  selectValue={selectValue}
                                  placeholder="No. of items can be selected "
                                  name="preparationTime"
                                />
                              </div>
                              <div className="preparation-dropdown-container">
                                <Dropdown
                                  color={"#979797"}
                                  data={menuCategory}
                                  selectValue={selectValue}
                                  placeholder="Available Service Stream"
                                  name="preparationTime"
                                />
                              </div>
                              <FaTrash
                                className="add-text-margin"
                                color="#67833E"
                                onClick={() => {
                                  let newArray = [...customizedMenu];
                                  newArray.splice(index, 1);
                                  setcustomizedMenu(newArray);
                                }}
                              />
                            </div>
                            {u.subCategory.map((data, i) => {
                              return (
                                <div className="customisation-container">
                                  <div>
                                    <TextInput
                                      type={"text"}
                                      placeholder={"Option (Item)"}
                                      name="portionSize"
                                    />
                                  </div>
                                  <div style={{ marginLeft: "4rem" }}>
                                    <TextInput
                                      type={"text"}
                                      placeholder={"Price"}
                                      name="portionSize"
                                    />
                                  </div>
                                  {u.subCategory.length === i + 1 && (
                                    <span
                                      className="add-text  add-text-margin"
                                      onClick={() => {
                                        let newArray = [...customizedMenu];
                                        newArray[index].subCategory.push({
                                          name: "",
                                          price: counter,
                                        });
                                        setcounter(counter + 1);
                                        setcustomizedMenu(newArray);
                                      }}
                                    >
                                      + Add Item
                                    </span>
                                  )}
                                  {u.subCategory.length !== i + 1 && (
                                    <FaTrash
                                      className="add-text-margin"
                                      color="#67833E"
                                      onClick={() => {
                                        let newArray = [...customizedMenu];
                                        // console.log(
                                        //   newArray[index].subCategory.splice(
                                        //     i,
                                        //     1
                                        //   )
                                        // );
                                        // console.log(
                                        //   newArray[index].subCategory
                                        // );

                                        newArray.filter((e, i) => {
                                          // console.log(`i::::::`, e, i);
                                        });
                                        // newArray[index].subCategory.splice(
                                        //   i,
                                        //   1
                                        // );
                                        console.log(`newArray`, newArray);
                                        setcustomizedMenu(newArray);
                                      }}
                                    />
                                  )}
                                </div>
                              );
                            })}
                            {customizedMenu.length === index + 1 && (
                              <span
                                className="add-text"
                                onClick={() => {
                                  const customizationMenu = {
                                    modifierName: "",
                                    numberofItem: "",
                                    serviceStream: [],
                                    subCategory: [{ name: "", price: "" }],
                                    mendatory: false,
                                  };
                                  let newArray = [
                                    ...customizedMenu,
                                    customizationMenu,
                                  ];
                                  setcustomizedMenu(newArray);
                                }}
                              >
                                + Add Group
                              </span>
                            )}

                            {/* <div className="customisation-container">
                              <div>
                                <TextInput
                                  type={"text"}
                                  placeholder={"Option (Item)"}
                                  name="portionSize"
                                />
                              </div>
                              <div style={{ marginLeft: "4rem" }}>
                                <TextInput
                                  type={"text"}
                                  placeholder={"Price"}
                                  name="portionSize"
                                />
                              </div>
                              <span
                                style={{ color: "#0085FF", marginLeft: "1rem" }}
                                onClick={() => console.log("Helllo,,,,")}
                              >
                                + Add Item
                              </span>
                            </div> */}
                          </>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </Fragment>
          )}
        </div>

        <div className="footer">
          <div className="plain-button button-text">Cancel</div>

          <div
            className="button button-text"
            onClick={() => {
              if (step === 1) {
                setstep(2);
              } else if (step === 2) {
                setstep(1);
              }
            }}
          >
            {step === 1 ? "Next Step" : "Review The Menu"}
          </div>
        </div>
      </div>

      {/* </div> */}
    </>
  );
};

export default AddItem;

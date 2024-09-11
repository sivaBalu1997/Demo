// src/mockData.ts

// Define the shape of the item'
import { useDispatch } from "react-redux";

interface PricingDetails {
  Dinein1: string[];
  Pickup1: string[];
  Delivery1: string[];
  Dinein2: string[];
  Pickup2: string[];
  Delivery2: string[];
  Inventory1: string[];
  Customize1: string[];
}

interface Item {
  id: number;
  name: string;
  code: string;
  type: string;
  mealType:string;
  dietary:string;
  cusine:string;
  pricingdetails: PricingDetails;

}

// Define your mock data
const truncateString = (str: string, length: number) => {
  return str.length > length ? str.substring(0, length) : str;
};

  export const itemsdata: Item[] = [
    {
      id: 1,
      name: "dosa",
      code: "12345",
      type:"steamedVeg",
      mealType:"Breakfast",
      dietary:"Vegan",
      cusine:"SouthIndian",
      pricingdetails: {
        Dinein1: ["$100.00", "$100.00"],
        Pickup1: ["$200.00", "$200.00", "$200.00"],
        Delivery1: ["$300.00", "$300.00", "$300.00"],
        Dinein2: ["Disabled", "Enabled"],
        Pickup2: ["Enabled", "Disabled", "Disabled"],
        Delivery2: ["Enabled", "Enabled", "Disabled"],
        Inventory1: ["$1000", "$10"],
        Customize1: ["5"],
      },
    },
    {
        id: 3,
        name: truncateString(" Mushroo", 14),
        code: "12345",
        type:"steamedVeg",
        mealType:"Lunch",
        dietary:"Nonveg",
        cusine:"NorthIndian",
        pricingdetails: {
          Dinein1: ["$400.00", "$600.00"],
          Pickup1: ["$700.00", "$700.00", "$200.00"],
          Delivery1: ["$300.00", "$300.00", "$300.00"],
          Dinein2: ["Enabled", "Enabled"],
          Pickup2: ["Enabled", "Enabled", "Enabled"],
          Delivery2: ["Enabled", "Enabled", "Enabled"],
          Inventory1: ["$1000", "$10"],
          Customize1: ["5"],
        },
      },
      {
        id: 4,
        name: truncateString("Creamy", 14),
        code: "12345",
        type:"steamedVeg",
        mealType:"Breakfast",
        dietary:"Vegan",
        cusine:"SouthIndian",
        pricingdetails: {
          Dinein1: ["$400..00", "$600.00"],
          Pickup1: ["$700.00", "$700.00", "$200.00"],
          Delivery1: ["$300.00", "$300.00", "$300.00"],
          Dinein2: ["Enabled", "Enabled"],
          Pickup2: ["Enabled", "Enabled", "Enabled"],
          Delivery2: ["Enabled", "Enabled", "Enabled"],
          Inventory1: ["$1000", "$10"],
          Customize1: ["5"],
        },
      },
      {
        id: 5,
        name: truncateString("idly Mushroo", 14),
        code: "12345",
        type:"steamedVeg",
        mealType:"Dinner",
        dietary:"Vegan",
        cusine:"SouthIndian",
        pricingdetails: {
          Dinein1: ["$400.00", "$600.00"],
          Pickup1: ["$700.00", "$700.00", "$200.00"],
          Delivery1: ["$300.00", "$300.00", "$300.00"],
          Dinein2: ["Enabled", "Enabled"],
          Pickup2: ["Enabled", "Enabled", "Enabled"],
          Delivery2: ["Enabled", "Enabled", "Enabled"],
          Inventory1: ["$1000", "$10"],
          Customize1: ["5"],
        },
      },
      {
        id: 2,
        name: truncateString("Creamy Mushroo", 14),
        code: "12345",
        type:"steamedVeg",
        mealType:"Breakfast",
        dietary:"Vegan",
        cusine:"SouthIndian",
        pricingdetails: {
          Dinein1: ["$1500.00", "$900.00"],
          Pickup1: ["$200.00", "$400.00", "$200.00"],
          Delivery1: ["$300.00", "$300.00", "$300.00"],
          Dinein2: ["Enabled", "Enabled"],
          Pickup2: ["Enabled", "Enabled", "Enabled"],
          Delivery2: ["Enabled", "Enabled", "Enabled"],
          Inventory1: ["$1200", "$10"],
          Customize1: ["5"],
        },
      },
      {
        id: 2,
        name: truncateString("Creamy Mushroo", 14),
        code: "12345",
        type:"steamedVeg",
        mealType:"Breakfast",
        dietary:"Vegan",
        cusine:"SouthIndian",
        pricingdetails: {
          Dinein1: ["$1500.00", "$900.00"],
          Pickup1: ["$200.00", "$400.00", "$200.00"],
          Delivery1: ["$300.00", "$300.00", "$300.00"],
          Dinein2: ["Enabled", "Enabled"],
          Pickup2: ["Enabled", "Enabled", "Enabled"],
          Delivery2: ["Enabled", "Enabled", "Enabled"],
          Inventory1: ["$1200", "$10"],
          Customize1: ["5"],
        },
      },
      {
        id: 2,
        name: truncateString("Creamy Mushroo", 14),
        code: "12345",
        type:"steamedVeg",
        mealType:"Breakfast",
        dietary:"Vegan",
        cusine:"SouthIndian",
        pricingdetails: {
          Dinein1: ["$1500.00", "$900.00"],
          Pickup1: ["$200.00", "$400.00", "$200.00"],
          Delivery1: ["$300.00", "$300.00", "$300.00"],
          Dinein2: ["Enabled", "Enabled"],
          Pickup2: ["Enabled", "Enabled", "Enabled"],
          Delivery2: ["Enabled", "Enabled", "Enabled"],
          Inventory1: ["$1200", "$10"],
          Customize1: ["5"],
        },
      },
      {
        id: 2,
        name: truncateString("Creamy Mushroo", 14),
        code: "12345",
        type:"steamedVeg",
        mealType:"Breakfast",
        dietary:"Vegan",
        cusine:"SouthIndian",
        pricingdetails: {
          Dinein1: ["$1500.00", "$900.00"],
          Pickup1: ["$200.00", "$400.00", "$200.00"],
          Delivery1: ["$300.00", "$300.00", "$300.00"],
          Dinein2: ["Enabled", "Enabled"],
          Pickup2: ["Enabled", "Enabled", "Enabled"],
          Delivery2: ["Enabled", "Enabled", "Enabled"],
          Inventory1: ["$1200", "$10"],
          Customize1: ["5"],
        },
      },
      {
        id: 2,
        name: truncateString("Creamy Mushroo", 14),
        code: "12345",
        type:"steamedVeg",
        mealType:"Breakfast",
        dietary:"Vegan",
        cusine:"SouthIndian",
        pricingdetails: {
          Dinein1: ["$1500.00", "$900.00"],
          Pickup1: ["$200.00", "$400.00", "$200.00"],
          Delivery1: ["$300.00", "$300.00", "$300.00"],
          Dinein2: ["Enabled", "Enabled"],
          Pickup2: ["Enabled", "Enabled", "Enabled"],
          Delivery2: ["Enabled", "Enabled", "Enabled"],
          Inventory1: ["$1200", "$10"],
          Customize1: ["5"],
        },
      },
      {
        id: 2,
        name: truncateString("Creamy Mushroo", 14),
        code: "12345",
        type:"steamedVeg",
        mealType:"Breakfast",
        dietary:"Vegan",
        cusine:"SouthIndian",
        pricingdetails: {
          Dinein1: ["$1500.00", "$900.00"],
          Pickup1: ["$200.00", "$400.00", "$200.00"],
          Delivery1: ["$300.00", "$300.00", "$300.00"],
          Dinein2: ["Enabled", "Enabled"],
          Pickup2: ["Enabled", "Enabled", "Enabled"],
          Delivery2: ["Enabled", "Enabled", "Enabled"],
          Inventory1: ["$1200", "$10"],
          Customize1: ["5"],
        },
      },
      {
        id: 2,
        name: truncateString("Creamy Mushroo", 14),
        code: "12345",
        type:"steamedVeg",
        mealType:"Breakfast",
        dietary:"Vegan",
        cusine:"SouthIndian",
        pricingdetails: {
          Dinein1: ["$1500.00", "$900.00"],
          Pickup1: ["$200.00", "$400.00", "$200.00"],
          Delivery1: ["$300.00", "$300.00", "$300.00"],
          Dinein2: ["Enabled", "Enabled"],
          Pickup2: ["Enabled", "Enabled", "Enabled"],
          Delivery2: ["Enabled", "Enabled", "Enabled"],
          Inventory1: ["$1200", "$10"],
          Customize1: ["5"],
        },
      },
      {
        id: 2,
        name: truncateString("Creamy Mushroo", 14),
        code: "12345",
        type:"steamedVeg",
        mealType:"Breakfast",
        dietary:"Vegan",
        cusine:"SouthIndian",
        pricingdetails: {
          Dinein1: ["$1500.00", "$900.00"],
          Pickup1: ["$200.00", "$400.00", "$200.00"],
          Delivery1: ["$300.00", "$300.00", "$300.00"],
          Dinein2: ["Enabled", "Enabled"],
          Pickup2: ["Enabled", "Enabled", "Enabled"],
          Delivery2: ["Enabled", "Enabled", "Enabled"],
          Inventory1: ["$1200", "$10"],
          Customize1: ["5"],
        },
      },
    
  ];
  
  export const itemsfooddata: Item[] = [
    {
      id: 11,
      name: "Chicken",
      code: "12345",
      type:"steamedNonVeg",
      mealType:"Breakfast",
      dietary:"Vegan",
      cusine:"SouthIndian",
      pricingdetails: {
        Dinein1: ["$900.00", "$100.00"],
        Pickup1: ["$200.00", "$200.00", "$200"],
        Delivery1: ["$300.00", "$300", "$300"],
        Dinein2: ["Enabled", "Enabled"],
        Pickup2: ["Enabled", "Enabled", "Enabled"],
        Delivery2: ["Enabled", "Enabled", "Enabled"],
        Inventory1: ["$100", "$10"],
        Customize1: ["5"],
      },
    },
    {
        id: 31,
        name: truncateString("Fish", 14),
        code: "12345",
        type:"steamedNonVeg",
        mealType:"Breakfast",
        dietary:"Vegan",
        cusine:"SouthIndian",
        pricingdetails: {
          Dinein1: ["$400", "$600"],
          Pickup1: ["$700", "$700", "$200"],
          Delivery1: ["$300", "$300", "$300"],
          Dinein2: ["Enabled", "Enabled"],
          Pickup2: ["Enabled", "Enabled", "Enabled"],
          Delivery2: ["Enabled", "Enabled", "Enabled"],
          Inventory1: ["$1000", "$10"],
          Customize1: ["5"],
        },
      },
      {
        id: 41,
        name: truncateString("Mutton", 14),
        code: "12345",
        type:"steamedNonVeg",
        mealType:"Breakfast",
        dietary:"Vegan",
        cusine:"SouthIndian",
        pricingdetails: {
          Dinein1: ["$400", "$600"],
          Pickup1: ["$700", "$700", "$200"],
          Delivery1: ["$300", "$300", "$300"],
          Dinein2: ["Enabled", "Enabled"],
          Pickup2: ["Enabled", "Enabled", "Enabled"],
          Delivery2: ["Enabled", "Enabled", "Enabled"],
          Inventory1: ["$1000", "$10"],
          Customize1: ["5"],
        },
      },
      {
        id: 51,
        name: truncateString("Chicken 65", 14),
        code: "12345",
        type:"steamedNonVeg",
        mealType:"Breakfast",
        dietary:"Vegan",
        cusine:"SouthIndian",
        pricingdetails: {
          Dinein1: ["$400", "$600"],
          Pickup1: ["$700", "$700", "$200"],
          Delivery1: ["$300", "$300", "$300"],
          Dinein2: ["Enabled", "Enabled"],
          Pickup2: ["Enabled", "Enabled", "Enabled"],
          Delivery2: ["Enabled", "Enabled", "Enabled"],
          Inventory1: ["$1000", "$10"],
          Customize1: ["5"],
        },
      },
      {
        id: 21,
        name: truncateString("Chicken roll", 14),
        code: "12345",
        type:"steamedNonVeg",
        mealType:"Breakfast",
        dietary:"Vegan",
        cusine:"SouthIndian",
        pricingdetails: {
          Dinein1: ["$1500", "$900"],
          Pickup1: ["$200", "$400", "$200"],
          Delivery1: ["$300", "$300", "$300"],
          Dinein2: ["Enabled", "Enabled"],
          Pickup2: ["Enabled", "Enabled", "Enabled"],
          Delivery2: ["Enabled", "Enabled", "Enabled"],
          Inventory1: ["$1200", "$10"],
          Customize1: ["5"],
        },
      },
      {
        id: 21,
        name: truncateString("Creamy Mushroo", 14),
        code: "12345",
         type:"steamedNonVeg",
         mealType:"Breakfast",
         dietary:"Vegan",
         cusine:"SouthIndian",
        pricingdetails: {
          Dinein1: ["$1500", "$900"],
          Pickup1: ["$200", "$400", "$200"],
          Delivery1: ["$300", "$300", "$300"],
          Dinein2: ["Enabled", "Enabled"],
          Pickup2: ["Enabled", "Enabled", "Enabled"],
          Delivery2: ["Enabled", "Enabled", "Enabled"],
          Inventory1: ["$1200", "$10"],
          Customize1: ["5"],
        },
      },
  ];
  
  export const imageslist = [
    { name: "gluten", id: "1234" },
    { name: "Coconut", id: "2762" },
    { name: "gluten", id: "9857" },
    { name: "Soy", id: "4199" },
    { name: "gluten", id: "1618" },
    { name: "Egg", id: "5521" },
    { name: "Egg", id: "2588" },
    { name: "Shellfish", id: "8760" },
    { name: "Dairy", id: "9276" },
    { name: "gluten", id: "2751" },
    { name: "Fish", id: "2625" },
    { name: "Legumes", id: "8307" },
    { name: "gluten", id: "5940" },
    { name: "nuts", id: "3915" },
    { name: "gluten", id: "9163" },
  ];
  
  export const dietarytype = [
    { id: "1", name: "Vegan" },
    { id: "2", name: "vegetarian" },
    { id: "3", name: "Indian" },
    { id: "4", name: "Chinese" },
    { id: "5", name: "American" },
  ];
  
  export const cuisine = [
    { id: "1", name: "French" },
    { id: "2", name: "Mexican" },
    { id: "3", name: "Indian" },
    { id: "4", name: "Chinese" },
    { id: "5", name: "American" },
  ];
  
  export const mealType = [
    { id: "1", name: "Breakfast" },
    { id: "2", name: "Lunch" },
    { id: "3", name: "Dinner" },
  ];
  
  export const bestPair = [
    { id: "1", name: "Chilly chutney" },
    { id: "2", name: "Idli Podi" },
    { id: "3", name: "Chicken gravy" },
  ];
  
  export const subcategory = [
    { id: "1", name: "Soup" },
    { id: "2", name: "Salad" },
    { id: "3", name: "Sandwich" },
  ];
  
  export const alcoholradio = [
    { value: "yes", label: "yes" },
    { value: "no", label: "no" },
  ];
  
  export const calorieponitradio = [
    { value: "per100grams", label: "per 100 grams " },
    { value: "perserving", label: "per serving" },
  ];
  
  export const portionsizeradio = [
    { value: "Portion(count)", label: "Portion(count)" },
    { value: "grams/ml", label: "grams/ml" },
  ];

export const combinedItemsData: Item[] = [...itemsdata, ...itemsfooddata];

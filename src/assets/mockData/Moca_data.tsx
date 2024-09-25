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
  itemName: string;
  itemCode: string;
  type: string;
  mealType: string;
  dietary: string;
  cusine: string;
  pricingdetails: PricingDetails;
}

// Define your mock data
const truncateString = (str: string, length: number) => {
  return str.length > length ? str.substring(0, length) : str;
};

export const itemsdata: Item[] = [
  {
    id: 1,
    itemName: "dosa",
    itemCode: "12345",
    type: "steamedVeg",
    mealType: "Breakfast",
    dietary: "Vegan",
    cusine: "SouthIndian",
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
    id: 2,
    itemName: "Musroom Gravy",
    itemCode: "12345",
    type: "steamedVeg",
    mealType: "Lunch",
    dietary: "Nonveg",
    cusine: "NorthIndian",
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
    id: 3,
    itemName: "Creamy Pasta",
    itemCode: "12345",
    type: "steamedVeg",
    mealType: "Breakfast",
    dietary: "Vegan",
    cusine: "SouthIndian",
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
    itemName: "Masala idly",
    itemCode: "12345",
    type: "steamedVeg",
    mealType: "Dinner",
    dietary: "Vegan",
    cusine: "SouthIndian",
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
    id: 5,
    itemName: "Podi Idly",
    itemCode: "12345",
    type: "steamedVeg",
    mealType: "Breakfast",
    dietary: "Vegan",
    cusine: "SouthIndian",
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
    id: 6,
    itemName: "Utthappam",
    itemCode: "12345",
    type: "steamedVeg",
    mealType: "Breakfast",
    dietary: "Vegan",
    cusine: "SouthIndian",
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
    id: 7,
    itemName: "Creamy Mushroom",
    itemCode: "12345",
    type: "steamedVeg",
    mealType: "Breakfast",
    dietary: "Vegan",
    cusine: "SouthIndian",
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
    id: 8,
    itemName: truncateString("Creamy Mushroo", 14),
    itemCode: "12345",
    type: "steamedVeg",
    mealType: "Breakfast",
    dietary: "Vegan",
    cusine: "SouthIndian",
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
    id: 9,
    itemName: truncateString("Creamy Mushroo", 14),
    itemCode: "12345",
    type: "steamedVeg",
    mealType: "Breakfast",
    dietary: "Vegan",
    cusine: "SouthIndian",
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
    id: 10,
    itemName: truncateString("Creamy Mushroo", 14),
    itemCode: "12345",
    type: "steamedVeg",
    mealType: "Breakfast",
    dietary: "Vegan",
    cusine: "SouthIndian",
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
    id: 11,
    itemName: truncateString("Creamy Mushroo", 14),
    itemCode: "12345",
    type: "steamedVeg",
    mealType: "Breakfast",
    dietary: "Vegan",
    cusine: "SouthIndian",
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
    id: 12,
    itemName: truncateString("Creamy Mushroo", 14),
    itemCode: "12345",
    type: "steamedVeg",
    mealType: "Breakfast",
    dietary: "Vegan",
    cusine: "SouthIndian",
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
    id: 13,
    itemName: "Chicken",
    itemCode: "12345",
    type: "steamedNonVeg",
    mealType: "Breakfast",
    dietary: "Vegan",
    cusine: "SouthIndian",
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
    id: 14,
    itemName: truncateString("Fish", 14),
    itemCode: "12345",
    type: "steamedNonVeg",
    mealType: "Breakfast",
    dietary: "Vegan",
    cusine: "SouthIndian",
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
    id: 15,
    itemName: truncateString("Mutton", 14),
    itemCode: "12345",
    type: "steamedNonVeg",
    mealType: "Breakfast",
    dietary: "Vegan",
    cusine: "SouthIndian",
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
    id: 16,
    itemName: truncateString("Chicken 65", 14),
    itemCode: "12345",
    type: "steamedNonVeg",
    mealType: "Breakfast",
    dietary: "Vegan",
    cusine: "SouthIndian",
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
    id: 17,
    itemName: truncateString("Chicken roll", 14),
    itemCode: "12345",
    type: "steamedNonVeg",
    mealType: "Breakfast",
    dietary: "Vegan",
    cusine: "SouthIndian",
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
    id: 18,
    itemName: truncateString("Creamy Mushroo", 14),
    itemCode: "12345",
    type: "steamedNonVeg",
    mealType: "Breakfast",
    dietary: "Vegan",
    cusine: "SouthIndian",
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

// export const dietarytype = [
//   { id: "1", name: "Vegan" },
//   { id: "2", name: "vegetarian" },
//   { id: "3", name: "Indian" },
//   { id: "4", name: "Chinese" },
//   { id: "5", name: "American" },
// ];

export const dietarytype = [
  {
    name: "Jain",
    id: "40ee43b4-c55f-4d99-a059-3f7bfa71906f",
    canDelete: false,
    media: { id: "jainSVG", imageName: "img/svg" },
  },
  {
    name: "Spicy",
    id: "42ee43b4-c55f-4d99-a059-3f7bfa71906f",
    canDelete: false,
    media: { id: "spicySVG", imageName: "img/svg" },
  },
  {
    name: "Vegan",
    id: "38ee43b4-c55f-4d99-a059-3f7bfa71906f",
    canDelete: false,
    media: { id: "veganSVG", imageName: "img/svg" },
  },
];

export const cuisine = [
  {
    name: "South Indian",
    id: "550b6df0-f7fe-4b7f-a8a8-d2214b1483b3",
    canDelete: false,
  },
];

export const mealType = [
  {
    id: "123",
    name: "Starters",
    canDelete: "false",
    media: {
      imageId: "",
      imageType: "",
    },
  },
  {
    id: "123",
    name: "Vegan",
    canDelete: "false",
    media: {
      imageId: "",
      imageType: "",
    },
  },
  {
    id: "123",
    name: "vegetarian",
    canDelete: "false",
    media: {
      imageId: "",
      imageType: "",
    },
  },
  {
    id: "123",
    name: "Halal",
    canDelete: "false",
    media: {
      imageId: "",
      imageType: "",
    },
  },
];

export const bestPairType = [
  {
    name: "Paneer Fried Rice",
    id: "0074afc7-719b-43a8-a948-bbda0fd6f9c3",
    canDelete: false,
  },
  {
    name: "Strawberry Milkshake",
    id: "01601102-5fc1-4b80-80a1-3788e6c563cc",
    canDelete: false,
  },
  {
    name: "Rasmalai",
    id: "03a55d87-ac6e-4982-a56f-946a70b388bb",
    canDelete: false,
  },
  {
    name: "Kashmiri Pulao",
    id: "041c0511-3b29-4d94-800e-ab565910519d",
    canDelete: false,
  },
];

export const subcategory = [
  {
    name: "Margaritas",
    id: "00ec9dfc-ae67-4181-8423-7ffd8a34cc1e",
    canDelete: false,
  },
  {
    name: "Refreshers",
    id: "0ea3ebb0-1233-4986-be72-1056801f7b35",
    canDelete: false,
  },
  {
    name: "Mojitos",
    id: "a4bf5eed-7b1e-419a-9c91-531eb6ce4f75",
    canDelete: false,
  },
  {
    name: "Crushers",
    id: "d5cdcfc1-d4d1-4621-9c44-e1572a00662d",
    canDelete: false,
  },
];

export const categoryType = [
  {
    name: "Margaritas",
    id: "00ec9dfc-ae67-4181-8423-7ffd8a34cc1e",
    canDelete: false,
  },
  {
    name: "Quesadilla",
    id: "029aa3d4-c2ba-4a2a-9145-d36d0f48a8f5",
    canDelete: false,
  },
  {
    name: "Breeze Of Bessy",
    id: "0a4f42fe-18ad-40cd-9d72-c44874023cea",
    canDelete: false,
  },
  {
    name: "Couples (Two Flavours)",
    id: "0a692c2b-dc28-4ef6-b197-9e43579d2d87",
    canDelete: false,
  },
  {
    name: "Refreshers",
    id: "0ea3ebb0-1233-4986-be72-1056801f7b35",
    canDelete: false,
  },
  {
    name: "Noodles",
    id: "0ee24a11-3ec1-4daf-9404-def72fcf8050",
    canDelete: false,
  },
  {
    name: "Burgers",
    id: "13ddc3bc-0ee7-4fa0-970d-3afda2b205db",
    canDelete: false,
  },
  {
    name: "Coffee Shots (Introducing)",
    id: "22add96d-f999-4e6a-97b7-45dd1889c14c",
    canDelete: false,
  },
  {
    name: "Desserts & Pastries",
    id: "2afc67eb-2012-4991-9c9c-100f33cc1067",
    canDelete: false,
  },
  {
    name: "Pizza",
    id: "3ce84836-d291-4cdc-a125-279a583f2b70",
    canDelete: false,
  },
  {
    name: "Hot Beverages",
    id: "4633e872-b490-4f3c-b222-7a3bb4a9c784",
    canDelete: false,
  },
  {
    name: "Salads",
    id: "47af876d-aa44-447d-8346-7dc0627f51bb",
    canDelete: false,
  },
  {
    name: "Pasta",
    id: "49c49839-d440-43e8-8b80-2f351e413f6c",
    canDelete: false,
  },
  {
    name: "Mocktails",
    id: "5352f13a-ce70-4808-bd32-54dcd80eb99d",
    canDelete: false,
  },
  {
    name: "Appetizers",
    id: "55da581c-071d-4eda-80c2-0a9933e1845d",
    canDelete: false,
  },
  {
    name: "test",
    id: "5a14a75f-26b5-48a2-9214-92c8081aafef",
    canDelete: false,
  },
  {
    name: "Bunny Chow",
    id: "60354ba0-4324-4161-86a6-30af62d65a53",
    canDelete: false,
  },
  {
    name: "Iced Teas",
    id: "6115349c-e145-48b6-9319-915001af0662",
    canDelete: false,
  },
  {
    name: "Crepes (Classic with egg or eggless)",
    id: "6724eb95-8f39-477d-b87f-e51786384fd0",
    canDelete: false,
  },
  {
    name: "Soups",
    id: "67d531f7-9a3b-47a9-9d1f-0f9c50b4c18e",
    canDelete: false,
  },
  {
    name: "Non- Veg",
    id: "6a6c5bf9-8d69-472c-bee3-81596737c635",
    canDelete: false,
  },
  {
    name: "Fresh Juices",
    id: "6e2a1c38-cd45-49a9-9c7b-4408199ff707",
    canDelete: false,
  },
  {
    name: "Sandwiches",
    id: "7290b700-af0f-445f-86b9-5fba6fd1a06e",
    canDelete: false,
  },
  {
    name: "French Fries",
    id: "7b17cf1b-8268-45aa-a879-8b6e25a6660a",
    canDelete: false,
  },
  {
    name: "panner",
    id: "7f0024f9-abea-4bdc-9e8a-32b25edd17e2",
    canDelete: false,
  },
  {
    name: "Bachelors (Single Flavour)",
    id: "7fd36187-765f-432c-9392-ec9c27f4e0c4",
    canDelete: false,
  },
  { name: "veg", id: "80eae053-5ce0-47bb-a666-18eddc855261", canDelete: false },
  { name: "test", id: "82bfa3c5-feea-4f60-9b1e-9e4c14dc34bb", canDelete: true },
  {
    name: "Dessert Chaat (Introducing)",
    id: "87c9e37e-f69e-456f-8f9e-f3351f5dd7df",
    canDelete: false,
  },
  {
    name: "Cold Coffee",
    id: "985a3b4b-94b3-42a4-a437-9f8205c66eec",
    canDelete: false,
  },
  { name: "Veg", id: "9c335c6c-9b25-40ae-b0f7-1f3ff3722fac", canDelete: false },
  {
    name: "Maincourse",
    id: "a2cd1876-7d46-4bfb-a403-c2bec56c4d43",
    canDelete: false,
  },
  {
    name: "Mojitos",
    id: "a4bf5eed-7b1e-419a-9c91-531eb6ce4f75",
    canDelete: false,
  },
  { name: "Q1", id: "a83cd75f-fd42-4597-b014-72a4e0048aaa", canDelete: false },
  {
    name: "Lemonades",
    id: "b664cca6-d915-4d5a-a556-6f2e175aaea9",
    canDelete: false,
  },
  {
    name: "Milkshakes",
    id: "b6eea1ae-6bd3-4a27-b771-cbdc0cc30f1c",
    canDelete: false,
  },
  {
    name: "Platters",
    id: "c212cbaf-d57c-4689-ab62-996303ce2706",
    canDelete: false,
  },
  {
    name: "Desserts",
    id: "d1ddfd6f-af4f-447b-9ebc-d7d58fc87285",
    canDelete: false,
  },
  {
    name: "Waffles",
    id: "d5af67a3-2cb6-488b-87f0-c7679cd0755e",
    canDelete: false,
  },
  {
    name: "Crushers",
    id: "d5cdcfc1-d4d1-4621-9c44-e1572a00662d",
    canDelete: false,
  },
  {
    name: "test",
    id: "de114500-7aea-4b13-abde-15d0061e4cb7",
    canDelete: false,
  },
  {
    name: "Fajitas",
    id: "ff755396-48ad-4263-b729-46d34d45d8c5",
    canDelete: false,
  },
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

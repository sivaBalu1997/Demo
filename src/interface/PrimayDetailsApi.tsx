export interface primaryDetails {
    locationId: string;
    itemCode: string;
    altName: string;
    itemName: string;
    description: string;
    price: string;
    categoryId: string;
    subCategoryId: string;
    kitchenStations: string[];
    taxFeeId: string;
    ingredients: string[];
    modifiers: any[];
    availabilityId: string[];
    category: string;
    subCategory: string;
    itemId: string | null;
}
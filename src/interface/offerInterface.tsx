export interface OfferType {
    id: any
    locationId: any
    offerName: string
    offerCode: string|null
    offerType: any|null
    offerRate: any
    minOrderAmount: number|null
    maxDiscount: number|null
    maxRedeem: any
    redeemedSofar: number
    order_type_id: string|null
    offerTerms: any
    validityFrom: any
    validityUntil: any
    isEnabled: number
    offerAttributes: OfferAttributes
  }
  
  export interface OfferAttributes {
    description: string|null
    outlets: any[]
    validOn: any[]
    usageFrequencePerCustomer: any
    usagePerCustomerPerDay: any
    maxUsageAcrossAllTranscation: number|null
    visibleTo: any[]
    currencyType: string
    offerBasedOn: number
    itemDetails: ItemDetails
  }
  
  export interface ItemDetails {
    itemCode: any
    itemQuantity: number|null
    discountType: any
    offersAppliedAt: any
    scaleLevel: string[]
  }
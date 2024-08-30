export interface Credentials {
  accessToken: string
  address: string
  attributes: string
  authUserId: string 
  blockUser: boolean
  businessName: string
  dateOfBirth: string
  defaultDeviceId: string
  defaultFunctionalityAccessUpdated: boolean
  deviceIdentifier: string
  devicePin: number
  deviceType: string
  education: string 
  email: string
  favoriteTables: string[]
  firstName: string
  fullName: string
  id: string
  isSuperAdminAccess: boolean
  isTempPassword: boolean
  lastName: string
  locationId: string
  merchantId: string
  mobileNumber: string
  myTableViewSectionExists: boolean
  nickName: string
  outlet: string
  password: string
  refreshToken: string
  role: string
  toUseNickName: boolean
  topicToSubscribe: string
  userAccessInfoList: string
  userId: string
}

//Auth Reducer Type
export interface OrderType {
  id: string;
  locationId: string;
  typeName: string;
  typeGroup: string;
  codLimit: number | null;
  isEnabled: number;
  minOrderAmount: number;
  orderTax: number | null;
}

interface Cuisine {
  id: string;
  tagName: string;
}

export interface RestaurantDetails {
  id: string;
  branchName: string;
  aboutUs: string | null;
  address: string;
  addressline2: string | null;
  state: string | null;
  pincode: string | null;
  locationSlug: string;
  open: number;
  city: string;
  country: string;
  branch: Array<{
      id: string;
      locationName: string;
      locationSlug: string;
      rating: number;
      latitude: number;
      longitude: number;
      cost: string;
      orderTypes: OrderType[];
      cusine: string[];
      isOpen: number;
      serviceDisable: {
          sms: number;
          onlineOrder: number | null;
          onlineCheckIn: number;
          email: number;
          whatsappSms: number;
          checkInWhatsapp: number;
      };
      media: Array<{
          id: string;
          entityType: string;
          mimeType: string;
          entityId: string | null;
      }>;
  }>;
  media: Array<{
      id: string;
      entityType: string;
      mimeType: string;
      entityId: string | null;
  }>;
  rating: number;
  cost: string | null;
  phoneNumber: string;
  highChair: number;
  dining: number;
  digitalMenu: number;
  orderManagement: number;
  takeAway: number;
  onlineOrder: number;
  onlineCheckin: number;
  maxCheckinWaitThreshold: number;
  maxOnlineCheckin: number;
  maxOfflineCheckin: number;
  defaultPickUpETA: number;
  defaultDeliveryETA: number;
  deliveryKMRadius: number;
  pickUpKMRadius: number;
  reservationBufferTime: number;
  isMasterLocation: number;
  shareTable: number;
  onlineCutoff: string | null;
  pickupCutoff: string | null;
  cancellationPolicy: string | null;
  printKOT: number;
  printReceipt: number;
  delivery: number;
  quickCheckIn: number;
  pickupCutOffTimeExceeds: number;
  deliveryCutOffTimeExceeds: number;
  additionalPrintSpace: number;
  vertical: string | null;
  defaultTax: {
      orderTypeId: string | null;
      type: string;
      name: string;
      rate: number;
  };
  gstNo: string | null;
  cuisine: Cuisine[];
  redirectUrl: string | null;
  paymentProvider: {
      paymentServiceProviderId: string;
      locationId: string;
      paymentProviderId: string;
      classData: string;
  };
  locationDeliveryProviders: any; 
  parking: any; 
  cards: string[];
  pref: string[];
  tableSection: Array<{
      id: string;
      sectionName: string;
  }>;
  safetyMeasures: any; 
  workingHours: Array<{
      locationId: string;
      weekday: string;
      openingTime: string;
      closingTime: string;
      onlineCutoff: string | null;
      pickupCutoff: string | null;
  }>;
  facilities: any; 
  orderTypes: OrderType[];
}

export interface AuthCred {
  id: string;
  merchantId: string;
  locationId: string;
  businessName: string;
  email: string | null;
  userId: string;
  fullName: string;
  password: string | null;
  mobileNumber: string | null;
  authUserId: string | null;
  devicePin: string | null;
  accessToken: string;
  refreshToken: string;
  deviceIdentifier: string | null;
  deviceType: string | null;
  role: string | null;
  blockUser: string | null;
  attributes: any; 
  defaultDeviceId: string | null;
  isSuperAdminAccess: boolean;
  favoriteTables: any[]; 
  topicToSubscribe: string;
  myTableViewSectionExists: boolean;
  isTempPassword: boolean;
}

export interface SelectedBranch {
  cost:string
  cusine:string[]
  id:string
  isOpen:number
  latitude:number
  locationName:string
  locationSlug:string
  longitude:number
  media: Array<{
    entityId: string;
    entityType: string;
    id: string;
    mimeType: string;
  }>;
  orderTypes: Array<{
    codLimit: string | null;
    id: string;
    isEnabled: boolean;
    locationId: string;
    minOrderAmount: number;
    orderTax: string | null;
    typeGroup: string;
    typeName: string;
  }>;
  rating:number 
  serviceDisable:{
    checkInWhatsapp:number
    email:number
    onlineCheckIn:number
    onlineOrder:number
    sms:number
    whatsappSms:number
  }
}

export interface AuthType {
  credentials: Credentials|null;
  otpVerifiedSuccess: boolean;
  resetPasswordLoading: boolean;
  resetPasswordSuccess: boolean;
  getRestaurantLoading: boolean;
  getRestaurantSuccess: boolean;
  otpVerficationLoading: boolean;
  restaurantDetails: RestaurantDetails|null;
  selectedBranch: SelectedBranch|null;
  signedIn: boolean;
  signInLoading: boolean;
  signInMessage: string;
  signedUp: boolean;
  signUpLoading: boolean;
  signUpMessage: string;
  user: any; 
  userID: string | null;
}

export interface AuthAction {
  type: string;
  payload?: any;
}




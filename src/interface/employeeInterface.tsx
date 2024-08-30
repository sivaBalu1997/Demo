export interface EmployeeType {
    staffId: string
    firstName: string 
    lastName: string 
    isActive: boolean 
    role: string 
    isDefaultFunctionalityAccessupdated: boolean
    defaultFunctionalityAccessUpdated?: boolean
}

export interface RolesAndFunctions {
    module: string;
    functionality: RoleType[];
    funtions?:RoleType[];
    displayName?: string
  }

export interface RoleType{
    displayName?: string
    name:string
    urls:string[]
    roles:string[]
    moduleName?:string
}

export interface EmployeeIdByDetails {
    staffId?: string;
    firstName?: string;
    lastName?: string;
    assignedRole?: string;
    userId?: string;
    pin?: string;
    nickName?: string;
    email?: string;
    phone?: string;
    address?: string;
    dateOfBirth?: string;
    education?: string;
    locationName?: string;
    isActive?: boolean;
    isDefaultFunctionalityAccessUpdated?: boolean;
    toUseNickName?: boolean;
    rolesAndFunctions?: RolesAndFunctions[];
    outlet?:string;
    role?: string;
    defaultFunctionalityAccessUpdated?:boolean
  }

export interface EmployeeAction {
    type: string;
    payload?: any;
}

export interface EditEmployeeType {
    firstName: string
    lastName: string
    mobileNumber: string
    nickName : string
    education: string
    role: string
    email: string
    pin: string
    dateOfBirth: string
    userId: string
    outlet: string
    staffId: string
    rolesAndFunctions: RolesAndFunctions[]
}
export const employeeData = [
    {   
        firstName : 'Siddharth',
        lastName : '',
        isBlocked : false,
        isDefaultActionsUpdated : false,
        role : 'Waiter',
        staffId : '122'

    },
    {
        firstName : 'Shreenath',
        lastName : '',
        isBlocked : true,
        isDefaultActionsUpdated : false,
        role : 'Manager',
        staffId : '124'
    },
    {
        firstName : 'Vignesh',
        lastName : '',
        isBlocked : true,
        isDefaultActionsUpdated : true,
        role : 'Waiter',
        staffId : '125'
    },
    {
        firstName : 'Saravanan',
        lastName : '',
        isBlocked : true,
        isDefaultActionsUpdated : false,
        role : 'Supervisor',
        staffId : '126'
    },
    {
        firstName : 'Rahul',
        lastName : '',
        isBlocked : false,
        isDefaultActionsUpdated : true,
        role : 'Chef',
        staffId : '127'
    },
    {
        firstName : 'Ram',
        lastName : '',
        isBlocked : false,
        isDefaultActionsUpdated : false,
        role : 'Chef',
        staffId : '128'
    },
    {
        firstName : 'Aditya',
        lastName : '',
        isBlocked : false,
        isDefaultActionsUpdated : false,
        role : 'Waiter',
        staffId : '129'
    },
    {
      firstName : 'Bharathy',
      lastName : '',
      isBlocked : false,
      isDefaultActionsUpdated : false,
      role : 'Waiter',
      staffId : '130'
    },
    {
      firstName : 'Shruthi',
      lastName : '',
      isBlocked : false,
      isDefaultActionsUpdated : false,
      role : 'System Admin',
      staffId : '131'
    },
]


export const employeeByIdData = [
    {
        "staffId": "123",
        "firstName": "Sandy",
        "lastName": "K",
        "assignedRole": "Chef",
        "userId": "123",
        "pin": "1234",
        "nickName": "xyz",
        "email": "xyz@gmail.com",
        "phone": "+1212123",
        "address": "10-93 ,dif,xyz",
        "dateOfBirth": "23/09/2000",
        "education": "B.E",
        "locationId": "456",
        "locationName": "xyz-madurai",
        "startDate": "01/06/2024",
        "isDefaultActionsUpdated": true,
        "rolesAndFunctions": [
          {
            "module": "Check-in",
            "functions": [
              {
                "name": "Create-Checkin"
              }
            ]
          }
        ]
    },
    {
        "staffId": "124",
        "firstName": "abc",
        "lastName": "R",
        "assignedRole": "Chef",
        "userId": "123",
        "pin": "1234",
        "nickName": "xyz",
        "email": "xyz@gmail.com",
        "phone": "+1212123",
        "address": "10-93 ,dif,xyz",
        "dateOfBirth": "23/09/2000",
        "education": "B.E",
        "locationId": "456",
        "locationName": "xyz-madurai",
        "startDate": "01/06/2024",
        "isDefaultActionsUpdated": true,
        "rolesAndFunctions": [
          {
            "module": "check-in",
            "functions": [
              {
                "name": "create checkin"
              }
            ]
          }
        ]
    },
    {
        "staffId": "125",
        "firstName": "efg",
        "lastName": "R",
        "assignedRole": "Chef",
        "userId": "123",
        "pin": "1234",
        "nickName": "xyz",
        "email": "xyz@gmail.com",
        "phone": "+1212123",
        "address": "10-93 ,dif,xyz",
        "dateOfBirth": "23/09/2000",
        "education": "B.E",
        "locationId": "456",
        "locationName": "xyz-madurai",
        "startDate": "01/06/2024",
        "isDefaultActionsUpdated": true,
        "rolesAndFunctions": [
          {
            "module": "check-in",
            "functions": [
              {
                "name": "create checkin"
              }
            ]
          }
        ]
    },
    {
        "staffId": "126",
        "firstName": "jks",
        "lastName": "R",
        "assignedRole": "Chef",
        "userId": "123",
        "pin": "1234",
        "nickName": "xyz",
        "email": "xyz@gmail.com",
        "phone": "+1212123",
        "address": "10-93 ,dif,xyz",
        "dateOfBirth": "23/09/2000",
        "education": "B.E",
        "locationId": "456",
        "locationName": "xyz-madurai",
        "startDate": "01/06/2024",
        "isDefaultActionsUpdated": true,
        "rolesAndFunctions": [
          {
            "module": "check-in",
            "functions": [
              {
                "name": "create checkin"
              }
            ]
          }
        ]
    }
]


export const functionData = [
  {
    module : 'CheckIn',
    functionality : [
      "Create CheckIn",
      "Assign CheckIn",
      "Cancel CheckIn",
      "Edit Guest Count",
      "Edit Wait Times"
    ]
  },
  {
    module : 'Menu',
    functionality : [
      'Edit Inventory',
      'View Menu',
      'Add to special menu',
      'On/Off/edit item customize',
      'On/Off/edit item available',
    ]
  },
  {
    module : 'Service',
    functionality : [
      'Enable Disable menu',
      'Enable Disable delivery',
      'Enable Disable pickup',
    ]
  },
  {
    module :'OtherFunctions',
    functionality : [
      'Access Reports',
      'Delivery Management view',
    ]
  }
]

export const rolesAndFunction = [
  {
    module: "service",
    functionality: [
      {
        name: ["enable disable menu"],
        urls: ["enable/disable/menu"],
        roles: ["Restaurant Manager"],
      },
    ],
  },
  {
    module: "service",
    functionality: [
      {
        name: ["enable disable delivery"],
        urls: ["enable/disable/delivery"],
        roles: ["Restaurant Manager"],
      },
    ],
  },
  {
    module: "check-in",
    functionality: [
      {
        name: "create checkin", 

        urls: ["/create/checkin"],
        roles: ["Restaurant Owner"]
      }
    ]
  },
  {
    module: "menu",
    functionality: [
      {
        name: ["edit inventory"],
        urls: ["/edit/inventory"],
        roles: ["Supervisor"]
      }
    ]
  },
  {
    module: "menu",
    functionality: [
      {
        name: ["view menu"],
        urls: ["view/menu"],
        roles: ["Supervisor"]
      }
    ]
  },
  {
    module: "other functions",
    functionality: [
      {
        name: ["access reports"],
        urls: ["access/reports"],
        roles: ["Chef"]
      }
    ]
  },
  {
    module: "other functions",
    functionality: [
      {
        name: ["delivery management view"],
        urls: ["delivery/management/view"],
        roles: ["Chef"]
      }
    ]
  }
]
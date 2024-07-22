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
]

export const rolesAndFunction = [
  {
      "module": "checkin",
      "functionality": [
          {
              "name": "create checkin",
              "urls": [
                  "/merchants/{merchantId}/reservations"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "assign checkin",
              "urls": [
                  "/merchants/{merchantId}/locations/{locationId}/reservations/assign-table"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "cancel checkin",
              "urls": [
                  "/merchants/{reservationId}/locations/{locationId}/{user}/table-cancel"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "edit guest count",
              "urls": [
                  "/reservation/guest-count",
                  "/reservation/{reservation_id}"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "edit wait times",
              "urls": [
                  "/merchants/{merchantId}/locations/{locationId}/wait-times"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          }
      ]
  },
  {
      "module": "services",
      "functionality": [
          {
              "name": "enable/disable checkin service",
              "urls": [
                  "/merchant/updateLocationConfiguration/{locationId}/{isOnlineCheckin}"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "enable/disable pickup service",
              "urls": [
                  "/merchant/updateOrderTypeConfig/{orderTypeId}/{isEnabled}"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "enable/disable delivery service",
              "urls": [
                  "/merchant/updateOrderTypeConfig/{orderTypeId}/{isEnabled}"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "enable/disable digital menu service",
              "urls": [
                  "/merchants/updateMenu"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          }
      ]
  },
  {
      "module": "Section",
      "functionality": [
          {
              "name": "enable/disable sections",
              "urls": [
                  "/merchant/location/{locationId}/enable"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          }
      ]
  },
  {
      "module": "menu",
      "functionality": [
          {
              "name": "view menu",
              "urls": [
                  "/merchants/menu"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "add/remove menu items",
              "urls": [
                  "/merchants/item",
                  "/merchants/item"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "hide/show menu items",
              "urls": [
                  "/merchants/updateMenu"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "edit price",
              "urls": [
                  "/merchants/updateMenu"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "turn on/off/edit menu items availability",
              "urls": [
                  "/merchants/updateMenu",
                  "/merchants/itemAttributes",
                  "/merchants/itemAttributes"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "turn on/off/edit menu items customization",
              "urls": [
                  "/merchants/updateMenu"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "add to special menu",
              "urls": [
                  "/merchants/itemSpecial"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "edit inventory",
              "urls": [
                  "/merchants/inventory"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          }
      ]
  },
  {
      "module": "order management",
      "functionality": [
          {
              "name": "",
              "urls": [],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          }
      ]
  },
  {
      "module": "orders",
      "functionality": [
          {
              "name": "void/edit items",
              "urls": [
                  "/order/update",
                  "/order/order-update",
                  "/order/v2/update",
                  "/order/v2/order-update"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "cancel order",
              "urls": [
                  "/order/updateOrderStatus",
                  "/order/v2/updateOrderStatus"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "issue refunds",
              "urls": [
                  "/order/update",
                  "/order/order-update",
                  "/order/v2/order-update",
                  "/order/v2/update",
                  "/payment/refundPayment",
                  "/payment/v2/refundPayment",
                  "/payment/refundPartialPayment"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "print kot",
              "urls": [
                  "/print/kot",
                  "/print/v2/kot"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "print receipt",
              "urls": [
                  "/order/updateOrderStatus",
                  "/order/v3/updateOrderStatus"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "reprint receipt",
              "urls": [
                  "/print/receipt",
                  "/print/v2/receipt"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "reprint kot",
              "urls": [
                  "/print/kot",
                  "/print/v2/kot"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "take payment",
              "urls": [
                  "/payment/processPayment",
                  "/payment/getPaymentOptions",
                  "/payment/transferPaymentToAnotherCard",
                  "/payment/validateCard",
                  "/payment/authorized-initiate-payment",
                  "/payment/authorized-capture-payment",
                  "/payment/authorize-payment",
                  "/payment/collect-payment",
                  "/payment/authorize",
                  "/payment/capture",
                  "/payment/start-transaction",
                  "/payment/start-transaction-by-merchant",
                  "/payment/v2/start-transaction-by-merchant",
                  "/payment/processOfflinePayment",
                  "/payment/v2/processOfflinePayment",
                  "/payment/initiateOfflinePayment",
                  "/payment/v2/initiateOfflinePayment",
                  "/payment/customer-initiate-offline-payment",
                  "/payment/transactions",
                  "/payment/process-offline-Payments",
                  "/payment/initiate-offline-Payments",
                  "/payment/authorized-offline-payment",
                  "/payment/v2/authorized-offline-payment",
                  "/transactions/{transactionId}",
                  "payments/datacap/store-payment-data",
                  "/bolt-terminal/connect",
                  "/bolt-terminal/v2/connect",
                  "/bolt-terminal/print",
                  "/bolt-terminal/capture/{locationId}",
                  "/razorPay/account",
                  "/razorpay/processRazorPayPayment",
                  "/razorpay/processSubscription",
                  "/pinelabs/initiatePayment",
                  "/razorpay/capturePayment"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "create orders",
              "urls": [
                  "/order/createOrder",
                  "/order/merchant/createOrder",
                  "/order/merchant/create",
                  "/order/customer/createOrder",
                  "/order/v2/merchant/create",
                  "/neworder"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "add/remove tax",
              "urls": [
                  "/order/totals//tax",
                  "/order/totals/v2/add/tax",
                  "/order/totals/v2/remove/tax"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "add/remove gratuity",
              "urls": [
                  "/order/totals//service-tax",
                  "/order/totals/v2/add/service-tax",
                  "/order/totals/v2/remove/service-tax",
                  "/order/{orderId}/totals/service-tax/{isServiceChargeRemoved}",
                  "/order/{orderId}/details"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "add/remove discount",
              "urls": [
                  "/order/{orderId}/totals/discount",
                  "/order/v2/add-discount",
                  "/order/v2/remove-discount"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "tip",
              "urls": [
                  "/order/{orderId}/totals/tip"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "totals",
              "urls": [
                  "/order/v2/totals",
                  "/order/totals",
                  "/order/customer/totals"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "checkout",
              "urls": [
                  "/payment/processPayment",
                  "/payment/getPaymentOptions",
                  "/payment/transferPaymentToAnotherCard",
                  "/payment/validateCard",
                  "/payment/authorized-initiate-payment",
                  "/payment/authorized-capture-payment",
                  "/payment/authorize-payment",
                  "/payment/collect-payment",
                  "/payment/authorize",
                  "/payment/capture",
                  "/payment/start-transaction",
                  "/payment/start-transaction-by-merchant",
                  "/payment/v2/start-transaction-by-merchant",
                  "/payment/processOfflinePayment",
                  "/payment/v2/processOfflinePayment",
                  "/payment/initiateOfflinePayment",
                  "/payment/v2/initiateOfflinePayment",
                  "/payment/customer-initiate-offline-payment",
                  "/payment/transactions",
                  "/payment/process-offline-Payments",
                  "/payment/initiate-offline-Payments",
                  "/payment/authorized-offline-payment",
                  "/payment/v2/authorized-offline-payment",
                  "/transactions/{transactionId}",
                  "payments/datacap/store-payment-data",
                  "/bolt-terminal/connect",
                  "/bolt-terminal/v2/connect",
                  "/bolt-terminal/print",
                  "/bolt-terminal/capture/{locationId}",
                  "/razorPay/account",
                  "/razorpay/processRazorPayPayment",
                  "/razorpay/processSubscription",
                  "/pinelabs/initiatePayment",
                  "/razorpay/capturePayment"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "split bill/payment",
              "urls": [
                  "/payment/processPayment",
                  "/payment/getPaymentOptions",
                  "/payment/transferPaymentToAnotherCard",
                  "/payment/validateCard",
                  "/payment/authorized-initiate-payment",
                  "/payment/authorized-capture-payment",
                  "/payment/authorize-payment",
                  "/payment/collect-payment",
                  "/payment/authorize",
                  "/payment/capture",
                  "/payment/start-transaction",
                  "/payment/start-transaction-by-merchant",
                  "/payment/v2/start-transaction-by-merchant",
                  "/payment/processOfflinePayment",
                  "/payment/v2/processOfflinePayment",
                  "/payment/initiateOfflinePayment",
                  "/payment/v2/initiateOfflinePayment",
                  "/payment/customer-initiate-offline-payment",
                  "/payment/transactions",
                  "/payment/process-offline-Payments",
                  "/payment/initiate-offline-Payments",
                  "/payment/authorized-offline-payment",
                  "/payment/v2/authorized-offline-payment",
                  "/transactions/{transactionId}",
                  "payments/datacap/store-payment-data",
                  "/bolt-terminal/connect",
                  "/bolt-terminal/v2/connect",
                  "/bolt-terminal/print",
                  "/bolt-terminal/capture/{locationId}",
                  "/razorPay/account",
                  "/razorpay/processRazorPayPayment",
                  "/razorpay/processSubscription",
                  "/pinelabs/initiatePayment",
                  "/razorpay/capturePayment"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "update order",
              "urls": [
                  "/order/update",
                  "/order/customer/update",
                  "/order/order-update",
                  "/order/customerId",
                  "/order/update/customer"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "seperate bill printing(split item)",
              "urls": [
                  "/print/item-wise",
                  "/print/v2/item-wise"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "digital receipt",
              "urls": [
                  "/order/send-digital-receipt/{orderId}",
                  "/order/v2/send-digital-receipt"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "add/remove items",
              "urls": [
                  "/order/update",
                  "/order/v2/add-items",
                  "/order/v2/remove-items"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "update order status",
              "urls": [
                  "/order/updateOrderStatus",
                  "/order/updateOrderStatus",
                  "/order/orderStatus/forward",
                  "/order/v2/orderStatus/forward",
                  "/order/orderStatus/backward",
                  "/order/v2/orderStatus/backward",
                  "/order/orderStatus/cancel"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "get orders",
              "urls": [
                  "/order/getOrder",
                  "/merchant/location/order-details",
                  "/order/phone/{phoneNumber}/customer-info",
                  "/order/items-grouped",
                  "/order/eod-orders",
                  "/order/check",
                  "/order/filter/orders",
                  "/order/customer",
                  "/order/customer/getOrders",
                  "/order/getOrders"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          }
      ]
  },
  {
      "module": "online orders",
      "functionality": [
          {
              "name": "accept order",
              "urls": [
                  "/order/preparation-time"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "cancel order",
              "urls": [
                  "/order/updateOrderStatus",
                  ",/order/v2/updateOrderStatus"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "delay order",
              "urls": [
                  "/order/delay",
                  "/order/merchants/updateETA",
                  "/order/v2/merchants/updateETA"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "reprint receipt",
              "urls": [
                  "/print/receipt",
                  "/print/v2/receipt"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "reprint kot",
              "urls": [
                  "/print/kot",
                  "/print/v2/kot"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          }
      ]
  },
  {
      "module": "time management",
      "functionality": [
          {
              "name": "clock-in and clock-out",
              "urls": [
                  "/staff/checkin",
                  "/staff/checkout/{id}"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "edit entry",
              "urls": [
                  "/staff/clocking"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          }
      ]
  },
  {
      "module": "expense management",
      "functionality": [
          {
              "name": "adding expense",
              "urls": [
                  "/expenses/location/{locationId}"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "edit expense",
              "urls": [
                  "/expenses/location/{locationId}/expense/{expenseId}"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          }
      ]
  },
  {
      "module": "tables",
      "functionality": [
          {
              "name": "merge table",
              "urls": [
                  "/order/merge",
                  "/order/de-merge/{orderId}"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "reassign table",
              "urls": [
                  "/merchants/{merchantId}/locations/{locationId}/reservations/assign-table"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "table cancellation",
              "urls": [
                  "/merchants/{reservationId}/locations/{locationId}/{user}/table-cancel"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "check out table",
              "urls": [
                  "/merchants/{reservationId}/locations/{locationId}/checkout",
                  "/table/{tableId}/checkout"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "get table details & table infos",
              "urls": [
                  "/merchants/locations/{locationId}/reservations/table-details",
                  "/merchants/locations/{locationId}/sections/{sectionId}/table-info",
                  "/merchants/locations/{locationId}/staff/{staffId}/table-info",
                  "/table/getTable",
                  "/table/{tableId}/order"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "get section table details",
              "urls": [
                  "/merchants/locations/{locationId}/reservations/section-table-details"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "release table",
              "urls": [
                  "/merchants/{locationId}/{reservationId}"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "table update",
              "urls": [
                  "/table/update"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "staff and favorite table data, checkin & checkout",
              "urls": [
                  "/staff/{locationId}",
                  "/{staffId}/favorite-table-data/{tableId}",
                  "/{staffId}/favorite-table-data/{tableId}",
                  "/staff/checkout/{id}",
                  "/staff/checkin"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          }
      ]
  },
  {
      "module": "device settings",
      "functionality": [
          {
              "name": "printer setup/update",
              "urls": [
                  "/merchants/registerDevice",
                  "/merchants/device/{deviceId}"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          },
          {
              "name": "default device",
              "urls": [
                  "/merchants/editDeviceInfo"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          }
      ]
  },
  {
      "module": "KDS",
      "functionality": [
          {
              "name": "manage",
              "urls": [
                  "/kot/createKOT",
                  "/kot/updateKOTItem",
                  "/kot/updateKOTItems",
                  "/kot/getOrdersByKOTItems",
                  "/kot/getOrders",
                  "/kot/getKOTItems",
                  "/kot/getKOTItemsBySortOrder",
                  "/kot/updateKOTBySortOrder"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          }
      ]
  },
  {
      "module": "delivery management",
      "functionality": [
          {
              "name": "view",
              "urls": [
                  "/valet/getDeliveryStaffs"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          }
      ]
  },
  {
      "module": "reports",
      "functionality": [
          {
              "name": "access reports",
              "urls": [
                  "/merchants/{merchantId}/location/{locationId}/reports/{reportId}"
              ],
              "roles": [
                  "Admin",
                  "Chef"
              ]
          }
      ]
  }
]
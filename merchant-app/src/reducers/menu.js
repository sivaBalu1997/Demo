import { RECEIVE_API_DATA } from "../actions/actions";

// import * as types from "../constants/actionType";

// // import { MENU } from "../actions/actions";
// // import * as types
const INITIAL_STATE = {
  // menuList: [
  //   {
  //     id: 1,
  //     itemCode: 12345,
  //     itemType: "non-veg",
  //     itemName: "Chicken Burger Pizza",
  //     uom: "Piece",
  //     price: 35,
  //     custom: null,
  //   },
  //   {
  //     id: 2,
  //     itemCode: 12345,
  //     itemType: "non-veg",
  //     itemName: "Chicken Burger Pizza",
  //     uom: "Piece",
  //     price: 35,
  //     custom: null,
  //   },
  //   {
  //     id: 3,
  //     itemCode: 12345,
  //     itemType: "veg",
  //     itemName: "Veg Burger Pizza",
  //     uom: "Piece",
  //     price: 35,
  //     custom: "view",
  //   },
  //   {
  //     id: 4,
  //     itemCode: 12345,
  //     itemType: "veg",
  //     itemName: "Veg Burger Pizza",
  //     uom: "Piece",
  //     price: 35,
  //     custom: null,
  //   },
  //   {
  //     id: 5,
  //     itemCode: 12345,
  //     itemType: "non-veg",
  //     itemName: "Chicken Burger Pizza",
  //     uom: "Piece",
  //     price: 35,
  //     custom: "view",
  //   },
  //   {
  //     id: 6,
  //     itemCode: 12345,
  //     itemType: "veg",
  //     itemName: "Veg Burger Pizza",
  //     uom: "Piece",
  //     price: 35,
  //     custom: "view",
  //   },
  //   {
  //     id: 7,
  //     itemCode: 12345,
  //     itemType: "non-veg",
  //     itemName: "Chicken Burger Pizza",
  //     uom: "Piece",
  //     price: 35,
  //     custom: "view",
  //   },
  //   {
  //     id: 8,
  //     itemCode: 12345,
  //     itemType: "non-veg",
  //     itemName: "Chicken Burger Pizza",
  //     uom: "Piece",
  //     price: 35,
  //     custom: null,
  //   },
  //   {
  //     id: 9,
  //     itemCode: 12345,
  //     itemType: "non-veg",
  //     itemName: "Chicken Burger Pizza",
  //     uom: "Piece",
  //     price: 35,
  //     custom: null,
  //   },
  // ],
  results: [],
};

const menuReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECEIVE_API_DATA: {
      return Object.assign({}, state, {
        results: state.results,
      });
    }
    default:
      return state;
  }
};

export default menuReducer;

// import { REQUEST_API_DATA } from "../actions/actions";

// export default (state = {}, { type, data }) => {
//   switch (type) {
//     case REQUEST_API_DATA:
//       return data;
//     default:
//       return state;
//   }
// };

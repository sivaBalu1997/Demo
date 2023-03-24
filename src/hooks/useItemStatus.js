import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  clearUpdateItemOption,
  getMenus,
  updateItemOption,
} from "../redux/actions/menuAction";

export const useItemStatus = (props) => {
  // const merchantContext = useContext(MerchantContext);
  const dispatch = useDispatch();
  const selectedBranch = useSelector((state) => state.auth.selectedBranch);
  // const menuVieworderTypes = useSelector((state) =>
  //   state.restaurant.currentRestaurantDetail.orderTypes?.filter(
  //     (orderType) => orderType.typeGroup == "D"
  //   )
  // );

  // console.log(` ::::: props item Id ::::::`, props.itemId);

  const refreshMenuDetails = useCallback(() => {
    let orderTypeGroup;
    selectedBranch.orderTypes.filter((orderType) => {
      if (orderType.typeGroup == "D") {
        orderTypeGroup = orderType.typeName;
      }
    });
    selectedBranch &&
      dispatch(
        getMenus({
          locationId: selectedBranch.id,
          type: orderTypeGroup,
        })
      );
  }, []);

  const currentUpdateItemId = useSelector(
    (state) => state.menu.currentUpdateItemId
  );

  // console.log(`object ::::`, currentUpdateItemId);
  const currentUpdateItemOption = useSelector(
    (state) => state.menu.currentUpdateItemOption
  );
  const updateItemOptionLoading = useSelector(
    (state) => state.menu.updateItemOptionLoading
  );
  const updateItemOptionSuccess = useSelector(
    (state) => state.menu.updateItemOptionSuccess
  );

  const orderTypeId = useSelector((state) => state.menu.menu.orderTypeId);

  // console.log(`orderTypeId inside Hook :::`, orderTypeId);

  const isCustomisationUpdateLoading =
    currentUpdateItemId == props.itemId &&
    updateItemOptionLoading &&
    currentUpdateItemOption == "modifierId";

  const isCustomisationOptionUpdateLoading =
    currentUpdateItemId == props.itemId &&
    updateItemOptionLoading &&
    currentUpdateItemOption == "modifierOptionId";

  const isItemOrderTypeVisibilityUpdateLoading =
    currentUpdateItemId == props.itemId &&
    updateItemOptionLoading &&
    currentUpdateItemOption == "orderTypeId";

  const isItemVisibilityLoading =
    currentUpdateItemId == props.itemId &&
    updateItemOptionLoading &&
    currentUpdateItemOption == "display";

  const isItemPriceUpdateLoading =
    currentUpdateItemId == props.itemId &&
    updateItemOptionLoading &&
    currentUpdateItemOption == "price";

  useEffect(() => {
    if (
      !updateItemOptionLoading &&
      updateItemOptionSuccess &&
      currentUpdateItemId == props.itemId
    ) {
      props.onUpdateFinish();
      dispatch(clearUpdateItemOption());
      refreshMenuDetails();
    } else if (
      !updateItemOptionLoading &&
      !updateItemOptionSuccess &&
      currentUpdateItemId == props.itemId
    ) {
      dispatch(clearUpdateItemOption());
    }
  }, [updateItemOptionLoading]);

  const updateCustomisation = (customisationId, enabled) => {
    dispatch(
      updateItemOption({
        itemId: props.itemId,
        available: enabled,
        modifierId: customisationId, // Keep in 3rd key to detect Item Option
      })
    );
  };

  const updateCustomisationOption = (customisationOptionId, enabled) => {
    dispatch(
      updateItemOption({
        itemId: props.itemId,
        available: enabled,
        modifierOptionId: customisationOptionId, // Keep in 3rd key to detect Item Option
      })
    );
  };

  const updateItemOrderTypeAvailability = (OrderTypeId, enabled) => {
    dispatch(
      updateItemOption({
        itemId: props.itemId,
        available: enabled,
        orderTypeId: OrderTypeId, // Keep in 3rd key to detect Item Option
      })
    );
  };

  const updateItemOrderTypeAvailabilityDate = (
    enabled,
    disableItemAvailability
  ) => {
    dispatch(
      updateItemOption({
        itemId: props.itemId,
        available: enabled, // false
        orderTypeId: orderTypeId, // Keep in 3rd key to detect Item Option
        disableItemAvailability: disableItemAvailability,
      })
    );
  };

  const updateItemVisibility = (visibility) => {
    dispatch(
      updateItemOption({
        itemId: props.itemId,
        available: visibility,
        display: "1", // Keep in 3rd key to detect Item Option
      })
    );
  };

  const updateItemPrice = (price) => {
    dispatch(
      updateItemOption({
        itemId: props.itemId,
        available: true,
        price: price, // Keep in 3rd key to detect Item Option
      })
    );
  };

  return [
    isCustomisationUpdateLoading,
    isCustomisationOptionUpdateLoading,
    isItemOrderTypeVisibilityUpdateLoading,
    isItemVisibilityLoading,
    isItemPriceUpdateLoading,
    updateCustomisation,
    updateCustomisationOption,
    updateItemOrderTypeAvailability,
    updateItemVisibility,
    updateItemPrice,
    updateItemOrderTypeAvailabilityDate,
  ];
};

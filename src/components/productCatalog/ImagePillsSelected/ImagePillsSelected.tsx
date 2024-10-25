import "./ImagePillsSelected.scss";
import axios from "axios";
import React, { useEffect, useState } from "react";
import emptyfoodimg from "../../assets/images/emptyfoodimg.png";
import imageslist from "../imageslist/imageslist";
import { useSelector, useDispatch } from "react-redux";

import { getIngredientsRequest } from "redux/productCatalog/productCatalogActions";

interface ingredients {
  id: string;
  name: string;
}
interface allergens {
  id: string;
  name: string;
}

interface ImageItem {
  id: string;
  mimeType: string;
  base64String: string;
  name: string;
}

interface alleregenimagelist {
  id: string;
  name: string;
  image?: string | null;
}

interface FetchedPrimaryData {
  Ingredients?: ingredients[];
  allergens?: allergens[];
}

interface ImageGalleryProps {
  imageselected: FetchedPrimaryData | null;
  name: string;
}
interface State {
  auth: {
    credentials: {
      locationId: string;
    };
  };
}
interface StateDataTag {
  productCatalog: {
    ingredients: [];
  };
}

const ImagePillsSelected: React.FC<ImageGalleryProps> = ({
  imageselected,
  name,
}) => {

  const ingredientsdata = useSelector((state : any) => state.productCatalog?.ingredients?.data) 
  const allergensData = useSelector((state: any) => state.productCatalog?.allergens?.data)

  const [imagefromapi, setImageFromApi] = useState<ImageItem[]>([]);
  const [alleregenimgelist, setaalleregenimgelist] =
    useState<alleregenimagelist[]>(imageslist);

  const locationid = useSelector(
    (state: State) => state.auth.credentials.locationId
  );
  const ingredients = useSelector(
    (state: StateDataTag) => state.productCatalog.ingredients
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getApi();
    setImageFromApi(ingredientsdata);
  }, []);

  const getApi = () => {
    dispatch(getIngredientsRequest(locationid));
  };

  const foundItemsIngredient =
    imageselected?.Ingredients &&
    imagefromapi?.filter((item) =>
      imageselected?.Ingredients?.some((selected) => selected.id === item.id)
    );

  const foundItemsAllergens =
    imageselected?.allergens &&
    alleregenimgelist.filter((item) =>
      imageselected?.allergens?.some((selected) => selected.id === item.id)
    );

  return (
    <div className="imagesselected">
      <div>
        {name === "Ingredients" && (
          <div className="images1">
            {foundItemsIngredient &&
              foundItemsIngredient?.map((image) => (
                <div className="selectedingredientsimage">
                  <img src="" alt="" />
                  <span>{image.name}</span>
                </div>
              ))}
          </div>
        )}
      </div>
      <div>
        {name === "allergens" && (
          <div className="images2">
            {foundItemsAllergens &&
              foundItemsAllergens?.map((image) => (
                <div className="selectedallergenimage">
                  <img src="" alt="" />
                  <span>{image.name}</span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePillsSelected;

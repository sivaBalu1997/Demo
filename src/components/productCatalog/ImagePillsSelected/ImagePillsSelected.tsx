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
  media?: any;
}

interface alleregenimagelist {
  id: string;
  name: string;
  image?: string | null;
  media?:any;
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
  const ingredientsdata = useSelector((state: any) => state.productCatalog?.ingredients?.data);
  const allergensData = useSelector((state: any) => state.productCatalog?.allergens?.data);

  const [imagefromapi, setImageFromApi] = useState<ImageItem[]>([]);
  const [alleregenimgelist, setAllergenImgList] = useState<alleregenimagelist[]>([]);

  console.log({alleregenimgelist})

  const locationid = useSelector(
    (state: State) => state.auth.credentials.locationId
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!ingredientsdata.length) {
      dispatch(getIngredientsRequest(locationid));
    }
  }, [dispatch, ingredientsdata.length, locationid]);

  useEffect(() => {
    if (imageselected) {
      const selectedIngredients = ingredientsdata.filter((ingredient: any) =>
        imageselected.Ingredients?.includes(ingredient.id)
      );
      const selectedAllergens = allergensData.filter((allergen: any) =>
        imageselected.allergens?.includes(allergen.id)
      );

      setImageFromApi(selectedIngredients);
      setAllergenImgList(selectedAllergens);
    }
  }, [imageselected, ingredientsdata, allergensData]);

  return (
    <div className="imagesselected">
      <div >
        {name === "Ingredients" && (
          <div className="images1">
            {imagefromapi.map((image) => (
              <div key={image?.id} className="selectedingredientsimage">
                <img src={image?.media.url || ""}  />
                <span>{image?.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        {name === "allergens" && (
          <div className="images2">
            {alleregenimgelist.map((image) => (
              <div key={image?.id} className="selectedallergenimage">
                <img src={image?.media.url || ""}  />
                {console.log('ajsndakdjnskdn',image?.name)}
                <span>{image?.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


export default ImagePillsSelected;

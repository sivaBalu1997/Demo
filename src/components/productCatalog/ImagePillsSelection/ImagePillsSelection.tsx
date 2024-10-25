import React, { useEffect, useRef, useState } from "react";
import "./ImagePillsSelection.scss";
import deleteIcon from "../../../assets/images/delete copy.png";
import Searchicon from "../../../assets/images/searchicon.png";
import { useSelector } from "react-redux";

interface ImageOptions {
  name: string;
  id: string;
  imageId?: string;
  imageType?: string;
}
interface Imageselection {
  heading: string;
  options: ImageOptions[];
  setValue: any;
  name?: string;
  register:any;
  resetSelection?:any
}

const ImagePillsSelection: React.FC<Imageselection> = ({
  heading,
  options,
  name,
  setValue,
  register,
  resetSelection
}) => {
  const [searchImage, setSearchImage] = useState<string>("");
  const [selectedImages, setSelectedImages] = useState<ImageOptions[]>([]);
  const initialSelectionSet = useRef(false);

  const ItemsPrimaryDetails = useSelector(
    (state: any) => state.primarypage?.data
  );
    
  const handleSearchingImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchImage(e.target.value);
  };

  const filteredimages = options?.filter((option) =>
    option.name.toLowerCase().includes(searchImage.toLowerCase())
  );

  const handleSelectedImage = (image: ImageOptions) => {
    const isSelected = selectedImages.some(
      (selected) => selected.id === image.id
    );
  
    if (!isSelected) {
      const newSelectedImages = [...selectedImages, image];
      setSelectedImages(newSelectedImages);
  
      const selectedIds = newSelectedImages.map((img) => img.id);
      setValue(name, selectedIds);
    }
  };
  

  const handleDeletingImage = (image: ImageOptions) => {
    const updataedImagelist = selectedImages.filter(
      (imageItem) => imageItem.id !== image.id
    );
    setSelectedImages(updataedImagelist);
    const selectedIds = updataedImagelist.map((img) => img?.id);
    setValue(name, selectedIds);
  };

  const clearSelection = () => {
    setSelectedImages([]); 
  };

  useEffect(() => {
    if (resetSelection ) {
      resetSelection.current = clearSelection; 
    }
  }, [resetSelection]);

  useEffect(() => {
    if (ItemsPrimaryDetails && ItemsPrimaryDetails[name as any] && !initialSelectionSet.current) {
      const preselectedImages = options?.filter((option) =>
        ItemsPrimaryDetails[name as any].includes(option.id)
      ) || []; 
  
      const combinedSelectedImages = [...selectedImages, ...preselectedImages];
      setSelectedImages(combinedSelectedImages);
      
      const selectedIds = combinedSelectedImages.map((img) => img.id);
      setValue(name, selectedIds);
      initialSelectionSet.current = true;
    }
  }, [ItemsPrimaryDetails, name, options, setValue]);
  

  return (
    <div className="Item-Selection">
      <h3 className="Item-Selection-heading">{heading}</h3>
      <div className="Item-selection-Search">
        <input
          type="text"
          value={searchImage}
          {...register(name)}
          onChange={handleSearchingImage}
          className="Item-selction-input-Field"
        />{" "}
        <span>
          <img src={Searchicon} alt="" className="searchicon" />
        </span>
      </div>

      <div className="Item-selction-itemset">
        <div>
          {selectedImages.length > 0 && (
            <div>
              <ul className="Selected-Images">
                {selectedImages.map((image) => (
                  <li key={image.id} className="Selected-Image-Item">
                    <img
                      src={`/assets/${image.imageId}.${
                        image.imageType && image.imageType.split("/")[1]
                      }`}
                      alt="img"
                    />

                    <span>{image.name}</span>
                    <img
                      src={deleteIcon}
                      alt=""
                      onClick={() => handleDeletingImage(image)}
                      className="Selected-Image-Item-Deletion"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div>
          <ul className="AllergensImage">
            {filteredimages?.length > 0 ? (
              filteredimages?.map((option) => (
                <li
                  key={option.id}
                  onClick={() => handleSelectedImage(option)}
                  className={`Item-Selection-option ${
                    selectedImages.some((selected) => selected.id === option.id)
                      ? ""
                      : ""
                  }`}
                >
                  <img
                    src={`/assets/${option.imageId}.${
                      option.imageType && option.imageType.split("/")[1]
                    }`}
                    alt="img"
                  />
                  <span>{option.name}</span>
                </li>
              ))
            ) : (
              <li className="Item-Selection-no-options">No options found</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImagePillsSelection;

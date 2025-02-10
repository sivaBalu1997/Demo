import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
// import deleteIcon from "../../../assets/images/delete copy.png";
import deleteIcon from "../../../assets/svg/imagepillcloseIcon.svg"
import Searchicon from "../../../assets/images/searchicon.png";
import "./ImagePillsSelection.scss";

interface ImageOptions {
  name: string;
  id: string;
  media?: any;
  imageId?: string;
  imageType?: string;
}
interface Imageselection {
  heading: string;
  options: ImageOptions[];
  setValue: any;
  name?: string;
  register: any;
  resetSelection?: any;
}

const ImagePillsSelection: React.FC<Imageselection> = ({
  heading,
  options,
  name,
  setValue,
  register,
  resetSelection,
}) => {
  const [searchImage, setSearchImage] = useState<string>("");
  const [selectedImages, setSelectedImages] = useState<ImageOptions[]>([]);
  const initialSelectionSet = useRef(false);

  const baseImageUrl = "https://storage.googleapis.com/mhd-media/img/";

  const ItemsPrimaryDetails = useSelector(
    (state: any) => state.primarypage?.data
  );

  const handleSearchingImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchImage(e.target.value);
  };

  const filteredimages = options?.filter((option) =>
    option.name.toLowerCase().includes(searchImage.toLowerCase())
  );
  const [clickedId, setClickedId] = useState(null);
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
    setTimeout(() => setClickedId(null), 300);
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
    if (resetSelection) {
      resetSelection.current = clearSelection;
    }
  }, [resetSelection]);

  useEffect(() => {
    if (
      ItemsPrimaryDetails &&
      ItemsPrimaryDetails[name as any] &&
      !initialSelectionSet.current
    ) {
      const preselectedImages =
        options?.filter((option) =>
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
        <div className="selected-items-div">
          {selectedImages.length > 0 && (
            <div>
              <ul className="Selected-Images">
                {selectedImages?.map((image) => (
                  <li key={image.id} className="Selected-Image-Item">
                    <img
                     className="item-image-class"
                      src={`${baseImageUrl}${image?.media?.imageId}.${image?.media?.imageType?.split("/")[1]
                        }`}
                      alt="img"
                    />

                    <span>{image?.name}</span>
                    <img
                      src={deleteIcon}
                      alt=""
                      onClick={() => handleDeletingImage(image)}
                      style={{width:"12px",height:"12px"}}
                      className="Selected-Image-Item-Deletion"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="items-to-select-div">
          <ul className="AllergensImage">
            {filteredimages?.length > 0 ? (
              filteredimages?.map((option) => (
                <li
                  key={option.id}
                  onClick={() => handleSelectedImage(option)}
                  className={`Item-Selection-option ${clickedId === option.id ? "clicked" : ""
                    }`}
                >
                  <img
                  style={{width:"21px",height:"21px"}}
                  className="item-image-class"
                    src={`${baseImageUrl}${option?.media?.imageId}.${option?.media?.imageType?.split("/")[1]
                      }`}
                    alt="img"
                  />
                  <span className="optionName">{option?.name}</span>
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

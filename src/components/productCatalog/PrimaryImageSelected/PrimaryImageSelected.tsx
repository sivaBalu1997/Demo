import React from "react";
import emptyfoodimg from "../../../assets/images/emptyfoodimg.png";

interface ImageUrl {
  mimeType: string;
  base64String: string;
}

interface FetchedPrimaryData {
  imageUrls: ImageUrl[];
}

interface ImageGalleryProps {
  fetchedprimarydata: FetchedPrimaryData | null;
}
const MAX_IMAGES = 7;

const PrimaryImageSelected: React.FC<ImageGalleryProps> = ({
  fetchedprimarydata,
}) => {
  const selectedImages = fetchedprimarydata?.imageUrls || [];
  const emptySlots = MAX_IMAGES - selectedImages.length;

  return (
    <div className="images">
      <div className="images">
        <ol>
          {fetchedprimarydata && fetchedprimarydata?.imageUrls?.length > 0 && (
            <li>
              <img
                src={`data:${
                  fetchedprimarydata?.imageUrls[0]?.mimeType &&
                  fetchedprimarydata.imageUrls[0].mimeType
                };base64,${
                  fetchedprimarydata?.imageUrls[0]?.base64String &&
                  fetchedprimarydata.imageUrls[0].base64String
                }`}
                alt=""
              />
            </li>
          )}

          {fetchedprimarydata?.imageUrls &&
            fetchedprimarydata?.imageUrls.length === 0 &&
            [0].map((_, index) => (
              <li key={index + 1}>
                <img src={emptyfoodimg} alt={`sample ${index}`} />
              </li>
            ))}

          <div className="selectediagelist">
            {fetchedprimarydata?.imageUrls &&
              fetchedprimarydata?.imageUrls.slice(1).map((image, index) => (
                <li key={index + 1}>
                  <img
                    src={`data:${image.mimeType};base64,${image.base64String}`}
                    alt={`uploaded ${index}`}
                  />
                </li>
              ))}

            {Array.from({ length: emptySlots  })
              .slice(1)
              .map((_, index) => (
                <li key={selectedImages.length + index + 1}>
                  <img src={emptyfoodimg} alt={`empty ${index}`} />
                </li>
              ))}
          </div>
        </ol>


      </div>
    </div>
  );
};

export default PrimaryImageSelected;

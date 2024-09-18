import React, { useState } from "react";
import emptyfoodimg from "../../../assets/images/emptyfoodimg.png";

interface ImageUrl {
  mimeType: string;
  base64String: string;
}
interface ImageFile {
  file: File;
  uploaded: boolean;
  failed: boolean;
  preview: string; // To store the image preview URL
}
interface FetchedPrimaryData {
  imageUrls: ImageFile[];
}

interface ImageGalleryProps {
  fetchedprimarydata: ImageFile[] | [];
}
const MAX_IMAGES = 7;

const PrimaryImageSelected: React.FC<ImageGalleryProps> = ({
  fetchedprimarydata,
}) => {
  const selectedImages = fetchedprimarydata || [];
  const emptySlots = MAX_IMAGES-selectedImages.length ;
  const [uploading, setUploading] = useState(false);
  console.log("selectedImages",selectedImages)

  

  return (
    <div className="images">
      <div className="images">
        <ol>
          {selectedImages &&  selectedImages?.length > 0 && (
            <li>
             <img
                          className="uploaded-image"
                          src={selectedImages[0].preview}
                          alt={`Preview of ${selectedImages[0].file.name}`}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }} // Display a small thumbnail
                        />
            </li>
          )}

          {selectedImages?.length === 0 &&
            [0].map((_, index) => (
              <li key={index + 1}>
                <img src={emptyfoodimg} alt={`sample ${index}`} />
              </li>
            ))}

          <div className="selectediagelist">
            {selectedImages &&
              selectedImages?.slice(1).map((image, index) => (
                <li key={index + 1}>
                 <img
                          className="uploaded-image"
                          src={image.preview}
                          alt={`Preview of ${image.file.name}`}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }} // Display a small thumbnail
                        />
                </li>
              ))}

            {Array.from({ length: emptySlots-1  })
              .slice(1)
              .map((_, index) => (
                <li key={selectedImages.length + index + 1}>
                  <img src={emptyfoodimg} alt={`empty ${index}`} />
                </li>
              ))}
          </div>
        </ol>
        <ol>
        {/* {selectedImages.map((img, index) => (
                      <div key={index} className="image-container">
                        <img
                          className="uploaded-image"
                          src={img.preview}
                          alt={`Preview of ${img.file.name}`}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }} // Display a small thumbnail
                        />
                        <div>
                          {img.file.name} -{" "}
                          {img.uploaded
                            ? "Uploaded"
                            : img.failed
                            ? "Failed"
                            : "Pending Upload"}
                        </div>
                      </div>
                    ))} */}
        </ol>


      </div>
    </div>
  );
};

export default PrimaryImageSelected;

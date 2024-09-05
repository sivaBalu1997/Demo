import './ImagePillsSelected.scss';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import emptyfoodimg from '../../assets/images/emptyfoodimg.png';
import imageslist from '../imageslist/imageslist';

interface ingredients {
  id: string;
  name:string
}
interface allergens {
    id: string;
    name:string
  }


interface ImageItem {
  id: string;
  mimeType: string;
  base64String: string;
  name:string

}

interface alleregenimagelist {
    id: string;
    name: string;
    image?: string | null;
  }


  
  interface FetchedPrimaryData {
    Ingredients?:ingredients[]
    allergens?:allergens[]
   
  }
  
  interface ImageGalleryProps {
    imageselected: FetchedPrimaryData | null;
    name:string

  
  }
const MAX_IMAGES = 7;

const ImagePillsSelected: React.FC<ImageGalleryProps> = ({ imageselected,name }) => {
  const [imagefromapi, setImageFromApi] = useState<ImageItem[]>([]);
  const [alleregenimgelist, setaalleregenimgelist] = useState<alleregenimagelist[]>(imageslist);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
       

        const imagesApi = await axios.get(
          'https://api.magilhub.com/magilhub-data-services/merchants/itemAttributes?locationId=9c485244-afd4-11eb-b6c7-42010a010026&id=&option=INGR'
        );

        setImageFromApi(imagesApi.data);
    
        console.log('imagefromapi', imagesApi);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const foundItemsIngredient =
  imageselected?.Ingredients &&
    imagefromapi.filter((item) => imageselected?.Ingredients?.some((selected) => selected.id === item.id));

  const  foundItemsAllergens =
  imageselected?.allergens &&
  alleregenimgelist.filter((item) => imageselected?.allergens?.some((selected) => selected.id === item.id));

  return (
    <div className="imagesselected">
      <div >
      {
         name==="Ingredients" &&
         <div className='images1'>
           {foundItemsIngredient &&
                          foundItemsIngredient?.map((image) => (
                            <div className="selectedingredientsimage">
                              <img src="" alt="" />
                              <span>{image.name}</span>
                            </div>
                          ))}
         </div>
      }
      </div>
     <div>
     {
         name==="allergens" &&
         <div className='images2'>
            {foundItemsAllergens &&
                          foundItemsAllergens?.map((image) => (
                            <div className="selectedallergenimage">
                              <img src="" alt="" />
                              <span>{image.name}</span>
                            </div>
                          ))}
         </div>
      }


     </div>
      



     
      
    </div>
  );
};

export default ImagePillsSelected;

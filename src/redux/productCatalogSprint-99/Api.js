import axios from "axios"
export const itemCustomizationAPI= async(payload)=>{
    try{
        await axios.post("https://api.magilhub.com/magilhub-data-services/merchants/productCatalog",payload);
        console.log(payload)

    }catch(error){
        throw error;

    }
}


export const primarypageAPI = async (payload) => {
    try {
        const formData = new FormData();
formData.append('item', JSON.stringify(payload));
        const response = await axios.post(
            "https://api.magilhub.com/magilhub-data-services/merchants/productCatalog",
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        console.log("payload", payload);
        return response;
    } catch (error) {
        throw error;
    }
}

// export const postOutletRegistration = async (payload) => {
//     try {
//       const response = await axios.post(
//         "http://192.168.1.12:5000/outlets/outlet/registration",
//         payload
//       );
//       console.log("payload",payload);
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   };
export const PricingDetailApi= async(payload)=>{
    try{
        await axios.post("https://jsonplaceholder.typicode.com/todos",payload);
        console.log({payload})

    }catch(error){
        throw error;

    }
}

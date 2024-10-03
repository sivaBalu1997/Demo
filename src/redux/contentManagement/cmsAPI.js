import axios from "axios";

export const url1 = 'http://192.168.1.17:9000/cms/upload'
export const url2 = 'http://192.168.1.17:9000/cms/allMedia'

export const PostAPI = async (payload) => {
  try {
      const response = await axios.post(url1, payload, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
      return { data: response.data, status: response.status }
  } catch (error) {
      console.error(error) 
      throw new Error("Error in posting WelcomeImg!")
  }
}
  
export const GetAPI = async () => {
    return axios.get(`${url2}`) 
}
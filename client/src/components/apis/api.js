import axios from 'axios';
import {server} from '../../constants/config.jsx'


const getMessages = async (chatId, page ) => {
  try {
    const response = await axios.get(`${server}/api/v1/chat/message/${chatId}`, {
      params: { page },
      withCredentials: "true",
    });
    console.log("get msg rs: ", response);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

export {getMessages};
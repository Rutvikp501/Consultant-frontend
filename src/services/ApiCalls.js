import axios from "axios";
import { getLoginToken } from "./formatter";
// let url = 'http://172.16.100.91:5011/api'
 let url = 'https://sgf-consultant.onrender.com/api'
 //let url = 'http://localhost:5011/api'

const createHeaders = () => ({
    'Authorization': `Bearer ${getLoginToken()}`,
    'Content-Type': 'application/json',
});


export const dummyLeadsCall = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = [
            {
                title:'Lorem ipsum',
                des:'Lorem ipsum dolor sit amet consectetur.',
                status:0,
            },
            {
                title:'Lorem ipsum',
                des:'Lorem ipsum dolor sit amet consectetur.',
                status:1,
            },
            {
                title:'Lorem ipsum',
                des:'Lorem ipsum dolor sit amet consectetur.',
                status:2,
            },
            {
                title:'Lorem ipsum',
                des:'Lorem ipsum dolor sit amet consectetur.',
                status:1,
            },
            {
                title:'Lorem ipsum',
                des:'Lorem ipsum dolor sit amet consectetur.',
                status:0,
            },
            {
                title:'Lorem ipsum',
                des:'Lorem ipsum dolor sit amet consectetur.',
                status:1,
            },
            {
                title:'Lorem ipsum',
                des:'Lorem ipsum dolor sit amet consectetur.',
                status:2,
            },
            {
                title:'Lorem ipsum',
                des:'Lorem ipsum dolor sit amet consectetur.',
                status:1,
            },
            {
                title:'Lorem ipsum',
                des:'Lorem ipsum dolor sit amet consectetur.',
                status:2,
            },
            {
                title:'Lorem ipsum',
                des:'Lorem ipsum dolor sit amet consectetur.',
                status:1,
            },
            {
                title:'Lorem ipsum',
                des:'Lorem ipsum dolor sit amet consectetur.',
                status:0,
            },
            {
                title:'Lorem ipsum',
                des:'Lorem ipsum dolor sit amet consectetur.',
                status:1,
            },
            {
                title:'Lorem ipsum',
                des:'Lorem ipsum dolor sit amet consectetur.',
                status:2,
            },
            {
                title:'Lorem ipsum',
                des:'Lorem ipsum dolor sit amet consectetur.',
                status:1,
            },
        ]
        resolve(data);
      }, 500);
    });
  };

  export const dummyHomeCardsCall = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = [
            {
                title:'Seasonal Leads',
                num:10,
                des:'To wallet, bank or mobile number'
            },
            {
                title:'Seasonal Leads',
                num:10,
                des:'To wallet, bank or mobile number'
            },
            {
                title:'Seasonal Leads',
                num:10,
                des:'To wallet, bank or mobile number'
            },
            {
                title:'Seasonal Leads',
                num:10,
                des:'To wallet, bank or mobile number'
            },
        ]
        resolve(data);
      }, 500);
    });
  };

  export const loginCall = async (payload) => {
    try {
        const res = await axios.post(`${url}/adminapi/login`,payload)
        return res.data
    } catch (error) {
        console.error(error);
    }
  };

  export const getCommonApi = async (link) => {
    try {
        const headers = createHeaders();
        const res = await axios.get(`${url}${link}`,{headers})
        return res.data
    } catch (error) {
        console.error(error);
    }
  }

  export const postCommonApi = async (link,payload) => {
    try {
        const headers = createHeaders();
        const res = await axios.post(`${url}${link}`,payload,{headers})
        return res.data
    } catch (error) {
        console.error(error);
    }
  }
  
  export const postCommonWithoutPayloadApi = async (link,payload) => {
    try {
        const res = await axios.post(`${url}${link}`,payload)
        return res.data
    } catch (error) {
        console.error(error);
    }
  }
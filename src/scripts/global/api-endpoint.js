import configAPI from "./config";


const API_ENDPOINT = {
    HOME: `${configAPI.BASE_URL}list`,
    DETAIL: (id) => `${configAPI.BASE_URL}detail/${id}`,
    ADD_REVIEW: `${configAPI.BASE_URL}review`,
};


export default API_ENDPOINT;

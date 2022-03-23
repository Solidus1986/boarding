import axios from 'axios';

const params = {
  apiKey: process.env.REACT_APP_POLYGON_API_KEY
}

export const dailyOpenClose = async (business: string, date: string, method: Function) => {
  axios.get(`https://api.polygon.io/v1/open-close/${business}/${date}?adjusted=false`, {params})
  .then(response => {
    const apiResponse = response.data;
    method(apiResponse)
    sessionStorage.setItem(`${business}_${date}`, JSON.stringify(apiResponse))
  }).catch(error => {
    console.log(error);
  });
}


export const aggregatesBusiness = async (business: string, method: Function) => {
  axios.get(`https://api.polygon.io/v2/aggs/ticker/${business}/range/1/day/2022-02-01/2022-02-28?adjusted=true&sort=asc&limit=120`, {params})
  .then(response => {
    const apiResponse = response.data;  
    method(apiResponse)
    sessionStorage.setItem(`${business}_aggregates`, JSON.stringify(apiResponse))
  }).catch(error => {
    console.log(error);
  });
}

export const groupedDaily = async (date: string, method: Function) => {
  axios.get(`https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${date}?adjusted=true`, {params})
  .then(response => {
    const apiResponse = response.data;  
    method(apiResponse)
    sessionStorage.setItem(`grouped_daily_${date}`, JSON.stringify(apiResponse))
  }).catch(error => {
    console.log(error);
  });
}

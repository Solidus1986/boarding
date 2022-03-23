import { DataContext } from '../../context/dataContext';
import useAxios from '../../hooks/useAxios';
import { useContext } from 'react';

const params = {
  apiKey: process.env.REACT_APP_POLYGON_API_KEY
}

export default function Polygon() {

  const axios = useAxios()

  const { setDataLimit } = useContext(DataContext);

  const dailyOpenClose = async (business: string, date: string, method: Function) => {
    axios(`https://api.polygon.io/v1/open-close/${business}/${date}?adjusted=false`, { params, method: 'get' })
      .then(response => {
        const apiResponse = response.data;
        method(apiResponse)
        sessionStorage.setItem(`${business}_${date}`, JSON.stringify(apiResponse))
      }).catch(error => {
        if (error.toJSON().status === 429) {
          setDataLimit(true)
        } else if (error instanceof DOMException && error.code === error.ABORT_ERR) {
        }
        else {
          console.log(error.toJSON());
        }
      });
  }


  const aggregatesBusiness = async (business: string, method: Function) => {
    axios(`https://api.polygon.io/v2/aggs/ticker/${business}/range/1/day/2022-02-01/2022-02-28?adjusted=true&sort=asc&limit=120`, { params, method: 'get' })
      .then(response => {
        const apiResponse = response.data;
        method(apiResponse)
        sessionStorage.setItem(`${business}_aggregates`, JSON.stringify(apiResponse))
      }).catch(error => {
        if (error.toJSON().status === 429) {
          setDataLimit(true)
        } else if (error instanceof DOMException && error.code === error.ABORT_ERR) {
        }
        else {
          console.log(error.toJSON());
        }
      });
  }

  const groupedDaily = async (date: string, method: Function) => {
    axios(`https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${date}?adjusted=true`, { params, method: 'get' })
      .then(response => {
        const apiResponse = response.data;
        method(apiResponse)
        sessionStorage.setItem(`grouped_daily_${date}`, JSON.stringify(apiResponse))
      }).catch(error => {
        if (error.toJSON().status === 429) {
          setDataLimit(true)
        } else if (error instanceof DOMException && error.code === error.ABORT_ERR) {
        }
        else {
          console.log(error.toJSON());
        }
      });
  }

  return { dailyOpenClose, aggregatesBusiness, groupedDaily }

}


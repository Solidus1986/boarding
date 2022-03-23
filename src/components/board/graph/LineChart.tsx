import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { aggregatesBusiness } from '../../../services/api/Polygon';
import useResponsive from '../../../hooks/useResponsive';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const optionsPrice = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
      text: 'Share price',
      color: '#61dafb'
    },

  },
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },

};

export const optionsVolume = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
      text: 'Volume',
      color: '#61dafb'
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  },

};

export const formatTimeStamp = (timestamp: number) => {
  const date = new Date(timestamp).toLocaleDateString("en-IN");
  return `${date.split('/')[0]}/${date.split('/')[1]}`
}

export default function LineChart(props) {

  const [aggregates, setAggregates] = useState(null)
  const [dataPrice, setDataPrice] = useState(null)
  const [dataVolume, setDataVolume] = useState(null)

  const { screenType } = useResponsive()

  useEffect(() => {
    console.log("useEffect Line");
    
    if (sessionStorage.getItem(`${props.symbol}_aggregates`)) {
      console.log("useEffect Line if ok");
      const dataAggregates = JSON.parse(sessionStorage.getItem(`${props.symbol}_aggregates`))
      setAggregates(dataAggregates)
    } else {
      console.log("useEffect Line else ok");
      aggregatesBusiness(props.symbol, setAggregates)
    }


    const formatDataPrice = {
      labels: aggregates?.results.map((aggregate: Object) => formatTimeStamp(aggregate.t)),
      datasets: [
        {
          label: 'The open price',
          data: aggregates?.results.map((aggregate: Object) => aggregate.o),
          borderColor: 'rgb(153, 99, 132)',
          backgroundColor: 'rgb(153, 99, 132, .2)',
          borderWidth: 2,
          hidden: true
        },
        {
          label: 'The close price',
          data: aggregates?.results.map((aggregate: Object) => aggregate.c),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgb(255, 99, 132, .2)',
          borderWidth: 2,
          hidden: true
        },
        {
          label: 'The highest price',
          data: aggregates?.results.map((aggregate: Object) => aggregate.h),
          borderColor: 'rgb(132, 99, 255)',
          backgroundColor: 'rgb(132, 99, 255, .2)',
          borderWidth: 2,
          hidden: true
        },
        {
          label: 'The lowest price',
          data: aggregates?.results.map((aggregate: Object) => aggregate.l),
          borderColor: 'rgb(155, 199, 132)',
          backgroundColor: 'rgb(155, 199, 132, .2)',
          borderWidth: 2,
          hidden: true
        },
        {
          label: 'The volume weighted average price',
          data: aggregates?.results.map((aggregate: Object) => aggregate.vw),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgb(53, 162, 235, .2)',
          borderWidth: 2,
        },
      ],
    }

    const formatDataVolume = {
      labels: aggregates?.results.map((aggregate: Object) => formatTimeStamp(aggregate.t)),
      datasets: [
        {
          label: 'The trading volume',
          data: aggregates?.results.map((aggregate: Object) => aggregate.v),
          borderColor: 'rgb(30, 99, 132)',
          backgroundColor: "#ffbb11",
        }
      ]
    }
    setDataPrice(formatDataPrice)
    setDataVolume(formatDataVolume)



  }, [props])

  return (

    <div style={{ width: '100%', height: 'max-content', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
      <div>
        {dataPrice && <Line width={'100%'} height={screenType === 'DESKTOP' ? 50 : 100} options={optionsPrice} data={dataPrice} />}
      </div>
      <div>
        {dataVolume && <Bar width={'100%'} height={screenType === 'DESKTOP' ? 50 : 100} options={optionsVolume} data={dataVolume} />}
      </div>
    </div>
  )

}

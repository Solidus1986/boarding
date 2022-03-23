import React, { useState, useEffect } from 'react';
import styles from './OnBoard.module.scss';
import PieChart from './graph/PieChart';
import LineChart from './graph/LineChart';
import { dailyOpenClose, groupedDaily } from '../../services/api/Polygon';
import Input from '../../elements/input/Input';
import { useInput } from '../../hooks/useInput';
import Button from '../../elements/button/Button';

export const formatTimeStamp = (timestamp: number) => {
  const date = new Date(timestamp).toLocaleDateString("en-IN");
  return date
}

function OnBoard() {

  const business = [{ name: "Microsoft", symbol: "MSFT" }, { name: "Apple", symbol: "AAPL" }, { name: "Amazon", symbol: "AMZN" }, { name: "Alphabet", symbol: "GOOGL" }];

  const [choiceBusiness, setChoiceBusiness] = useState(business[0].symbol);
  const [dailyBusiness, setDailyBusiness] = useState({
    // afterHours: null,
    // close: null,
    // from: null,
    // high: null,
    // low: null,
    // open: null,
    // preMarket: null,
    // status: null,
    // symbol: null,
    // volume: null
  })

  const [groupedDailyBusiness, setGroupedDailyBusiness] = useState({})

  const { value: dateSelect, bind: bindDateSelect, reset: resetDateSelect } = useInput('');
  console.log(dateSelect, 'ma  new date');

  const options = business.map((element) => {
    return <option key={element.symbol} value={element.symbol} label={element.name}></option>;
  });

  const handleBusiness = (event) => {
    resetDateSelect()
    setDailyBusiness({
      // afterHours: null,
      // close: null,
      // from: null,
      // high: null,
      // low: null,
      // open: null,
      // preMarket: null,
      // status: null,
      // symbol: null,
      // volume: null
    })
    setChoiceBusiness(event.target.value)

  };

  const handleDateSelectSubmit = (event) => {
    event.preventDefault()

    if (sessionStorage.getItem(`${choiceBusiness}_${dateSelect}`)) {
      const data = JSON.parse(sessionStorage.getItem(`${choiceBusiness}_${dateSelect}`))
      setDailyBusiness(data)
    } else {
      dailyOpenClose(choiceBusiness, dateSelect, setDailyBusiness)
    }

  }

  useEffect(() => {
    
    if (sessionStorage.getItem(`grouped_daily_2022-03-10`)) {
      const data = JSON.parse(sessionStorage.getItem(`grouped_daily_2022-03-10`))
      setGroupedDailyBusiness(data)
    } else {
      groupedDaily('2022-03-10', setGroupedDailyBusiness)
    }
    console.log(groupedDailyBusiness)
    if(Object.values(dailyBusiness).map(item => item === null)){
      console.log('null');
    }
    
    
  }, [choiceBusiness])

  return (
    <div className={styles.board}>
      <div className={styles.boardleft}>
        <select className={styles.select} onChange={handleBusiness}>{options}</select>
        <div>
          <h4>{choiceBusiness}</h4>
          <form className={styles.datePicker} onSubmit={handleDateSelectSubmit}>
            <label for="start">Select date:</label>
            <Input type="date" id="start" name="datePiker" required {...bindDateSelect} />
            <Button name={"Submit"} type={"submit"} />
          </form>
          {Object.values(dailyBusiness).length > 0 &&
            <div className={styles.daily}>
              <h6>Information of {dateSelect}</h6>
              <ul>
                <li>afterHours : {dailyBusiness.afterHours}</li>
                <li>close : {dailyBusiness.close}</li>
                <li>from : {dailyBusiness.from}</li>
                <li>high : {dailyBusiness.high}</li>
                <li>low : {dailyBusiness.low}</li>
                <li>open : {dailyBusiness.open}</li>
                <li>preMarket : {dailyBusiness.preMarket}</li>
                <li>status : {dailyBusiness.status}</li>
                <li>symbol : {dailyBusiness.symbol}</li>
                <li>volume : {dailyBusiness.volume}</li>
              </ul>
            </div>
          }

        </div>

      </div>
      <div className={styles.boardright}>
        <div className={styles.graph}>
          <LineChart symbol={choiceBusiness} choiceBusiness={choiceBusiness} />
        </div>
        <div className={styles.camembert}>
          <PieChart />
        </div>
      </div>
    </div>
  )
}

export default OnBoard
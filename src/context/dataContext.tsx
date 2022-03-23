import { createContext, useState, useEffect, FC } from "react";

export const DataContext = createContext<any | undefined>(undefined)

export function DataContextProvider(props) {
  const [dataLimit, setDataLimit] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    if (dataLimit) {
      const timer = setTimeout(() => setDataLimit(false), 60000);
      return () => clearTimeout(timer);
    }
  }, [dataLimit])

  return (
    <DataContext.Provider value={{ dataLimit, setDataLimit }}>
      {!loadingData && props.children}
      {/* {props.children} */}
    </DataContext.Provider>
  )
}


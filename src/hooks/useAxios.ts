import {useRef, useEffect, useCallback} from "react"
import axios from 'axios';

export default function useAxios() {
  const abortControllerRef = useRef(new AbortController())

  useEffect(() => {
    return () => abortControllerRef.current.abort()
  }, [])

  return useCallback(
    (url, options) => 
      axios(url, { signal: abortControllerRef.current.signal, ...options }),
    []
  );
}
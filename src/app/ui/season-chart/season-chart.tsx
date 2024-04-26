import { Filters } from "./filters";
import { Chart } from "./chart";
import { SummaryStats } from "./summary-stats";
import { ChangeEvent, FC, useState, useEffect  } from 'react';

export function SeasonChart({year}: {year: number}) {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    console.log(`Loading data for ${year}`)
    fetch(`/data/season-${year}.json`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [year])
 
  if (isLoading) return <p>Loading...</p>

  return (
    <>
      <Filters data={data}></Filters>
      <SummaryStats data={data}></SummaryStats>
      <Chart data={data}></Chart>
    </>
  )
}
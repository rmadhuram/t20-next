import { Filters } from "./filters";
import { BallByBallChart } from "./ball-by-ball-chart";
import { SummaryStats } from "./summary-stats";
import { ChangeEvent, FC, useState, useEffect  } from 'react';
import { MatchData } from "@/lib/types";

export function SeasonChart({year}: {year: number}) {
  const [data, setData] = useState<MatchData[]>([])
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
      <SummaryStats data={data}></SummaryStats>
      <BallByBallChart data={data}></BallByBallChart>
    </>
  )
}
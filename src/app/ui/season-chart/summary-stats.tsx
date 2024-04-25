import { useState, useEffect } from "react";
import styles from "./summary-stats.module.scss";
import numeral from "numeral";

export function SummaryStats({data}: {data: any}) {
  const defaultSummaryStats = [
    {balls: 0, runs: 0, wickets: 0, rr: '0'},
    {balls: 0, runs: 0, wickets: 0, rr: '0'},
    {balls: 0, runs: 0, wickets: 0, rr: '0'},
    {balls: 0, runs: 0, wickets: 0, rr: '0'},
    {balls: 0, runs: 0, wickets: 0, rr: '0'},
    {balls: 0, runs: 0, wickets: 0, rr: '0'}
  ]
  const [summaryStats, setSummaryStats] = useState(defaultSummaryStats);
  
  function getSummaryStats(matches: any):any {
    console.log(`number of matches: ${matches.length}`)
    let stats = [
      {balls: 0, runs: 0, wickets: 0, rr: '0'},
      {balls: 0, runs: 0, wickets: 0, rr: '0'},
      {balls: 0, runs: 0, wickets: 0, rr: '0'},
      {balls: 0, runs: 0, wickets: 0, rr: '0'},
      {balls: 0, runs: 0, wickets: 0, rr: '0'},
      {balls: 0, runs: 0, wickets: 0, rr: '0'}
    ]
    for (let match = 0; match < matches.length; match++) {
      for (let innings = 0; innings < matches[match].innings.length; innings++) {
        let overs = matches[match].innings[innings].overs
        for (let i=0; i<overs.length; i++) {
          for (let j=0; j<overs[i].deliveries.length; j++) {
            let ballData = overs[i].deliveries[j]
            stats[innings].balls++
            stats[innings].runs += ballData.runs.total
            if (ballData.wickets) {
              stats[innings].wickets += ballData.wickets.length
            }
          }
        }
      }
    }

    stats[0].rr = numeral(stats[0].runs*6/stats[0].balls).format('0.00')
    stats[1].rr = numeral(stats[1].runs*6/stats[1].balls).format('0.00')
    return stats
  }

  useEffect(() => {
    setSummaryStats(getSummaryStats(data))
  }, [data])

  return (
    <div className={styles["stats-container"]}>
      <div className="stats-innings-1">
        <div className="stats">
          <div className="kpi runs">
            <h3>{summaryStats[0].runs}</h3>
            <h4>RUNS</h4>
          </div>
          <div className="kpi wickets">
            <h3>{summaryStats[0].wickets}</h3>
            <h4>WICKETS</h4>
          </div>
          <div className="kpi rr">
            <h3>{summaryStats[0].rr}</h3>
            <h4>RUN RATE</h4>
          </div>
        </div>
      </div>
      <div className="stats-innings-2">
        <div className="stats">
          <div className="kpi runs">
            <h3>{summaryStats[1].runs}</h3>
            <h4>RUNS</h4>
          </div>
          <div className="kpi wickets">
            <h3>{summaryStats[1].wickets}</h3>
            <h4>WICKETS</h4>
          </div>
          <div className="kpi rr">
            <h3>{summaryStats[1].rr}</h3>
            <h4>RUN RATE</h4>
          </div>
        </div>
      </div>
    </div>
  )
}
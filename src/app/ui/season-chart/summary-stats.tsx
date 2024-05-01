import { useState, useEffect } from "react";
import { getSeasonSummaryStats } from "@/lib/data";
import styles from "./summary-stats.module.scss";
import numeral from "numeral";
import { InningsSummary } from "@/lib/types";

export function SummaryStats({data}: {data: any}) {
  const defaultSummaryStats = [
    {balls: 0, runs: 0, wickets: 0, rr: '0'},
    {balls: 0, runs: 0, wickets: 0, rr: '0'},
    {balls: 0, runs: 0, wickets: 0, rr: '0'},
    {balls: 0, runs: 0, wickets: 0, rr: '0'},
    {balls: 0, runs: 0, wickets: 0, rr: '0'},
    {balls: 0, runs: 0, wickets: 0, rr: '0'}
  ]
  const [summaryStats, setSummaryStats] = useState<InningsSummary[]>(defaultSummaryStats);
  
  useEffect(() => {
    setSummaryStats(getSeasonSummaryStats(data))
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
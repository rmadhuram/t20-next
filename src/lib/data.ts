import { DropDownModel, InningsSummary, MatchData, OverData } from "./types";
import numeral from "numeral";

/**
 * Generate a flat array of deliveries for an innings. 
 * @param overs 
 * @returns 
 */
export function getDeliveries(overs: OverData[]): any[] {
  let runs = []
  for (let i=0; i<overs.length; i++) {
    for (let j=0; j<overs[i].deliveries.length; j++) {
      runs.push(overs[i].deliveries[j])
    }
  }
  return runs
}

/**
 * Get the summary stats for a given season.
 * @param matches 
 * @returns 
 */
export function getSeasonSummaryStats(matches: MatchData[]):InningsSummary[] {
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

/**
 * Get the list of players for a season in ascending order of their names.
 */
export function getPlayers(matches: MatchData[]):DropDownModel {
  let members = new Set()
  for(let i = 0; i< matches.length; i++) {
    let team = Object.values(matches[i].info.players)
    for(const players of team) {
      for(const individual of players) {
        members.add(individual)
      }
    }
  }
  members = Array.from(members)
  members = members.map(formatter)
  function formatter(player) {
    return {label:`${player}`, value: `${player}`}
  }
  console.log(members)
  return members
}

export function getVenues(matches: MatchData[]):DropDownModel {
  return [
    {label: 'M Chinnaswamy Stadium, Bengaluru', value: 'M Chinnaswamy Stadium, Bengaluru'},
    {label: 'MA Chidambaram Stadium, Chepauk, Chennai', value: 'MA Chidambaram Stadium, Chepauk, Chennai'}
  ]
}

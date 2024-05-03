export type OverData = {
  over: number,
  deliveries: any
}

export type MatchData = {
  info: {
    balls_per_over: number,
    city: string,
    dates: string[]
    players: string[]
  },
  innings: [{
    team: string,
    overs: any
  }]
}

export type InningsSummary = {
  balls: number, 
  runs: number, 
  wickets: number, 
  rr: string  // formatted.
}

export type DropDownModel = {
  label: string,
  value: string
}[]


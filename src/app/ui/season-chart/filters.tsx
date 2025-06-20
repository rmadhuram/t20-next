import { getPlayers, getVenues } from "@/lib/data"
import { Dropdown } from "primereact/dropdown"
import { useState } from "react"

export function Filters({data, callback}: {data: any, callback: any}) {
  const [selectedPlayer, setSelectedPlayer] = useState('')
  let players = getPlayers(data)

  const [selectedVenue, setSelectedVenue] = useState('')
  let venues = getVenues(data)

  return (
    <div className="filters">
      <h3>Filters</h3>
      <Dropdown value={selectedPlayer} onChange={(e) => {setSelectedPlayer(e.value); callback(e.value, selectedVenue)}} options={players} optionLabel="label" 
          placeholder="Select Player" className="w-full md:w-14rem" />

      <Dropdown value={selectedVenue} onChange={(e) => {setSelectedVenue(e.value); callback(selectedPlayer, e.value)}} options={venues} optionLabel="label" 
          placeholder="Select Venue" className="w-full md:w-14rem" />
    </div>
  )
}
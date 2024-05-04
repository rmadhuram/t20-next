let x = {
  "Chennai Super Kings": [
    "TU Deshpande",
    "DP Conway",
    "RD Gaikwad",
    "MM Ali",
    "BA Stokes",
    "AT Rayudu",
    "S Dube",
    "RA Jadeja",
    "MS Dhoni",
    "MJ Santner",
    "DL Chahar",
    "RS Hangargekar"
  ],
  "Gujarat Titans": [
    "KS Williamson",
    "WP Saha",
    "Shubman Gill",
    "B Sai Sudharsan",
    "HH Pandya",
    "V Shankar",
    "R Tewatia",
    "Rashid Khan",
    "Mohammed Shami",
    "J Little",
    "Yash Dayal",
    "AS Joseph"
  ]
}

let y = Object.values(x)
console.log([...y[0], ...y[1]])

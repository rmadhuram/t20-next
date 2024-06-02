"use client"
import 'primereact/resources/themes/mira/theme.css';
import styles from "./page.module.scss";
import { useState  } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { SeasonChart } from '@/app/ui/season-chart/season-chart';

export default function Home() {
  let years = []
  for (let year = 2024; year >= 2008; year--) {
    years.push({label: year, value: year})
  }
  
  const [selectedYear, setSelectedYear] = useState(2024);
  return (
    <div className={styles.container}>
      <div className="header">
        <h1>🏏 IPL Season </h1>
        <Dropdown value={selectedYear} onChange={(e) => setSelectedYear(e.value)} options={years} optionLabel="label" 
          placeholder="Select Year" className="w-full md:w-14rem" />
      </div>
      
      <p>The following graph visualizes the entire IPL season!</p>
      <SeasonChart year={selectedYear}></SeasonChart>
      <div className="footer">Developed with ❤️ by <a href="https://www.linkedin.com/in/rmadhuram/" target="_win">Raj Madhuram</a> and <a href="https://www.linkedin.com/in/john-calvin-b30953270/" target="_win">John Calvin</a></div>
    </div>
  );
}

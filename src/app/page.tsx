"use client"
import Image from "next/image";
import styles from "./page.module.scss";
import 'primereact/resources/themes/mira/theme.css';
import { ChangeEvent, FC, useState, useEffect  } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { SeasonChart } from '@/app/ui/season-chart/season-chart';

export default function Home() {
  let years = []
  for (let year = 2023; year >= 2008; year--) {
    years.push({label: year, value: year})
  }
  
  const [selectedYear, setSelectedYear] = useState('2023');
  return (
    <div className={styles.container}>
      <h1>🏏 IPL Season 
        <Dropdown value={selectedYear} onChange={(e) => setSelectedYear(e.value)} options={years} optionLabel="label" 
          placeholder="Select Year" className="w-full md:w-14rem" />
      </h1>
      <p>The following graph visualizes the entire IPL 2023 season!</p>
      <SeasonChart year={selectedYear}></SeasonChart>
    </div>
  );
}

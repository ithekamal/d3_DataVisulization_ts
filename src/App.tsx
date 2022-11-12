import "./App.css";
import AreaChart from "./AreaChart";
import DropDownMenu from "./DropDownMenu";
import { useState } from "react";

interface IAxis {
  styles: React.CSSProperties;
  values: number[];
}


interface ICard {
  label: string;
  subLabel: string;
  axes: IAxis[];
  width: number;
  height: number;
}


const data:ICard[] = [
  {
    label: "Scenario 1 ",
    subLabel: "$478.0m",
    width: 300,
    height: 200,
    axes: [
      {
        styles: { border: "1px solid darkBlue" },
        values: [50,0,10,50,60],
      },
    ],
  },
  {
    label: "Scenario 2 ",
    subLabel: "$478.0m",
    width: 300,
    height: 200,
    axes: [
      {
        styles: { border: "1px solid darkBlue" },
        values: [10, 30, 0, 20, 90, 20, 66],
      },
    ],
  },
];

function App() {
  const [kpiData, updatedKpiData] = useState<ICard[]>(data);
  console.log("HI from app Component",kpiData)

  //adding new KPI/Graph
  const addKpi = (newKpi:ICard) => {               //doubt
    updatedKpiData(() => [...kpiData, newKpi]);
  };

  return (
    <>
      <DropDownMenu addKpi={addKpi} />
      {kpiData.map(card => 
        <AreaChart 
        key = {card.label}
        props={card}  />
      )}
      {/* {kpiData.forEach(element => {
        <AreaChart props={element} />
      })} */}
    </>
  );
}

export default App;

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { NumberValue } from "d3";


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


interface IProps {
    props:ICard
}


function AreaCharts({props}:IProps) {
  
 const [removeKPI,setRemoveKPI] = useState(false)
  const data = props
  const dataAxesValues:number[] = data.axes[0].values
  const maxValue:number = Math.max(...dataAxesValues)  
  const areaChart = useRef<any>();     


  function deleteKPI() {
    setRemoveKPI(true)
  }


  useEffect(() => {
    const svg = d3
      .select(areaChart.current)
      .attr("width", data.width)
      .attr("height", data.height)
      .attr("class", "svgBox");


    var defs = svg.append("defs");
    var gradient = defs
      .append("linearGradient")
      .attr("id", "svgGradient")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "0%")
      .attr("y2", "100%");
    gradient
      .append("stop")
      .attr("class", "start")
      .attr("offset", "0%")
      .attr("stop-color", " #5b86e5")
      .attr("stop-opacity", 1);
    gradient
      .append("stop")
      .attr("class", "end")
      .attr("offset", "100%")
      .attr("stop-color", "#36d1dc")
      .attr("stop-opacity", 0);

    const x = d3
      .scaleLinear() //x-axis
      .domain([0, maxValue])  
      .range([0, data.width]);

    const y = d3
      .scaleLinear() //y- axis
      .domain([0,maxValue])
      .range([data.height - 100, 0]);


    const area:any = d3   //doubt
      .area()
      .x((d, index) =>
        x(index * (Math.max(...dataAxesValues) / (dataAxesValues.length - 1)))
      ) 

      .y0(y(0))
      .y1((d:any) => y(d));   //doubt

      //visualizing svg
    svg
      .append("path")
      .datum(dataAxesValues)
      .attr("d", area)
      .attr("fill", "url(#svgGradient)")
      .attr("stroke", "#8c50fc")
      .attr("stroke-width", 1.5)
      .attr("transform", "translate( 0, 100 )");

    //Label
    svg.append("text").attr("class", "label");
    svg.select(".label").attr("x", 20).attr("y", 30).text(`${data.label}`);

    //Sublabel
    svg.append("text").attr("class", "sublabel");
    svg
      .select(".sublabel")
      .attr("x", 20)
      .attr("y", 70)
      .text(`${data.subLabel}`);

    //Delete  button
    svg.append("text").attr("class", "delete");
    svg
      .select(".delete")
      .attr("x", data.width -  data.width/6)
      .attr("y", 30)
      .text(`x`)
      .on("click", deleteKPI);

  },[]);
  
  return (
    <div className="chartArea">
    { removeKPI === false ? <svg ref={areaChart}></svg> : null}
    </div>
  );
}

export default AreaCharts;

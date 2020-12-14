import React from "react";
import { scaleBand, scaleLinear, max } from 'd3';
import "./tableStyle.css";

const width = 400;
const height = 18;
function BarGraph(props) {
  const { data, d } = props;
  if (!data[0]) {
    return <pre>Loading...</pre>;
  }
  const yScale = scaleBand()
    .domain(data.map(d => d.total))
    .range([0, height]);

  const xScale = scaleLinear()
    .domain([0, max(data, d => d.total)])
    .range([0, width]);

  return (
    <svg className={props.flagGraph ? "svg-left" : "svg-right"} width={width} height={height} >
      <rect
        y={yScale(100)}
        x={props.flagGraph ? width - xScale(d.total) : 0}
        width={xScale(d.total)}
        height={18}
        fill={props.flagGraph ? "#16b157" : "#f05359"}
        opacity={0.4}
      />
    </svg>
  );
};


export default function ({ data, flagGraph, withoutBarChart=false }) {
  const header = (<div className="row row_header" style={{ display: "flex" }}>
    <div className="col">AMOUNT</div>
    <div className="col">TOTAL</div>
    <div className="col">PRICE</div>
  </div>)
  const displayTable = data.map((d) => {
    return <div className="row" style={{ display: "flex" }}>
      <div className="col">{parseFloat(d.amount).toFixed(4)}</div>
      <div className="col">{parseFloat(d.total).toFixed(2)}</div>
      <div className="col">{d.price}</div>
      {!withoutBarChart ? <BarGraph data={data} d={d} flagGraph={flagGraph}>{d.amount}</BarGraph>:null}
    </div>
  });
  return displayTable.length > 0 ? <div className={"table-content"} >{header}{displayTable}</div> : null;
}

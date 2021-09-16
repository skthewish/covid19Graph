import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

function Chart() {
  const [state, setState] = useState();
  const [data, setData] = useState({});
  const [states, setStates] = useState([]);

  useEffect(() => {
    async function getData() {
      const maindata = await d3.csv("/assets/states.csv");
      setStates(Array.from(new Set(maindata.map((ele) => ele.State))));
      const stateData = maindata.filter((ele) => {
        return ele.State === state;
      });
      setData(stateData);
    }
    getData();
  }, [state]);

  return (
    <>
      <select
        value={state}
        defaultValue="NA"
        onChange={(event) => setState(event.target.value)}
        className="selection"
      >
        <option value="NA">NA</option>
        {states.map((ele, index) => {
          return (
            <option value={ele} key={index}>
              {ele}
            </option>
          );
        })}
      </select>

      <div className="chart-cntr">
        <ResponsiveContainer width="100%" aspect={2.5}>
          <LineChart data={data} margin={{ left: 200, right: 200, top: 100 }}>
            <XAxis dataKey="Date" angle="-10" />
            <YAxis
              tickCount="10"
              type="number"
              domain={[0, 50000000]}
              allowDataOverflow={true}
            />
            <CartesianGrid />
            <Tooltip height="500" />
            <Legend
              verticalAlign="top"
              className="legends"
              iconType="rect"
              iconSize="10"
            />
            <Line dataKey="Confirmed" dot={false} stroke="#0000FF" />
            <Line dataKey="Recovered" dot={false} stroke="#FF0000" />
            <Line dataKey="Deceased" dot={false} stroke="#999900" />
            <Line dataKey="Other" dot={false} stroke="#00A300" />
            <Line dataKey="Tested" dot={false} stroke="#FF9933" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default Chart;

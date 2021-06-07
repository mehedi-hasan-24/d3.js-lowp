import { select } from "d3-selection";
import React, { useEffect, useRef } from "react";

const graphData = [
  {
    shopName: "六本⽊ヒルズ",
    areas: [
      {
        areaCode: 11,
        locations: [
          {
            locationCode: 110,
            locationPeriods: ["2020/08", "2021/02"],
            locationData: [146275, 146275],
          },
          {
            locationCode: 111,
            locationPeriods: ["2020/08", "2021/02"],
            locationData: [144586, 144586],
          },
          {
            locationCode: 112,
            locationPeriods: ["2020/08", "2021/02"],
            locationData: [147887, 147887],
          },
          {
            locationCode: 111,
            locationPeriods: ["2020/08", "2021/02"],
            locationData: [144586, 144586],
          },
          {
            locationCode: 112,
            locationPeriods: ["2020/08", "2021/02"],
            locationData: [147887, 147887],
          },
        ],
      },
      {
        areaCode: 12,
        locations: [
          {
            locationCode: 110,
            locationPeriods: ["2020/08", "2021/02"],
            locationData: [146275, 146275],
          },
          {
            locationCode: 111,
            locationPeriods: ["2020/08", "2021/02"],
            locationData: [144586, 144586],
          },
          {
            locationCode: 112,
            locationPeriods: ["2020/08", "2021/02"],
            locationData: [147887, 147887],
          },
        ],
      },
    ],
  },
  {
    shopName: "六本⽊ヒルズ2",
    areas: [
      {
        areaCode: 11,
        locations: [
          {
            locationCode: 110,
            locationPeriods: ["2020/08", "2021/02"],
            locationData: [146275, 146275],
          },
          {
            locationCode: 111,
            locationPeriods: ["2020/08", "2021/02"],
            locationData: [144586, 144586],
          },
          {
            locationCode: 112,
            locationPeriods: ["2020/08", "2021/02"],
            locationData: [147887, 147887],
          },
        ],
      },
      {
        areaCode: 12,
        locations: [
          {
            locationCode: 110,
            locationPeriods: ["2020/08", "2021/02"],
            locationData: [146275, 146275],
          },
          {
            locationCode: 111,
            locationPeriods: ["2020/08", "2021/02"],
            locationData: [144586, 144586],
          },
          {
            locationCode: 112,
            locationPeriods: ["2020/08", "2021/02"],
            locationData: [147887, 147887],
          },
        ],
      },
    ],
  },
];

const DrillDownLevel3 = () => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  // useEffect(() => {
  //   svgRef.current.innerHTML = "";
  //   const svg = select(svgRef.current);

  //   svg
  //     .attr("height", 10)
  //     .attr("width", 300)
  //     .style("border", "1px solid black")
  //     .style("background-color", "blue");
  // }, [svgRef.current]);

  const getSvg = (width) => {
    return (
      <svg
        style={{ background: "blue", height: `10px`, width: `${width}` }}
      ></svg>
    );
  };
  console.log("graphData =>>>", graphData);
  const drawTable = () => {
    for (let i = 0; i < graphData.length; i++) {
      for (let j = 0; j < graphData[i].areas.length; j++) {
        graphData[i].areas[j].locations.map((loc, locIndex) => {
          // console.log(loc.locationCode);
          return <div>{loc.locationCode}</div>;
        });
      }
    }
  };

  return (
    <div>
      <table
        style={{
          width: "100%",
          borderBottom: "1px solid black",
        }}
      >
        <tr
          style={{
            textAlign: "center",
          }}
        >
          <th style={{ width: "10%" }}>店舗名称</th>
          <th style={{ width: "10%" }}>エリア</th>
          <th style={{ width: "10%" }}>ロケーション</th>
          <th style={{ width: "35%" }}>2020/08</th>
          <th style={{ width: "35%" }}>2021/02</th>
        </tr>
        {/* <tr>
          <td style={{ width: "10%", textAlign: "center" }}>六本⽊ヒルズ</td>
          <td style={{ width: "10%", textAlign: "center" }}>11</td>
          <td style={{ width: "10%", textAlign: "center" }}>110</td>
          <td style={{ width: "35%", textAlign: "left" }}>
            {getSvg(100)} 123456
          </td>
          <td style={{ width: "35%", textAlign: "left" }}>
            {getSvg(200)} 123456
          </td>
        </tr> */}
      </table>

      {drawTable()}
    </div>
  );
};

export default DrillDownLevel3;

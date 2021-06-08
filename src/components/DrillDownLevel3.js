import { scaleLinear } from "d3-scale";
import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
import useResizeObserver from "../utilities/useResizeObserver";

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
  const tableRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    tableRef.current.innerHTML = "";

    dimensions.boundedHeight =
      dimensions.height - dimensions.margins.top - dimensions.margins.bottom;
    dimensions.boundedWidth =
      dimensions.width - dimensions.margins.left - dimensions.margins.right;

    let tableDiv = d3.select(tableRef.current);

    tableDiv
      .style("height", dimensions.boundedHeight + "px")
      .style("width", dimensions.boundedWidth + "px")
      .style("border", "1px solid black")
      .style("overflow-y", "scroll");

    let table = tableDiv.append("table").attr("width", "100%");
    let thead = table.append("thead");
    let tbody = table.append("tbody");

    const columnName = [
      "店舗名称",
      "エリア",
      "ロケーション",
      ...graphData[0].areas[0].locations[0].locationPeriods,
    ];
    thead
      .append("tr")
      .selectAll("th")
      .data(columnName)
      .enter()
      .append("th")
      .style("width", (_, i) => (i < 3 ? "10%" : ""))
      .text((column) => column);

    for (let i = 0; i < graphData.length; i++) {
      for (let j = 0; j < graphData[i].areas.length; j++) {
        for (let k = 0; k < graphData[i].areas[j].locations.length; k++) {
          let tr = tbody.append("tr");
          tr.append("td")
            .text(graphData[i].shopName)
            .style("text-align", "center");
          tr.append("td")
            .text(graphData[i].areas[j].areaCode)
            .style("text-align", "center");
          tr.append("td")
            .text(graphData[i].areas[j].locations[k].locationCode)
            .style("text-align", "center");
          graphData[i].areas[j].locations[k].locationData.forEach((d) => {
            tr.append("td").text(d).style("text-align", "left");
          });
        }
      }
    }

    console.log(dimensions.boundedWidth);

    // console.log(table);
  }, [dimensions, wrapperRef.current]);

  const getSvg = (width) => {
    return (
      <svg
        style={{ background: "blue", height: `10px`, width: `${width}` }}
      ></svg>
    );
  };

  return (
    <div ref={wrapperRef}>
      <div ref={tableRef}></div>
      {/* <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{}}>
            <th style={{ width: "10%", borderBottom: "1px solid black" }}>
              店舗名称
            </th>
            <th style={{ width: "10%", borderBottom: "1px solid black" }}>
              エリア
            </th>
            <th style={{ width: "10%", borderBottom: "1px solid black" }}>
              ロケーション
            </th>
            {graphData[0].areas[0].locations[0].locationPeriods.map(
              (locPeriod) => (
                <th
                  style={{
                    width: "35%",
                    borderBottom: "1px solid black",
                    borderLeft: "1px solid black",
                  }}
                  key={locPeriod}
                >
                  {locPeriod}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {graphData.map((shop, shopIndex) =>
            shop.areas.map((area, areaIndex) =>
              area.locations.map((loc, locIndex) => (
                <tr key={locIndex}>
                  <td style={{ textAlign: "center" }}>{shop.shopName}</td>
                  <td style={{ textAlign: "center" }}>{area.areaCode}</td>
                  <td style={{ textAlign: "center" }}>{loc.locationCode}</td>
                  {loc.locationData.map((locData, locDataIndex) => (
                    <td
                      style={{
                        width: "35%",
                        borderLeft: "1px solid black",
                      }}
                      key={locDataIndex}
                      ref={tdRef}
                    >
                      {locData}
                    </td>
                  ))}
                </tr>
              ))
            )
          )}
        </tbody>

        <tfoot></tfoot>
      </table> */}
    </div>
  );
};

export default DrillDownLevel3;

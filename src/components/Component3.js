import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
// import "./App.css";
import { select, scaleOrdinal } from "d3";
import useResizeObserver from "./../utilities/useResizeObserver";

const Component3 = () => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  //rounding the value of upper value
  // const roundMax = (number) => {
  //   let digitCount = number.toString().length;
  //   return (
  //     1.5 * (parseInt(number.toString()[0]) + 1) * Math.pow(10, digitCount - 1)
  //   );
  // };

  useEffect(() => {
    svgRef.current.innerHTML = "";
    const svg = select(svgRef.current);

    dimensions.boundedHeight =
      dimensions.height - dimensions.margins.top - dimensions.margins.bottom;
    dimensions.boundedWidth =
      dimensions.width - dimensions.margins.left - dimensions.margins.right;

    svg
      .attr("height", dimensions.height)
      .attr("width", dimensions.width)
      .style("border", "1px solid black");

    //Chart Container
    const bounds = svg
      .append("g")
      .attr("height", dimensions.boundedHeight)
      .attr("width", dimensions.boundedWidth)
      .style(
        "transform",
        "translate(" +
          dimensions.margins.left +
          "px, " +
          dimensions.margins.top +
          "px)"
      );

    const headerData = [
      "店舗名称",
      "エリア",
      "ロケーション",
      "2020/08",
      "2021/02",
    ];

    console.log("dimensions.boundedWidth ", dimensions.boundedWidth);
    const ordinalScale = scaleOrdinal()
      .domain(headerData)
      .range([
        dimensions.boundedWidth * 0,
        dimensions.boundedWidth * 0.09,
        dimensions.boundedWidth * 0.16,
        dimensions.boundedWidth * 0.4,
        dimensions.boundedWidth * 0.75,
      ]);

    //Drawing Header Information
    bounds
      .append("g")
      .selectAll("text")
      .data(headerData)
      .enter()
      .append("text")
      .attr("x", (d, i) => {
        console.log(ordinalScale(i));
        return ordinalScale(d);
      })
      .attr("y", 0)
      .text((d) => d);

    //Drawing Separator Line
    bounds
      .append("g")
      .attr("class", "separtor-line")
      .append("line")
      .style("stroke", "black")
      .style("stroke-width", 1)
      .attr("x1", 0)
      .attr("y1", 10)
      .attr("x2", dimensions.boundedWidth)
      .attr("y2", 10);

    //Drawing Separator Line
    bounds
      .append("g")
      .attr("class", "separtor-line")
      .append("line")
      .style("stroke", "black")
      .style("stroke-width", 1)
      .attr("x1", 0)
      .attr("y1", 10)
      .attr("x2", dimensions.boundedWidth)
      .attr("y2", 10);
  }, [dimensions, wrapperRef.current]);

  return (
    <div
      ref={wrapperRef}
      id="graphContainer"
      style={{
        height: "400px",
        overflowY: "scroll",
        overflowX: "hidden",
      }}
    >
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Component3;

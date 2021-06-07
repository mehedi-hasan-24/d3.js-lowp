import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./../App.css";
import { axisBottom, axisLeft, scaleBand, select } from "d3";

const Component1 = () => {
  const xTicksValues = ["max", "avg", "min"];
  const EVALUATIONS_DATA = [
    [
      {
        company_code: "company_one",
        evaluation_indicator_id: 1,
        evaluation_indicator: "棚卸⾦額",
        business_period: "2020/08",
        ei_max: 161276452,
        ei_avg: 35568417,
        ei_min: 5400169,
      },
    ],
    [
      {
        company_code: "company_one",
        evaluation_indicator_id: 1,
        evaluation_indicator: "棚卸⾦額",
        business_period: "2020/08",
        ei_max: 163541563,
        ei_avg: 36321919,
        ei_min: 4858858,
      },
    ],
  ];
  let svgRef = useRef();

  const roundMax = (number) => {
    let digitCount = number.toString().length;
    return (parseInt(number.toString()[0]) + 1) * Math.pow(10, digitCount - 1);
  };
  useEffect(() => {
    svgRef.current.innerHTML = "";
    const svg = select(svgRef.current);

    //SVG dimention Markup
    const dimensions = {
      height: 400,
      width: 1000,
      margins: {
        top: 50,
        left: 50,
        bottom: 50,
        right: 50,
      },
      textMargin: {
        top: 5,
        left: 5,
      },
    };

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

    //will divide our bounds width by number of charts we want to draw ## widthDividerScale(index) will return an integer that is the right most pixel of a single graph
    const widthDividerScale = d3
      .scaleLinear()
      .domain([0, EVALUATIONS_DATA.length])
      .range([0, dimensions.boundedWidth]);

    //Scale for X-Axis
    const xScale = scaleBand()
      .domain(xTicksValues)
      .range([0, widthDividerScale(1)])
      .paddingInner(0.1)
      .paddingOuter(0.5);

    //Scale for Left Axis
    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        roundMax(
          d3.max(EVALUATIONS_DATA, (datum) => d3.max(datum, (d1) => d1.ei_max))
        ),
      ])
      .range([dimensions.boundedHeight, dimensions.margins.bottom]);

    //Axis for plotting main data.
    // const yAxis = bounds
    //   .append("g")
    //   .call(
    //     axisLeft()
    //       .scale(yScale)
    //       .ticks(2)
    //       .tickFormat(d3.format(".0s"))
    //       .tickSizeOuter(0)
    //       .tickSize(0)
    //       .tickPadding(7)
    //   );

    //X-Axis
    // const xAxis = bounds
    //   .append("g")
    //   .attr("class", "x-axis")
    //   .selectAll("g")
    //   .data(EVALUATIONS_DATA)
    //   .enter()
    //   .append("g")
    //   .attr("transform", (d, i) => {
    //     return `translate(${widthDividerScale(i)}, ${
    //       dimensions.boundedHeight
    //     } )`;
    //   })
    //   .call(axisBottom().scale(xScale).tickSize(0).tickPadding(8));

    //Drawing Grid Lines
    bounds
      .append("g")
      .attr("class", "grid-line")
      .call(
        axisLeft()
          .scale(yScale)
          .ticks(8)
          .tickSize(-dimensions.boundedWidth)
          .tickFormat("")
          .tickSizeOuter(0)
      )
      .style("opacity", "0.3");

    //Drawing Bars
    bounds
      .append("g")
      .attr("class", "bar-container")
      .selectAll("g")
      .data(EVALUATIONS_DATA)
      .enter()
      .append("g")
      .attr("transform", (_, i) => {
        return `translate(${widthDividerScale(i)},0)`;
      })
      .selectAll("rect")
      .data((d) => {
        return [d[0].ei_max, d[0].ei_avg, d[0].ei_min];
      })
      .enter()
      .append("rect")
      .attr("x", (_, i) => xScale(xTicksValues[i]))
      .attr("y", (d) => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => dimensions.boundedHeight - yScale(d))
      .attr("fill", (_, i) => {
        const current = xTicksValues[i];
        switch (current) {
          case "min": {
            return "#379DB5";
          }
          case "avg": {
            return "#FCAE7A";
          }
          case "max": {
            return "#9773C6";
          }
          default: {
            return "#000";
          }
        }
      });

    //Drawing Bar labels
    bounds
      .append("g")
      .selectAll("g")
      .data(EVALUATIONS_DATA)
      .enter()
      .append("g")
      .attr("transform", (_, i) => {
        return `translate(${widthDividerScale(i)},0)`;
      })
      .selectAll("rect")
      .data((d) => {
        return [d[0].ei_max, d[0].ei_avg, d[0].ei_min];
      })
      .enter()
      .append("text")
      .text((d) => d.toLocaleString())
      .attr("font-weight", "bold")
      .attr("x", (_, i) => xScale(xTicksValues[i]))
      .attr("y", (d) => yScale(d) - dimensions.textMargin.top)
      .style("font-size", "0.95rem")
      .attr("fill", (_, i) => {
        const current = xTicksValues[i];
        switch (current) {
          case "min": {
            return "#379DB5";
          }
          case "avg": {
            return "#FCAE7A";
          }
          case "max": {
            return "#9773C6";
          }
          default: {
            return "#000";
          }
        }
      });

    //Drawing Business period
    bounds
      .append("g")
      .selectAll("text")
      .data(EVALUATIONS_DATA)
      .enter()
      .append("text")
      .attr("x", (_, i) => widthDividerScale(i) + widthDividerScale(1) / 2)
      .attr("y", dimensions.margins.top / 2)
      .text((d) => d[0].business_period)
      .attr("font-weight", "bold");

    //Drawing Separator Line
    bounds
      .append("g")
      .attr("class", "separtor-line")
      .selectAll("line")
      .data(d3.range(EVALUATIONS_DATA.length + 1))
      .enter()
      .append("line")
      .style("stroke", "black")
      .style("stroke-width", 1)
      .attr("x1", (_, i) => widthDividerScale(i))
      .attr("y1", (_, i) => dimensions.margins.top - widthDividerScale(1) / 20)
      .attr("x2", (_, i) => widthDividerScale(i))
      .attr("y2", (_, i) =>
        i === 0 ? dimensions.margins.top : dimensions.boundedHeight
      );
  }, [EVALUATIONS_DATA]);
  return <svg ref={svgRef}></svg>;
};

export default Component1;

import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
// import "./App.css";
import { select, axisBottom, scaleBand, axisLeft } from "d3";

const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState({
    height: 500,
    width: 1200,
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
  });

  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      // console.log(entries);
      if (!Array.isArray(entries)) return;
      if (!entries.length) return;
      const entry = entries[0];
      console.log(entry.contentRect.height);
      // entries.forEach((entry) => setDimensions(entry.contentRect));
      setDimensions({
        ...dimensions,
        // height: entry.contentRect.height,
        width: entry.contentRect.width,
      });
    });

    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);
  return dimensions;
};

const Component2 = () => {
  //rounding the value of upper value
  const roundMax = (number) => {
    let digitCount = number.toString().length;
    return (
      1.5 * (parseInt(number.toString()[0]) + 1) * Math.pow(10, digitCount - 1)
    );
  };

  const graphData = {
    timePeriods: ["2020/08", "2021/02"],
    data: [
      {
        storeName: "store AAAAAAAAAAAAAAAAAAAAAAAAAA",
        indicatorValue: [
          {
            indicatorData: [49527416, 246275],
          },
          {
            indicatorData: [49527416, 246275],
          },
        ],
      },
      {
        storeName: "store B",
        indicatorValue: [
          {
            indicatorData: [29527416, 146275],
          },
          {
            indicatorData: [29527416, 146275],
          },
        ],
      },
      {
        storeName: "store C",
        indicatorValue: [
          {
            indicatorData: [29527416, 146275],
          },
          {
            indicatorData: [29527416, 46275],
          },
        ],
      },
      {
        storeName: "store D",
        indicatorValue: [
          {
            indicatorData: [29527416, 146275],
          },
          {
            indicatorData: [29527416, 146275],
          },
        ],
      },
      {
        storeName: "store E",
        indicatorValue: [
          {
            indicatorData: [29527416, 146275],
          },
          {
            indicatorData: [29527416, 146275],
          },
        ],
      },
      {
        storeName: "store F",
        indicatorValue: [
          {
            indicatorData: [29527416, 146275],
          },
          {
            indicatorData: [29527416, 46275],
          },
        ],
      },
      {
        storeName: "store G",
        indicatorValue: [
          {
            indicatorData: [29527416, 146275],
          },
          {
            indicatorData: [29527416, 146275],
          },
        ],
      },
      {
        storeName: "store G",
        indicatorValue: [
          {
            indicatorData: [29527416, 146275],
          },
          {
            indicatorData: [29527416, 146275],
          },
        ],
      },
      {
        storeName: "store H",
        indicatorValue: [
          {
            indicatorData: [29527416, 146275],
          },
          {
            indicatorData: [29527416, 146275],
          },
        ],
      },
      {
        storeName: "store I",
        indicatorValue: [
          {
            indicatorData: [29527416, 146275],
          },
          {
            indicatorData: [29527416, 46275],
          },
        ],
      },
      {
        storeName: "store J",
        indicatorValue: [
          {
            indicatorData: [29527416, 146275],
          },
          {
            indicatorData: [29527416, 146275],
          },
        ],
      },
      {
        storeName: "store K",
        indicatorValue: [
          {
            indicatorData: [29527416, 6275],
          },
          {
            indicatorData: [29527416, 146275],
          },
        ],
      },
      {
        storeName: "store l",
        indicatorValue: [
          {
            indicatorData: [29527416, 6275],
          },
          {
            indicatorData: [29527416, 146275],
          },
        ],
      },
      {
        storeName: "store m",
        indicatorValue: [
          {
            indicatorData: [29527416, 6275],
          },
          {
            indicatorData: [29527416, 146275],
          },
        ],
      },
    ],
  };
  const svgRef = useRef();
  const wrapperRef = useRef();

  const DIMENSIONS = useResizeObserver(wrapperRef);

  // will be called initially and on every data change
  useEffect(() => {
    svgRef.current.innerHTML = "";
    const svg = select(svgRef.current);
    console.log(DIMENSIONS);
    if (!DIMENSIONS) return;
    //SVG dimention Markup
    const dimensions = DIMENSIONS;

    dimensions.boundedHeight =
      dimensions.height - dimensions.margins.top - dimensions.margins.bottom;
    dimensions.boundedWidth =
      dimensions.width - dimensions.margins.left - dimensions.margins.right;

    svg
      .attr("height", dimensions.height)
      .attr("width", dimensions.width)
      .style("border", "1px solid black")
      .style("overflow-y", "auto");

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
      .domain([0, graphData.timePeriods.length])
      .range([0, dimensions.boundedWidth]);

    //Scale for Y-Axis
    const yScale = scaleBand()
      .domain(graphData.data.map((d) => d.storeName))
      .range([0, dimensions.boundedHeight])
      // .range([0, graphData.data.length * 100])
      // .paddingInner(0.1)
      .paddingOuter(0.1);

    //xScale generator
    const xScaleGenerator = (upperBound) => {
      return d3
        .scaleLinear()
        .domain([0, upperBound])
        .range([0, widthDividerScale(1) / 2 - 20]);
    };

    //xScales for four graph groups
    let xScales = [
      xScaleGenerator(
        roundMax(
          d3.max(graphData.data, (d, _) => d.indicatorValue[0].indicatorData[0])
        )
      ),
      xScaleGenerator(
        roundMax(
          d3.max(graphData.data, (d, _) => d.indicatorValue[0].indicatorData[1])
        )
      ),
      xScaleGenerator(
        roundMax(
          d3.max(graphData.data, (d, _) => d.indicatorValue[1].indicatorData[0])
        )
      ),
      xScaleGenerator(
        roundMax(
          d3.max(graphData.data, (d, _) => d.indicatorValue[1].indicatorData[1])
        )
      ),
    ];

    //Drawing Business period
    bounds
      .append("g")
      .selectAll("text")
      .data(graphData.timePeriods)
      .enter()
      .append("text")
      .attr("x", (_, i) => widthDividerScale(i) + widthDividerScale(1) / 2)
      .attr("y", -10)
      .text((d) => d)
      .attr("font-weight", "bold");

    //Drawing the bars && text
    let barContainers = bounds.append("g").attr("class", "bar-containers");
    let textContainers = bounds.append("g").attr("class", "text-containers");

    for (let index = 0; index < graphData.data.length; index++) {
      //Drawing the bars
      barContainers
        .append("g")
        .selectAll("rect")
        .data([
          ...graphData.data[index].indicatorValue[0].indicatorData,
          ...graphData.data[index].indicatorValue[1].indicatorData,
        ])
        .enter()
        .append("rect")
        .attr("x", (_, i) => (widthDividerScale(1) / 2) * i)
        .attr(
          "y",
          (_, i) =>
            yScale(graphData.data[index].storeName) + yScale.bandwidth() / 4
        )
        .attr("width", (d, i) => xScales[i](d))
        .attr("height", yScale.bandwidth() / 2)
        .attr("fill", index === 0 ? "#379DB4" : "#D7EBF0");

      //Drawing the text
      textContainers
        .append("g")
        .selectAll("text")
        .data([
          ...graphData.data[index].indicatorValue[0].indicatorData,
          ...graphData.data[index].indicatorValue[1].indicatorData,
        ])
        .enter()
        .append("text")
        .text((d) => d.toLocaleString())
        .attr("font-weight", "bold")
        .attr("x", (d, i) => xScales[i](d) + (widthDividerScale(1) / 2) * i + 4)
        .attr(
          "y",
          (d) =>
            yScale(graphData.data[index].storeName) + yScale.bandwidth() * 0.7
        )
        .style("font-size", (d, i) => yScale.bandwidth() / 2)
        .attr("fill", index === 0 ? "#379DB4" : "#D7EBF0");
    }

    //X-Axis
    const xAxisGroup = bounds.append("g").attr("class", "x-axis-container");

    for (let i = 0; i < graphData.data[0].indicatorValue.length; i++) {
      let axisHolder = xAxisGroup
        .append("g")
        .attr(
          "transform",
          `translate(${widthDividerScale(i)},${dimensions.boundedHeight})`
        );

      for (
        let j = 0;
        j < graphData.data[0].indicatorValue[i].indicatorData.length;
        j++
      ) {
        axisHolder
          .append("g")
          .attr(
            "transform",
            `translate(${(widthDividerScale(1) / 2) * j},${0})`
          )
          .call(
            axisBottom()
              .scale(
                xScaleGenerator(
                  roundMax(
                    d3.max(
                      graphData.data,
                      (d, indicatorIndex) =>
                        d.indicatorValue[i].indicatorData[j]
                    )
                  )
                )
              )
              .ticks(5)
              .tickSize(0)
              .tickFormat(d3.format(".0s"))
          );
      }
    }

    //Y-axis
    const yAxis = bounds
      .append("g")
      .attr("class", "y-axis")
      .call(
        axisLeft()
          .scale(yScale)
          .tickSize(0)
          .tickFormat((d) => {
            return d.length > 7 ? d.substring(0, 7) + "..." : d;
          })
      );

    //Drawing Separator Line
    bounds
      .append("g")
      .attr("class", "separtor-line")
      .selectAll("line")
      .data(d3.range(graphData.timePeriods.length))
      .enter()
      .append("line")
      .style("stroke", "black")
      .style("stroke-width", 1)
      .attr("x1", (_, i) => widthDividerScale(i + 1))
      .attr("y1", 0)
      .attr("x2", (_, i) => widthDividerScale(i + 1))
      .attr("y2", dimensions.boundedHeight);
  }, [graphData, DIMENSIONS, wrapperRef.current]);

  return (
    <div ref={wrapperRef} id="graphContainer">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Component2;

import * as d3 from 'd3'
import { useEffect, useRef } from "react";
import styles from "./ball-by-ball.module.scss";
import { getDeliveries } from '@/lib/data';

export function BallByBallChart({data}: {data: any}) {
  const ref:any = useRef();

  function drawLineMarker(svg: any, x:  number) {
    svg
      .append('line')
      .attr('x1', x)
      .attr('y1', 0)
      .attr('x2', x)
      .attr('y2', data.length * 6 -1 )
      .attr('style', 'stroke:#888;stroke-width:2')
      .attr('class', 'marker')
  }

  const t = d3.transition()
    .duration(2000)

  useEffect(() => {
    console.log('render chart: ', data.length)

    d3
      .select(ref.current)
      .select("svg")
      .remove()

    let tooltip = d3.select(ref.current)
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")
      .style("position", "absolute")

    let mouseover = (event: any, d: any) => {
      tooltip
        .style("opacity", 1)

      d3.select(event.currentTarget)
        .style("stroke", "black")
        .style("opacity", 1)
    }

    var mousemove = function(event: any, d: any) {
      const [x, y] = d3.pointer(event);

      tooltip
        .html(`
          <div>Batter: ${d.batter}</div>
          <div>Bowler: ${d.bowler}</div>
          <div>Runs: ${d.runs.total}</div>
        `)
        .style("left", (x+20) + "px")
        .style("top", (y+20) + "px")
    }

    var mouseleave = (event: any, d: any) => {
      tooltip
        .style("opacity", 0)
      d3.select(event.currentTarget)
        .style("stroke", "none")
        .style("opacity", 0.8)
    }

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", "1400")
      .attr("height", "600")

    let colors = ['#fff', '#eee', '#aaa', '#999', 'red', 'orange', 'green', 'blue']
    for (let match = 0; match < data.length; match++) {
      for (let innings = 0; innings < data[match].innings.length; innings++) {
        let id = `match-${match}-${innings}`
        let elem = svg.append('g').attr('id', id)

        let overs = data[match].innings[innings].overs
        let runs = getDeliveries(overs)
        d3.select('#' + id)
          .selectAll('rect')
          .data(runs)
          .join('rect')
          .attr('x', function(d, ball) {
            let cx = 10
            return cx;
          })
          .attr('y', match * 3)
          .attr('rx', 3)
          .attr('ry', 3)
          .attr('width', 5)
          .attr('height', 5)
          .attr('opacity', 0.8)
          .style('fill', function(d) {
            if (d.wickets) {
              return 'black'
            }
            return colors[d.runs.total]
          })  
          .attr('x', function(d, ball) {
            let cx = ball * 5 + innings * 680 + 10
            return cx;
          })
          .attr('y', match * 6)
          .on("mouseover", mouseover)
          .on("mousemove", mousemove)
          .on("mouseleave", mouseleave)
      }
    }

    drawLineMarker(svg, 10)
    drawLineMarker(svg, 190)
    drawLineMarker(svg, 15*6*5 + 10)
    drawLineMarker(svg, 20*6*5 + 10)

    drawLineMarker(svg, 680 + 10)
    drawLineMarker(svg, 680 + 190)
    drawLineMarker(svg, 680 + 15*6*5 + 10)
    drawLineMarker(svg, 680 + 20*6*5 + 10)
  }, [data])

  let posRelative = "position: relative";

  return (
    <div className={styles.chart} ref={ref}>
    </div>
  )
}

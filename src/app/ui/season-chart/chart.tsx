import * as d3 from 'd3'
import { useEffect, useRef } from "react";
import * as md5 from "md5";

export function Chart({data}: {data: any}) {
  const ref = useRef();

  function getRuns(overs: any) {
    let runs = []
    for (let i=0; i<overs.length; i++) {
      for (let j=0; j<overs[i].deliveries.length; j++) {
        runs.push(overs[i].deliveries[j])
      }
    }
    return runs
  }

  function drawLineMarker(svg, x) {
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
    console.log('md5: ', md5(JSON.stringify(data)))

    d3
      .select(ref.current)
      .select("svg")
      .remove()

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
        let runs = getRuns(overs)
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

  return (
    <div className="chart" ref={ref}>
    </div>
  )
}

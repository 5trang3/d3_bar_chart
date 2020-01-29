d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json').then(json => {
  const gdpData = json.data;
  const svgWidth = 1000;
  const svgHeight = 750;
  const barWidth = 1000 / json.data.length;
  const svg = d3.select('body')
                .append('svg')
                .attr('width', svgWidth)
                .attr('height', svgHeight)
  svg.selectAll('rect')
     .data(gdpData)
     .enter()
     .append('rect')
     .attr('x', (d, i) => i * barWidth)
     .attr('y', (d) => svgHeight - d[1] / 25)
     .attr('width', barWidth)
     .attr('height', (d, i) => d[1] / 25)
     .attr('fill', '#633A82')
}, error => {

})

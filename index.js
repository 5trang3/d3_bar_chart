d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json').then(json => {
  const gdpData = json.data;
  const svgWidth = 1000;
  const svgHeight = 750;
  const barWidth = 1000 / json.data.length;
  const svg = d3.select('body')
                .append('svg')
                .attr('width', svgWidth)
                .attr('height', svgHeight)

  const tooltip = d3.select('body')
                    .append('div')

  let dateConverter = function(date) {
    const month = date.split('')[6];
    switch (month) {
      case '1':
        return 'January ' + date.split('-')[0]
        break;
      case '4':
        return 'April ' + date.split('-')[0]
        break;
      case '7':
        return 'July ' + date.split('-')[0]
        break;
      case '0':
      return 'October ' + date.split('-')[0]
      default:
      return ''
    }
  }
  svg.selectAll('rect')
     .data(gdpData)
     .enter()
     .append('rect')
     .attr('x', (d, i) => i * barWidth)
     .attr('y', (d) => svgHeight - d[1] / 25)
     .attr('width', barWidth)
     .attr('height', (d, i) => d[1] / 25)
     .attr('fill', '#633A82')
     .on('mouseover', function(d, i) {
       tooltip.html('$' + d[1] + ' Billion' + '<br>' + dateConverter(d[0]));
       tooltip.style('visibility', 'initial');
     })
     .on('mouseout', function(d, i) {
       tooltip.style('visibility', 'hidden');
     })
}, error => {

})

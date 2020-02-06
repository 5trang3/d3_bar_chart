d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json').then(json => {
  const gdpData = json.data;
  const yearRange = gdpData.map(function(gdpElement) {
    switch (gdpElement[0].split('-')[1]) {
      case '01':
        return Number(gdpElement[0].split('-')[0])
        break;
      case '04':
        return Number(gdpElement[0].split('-')[0]) + 0.25
        break;
      case '07':
        return Number(gdpElement[0].split('-')[0]) + 0.5
        break;
      case '10':
        return Number(gdpElement[0].split('-')[0]) + 0.75
        break;
    }
  })
  console.log(gdpData);
  console.log(yearRange)
  const svgWidth = 1000;
  const svgHeight = 750;
  const paddingBottom = 50;
  const paddingLeft = 50;
  const barWidth = 1000 / json.data.length;
  const svg = d3.select('body')
                .append('svg')
                .attr('width', svgWidth)
                .attr('height', svgHeight)

  const tooltip = d3.select('body')
                    .append('div')

  const xscale = d3.scaleLinear()
                   .domain([d3.min(yearRange), d3.max(yearRange)])
                   .range([paddingLeft, svgWidth - paddingLeft])

  const yscale = d3.scaleLinear()
                   .domain([d3.min(gdpData, (d) => d[1]), d3.max(gdpData, (d) => d[1])])
                   .range([svgHeight - paddingBottom, paddingBottom])

  const xaxis = d3.axisBottom(xscale);

  const yAxis = d3.axisLeft(yscale);

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
     .attr('x', (d, i) => xscale(yearRange[i]))
     .attr('y', (d, i) => yscale(d[1]))
     .attr('width', barWidth)
     .attr('height', (d, i) => svgHeight - yscale(d[1]) - paddingBottom)
     .attr('fill', '#633A82')
     .on('mouseover', function(d, i) {
       tooltip.html('$' + d[1] + ' Billion' + '<br>' + dateConverter(d[0]));
       tooltip.style('visibility', 'initial');
     })
     .on('mouseout', function(d, i) {
       tooltip.style('visibility', 'hidden');
     });
     svg.append('g')
        .attr('transform', 'translate(0, ' + (svgHeight - paddingBottom) + ')')
        .call(xaxis);

     svg.append('g')
        .attr('transform', 'translate(' + (paddingLeft) + ', 0)')
        .call(yAxis);

     svg.append('text')
        .attr('transform', 'translate(' + svgWidth/2 + ', ' + (svgHeight) + ')')
        .text('Year')
        .style('text-anchor', 'middle')

     svg.append('text')
        .attr('transform', 'translate(75, ' + svgHeight/2 + ') rotate(-90)')
        .text('GDP (Billions of USD)')
        .style('text-anchor', 'middle')

}, error => {

})

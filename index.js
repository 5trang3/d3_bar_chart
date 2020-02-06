// API call to retrieve data:
d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json').then(json => {

  // Grab the necessary data:
  const gdpData = json.data;

  // Dates are provided as strings formatted as 'year-month-day' and are quarterly. Change dates to integers and store them. Ex./ '1950-04-01' => 1950.25:
  const yearRange = gdpData.map(function(gdpElement) {
    // Switch on the month:
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

  // Define constants for svg dimensions, padding and bar width:
  const svgWidth = 1350;
  const svgHeight = 850;
  const paddingBottom = 50;
  const paddingLeft = 50;
  const barWidth = 1000 / json.data.length;

  // Create svg element:
  const svg = d3.select('body')
                .append('svg')
                .attr('width', svgWidth)
                .attr('height', svgHeight)

  // Create tooltip to display gdp information when a user hovers over the data:
  const tooltip = d3.select('body')
                    .append('div')

  // Create x and y linear scales:
  const xscale = d3.scaleLinear()
                   .domain([d3.min(yearRange), d3.max(yearRange)])
                   .range([paddingLeft, svgWidth - paddingLeft])

  const yscale = d3.scaleLinear()
                   .domain([d3.min(gdpData, (d) => d[1]), d3.max(gdpData, (d) => d[1])])
                   .range([svgHeight - paddingBottom, paddingBottom])

  // Create x and y axes:
  const xaxis = d3.axisBottom(xscale)
                  .tickFormat(d3.format(''))

  const yAxis = d3.axisLeft(yscale);

  // Helper function that converts dates formatted 'year-month-day' to 'month-year'. Ex./ '1950-04-01' => 'April 1950':
  let dateConverter = function(date) {

    // Store the month:
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

  // Create rect elements for each data point:
  svg.selectAll('rect')
     .data(gdpData)
     .enter()
     .append('rect')
     .attr('x', (d, i) => xscale(yearRange[i]))
     .attr('y', (d, i) => yscale(d[1]))
     .attr('width', barWidth)
     .attr('height', (d, i) => svgHeight - yscale(d[1]) - paddingBottom)
     .attr('fill', '#633A82')
     // Create hover effects for tooltip:
     .on('mouseover', function(d, i) {
       tooltip.html('$' + d[1] + ' Billion' + '<br>' + dateConverter(d[0]));
       tooltip.style('visibility', 'initial');
     })
     .on('mouseout', function(d, i) {
       tooltip.style('visibility', 'hidden');
     });

     // Attach x and y axes to svg:
     svg.append('g')
        .attr('transform', 'translate(0, ' + (svgHeight - paddingBottom) + ')')
        .call(xaxis);

     svg.append('g')
        .attr('transform', 'translate(' + (paddingLeft) + ', 0)')
        .call(yAxis);

     // Attach labels to x and y axes:
     svg.append('text')
        .attr('transform', 'translate(' + svgWidth/2 + ', ' + (svgHeight) + ')')
        .text('Year')
        .style('text-anchor', 'middle')

     svg.append('text')
        .attr('transform', 'translate(75, ' + svgHeight/2 + ') rotate(-90)')
        .text('GDP (Billions of USD)')
        .style('text-anchor', 'middle')

     // Attach title to svg:
     svg.append('text')
        .attr('transform', 'translate(' + svgWidth/2 + ', ' + paddingBottom + ')')
        .text('United States GDP by Year')
        .style('text-anchor', 'middle')
        .attr('font-size', '25px')
}, error => {

  // Log error to the console if issue retreiving data:
  console.log('Data not received')
})

d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json').then(json => {
  const gdpData = json.data;
  const svg = d3.select('body')
                .append('svg')
                .attr('width', 1000)
                .attr('height', 750)
}, error => {

})

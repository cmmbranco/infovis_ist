

console.log("starting percent_neg2")


var bubblegwidth = document.getElementById('viz1id').clientWidth - pnegmargin.left - pnegmargin.right;
var bubbleheight = document.getElementById('viz1id').clientHeight - pnegmargin.top - pnegmargin.bottom;

d3.csv("4_ThreeNum.csv")
.then(function(data) {



  var margin = { top: 20, right: 20, bottom: 10, left: 40 }

  var width = (390 - margin.left - margin.right),
  height =  (380 - margin.top - margin.bottom);


  //parseInt(d3.select('#chart').style('width'), 10)
  // append the svg object to the body of the page
  var svg = d3.select("#viz1id")
  .append("svg")
  .attr("id","svgviz1")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 0 400 400")
  .append("g")
  .attr("transform",
  "translate(" + margin.left + "," + margin.top + ")");

  // Add X axis
  var x = d3.scaleLinear()
  .domain([0, 50000])
  .range([0, width]);


  // Add Y axis
  var y = d3.scaleLinear()
  .domain([35, 90])
  .range([height, 0]);

  // Add a scale for bubble color
  var myColor = d3.scaleOrdinal()
  .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
  .range(d3.schemeSet2);

  // -1- Create a tooltip div that is hidden by default:

  // if (ishighlight) {

  var z = d3.scaleLinear()
  .domain([Math.sqrt(200000 / Math.PI), Math.sqrt(1310000000 / Math.PI)])
  .range([3, 40]);

  svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

  svg.append("g")
  .call(d3.axisLeft(y));

  var tooltip = d3.select("#" + divname)
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "black")
  .style("border-radius", "5px")
  .style("padding", "10px")
  .style("color", "white")

  // // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
  // var showTooltip = function(d) {
  //   tooltip
  //   .transition()
  //   .duration(200)
  //   tooltip
  //   .style("opacity", 1)
  //   .style("font-size", "9px")
  //   .html("" + "Country: " + d.country + "<br>" + "" + "Population: " + d.pop + "<br>" + "" + "Continent: " + d.continent + "<br>" + "" + "gdpPercap: " + d.gdpPercap + "<br>" + "" + "lifeExp: " + d.lifeExp + "<br>")
  //   .style("left", (d3.mouse(this)[0] + 30) + "px")
  //   .style("top", (d3.mouse(this)[1] + 30) + "px")
  // }
  // var moveTooltip = function(d) {
  //   tooltip
  //   .style("left", (d3.mouse(this)[0] - 100) + "px")
  //   .style("top", (d3.mouse(this)[1] - 50) + "px")
  // }
  // var hideTooltip = function(d) {
  //   tooltip
  //   .transition()
  //   .duration(200)
  //   .style("opacity", 0)
  // }

  svg.append('g')
  .selectAll("dot")
  .data(data)
  .enter()
  .append("circle")
  .attr("class", "bubbles")
  .attr("cx", function(d) { return x(d.gdpPercap); })
  .attr("cy", function(d) { return y(d.lifeExp); })
  .attr("r", function(d) { return  z(Math.sqrt(d.pop / Math.PI)); })
  .style("fill", function(d) { return myColor(d.continent); })
  // -3- Trigger the functions
  .on("mouseover", showTooltip)
  .on("mousemove", moveTooltip)
  .on("mouseleave", hideTooltip)

  // } else  {
  var z = d3.scaleLinear()
  .domain([Math.sqrt(200000 / Math.PI), Math.sqrt(1310000000 / Math.PI)])
  .range([2, 12]);

  svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

  svg.append("g")
  .call(d3.axisLeft(y));

  svg.append('g')
  .selectAll("dot")
  .data(data)
  .enter()
  .append("circle")
  .attr("class", "smbubbles")
  .attr("cx", function(d) { return x(d.gdpPercap); })
  .attr("cy", function(d) { return y(d.lifeExp); })
  .attr("r", function(d) {
    return  z(1 / ratio * Math.sqrt(d.pop / Math.PI));
  })
  .style("fill", function(d) { return myColor(d.continent); })
}

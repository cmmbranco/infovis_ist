
let mapmargin = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};
let w = document.getElementById('overviewid').clientWidth - mapmargin.left - mapmargin.right;
let h = document.getElementById('overviewid').clientHeight - mapmargin.top - mapmargin.bottom;

// console.log(w)
// console.log(h)

var format = d3.format(",");
// Set tooltips
var tip = d3.tip()
.attr('class', 'd3-tip')
.offset([-10, 0])
.html(function(d) {
  return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Population: </strong><span class='details'>" + format(d.population) + "</span>";
})
// var margin = {top: 0, right: 0, bottom: 0, left: 0},
// width = 600 - margin.left - margin.right,
// height = 250 - margin.top - margin.bottom;
var color = d3.scaleThreshold()
.domain([10000, 100000, 500000, 1000000, 5000000, 10000000, 50000000, 100000000, 500000000, 1500000000])
.range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)", "rgb(33,113,181)", "rgb(8,81,156)", "rgb(8,48,107)", "rgb(3,19,43)"]);
var path = d3.geoPath();
svgmap = d3.select("#overviewid")
.append("svg")
.attr("width", w)
.attr("height", h)
.append('g')
.attr('class', 'map');
var projection = d3.geoMercator()
.translate([w / 2, 6*h / 9])
.scale(100);

var path = d3.geoPath().projection(projection);



svgmap.call(tip);

//
// queue()
// .defer(d3.json, "world_countries.json")
// .defer(d3.tsv, "world_population.tsv")
// .await(ready);

// function ready(error, data, population) {

d3.json("world_countries.json").then(function(data) {
  d3.tsv("world_population.tsv").then(function(population) {

    // var bounds = d3.geoBounds(data),
    // center = d3.geoCentroid(data);
    // var distance = d3.geoDistance(bounds[0], bounds[1]),
    // scale = h / distance / Math.sqrt(2);
    // projection.scale(scale).center(center);



    var populationById = {};
    population.forEach(function(d) {
      populationById[d.id] = +d.population;
    });
    data.features.forEach(function(d) {
      d.population = populationById[d.id]
    });
    svgmap.append("g")
    .attr("class", "countries")
    .selectAll("path")
    .data(data.features)
    .enter().append("path")
    .attr("d", path)
    .attr("country", function(d) {
      return d.properties.name;
    })
    .style("fill", function(d) {
      if (selectedcountries.includes(d.properties.name)){
        return myColor(d.properties.name)
      }
      else{
        return "rgb(59,63,72)";
      }
    })
    .style('stroke', 'white')
    .style('stroke-width', 1.5)
    .style("opacity", 0.8)
    // tooltips
    .style("stroke", "white")
    .style('stroke-width', 0.3)
    .on('mouseover', function(d) {
      // tip.show(d);
      d3.select(this)
      .style("opacity", 1)
      .style("stroke", "white")
      .style("stroke-width", 3);
      funcmouseon("map", d.properties.name , null);
    })
    .on('click', function(d) {
      funcmouseclick(d,d3.select(this));
      updateLegend();
      pnegupdateLegend();
      updatecheckbox();
    })
    .on('mouseout', function(d) {
      // tip.hide(d);
      d3.select(this)
      .style("opacity", 0.8)
      .style("stroke", "white")
      .style("stroke-width", 0.3);
      funcmouseoff();

    });
    svgmap.append("path")
    .datum(topojson.mesh(data.features, function(a, b) {
      return a.id !== b.id;
    }))
    // .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
    .attr("class", "names")
    .attr("d", path);
  })
})

function ready(error, data, population) {

  var populationById = {};
  population.forEach(function(d) {
    populationById[d.id] = +d.population;
  });
  data.features.forEach(function(d) {
    d.population = populationById[d.id]
  });
  svgmap.append("g")
  .attr("class", "countries")
  .selectAll("path")
  .data(data.features)
  .enter().append("path")
  .attr("d", path)
  .style("fill", function(d) {
    return color(populationById[d.id]);
  })
  .attr("country", function(d) {
    return populationById[d.id];
  })
  .style('stroke', 'white')
  .style('stroke-width', 1.5)
  .style("opacity", 0.8)
  // tooltips
  .style("stroke", "white")
  .style('stroke-width', 0.3)
  .on('mouseover', function(d) {
    tip.show(d);
    d3.select(this)
    .style("opacity", 1)
    .style("stroke", "white")
    .style("stroke-width", 3);
  })
  .on('mouseout', function(d) {
    tip.hide(d);
    d3.select(this)
    .style("opacity", 0.8)
    .style("stroke", "white")
    .style("stroke-width", 0.3);
  });
  svgmap.append("path")
  .datum(topojson.mesh(data.features, function(a, b) {
    return a.id !== b.id;
  }))
  // .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
  .attr("class", "names")
  .attr("d", path);
}

function updateMapColor(){
  console.log("updating map")

  let len = svgmap.selectAll("path")._groups[0].length
  let count = svgmap.selectAll("path")._groups[0];


  console.log(svgmap.selectAll("path"))
  // console.log(svgmap.selectAll("path")._groups[0][0].__data__.properties.name)
  // console.log(count[0].__data__.properties.name)

  for(let index = 0; index < len; index++){

    // console.log(count[index])
    if (selectedcountries.includes(count[index].__data__.properties.name)){




      console.log(count[index].style.fill)
      console.log(count[index].__data__.properties.name)
      count[index].style.fill = myColor(count[index].__data__.properties.name)

    } else if (!selectedcountries.includes(count[index].__data__.properties.name)){
        console.log(count[index].style.fill)
         count[index].style.fill = "rgb(59,63,72)";

    }
    else{

    }


  }

  // console.log(svgmap.selectAll("path"))

  // console.log(count)
  // console.log(len)
  // console.log(count[0])

}

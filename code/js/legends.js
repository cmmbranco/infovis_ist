

//////Update CHECKBOXES


let legendsmargin = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};
let legendwidth = document.getElementById('viz1id').clientWidth - legendsmargin.left - legendsmargin.right;
let legendheight = document.getElementById('viz1id').clientHeight - legendsmargin.top - legendsmargin.bottom;


svglegend = d3.select("#viz1id")
.append("svg")
.attr("width", legendwidth)
.attr("height", legendheight);


let legend_data = []


let cx = 25;
let cy = 25;

let tx = 35;
let ty = 25

selectedcountries.forEach(function(country) {

  let legendentry = {}

  legendentry["country"] = country;
  legendentry["x"] = cx;
  legendentry["y"] = cy;
  legendentry["tx"] = tx;
  legendentry["ty"] = ty;

  cy += 25;
  ty += 25;

  legend_data.push(legendentry)


  // arr1.push(d)
})

//////SCATTER CIRCLES

let u = svglegend.selectAll("g").data(legend_data);

//////SCATTER CIRCLES
u.enter()
.append("circle")
.attr("r", 6)
.attr("stroke","black")
.attr("fill", function(d) {
  return myColor(d["country"])
})
.attr("cx", function(d) {
    return d["x"]
  })
.attr("cy", function(d) {
    return d["y"]
  })
.attr("class", "legendcircle");

u.enter().append("text")
.merge(u)
.attr("dx", function(d){return d["x"] + 10})
.attr("dy", function(d){return d["y"]})
.text(function(d){return d["country"]})
.style("font-size", "15px").attr("alignment-baseline","middle");

svglegend.selectAll("circle").on('mouseover', function(d, i) {
  // show tooltip
  funcmouseon("legends", d["country"], this);
})
.on('mouseout', function(d, i) {
  // hide tooltip
  funcmouseoff();
})
.style("opacity", 0)
.transition()
.style("opacity", 1).duration(transitionduration);






function updateLegend(){

  let legend_data = []


  let cx = 25;
  let cy = 25;

  let tx = 35;
  let ty = 25
  let counter = 0;

  selectedcountries.forEach(function(country) {

    let legendentry = {}

    legendentry["country"] = country;
    legendentry["x"] = cx;
    legendentry["y"] = cy;
    legendentry["tx"] = tx;
    legendentry["ty"] = ty;

    counter +=1 ;
    if(counter%countrylimit == 0){

      cx += 100;
      cy = 25;

    }
    else{
      cy += 25;
      ty += 25;
    }


    legend_data.push(legendentry)
  })


  svglegend.selectAll("g").remove()
  svglegend.selectAll("circle").remove()
  svglegend.selectAll("text").remove()

  let u = svglegend.selectAll("g").data(legend_data);

  //////SCATTER CIRCLES
  u.enter()
  .append("circle")
  .attr("r", 6)
  .attr("stroke","black")
  .attr("fill", function(d) {
    return myColor(d["country"])
  })
  .attr("cx", function(d) {
      return d["x"]
    })
  .attr("cy", function(d) {
      return d["y"]
    })
  .attr("class", "legendcircle");

  u.enter().append("text")
  .merge(u)
  .attr("dx", function(d){return d["x"] + 10})
  .attr("dy", function(d){return d["y"]})
  .text(function(d){return d["country"]})
  .style("font-size", "15px").attr("alignment-baseline","middle");

  svglegend.selectAll("circle").on('mouseover', function(d, i) {
    // show tooltip
    funcmouseon("legends", d["country"], this);
  })
  .on('mouseout', function(d, i) {
    // hide tooltip
    funcmouseoff();
  })
  .style("opacity", 0)
  .transition()
  .style("opacity", 1).duration(transitionduration);


  updateRadar1();
}

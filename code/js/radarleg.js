



let radarlegendsmargin = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};
let radarlegendwidth = document.getElementById('viz5id').clientWidth - radarlegendsmargin.left - radarlegendsmargin.right;
let radarlegendheight = document.getElementById('viz5id').clientHeight - radarlegendsmargin.top - radarlegendsmargin.bottom;


radarsvglegend = d3.select("#viz5id")
.append("svg")
.attr("width", radarlegendwidth)
.attr("height", radarlegendheight);


let radarlegend_data = []


let radarcx = 25;
let radarcy = 25;

let radartx = 35;
let radarty = 25

radarfeatures.forEach(function(country) {

  let legendentry = {}


  legendentry["country"] = country;
  legendentry["x"] = radarcx;
  legendentry["y"] = radarcy;
  legendentry["tx"] = radartx;
  legendentry["ty"] = radarty;

  radarcy += 25;
  radarty += 25;

  radarlegend_data.push(legendentry)


  // arr1.push(d)
})


//////SCATTER CIRCLES

let radaru = radarsvglegend.selectAll("g").data(radarlegend_data);

//////SCATTER CIRCLES
radaru.enter()
.append("circle")
.attr("r", 6)
.attr("stroke","white")
.attr("fill", "white")
.attr("cx", function(d) {
    return d["x"]
  })
.attr("cy", function(d) {
    return d["y"]
  })
.attr("class", "legendcircle");

radaru.enter().append("text")
.merge(radaru)
.attr("dx", function(d){return d["x"] - 10})
.attr("dy", function(d){return d["y"]})
.text(function(d){return d["country"]})
.style("font-size", "15px").attr("alignment-baseline","middle");

radarsvglegend.selectAll("circle").on('mouseover', function(d, i) {
  // show tooltip
  funcmouseon("legends", d["country"], this);
})
.on('mouseout', function(d, i) {
  // hide tooltip
  funcmouseoff();
})
.style("opacity", 0)
.transition()
.style("opacity", 0).duration(transitionduration);






function radarupdateLegend(){

  let legend_data = []


  console.log("here")
  let cx = 25;
  let cy = 25;

  let tx = 35;
  let ty = 25
  let counter = 0;

  radarfeatures.forEach(function(country) {

    console.log(country)

    let legendentry = {}

    legendentry["country"] = country;
    legendentry["x"] = cx;
    legendentry["y"] = cy;
    legendentry["tx"] = tx;
    legendentry["ty"] = ty;

    counter +=1 ;
    if(counter%radarlimit == 0){

      cx += 100;
      cy = 25;

    }
    else{
      cy += 25;
      ty += 25;
    }


    legend_data.push(legendentry)
  })


  radarsvglegend.selectAll("g").remove()
  radarsvglegend.selectAll("circle").remove()
  radarsvglegend.selectAll("text").remove()

  let u = radarsvglegend.selectAll("g").data(legend_data);

  //////SCATTER CIRCLES
  u.enter()
  .append("circle")
  .attr("r", 6)
  .attr("stroke","black")
  .attr("fill", "black")
  .style("opacity", 0)
  .attr("cx", function(d) {
      return d["x"]
    })
  .attr("cy", function(d) {
      return d["y"]
    })
  .attr("class", "legendcircle");

  u.enter().append("text")
  .merge(u)
  .attr("dx", function(d){return d["x"] - 10})
  .attr("dy", function(d){return d["y"]})
  .text(function(d){return d["country"]})
  .style("font-size", "15px").attr("alignment-baseline","middle");
  //
  // svglegend.selectAll("circle").on('mouseover', function(d, i) {
  //   // show tooltip
  //   funcmouseon("legends", d["country"], this);
  // })
  // .on('mouseout', function(d, i) {
  //   // hide tooltip
  //   funcmouseoff();
  // })
  // .style("opacity", 0)
  // .transition()
  // .style("opacity", 0).duration(transitionduration);
  updateRadar1();

}





let pneglegendsmargin = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};
let pneglegendwidth = document.getElementById('viz4id').clientWidth - pneglegendsmargin.left - pneglegendsmargin.right;
let pneglegendheight = document.getElementById('viz4id').clientHeight - pneglegendsmargin.top - pneglegendsmargin.bottom;


pnegsvglegend = d3.select("#viz4id")
.append("svg")
.attr("width", pneglegendwidth)
.attr("height", pneglegendheight);


let pneglegend_data = []


let pnegcx = 25;
let pnegcy = 25;

let pnegtx = 35;
let pnegty = 25

percentatribs.forEach(function(country) {

  let legendentry = {}


  legendentry["country"] = country;
  legendentry["x"] = pnegcx;
  legendentry["y"] = pnegcy;
  legendentry["tx"] = pnegtx;
  legendentry["ty"] = pnegty;

  pnegcy += 25;
  pnegty += 25;

  pneglegend_data.push(legendentry)


  // arr1.push(d)
})


//////SCATTER CIRCLES

let pnegu = pnegsvglegend.selectAll("g").data(pneglegend_data);

//////SCATTER CIRCLES
pnegu.enter()
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

pnegu.enter().append("text")
.merge(pnegu)
.attr("dx", function(d){return d["x"] - 10})
.attr("dy", function(d){return d["y"]})
.text(function(d){return d["country"]})
.style("font-size", "15px").attr("alignment-baseline","middle");

pnegsvglegend.selectAll("circle").on('mouseover', function(d, i) {
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






function pnegupdateLegend(){

  let legend_data = []


  console.log("here")
  let cx = 25;
  let cy = 25;

  let tx = 35;
  let ty = 25
  let counter = 0;

  percentatribs.forEach(function(country) {

    let legendentry = {}

    legendentry["country"] = country;
    legendentry["x"] = cx;
    legendentry["y"] = cy;
    legendentry["tx"] = tx;
    legendentry["ty"] = ty;

    counter +=1 ;
    if(counter%pneglimit == 0){

      cx += 100;
      cy = 25;

    }
    else{
      cy += 25;
      ty += 25;
    }


    legend_data.push(legendentry)
  })


  pnegsvglegend.selectAll("g").remove()
  pnegsvglegend.selectAll("circle").remove()
  pnegsvglegend.selectAll("text").remove()

  let u = pnegsvglegend.selectAll("g").data(legend_data);

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

}

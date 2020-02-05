console.log("starting percent_neg2")


let pnegdataset;

var pneghscale;
var pnegvscale;
var pnegxaxis;
var pnegyaxis;


d3.csv("q2.csv").then(function(data) {
  pnegdataset = data; // this variable is always the full dataset

  gen_vis3();
});

var pnegmargin = {
  top: 10,
  right: 30,
  bottom: 10,
  left: 40
};
var pnegwidth = document.getElementById('viz3id').clientWidth - pnegmargin.left - pnegmargin.right;
var pnegheight = document.getElementById('viz3id').clientHeight - pnegmargin.top - pnegmargin.bottom;

function gen_vis3() {



  // set the dimensions and margins of the graph
  // let margin = {top: 10, right: 20, bottom: 10, left: 40};
  // let width = document.getElementById('viz3id').clientWidth - margin.left - margin.right;
  // let height = document.getElementById('viz3id').clientHeight - margin.top - margin.bottom;




  svgpneg = d3.select("#viz3id")
    .append("svg")

    .style("margin-top", pnegmargin.top)

    .attr("width", pnegwidth + pnegmargin.left + pnegmargin.right)
    .attr("height", pnegheight + pnegmargin.top + pnegmargin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + pnegmargin.left + "," + pnegmargin.top + ")");


  pnegvscale = d3.scaleLinear() // we are setting a linear scale
    .domain([-d3.max(pnegcalcMaxs()), d3.max(pnegcalcMaxs())])
    .range([pnegheight, 0]);

  pnegyaxis = d3.axisLeft() // we are creating a d3 axis
    .scale(pnegvscale)
    .tickFormat(d3.format(".1f"))
    .ticks(4);


  pneghscale = d3.scaleLinear() // // we need to change our x axis scale
    .domain([d3.min(years), d3.max(years)])
    .range([0, pnegwidth]);



  pnegxaxis = d3.axisBottom() // we have to change our x axis
    .scale(pneghscale)
    .tickFormat(d3.format("d"))
    .ticks(years.length);


  svgpneg.append("g") // we are creating a 'g' element to match our x axis
    .attr("transform", "translate(0," + (pnegheight / 2) + ")")
    .attr("class", "pnegxaxis") // we are giving it a css style
    .attr("id", "pneg-xaxis")
    .call(pnegxaxis)
    .selectAll("text")
    .attr("transform", "rotate(45)")
    .style("text-anchor", "start")
    .attr("dx", "5px")
    .attr("dy", "-5px");




  svgpneg.append("g") // we are creating a 'g' element to match our y axis
    .attr("transform", "translate(0,0)")
    .attr("class", "pnegyaxis") // we are giving it a css style
    .call(pnegyaxis);



  pnegPlotData();

}


function pnegPlotData() {

  data_to_plot = []

  selectedcountries.forEach(function(country) {

    percentatribs.forEach(function(atrib) {

      let arr1 = new Array()

      years.forEach(function(year) {

        let mydat = pnegdataset.filter(function(d) {

          if ((d["year"] == year) && d["country"] == country) {
            entry = {}

            entry["year"] = year;
            entry["country"] = country;
            entry["atrib"] = atrib;
            entry["value"] = d[atrib];

            data_to_plot.push(entry)


            // arr1.push(d)
          }
        })
      })
    })
  });

  //////SCATTER CIRCLES

  let u = svgpneg
  .selectAll("dot")
  .data(data_to_plot)

  u.exit().remove()

  u.enter()
  .append("circle")
  .attr("cx", function(d) {
    return pneghscale(d["year"])
  })
  .attr("cy", function(d) {
    return pnegvscale(d["value"])
  })
  .attr("atribval", function(d) {
    return d["value"];
  })
  .attr("indicator", function(d) {
    return d["atrib"];
  })
  .attr("year", function(d) {
    return d["year"];
  })
  .attr("r", scattercircle)
  .attr("fill", function(d) {
    return myColor(d["country"])
  })
  .attr("country", function(d) {
    return d["country"];
  })
  .attr("class", "circle")

  svgpneg.selectAll("circle").on('mouseover', function(d, i) {
    // show tooltip
    funcmouseon("pneg", d["country"], this);
  })
  .on('mouseout', function(d, i) {
    // hide tooltip
    funcmouseoff();
  })
  .style("opacity", 0)
  .transition()
  .style("opacity", 1).duration(transitionduration);
  /////////PATH FOR POINTS

  // Define lines

  let xpos = d3.line()
  .x(function(d) {
    return pneghscale(d["year"]);
  })
  .y(function(d) {
    return pnegvscale(d["value"]);
  })

  //  Nesting Function
  let nest = d3.nest()
  .key(function(d) {
    return d.country;
  })
  .key(function(d) {
    return d.atrib;
  })
  .entries(data_to_plot)


  let parents = svgpneg.selectAll("groups")
  .data(nest);




  parents.enter()
  .append("g")
  .attr("class", "ag")
  .selectAll("bla")
  .data(function(d) {
    return d.values;
  })
  .enter()
  .append("path")
  .attr("class", "childPath")
  .attr("fill", "none")
  .attr("stroke-width", 2)
  .attr("class", "line")
  .attr("indicator", function(d) {
    return d.key;
  })
  .attr("country", function(d) {
    return d.values[0].country;
  })
  .attr("stroke", function(d) {
    return myColor(d.values[0].country);
  })
  .attr("d", function(d) {
    return xpos(d.values)

  })
  .on('mouseover', function(d, i) {
    // show tooltip
    funcmouseon("pneg", d.values[0].country, this);
  })
  .on('mouseout', function(d, i) {
    // hide tooltip
    funcmouseoff();
  })
  .style("opacity", 0)
  .transition()
  .style("opacity", 1).duration(transitionduration);

}

function updatepneg(range) {

  let newdata = [];
  // let f = svgpneg.selectAll("path");

  selectedcountries.forEach(function(country) {

    percentatribs.forEach(function(atrib) {

      years.forEach(function(year) {

        let mydat = pnegdataset.filter(function(d) {

          if ((d["year"] == year) && d["country"] == country) {

            entry = {}

            entry["year"] = year;
            entry["country"] = country;
            entry["atrib"] = atrib;
            entry["value"] = d[atrib];

            newdata.push(entry)

          }
        })
      })
    })
  })




  let u = svgpneg.selectAll("circle").data(newdata);


  u.exit().remove()

  //////SCATTER CIRCLES
  u.enter()
  .append("circle")
  .merge(u)
  .transition()
  .duration(transitionduration)
  .attr("cx", function(d) {
    return pneghscale(d["year"])
  })
  .attr("cy", function(d) {
    return pnegvscale(d["value"])
  })
  .attr("atribval", function(d) {
    return d["value"];
  })
  .attr("indicator", function(d) {
    return d["atrib"];
  })
  .attr("year", function(d) {
    return d["year"];
  })
  .attr("r", scattercircle)
  .attr("fill", function(d) {
    return myColor(d["country"])
  })
  .attr("country", function(d) {
    return d["country"];
  })
  .attr("class", "circle")



  svgpneg.selectAll("circle").on('mouseover', function(d, i) {
    // show tooltip

    funcmouseon("pneg", d["country"], this);
  })
  .on('mouseout', function(d, i) {
    // hide tooltip
    funcmouseoff();
  });


  ////// UPDATE Path

  let xpos = d3.line()
  .x(function(d) {
    return pneghscale(d["year"]);
  })
  .y(function(d) {
    return pnegvscale(d["value"]);
  })

  //  Nesting Function
  let nest1 = d3.nest()
  .key(function(d) {
    return d.country;
  })
  .key(function(d) {
    return d.atrib;
  })
  .entries(newdata)



  d3.selectAll(".ag").transition().style("opacity", 0).duration(transitionduration).attr("class", "toremove");


  // d3.selectAll(".toremove").remove();


  let parents = svgpneg.selectAll("groups");

  let parentsall = parents.data(nest1);

  parentsall.exit().remove()

  let a = parentsall.enter()
  .append("g")
  .attr("class", "ag")
  .selectAll("bla")
  .data(function(d) {
    return d.values;
  })

  a.enter()
  .append("path")
  .attr("class", "childPath")
  .attr("fill", "none")
  .attr("opacity", 0)
  .attr("stroke-width", 2)
  .attr("class", "line")
  .attr("indicator", function(d) {
    return d.key;
  })
  .attr("country", function(d) {
    return d.values[0].country;
  })
  .attr("stroke", function(d) {
    return myColor(d.values[0].country);
  })
  .attr("d", function(d) {
    return xpos(d.values)

  })
  .on('mouseover', function(d, i) {
    // show tooltip
    funcmouseon("pneg", d.values[0].country, this);
  })
  .on('mouseout', function(d, i) {
    // hide tooltip
    funcmouseoff();
  })
  .style("opacity", 0)
  .transition()
  .style("opacity", 1).duration(transitionduration)


  d3.selectAll(".toremove").remove();



}

function updatePneg(range, pushpop) {

  if (pushpop == "countries") {

    selectedcountries = range;

  } else if (pushpop == "push" || pushpop == "pop") {
    percentatribs = range;
  } else if (pushpop == "nothing") {
    // Update Pneg X and Y axis and transition data
    years = []
    for (let i = range[0]; i <= range[1] - 1; i++) {
      years.push(i);
    };
  }


  let xMin = years[0];
  let xMax = years[years.length - 1]

  pneghscale.domain([xMin, xMax]);

  if (years.length - 1 == 0) {
    pnegxaxis.ticks(1);
  } else {
    pnegxaxis.ticks(years.length - 1);
  }

  // Update the axis
  svgpneg.select(".pnegxaxis")
  .transition()
  .call(pnegxaxis)
  .selectAll("text")
  .attr("transform", "rotate(45)")
  .style("text-anchor", "start")
  .attr("dx", "5px")
  .attr("dy", "-5px");

  let yMin = d3.max(pnegcalcMaxs());
  let yMax = -d3.max(pnegcalcMaxs());

  pnegvscale.domain([yMax, yMin]);
  svgpneg.select(".pnegyaxis")
  .transition()
  .call(pnegyaxis);

  updatepneg(range);


}

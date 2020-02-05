



//
// //Load element to respective options


//Graph related length

console.log("Starting radar")






let radartip = d3.select("body")
.append("div")
.attr("class", "radartip")
.style("opacity", 0);
var radardataset; // new variable



d3.csv("q2.csv").then(function (data) {
  // full_dataset = data;
  radardataset = data; // this variable is always the full dataset
  // dataset = full_dataset.slice(0,35); // most recente movies

  gen_vis4();
});
// gen_vis4();
var radarwidth;
var radarheight;

function gen_vis4() {

  var radialScale = d3.scaleLinear()
  .domain([0,10])
  .range([0,250]);

  function angleToCoordinate(angle, value){
    let x = Math.cos(angle) * radialScale(value)*ratio;
    let y = Math.sin(angle) * radialScale(value)*ratio;
    return {"x": radarwidth/2 + x, "y": radarheight/2 - y};
  }

  function rotate(cx, cy, x, y, angle) {
    let radians = (Math.PI / 180) * angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
    ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return {"x": nx, "y": ny};
  }
  var line = d3.line()
  .x(d => d.x)
  .y(d => d.y);

  let circles = 6;
  let line_len = (circles-1)*2;
  let label_len=line_len+0.5;


  let countries = selectedcountries;
  let maxs = [];
  let data = [];


  selectedcountries.forEach(function(country){

    let point = {};

    point['country'] = country;
    radarfeatures.forEach(function(atr){

      // let curmax = []

      let vals = [];

      years.forEach(function(year){


        radardataset.forEach(function(row){

          if (row.year == year && row.country == country){
            vals.push(parseFloat(row[atr]))
          }
        })
      })
      point[atr] = d3.mean(vals)
    })
    data.push(point);
  });
  //





  radarfeatures.forEach(function(atr){
    // console.log(atr)
    let vals = []
    selectedcountries.forEach(function(country){

      years.forEach(function(year){
        radardataset.forEach(function(row){
          if (row.year == year && row.country == country){
            vals.push(parseFloat(row[atr]))


          }
        })
      })
    })
    maxs.push(d3.max(vals))



  })


  let margin = {top: 10, right: 10, bottom: 10, left: 10};

  let width = document.getElementById('viz2id').clientWidth - margin.left - margin.right
  let height = document.getElementById('viz2id').clientHeight - margin.top - margin.bottom;

  radarwidth = width;
  radarheight = height;

  //
  // let padding = 30;



  let radius = new Array(circles)

  for(i=0; i<circles;i++){
    radius[i] = i*2;
  }


  //text to append on axis
  let text= new Array(radarfeatures.length);


  for (i=0;i< radarfeatures.length; i++){
    text[i]=new Array(circles);

    for (j=0; j< circles; j++){

      if(j==circles-1){
        text[i][j] = maxs[i];

      }else{
        text[i][j] = ((maxs[i]/circles)*j).toFixed(2);
      }

    }
  }

  if (width >= height){
    ratio = height*0.5/width;
  }
  else{
    ratio = width*0.5/height;
  }

  // ratio = 0.4

  d3.select(".viz2").selectAll("svg").remove();
  //append the svg object to the body of the page
  svgradar = d3.select(".viz2")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
  "translate(" + margin.left + "," + margin.top + ")");

  //
  // ###### Draw Circles
  //

  //Circles//
  radius.forEach(t =>
    svgradar.append("circle")
    .attr("cx", width/2)
    .attr("cy", height/2)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("class", "radarcircle")
    .attr("r", radialScale(t)*ratio)

  );

  var circs = d3.selectAll(".radarcircle");
  circs.each(function(_,i){
    if((i+1)%2 !== 0) d3.select(this).remove();
  });


  // Path coordinates
  function getPathCoordinates(data_point){

    let coordinates = [];
    for (let i = 0; i < radarfeatures.length; i++){
      let ft_name = radarfeatures[i];
      let curmax = maxs[i]
      let angle = (Math.PI / 2) + (2 * Math.PI * i / radarfeatures.length);
      coordinates.push(angleToCoordinate(angle, (data_point[ft_name]/curmax)*10));
    }
    coordinates.push(coordinates[0])

    return coordinates;
  }
  //Draw path
  //and append tooltip

  // console.log("ORIGINAL DATA")
  // console.log(data)
  for (let i = 0; i < data.length; i ++){
    let country = countries[i]
    let d = data[i];
    let color = myColor(country);
    let coordinates = getPathCoordinates(d);


    //draw the path element
    svgradar.append("path")
    .datum(coordinates)
    .attr("d",line)
    .attr("class", "caminho")
    .attr("stroke-width", 3)
    .attr("stroke", color)
    .attr("fill", "none")
    // .attr("fill-opacity","0")
    .attr("stroke-opacity", 1)
    .attr("opacity", 0)
    .attr("country", country)
    .on("mousemove", function() {

      funcmouseon("radar",country, null);


    })
    .on("mouseout", function() {

      funcmouseoff();

    })
    .transition()
    .style("opacity", 0.6).duration(transitionduration);

    // Iterate over selected features



    let first = true;

    for (let i = 0; i < radarfeatures.length; i++) {
      let ft_name = radarfeatures[i];
      let angle = (Math.PI / 2) + (2 * Math.PI * i / radarfeatures.length);
      let line_coordinate = angleToCoordinate(angle, line_len);
      let label_coordinate = angleToCoordinate(angle, label_len);



      //draw axis line
      svgradar.append("line")
      .attr("x1", width/2)
      .attr("y1", height/2)
      .attr("x2", line_coordinate.x)
      .attr("y2", line_coordinate.y)
      .attr("class", "radaraxis")
      .attr("stroke","black");

      //
      // TICKS//



      for(j = 0; j<circles; j++){

        if (((j+1)%2) == 0){

          //Calculate new coordinate for tick given attribute
          let newx = angleToCoordinate(angle,radius[j])

          svgradar.append("text")
          .style("font-size", "7px")
          .attr("fill", "black")
          .attr("font-family", "arial")
          .attr("x", newx.x)
          .attr("y", newx.y)
          .attr("opacity", 1)
          .attr("class", "textlabel")
          .text(text[i][j])
        }
      }




      //draw axis label

      if((label_coordinate.x < (width/2) + 1) && (label_coordinate.x > (width/2) - 1)){


        /////////TOP LABEL
        if(first){
          svgradar.append("text")
          .style("font-size", "10px")
          .attr("fill", "black")
          .attr("font-family", "sans-serif")
          .attr("text-anchor", "middle")
          .attr("x", label_coordinate.x)
          .attr("y", label_coordinate.y-5)
          .attr("opacity", 1)
          .attr("font-weight", "bold")
          .text(ft_name);
          first = false;

          ////////BOTTOM LABEL

        }else{
          svgradar.append("text")
          .style("font-size", "10px")
          .attr("fill", "black")
          .attr("font-family", "sans-serif")
          .attr("text-anchor", "middle")
          .attr("x", label_coordinate.x)
          .attr("y", label_coordinate.y+7)
          .attr("opacity", 1)
          .attr("font-weight", "bold")
          .text(ft_name);
        }

      }

      else if(label_coordinate.x > width/2){
        svgradar.append("text")
        .style("font-size", "10px")
        .attr("fill", "black")
        .attr("font-family", "sans-serif")
        .attr("text-anchor", "start")
        .attr("x", label_coordinate.x)
        .attr("y", label_coordinate.y + 7)
        .attr("opacity", 1)
        .attr("font-weight", "bold")
        .text(ft_name);
      }

      else if(label_coordinate.x < width/2){
        svgradar.append("text")
        .style("font-size", "10px")
        .attr("fill", "black")
        .attr("font-family", "sans-serif")
        .attr("text-anchor", "end")
        .attr("x", label_coordinate.x)
        .attr("y", label_coordinate.y)
        .attr("opacity", 1)
        .attr("font-weight", "bold")
        .text(ft_name);
      }

    }

  }

}


function updateRadar1(){
  gen_vis4();
}

function updateRadar(range,type) {
  console.log(range)
  console.log(type)
  console.log("Updating Radar");
  gen_vis4();
}

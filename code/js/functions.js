//loadoptions


function pnegcalcMaxs() {
  let maxs = new Array();

  selectedcountries.forEach(function(country) {


    years.forEach(function(year) {

      percentatribs.forEach(function(atr) {

        pnegdataset.forEach(function(row) {

          if (row.year == year && row.country == country) {

            maxs.push(Math.max(Math.abs(row[atr])))
          }
        })
      })
    })
  });

  return maxs;
}



////////LOAD selection bars
d3.csv("q2.csv").then(function(data) {

  console.log("loading countries")


  let dropDown = d3.select("#country_options");

  let countrylist = d3.map(data, function(d) {
    return d.country;
  }).keys();
  allcountries = countrylist;

  let options = dropDown.selectAll("option")
  .data(countrylist)
  .enter()
  .append("option")
  .text(function(d) {
    return d;
  })
  .attr("value", function(d) {
    return d;
  });

  $(document).ready(function() {
    $("#country_options").CreateMultiCheckBox({
      defaultText: 'Countries'
    })
  });


  let indics = data.columns;


  /// Remove "country", "latitude", "longitude", "colonized_by", "year",
  indic = indics.filter(e => e !== 'country');
  indic = indic.filter(e => e !== 'latitude');
  indic = indic.filter(e => e !== 'longitude');
  indic = indic.filter(e => e !== 'colonized by');
  indic = indic.filter(e => e !== 'year');
  indic = indic.filter(e => !(e.includes("percent")));


  radarindics = indic;

  ////////LOAD base indic
  console.log("loading base")

  dropDown = d3.select("#base_indic_options");

  options = dropDown.selectAll("option")
  .data(indic)
  .enter()
  .append("option")
  .text(function(d) {
    return d;
  })
  .attr("value", function(d) {
    return d;
  });

  $(document).ready(function() {
    $("#base_indic_options").CreateMultiCheckBox({
      defaultText: 'Positive Indicators.'
    })
  });


  ////////LOAD percent indic

  console.log("loading percent/neg")

  let perc = new Array();

  indics.forEach(function(at) {
    if (at == "latitude" || at == "longitude" || at.includes("percent"))
    perc.push(at)
  })

  percindics = perc;

  dropDown = d3.select("#percent_neg_options");

  options = dropDown.selectAll("option")
  .data(perc)
  .enter()
  .append("option")
  .text(function(d) {
    return d;
  })
  .attr("value", function(d) {
    return d;
  });

  $(document).ready(function() {
    $("#percent_neg_options").CreateMultiCheckBox({
      defaultText: 'Percentual & Negative Indicators'
    })
  });
})

///OTHER FUNCTIONS TO SET CHECKBOXES

$(document).ready(function() {
  $(document).on("click", ".MultiCheckBox", function() {
    let detail = $(this).next();
    detail.show();
  });

  $(document).on("click", ".MultiCheckBoxDetailHeader input", function(e) {
    e.stopPropagation();
    let hc = $(this).prop("checked");
    $(this).closest(".MultiCheckBoxDetail").find(".MultiCheckBoxDetailBody input").prop("checked", hc);
    $(this).closest(".MultiCheckBoxDetail").next().UpdateSelect();
  });

  $(document).on("click", ".MultiCheckBoxDetailHeader", function(e) {
    let inp = $(this).find("input");
    let chk = inp.prop("checked");
    inp.prop("checked", !chk);
    $(this).closest(".MultiCheckBoxDetail").find(".MultiCheckBoxDetailBody input").prop("checked", !chk);
    $(this).closest(".MultiCheckBoxDetail").next().UpdateSelect();
  });

  $(document).on("click", ".MultiCheckBoxDetail .cont input", function(e) {
    e.stopPropagation();
    $(this).closest(".MultiCheckBoxDetail").next().UpdateSelect();

    let val = ($(".MultiCheckBoxDetailBody input:checked").length == $(".MultiCheckBoxDetailBody input").length)
    $(".MultiCheckBoxDetailHeader input").prop("checked", val);
  });

  $(document).on("click", ".MultiCheckBoxDetail .cont", function(e) {
    let inp = $(this).find("input");
    let chk = inp.prop("checked");
    inp.prop("checked", !chk);

    let multiCheckBoxDetail = $(this).closest(".MultiCheckBoxDetail");
    let multiCheckBoxDetailBody = $(this).closest(".MultiCheckBoxDetailBody");
    multiCheckBoxDetail.next().UpdateSelect();

    var val = ($(".MultiCheckBoxDetailBody input:checked").length == $(".MultiCheckBoxDetailBody input").length)
    $(".MultiCheckBoxDetailHeader input").prop("checked", val);
  });

  $(document).mouseup(function(e) {
    var container = $(".MultiCheckBoxDetail");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      container.hide();
    }
  });
});




var defaultMultiCheckBoxOption = {
  width: '98%',
  defaultText: 'Select Below',
  height: '98%'
};


jQuery.fn.extend({
  CreateMultiCheckBox: function(options) {

    var localOption = {};
    localOption.width = (options != null && options.width != null && options.width != undefined) ? options.width : defaultMultiCheckBoxOption.width;
    localOption.defaultText = (options != null && options.defaultText != null && options.defaultText != undefined) ? options.defaultText : defaultMultiCheckBoxOption.defaultText;
    localOption.height = (options != null && options.height != null && options.height != undefined) ? options.height : defaultMultiCheckBoxOption.height;

    this.hide();
    this.attr("multiple", "multiple");
    var divSel = $("<div class='MultiCheckBox'>" + localOption.defaultText + "<span class='k-icon k-i-arrow-60-down'><svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='sort-down' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512' class='svg-inline--fa fa-sort-down fa-w-10 fa-2x'><path fill='currentColor' d='M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z' class=''></path></svg></span></div>").insertBefore(this);
    divSel.css({
      "width": localOption.width
    });

    var detail = $("<div class='MultiCheckBoxDetail'><div class='MultiCheckBoxDetailHeader'><input type='checkbox' class='mulinput' value='-1982' /><div>Select All</div></div><div class='MultiCheckBoxDetailBody'></div></div>").insertAfter(divSel);
    detail.css({
      "width": parseInt(options.width) + 10,
      "max-height": localOption.height
    });
    var multiCheckBoxDetailBody = detail.find(".MultiCheckBoxDetailBody");

    this.find("option").each(function() {
      var val = $(this).attr("value");

      if (val == undefined)
      val = '';

      multiCheckBoxDetailBody.append("<div class='cont'><div><input type='checkbox' class='mulinput' value='" + val + "' /></div><div>" + $(this).text() + "</div></div>");
    });

    multiCheckBoxDetailBody.css("max-height", (parseInt($(".MultiCheckBoxDetail").css("max-height")) - 28) + "px");


    updatecheckbox();
    // checkmarks = d3.selectAll(".cont").selectAll("input")._groups;
    // console.log("blee")
    // console.log(d3.selectAll(".cont").selectAll("input")._groups);

  },
  UpdateSelect: function() {
    var arr = [];
    var changed = "";

    console.log("HEREEE")

    this.prev().find(".mulinput:checked").each(function() {

      if (allcountries.includes($(this).val())) {
        changed = "country";
        if(arr.length <= countrylimit){
          console.log(arr.length)
          arr.push($(this).val());
        } else {
          //unchcked the last box
          alert("Country limit exceeded (6 max)")
          return;
        }

      } else if (percindics.includes($(this).val())) {
        changed = "perc";
        arr.push($(this).val());
      } else if (radarindics.includes($(this).val())) {
        changed = "radar";
        arr.push($(this).val());
      } else {
        console.log("ERROR")
        console.log($(this).val())
        console.log(percindics.includes($(this).val()))
        console.log(percindics)

      }

    });

    console.log("bleee")

    console.log(arr)


    if (changed == "country") {
      console.log("country updated")
      updatePneg(arr, "countries")
      updateLegend();
      updateMapColor();
    } else if (changed == "perc") {
      console.log("perc updated")
      updatePneg(arr, "push")
      pnegupdateLegend();
    } else if (changed = "radar" && arr.length > 1) {
      console.log("radar updated")
      console.log(arr)

      radarfeatures = arr;

      radarupdateLegend();
      //Update radar

    }
  },

});



function funcmouseclick(d, topaint) {


  if (!allcountries.includes(d.properties.name)) {
    alert("Country not available for selection. Please try another")
    return;
  }

  if (allcountries.includes(d.properties.name) && !selectedcountries.includes(d.properties.name) && !(selectedcountries.length < countrylimit)){
    alert("Country limit exceeded (5 max)")
    return;

  }

  if (!selectedcountries.includes(d.properties.name)) {

    selectedcountries.push(d.properties.name);

    topaint.style("fill", function(d) {
      return myColor(d.properties.name)
    });
    updatePneg(selectedcountries, "countries")

  } else {
    if(selectedcountries == []){
      selectedcountries.push(d.properties.name)
      topaint.style("fill", function(d) {
        return myColor(d.properties.name);
      })
    }
    else{
      selectedcountries = selectedcountries.filter(e => e !== d.properties.name);
      topaint.style("fill", function(d) {
        return "rgb(59,63,72)"
      })

    }


    updatePneg(selectedcountries, "countries");
    updateLegend();
    updateRadar(selectedcountries,"countries");
    updatecheckbox();

  }
}


function funcmouseon(str, count, obj) {

  visfocused = count;
  idiom = str;

  //update in radarchart
  svgradar.selectAll('path').each(function(d, i) {

    if (d3.select(this).attr("country") == count) {
      d3.select(this).transition()
      .duration(transitionduration)
      .ease(d3.easeLinear)
      .style("opacity", 1);

      if (str == "radar") {
        radartip.html("Country: " + count)
        .style("left", d3.event.pageX + 10 + "px")
        .style("top", d3.event.pageY + "px")
        .style("opacity", 1);
      }

    } else {
      // d3.select(this).attr("opacity",0.1);
      d3.select(this).transition()
      .duration(transitionduration)
      .ease(d3.easeLinear)
      .style("opacity", 0.1)
    }
  })

  //Update in scatterplot
  svgpneg.selectAll('circle').each(function(d, i) {

    if (d3.select(this).attr("country") == count) {
      d3.select(this).transition()
      .duration(transitionduration)
      .ease(d3.easeLinear)
      .style("opacity", 1);

    } else {
      d3.select(this).transition()
      .duration(transitionduration)
      .ease(d3.easeLinear)
      .style("opacity", 0.1);
    }
  })

  svgpneg.selectAll('path').each(function(d, i) {
    if (d3.select(this).attr("country") == count) {
      d3.select(this).transition()
      .duration(transitionduration)
      .ease(d3.easeLinear)
      .style("opacity", 1);
    } else if (d3.select(this).attr("class") == "line" || d3.select(this).attr("class") == "circle") {
      d3.select(this).transition()
      .duration(transitionduration)
      .ease(d3.easeLinear)
      .style("opacity", 0.1);

    }
  })


  /////// ADD TIP TO element

  if (str == "pneg") {
    if (d3.select(obj).attr("class") == "circle") {
      radartip.html("Country: " + count + "<br/>" + "Indic: " + d3.select(obj).attr("indicator") + "<br/>" + "value: " + d3.select(obj).attr("atribval")+ "<br/>" + "Year: " + d3.select(obj).attr("year"))
      .style("left", d3.event.pageX + 10 + "px")
      .style("top", d3.event.pageY + "px")
      .style("transform", "translate(0%,-100%)")
      .style("opacity", 1);

    }else if (d3.select(obj).attr("class") == "line") {
      radartip.html("Country: " + count + "<br/>" + "Indic: " + d3.select(obj).attr("indicator"))
      .style("left", d3.event.pageX + 10 + "px")
      .style("top", d3.event.pageY + "px")
      .style("transform", "translate(0%,-100%)")
      .style("opacity", 1);

    }

    else {
      radartip.html("Country: " + count + "<br/>" + "Indic: " + d3.select(obj).attr("indicator"))
      .style("left", d3.event.pageX + 10 + "px")
      .style("top", d3.event.pageY + "px")
      .style("transform", "translate(0%,0%)")

      .style("opacity", 1);
    }
  } else if (str == "map"){
    radartip.html("Country: " + count)
    .style("left", d3.event.pageX + 10 + "px")
    .style("top", d3.event.pageY + "px")
    .style("transform", "translate(-100%,-100%)")

    .style("opacity", 1);
  }
  else {

  }
}


function funcmouseoff() {
  svgpneg.selectAll('circle').each(function(d, i) {
    d3.select(this).transition()
    .duration(transitionduration)
    .ease(d3.easeLinear)
    .style("opacity", 1);
  });
  svgpneg.selectAll('path').each(function(d, i) {
    d3.select(this).transition()
    .duration(transitionduration)
    .ease(d3.easeLinear)
    .style("opacity", 1);
  });
  svgradar.selectAll('path').each(function(d, i) {
    d3.select(this).transition()
    .duration(transitionduration)
    .ease(d3.easeLinear)
    .style("opacity", 0.6);
  });
  radartip.style("opacity", 0);
}


function updatecheckbox(){
  // console.log("INSIDE UPDATE CHECKBOX")

  inputs = document.getElementsByTagName('input');


  // console.log(inputs)
  // console.log(inputs)
  // console.log(inputs[1])


  for (index = 0; index < inputs.length; ++index) {

    if(selectedcountries.includes(inputs[index].defaultValue) || radarfeatures.includes(inputs[index].defaultValue) || percentatribs.includes(inputs[index].defaultValue)){
      // console.log("SOMETHING FOUND")
      inputs[index].checked = true;
    }
    else{

      inputs[index].checked = false;
    }
  }
}

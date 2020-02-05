


// Option 2: Color brewer.
// Include <script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script> in your code!

var scattercircle = 4;
var checkmarks;

var svgmap,svglegend, pnegsvglegend;

var transitionduration = 200;

var percindics = [];
var radarindics = [];
var allcountries = [];

var percdefault = true;
var radardefault = true;
var mapdefault = true;
var countdefault = true;

var pneglimit = 4;
var countrylimit = 5;
var radarlimit = 8;



var visfocus;
var idiomfocus;


var years = [1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016];
var selectedcountries = ["Algeria","Angola"];


var svgpneg;
var percentatribs = ["colonizer average percentual gdp growth"];



var svgradar;
var radarfeatures = ["agricultural index percapita","gross domestic product percapita","human development index"];



var myColor = d3.scaleOrdinal().domain(selectedcountries)
.range(d3.schemeSet2);



var svgtime;

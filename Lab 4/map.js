//Defining the dimensions and margins of the map
const margin = {top: 30, right: 30, bottom: 70, left: 155};
const widthSVG = 1060 - margin.left - margin.right;
const heightSVG = 750 - margin.top - margin.bottom;


//Creating an svg for the map
var svg = d3.select('body')
            .append("svg")
            .attr("class","map")
            .attr("transform", "translate(10, 20)")
            .attr("width", widthSVG + margin.left + margin.right)
            .attr("height", heightSVG + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
            "translate(" + 0 + "," + 10 + ")");

            // var mapProjection = d3.geoAlbersUsa()                   //(Holtz, 2022)
            //                         .scale(390)
            //                         // .center([0,52])
            //                         .translate([890, 0])

            var mapProjection = d3.geoAlbersUsa()                   //(Holtz, 2022)
                                    .scale(520)
                                    // .center([0,52])
                                    .translate([220, 140])

d3.json("data/us-states.json").then(function(data){
    var map = svg.append("g")
                    .selectAll("path")
                    .data(data.features)
                    .enter()
                    .append("path")
                    .attr("class", "map")
                    .attr("fill", "#6ECB5A")
                    .attr("d", d3.geoPath()          //Creating a geographic path and setiing the current projection for the map
                                //The projection is used for converting the coordinates of the countries into pixels so that the map is displayed as an SVG image
                                    .projection(mapProjection)                                  //(Holtz, 2022)
                    )
                    .style("stroke", "#D1D1D1")
                    .style("opacity", 0.75)           //Setting the opacity of the svg 
})
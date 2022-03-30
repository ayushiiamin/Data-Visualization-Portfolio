//Defining the dimensions and margins of the map
const margin = {top: 30, right: 30, bottom: 70, left: 155};
const widthSVG = 1060 - margin.left - margin.right;
const heightSVG = 750 - margin.top - margin.bottom;

var mapArr = [];

function toOriginalType(d){
    return {
        state: d.state,
        year: Number(d.year),
        
        population: Number(d.population),

        property_rates_all: Number(d.property_rates_all),
        rates_burglary: Number(d.rates_burglary),
        rates_larceny: Number(d.rates_larceny),
        rates_motor: Number(d.rates_motor),

        violent_rates_all: Number(d.violent_rates_all),
        rates_assault: Number(d.rates_assault),
        rates_murder: Number(d.rates_murder),
        rates_rape: Number(d.rates_rape),
        rates_robbery: Number(d.rates_robbery),

        property_total_all: Number(d.property_total_all),
        total_burglary: Number(d.total_burglary),
        total_larceny: Number(d.total_larceny),
        total_motor: Number(d.total_motor),

        violent_total_all: Number(d.violent_total_all),
        total_assault: Number(d.total_assault),
        total_murder: Number(d.total_murder),
        total_rape: Number(d.total_rape),
        total_robbery: Number(d.total_robbery)
    };
}


d3.csv("data/state_crime.csv", function(d, i){
    mapArr.push(toOriginalType(d))
}).then(function(mapData){


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

    var testList = mapArr.filter(filteringData)

    function filteringData(d){
        if(d.year == 1960){
            return d
        }
    }

    

    const colorScale = d3.scaleThreshold()
                            .domain([1000, 32000])
                            .range(d3.schemeBuGn[7]);

    d3.json("data/us-states.json").then(function(data){

        var map = svg.append("g")
                        .selectAll("path")
                        .data(data.features)
                        .enter()
                        .append("path")
                        .attr("class", "map")
                        // .attr("fill", "#6ECB5A")
                        .attr("d", d3.geoPath()          //Creating a geographic path and setiing the current projection for the map
                                    //The projection is used for converting the coordinates of the countries into pixels so that the map is displayed as an SVG image
                                        .projection(mapProjection)                                  //(Holtz, 2022)
                        )
                        .attr("fill", function(d){
                            // console.log(d.properties.name)
                            return "#6ECB5A"
                            // return colorScale()
                        })
                        .style("stroke", "#D1D1D1")
                        .style("opacity", 0.75)           //Setting the opacity of the svg 
    })
})


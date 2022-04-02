//REFERENCES - 

// 1) Holtz, Y. (2022). Basic choropleth map in d3.js. [online] D3-graph-gallery.com. 
//    Available at: https://d3-graph-gallery.com/graph/choropleth_basic.html

// 2) Ocks.org. (2022). Basic US State Map - D3. [online] 
//    Available at: http://bl.ocks.org/michellechandra/0b2ce4923dc9b5809922?msclkid=5fd820d1b04c11ec96257d35f02359f2

// 3) Ocks.org. (2018). getBBox. [online] 
//    Available at: https://bl.ocks.org/mbostock/1160929

// 4) G, S. (2017). D3.js append tspan to text element. [online] Stack Overflow. 
//    Available at: https://stackoverflow.com/questions/42215205/d3-js-append-tspan-to-text-element




//Defining the dimensions and margins of the map
const margin = {top: 30, right: 30, bottom: 70, left: 155};
const widthSVG = 1060 - margin.left - margin.right;
const heightSVG = 750 - margin.top - margin.bottom;

var mapArr = [];
let tst = new Map()




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


d3.csv("data/crimeUS.csv", function(d, i){
    // console.log(d.year)
    // if(+d.year == +currentYear){
    //     tst.set(d.state, +d.property_total_all)             
    // }
    mapArr.push(toOriginalType(d))
}).then(function(mapData){

    

    //Creating an svg for the map
    var svg = d3.select('body')
    
                .append("svg")
                .attr("class","map")
                .attr("transform", "translate(10, 10)")
                .attr("width", widthSVG + margin.left + margin.right)
                .attr("height", heightSVG + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                "translate(" + 0 + "," + 10 + ")");

    var mapProjection = d3.geoAlbersUsa()                   //(Ocks.org, 2022)
                            .scale(520)
                            // .center([0,52])
                            .translate([220, 140])


    const colorScale = d3.scaleThreshold()                 //(Holtz, 2022)
                            .domain([1000, 32000])
                            .range(d3.schemeGreens[3]);

    

    d3.json("data/us-states.json").then(function(data){


        d3.select("#yearCrime")
            .attr("min", 1960)
            .attr("max", 2019)
            .attr("value", 1960)

            var currentYear;
            var testMap;

            var slider = document.getElementById("yearCrime");
            var output = document.getElementById("displayYear");
            output.innerHTML = slider.value;

            currentYear = slider.value;
            change(currentYear)
            changePIE(currentYear)
            changeLOLLIPOP(currentYear)
            
            slider.oninput = function() {
                output.innerHTML = this.value;
                currentYear = this.value
                change(currentYear)
                changePIE(currentYear)
                changeLOLLIPOP(currentYear)
            }
            
        function change(yearMAP) {
            testMap = new Map()

            
            var newMapArr = mapArr.filter(filteringDataMAP)
            
            function filteringDataMAP(d){
                if(d.year == +yearMAP){
                    tst.set(d.state, d.property_total_all)           //(Holtz, 2022)
                    testMap.set(d.state, d.population)
                    return d
                }
            }
        
        

        var map = svg.append("g")
                        .selectAll("path")
                        .data(data.features)
                        .enter()
                        .append("path")
                        .attr("class", "map")
                        // .attr("fill", "#6ECB5A")
                        .attr("d", d3.geoPath()
                                        .projection(mapProjection)
                        )
                        .attr("fill", function(d){
                            d.total = tst.get(d.properties.name) || 0;                  //(Holtz, 2022)
                            return colorScale(d.total)
                        })
                        .style("stroke", "#8A8A8A")
                        .style("opacity", 0.75)
                        .on("mouseover", onMouseOver)
                        .on("mouseout", onMouseOut)

        // const tooltip = svg
        //                     .append("g")
        //                     .style("opacity", 0)
        //                     .attr("class", "tooltip")
        //                     .style("background-color", "pink")
        //                     .style("border-radius", "5px")
        //                     .style("padding", "10px")
        //                     .style("color", "white")
                        
        var tooltipRect = d3.select("svg")
                            .append("g")
                            .append("rect")
                            .style("position", "absolute")
                            .style("visibility", "hidden")
                            .attr("fill", "#695E93")     
                            
        var tooltip = d3.select("svg")
                            .append("g")
                            .append("text")
                            .attr("class", "mapText")
                            .style("position", "absolute")
                            .style("visibility", "hidden")         
                            .attr("fill", "#EFDCF9")         
                            .attr("font-size", "15px") 

        var ttRect;

            
        
        
        function onMouseOver(event, d, i){
            d3.select(this)
                .transition()
                .duration(50)
                .style("stroke", "#000000")

            ttRect = tooltip.node().getBBox()                 //(Ocks.org, 2018)

            tooltipRect.style("visibility", "visible")
                        .attr("x", ttRect.x) 
                        .attr("y", ttRect.y)
                        .attr("width", ttRect.width)
                        .attr("height", ttRect.height)

            tooltip.style("visibility", "visible")
                    .attr("x", d3.pointer(event)[0])
                    .attr("y", d3.pointer(event)[1])
                    .text(function(){
                        return "State: " + d.properties.name
                    })
                    .append("tspan")                  //(G, 2017)
                    .attr("x", d3.pointer(event)[0])
                    .attr("y", d3.pointer(event)[1] + 15)
                    .text(function(){
                        d.pop = testMap.get(d.properties.name) || "Unknown";
                        return "Population: " + d.pop
                    })
        }

        function onMouseOut(event, d, i){
            d3.select(this)
                .transition()
                .duration(50)
                .style("stroke", "#8A8A8A")

            tooltip.style("visibility", "hidden")
            tooltipRect.style("visibility", "hidden")
        }

    } 
        
    })


})





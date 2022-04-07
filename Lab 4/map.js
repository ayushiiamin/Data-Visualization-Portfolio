//REFERENCES - 

// 1) Holtz, Y. (2022). Basic choropleth map in d3.js. [online] D3-graph-gallery.com. 
//    Available at: https://d3-graph-gallery.com/graph/choropleth_basic.html

// 2) Ocks.org. (2022). Basic US State Map - D3. [online] 
//    Available at: http://bl.ocks.org/michellechandra/0b2ce4923dc9b5809922?msclkid=5fd820d1b04c11ec96257d35f02359f2

// 3) Ocks.org. (2018). getBBox. [online] 
//    Available at: https://bl.ocks.org/mbostock/1160929

// 4) G, S. (2017). D3.js append tspan to text element. [online] Stack Overflow. 
//    Available at: https://stackoverflow.com/questions/42215205/d3-js-append-tspan-to-text-element

// 5) B.Oss (2019). How to display the slider value in html? [online] Stack Overflow. 
//    Available at: https://stackoverflow.com/questions/56033426/how-to-display-the-slider-value-in-html




//Defining the dimensions and margins of the map
const margin = {top: 30, right: 30, bottom: 70, left: 155};
const widthSVG = 1060 - margin.left - margin.right;
const heightSVG = 750 - margin.top - margin.bottom;

var mapArr = [];
let propertyType = new Map()
let violentType = new Map()




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
                            .translate([220, 140])


    const colorScale = d3.scaleThreshold()                 //(Holtz, 2022)
                            .domain([1000, 32000])

    

    d3.json("data/us-states.json").then(function(data){

      window.callMap = function(dat1){
        var selectedOption;
            selectedOption = dat1

        d3.select("#yearCrime")
            .attr("min", 1965)
            .attr("max", 2019)
            .attr("value", 1965)

            var currentYear;
            var testMap;

            var slider = document.getElementById("yearCrime");
            var output = document.getElementById("displayYear");
            output.innerHTML = slider.value;           //(B.Oss, 2019)

            currentYear = slider.value;
            change(currentYear)
            changePIE(currentYear)

            if(selectedOption == "Property"){
                d3.selectAll(".bubbleViolentAS")           
                    .remove()
                    
                d3.selectAll(".bubbleViolentMU")                 
                    .remove()

                d3.selectAll(".bubbleViolentRA")           
                    .remove()

                d3.selectAll(".bubbleViolentRO")           
                    .remove()

                d3.selectAll(".circularBarplotViolent")          
                    .remove()

                d3.selectAll(".areaViolent")          
                    .remove()
                
                callCircularBarplot_property(currentYear)    
                callBubbleChart_BU(currentYear)
                callBubbleChart_LA(currentYear)
                callBubbleChart_MO(currentYear)
                callAREA_property()
            }
            else if(selectedOption == "Violent"){
                d3.selectAll(".bubblePropertyBU")
                    .remove()
                
                d3.selectAll(".bubblePropertyLA")
                    .remove()

                d3.selectAll(".bubblePropertyMO")
                    .remove()

                d3.selectAll(".circularBarplotProperty")
                    .remove()
                
                d3.selectAll(".areaProperty")          
                    .remove()

                callCircularBarplot_violent(currentYear)
                callBubbleChart_AS(currentYear)
                callBubbleChart_MU(currentYear)
                callBubbleChart_RA(currentYear)
                callBubbleChart_RO(currentYear)
                callAREA_violent()
            }
            

            slider.oninput = function() {
                output.innerHTML = this.value;           //(B.Oss, 2019)
                currentYear = this.value
                
                change(currentYear)
                changePIE(currentYear)
                
                if(selectedOption == "Property"){
                    d3.selectAll(".bubbleViolentAS")
                       .remove()

                    d3.selectAll(".bubbleViolentMU")           
                       .remove()
                    
                    d3.selectAll(".bubbleViolentRA")          
                       .remove()

                    d3.selectAll(".bubbleViolentRO")             
                       .remove()

                    d3.selectAll(".circularBarplotViolent")          
                       .remove()
                    
                    changeCIRCBARPLOT_property(currentYear)
                    changeBUBBLE_BU(currentYear)
                    changeBUBBLE_LA(currentYear)
                    changeBUBBLE_MO(currentYear)
                }
                else if(selectedOption == "Violent"){
                    d3.selectAll(".bubblePropertyBU")
                        .remove()
                    
                    d3.selectAll(".bubblePropertyLA")            
                        .remove()

                    d3.selectAll(".bubblePropertyMO")
                        .remove()

                    d3.selectAll(".circularBarplotProperty")
                        .remove()

                    changeCIRCBARPLOT_violent(currentYear)
                    changeBUBBLE_AS(currentYear)
                    changeBUBBLE_MU(currentYear)
                    changeBUBBLE_RA(currentYear)
                    changeBUBBLE_RO(currentYear)
                }
            }
        
        function change(yearMAP) {
            // var testMap = new Map()

            var arrMap = [];
            var testArr = []

            
            var newMapArr = mapArr.filter(filteringDataMAP)
            
            function filteringDataMAP(d){
                if(d.year == +yearMAP){
                    // propertyType.set(d.state, d.property_total_all)           //(Holtz, 2022)
                    // violentType.set(d.state, d.violent_total_all)
                    // testMap.set(d.state, d.population)
                    return d
                }
            }
        
            function changeColorScale(dat){
                
                if(dat == "Property"){
                    colorScale.range(d3.schemeGreens[3]);
                }
                else if(dat == "Violent"){
                    colorScale.range(d3.schemeBlues[3]);
                }
            }

            changeColorScale(selectedOption)

            function propFunc(dat, stateName){
                for(var i = 0; i< dat.length; i++){
                    if(dat[i].state == stateName){
                        return dat[i].property_total_all
                    }
                }
            }

            function violentFunc(dat, stateName){
                for(var i = 0; i< dat.length; i++){
                    if(dat[i].state == stateName){
                        return dat[i].violent_total_all
                    }
                }
            }

        var map = svg.append("g")
                        .selectAll("path")
                        .data(data.features)
                        .enter()
                        .append("path")
                        .attr("class", "map")
                        .attr("d", d3.geoPath()
                                        .projection(mapProjection)
                        )
                        .attr("fill", function(d){
                            if(selectedOption == "Property"){
                                d.total = propFunc(newMapArr, d.properties.name) || 0;                  //(Holtz, 2022)
                                return colorScale(d.total)  
                            }
                            else if(selectedOption == "Violent"){
                                d.total = violentFunc(newMapArr, d.properties.name) || 0;
                                return colorScale(d.total)
                            }
                            
                        })
                        .style("stroke", "#8A8A8A")
                        .style("opacity", 0.75)
                        .on("mouseover", onMouseOver)
                        .on("mouseout", onMouseOut)
                        .on("click", onMouseClick)
                        
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

        function onMouseClick(event, d, i){
            d3.select(this)
                .transition()
                .duration(50)
                .style("stroke", "#000000")

            if(selectedOption == "Property"){
                changeAREA_property(yearMAP, d.properties.name)
                filterData_BU(d.properties.name)
                filterData_LA(d.properties.name)
                filterData_MO(d.properties.name)
            }
            else if(selectedOption == "Violent"){
                changeAREA_violent(yearMAP, d.properties.name)
                filterData_AS(d.properties.name)
                filterData_MU(d.properties.name)
                filterData_RA(d.properties.name)
                filterData_RO(d.properties.name)
            }
        }

    }
}
        
    })


})





window.callBubbleChart_BU = function(bu_data){

    const marginBUBBLE_BU = {top: 10, right: 30, bottom: 40, left: 155};
    const widthBUBBLE_BU = 400 - marginBUBBLE_BU.left - marginBUBBLE_BU.right;
    const heightBUBBLE_BU = 300 - marginBUBBLE_BU.top - marginBUBBLE_BU.bottom;

    var bubbleArrPropertyBU = [];

    function toOriginalTypeBUBBLE_BU(d){
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
        bubbleArrPropertyBU.push(toOriginalTypeBUBBLE_BU(d))
    }).then(function(bubbleData_BU){
        
        var svgBUBBLE_BU = d3.select('body')
                                .append("svg")
                                .attr("class","bubblePropertyBU")
                                .attr("width", widthBUBBLE_BU + marginBUBBLE_BU.left + marginBUBBLE_BU.right - 7)
                                .attr("height", heightBUBBLE_BU + marginBUBBLE_BU.top + marginBUBBLE_BU.bottom + 18)
                                .attr("transform", "translate(10, -340)")

        //Creating a group container
        var gBUBBLE_BU = svgBUBBLE_BU.selectAll("g")
                                            .data(bubbleArrPropertyBU)
                                            .enter()
                                            .append("g")
                                            .attr("transform", function(d, i) {
                                                return "translate(" + (marginBUBBLE_BU.left+10) + "," + marginBUBBLE_BU.top + ")";
                                            })

        gBUBBLE_BU.append("text")
                    .attr("x", -150)
                    .attr("y", 20)
                    .attr("font-size", "17px")
                    .attr("font-family", "sans-serif")
                    .attr("fill", "#1E77BD")
                    .text("Burglary") 
        
                                            
        var x = d3.scaleLinear()
                    .range([0, widthBUBBLE_BU])
                            
        var xBottomAxis = d3.axisBottom()
                            .scale(x)
                            
        var x_bottom = svgBUBBLE_BU.append("g")
                                    .attr("class", "xaxis_BU")
                                    .attr("transform", "translate(100," + (heightBUBBLE_BU+50) + ")")
                                    .attr("color", "white")
                                    .call(xBottomAxis) 
                            
        x_bottom.selectAll("text")               
                .style("text-anchor", "end")
                .attr("dx", "-.8em")              //(Shuvo, 2021)
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)" )
                .attr("fill", "#1E77BD")
                            
        var y = d3.scaleLinear()
                .range([heightBUBBLE_BU, 0])
                                
        var yLeftAxis = d3.axisLeft()
                        .scale(y)
                            
        var y_left = svgBUBBLE_BU.append("g")
                                    .attr("class", "myYaxis_BU")
                                    .attr("transform", "translate(" + (widthBUBBLE_BU-115) + ", 50)")
                                    .attr("color", "white")
                                    .call(yLeftAxis)
                            
        y_left.selectAll("text")
            .attr("fill", "#1E77BD")
                            
        var gr_BU = svgBUBBLE_BU.append("g")

        var colorScale_BU = d3.scaleOrdinal()
                                .range(d3.schemeBlues[7]);
        
        var filter_bu = 0

        window.filterData_BU = function(state){
            filter_bu++

            d3.selectAll(".rate_BU")
               .filter(function(d){
                   return !(d.state == state)
               })
               .style("visibility", "hidden") 

            if(filter_bu >= 2){
                d3.selectAll(".rate_BU")
                  .style("visibility", "visible")  

                filter_bu = 0

                filterData_BU(state)
            }
        }

        function axes(data){

            x.domain(
                [0, d3.max(data)]
            )

            xBottomAxis = d3.axisBottom()
                            .scale(x)

            x_bottom.transition()
                    .duration(900)
                    .call(xBottomAxis) 
            
            x_bottom.selectAll("text")              
                    .style("text-anchor", "end")
                    .attr("dx", "-.8em")              //(Shuvo, 2021)
                    .attr("dy", ".15em")
                    .attr("transform", "rotate(-65)" )
                    .attr("fill", "#1E77BD")
        }

        function updateYAxis(data){

            y.domain(
                [0, d3.max(data)]
            )

            yLeftAxis = d3.axisLeft()
                            .scale(y)
            
            y_left.transition()                  
                .duration(900)
                .call(yLeftAxis)

            y_left.selectAll("text")
                .attr("fill", "#1E77BD")
        }

        function updateColorScale(data){

            colorScale_BU.domain(
                [d3.min(data), d3.max(data)]
            )
        }

        function drawBubbleChart_BU(data){

            svgBUBBLE_BU.append("rect")
                        .attr("x", 370)
                        .attr("y", 30)
                        .attr("fill", "#F8CF40")
                        .attr("width", 60)
                        .attr("height", 20)
                        .on("click", onClickBU)
            
            svgBUBBLE_BU.append("text")
                        .text("Reset Filter")
                        .attr("x", 400)
                        .attr("y", 43)
                        .attr("text-anchor", "middle")
                        .attr("font-size", "12px")
                        .attr("fill", "#0000FF")
                        .on("click", onClickBU)

            var buPop = []
            var buRate = []

            for (var i = 0; i<data.length; i++){
                buPop.push(data[i].population)
                buRate.push(data[i].rates_burglary)
            }

            axes(buPop)
            updateYAxis(buRate)
            updateColorScale(buRate)

            var b = svgBUBBLE_BU.selectAll(".rate_BU")
                                    .data(data)

                b.enter()
                    .append("circle")
                    .attr("class", "rate_BU")
                    .merge(b)
                    .on("mouseover", onMouseOver_BU)
                    .on("mouseout", onMouseOut_BU)
                    .transition()
                    .duration(900)
                    // .style("fill", "#29A0B1")
                    .style("fill", function(d){
                        return colorScale_BU(d.rates_burglary)
                    })
                    .attr("cx", function(d){
                        return x(d.population) + 107
                    })
                    .attr("cy", function(d){
                        return y(d.rates_burglary) + 50
                    })
                    .attr("r", 5)

            b.exit().remove()
        }

        var tooltipRect_BU = d3.select(".bubblePropertyBU")
                            .append("g")
                            .append("rect")
                            .style("position", "absolute")
                            .style("visibility", "hidden")
                            .attr("fill", "#695E93")     
                            
        var tooltip_BU = d3.select(".bubblePropertyBU")
                            .append("g")
                            .append("text")
                            .attr("class", "buText")
                            .style("position", "absolute")
                            .style("visibility", "hidden")         
                            .attr("fill", "#EFDCF9")         
                            .attr("font-size", "15px")

        var ttRect_BU;

        function onMouseOver_BU(event, d, i){

            ttRect_BU = tooltip_BU.node().getBBox()

            tooltipRect_BU.style("visibility", "visible")
                        .attr("x", d3.pointer(event)[0]) 
                        .attr("y", d3.pointer(event)[1] - 12)
                        .attr("width", ttRect_BU.width)
                        .attr("height", ttRect_BU.height)

            tooltip_BU.style("visibility", "visible")
                    .attr("x", d3.pointer(event)[0])
                    .attr("y", d3.pointer(event)[1])
                    .text(function(){
                        return "State: " + d.state
                    })
                    .append("tspan")                  //(G, 2017)
                    .attr("x", d3.pointer(event)[0])
                    .attr("y", d3.pointer(event)[1] + 15)
                    .text(function(){
                        return "Population: " + d.population
                    })
                    .append("tspan")                  //(G, 2017)
                    .attr("x", d3.pointer(event)[0])
                    .attr("y", d3.pointer(event)[1] + 30)
                    .text(function(){
                        return "Burglary Rate: " + d.rates_burglary
                    })
        }

        function onMouseOut_BU(event, d, i){
            tooltip_BU.style("visibility", "hidden")
            tooltipRect_BU.style("visibility", "hidden")
        }

        function onClickBU(){
            d3.selectAll(".rate_BU")
                .style("visibility", "visible")
        }

        window.changeBUBBLE_BU = function(yearBUBBLE_BU){
            var newBubbleArr_BU = bubbleArrPropertyBU.filter(filteringDataBUBBLE_BU)
                
            function filteringDataBUBBLE_BU(d){
                if(d.year == +yearBUBBLE_BU){
                    return d
                }
            }

            drawBubbleChart_BU(newBubbleArr_BU)  
        }

        changeBUBBLE_BU(bu_data)
    
    })

}
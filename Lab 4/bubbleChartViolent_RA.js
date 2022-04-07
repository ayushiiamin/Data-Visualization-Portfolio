window.callBubbleChart_RA = function(ra_data){

    const marginBUBBLE_RA = {top: 10, right: 30, bottom: 40, left: 155};
    const widthBUBBLE_RA = 400 - marginBUBBLE_RA.left - marginBUBBLE_RA.right;
    const heightBUBBLE_RA = 300 - marginBUBBLE_RA.top - marginBUBBLE_RA.bottom;

    var bubbleArrViolentRA = [];

    function toOriginalTypeBUBBLE_RA(d){
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
        bubbleArrViolentRA.push(toOriginalTypeBUBBLE_RA(d))
    }).then(function(bubbleData_RA){

        var svgBUBBLE_RA = d3.select('body')
                                .append("svg")
                                .attr("class","bubbleViolentRA")
                                .attr("width", widthBUBBLE_RA + marginBUBBLE_RA.left + marginBUBBLE_RA.right - 7)
                                .attr("height", heightBUBBLE_RA + marginBUBBLE_RA.top + marginBUBBLE_RA.bottom + 18)
                                .attr("transform", "translate(484, -332)")

        //Creating a group container
        var gBUBBLE_RA = svgBUBBLE_RA.selectAll("g")
                                            .data(bubbleArrViolentRA)
                                            .enter()
                                            .append("g")
                                            .attr("transform", function(d, i) {
                                                return "translate(" + (marginBUBBLE_RA.left+10) + "," + marginBUBBLE_RA.top + ")";
                                            })

        gBUBBLE_RA.append("text")
                    .attr("x", -150)
                    .attr("y", 20)
                    .attr("font-size", "17px")
                    .attr("font-family", "sans-serif")
                    .attr("fill", "#32CD30")
                    .text("Rape")
        
        var x = d3.scaleLinear()
                    .range([0, widthBUBBLE_RA])
                            
        var xBottomAxis = d3.axisBottom()
                            .scale(x)
                            
        var x_bottom = svgBUBBLE_RA.append("g")
                                    .attr("class", "xaxis_RA")
                                    .attr("transform", "translate(100," + (heightBUBBLE_RA+50) + ")")
                                    .attr("color", "white")
                                    .call(xBottomAxis) 
                            
        x_bottom.selectAll("text")               
                .style("text-anchor", "end")
                .attr("dx", "-.8em")              //(Shuvo, 2021)
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)" )
                .attr("fill", "#32CD30")
                            
        var y = d3.scaleLinear()
                .range([heightBUBBLE_RA, 0])
                                
        var yLeftAxis = d3.axisLeft()
                        .scale(y)
                            
        var y_left = svgBUBBLE_RA.append("g")
                                    .attr("class", "myYaxis_RA")
                                    .attr("transform", "translate(" + (widthBUBBLE_RA-115) + ", 50)")
                                    .attr("color", "white")
                                    .call(yLeftAxis)
                            
        y_left.selectAll("text")
            .attr("fill", "#32CD30")
                            
        var gr_RA = svgBUBBLE_RA.append("g")

        var colorScale_RA = d3.scaleOrdinal()
                                .range(d3.schemeGreens[7]);

        var filter_ra = 0

        window.filterData_RA = function(state){
            filter_ra++
                                                                                                                        
            d3.selectAll(".rate_RA")
                .filter(function(d){
                    return !(d.state == state)
                })
                .style("visibility", "hidden") 
                                                                                                                        
           if(filter_ra >= 2){
                d3.selectAll(".rate_RA")
                    .style("visibility", "visible")  
                                                                                                                        
                filter_ra = 0
                                                                                                                        
                filterData_RA(state)
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
                    .attr("fill", "#32CD30")
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
                .attr("fill", "#32CD30")
        }

        function updateColorScale(data){

            colorScale_RA.domain(
                [d3.min(data), d3.max(data)]
            )
        }

        function drawBubbleChart_RA(data){

            svgBUBBLE_RA.append("rect")
                        .attr("x", 370)
                        .attr("y", 30)
                        .attr("fill", "#F8CF40")
                        .attr("width", 60)
                        .attr("height", 20)
                        .on("click", onClickRA)
            
            svgBUBBLE_RA.append("text")
                        .text("Reset Filter")
                        .attr("x", 400)
                        .attr("y", 43)
                        .attr("text-anchor", "middle")
                        .attr("font-size", "12px")
                        .attr("fill", "#0000FF")
                        .on("click", onClickRA)

            var raPop = []
            var raRate = []

            for (var i = 0; i<data.length; i++){
                raPop.push(data[i].population)
                raRate.push(data[i].rates_rape)
            }

            axes(raPop)
            updateYAxis(raRate)
            updateColorScale(raRate)

            var ra = svgBUBBLE_RA.selectAll(".rate_RA")
                                    .data(data)

                ra.enter()
                    .append("circle")
                    .attr("class", "rate_RA")
                    .merge(ra)
                    .on("mouseover", onMouseOver_RA)
                    .on("mouseout", onMouseOut_RA)
                    .transition()
                    .duration(900)
                    .style("fill", function(d){
                        return colorScale_RA(d.rates_rape)
                    })
                    .attr("cx", function(d){
                        return x(d.population) + 107
                    })
                    .attr("cy", function(d){
                        return y(d.rates_rape) + 50
                    })
                    .attr("r", 5)

            ra.exit().remove()
        }

        var tooltipRect_RA = d3.select(".bubbleViolentRA")
                                .append("g")
                                .append("rect")
                                .style("position", "absolute")
                                .style("visibility", "hidden")
                                .attr("fill", "#695E93")     
                
        var tooltip_RA = d3.select(".bubbleViolentRA")
                            .append("g")
                            .append("text")
                            .attr("class", "raText")
                            .style("position", "absolute")
                            .style("visibility", "hidden")         
                            .attr("fill", "#EFDCF9")         
                            .attr("font-size", "15px")

        var ttRect_RA;

        function onMouseOver_RA(event, d, i){

            ttRect_RA = tooltip_RA.node().getBBox()

            tooltipRect_RA.style("visibility", "visible")
                            .attr("x", d3.pointer(event)[0]) 
                            .attr("y", d3.pointer(event)[1] - 12)
                            .attr("width", ttRect_RA.width)
                            .attr("height", ttRect_RA.height)

            tooltip_RA.style("visibility", "visible")
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
                            return "Rape Rate: " + d.rates_rape
                        })
        }

        function onMouseOut_RA(event, d, i){
            tooltip_RA.style("visibility", "hidden")
            tooltipRect_RA.style("visibility", "hidden")
        }

        function onClickRA(){
            d3.selectAll(".rate_RA")
                .style("visibility", "visible")
        }

        window.changeBUBBLE_RA = function(yearBUBBLE_RA) {

            var newBubbleArr_RA = bubbleArrViolentRA.filter(filteringDataBUBBLE_RA)
                
            function filteringDataBUBBLE_RA(d){
                if(d.year == +yearBUBBLE_RA){
                    return d
                }
            }

            drawBubbleChart_RA(newBubbleArr_RA)  
        }

        changeBUBBLE_RA(ra_data)
    })

}
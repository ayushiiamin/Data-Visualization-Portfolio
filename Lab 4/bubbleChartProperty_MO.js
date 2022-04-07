window.callBubbleChart_MO = function(mo_data){

    const marginBUBBLE_MO = {top: 10, right: 30, bottom: 40, left: 155};
    const widthBUBBLE_MO = 400 - marginBUBBLE_MO.left - marginBUBBLE_MO.right;
    const heightBUBBLE_MO = 300 - marginBUBBLE_MO.top - marginBUBBLE_MO.bottom;

    var bubbleArrPropertyMO = [];

    function toOriginalTypeBUBBLE_MO(d){
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
            rates_larceny: Number(d.total_larceny),
            total_motor: Number(d.total_motor),

            violent_total_all: Number(d.violent_total_all),
            total_assault: Number(d.total_assault),
            total_murder: Number(d.total_murder),
            total_rape: Number(d.total_rape),
            total_robbery: Number(d.total_robbery)
        };
    }

    d3.csv("data/crimeUS.csv", function(d, i){
        bubbleArrPropertyMO.push(toOriginalTypeBUBBLE_MO(d))
    }).then(function(bubbleData_MO){

        var svgBUBBLE_MO = d3.select('body')
                                .append("svg")
                                .attr("class","bubblePropertyMO")
                                .attr("width", widthBUBBLE_MO + marginBUBBLE_MO.left + marginBUBBLE_MO.right - 7)
                                .attr("height", heightBUBBLE_MO + marginBUBBLE_MO.top + marginBUBBLE_MO.bottom + 18)
                                .attr("transform", "translate(484, -332)")

        //Creating a group container
        var gBUBBLE_MO = svgBUBBLE_MO.selectAll("g")
                                            .data(bubbleArrPropertyMO)
                                            .enter()
                                            .append("g")
                                            .attr("transform", function(d, i) {
                                                return "translate(" + (marginBUBBLE_MO.left+10) + "," + marginBUBBLE_MO.top + ")";
                                            })

        gBUBBLE_MO.append("text")
                    .attr("x", -150)
                    .attr("y", 20)
                    .attr("font-size", "17px")
                    .attr("font-family", "sans-serif")
                    .attr("fill", "#FF0080")
                    .text("Motor")
        
        var x = d3.scaleLinear()
                    .range([0, widthBUBBLE_MO])
                            
        var xBottomAxis = d3.axisBottom()
                            .scale(x)
                            
        var x_bottom = svgBUBBLE_MO.append("g")
                                    .attr("class", "xaxis_MO")
                                    .attr("transform", "translate(100," + (heightBUBBLE_MO+50) + ")")
                                    .attr("color", "white")
                                    .call(xBottomAxis) 
                            
        x_bottom.selectAll("text")               
                .style("text-anchor", "end")
                .attr("dx", "-.8em")              //(Shuvo, 2021)
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)" )
                .attr("fill", "#FF0080")
                            
        var y = d3.scaleLinear()
                .range([heightBUBBLE_MO, 0])
                                
        var yLeftAxis = d3.axisLeft()
                        .scale(y)
                            
        var y_left = svgBUBBLE_MO.append("g")
                                    .attr("class", "myYaxis_MO")
                                    .attr("transform", "translate(" + (widthBUBBLE_MO-115) + ", 50)")
                                    .attr("color", "white")
                                    .call(yLeftAxis)
                            
        y_left.selectAll("text")
            .attr("fill", "#FF0080")
                            
        var gr_MO = svgBUBBLE_MO.append("g")

        var colorScale_MO = d3.scaleOrdinal()
                                .range(d3.schemePuRd[7]);

        var filter_mo = 0

        window.filterData_MO = function(state){
            filter_mo++
                                                
            d3.selectAll(".rate_MO")
                .filter(function(d){
                    return !(d.state == state)
                })
                .style("visibility", "hidden") 
                                                
            if(filter_mo >= 2){
                d3.selectAll(".rate_MO")
                    .style("visibility", "visible")  
                                                
                filter_mo = 0
                                                
                filterData_MO(state)
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
                    .attr("transform", "rotate(-65)")
                    .attr("fill", "#FF0080")
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
                .attr("fill", "#FF0080")
        }

        function updateColorScale(data){

            colorScale_MO.domain(
                [d3.min(data), d3.max(data)]
            )
        }

        function drawBubbleChart_MO(data){

            svgBUBBLE_MO.append("rect")
                        .attr("x", 370)
                        .attr("y", 30)
                        .attr("fill", "#F8CF40")
                        .attr("width", 60)
                        .attr("height", 20)
                        .on("click", onClickMO)
            
            svgBUBBLE_MO.append("text")
                        .text("Reset Filter")
                        .attr("x", 400)
                        .attr("y", 43)
                        .attr("text-anchor", "middle")
                        .attr("font-size", "12px")
                        .attr("fill", "#0000FF")
                        .on("click", onClickMO)

            var moPop = []
            var moRate = []

            for (var i = 0; i<data.length; i++){
                moPop.push(data[i].population)
                moRate.push(data[i].rates_motor)
            }

            axes(moPop)
            updateYAxis(moRate)
            updateColorScale(moRate)

            var o = svgBUBBLE_MO.selectAll(".rate_MO")
                                    .data(data)

                o.enter()
                    .append("circle")
                    .attr("class", "rate_MO")
                    .merge(o)
                    .on("mouseover", onMouseOver_MO)
                    .on("mouseout", onMouseOut_MO)
                    .transition()
                    .duration(900)
                    .style("fill", function(d){
                        return colorScale_MO(d.rates_motor)
                    })
                    .attr("cx", function(d){
                        return x(d.population) + 107
                    })
                    .attr("cy", function(d){
                        return y(d.rates_motor) + 50
                    })
                    .attr("r", 5)

            o.exit().remove()
        }

        var tooltipRect_MO = d3.select(".bubblePropertyMO")
                            .append("g")
                            .append("rect")
                            .style("position", "absolute")
                            .style("visibility", "hidden")
                            .attr("fill", "#695E93")     
                            
        var tooltip_MO = d3.select(".bubblePropertyMO")
                            .append("g")
                            .append("text")
                            .attr("class", "moText")
                            .style("position", "absolute")
                            .style("visibility", "hidden")         
                            .attr("fill", "#EFDCF9")         
                            .attr("font-size", "15px")

        var ttRect_MO;

        function onMouseOver_MO(event, d, i){

            ttRect_MO = tooltip_MO.node().getBBox()

            tooltipRect_MO.style("visibility", "visible")
                        .attr("x", d3.pointer(event)[0]) 
                        .attr("y", d3.pointer(event)[1] - 12)
                        .attr("width", ttRect_MO.width)
                        .attr("height", ttRect_MO.height)

            tooltip_MO.style("visibility", "visible")
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
                        return "Motor Rate: " + d.rates_motor
                    })
        }

        function onMouseOut_MO(event, d, i){
            tooltip_MO.style("visibility", "hidden")
            tooltipRect_MO.style("visibility", "hidden")
        }

        function onClickMO(){
            d3.selectAll(".rate_MO")
                .style("visibility", "visible")
        }

        window.changeBUBBLE_MO = function(yearBUBBLE_MO) {

            var newBubbleArr_MO = bubbleArrPropertyMO.filter(filteringDataBUBBLE_MO)
                
            function filteringDataBUBBLE_MO(d){
                if(d.year == +yearBUBBLE_MO){
                    return d
                }
            }

            drawBubbleChart_MO(newBubbleArr_MO)  
        }

        changeBUBBLE_MO(mo_data)
    })
}
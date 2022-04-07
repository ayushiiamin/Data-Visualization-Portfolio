window.callBubbleChart_AS = function(as_data){


    const marginBUBBLE_AS = {top: 10, right: 30, bottom: 40, left: 155};
    const widthBUBBLE_AS = 400 - marginBUBBLE_AS.left - marginBUBBLE_AS.right;
    const heightBUBBLE_AS = 300 - marginBUBBLE_AS.top - marginBUBBLE_AS.bottom;

    var bubbleArrViolentAS = [];

    function toOriginalTypeBUBBLE_AS(d){
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
        bubbleArrViolentAS.push(toOriginalTypeBUBBLE_AS(d))
    }).then(function(bubbleData_AS){

        var svgBUBBLE_AS = d3.select('body')
                                .append("svg")
                                .attr("class","bubbleViolentAS")
                                .attr("width", widthBUBBLE_AS + marginBUBBLE_AS.left + marginBUBBLE_AS.right - 7)
                                .attr("height", heightBUBBLE_AS + marginBUBBLE_AS.top + marginBUBBLE_AS.bottom + 18)
                                .attr("transform", "translate(10, -340)")

        //Creating a group container
        var gBUBBLE_AS = svgBUBBLE_AS.selectAll("g")
                                            .data(bubbleArrViolentAS)
                                            .enter()
                                            .append("g")
                                            .attr("transform", function(d, i) {
                                                return "translate(" + (marginBUBBLE_AS.left+10) + "," + marginBUBBLE_AS.top + ")";
                                            })

         gBUBBLE_AS.append("text")
                    .attr("x", -150)
                    .attr("y", 20)
                    .attr("font-size", "17px")
                    .attr("font-family", "sans-serif")
                    .attr("fill", "#FF8300")
                    .text("Assault")
        
        var x = d3.scaleLinear()
                    .range([0, widthBUBBLE_AS])
                            
        var xBottomAxis = d3.axisBottom()
                            .scale(x)
                            
        var x_bottom = svgBUBBLE_AS.append("g")
                                    .attr("class", "xaxis_AS")
                                    .attr("transform", "translate(100," + (heightBUBBLE_AS+50) + ")")
                                    .attr("color", "white")
                                    .call(xBottomAxis) 
                            
        x_bottom.selectAll("text")               
                .style("text-anchor", "end")
                .attr("dx", "-.8em")              //(Shuvo, 2021)
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)" )
                .attr("fill", "#FF8300")
                            
        var y = d3.scaleLinear()
                .range([heightBUBBLE_AS, 0])
                                
        var yLeftAxis = d3.axisLeft()
                        .scale(y)
                            
        var y_left = svgBUBBLE_AS.append("g")
                                    .attr("class", "myYaxis_AS")
                                    .attr("transform", "translate(" + (widthBUBBLE_AS-115) + ", 50)")
                                    .attr("color", "white")
                                    .call(yLeftAxis)
                            
        y_left.selectAll("text")
            .attr("fill", "#FF8300")
                            
        var gr_AS = svgBUBBLE_AS.append("g")

        var colorScale_AS = d3.scaleOrdinal()
                                .range(d3.schemeOranges[7]);

        var filter_as = 0

        window.filterData_AS = function(state){
            filter_as++
                                                                        
            d3.selectAll(".rate_AS")
                .filter(function(d){
                    return !(d.state == state)
                })
                .style("visibility", "hidden") 
                                                                        
            if(filter_as >= 2){
                d3.selectAll(".rate_AS")
                    .style("visibility", "visible")  
                                                                        
                filter_as = 0
                                                                        
                filterData_AS(state)
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
                    .attr("fill", "#FF8300")
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
                .attr("fill", "#FF8300")
        }

        function updateColorScale(data){

            colorScale_AS.domain(
                [d3.min(data), d3.max(data)]
            )
        }

        function drawBubbleChart_AS(data){

            svgBUBBLE_AS.append("rect")
                        .attr("x", 370)
                        .attr("y", 30)
                        .attr("fill", "#F8CF40")
                        .attr("width", 60)
                        .attr("height", 20)
                        .on("click", onClickAS)
            
            svgBUBBLE_AS.append("text")
                        .text("Reset Filter")
                        .attr("x", 400)
                        .attr("y", 43)
                        .attr("text-anchor", "middle")
                        .attr("font-size", "12px")
                        .attr("fill", "#0000FF")
                        .on("click", onClickAS)

            var asPop = []
            var asRate = []

            for (var i = 0; i<data.length; i++){
                asPop.push(data[i].population)
                asRate.push(data[i].rates_assault)
            }

            axes(asPop)
            updateYAxis(asRate)
            updateColorScale(asRate)

            var as = svgBUBBLE_AS.selectAll(".rate_AS")
                                    .data(data)

                as.enter()
                    .append("circle")
                    .attr("class", "rate_AS")
                    .merge(as)
                    .on("mouseover", onMouseOver_AS)
                    .on("mouseout", onMouseOut_AS)
                    .transition()
                    .duration(900)
                    .style("fill", function(d){
                        return colorScale_AS(d.rates_assault)
                    })
                    .attr("cx", function(d){
                        return x(d.population) + 107
                    })
                    .attr("cy", function(d){
                        return y(d.rates_assault) + 50
                    })
                    .attr("r", 5)

            as.exit().remove()
        }

        var tooltipRect_AS = d3.select(".bubbleViolentAS")
                            .append("g")
                            .append("rect")
                            .style("position", "absolute")
                            .style("visibility", "hidden")
                            .attr("fill", "#695E93")     
                            
        var tooltip_AS = d3.select(".bubbleViolentAS")
                            .append("g")
                            .append("text")
                            .attr("class", "asText")
                            .style("position", "absolute")
                            .style("visibility", "hidden")         
                            .attr("fill", "#EFDCF9")         
                            .attr("font-size", "15px")

        var ttRect_AS;

        function onMouseOver_AS(event, d, i){

            ttRect_AS = tooltip_AS.node().getBBox()

            tooltipRect_AS.style("visibility", "visible")
                        .attr("x", d3.pointer(event)[0]) 
                        .attr("y", d3.pointer(event)[1] - 12)
                        .attr("width", ttRect_AS.width)
                        .attr("height", ttRect_AS.height)

            tooltip_AS.style("visibility", "visible")
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
                        return "Assault Rate: " + d.rates_assault
                    })
        }

        function onMouseOut_AS(event, d, i){
            tooltip_AS.style("visibility", "hidden")
            tooltipRect_AS.style("visibility", "hidden")
        }

        function onClickAS(){
            d3.selectAll(".rate_AS")
                .style("visibility", "visible")
        }

        window.changeBUBBLE_AS = function(yearBUBBLE_AS){

            var newBubbleArr_AS = bubbleArrViolentAS.filter(filteringDataBUBBLE_AS)
                
            function filteringDataBUBBLE_AS(d){
                if(d.year == +yearBUBBLE_AS){
                    return d
                }
            }

            drawBubbleChart_AS(newBubbleArr_AS)  
        }

        changeBUBBLE_AS(as_data)
    })
}
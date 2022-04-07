window.callBubbleChart_LA = function(la_data){

    const marginBUBBLE_LA = {top: 10, right: 30, bottom: 40, left: 155};
    const widthBUBBLE_LA = 400 - marginBUBBLE_LA.left - marginBUBBLE_LA.right;
    const heightBUBBLE_LA = 300 - marginBUBBLE_LA.top - marginBUBBLE_LA.bottom;

    var bubbleArrPropertyLA = [];

    function toOriginalTypeBUBBLE_LA(d){
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
        bubbleArrPropertyLA.push(toOriginalTypeBUBBLE_LA(d))
    }).then(function(bubbleData_LA){

        var svgBUBBLE_LA = d3.select('body')
                                .append("svg")
                                .attr("class","bubblePropertyLA")
                                .attr("width", widthBUBBLE_LA + marginBUBBLE_LA.left + marginBUBBLE_LA.right - 7)
                                .attr("height", heightBUBBLE_LA + marginBUBBLE_LA.top + marginBUBBLE_LA.bottom + 18)
                                .attr("transform", "translate(-453, 27)")

        //Creating a group container
        var gBUBBLE_LA = svgBUBBLE_LA.selectAll("g")
                                            .data(bubbleArrPropertyLA)
                                            .enter()
                                            .append("g")
                                            .attr("transform", function(d, i) {
                                                return "translate(" + (marginBUBBLE_LA.left+10) + "," + marginBUBBLE_LA.top + ")";
                                            })

        gBUBBLE_LA.append("text")
                  .attr("x", -150)
                  .attr("y", 20)
                  .attr("font-size", "17px")
                  .attr("font-family", "sans-serif")
                  .attr("fill", "#C5C5C5")
                  .text("Larceny")
        
        var x = d3.scaleLinear()
                    .range([0, widthBUBBLE_LA])
                            
        var xBottomAxis = d3.axisBottom()
                            .scale(x)
                            
        var x_bottom = svgBUBBLE_LA.append("g")
                                    .attr("class", "xaxis_LA")
                                    .attr("transform", "translate(100," + (heightBUBBLE_LA+50) + ")")
                                    .attr("color", "white")
                                    .call(xBottomAxis) 
                            
        x_bottom.selectAll("text")               
                .style("text-anchor", "end")
                .attr("dx", "-.8em")              //(Shuvo, 2021)
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)" )
                .attr("fill", "#C5C5C5")
                            
        var y = d3.scaleLinear()
                .range([heightBUBBLE_LA, 0])
                                
        var yLeftAxis = d3.axisLeft()
                        .scale(y)
                            
        var y_left = svgBUBBLE_LA.append("g")
                                    .attr("class", "myYaxis_LA")
                                    .attr("transform", "translate(" + (widthBUBBLE_LA-115) + ", 50)")
                                    .attr("color", "white")
                                    .call(yLeftAxis)
                            
        y_left.selectAll("text")
            .attr("fill", "#C5C5C5")
                            
        var gr_LA = svgBUBBLE_LA.append("g")

        var colorScale_LA = d3.scaleOrdinal()
                                .range(d3.schemeGreys[7]);

        var filter_la = 0

        window.filterData_LA = function(state){
            filter_la++
                        
            d3.selectAll(".rate_LA")
                .filter(function(d){
                    return !(d.state == state)
                })
                .style("visibility", "hidden") 
                        
            if(filter_la >= 2){
                d3.selectAll(".rate_LA")
                   .style("visibility", "visible")  
                        
                filter_la = 0
                        
                filterData_LA(state)
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
                    .attr("fill", "#C5C5C5")
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
                .attr("fill", "#C5C5C5")
        }

        function updateColorScale(data){

            colorScale_LA.domain(
                [d3.min(data), d3.max(data)]
            )
        }

        function drawBubbleChart_LA(data){

            svgBUBBLE_LA.append("rect")
                        .attr("x", 370)
                        .attr("y", 30)
                        .attr("fill", "#F8CF40")
                        .attr("width", 60)
                        .attr("height", 20)
                        .on("click", onClickLA)
            
            svgBUBBLE_LA.append("text")
                        .text("Reset Filter")
                        .attr("x", 400)
                        .attr("y", 43)
                        .attr("text-anchor", "middle")
                        .attr("font-size", "12px")
                        .attr("fill", "#0000FF")
                        .on("click", onClickLA)

            var laPop = []
            var laRate = []

            for (var i = 0; i<data.length; i++){
                laPop.push(data[i].population)
                laRate.push(data[i].rates_larceny)
            }

            axes(laPop)
            updateYAxis(laRate)
            updateColorScale(laRate)

            var a = svgBUBBLE_LA.selectAll(".rate_LA")
                                    .data(data)

                a.enter()
                    .append("circle")
                    .attr("class", "rate_LA")
                    .merge(a)
                    .on("mouseover", onMouseOver_LA)
                    .on("mouseout", onMouseOut_LA)
                    .transition()
                    .duration(900)
                    // .style("fill", "#29A0B1")
                    .style("fill", function(d){
                        return colorScale_LA(d.rates_larceny)
                    })
                    .attr("cx", function(d){
                        return x(d.population) + 107
                    })
                    .attr("cy", function(d){
                        return y(d.rates_larceny) + 50
                    })
                    .attr("r", 5)

            a.exit().remove()
        }

        var tooltipRect_LA = d3.select(".bubblePropertyLA")
                            .append("g")
                            .append("rect")
                            .style("position", "absolute")
                            .style("visibility", "hidden")
                            .attr("fill", "#695E93")     
                            
        var tooltip_LA = d3.select(".bubblePropertyLA")
                            .append("g")
                            .append("text")
                            .attr("class", "laText")
                            .style("position", "absolute")
                            .style("visibility", "hidden")         
                            .attr("fill", "#EFDCF9")         
                            .attr("font-size", "15px")

        var ttRect_LA;

        function onMouseOver_LA(event, d, i){

            ttRect_LA = tooltip_LA.node().getBBox()

            tooltipRect_LA.style("visibility", "visible")
                        .attr("x", d3.pointer(event)[0]) 
                        .attr("y", d3.pointer(event)[1] - 12)
                        .attr("width", ttRect_LA.width)
                        .attr("height", ttRect_LA.height)

            tooltip_LA.style("visibility", "visible")
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
                        return "Larceny Rate: " + d.rates_larceny
                    })
        }

        function onMouseOut_LA(event, d, i){
            tooltip_LA.style("visibility", "hidden")
            tooltipRect_LA.style("visibility", "hidden")
        }

        function onClickLA(){
            d3.selectAll(".rate_LA")
                .style("visibility", "visible")
        }

        window.changeBUBBLE_LA = function(yearBUBBLE_LA) {

            var newBubbleArr_LA = bubbleArrPropertyLA.filter(filteringDataBUBBLE_LA)
                
            function filteringDataBUBBLE_LA(d){
                if(d.year == +yearBUBBLE_LA){
                    return d
                }
            }

            drawBubbleChart_LA(newBubbleArr_LA)  
        }

        changeBUBBLE_LA(la_data)
    })

}
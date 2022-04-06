window.callBubbleChart_RO = function(ro_data){

    const marginBUBBLE_RO = {top: 10, right: 30, bottom: 40, left: 155};
    const widthBUBBLE_RO = 400 - marginBUBBLE_RO.left - marginBUBBLE_RO.right;
    const heightBUBBLE_RO = 300 - marginBUBBLE_RO.top - marginBUBBLE_RO.bottom;

    var bubbleArrViolentRO = [];

    function toOriginalTypeBUBBLE_RO(d){
        return {
            state: d.state,
            year: Number(d.year),
            
            population: Number(d.population),

            property_ROtes_all: Number(d.property_ROtes_all),
            rates_burglary: Number(d.rates_burglary),
            rates_larceny: Number(d.rates_larceny),
            rates_motor: Number(d.rates_motor),

            violent_ROtes_all: Number(d.violent_ROtes_all),
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
        bubbleArrViolentRO.push(toOriginalTypeBUBBLE_RO(d))
    }).then(function(bubbleData_RO){

        var svgBUBBLE_RO = d3.select('body')
                                .append("svg")
                                .attr("class","bubbleViolentRO")
                                .attr("width", widthBUBBLE_RO + marginBUBBLE_RO.left + marginBUBBLE_RO.right - 7)
                                .attr("height", heightBUBBLE_RO + marginBUBBLE_RO.top + marginBUBBLE_RO.bottom + 16)
                                .attr("transform", "translate(20, 20)")

        //Creating a group container
        var gBUBBLE_RO = svgBUBBLE_RO.selectAll("g")
                                            .data(bubbleArrViolentRO)
                                            .enter()
                                            .append("g")
                                            .attr("transform", function(d, i) {
                                                return "translate(" + (marginBUBBLE_RO.left+10) + "," + marginBUBBLE_RO.top + ")";
                                            })
        
        var x = d3.scaleLinear()
                    .range([0, widthBUBBLE_RO])
                            
        var xBottomAxis = d3.axisBottom()
                            .scale(x)
                            
        var x_bottom = svgBUBBLE_RO.append("g")
                                    .attr("class", "xaxis_RO")
                                    .attr("transform", "translate(100," + (heightBUBBLE_RO+50) + ")")
                                    .attr("color", "white")
                                    .call(xBottomAxis) 
                            
        x_bottom.selectAll("text")               
                .style("text-anchor", "end")
                .attr("dx", "-.8em")              //(Shuvo, 2021)
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)" )
                .attr("fill", "#7F4AA4")
                            
        var y = d3.scaleLinear()
                .range([heightBUBBLE_RO, 0])
                                
        var yLeftAxis = d3.axisLeft()
                        .scale(y)
                            
        var y_left = svgBUBBLE_RO.append("g")
                                    .attr("class", "myYaxis_RO")
                                    .attr("transform", "translate(" + (widthBUBBLE_RO-115) + ", 50)")
                                    .attr("color", "white")
                                    .call(yLeftAxis)
                            
        y_left.selectAll("text")
            .attr("fill", "#7F4AA4")
                            
        var gr_RO = svgBUBBLE_RO.append("g")

        var colorScale_RO = d3.scaleOrdinal()
                                .range(d3.schemePurples[7]);

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
                    .attr("fill", "#7F4AA4")
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
                .attr("fill", "#7F4AA4")
        }

        function updateColorScale(data){

            colorScale_RO.domain(
                [d3.min(data), d3.max(data)]
            )
        }

        function drawBubbleChart_RO(data){

            var roPop = []
            var roRate = []

            for (var i = 0; i<data.length; i++){
                roPop.push(data[i].population)
                roRate.push(data[i].rates_robbery)
            }

            axes(roPop)
            updateYAxis(roRate)
            updateColorScale(roRate)

            var ro = svgBUBBLE_RO.selectAll(".rate_RO")
                                    .data(data)

                ro.enter()
                    .append("circle")
                    .attr("class", "rate_RO")
                    .merge(ro)
                    .transition()
                    .duration(900)
                    .style("fill", function(d){
                        return colorScale_RO(d.rates_robbery)
                    })
                    .attr("cx", function(d){
                        return x(d.population) + 107
                    })
                    .attr("cy", function(d){
                        return y(d.rates_robbery) + 50
                    })
                    .attr("r", 5)

            ro.exit().remove()
        }

        window.changeBUBBLE_RO = function(yearBUBBLE_RO) {

            var newBubbleArr_RO = bubbleArrViolentRO.filter(filteringDataBUBBLE_RO)
                
            function filteringDataBUBBLE_RO(d){
                if(d.year == +yearBUBBLE_RO){
                    return d
                }
            }

            drawBubbleChart_RO(newBubbleArr_RO)  
        }

        changeBUBBLE_RO(ro_data)
    })

}
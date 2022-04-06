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
                                .attr("height", heightBUBBLE_LA + marginBUBBLE_LA.top + marginBUBBLE_LA.bottom + 16)
                                .attr("transform", "translate(20, 20)")

        //Creating a group container
        var gBUBBLE_LA = svgBUBBLE_LA.selectAll("g")
                                            .data(bubbleArrPropertyLA)
                                            .enter()
                                            .append("g")
                                            .attr("transform", function(d, i) {
                                                return "translate(" + (marginBUBBLE_LA.left+10) + "," + marginBUBBLE_LA.top + ")";
                                            })
        
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
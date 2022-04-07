window.callAREA_property = function(){

    const marginAREA_property = {top: 10, right: 30, bottom: 40, left: 155};
    const widthAREA_property = 400 - marginAREA_property.left - marginAREA_property.right;
    const heightAREA_property = 300 - marginAREA_property.top - marginAREA_property.bottom;

    var areaArrProperty = [];

    function toOriginalTypeAREA_property(d){
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
        areaArrProperty.push(toOriginalTypeAREA_property(d))
    }).then(function(areaData_property){
        
        var svgAREA_property = d3.select('body')
                                .append("svg")
                                .attr("class","areaProperty")
                                .attr("width", widthAREA_property + marginAREA_property.left + marginAREA_property.right - 7)
                                .attr("height", heightAREA_property + marginAREA_property.top + marginAREA_property.bottom + 16)
                                .attr("transform", "translate(-453, 35)")

        //Creating a group container
        var gAREA_property = svgAREA_property.selectAll("g")
                                            .data(areaArrProperty)
                                            .enter()
                                            .append("g")
                                            .attr("transform", function(d, i) {
                                                return "translate(" + (marginAREA_property.left+10) + "," + marginAREA_property.top + ")";
                                            })
        
                                            
        var x = d3.scaleTime()
                  .domain(d3.extent(areaArrProperty, function(d){
                        return d.year
                    }))
                  .range([0, widthAREA_property])
                            
        var xBottomAxis = d3.axisBottom()
                            .tickFormat(d3.format("d"))
                            .scale(x)
                            
        var x_bottom = svgAREA_property.append("g")
                                    .attr("class", "xaxis_property_AREA")
                                    .attr("transform", "translate(100," + (heightAREA_property+50) + ")")
                                    .attr("color", "white")
                                    .call(xBottomAxis) 
                            
        x_bottom.selectAll("text")               
                .style("text-anchor", "end")
                .attr("dx", "-.8em")              //(Shuvo, 2021)
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)" )
                .attr("fill", "#29A0B1")
                            
        var y = d3.scaleLinear()
                .range([heightAREA_property, 0])
                                
        var yLeftAxis = d3.axisLeft()
                        .scale(y)
                            
        var y_left = svgAREA_property.append("g")
                                    .attr("class", "myYaxis_property_AREA")
                                    .attr("transform", "translate(" + (widthAREA_property-115) + ", 50)")
                                    .attr("color", "white")
                                    .call(yLeftAxis)
                            
        y_left.selectAll("text")
            .attr("fill", "#29A0B1")
                            
        var gr_property = svgAREA_property.append("g")

        var color_property = ["#29A0B1", "#FB4570", "#73436D"]
        var type_property = ["Larceny", "Burglary", "Motor"]

        function axes(data){

            x.domain(d3.extent(data, function(d){
                return d.year
            }))

            xBottomAxis = d3.axisBottom()
                            .tickFormat(d3.format("d"))
                            .scale(x)

            x_bottom.transition()
                    .duration(900)
                    .call(xBottomAxis) 
            
            x_bottom.selectAll("text")              
                    .style("text-anchor", "end")
                    .attr("dx", "-.8em")              //(Shuvo, 2021)
                    .attr("dy", ".15em")
                    .attr("transform", "rotate(-65)" )
                    .attr("fill", "#29A0B1")
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
                .attr("fill", "#29A0B1")
        }

        

        function drawAREAChart_property(data){

            var legend_property = svgAREA_property.selectAll("legendPropertyDots")
                                                    .data(type_property)

             //Adding the markers of the legend
            legend_property.enter()
                            .append("circle")
                            .merge(legend_property)
                            .attr("class", "legendPropertyDots")
                            .attr("cx", 370)
                            .attr("cy", function(d,i){        //Adding a space of 18 between each of the legend markers
                                return 20 + i*18              //(Holtz, 2022)
                            }) 
                            .attr("r", 7)
                            .style("fill", function(d, i){
                                return color_property[i]        //The colors are set according to the ordinal color scale defined above
                            })
         
         //Adding the labels of the legend
            svgAREA_property.selectAll("legendPropertyLabels")
                            .data(type_property)
                            .enter()
                            .append("text")
                            .attr("font-size", "13px")
                            .attr("x", 380)
                            .attr("y", function(d,i){           //Adding a space of 18 between each of the legend labels
                                return 20 + i*18            //(Holtz, 2022)
                            }) 
                            .attr("fill", "white")
                            .text(function(d){ 
                                return d                 //The 6 country names present in the reqCountriesPIE array is the text that appears as the labels
                            })
                            .attr("text-anchor", "left")
                            .style("alignment-baseline", "middle")

            var areaBU_LA_MO = []

            for (var i = 0; i<data.length; i++){
                areaBU_LA_MO.push(data[i].total_larceny)
                areaBU_LA_MO.push(data[i].total_burglary)
                areaBU_LA_MO.push(data[i].total_motor)
            }

            axes(data)
            updateYAxis(areaBU_LA_MO)



            var s1 = svgAREA_property.selectAll(".laClass")
                                        .data([data])

                s1.enter()
                    .append("path")
                    .attr("class", "laClass")
                    .merge(s1)
                    .transition()
                    .duration(900)
                    .attr("stroke", function(d){
                        return color_property[0]
                    })
                    .attr("fill", function(d){
                        return color_property[0]
                    })
                    .attr("d", d3.area()
                        .x(function(d, i){
                            return x(d.year) + 101
                        })
                        .y0(y(0) + 49)
                        .y1(function(d){
                            return y(d.total_larceny) + 49
                        })
                    )

            var s2 = svgAREA_property.selectAll(".buClass")
                                        .data([data])

                s2.enter()
                    .append("path")
                    .attr("class", "buClass")
                    .merge(s2)
                    .transition()
                    .duration(900)
                    .attr("stroke", function(d){
                        return color_property[1]
                    })
                    .attr("fill", function(){
                        return color_property[1]
                    })
                    .attr("d", d3.area()
                        .x(function(d, i){
                            return x(d.year) + 101
                        })
                        .y0(y(0) + 49)
                        .y1(function(d){
                            return y(d.total_burglary) + 49
                        })
                    )

            var s3 = svgAREA_property.selectAll(".moClass")
                                        .data([data])

                s3.enter()
                    .append("path")
                    .attr("class", "moClass")
                    .merge(s3)
                    .transition()
                    .duration(900)
                    .attr("stroke", function(d){
                        return color_property[2]
                    })
                    .attr("fill", function(d){
                        return color_property[2]
                    })
                    .attr("d", d3.area()
                        .x(function(d, i){
                            return x(d.year) + 101
                        })
                        .y0(y(0) + 49)
                        .y1(function(d){
                            return y(d.total_motor) + 49
                        })
                    )

            s1.exit().remove()
            s2.exit().remove()
            s3.exit().remove()
        }

        window.changeAREA_property = function(yearAREA_property, state){
            var newAREAArr_property = areaArrProperty.filter(filteringDataAREA_property)
                
            function filteringDataAREA_property(d){
                if((d.state == state) && (d.year >= +yearAREA_property)){
                    return d
                }
            }

            drawAREAChart_property(newAREAArr_property)  
        }
    
    })

}
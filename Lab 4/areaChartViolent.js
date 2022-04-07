window.callAREA_violent = function(){

    const marginAREA_violent = {top: 10, right: 30, bottom: 40, left: 155};
    const widthAREA_violent = 400 - marginAREA_violent.left - marginAREA_violent.right;
    const heightAREA_violent = 300 - marginAREA_violent.top - marginAREA_violent.bottom;

    var areaArrViolent = [];

    function toOriginalTypeAREA_violent(d){
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
        areaArrViolent.push(toOriginalTypeAREA_violent(d))
    }).then(function(areaData_violent){
        
        
        var svgAREA_violent = d3.select('body')
                                .append("svg")
                                .attr("class","areaViolent")
                                .attr("width", widthAREA_violent + marginAREA_violent.left + marginAREA_violent.right - 7)
                                .attr("height", heightAREA_violent + marginAREA_violent.top + marginAREA_violent.bottom + 16)
                                .attr("transform", "translate(484, -323)")

        //Creating a group container
        var gAREA_violent = svgAREA_violent.selectAll("g")
                                            .data(areaArrViolent)
                                            .enter()
                                            .append("g")
                                            .attr("transform", function(d, i) {
                                                return "translate(" + (marginAREA_violent.left+10) + "," + marginAREA_violent.top + ")";
                                            })
        
                                            
        var x = d3.scaleTime()
                  .domain(d3.extent(areaArrViolent, function(d){
                        return d.year
                    }))
                  .range([0, widthAREA_violent])
                            
        var xBottomAxis = d3.axisBottom()
                            .tickFormat(d3.format("d"))
                            .scale(x)
                            
        var x_bottom = svgAREA_violent.append("g")
                                    .attr("class", "xaxis_violent_AREA")
                                    .attr("transform", "translate(100," + (heightAREA_violent+50) + ")")
                                    .attr("color", "white")
                                    .call(xBottomAxis) 
                            
        x_bottom.selectAll("text")               
                .style("text-anchor", "end")
                .attr("dx", "-.8em")              //(Shuvo, 2021)
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)" )
                .attr("fill", "#29A0B1")
                            
        var y = d3.scaleLinear()
                .range([heightAREA_violent, 0])
                                
        var yLeftAxis = d3.axisLeft()
                        .scale(y)
                            
        var y_left = svgAREA_violent.append("g")
                                    .attr("class", "myYaxis_violent_AREA")
                                    .attr("transform", "translate(" + (widthAREA_violent-115) + ", 50)")
                                    .attr("color", "white")
                                    .call(yLeftAxis)
                            
        y_left.selectAll("text")
            .attr("fill", "#29A0B1")
                            
        var gr_violent = svgAREA_violent.append("g")

        var color_violent = ["#FFE0AE", "#4B8378", "#FFA303", "#543855"]
        var type_violent = ["Assault", "Robbery", "Rape", "Murder"]

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
                .attr("fill", "#29A0B1")
        }

        function drawAREAChart_violent(data){

            var legend_violent = svgAREA_violent.selectAll("legendViolentDots")
                                                    .data(type_violent)

            //Adding the markers of the legend
            legend_violent.enter()
                            .append("circle")
                            .merge(legend_violent)
                            .attr("class", "legendViolentDots")
                            .attr("cx", 370)
                            .attr("cy", function(d,i){        //Adding a space of 18 between each of the legend markers
                                return 20 + i*18              //(Holtz, 2022)
                            }) 
                            .attr("r", 7)
                            .style("fill", function(d, i){
                                return color_violent[i]        //The colors are set according to the ordinal color scale defined above
                            })
         
            //Adding the labels of the legend
            svgAREA_violent.selectAll("legendViolentLabels")
                            .data(type_violent)
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

            var areaAS_MU_RA_RO = []

            for (var i = 0; i<data.length; i++){
                areaAS_MU_RA_RO.push(data[i].total_assault)
                areaAS_MU_RA_RO.push(data[i].total_murder)
                areaAS_MU_RA_RO.push(data[i].total_rape)
                areaAS_MU_RA_RO.push(data[i].total_robbery)
            }

            axes(data)
            updateYAxis(areaAS_MU_RA_RO)


            
            var v1 = svgAREA_violent.selectAll(".asClass")
                                    .data([data])

                v1.enter()
                    .append("path")
                    .attr("class", "asClass")
                    .merge(v1)
                    .transition()
                    .duration(900)
                    .attr("stroke", function(d){
                        return color_violent[0]
                    })
                    .attr("fill", function(d){
                        return color_violent[0]
                    })
                    .attr("d", d3.area()
                        .x(function(d, i){
                            return x(d.year) + 101
                        })
                        .y0(y(0) + 49)
                        .y1(function(d){
                            return y(d.total_assault) + 49
                        })
                    )

            var v2 = svgAREA_violent.selectAll(".roClass")
                    .data([data])

                v2.enter()
                    .append("path")
                    .attr("class", "roClass")
                    .merge(v2)
                    .transition()
                    .duration(900)
                    .attr("stroke", function(d){
                        return color_violent[1]
                    })
                    .attr("fill", function(d){
                        return color_violent[1]
                    })
                    .attr("d", d3.area()
                        .x(function(d, i){
                            return x(d.year) + 101
                        })
                        .y0(y(0) + 49)
                        .y1(function(d){
                            return y(d.total_robbery) + 49
                        })
                    )

            var v3 = svgAREA_violent.selectAll(".raClass")
                                        .data([data])

                v3.enter()
                    .append("path")
                    .attr("class", "raClass")
                    .merge(v3)
                    .transition()
                    .duration(900)
                    .attr("stroke", function(d){
                        return color_violent[2]
                    })
                    .attr("fill", function(d){
                        return color_violent[2]
                    })
                    .attr("d", d3.area()
                        .x(function(d, i){
                            return x(d.year) + 101
                        })
                        .y0(y(0) + 49)
                        .y1(function(d){
                            return y(d.total_rape) + 49
                        })
                    )

            var v4 = svgAREA_violent.selectAll(".muClass")
                                        .data([data])

                v4.enter()
                    .append("path")
                    .attr("class", "muClass")
                    .merge(v4)
                    .transition()
                    .duration(900)
                    .attr("stroke", function(d){
                        return color_violent[3]
                    })
                    .attr("fill", function(d){
                        return color_violent[3]
                    })
                    .attr("d", d3.area()
                        .x(function(d, i){
                            return x(d.year) + 101
                        })
                        .y0(y(0) + 49)
                        .y1(function(d){
                            return y(d.total_murder) + 49
                        })
                    )

            v1.exit().remove()
            v2.exit().remove()
            v3.exit().remove()
            v4.exit().remove()
        }

        window.changeAREA_violent = function(yearAREA_violent, state){
            var newAREAArr_violent = areaArrViolent.filter(filteringDataAREA_violent)
                
            function filteringDataAREA_violent(d){
                if((d.state == state) && (d.year >= +yearAREA_violent)){
                    return d
                }
            }

            drawAREAChart_violent(newAREAArr_violent)  
        }
    
    })

}
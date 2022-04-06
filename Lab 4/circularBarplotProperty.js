window.callCircularBarplot_property = function(property_data){

    const marginCIRCBARPLOT_property = {top: 100, right: 0, bottom: 0, left: 0};
    const widthCIRCBARPLOT_property = 465 - marginCIRCBARPLOT_property.left - marginCIRCBARPLOT_property.right;
    const heightCIRCBARPLOT_property = 465 - marginCIRCBARPLOT_property.top - marginCIRCBARPLOT_property.bottom;

    var circularArrProperty = [];

    function toOriginalTypeCIRCBARPLOT_property(d){
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
        circularArrProperty.push(toOriginalTypeCIRCBARPLOT_property(d))
    }).then(function(circData_property){

        var svgCIRCBARPLOT_property = d3.select('body')
                                .append("svg")
                                .attr("class","circularBarplotProperty")
                                .attr("width", widthCIRCBARPLOT_property + marginCIRCBARPLOT_property.left + marginCIRCBARPLOT_property.right)
                                .attr("height", heightCIRCBARPLOT_property + marginCIRCBARPLOT_property.top + marginCIRCBARPLOT_property.bottom)
                                .attr("transform", "translate(20, 20)")
                                .append("g")
                                .attr("transform", "translate(" + (widthCIRCBARPLOT_property/2+marginCIRCBARPLOT_property.left - 20) + "," + (heightCIRCBARPLOT_property/2+marginCIRCBARPLOT_property.top - 70) + ")")

        //Creating a group container
        var gCIRCBARPLOT_property = svgCIRCBARPLOT_property.selectAll("g")
                                                .data(circularArrProperty)
                                                .enter()
                                                .append("g")
                                                .attr("transform", function(d, i) {
                                                    return "translate(" + (marginCIRCBARPLOT_property.left+10) + "," + marginCIRCBARPLOT_property.top + ")";
                                                })

        const innerRadius = 90
        const outerRadius = Math.min(widthCIRCBARPLOT_property, heightCIRCBARPLOT_property) / 2;

        var x = d3.scaleBand()
                    .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
                    .align(0)                  // This does nothing
                    .domain(circularArrProperty.map(function(d) {
                        return d.state; 
                    }));

        var y = d3.scaleRadial()
                    .range([innerRadius, outerRadius])   // Domain will be define later.
                    
        function updateYAxis(data){
            y.domain(
                [0, d3.max(data)]
            )
        }

        var cCircularBarPlot_property = 0
        var txt

        function drawCircularPlot_property(data){

            var propertyArr = []

            for (var i = 0; i<data.length; i++){
                propertyArr.push(data[i].property_rates_all)
            }

            updateYAxis(propertyArr)

            var cbp = svgCIRCBARPLOT_property.selectAll(".circular_property")
                                            .data(data)
            
                cbp.enter()
                .append("path")
                .attr("class", "circular_property")
                .merge(cbp)
                .transition()
                .duration(900)
                .attr("fill", "#C03450")
                .attr("d", d3.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(function(d) { 
                        return y(d['property_rates_all']); 
                    })
                    .startAngle(function(d) { 
                        return x(d.state); 
                    })
                    .endAngle(function(d) { 
                        return x(d.state) + x.bandwidth(); 
                    })
                    .padAngle(0.01)
                    .padRadius(innerRadius)
                )  
            
            if ((cCircularBarPlot_property == 1)){

                    svgCIRCBARPLOT_property.selectAll("g")
                                            .data(data)
                                            .attr("class", "textClass_property")
                                            .join("g")
                                                .attr("text-anchor", function(d){
                                                    if( ((x(d.state) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI) == true){
                                                        return "end"
                                                    }
                                                    else{
                                                        return "start"
                                                    }
                                                })
                                                .attr("transform", function(d){
                                                    return "rotate(" + ((x(d.state) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+ "translate(" + (y(d['property_rates_all'])+10) + ", 0)";
                                                })
                                                .append("text")
                                                .text(function(d){
                                                    return(d.state)
                                                })
                                                .attr("transform", function(d){
                                                    if( ((x(d.state) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI) == true){
                                                        return "rotate(180)"
                                                    }
                                                    else{
                                                        return "rotate(0)"
                                                    }
                                                })
                                                .style("font-size", "11px")
                                                .style("fill", "#FDCD00")
                                                .attr("alignment-baseline", "middle")
            }
            else if((cCircularBarPlot_property == 0)){

                
                cCircularBarPlot_property++

                svgCIRCBARPLOT_property.append("g")
                                    .selectAll("g")
                                    .data(data)
                                    .attr("class", "textClass_property")
                                    .join("g")
                                        .attr("text-anchor", function(d){
                                            if( ((x(d.state) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI) == true){
                                                return "end"
                                            }
                                            else{
                                                return "start"
                                            }
                                        })
                                        .attr("transform", function(d){
                                            return "rotate(" + ((x(d.state) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+ "translate(" + (y(d['property_rates_all'])+10) + ", 0)";
                                        })
                                        .append("text")
                                        .text(function(d){
                                            return(d.state)
                                        })
                                        .attr("transform", function(d){
                                            if( ((x(d.state) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI) == true){
                                                return "rotate(180)"
                                            }
                                            else{
                                                return "rotate(0)"
                                            }
                                        })
                                        .style("font-size", "11px")
                                        .style("fill", "#FDCD00")
                                        .attr("alignment-baseline", "middle")
                
            }          
            cbp.exit().remove() 
        
        }
        

        window.changeCIRCBARPLOT_property = function(yearCIRCBARPLOT_property) {

            var newCircularBarPlotArr_property = circularArrProperty.filter(filteringDataCIRCBARPLOT_property)
                
            function filteringDataCIRCBARPLOT_property(d){
                if(d.year == +yearCIRCBARPLOT_property){
                    return d
                }
            }

            drawCircularPlot_property(newCircularBarPlotArr_property)  
        }
        
        changeCIRCBARPLOT_property(property_data)
    })

}
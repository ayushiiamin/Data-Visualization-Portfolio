const marginCIRCBARPLOT_violent = {top: 100, right: 0, bottom: 0, left: 0};
const widthCIRCBARPLOT_violent = 460 - marginCIRCBARPLOT_violent.left - marginCIRCBARPLOT_violent.right;
const heightCIRCBARPLOT_violent = 460 - marginCIRCBARPLOT_violent.top - marginCIRCBARPLOT_violent.bottom;

var circularArrViolent = [];

function toOriginalTypeCIRCBARPLOT_violent(d){
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
    circularArrViolent.push(toOriginalTypeCIRCBARPLOT_violent(d))
}).then(function(bubbleData_MO){

    var svgCIRCBARPLOT_violent = d3.select('body')
                            .append("svg")
                            .attr("class","circularBarplotViolent")
                            .attr("width", widthCIRCBARPLOT_violent + marginCIRCBARPLOT_violent.left + marginCIRCBARPLOT_violent.right)
                            .attr("height", heightCIRCBARPLOT_violent + marginCIRCBARPLOT_violent.top + marginCIRCBARPLOT_violent.bottom)
                            .attr("transform", "translate(20, 20)")
                            .append("g")
                            .attr("transform", "translate(" + (widthCIRCBARPLOT_violent/2+marginCIRCBARPLOT_violent.left - 40) + "," + (heightCIRCBARPLOT_violent/2+marginCIRCBARPLOT_violent.top - 70) + ")")

    //Creating a group container
    var gCIRCBARPLOT_violent = svgCIRCBARPLOT_violent.selectAll("g")
                                            .data(circularArrViolent)
                                            .enter()
                                            .append("g")
                                            .attr("transform", function(d, i) {
                                                return "translate(" + (marginCIRCBARPLOT_violent.left+10) + "," + marginCIRCBARPLOT_violent.top + ")";
                                            })

    const innerRadius = 90
    const outerRadius = Math.min(widthCIRCBARPLOT_violent, heightCIRCBARPLOT_violent) / 2;

    var x = d3.scaleBand()
                .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
                .align(0)                  // This does nothing
                .domain(circularArrViolent.map(function(d) {
                    return d.state; 
                }));

    var y = d3.scaleRadial()
                .range([innerRadius, outerRadius])   // Domain will be define later.
                
    function updateYAxis(data){
        y.domain(
            [0, d3.max(data)]
        )
    }

    var cCircularBarPlot = 0
    var txt

    function drawCircularPlot(data){



        var violentArr = []

        for (var i = 0; i<data.length; i++){
            violentArr.push(data[i].violent_rates_all)
        }

        updateYAxis(violentArr)

        var cb = svgCIRCBARPLOT_violent.selectAll(".circular")
                                        .data(data)
        
            cb.enter()
              .append("path")
              .attr("class", "circular")
              .merge(cb)
              .transition()
              .duration(900)
              .attr("fill", "#A98AB0")
              .attr("d", d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(function(d) { 
                    return y(d['violent_rates_all']); 
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
        
        if ((cCircularBarPlot == 1)){

                svgCIRCBARPLOT_violent.selectAll("g")
                                        .data(data)
                                        .attr("class", "testClass")
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
                                                return "rotate(" + ((x(d.state) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+ "translate(" + (y(d['violent_rates_all'])+10) + ", 0)";
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
                                            .style("fill", "#29A0B1")
                                            .attr("alignment-baseline", "middle")
        }
        else if((cCircularBarPlot == 0)){

            
            cCircularBarPlot++

            svgCIRCBARPLOT_violent.append("g")
                                .selectAll("g")
                                .data(data)
                                .attr("class", "testClass")
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
                                        return "rotate(" + ((x(d.state) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+ "translate(" + (y(d['violent_rates_all'])+10) + ", 0)";
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
                                    .style("fill", "#29A0B1")
                                    .attr("alignment-baseline", "middle")
            
        }          
        cb.exit().remove() 
    
    }
       

    window.changeCIRCBARPLOT_violent = function(yearCIRCBARPLOT_violent) {

        var newCircularBarPlotArr_violent = circularArrViolent.filter(filteringDataCIRCBARPLOT_violent)
            
        function filteringDataCIRCBARPLOT_violent(d){
            if(d.year == +yearCIRCBARPLOT_violent){
                return d
            }
        }

        drawCircularPlot(newCircularBarPlotArr_violent)  
    } 
})
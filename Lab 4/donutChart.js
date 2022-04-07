var widthPIE = 460;
var heightPIE = 300;

var pieArr = [];

function toOriginalTypePIE(d){
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
    pieArr.push(toOriginalTypePIE(d))
}).then(function(pieData){

    var svgPIE = d3.select("body")
                    .append("svg")
                    .attr("class","donut")
                    .attr("width", widthPIE - 90)
                    .attr("height", heightPIE - 110)
                    .attr("transform", "translate(20, 10)")
                    .append("g")
                    .attr("transform", "translate(" + (widthPIE-240) + "," + (heightPIE-180) + ")")

    var radius = Math.min(widthPIE, heightPIE)/2;

    var color = d3.scaleOrdinal().range(["#05E0E9", "#FF2768", "#9E8EDE", "#FFFF00", "#0081AC", "#FFA0A3", "#FF0000"]);

    var grPIE = svgPIE.append("g")

    var pie = d3.pie()
                .sort(null)

    var arc = d3.arc()
                .innerRadius(radius - 100)
                .outerRadius(radius - 50); 
    
    window.changePIE = function(yearPIE){
        
        var newPieArr = pieArr.filter(filteringDataPIE)
            
        function filteringDataPIE(d){
            if(d.year == +yearPIE){
                return d
            }
        }

        var totBurglary = []
        var totLarceny = []
        var totMotor = []
        var totAssault = []
        var totMurder = []
        var totRape = []
        var totRobbery = []

        for(var i = 0; i<newPieArr.length; i++){
            totBurglary.push(newPieArr[i].total_burglary)
            totLarceny.push(newPieArr[i].total_larceny)
            totMotor.push(newPieArr[i].total_motor)
            totAssault.push(newPieArr[i].total_assault)
            totMurder.push(newPieArr[i].total_murder)
            totRape.push(newPieArr[i].total_rape)
            totRobbery.push(newPieArr[i].total_robbery)
        }

        var mean_totBurglary = d3.mean(totBurglary)
        var mean_totLarceny = d3.mean(totLarceny)
        var mean_totMotor = d3.mean(totMotor)
        var mean_totAssault = d3.mean(totAssault)
        var mean_totMurder = d3.mean(totMurder)
        var mean_totRape = d3.mean(totRape)
        var mean_totRobbery = d3.mean(totRobbery)

       var crime_mapPIE = new Map([
            [mean_totBurglary, "Burglary"],
            [mean_totLarceny, "Larceny"],
            [mean_totMotor, "Motor"],
            [mean_totAssault, "Assault"],
            [mean_totMurder, "Murder"],
            [mean_totRape, "Rape"],
            [mean_totRobbery, "Robbery"]
        ])

      var crime_arrPIE = [mean_totBurglary, mean_totLarceny, mean_totMotor, mean_totAssault, mean_totMurder, mean_totRape, mean_totRobbery]
      var legendArrPIE = ["Burglary", "Larceny", "Motor", "Assault", "Murder", "Rape", "Robbery"]

        var legend_PIE = grPIE.selectAll("legendPIEDots")
                                .data(legendArrPIE)

             //Adding the markers of the legend
             legend_PIE.enter()
                            .append("circle")
                            .merge(legend_PIE)
                            .attr("class", "legendPIEDots")
                            .attr("cx", 150)
                            .attr("cy", function(d,i){        //Adding a space of 18 between each of the legend markers
                                return (-12) + i*18              //(Holtz, 2022)
                            }) 
                            .attr("r", 7)
                            .style("fill", function(d, i){
                                return color(d)        //The colors are set according to the ordinal color scale defined above
                            })
         
         //Adding the labels of the legend
         grPIE.selectAll("legendPIELabels")
                            .data(legendArrPIE)
                            .enter()
                            .append("text")
                            .attr("font-size", "13px")
                            .attr("x", 160)
                            .attr("y", function(d,i){           //Adding a space of 18 between each of the legend labels
                                return (-12) + i*18            //(Holtz, 2022)
                            }) 
                            .attr("fill", "white")
                            .text(function(d){ 
                                return d                 //The 6 country names present in the reqCountriesPIE array is the text that appears as the labels
                            })
                            .attr("text-anchor", "left")
                            .style("alignment-baseline", "middle")

        var path = grPIE.selectAll("path")
                        .data(pie(crime_arrPIE))

        path.enter()
            .append("path")
            .merge(path)
            .on("mouseover", onMouseOverPIE)
            .on("mouseout", onMouseOutPIE)
            .transition()
            .duration(1000)
            .attr("fill", function(d, i){
                return color(i);
            })
            .attr("d", arc)
            .attrTween("d", function(d){
                var i = d3.interpolate(d.endAngle, d.startAngle);
                            return function (t){
                                d.startAngle = i(t);
                                return arc(d);
                            }
            })

        var tooltipRectPIE = grPIE.append("rect")
                                .style("position", "absolute")
                                .style("visibility", "hidden")
                                .attr("fill", "#695E93")     
            
        var tooltipPIE = grPIE.append("text")
                                .attr("class", "pieText")
                                .style("position", "absolute")
                                .style("visibility", "hidden")         
                                .attr("fill", "#EFDCF9")         
                                .attr("font-size", "15px") 

        var ttRectPIE;

        function onMouseOverPIE(event, d, i){
            d3.select(this)
                .transition()
                .duration(50)
                .attr("opacity", ".85")
            
                ttRectPIE = tooltipPIE.node().getBBox()                 //(Ocks.org, 2018)

                tooltipRectPIE.style("visibility", "visible")
                                .attr("x", ttRectPIE.x) 
                                .attr("y", ttRectPIE.y)
                                .attr("width", ttRectPIE.width)
                                .attr("height", ttRectPIE.height)

                tooltipPIE.style("visibility", "visible")
                            .attr("x", d3.pointer(event)[0])
                            .attr("y", d3.pointer(event)[1])
                            .text(function(){
                                d.crimeName = crime_mapPIE.get(d.value) || 0;
                                return d.crimeName
                            })
        }

        function onMouseOutPIE(event, d, i){
            d3.select(this)
                .transition()
                .duration(50)
                .attr("opacity", "1")

                tooltipPIE.style("visibility", "hidden")
                tooltipRectPIE.style("visibility", "hidden")
        }
    }
    
})
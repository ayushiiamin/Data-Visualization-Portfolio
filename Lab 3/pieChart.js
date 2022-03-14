// REFERENCES - 

// 1) Bobbyhadz.com. (2021). Get the Last Day of the Year in JavaScript | bobbyhadz. [online] 
//    Available at: https://bobbyhadz.com/blog/javascript-get-last-day-of-year#:~:text=To%20get%20the%20last%20day,last%20day%20of%20the%20year.&text=Copied! 

// 2) Schmidt, K. (2019). Show data on mouse-over with d3.js - KJ Schmidt - Medium. [online] Medium. 
//    Available at: https://medium.com/@kj_schmidt/show-data-on-mouse-over-with-d3-js-3bf598ff8fc2
    
// 3) ozil (2017). Equivalent method of “.getComputedTextLength()” in d3.js. Stack Overflow. [online] 
//    Available at: https://stackoverflow.com/questions/42718803/equivalent-method-of-getcomputedtextlength-in-d3-js

// 4) Volochkov (2019). d3 text directly on mouse pointer. Stack Overflow. [online]
//    Available at: https://stackoverflow.com/questions/57644512/d3-text-directly-on-mouse-pointer

// 5) W3schools.com. (2022). JavaScript Array sort() Method. [online] 
//    Available at: https://www.w3schools.com/jsref/jsref_sort.asp

// 6) Bobbyhadz.com. (2021). Get the first N elements from an Array in JavaScript | bobbyhadz. [online] 
//    Available at: https://bobbyhadz.com/blog/javascript-get-first-n-elements-of-array#:~:text=To%20get%20the%20first%20N,elements%20of%20the%20original%20array

// 7) Ocks.org. (2022). Basic US State Map - D3. [online] 
//    Available at: http://bl.ocks.org/michellechandra/0b2ce4923dc9b5809922


var widthPIE = 460;
var heightPIE = 300;

var asiaArrPIE = [];

var	parseDate = d3.timeParse("%Y-%m-%d");            //(Ordonez, 2020)


function dateToOriginalType(d) {
    return {
        iso_code: d.iso_code,
        continent: d.continent,
        location: d.location,
        date: parseDate(d.date),                 //(Ordonez, 2020)
        total_cases: Number(d.total_cases),
        new_cases: Number(d.new_cases),
        total_deaths: Number(d.total_deaths),
        new_deaths: Number(d.new_deaths),
        total_cases_per_million: Number(d.total_cases_per_million),
        new_cases_per_million: Number(d.new_cases_per_million),
        total_deaths_per_million: Number(d.total_deaths_per_million),
        new_deaths_per_million: Number(d.new_deaths_per_million),
        total_vaccinations: Number(d.total_vaccinations),
        people_vaccinated: Number(d.people_vaccinated),
        people_fully_vaccinated: Number(d.people_fully_vaccinated),
        total_boosters: Number(d.total_boosters),
        new_vaccinations: Number(d.new_vaccinations),
        total_vaccinations_per_hundred: Number(d.total_vaccinations_per_hundred),
        people_vaccinated_per_hundred: Number(d.people_vaccinated_per_hundred),
        people_fully_vaccinated_per_hundred: Number(d.people_fully_vaccinated_per_hundred),
        total_boosters_per_hundred: Number(d.total_boosters_per_hundred),
        population: Number(d.population)
    };
}



d3.csv("data/asia.csv", function(d, i){
    asiaArrPIE.push(dateToOriginalType(d))
}).then(function(data){

    var svgPIE = d3.select("body")
                    .append("svg")
                    .attr("class","pie")
                    .attr("width", widthPIE - 100)
                    .attr("height", heightPIE)
                    .attr("transform", "translate(10, 0)")
                    .append("g")
                    .attr("transform", "translate(" + (widthPIE-240) + "," + (heightPIE-180) + ")")

    var radius = Math.min(widthPIE, heightPIE)/2;

    var color = d3.scaleOrdinal().range(["#01949A", "#CD0046", "#CDF4DC", "#130170", "#FEC437", "#B175FF"]);
    // var color = d3.scaleOrdinal().range(["#CDF4DC", "#130170", "#CDF4DC", "#130170"]);
    
    var grTip = svgPIE.append("g")
                        // .attr("transform", "translate(160, 150)")


    var pie = d3.pie()
                .sort(null)

    var arc = d3.arc()
                .innerRadius(radius - 100)
                .outerRadius(radius - 50);   
                
    var listOfCountryPIE = asiaArrPIE.filter(getReqData)

    var lastDayofYearPIE;
        
    function getReqData(d){ 
        lastDayofYearPIE = function(d){
                return new Date(d.getFullYear(), 11, 31)            //(Bobbyhadz.com, 2021)
        }
            
        if((d.date.getTime() == lastDayofYearPIE(d.date).getTime()) && (d.date.getFullYear() == 2020)){
            return d
        }
    }

                
    function showPie(data){

        var reqValuesPIE = []
        var tempArr = []
        var reqCountriesPIE = []

        for (var i = 0; i<data.length; i++){
            tempArr.push(data[i].total_deaths)
        }

        tempArr.sort(function(a, b){        //(W3schools.com, 2022)
            return b - a;
        })

        reqValuesPIE = tempArr.slice(0, 6)           //(Bobbyhadz.com, 2021)


        var newDataPIE = data.filter(pieFunc)
                function pieFunc(dat){        
                    return (reqValuesPIE.includes(dat.total_deaths))       
                }

        newDataPIE.sort(function(a, b){         //(W3schools.com, 2022)
                    return b.total_deaths - a.total_deaths
            })
    
            for(var i = 0; i<newDataPIE.length; i++){
                reqCountriesPIE.push(newDataPIE[i].location)
            }
        

        var path = grTip.selectAll("path")
                       .data(pie(reqValuesPIE))

        path.enter()
            .append("path")
            .merge(path)
            .on("mouseover", onMouseOver)
            .on("mouseout", onMouseOut) 
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

        var tooltipRect = grTip.append("rect")
                                .style("position", "absolute")
                                .style("visibility", "hidden")
                                .attr("fill", "#5428AB")

        var tooltip = grTip.append("text")
                            .attr("class", "pietext")
                            .style("position", "absolute")
                            .style("visibility", "hidden")
                            .attr("fill", "#FFE32A")
                            .attr("font-size", "10px")
         

        function onMouseOver(event, d, i){
            d3.select(this).transition()
               .duration(50)
               .attr("opacity", ".85")            //(Schmidt, 2019)

            tooltip.style("visibility", "visible")
                    .attr("x", d3.pointer(event)[0])     //(Volochkov, 2019)
                    .attr("y", d3.pointer(event)[1])     //(Volochkov, 2019)
                    .text(function(){
                        return d.value     
                    })

            tooltipRect.style("visibility", "visible")
                    .attr("x", d3.pointer(event)[0])     //(Volochkov, 2019)
                    .attr("y", d3.pointer(event)[1] - 10)     //(Volochkov, 2019)
                    .attr("width", function(){  
                        return (d3.select(".pietext").node().getComputedTextLength())   //(ozil, 2017)
                    })
                    .attr("height", 15)
        }

        function onMouseOut(event, d, i){
            d3.select(this)
               .transition()
               .duration(50)
               .attr("opacity", "1");       //(Schmidt, 2019)

            tooltip.style("visibility", "hidden")
            tooltipRect.style("visibility", "hidden")
        }
            
        path.exit().remove();



        var legend = grTip
                        .attr("class", "legend")
                        .attr("width", 140)
                        .attr("height", 200)
                        .selectAll("g")
                        .data(color.domain().slice())
                        .enter()
                        .append("g")
                        .attr("transform", function(d, i) {
                            return "translate(0," + i * 20 + ")"; 
                        });

                        legend.append("rect")             //(Ocks.org, 2022)
                        .attr("width", 18)
                        .attr("height", 18)
                        .style("fill", color);

                        legend.append("text")
  		  .data(reqCountriesPIE)
      	  .attr("x", 24)
      	  .attr("y", 9)
      	  .attr("dy", ".35em")
      	  .text(function(d) { return d; });
    }

    showPie(listOfCountryPIE)
})
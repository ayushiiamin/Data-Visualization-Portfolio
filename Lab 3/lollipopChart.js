//REFERENCES - 

// 1) W3schools.com. (2022). JavaScript Array sort() Method. [online] 
//    Available at: https://www.w3schools.com/jsref/jsref_sort.asp

// 2) Bobbyhadz.com. (2021). Get the first N elements from an Array in JavaScript | bobbyhadz. [online] 
//    Available at: https://bobbyhadz.com/blog/javascript-get-first-n-elements-of-array#:~:text=To%20get%20the%20first%20N,elements%20of%20the%20original%20array

// 3) Holtz, Y. (2022). Basic lollipop chart in d3.js. [online] D3-graph-gallery.com. 
//    Available at: https://www.d3-graph-gallery.com/graph/lollipop_basic.html



const marginLOLLIPOP = {top: 10, right: 30, bottom: 40, left: 155};
const widthLOLLIPOP = 400 - marginLOLLIPOP.left - marginLOLLIPOP.right;
const heightLOLLIPOP = 300 - marginLOLLIPOP.top - marginLOLLIPOP.bottom;



var asiaArrLOLLIPOP = [];

var	parseDate = d3.timeParse("%Y-%m-%d");            //(Ordonez, 2020)

    function convertToOriginalFunc(d) {
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
        asiaArrLOLLIPOP.push(convertToOriginalFunc(d))
    }).then(function(data){
        var svgLOLLIPOP = d3.select('body')
                            .append("svg")
                            .attr("class","lollipop")
                            .attr("width", widthLOLLIPOP + marginLOLLIPOP.left + marginLOLLIPOP.right - 7)
                            .attr("height", heightLOLLIPOP + marginLOLLIPOP.top + marginLOLLIPOP.bottom - 10)

        var gLOLLIPOP = svgLOLLIPOP.selectAll("g")
                                    .data(asiaArrLOLLIPOP)
                                    .enter()
                                    .append("g")
                                    .attr("transform", function(d, i) {
                                        return "translate(" + (marginLOLLIPOP.left+10) + "," + marginLOLLIPOP.top + ")";
                                    })

        var x = d3.scaleBand()
                   .range([ 0, widthLOLLIPOP])
                   .padding(1);
                   
        var xBottomAxis = d3.axisBottom()
                            .scale(x)

        var x_bottom = svgLOLLIPOP.append("g")
                                    .attr("class", "xaxisLOLLIPOP")
                                    .attr("transform", "translate(100," + (heightLOLLIPOP+50) + ")")
                                    .call(xBottomAxis)  

        var y = d3.scaleLinear()
                   .range([heightLOLLIPOP, 0])          
        
                
        var yLeftAxis = d3.axisLeft()
                          .scale(y)
        
                
        var y_left = svgLOLLIPOP.append("g")
                                .attr("class", "myYaxisLOLLIPOP")
                                .attr("transform", "translate(" + (widthLOLLIPOP-115) + ", 50)")
                                .call(yLeftAxis);

                                
        var listOfCountry = asiaArrLOLLIPOP.filter(getData)

        var lastDayofYearLOLLIPOP;

        function getData(d){

            
            lastDayofYearLOLLIPOP = function(d){
                return new Date(d.getFullYear(), 11, 31)            //(Bobbyhadz.com, 2021)
            }

            if((d.date.getTime() == lastDayofYearLOLLIPOP(d.date).getTime()) && (d.date.getFullYear() == 2020)){
                return d
            }
        }

        function axes(data){
            x.domain(data.map(function(d) {            //(Holtz, 2022)
                return d.location;              
            }))

            xBottomAxis = d3.axisBottom()
                            .scale(x)

            x_bottom.transition()                  //(Holtz, 2022)
                    .duration(900)
                    .call(xBottomAxis)    
        }

        function updateYAxis(data){
            y.domain(           
                [d3.min(data), d3.max(data)]
            )

            yLeftAxis = d3.axisLeft()
                            .scale(y)

            y_left.transition()                  
                    .duration(900)
                    .call(yLeftAxis)
        }

        function drawChartLollipop(data){
            
            var highCaseNumSetLOLLIPOP = new Set()
            var reqCountriesLOLLIPOP = []
            var reqValuesLOLLIPOP = []
            var toSortValues = []

            for (var i = 0; i<data.length; i++){
                toSortValues.push(data[i].total_cases)
            }

            toSortValues.sort(function(a, b){        //(W3schools.com, 2022)
                return b - a;
            })

            reqValuesLOLLIPOP = toSortValues.slice(0, 6)           //(Bobbyhadz.com, 2021)

            var newDataLOLLIPOP = data.filter(lollipopFunc)
                function lollipopFunc(dat){        
                    return (reqValuesLOLLIPOP.includes(dat.total_cases))       
                }

            newDataLOLLIPOP.sort(function(a, b){         //(W3schools.com, 2022)
                return b.total_cases - a.total_cases
            })

            for(var i = 0; i<newDataLOLLIPOP.length; i++){
                highCaseNumSetLOLLIPOP.add(newDataLOLLIPOP[i].total_cases)
            }

            axes(newDataLOLLIPOP)
            updateYAxis(highCaseNumSetLOLLIPOP)

            var z = svgLOLLIPOP.selectAll(".lollipopLine")
                                .data(newDataLOLLIPOP)

                z.enter()
                   .append("line")
                   .attr("class", "lollipopLine")
                   .merge(z)
                   .transition()                            
                   .duration(900)
                   .attr("stroke", "grey")
                   .attr("x1", function(d) { 
                        return x(d.location) + 100;      //(Holtz, 2022)
                    })
                    .attr("x2", function(d) { 
                        return x(d.location) + 100; 
                    })
                    .attr("y1", function(d) { 
                        return y(d.total_cases) + 36; 
                    })
                    .attr("y2", y(0) + 36)

            var p = svgLOLLIPOP.selectAll(".marker")
                                .data(newDataLOLLIPOP)

                p.enter()
                    .append("circle")
                    .attr("class", "marker")
                    .merge(p)
                    .transition()
                    .duration(900)
                    .attr("stroke", "black")
                    .style("fill", "#CD0046")
                    .attr("cx", function(d){
                        return x(d.location) + 100;
                    })
                    .attr("cy", function(d){
                        return y(d.total_cases) + 36;
                    })
                    .attr("r", 5) 
        }

        drawChartLollipop(listOfCountry)
    })
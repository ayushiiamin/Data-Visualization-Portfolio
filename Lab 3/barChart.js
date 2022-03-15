// REFERENCES - 

// 1) w3resource. (2020). JavaScript: Find out the last day of a month - w3resource. [online] 
//    Available at: https://www.w3resource.com/javascript-exercises/javascript-date-exercise-9.php

// 2) GeeksforGeeks. (2019). Compare two dates using JavaScript - GeeksforGeeks. [online] 
//    Available at: https://www.geeksforgeeks.org/compare-two-dates-using-javascript/#:~:text=In%20JavaScript%2C%20we%20can%20compare,we%20can%20directly%20compare%20them

// 3) W3schools.com. (2022). JavaScript Date getMonth() Method. [online] 
//    Available at: https://www.w3schools.com/jsref/jsref_getmonth.asp

// 4) Ordonez, T. (2020). D3 Convert String to Date. [online] Tom Ordonez. 
//    Available at: https://www.tomordonez.com/d3-convert-string-to-date/

// 5) dedpo (2016). Selecting a section of data from CSV in d3.js. [online] Stack Overflow. 
//    Available at: https://stackoverflow.com/questions/36314656/selecting-a-section-of-data-from-csv-in-d3-js

// 6) Subin Siby (2014). Create Global Functions In JavaScript. [online] Subinsb.com. 
//    Available at: https://subinsb.com/global-functions-javascript/

// 7) Plunkett, O. (2015). Using d3 - How do I select specific data from array to highlight when I click a button? [online] Stack Overflow. 
//    Available at: https://stackoverflow.com/questions/33241490/using-d3-how-do-i-select-specific-data-from-array-to-highlight-when-i-click-a

// 8) santoku (2018). How to filter elements and hide others? [online] Stack Overflow. 
//    Available at: https://stackoverflow.com/questions/49517904/how-to-filter-elements-and-hide-others





    const marginCHART = {top: 10, right: 30, bottom: 70, left: 155};
    const widthCHART = 400 - marginCHART.left - marginCHART.right;
    const heightCHART = 220 - marginCHART.top - marginCHART.bottom;


    var asiaArr = [];

    var	parseDate = d3.timeParse("%Y-%m-%d");            //(Ordonez, 2020)

    function toNumDate(d) {
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
        asiaArr.push(toNumDate(d))
    }).then(function(data){

        const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

        
        var svgCHART = d3.select('body')
                            .append("svg")
                            .attr("class","bar")
                            .attr("width", widthCHART + marginCHART.left + marginCHART.right)
                            .attr("height", heightCHART + marginCHART.top + marginCHART.bottom)

        var g = svgCHART.selectAll("g")
                        .data(asiaArr)
                        .enter()
                        .append("g")
                        .attr("transform", function(d, i) {
                            return "translate(" + marginCHART.left + "," + marginCHART.top + ")";
                        })
                        

        var cBar = 0                
                        

        var x = d3.scaleBand()
                    .range([0, widthCHART])
                    .padding(0.4)             

        
        var xBottomAxis = d3.axisBottom()
                                .scale(x)

        
        var x_bottom = svgCHART.append("g")
                                .attr("class", "xaxis")
                                .attr("transform", "translate(100," + (heightCHART+50) + ")")
                                .call(xBottomAxis)                 

        var y = d3.scaleLinear()
                    .range([heightCHART, 0])

        var yLeftAxis = d3.axisLeft()
                            .scale(y)

        var y_left = svgCHART.append("g")
                                .attr("class", "myYaxis")
                                .attr("transform", "translate(" + (widthCHART-115) + ", 50)")
                                .call(yLeftAxis);

        var gr = svgCHART.append("g")  
        
        window.onMouseOverBAR = function(d, i){

            
            // if(i.total_cases > 1000000)  {
            //     d3.selectAll(".barRect")
            //     .filter(function(d){
            //         // console.log(d.total_cases)
            //         return d.total_cases > 1000000;
            //     })
            //     .transition()
            //     .duration(1000)
            //     .attr("fill", "#130170")
            //     .attr("width", x.bandwidth() + 5) 
            // }    
            
            d3.selectAll(".barRect")
                .transition()
                .duration(1000)
                .attr("fill", "#130170")
                .attr("width", x.bandwidth() + 5) 
            
        }  
        
    window.onMouseOutBAR = function(){
            
            d3.selectAll(".barRect")
                .transition()
                .duration(1000)
                .attr("fill", "#01949A")
                .attr("width", x.bandwidth()) 
        } 
        
    window.onClickBAR = function(){
        d3.selectAll(".barRect")
            .filter(function(d){
                return !(d.total_cases > 50000)           
            })
            .remove()           //(santoku, 2018)

        d3.selectAll(".barRect")
            .filter(function(d){
                return (d.total_cases > 50000);     //(Plunkett, 2015)
            })
            .transition()
            .duration(1000)
            .attr("fill", "#C15B78")
            .attr("width", x.bandwidth() + 5)
    }


    window.getCountryBAR = function(country){           //(Subin Siby, 2014)
            var countryName; 
            countryName = country;
            // console.log("entered bar chart")
            
        function axes(data){
            x.domain(data.map(function(d) {            //(Holtz, 2022)
                return month[d.date.getMonth()];              //(W3schools.com, 2022)
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


        function drawBAR(data) {

            cBar++
            
                axes(data);
                var lastDateBAR;
                var caseNumSetBAR = new Set()
                var reqMonthsBAR = []
                var reqValuesBAR = []
                
    
                for(var i = 0; i<data.length; i++){
                    lastDateBAR = function(d){
                        return new Date(d.getFullYear(), d.getMonth() + 1, 0)          //(w3resource, 2020) 
                    }
                    if(data[i].date.getTime() == lastDateBAR(data[i].date).getTime()){      //(GeeksforGeeks, 2019)
                            reqMonthsBAR.push(month[data[i].date.getMonth()])
                            reqValuesBAR.push(data[i].total_cases)
                            caseNumSetBAR.add(data[i].total_cases)
                    }
                }

                updateYAxis(caseNumSetBAR)

                var newDataBAR = data.filter(barFunc)
                function barFunc(dat){
                    if(dat.date.getTime() == lastDateBAR(dat.date).getTime()){          //(GeeksforGeeks, 2019)
                        return (reqValuesBAR.includes(dat.total_cases))
                    }   
                }
                
                
                var u = svgCHART.selectAll(".barRect")
                            .data(newDataBAR)
                            
                   u.enter()
                    .append("rect")
                    .attr("class", "barRect")
                    .merge(u)
                    .transition()                        
                    .duration(900)
                    .attr("x", function(d){
                        return x(month[d.date.getMonth()]) + 100      
                    })
                    .attr("y", function(d){
                        return y(d.total_cases) + 50    
                    })
                    .attr("width", x.bandwidth())    
                    .attr("height", function(d){
                        return heightCHART - y(d.total_cases)
                    })
                    .attr("fill", "#01949A")
                    
                if(cBar >= 2){
                    clearBar()
                }

                u.exit().remove()
                        
            }

            function clearBar(){
                d3.selectAll(".barRect")
                    .exit()
                    .remove()
                
                // d3.selectAll(".xaxis")
                //     .transition()                            
                //     .duration(1000)
                //     .remove() 

                // d3.selectAll(".myYaxis")
                //     .transition()
                //     .duration(1000)
                //     .remove()

                
                cBar=0
                

                drawBAR(barCountry)
            }

            var barCountry = asiaArr.filter(yearCountry)      //(dedpo, 2016)

            function yearCountry(d){
                return ((d.location == countryName) && (d.date.getFullYear() == 2020))
            }

            drawBAR(barCountry)
            
            
        }

      })

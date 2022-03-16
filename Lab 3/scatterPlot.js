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

// 9) Saxena, U. (2017). Animating using D3 transitions vs using CSS animation. [online] Stack Overflow. 
//    Available at: https://stackoverflow.com/questions/46675499/animating-using-d3-transitions-vs-using-css-animation

// 10) Holtz, Y. (2022). Building legends in d3.js. [online] D3-graph-gallery.com. 
//     Available at: https://www.d3-graph-gallery.com/graph/custom_legend.html





const marginSCATTER = {top: 10, right: 30, bottom: 70, left: 155};
    const widthSCATTER = 400 - marginSCATTER.left - marginSCATTER.right;
    const heightSCATTER = 220 - marginSCATTER.top - marginSCATTER.bottom;


    var asiaArrSCATTER = [];

    var	parseDate = d3.timeParse("%Y-%m-%d");            //(Ordonez, 2020)

    function toOriginal(d) {
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
        asiaArrSCATTER.push(toOriginal(d))
    }).then(function(data){

        const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

        var svgSCATTER = d3.select('body')
                            .append("svg")
                            .attr("class","scatter")
                            .attr("width", widthSCATTER + marginSCATTER.left + marginSCATTER.right)
                            .attr("height", heightSCATTER + marginSCATTER.top + marginSCATTER.bottom)
                            .attr("transform", "translate(20, 20)")

        var gSCATTER = svgSCATTER.selectAll("g")
                            .data(asiaArrSCATTER)
                            .enter()
                            .append("g")
                            .attr("transform", function(d, i) {
                                return "translate(" + marginSCATTER.left + "," + marginSCATTER.top + ")";
                            })

        gSCATTER.append("text")
                            .attr("x", 2)
                            .attr("y", 30)
                            .attr("font-size", "15px")
                            .attr("font-family", "sans-serif")
                            .text("Rise in cases and deaths")    

        var cSCATTER = 0

        var color = d3.scaleOrdinal().range(["#01949A", "#CD0046"]);


        var x = d3.scaleBand()
                   .range([0, widthSCATTER])
                    .padding(0.1)             
        
                
        var xBottomAxis = d3.axisBottom()
                            .scale(x)
        
                
        var x_bottom = svgSCATTER.append("g")
                              .attr("class", "xaxisSCATTER")
                              .attr("transform", "translate(100," + (heightSCATTER+50) + ")")
                              .call(xBottomAxis)


        var y = d3.scaleLinear()
                  .range([heightSCATTER, 0])
          
        var yLeftAxis = d3.axisLeft()
                           .scale(y)
          
        var y_left = svgSCATTER.append("g")
                            .attr("class", "myYaxisSCATTER")
                            .attr("transform", "translate(" + (widthSCATTER-115) + ", 50)")
                            .call(yLeftAxis);
          
        var gr = svgSCATTER.append("g")

        

        window.getCountrySCATTER = function(country){
            var countryNameSCATTER;
            countryNameSCATTER = country; 
            // console.log("entered scatter plot") 


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

        


        function showScatter(data){

            svgSCATTER.append("circle")
                    .attr("cx", 400)
                    .attr("cy", 130)
                    .attr("fill", "#2D1674")
                    .attr("r", 32)
                    .on("click", onClickLINE)
            
            svgSCATTER.append("text")
                        .text("Filter Line Chart")
                        .attr("x", 400)
                        .attr("y", 130)
                        .attr("text-anchor", "middle")
                        .attr("font-size", "9px")
                        .attr("fill", "white")

            svgSCATTER.append("circle")
                    .attr("cx", 400)
                    .attr("cy", 200)
                    .attr("fill", "#A998EE")
                    .attr("r", 32)
                    .on("click", onClickBAR)
            
            svgSCATTER.append("text")
                        .text("Filter Bar Chart")
                        .attr("x", 400)
                        .attr("y", 200)
                        .attr("text-anchor", "middle")
                        .attr("font-size", "10px")
                        .attr("fill", "#130170")


            //(Holtz, 2022)
            const legendData = ["Cases", "Deaths"]

            svgSCATTER.selectAll("legendDots")
                        .data(legendData)
                        .enter()
                        .append("circle")
                        .attr("cx", 350)
                        .attr("cy", function(d,i){ 
                            return 40 + i*20              //(Holtz, 2022)
                        }) 
                        .attr("r", 7)
                        .style("fill", function(d){ 
                            return color(d)
                        })

            svgSCATTER.selectAll("legendLabels")
                        .data(legendData)
                        .enter()
                        .append("text")
                        .attr("font-size", "13px")
                        .attr("x", 360)
                        .attr("y", function(d,i){ 
                            return 41 + i*20            //(Holtz, 2022)
                        }) 
                        .attr("fill", "black")
                        .text(function(d){ 
                              return d
                        })
                        .attr("text-anchor", "left")
                        .style("alignment-baseline", "middle")         //(Holtz, 2022)

            cSCATTER++

            axes(data);

            var lastDateSCATTER;
            var caseNumSetSCATTER1 = new Set()
            var reqMonthsSCATTER1 = []
            var reqValuesSCATTER1 = []

            //cases
            for(var i = 0; i<data.length; i++){
                lastDateSCATTER = function(d){
                    return new Date(d.getFullYear(), d.getMonth() + 1, 0)
                }
                if(data[i].date.getTime() == lastDateSCATTER(data[i].date).getTime()){
                        reqMonthsSCATTER1.push(month[data[i].date.getMonth()])
                        reqValuesSCATTER1.push(data[i].total_cases)
                        caseNumSetSCATTER1.add(data[i].total_cases)
                }
            }

            updateYAxis(caseNumSetSCATTER1)

            var newDataSCATTER1 = data.filter(chart1Func)
            function chart1Func(dat){
                if(dat.date.getTime() == lastDateSCATTER(dat.date).getTime()){
                    return (reqValuesSCATTER1.includes(dat.total_cases))
                }   
            }


            var s1 = svgSCATTER.selectAll(".scatt1")
                                .data(newDataSCATTER1)

            
                        s1.enter()
                            .append("circle")
                            .attr("class","scatt1")
                            .merge(s1)
                            .on("mouseover", onMouseOverBAR)
                            .on("mouseout", onMouseOutBAR)
                            .transition()           
                            .duration(900)
                            .attr("r", 3)
                            .attr("fill", function(d, i){
                                return color(0);
                            })
                            .attr("cx", function(d) { 
                                // console.log(month[d.date.getMonth()])
                                return x(month[d.date.getMonth()]) + 108; 
                            })
                            .attr("cy", function(d) { 
                                return y(d.total_cases)  + 50 ;
                            })
                            
        //     d3.select(".scatter").call(d3.brush()
        //                     .extent([[0, 0], [widthSCATTER, heightSCATTER]])
        //                     .on("start brush end", updateChart)
        //                     )
            
        //     function updateChart(){
        //         // console.log("helo")
        //         // console.log(this)
        //         extent = d3.brushSelection(this)
        //         // console.log(this)
        //         s1.classed("selected", function(d){
        //             return isBrushed(extent, x(month[d.date.getMonth()]), y(d.total_cases))
        //         })
        //     }

        //     function isBrushed(brush_coords, cx, cy) {
        //         var x0 = brush_coords[0][0],
        //             x1 = brush_coords[1][0],
        //             y0 = brush_coords[0][1],
        //             y1 = brush_coords[1][1];
        //        return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;    // This return TRUE or FALSE depending on if the points is in the selected area
        //    }


            //deaths            
            var reqMonthsSCATTER2 = []
            var reqValuesSCATTER2 = []            
            
            
            for(var i = 0; i<data.length; i++){
                lastDateSCATTER = function(d){
                    return new Date(d.getFullYear(), d.getMonth() + 1, 0)
                }
                if(data[i].date.getTime() == lastDateSCATTER(data[i].date).getTime()){
                        reqMonthsSCATTER2.push(month[data[i].date.getMonth()])
                        reqValuesSCATTER2.push(data[i].total_deaths)
                }
            }

            var newDataSCATTER2 = data.filter(chart2Func)
            function chart2Func(dat){
                if(dat.date.getTime() == lastDateSCATTER(dat.date).getTime()){
                    return (reqValuesSCATTER2.includes(dat.total_deaths))
                }   
            }

            


            var s2 = svgSCATTER.selectAll(".scatt2")
                                .data(newDataSCATTER2)

                    s2.enter()
                        .append("circle")
                        .attr("class","scatt2")
                        .merge(s2)
                        .on("mouseover", onMouseOverLINE)
                        .on("mouseout", onMouseOutLINE)
                        .transition()           
                        .duration(900)
                        .attr("r", 3)
                        .attr("fill", function(d, i){
                            return color(1);
                        })
                        .attr("cx", function(d) { 
                            // console.log(month[d.date.getMonth()])
                            return x(month[d.date.getMonth()]) + 108; 
                        })
                        .attr("cy", function(d) { 
                            return y(d.total_deaths)  + 50 ;
                        })
                        


            if(cSCATTER >= 2){
                clearSCATTER()
            }

            s1.exit().remove()
            s2.exit().remove()
        }

        function clearSCATTER(){
            d3.selectAll(".scatt1")
                .exit()
                .remove()

            d3.selectAll(".scatt2")
                .exit()
                .remove()
            
            cSCATTER=0
            

            showScatter(countryArrSCATTER)
        }


        var countryArrSCATTER = asiaArrSCATTER.filter(yearCountry)      //(dedpo, 2016)

        function yearCountry(d){
            return ((d.location == countryNameSCATTER) && (d.date.getFullYear() == 2020))   
        }

        showScatter(countryArrSCATTER)

    }
    })
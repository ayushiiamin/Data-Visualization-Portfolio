// REFERENCES - 

// 1) w3resource. (2020). JavaScript: Find out the last day of a month - w3resource. [online] 
//    Available at: https://www.w3resource.com/javascript-exercises/javascript-date-exercise-9.php

// 2) Hellnar (2010). Checking if two Dates have the same date info. [online] Stack Overflow. 
//    Available at: https://stackoverflow.com/questions/4428327/checking-if-two-dates-have-the-same-date-info

// 3) W3schools.com. (2022). JavaScript Date getMonth() Method. [online] 
//    Available at: https://www.w3schools.com/jsref/jsref_getmonth.asp

// 4) Ordonez, T. (2020). D3 Convert String to Date. [online] Tom Ordonez. 
//    Available at: https://www.tomordonez.com/d3-convert-string-to-date/

// 5) dedpo (2016). Selecting a section of data from CSV in d3.js. [online] Stack Overflow. 
//    Available at: https://stackoverflow.com/questions/36314656/selecting-a-section-of-data-from-csv-in-d3-js

// 6) Subin Siby (2014). Create Global Functions In JavaScript. [online] Subinsb.com. 
//    Available at: https://subinsb.com/global-functions-javascript/    
    
    
    
    
    
    
    
    const marginLINE = {top: 10, right: 30, bottom: 70, left: 155};
    const widthLINE = 400 - marginLINE.left - marginLINE.right;
    const heightLINE = 220 - marginLINE.top - marginLINE.bottom;


    var asiaArrLINE = [];

    var	parseDate = d3.timeParse("%Y-%m-%d");            //(Ordonez, 2020)

    function strToOriginal(d) {
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
        // console.log(d.date)
        asiaArrLINE.push(strToOriginal(d))
    }).then(function(data){

        const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

        //Creating an svg for the map
        var svgLINE = d3.select('body')
                            .append("svg")
                            .attr("class","line")
                            .attr("width", widthLINE + marginLINE.left + marginLINE.right)
                            .attr("height", heightLINE + marginLINE.top + marginLINE.bottom)
                            .attr("transform", "translate(10, 0)")
                            // .attr("transform", "translate(150,150)")
                            // .append("g")
                            // .attr("transform",
                            // "translate(" + marginCHART.left + "," + 100 + ")");

        var gLINE = svgLINE.selectAll("g")
                        .data(asiaArrLINE)
                        .enter()
                        .append("g")
                        .attr("transform", function(d, i) {
                            // console.log(d)
                            //console.log(typeof d.date.getFullYear())
                            // console.log(d)
                            return "translate(" + marginLINE.left + "," + marginLINE.top + ")";
                        })
                        // console.log(asiaArr.date.getMonth()+1)
        var cLINE = 0 
        var cDOT = 0 
        
        var x = d3.scaleBand()
                    .range([0, widthLINE])
                    .padding(0.1)             

        
        var xBottomAxis = d3.axisBottom()
                                .scale(x)

        
        var x_bottom = svgLINE.append("g")
                                .attr("class", "xaxisLINE")
                                .attr("transform", "translate(100," + (heightLINE+50) + ")")
                                .call(xBottomAxis)                 

        var y = d3.scaleLinear()
                    .range([heightLINE, 0])

        var yLeftAxis = d3.axisLeft()
                            .scale(y)

        var y_left = svgLINE.append("g")
                                .attr("class", "myYaxisLINE")
                                .attr("transform", "translate(" + (widthLINE-115) + ", 50)")
                                .call(yLeftAxis);

        var gr = svgLINE.append("g") 
        


        window.onMouseOverLINE = function(){
            // console.log("entered mouseover")
            // for(var i = 0; i<data.length; i++){
                // if(data[i].total_deaths == dea){
                    // console.log(d3.select(".point")._groups[0][0].__data__.total_deaths)
                    d3.selectAll(".point")
                    // .filter(function(d) { 
                    //     // console.log(d)
                    //     console.log(dea)
                    //     console.log("helo", d.total_deaths)
                    //     return d.total_deaths == dea;
                    // })
                    // .datum(dea)
                        .transition()
                        .duration(900)
                        .attr("r", 5)
                        .attr("fill", "#004369")
                // }
            // }
        }

        window.onMouseOutLINE = function(){
            // console.log("entered mouseout")
            d3.selectAll(".point")
                .transition()
                .duration(900)
                .attr("r", 3)
                .attr("fill", "#CD0046")

        }

        window.getCountryLINE = function(country){
            var countryNameLINE;
            countryNameLINE = country;   
            // console.log("entered line chart")             

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


        // console.log(asiaArrLINE.length)
        

        function drawLine(data){
            cLINE++



            axes(data);
            var lastDate;
            var deaNumSet = new Set()
            var reqMonths = []
            var reqValues1 = []
            

            for(var i = 0; i<data.length; i++){
                lastDate = function(d){
                    return new Date(d.getFullYear(), d.getMonth() + 1, 0)
                }
                if(data[i].date.getTime() == lastDate(data[i].date).getTime()){
                        // console.log(lastDate(data[i].date))
                        // console.log(lastDate(data[i].date))
                        reqMonths.push(month[data[i].date.getMonth()])
                        reqValues1.push(data[i].total_deaths)
                        // reqValues2.push(data[i].total_cases)
                        deaNumSet.add(data[i].total_deaths)
                }
            }

            updateYAxis(deaNumSet)

            var newData1 = data.filter(chart1Func)
            function chart1Func(dat){
                if(dat.date.getTime() == lastDate(dat.date).getTime()){
                    return (reqValues1.includes(dat.total_deaths))
                }   
            }

            var l = svgLINE.selectAll(".line")
                            .data([newData1]);

            l.enter()
              .append("path")
              .attr("class","line")
              .merge(l)
              .transition()        
              .duration(900)
              .attr("fill", "none")
              .attr("stroke", "#CD0046")      
              .attr("stroke-width", 1.5)
              .attr("d", d3.line()
              .x(function(d){
                    return x(month[d.date.getMonth()]) + 108
                })
               .y(function(d){
                    return y(d.total_deaths) + 50   
                })
              )

            if(cLINE >= 2){
                // u.exit().remove()
                clearLINE()
            }

            showDots(newData1)

            l.exit().remove()
        }


        function showDots(data){

            cDOT++

        
            var d = svgLINE.selectAll(".point")
                        .data(data)

            d.enter()
               .append("circle")
               .attr("class","point")
               .merge(d)
               .transition()           
                .duration(900)
               .attr("cx", function(d){
                   //alert(x(d))
                   return x(month[d.date.getMonth()]) + 108; 
               })
               .attr("cy", function(d){
                   return y(d.total_deaths) + 50  
               })
               .attr("r", 3)                
               .attr("fill", "#CD0046")
            
            // console.log(data.length)

            if(cDOT >= 2){
                // u.exit().remove()
                clearLINE()
            }

            d.exit().remove()
        }


        function clearLINE(){
            d3.selectAll(".line")
                .exit()
                .remove()

            d3.selectAll(".point")
                .exit()
                .remove()
            
            cLINE=0
            cDOT=0
            

            drawLine(countryArrLINE)
        }

        var countryArrLINE = asiaArrLINE.filter(yearCountry)      //(dedpo, 2016)

        function yearCountry(d){
            return ((d.location == countryNameLINE) && (d.date.getFullYear() == 2020))   
        }

        drawLine(countryArrLINE)

    }
    })
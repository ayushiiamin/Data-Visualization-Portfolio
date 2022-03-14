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
                            .attr("transform", "translate(10, 0)")

        var gSCATTER = svgSCATTER.selectAll("g")
                            .data(asiaArrSCATTER)
                            .enter()
                            .append("g")
                            .attr("transform", function(d, i) {
                                return "translate(" + marginSCATTER.left + "," + marginSCATTER.top + ")";
                            })

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
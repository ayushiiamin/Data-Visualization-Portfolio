    const marginLINE = {top: 10, right: 30, bottom: 70, left: 155};
    const widthLINE = 400 - marginLINE.left - marginLINE.right;
    const heightLINE = 220 - marginLINE.top - marginLINE.bottom;


    var asiaArr = [];

    var	parseDate = d3.timeParse("%Y-%m-%d");            //(Ordonez, 2020)

    function strToOriginal(d) {
        return {
            iso_code: d.iso_code,
            continent: d.continent,
            location: d.location,
            date: parseDate(d.date),                 //(Ordonez, 2020)
            total_cases: Number(d.total_cases),
            new_cases: Number(d.new_cases),
            new_cases_smoothed: Number(d.new_cases_smoothed),
            total_deaths: Number(d.total_deaths),
            new_deaths: Number(d.new_deaths),
            new_deaths_smoothed: Number(d.new_deaths_smoothed),
            total_cases_per_million: Number(d.total_cases_per_million),
            new_cases_per_million: Number(d.new_cases_per_million),
            new_cases_smoothed_per_million: Number(d.new_cases_smoothed_per_million),
            total_deaths_per_million: Number(d.total_deaths_per_million),
            new_deaths_per_million: Number(d.new_deaths_per_million),
            new_deaths_smoothed_per_million: Number(d.new_deaths_smoothed_per_million),
            reproduction_rate: Number(d.reproduction_rate),
            icu_patients: Number(d.icu_patients),
            icu_patients_per_million: Number(d.icu_patients_per_million),
            hosp_patients: Number(d.hosp_patients),
            hosp_patients_per_million: Number(d.hosp_patients_per_million),
            weekly_icu_admissions: Number(d.weekly_icu_admissions),
            weekly_icu_admissions_per_million: Number(d.weekly_icu_admissions_per_million),
            weekly_hosp_admissions: Number(d.weekly_hosp_admissions),
            weekly_hosp_admissions_per_million: Number(d.weekly_hosp_admissions_per_million),
            new_tests: Number(d.new_tests),
            total_tests: Number(d.total_tests),
            total_tests_per_thousand: Number(d.total_tests_per_thousand),
            new_tests_per_thousand: Number(d.new_tests_per_thousand),
            new_tests_smoothed: Number(d.new_tests_smoothed),
            new_tests_smoothed_per_thousand: Number(d.new_tests_smoothed_per_thousand),
            positive_rate: Number(d.positive_rate),
            tests_per_case: Number(d.tests_per_case),
            tests_units: d.tests_units,
            total_vaccinations: Number(d.total_vaccinations),
            people_vaccinated: Number(d.people_vaccinated),
            people_fully_vaccinated: Number(d.people_fully_vaccinated),
            total_boosters: Number(d.total_boosters),
            new_vaccinations: Number(d.new_vaccinations),
            new_vaccinations_smoothed: Number(d.new_vaccinations_smoothed),
            total_vaccinations_per_hundred: Number(d.total_vaccinations_per_hundred),
            people_vaccinated_per_hundred: Number(d.people_vaccinated_per_hundred),
            people_fully_vaccinated_per_hundred: Number(d.people_fully_vaccinated_per_hundred),
            total_boosters_per_hundred: Number(d.total_boosters_per_hundred),
            new_vaccinations_smoothed_per_million: Number(d.new_vaccinations_smoothed_per_million),
            new_people_vaccinated_smoothed: Number(d.new_people_vaccinated_smoothed),
            new_people_vaccinated_smoothed_per_hundred: Number(d.new_people_vaccinated_smoothed_per_hundred),
            stringency_index: Number(d.stringency_index),
            population: Number(d.population),
            population_density: Number(d.population_density),
            median_age: Number(d.median_age),
            aged_65_older: Number(d.aged_65_older),
            aged_70_older: Number(d.aged_70_older),
            gdp_per_capita: Number(d.gdp_per_capita),
            extreme_poverty: Number(d.extreme_poverty),
            cardiovasc_death_rate: Number(d.cardiovasc_death_rate),
            diabetes_prevalence: Number(d.diabetes_prevalence),
            female_smokers: Number(d.female_smokers),
            male_smokers: Number(d.male_smokers),
            handwashing_facilities: Number(d.handwashing_facilities),
            hospital_beds_per_thousand: Number(d.hospital_beds_per_thousand),
            life_expectancy: Number(d.life_expectancy),
            human_development_index: Number(d.human_development_index),
            excess_mortality_cumulative_absolute: Number(d.excess_mortality_cumulative_absolute),
            excess_mortality_cumulative: Number(d.excess_mortality_cumulative),
            excess_mortality: Number(d.excess_mortality),
            excess_mortality_cumulative_per_million: Number(d.excess_mortality_cumulative_per_million)
        };
    }
    
    // let arrayCSV = "https://raw.githubusercontent.com/ayushiiamin/csvfileimp/main/asia.csv"

    d3.csv("data/asia.csv", function(d, i){
        // console.log(d.date)
        asiaArr.push(strToOriginal(d))
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
                        .data(asiaArr)
                        .enter()
                        .append("g")
                        .attr("transform", function(d, i) {
                            // console.log(d)
                            //console.log(typeof d.date.getFullYear())
                            // console.log(d)
                            return "translate(" + marginLINE.left + "," + marginLINE.top + ")";
                        })
                        // console.log(asiaArr.date.getMonth()+1)

        
        var x = d3.scaleBand()
                    .range([0, widthLINE])
                    .padding(0.1)             

        
        var xBottomAxis = d3.axisBottom()
                                .scale(x)

        
        var x_bottom = svgLINE.append("g")
                                .attr("class", "xaxis")
                                .attr("transform", "translate(100," + (heightLINE+50) + ")")
                                .call(xBottomAxis)                 

        var y = d3.scaleLinear()
                    .range([heightLINE, 0])

        var yLeftAxis = d3.axisLeft()
                            .scale(y)

        var y_left = svgLINE.append("g")
                                .attr("class", "myYaxis")
                                .attr("transform", "translate(" + (widthLINE-115) + ", 50)")
                                .call(yLeftAxis);

        var gr = svgLINE.append("g")           


        function axes(data){
            x.domain(data.map(function(d) {            //(Holtz, 2022)
                return month[d.date.getMonth()];              //(W3schools.com, 2022)
            }))

            xBottomAxis = d3.axisBottom()
                            .scale(x)

            x_bottom.transition()                  //(Holtz, 2022)
                    .duration(1000)
                    .call(xBottomAxis)    
        }

        function updateYAxis(data){
            y.domain(           
                [d3.min(data), d3.max(data)]
            )

            yLeftAxis = d3.axisLeft()
                            .scale(y)

            y_left.transition()                  
                    .duration(1000)
                    .call(yLeftAxis)
        }

        
        // window.getCountry = function(country){        //(Subin Siby, 2014)
        //     window.countryName = country
        // }
        var india = asiaArr.filter(yearCountry)      //(dedpo, 2016)

        function yearCountry(d){
            return ((d.location == "India") && (d.date.getFullYear() == 2020))   
        }

        function drawLine(data){
            axes(data);
            var lastDate;
            var caseNumSet = new Set()
            var reqMonths = []
            var reqValues = []

            for(var i = 0; i<data.length; i++){
                lastDate = function(d){
                    return new Date(d.getFullYear(), d.getMonth() + 1, 0)
                }

                
                if(data[i].date.getTime() == lastDate(data[i].date).getTime()){
                        reqMonths.push(month[data[i].date.getMonth()])
                        reqValues.push(data[i].total_deaths)
                        caseNumSet.add(data[i].total_deaths)
                }
            }

            updateYAxis(caseNumSet)

            var newData = data.filter(testFunc)

            function testFunc(dat){
                if(dat.date.getTime() == lastDate(dat.date).getTime()){
                    return (reqValues.includes(dat.total_deaths))
                }
                
            }

            // console.log(newData)

            var u = svgLINE.selectAll(".line")
                            .data([newData]);

            u.enter()
              .append("path")
              .attr("class","line")
              .merge(u)
              .transition()        
              .duration(1000)
              .attr("fill", "none")
              .attr("stroke", "#CD0046")      
              .attr("stroke-width", 1.5)
              .attr("d", d3.line()
              .x(function(d){
                    return x(month[d.date.getMonth()]) + 98
                })
               .y(function(d){
                    return y(d.total_deaths) + 50   
                })
              )
        }

        drawLine(india)
    })
const marginCHART = {top: 10, right: 30, bottom: 70, left: 155};
const widthCHART = 400 - marginCHART.left - marginCHART.right;
const heightCHART = 220 - marginCHART.top - marginCHART.bottom;


var asiaArr = [];

var	parseDate = d3.timeParse("%Y-%m-%d");

function toNumDate(d) {
    return {
        iso_code: d.iso_code,
        continent: d.continent,
        location: d.location,
        date: parseDate(d.date),
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

d3.csv("data/asia.csv", function(d, i){
    // asiaArr.push(d);
    asiaArr.push(toNumDate(d))
    // console.log(asiaArr["date"])
    // console.log(asiaArr.date)
}).then(function(data){

    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    //Creating an svg for the map
    var svgCHART = d3.select('body')
                        .append('div')
                        .append("svg")
                        .attr("class","bar")
                        .attr("width", widthCHART + marginCHART.left + marginCHART.right)
                        .attr("height", heightCHART + marginCHART.top + marginCHART.bottom)
                        // .attr("transform", "translate(150,150)")
                        // .append("g")
                        // .attr("transform",
                        // "translate(" + marginCHART.left + "," + 100 + ")");

    var g = svgCHART.selectAll("g")
                    .data(asiaArr)
                    .enter()
                    .append("g")
                    .attr("transform", function(d, i) {
                        // console.log(d)
                        //console.log(typeof d.date.getFullYear())
                        return "translate(" + marginCHART.left + "," + marginCHART.top + ")";
                    })
                    // console.log(asiaArr.date.getMonth()+1)

    //Defining the x-axis for the bar chart
    var x = d3.scaleBand()
                .range([0, widthCHART])
                .padding(0.1)             //Since each of the datasets consists of discrete values, we add a padding of 0.2 between each bars so that the bar chart does not appear like a histogram

     //Creating a horizontal bottom x-axis using the data generated for the x-axis above
     var xBottomAxis = d3.axisBottom()
                            .scale(x)

    //Adding the bottom x-axis to the svg
    var x_bottom = svgCHART.append("g")
                            .attr("transform", "translate(100," + (heightCHART+50) + ")")
                            .call(xBottomAxis)                 



    //Defining the y-axis for the bar chart
    // var y = d3.scaleLinear()
    //             .domain([0, 600000])          //Only numbers from 0-26 will appear on the y-axis
    //             .range([heightCHART, 0]);
    var y = d3.scaleBand()
                .range([heightCHART, 0])
                .padding(0.1)

    //Creating a vertical left y-axis using the data generated for the y-axis above
    var yLeftAxis = d3.axisLeft()
                        .scale(y)

    //Adding the left y-axis to the svg
    var y_left = svgCHART.append("g")
                            .attr("class", "myYaxis")
                            .attr("transform", "translate(" + (widthCHART-115) + ", 50)")
                            .call(yLeftAxis);

    //Creating the container to elements of the bar chart
    var gr = svgCHART.append("g")           

    //The below function is used for updating x-axis values dynamically
    function axes(data){
        
        // var monthSet = new Set()

        //The domain is set according the elements present in the "group" key
        //of each of the datasets
        x.domain(data.map(function(d) {            //(Holtz, 2022)
            // monthSet.add(month[d.date.getMonth()])
            return month[d.date.getMonth()]; 
        }))

        //Update the bottom x-axis accordingly
        xBottomAxis = d3.axisBottom()
                        .scale(x)

        //Smoothly transform the updated bottom x-axis
        x_bottom.transition()                  //(Holtz, 2022)
                .duration(1000)
                .call(xBottomAxis)

        
        y.domain(data.map(function(d){
            
        }))
    }

    var india = asiaArr.filter(yearCountry)

    function yearCountry(d){
        return ((d.date.getFullYear() == 2020) && (d.location == "India"))
    }



    function update(data) {

        
        axes(data);
        var lastDate;
        
        
        var u = gr.selectAll("rect")
                    .data(data)
                    .join("rect")
            
            
            u.transition()                            
                    .duration(1000)
                    .attr("x", function(d){
                        //console.log(month[d.date.getMonth()])

                        
                        lastDate = function(data){
                            return new Date(d.date.getFullYear(), d.date.getMonth()+1, 0)
                        }

                        // console.log(month[d.date.getMonth()])
                        // console.log(lastDate(d.date))                                

                        if(d.date.toDateString() == lastDate(d.date).toDateString()){
                            // return y(d.total_cases)
                            // return x(d.date.getMonth())
                            console.log(x(month[d.date.getMonth()]))
                            return x(month[d.date.getMonth()]) + 100
                        } 
                        // console.log(month[d.date.getMonth()])
                        // console.log(lastDate(d))

                        // monthSet.add(month[d.date.getMonth()])
                        // console.log(monthSet)
                        // return x(d.group);        
                    })
                    .attr("y", function(d){

                        lastDate = function(data){
                            return new Date(d.date.getFullYear(), d.date.getMonth()+1, 0)
                        }

                        // console.log(month[d.date.getMonth()])
                        // console.log(lastDate(d.date))                                

                        if(d.date.toDateString() == lastDate(d.date).toDateString()){
                            return y(d.total_cases) + 50
                        }
                        
                        // return y(d.value);        
                    })
                    .attr("width", x.bandwidth())    
                    .attr("height", function(d){

                        lastDate = function(data){
                            return new Date(d.date.getFullYear(), d.date.getMonth()+1, 0)
                        }

                        // console.log(month[d.date.getMonth()])
                        // console.log(lastDate(d.date))                                

                        if(d.date.toDateString() == lastDate(d.date).toDateString()){
                            // console.log(d.total_cases)
                            // console.log(heightCHART - y(d.total_cases))
                            return heightCHART - y(d.total_cases) 
                        }

                          
                    })
                    .attr("fill", "black")            
            // console.log(monthSet)
            // u.on("mouseover", onMouseOver)         
            //  .on("mouseout", onMouseOut)           
        
             
        
        // u.exit().remove()
        
    }

    update(india)
})

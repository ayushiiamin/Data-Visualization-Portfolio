// REFERENCES - 

// 1) Bobbyhadz.com. (2021). Get the Last Day of the Year in JavaScript | bobbyhadz. [online] 
//    Available at: https://bobbyhadz.com/blog/javascript-get-last-day-of-year#:~:text=To%20get%20the%20last%20day,last%20day%20of%20the%20year.&text=Copied! 
    




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
                    .attr("width", widthPIE + 100)
                    .attr("height", heightPIE)
                    .attr("transform", "translate(10, 0)")
                    .append("g")
                    .attr("transform", "translate(" + (widthPIE-250) + "," + (heightPIE-180) + ")");

    var radius = Math.min(widthPIE, heightPIE)/2;

    var color = d3.scaleOrdinal().range(["#01949A", "#CD0046", "#CDF4DC", "#130170"]);
    // var color = d3.scaleOrdinal().range(["#CDF4DC", "#130170", "#CDF4DC", "#130170"]);
    
    

    var pie = d3.pie()
                .sort(null)

    var arc = d3.arc()
                .innerRadius(radius - 100)
                .outerRadius(radius - 50);   
                
    var countryArrPIE= asiaArrPIE.filter(yearCountry)      //(dedpo, 2016)

    function yearCountry(d){
        return ((d.location == "India") && (d.date.getFullYear() == 2020))   
    }

                
    function showPie(data){

        var lastDayofYear;
        var datArr = []

        for(var i = 0; i<data.length; i++){
            lastDayofYear = function(d){
                return new Date(d.getFullYear(), 11, 31)            //(Bobbyhadz.com, 2021)
            }

            if(data[i].date.getTime() == lastDayofYear(data[i].date).getTime()){
                // console.log(data[i].date)
                datArr.push(data[i].total_cases)
                console.log(data[i].total_cases)

                datArr.push(data[i].total_deaths)
                console.log(data[i].total_deaths)

                datArr.push(data[i].total_vaccinations)
                console.log(data[i].total_vaccinations)
                
                datArr.push(data[i].total_boosters)
                console.log(data[i].total_boosters)
                // console.log(datArr)
            }
        }

        console.log(datArr)

        var path = svgPIE.selectAll("path")
                       .data(pie(datArr))
                       
        console.log(pie(datArr))

        path.enter()
            .append("path")
            .merge(path)
            .transition()
            .duration(1000)    
            .attr("fill", function(d, i){
                console.log(color(i))
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
            
        path.exit().remove();
    }

    showPie(countryArrPIE)
})
//REFERENCES - 

// 1) Holtz, Y. (2022). Bubblemap template for d3.js. [online] D3-graph-gallery.com. 
//    Available at: https://www.d3-graph-gallery.com/graph/bubblemap_template.html

// 2) Holtz, Y. (2022). Basic background map in d3.js. [online] D3-graph-gallery.com. 
//    Available at: https://www.d3-graph-gallery.com/graph/backgroundmap_basic.html



const margin = {top: 30, right: 30, bottom: 70, left: 155};
const widthSVG = 1060 - margin.left - margin.right;
const heightSVG = 750 - margin.top - margin.bottom;


var asiaArrMAP = [];

    var	parseDate = d3.timeParse("%Y-%m-%d");            //(Ordonez, 2020)

    function strNumDateObjArr(d) {
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
        asiaArrMAP.push(strNumDateObjArr(d))
    }).then(function(datas){
        //Creating an svg for the map
        var svg = d3.select('body')
                    .append("svg")
                    .attr("class","map")
                    .attr("width", widthSVG + margin.left + margin.right)
                    .attr("height", heightSVG + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform",
                    "translate(" + 0 + "," + 10 + ")");

        var cl=0

        var mapProjection = d3.geoMercator()                    //(Holtz, 2022)
                            .scale(185)
                            .center([21,37])
                            .translate([0, 100])

        
        let mapJSON = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";     //(Holtz, 2022)


        //Loading the JSON file
        d3.json(mapJSON).then(function(data){
        

            data.features = data.features.filter(function(d){
                return (
                    (d.properties.name=="Afghanistan") 
                    || (d.properties.name=="Armenia")
                    || (d.properties.name=="Azerbaijan")
                    || (d.properties.name=="Bahrain")
                    || (d.properties.name=="Bangladesh")
                    || (d.properties.name=="Bhutan")
                    || (d.properties.name=="Brunei")
                    || (d.properties.name=="Cambodia")
                    || (d.properties.name=="China")
                    || (d.properties.name=="Georgia")
                    || (d.properties.name=="Hong Kong")
                    || (d.properties.name=="India")
                    || (d.properties.name=="Indonesia")
                    || (d.properties.name=="Iran")
                    || (d.properties.name=="Iraq")
                    || (d.properties.name=="Israel")
                    || (d.properties.name=="Japan")
                    || (d.properties.name=="Jordan")
                    || (d.properties.name=="Kazakhstan")
                    || (d.properties.name=="Kuwait")
                    || (d.properties.name=="Kyrgyzstan")
                    || (d.properties.name=="Laos")
                    || (d.properties.name=="Lebanon")
                    || (d.properties.name=="Macao")
                    || (d.properties.name=="Malaysia")
                    || (d.properties.name=="Maldives")
                    || (d.properties.name=="Mongolia")
                    || (d.properties.name=="Myanmar")
                    || (d.properties.name=="Nepal")
                    || (d.properties.name=="Northern Cyprus")
                    || (d.properties.name=="Oman")
                    || (d.properties.name=="Pakistan")
                    || (d.properties.name=="Palestine")
                    || (d.properties.name=="Philippines")
                    || (d.properties.name=="Qatar")
                    || (d.properties.name=="Saudi Arabia")
                    || (d.properties.name=="Singapore")
                    || (d.properties.name=="South Korea")
                    || (d.properties.name=="Sri Lanka")
                    || (d.properties.name=="Syria")
                    || (d.properties.name=="Taiwan")
                    || (d.properties.name=="Tajikistan")
                    || (d.properties.name=="Thailand")
                    || (d.properties.name=="Timor")
                    || (d.properties.name=="Turkey")
                    || (d.properties.name=="Turkmenistan")
                    || (d.properties.name=="United Arab Emirates")
                    || (d.properties.name=="Uzbekistan")
                    || (d.properties.name=="Vietnam")
                    || (d.properties.name=="Yemen")
                    )
            })

            

            var listOfCountryMAP = asiaArrMAP.filter(filterTheData)

            var lastDayofYearMAP;

            function filterTheData(d){ 
                lastDayofYearMAP = function(d){
                    return new Date(d.getFullYear(), 11, 31)            //(Bobbyhadz.com, 2021)
                }

                if((d.date.getTime() == lastDayofYearMAP(d.date).getTime()) && (d.date.getFullYear() == 2020)){
                    return d
                }
            }

            //(Holtz, 2022)
            const setDomain = d3.extent(listOfCountryMAP, function(d){
                return d.total_cases
            })

            //(Holtz, 2022)
            const rad = d3.scaleSqrt()
                            .domain(setDomain)
                            .range([1, 50])

            var map = svg.append("g")
                            .selectAll("path")
                            .data(data.features)
                            .enter()
                            .append("path")
                            .attr("class", "map")
                            .attr("fill", "#CD0046")
                            .attr("d", d3.geoPath()          //Creating a geographic path and sets the current projection
                                        //The projection will be used for converting the coordinates of the countries into pixels
                                            .projection(mapProjection)                                  //(Holtz, 2022)
                            )
                            .style("opacity", 0.75)           //Setting the opacity of the svg     
                            .on("click", onClick)

            function onClick(d, i){
                cl++
                getCountryBAR(i.properties.name)
                getCountryLINE(i.properties.name)
                getCountrySCATTER(i.properties.name)
                
                d3.select(this)
                    .transition()
                    .duration(100)
                    .attr("fill", "#01949A")
                    .style("stroke", "black")
                
                    console.log(cl)
                if(cl >= 2){
                  d3.selectAll(".map")
                    .transition()
                    .duration(100)
                    .attr("fill", "#CD0046")
                    .style("stroke", "transparent")
                    
                    cl=0
                }
            }

            var circles = svg.append("g")
                            .selectAll("circle")
                            .data(listOfCountryMAP.sort(function(a,b){
                                return b.total_cases - a.total_cases
                            }))
                            .enter()
                            .append("circle")
                            .attr("r", function(d){
                                for(var j = 0; j < data.features.length; j++){
                                    if(d.location == data.features[j].properties.name){
                                        return rad(d.total_cases)
                                    }
                                }
                            })
                            .style("fill", "blue")
                            .attr("fill-opacity", .4)
                            .attr("cx", function(d, i){
                                for(var j = 0; j < data.features.length; j++){
                                    if(d.location == data.features[j].properties.name){
                                        if(data.features[j].geometry.coordinates[0][0].length > 2){
                                            return mapProjection(data.features[j].geometry.coordinates[0][0][4])[0]        //(Holtz, 2022)
                                        }
                                        else{
                                            return mapProjection(data.features[j].geometry.coordinates[0][4])[0]           //(Holtz, 2022)
                                        }
                                    }
                                }
                            })
                            .attr("cy", function(d, i){
                                for(var j = 0; j < data.features.length; j++){
                                    if(d.location == data.features[j].properties.name){
                                        if(data.features[j].geometry.coordinates[0][0].length > 2){
                                            return mapProjection(data.features[j].geometry.coordinates[0][0][4])[1]        //(Holtz, 2022)
                                        }
                                        else{
                                            return mapProjection(data.features[j].geometry.coordinates[0][4])[1]          //(Holtz, 2022)
                                        }
                                    }
                                }
                            })


        })
    })
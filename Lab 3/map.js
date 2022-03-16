//REFERENCES - 

// 1) Holtz, Y. (2022). Bubblemap template for d3.js. [online] D3-graph-gallery.com. 
//    Available at: https://www.d3-graph-gallery.com/graph/bubblemap_template.html

// 2) Holtz, Y. (2022). Basic background map in d3.js. [online] D3-graph-gallery.com. 
//    Available at: https://www.d3-graph-gallery.com/graph/backgroundmap_basic.html




//Defining the dimensions and margins of the map
const margin = {top: 30, right: 30, bottom: 70, left: 155};
const widthSVG = 1060 - margin.left - margin.right;
const heightSVG = 750 - margin.top - margin.bottom;


//Initializing an empty array to store the data extracted from the csv file
var asiaArrMAP = [];

    //As the date in the csv file is represented in the format - "YYYY-MM-DD", 
    //we create a format function to convert the dates from string to "Date" object type
    var	parseDate = d3.timeParse("%Y-%m-%d");            //(Ordonez, 2020)


    //The below function is used for converting each of the csv column data to their original type
    //The column containing string data, are left as it is
    //The function returns a dictionary array, containing key-value pairs from the csv file
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


    //Loading the csv file
    d3.csv("data/asia.csv", function(d, i){

        //Using the function to convert each of the data read, to their respective data type
        //The returned dictionary is push to the empty array initialized above
        asiaArrMAP.push(strNumDateObjArr(d))
    }).then(function(datas){


        //Creating an svg for the map
        var svg = d3.select('body')
                    .append("svg")
                    .attr("class","map")
                    .attr("transform", "translate(10, 20)")
                    .attr("width", widthSVG + margin.left + margin.right)
                    .attr("height", heightSVG + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform",
                    "translate(" + 0 + "," + 10 + ")");

        
        //The below code is used for building the projection of the map
        //This projection will be used for converting each of the countries coordinates
        //to pixels so that the map can be displayed on the SVG
        var mapProjection = d3.geoMercator()                    //(Holtz, 2022)
                            .scale(185)
                            .center([21,37])
                            .translate([0, 100])

        //The JSON file (available on https://www.d3-graph-gallery.com/ ) which consists of the data required for drawing the map, is hosted on GitHub
        //Storing the path of the GitHub file in a variable
        let mapJSON = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";     //(Holtz, 2022)


        //Loading the JSON file
        d3.json(mapJSON).then(function(data){
        
            //As we will be only dealing with Asian countries, the filter() function is used for
            //filtering out each of the Asian countries
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

            
            //Since we will only be dealing with the data recorded for December 31st, 2020, the filter()
            //function is used here, that uses another function filterTheData() to extract the required values based on a condition
            //This data will be used for generating the bubbles that appear on the map
            var listOfCountryMAP = asiaArrMAP.filter(filterTheData)

            //Initializing an empty variable to store the last date of the year
            var lastDayofYearMAP;

            //The below function is used for returning the filtered data
            function filterTheData(d){ 

                //Getting the last day of the year
                //An anaonymous function is defined that returns the last day of the year, based on the input given
                //Since 31st December serves as the last day of the year, the "Day" is set as 31, "Month" is set as 11 (The month numbering starts from 0, 
                //Jan is labelled as 0, Feb is 1, and so on)
                //The year is extracted from the input with the help of getFullYear() function
                lastDayofYearMAP = function(d){
                    return new Date(d.getFullYear(), 11, 31)            //(Bobbyhadz.com, 2021)
                }

                //Checking if the current Date object that the function is reading is 31st Decemeber 2020
                if((d.date.getTime() == lastDayofYearMAP(d.date).getTime()) && (d.date.getFullYear() == 2020)){
                    return d
                }
            }

            //Setting the domain for the bubbles
            //The radius will be set according to the domain and range 
            //Using D3's extenet() functiomn to return the min and max value of the "total_cases"    
            const setDomain = d3.extent(listOfCountryMAP, function(d){
                return d.total_cases              //(Holtz, 2022)
            })

            //Setting the scale for the bubbles's sizes
            //The radius will be set according to the size given below
            const rad = d3.scaleSqrt()
                            .domain(setDomain)
                            .range([1, 50])              //(Holtz, 2022)


            //The below code is used for drawing the map
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
                            .on("click", onClick)      //Listening for click events

            //This function deals with click events
            function onClick(d, i){

                //The name of the country that is clicked on the map is sent to the three below global functions
                //so that the three graphs can be drawn accordingly
                getCountryBAR(i.properties.name)
                getCountryLINE(i.properties.name)
                getCountrySCATTER(i.properties.name)
                
                //On clicking on a country, it turns teal in color, and a black outline appears around it
                d3.select(this)
                    .transition()
                    .duration(100)
                    .attr("fill", "#01949A")
                    .style("stroke", "black")
            }

            //The below code is used for genearting the bubbles that appear on the map
            var circles = svg.append("g")
                            .selectAll("circle")
                            //Sorting out the countries based on the "total_cases" value
                            //This is done so that we can see which countries have the highest number of cases and which have the least
                            .data(listOfCountryMAP.sort(function(a,b){
                                return b.total_cases - a.total_cases
                            }))
                            .enter()
                            .append("circle")        //Adding the SVG circle element
                            .attr("r", function(d){
                                for(var j = 0; j < data.features.length; j++){
                                    //Checking if the current country is present in the map coordinates dataset
                                    if(d.location == data.features[j].properties.name){
                                        return rad(d.total_cases)          //Set the radius of the bubble accordingly
                                    }
                                }
                            })
                            .style("fill", "blue")
                            .attr("fill-opacity", .4)
                            .attr("cx", function(d, i){
                                for(var j = 0; j < data.features.length; j++){
                                    //Checking if the current country is present in the map coordinates dataset
                                    if(d.location == data.features[j].properties.name){
                                        //Checking if the coordinates of the country array is greater than 2
                                        //This is done because some of the coordinates array length is greater than 2
                                        if(data.features[j].geometry.coordinates[0][0].length > 2){
                                            //Return the coordinates
                                            //This will serve as the x-coordinate of the circle
                                            return mapProjection(data.features[j].geometry.coordinates[0][0][4])[0]        //(Holtz, 2022)
                                        }
                                        else{
                                            //Else if the coordinates array has a length less than 2
                                            //Return the coordinates now
                                            //This will serve as the x-coordinate of the circle
                                            return mapProjection(data.features[j].geometry.coordinates[0][4])[0]           //(Holtz, 2022)
                                        }
                                    }
                                }
                            })
                            .attr("cy", function(d, i){
                                for(var j = 0; j < data.features.length; j++){
                                    //Checking if the current country is present in the map coordinates dataset
                                    if(d.location == data.features[j].properties.name){
                                        //Checking if the coordinates of the country array is greater than 2
                                        //This is done because some of the coordinates array length is greater than 2
                                        if(data.features[j].geometry.coordinates[0][0].length > 2){
                                            //Return the coordinates
                                            //This will serve as the y-coordinate of the circle
                                            return mapProjection(data.features[j].geometry.coordinates[0][0][4])[1]        //(Holtz, 2022)
                                        }
                                        else{
                                            //Else if the coordinates array has a length less than 2
                                            //Return the coordinates now
                                            //This will serve as the y-coordinate of the circle
                                            return mapProjection(data.features[j].geometry.coordinates[0][4])[1]          //(Holtz, 2022)
                                        }
                                    }
                                }
                            })


        })
    })
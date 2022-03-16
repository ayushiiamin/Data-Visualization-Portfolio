// REFERENCES - 

// 1) Bobbyhadz.com. (2021). Get the Last Day of the Year in JavaScript | bobbyhadz. [online] 
//    Available at: https://bobbyhadz.com/blog/javascript-get-last-day-of-year#:~:text=To%20get%20the%20last%20day,last%20day%20of%20the%20year.&text=Copied! 

// 2) Schmidt, K. (2019). Show data on mouse-over with d3.js - KJ Schmidt - Medium. [online] Medium. 
//    Available at: https://medium.com/@kj_schmidt/show-data-on-mouse-over-with-d3-js-3bf598ff8fc2
    
// 3) ozil (2017). Equivalent method of “.getComputedTextLength()” in d3.js. Stack Overflow. [online] 
//    Available at: https://stackoverflow.com/questions/42718803/equivalent-method-of-getcomputedtextlength-in-d3-js

// 4) Volochkov (2019). d3 text directly on mouse pointer. Stack Overflow. [online]
//    Available at: https://stackoverflow.com/questions/57644512/d3-text-directly-on-mouse-pointer

// 5) W3schools.com. (2022). JavaScript Array sort() Method. [online] 
//    Available at: https://www.w3schools.com/jsref/jsref_sort.asp

// 6) Bobbyhadz.com. (2021). Get the first N elements from an Array in JavaScript | bobbyhadz. [online] 
//    Available at: https://bobbyhadz.com/blog/javascript-get-first-n-elements-of-array#:~:text=To%20get%20the%20first%20N,elements%20of%20the%20original%20array

// 7) Ocks.org. (2022). Basic US State Map - D3. [online] 
//    Available at: http://bl.ocks.org/michellechandra/0b2ce4923dc9b5809922

// 8) Holtz, Y. (2022). Building legends in d3.js. [online] D3-graph-gallery.com. 
//     Available at: https://www.d3-graph-gallery.com/graph/custom_legend.html



//Setting the dimensions
var widthPIE = 460;
var heightPIE = 300;

//Initializing an empty array to store the data extracted from the csv file
var asiaArrPIE = [];

//As the date in the csv file is represented in the format - "YYYY-MM-DD", 
//we create a format function to convert the dates from string to "Date" object type
var	parseDate = d3.timeParse("%Y-%m-%d");            //(Ordonez, 2020)

//The below function is used for converting each of the csv column data to their original type
//The column containing string data, are left as it is
//The function returns a dictionary array, containing key-value pairs from the csv file
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


//Loading the csv file
d3.csv("data/asia.csv", function(d, i){

    //Using the function to convert each of the data read, to their respective data type
    //The returned dictionary is push to the empty array initialized above
    asiaArrPIE.push(dateToOriginalType(d))
}).then(function(data){

    //Creating the SVG with a width and height of 360 and 290 respectively
    var svgPIE = d3.select("body")
                    .append("svg")
                    .attr("class","pie")
                    .attr("width", widthPIE - 90)
                    .attr("height", heightPIE - 110)
                    .attr("transform", "translate(20, 0)")
                    .append("g")
                    .attr("transform", "translate(" + (widthPIE-240) + "," + (heightPIE-180) + ")")


    //Initializing the radius of the arcs
    //This is calculated by taking the minimum of the width and height defined above
    //After taking the minimum value of both, we divide the output by 2
    var radius = Math.min(widthPIE, heightPIE)/2;

    //Defining an ordinal scale of colors (6 colors are present)
    var color = d3.scaleOrdinal().range(["#01949A", "#CD0046", "#CDF4DC", "#130170", "#FEC437", "#B175FF"]);
    
    //Creating a group container
    var grTip = svgPIE.append("g")

    //Generating the pie
    //This will also help in calculating the start and end angle for each of the arcs
    var pie = d3.pie()
                .sort(null)

    //Generating the arcs
    //Inner radius is not 0 here, as we want to display a donut chart
    var arc = d3.arc()
                .innerRadius(radius - 100)
                .outerRadius(radius - 50);   


    //Since we will only be dealing with the data recorded for December 31st, 2020, the filter()
    //function is used here, that uses another function getReqData() to extract the required values based on a condition
    var listOfCountryPIE = asiaArrPIE.filter(getReqData)

    //Initializing an empty variable to store the last date of the year
    var lastDayofYearPIE;
    
    //The below function is used for returning the filtered data
    function getReqData(d){ 

        //Getting the last day of the year
        //An anaonymous function is defined that returns the last day of the year, based on the input given
        //Since 31st December serves as the last day of the year, the "Day" is set as 31, "Month" is set as 11 (The month numbering starts from 0, 
        //Jan is labelled as 0, Feb is 1, and so on)
        //The year is extracted from the input with the help of getFullYear() function
        lastDayofYearPIE = function(d){
                return new Date(d.getFullYear(), 11, 31)            //(Bobbyhadz.com, 2021)
        }
        
        //Checking if the current Date object that the function is reading is 31st Decemeber 2020
        if((d.date.getTime() == lastDayofYearPIE(d.date).getTime()) && (d.date.getFullYear() == 2020)){
            return d
        }
    }

                
    function showPie(data){

        //Initailizng empty arrays for storing particular data
        var reqValuesPIE = []
        var tempArr = []
        var reqCountriesPIE = []


        //The below loop iterates over the input data,
        //extracts the values present under the "total_deaths" key
        //and appends these values to an array
        for (var i = 0; i<data.length; i++){
            tempArr.push(data[i].total_deaths)
        }

        //Sorting the values in descending order to find out which value is the greatest
        tempArr.sort(function(a, b){        //(W3schools.com, 2022)
            return b - a;
        })

        //Since the pie chart only displays the 6 countries with the highest death rates, we extract only the 
        //first 6 values of the sorted array
        reqValuesPIE = tempArr.slice(0, 6)           //(Bobbyhadz.com, 2021)


        //Filtering out only the values which that have the 6 countries with the highest death rates' data values
        var newDataPIE = data.filter(pieFunc)
                function pieFunc(dat){  
                    
                    //Checking to see if the current "total_deaths" value that is been read, is present
                    //in the array defined above
                    return (reqValuesPIE.includes(dat.total_deaths))       
                }
        
        //Soring out the newly extracted values in descending order
        newDataPIE.sort(function(a, b){                          //(W3schools.com, 2022)
                    return b.total_deaths - a.total_deaths
            })
            
            //Adding all the countries present in the newly defined array
            for(var i = 0; i<newDataPIE.length; i++){
                reqCountriesPIE.push(newDataPIE[i].location)
            }

            //Creating the legend for the pie chart
            var legend = grTip.selectAll("legendDotsPIE")
                                .data(reqCountriesPIE)

                //Adding the markers of the legend
               legend.enter()
                    .append("circle")
                    .merge(legend)
                    .attr("class", "legendDotsPIE")
                    .attr("cx", 150)
                    .attr("cy", function(d,i){        //Adding a space of 18 between each of the legend markers
                        return 3 + i*18              //(Holtz, 2022)
                    }) 
                    .attr("r", 7)
                    .style("fill", function(d){ 
                        return color(d)        //The colors are set according to the ordinal color scale defined above
                    })
                
                //Adding the labels of the legend
                grTip.selectAll("legendLabelsPIE")
                        .data(reqCountriesPIE)
                        .enter()
                        .append("text")
                        .attr("font-size", "13px")
                        .attr("x", 160)
                        .attr("y", function(d,i){           //Adding a space of 18 between each of the legend labels
                            return 3 + i*18            //(Holtz, 2022)
                        }) 
                        .attr("fill", "black")
                        .text(function(d){ 
                            return d                 //The 6 country names present in the reqCountriesPIE array is the text that appears as the labels
                        })
                        .attr("text-anchor", "left")
                        .style("alignment-baseline", "middle")         //(Holtz, 2022)
           
        
        //Generating the groups
        //The start and end angles of each of the arcs will also be calculated using the pie (created above)                
        var path = grTip.selectAll("path")
                       .data(pie(reqValuesPIE))
        
        //Drawing arc paths
        path.enter()
            .append("path")
            .merge(path)
            .on("mouseover", onMouseOver)         //Listening for mouseover events
            .on("mouseout", onMouseOut)           //Listening for mouseout events
            .transition()
            .duration(1000) 
            .attr("fill", function(d, i){
                return color(i);           //Using the ordinal scale of colors defined above, we have colored each of the wedges       
            })
            .attr("d", arc)
            .attrTween("d", function(d){

                //The interpolate function uses the start and end angle of the arcs to 
                //spin each of the pie chart segments
                var i = d3.interpolate(d.endAngle, d.startAngle);
                            return function (t){
                                d.startAngle = i(t);
                                return arc(d);
                            }
                })
        
        //Setting the tooltip for the box which appears behind the text 
        var tooltipRect = grTip.append("rect")
                                .style("position", "absolute")
                                //Setting the visibility originally to be hidden
                                .style("visibility", "hidden")
                                .attr("fill", "#5428AB")
        
        //Setting the tooltip for the text
        var tooltip = grTip.append("text")
                            .attr("class", "pietext")
                            .style("position", "absolute")
                            //Setting the visibility originally to be hidden
                            .style("visibility", "hidden")
                            .attr("fill", "#FFE32A")
                            .attr("font-size", "10px")
        

        //This function deals with mouseover events        
        function onMouseOver(event, d, i){
            d3.select(this).transition()
               .duration(50)
               //When hovering over any of the wedges, it becomes opaque
               .attr("opacity", ".85")            //(Schmidt, 2019)

            //Now set the text tooltip's visibility to be "visibile"
            //so that it appears on the screen
            tooltip.style("visibility", "visible")
                    //Set the x and y coordinates based on the position of the pointer
                    .attr("x", d3.pointer(event)[0])     //(Volochkov, 2019)
                    .attr("y", d3.pointer(event)[1])     //(Volochkov, 2019)
                    .text(function(){
                        return d.value      //When the mouse hovers over the wedge, display its value
                    })
            
            //Now set the box tooltip's visibility to be "visibile"
            //so that it appears on the screen
            tooltipRect.style("visibility", "visible")
                    //Set the x and y coordinates based on the position of the pointers
                    .attr("x", d3.pointer(event)[0])     //(Volochkov, 2019)
                    .attr("y", d3.pointer(event)[1] - 10)     //(Volochkov, 2019)
                    .attr("width", function(){ 
                        
                        //Adjust the width of the box, based on the length of the text
                        return (d3.select(".pietext").node().getComputedTextLength())   //(ozil, 2017)
                    })
                    .attr("height", 15)
        }

        //This function deals with mouseout events
        function onMouseOut(event, d, i){
            d3.select(this)
               .transition()
               .duration(50)
               //After the mouse moves away from the wedge, set the opacity back to 1
               .attr("opacity", "1");       //(Schmidt, 2019)

            //When the mouse moves away from the wedge, the text box disappears
            tooltip.style("visibility", "hidden")
            tooltipRect.style("visibility", "hidden")
        }


        
        //Removing the current element as the data gets updated    
        path.exit().remove();


    }

    //Pass the filtered dataset to teh function, so that the pie chart can be drawn accordingly
    showPie(listOfCountryPIE)
})
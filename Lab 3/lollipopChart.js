//REFERENCES - 

// 1) W3schools.com. (2022). JavaScript Array sort() Method. [online] 
//    Available at: https://www.w3schools.com/jsref/jsref_sort.asp

// 2) Bobbyhadz.com. (2021). Get the first N elements from an Array in JavaScript | bobbyhadz. [online] 
//    Available at: https://bobbyhadz.com/blog/javascript-get-first-n-elements-of-array#:~:text=To%20get%20the%20first%20N,elements%20of%20the%20original%20array

// 3) Holtz, Y. (2022). Basic lollipop chart in d3.js. [online] D3-graph-gallery.com. 
//    Available at: https://www.d3-graph-gallery.com/graph/lollipop_basic.html

// 4) dedpo (2016). Selecting a section of data from CSV in d3.js. [online] Stack Overflow. 
//    Available at: https://stackoverflow.com/questions/36314656/selecting-a-section-of-data-from-csv-in-d3-js

// 5) Bobbyhadz.com. (2021). Get the Last Day of the Year in JavaScript | bobbyhadz. [online] 
//    Available at: https://bobbyhadz.com/blog/javascript-get-last-day-of-year#:~:text=To%20get%20the%20last%20day,last%20day%20of%20the%20year.&text=Copied!

// 6) GeeksforGeeks. (2019). Compare two dates using JavaScript - GeeksforGeeks. [online] 
//    Available at: https://www.geeksforgeeks.org/compare-two-dates-using-javascript/#:~:text=In%20JavaScript%2C%20we%20can%20compare,we%20can%20directly%20compare%20them

// 7) Holtz, Y. (2022). Update X axis limits in d3.js scatterplot. D3-graph-gallery.com. [online] 
//    Available at: https://www.d3-graph-gallery.com/graph/scatter_buttonXlim.html

// 8) W3schools.com. (2015). JavaScript String includes() Method. [online] 
//    Available at: https://www.w3schools.com/jsref/jsref_includes.asp

// 9) Ordonez, T. (2020). D3 Convert String to Date. [online] Tom Ordonez. 
//    Available at: https://www.tomordonez.com/d3-convert-string-to-date/


//Setting the dimensions
const marginLOLLIPOP = {top: 10, right: 30, bottom: 40, left: 155};
const widthLOLLIPOP = 400 - marginLOLLIPOP.left - marginLOLLIPOP.right;
const heightLOLLIPOP = 300 - marginLOLLIPOP.top - marginLOLLIPOP.bottom;


//Initializing an empty array to store the data extracted from the csv file
var asiaArrLOLLIPOP = [];


//As the date in the csv file is represented in the format - "YYYY-MM-DD", 
//we create a format function to convert the dates from string to "Date" object type
var	parseDate = d3.timeParse("%Y-%m-%d");            //(Ordonez, 2020)


    //The below function is used for converting each of the csv column data to their original type
    //The column containing string data, are left as it is
    //The function returns a dictionary array, containing key-value pairs from the csv file
    function convertToOriginalFunc(d) {
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
        asiaArrLOLLIPOP.push(convertToOriginalFunc(d))
    }).then(function(data){

        //Creating the SVG with a width and height of 393 and 290 respectively
        var svgLOLLIPOP = d3.select('body')
                            .append("svg")
                            .attr("class","lollipop")
                            .attr("width", widthLOLLIPOP + marginLOLLIPOP.left + marginLOLLIPOP.right - 7)
                            .attr("height", heightLOLLIPOP + marginLOLLIPOP.top + marginLOLLIPOP.bottom - 10)
                            .attr("transform", "translate(10, 10)")

        //Creating a group container
        var gLOLLIPOP = svgLOLLIPOP.selectAll("g")
                                    .data(asiaArrLOLLIPOP)
                                    .enter()
                                    .append("g")
                                    .attr("transform", function(d, i) {
                                        return "translate(" + (marginLOLLIPOP.left+10) + "," + marginLOLLIPOP.top + ")";
                                    })
        
        //To the above created group container, we append and SVG text element
        //This SVG text element serves as the heading for the lollipop chart
        gLOLLIPOP.append("text")
                 .attr("x", 10)
                 .attr("y", 40)
                 .attr("font-size", "20px")
                 .attr("font-family", "sans-serif")
                 .text("Highest 6 infected countries")                   
        

        //Defining the x-axis for the lollipop chart
        var x = d3.scaleBand()
                   .range([0, widthLOLLIPOP])
                   .padding(1);          //Adding a padding of 1 between the lollipo lines, so that the chart elements aren't too close to each other
        
        //Creating a horizontal bottom x-axis using the data generated for the x-axis above
        var xBottomAxis = d3.axisBottom()
                            .scale(x)
        
        //Adding the bottom x-axis to the svg
        var x_bottom = svgLOLLIPOP.append("g")
                                    .attr("class", "xaxisLOLLIPOP")
                                    .attr("transform", "translate(100," + (heightLOLLIPOP+50) + ")")
                                    .call(xBottomAxis)  
        
        //Defining the y-axis for the lollipop chart
        var y = d3.scaleLinear()
                   .range([heightLOLLIPOP, 0])          
        

        //Creating a vertical left y-axis using the data generated for the y-axis above        
        var yLeftAxis = d3.axisLeft()
                          .scale(y)
        
        //Adding the left y-axis to the svg        
        var y_left = svgLOLLIPOP.append("g")
                                .attr("class", "myYaxisLOLLIPOP")
                                .attr("transform", "translate(" + (widthLOLLIPOP-115) + ", 50)")
                                .call(yLeftAxis);

        
        //Since we will only be dealing with the data recorded for December 31st, 2020, the filter()
        //function is used here, that uses another function getData() to extract the required values based on a condition
        var filteredArr = asiaArrLOLLIPOP.filter(getData)    //(dedpo, 2016)

        //Initializing an empty variable to store the last date of the year
        var lastDayofYearLOLLIPOP;
        
        //The below function is used for returning the filtered data
        function getData(d){

            //Getting the last day of the year
            //An anaonymous function is defined that returns the last day of the year, based on the input given
            //Since 31st December serves as the last day of the year, the "Day" is set as 31, "Month" is set as 11 (The month numbering starts from 0, 
            //Jan is labelled as 0, Feb is 1, and so on)
            //The year is extracted from the input with the help of getFullYear() function
            lastDayofYearLOLLIPOP = function(d){
                return new Date(d.getFullYear(), 11, 31)            //(Bobbyhadz.com, 2021)
            }

            //Checking if the current Date object that the function is reading is 31st Decemeber 2020
            if((d.date.getTime() == lastDayofYearLOLLIPOP(d.date).getTime()) && (d.date.getFullYear() == 2020)){          //(GeeksforGeeks, 2019)
                return d
            }
        }

        //The below function is used for updating x-axis values dynamically
        function axes(data){

            //The domain is set according the current location being read from the input data
            x.domain(data.map(function(d) {            //(Holtz, 2022)
                return d.location;              
            }))

            //Update the bottom x-axis accordingly
            xBottomAxis = d3.axisBottom()
                            .scale(x)

            //Smoothly transform the updated bottom x-axis
            x_bottom.transition()                  //(Holtz, 2022)
                    .duration(900)
                    .call(xBottomAxis)    
        }

        //The below function is used for updating y-axis values dynamically
        function updateYAxis(data){
            
            //The domain is set according to the min and max values present in the input
            //data fed to this function
            //The values on the y-axis will are present between the min and max values of the input
            //data
            y.domain(           
                [d3.min(data), d3.max(data)]
            )
            
            //Update the y-axis accordingly
            yLeftAxis = d3.axisLeft()
                            .scale(y)
            
            //Smoothly transform the updated y-axis
            y_left.transition()                  
                    .duration(900)
                    .call(yLeftAxis)
        }

        //The below function generates the lollipo chart based on teh data provided as input to the function
        function drawChartLollipop(data){
            
            //Initailizng empty sets and arrays for storing particular data
            var highCaseNumSetLOLLIPOP = new Set()
            var reqCountriesLOLLIPOP = []
            var reqValuesLOLLIPOP = []
            var toSortValues = []

            //The below loop iterates over the input data,
            //extracts the values present under the "total_cases" key
            //and appends these values to an array
            for (var i = 0; i<data.length; i++){
                toSortValues.push(data[i].total_cases)
            }

            //Sorting the values in descending order to find out which value is the greatest
            toSortValues.sort(function(a, b){        //(W3schools.com, 2022)
                return b - a;
            })

            //Since the lollipop chart only displays the Highest 6 infected countries, we extract only the 
            //first 6 values of the sorted array
            reqValuesLOLLIPOP = toSortValues.slice(0, 6)           //(Bobbyhadz.com, 2021)


            //Filtering out only the values which that have the six infected countries' data values
            var newDataLOLLIPOP = data.filter(lollipopFunc)
                function lollipopFunc(dat){  
                    
                    //Checking to see if the current "total_cases" value that is been read, is present
                    //in the array defined above
                    return (reqValuesLOLLIPOP.includes(dat.total_cases))    //(W3schools.com, 2015)   
                }
            
            //Soring out the newly extracted values in descending order
            newDataLOLLIPOP.sort(function(a, b){         //(W3schools.com, 2022)
                return b.total_cases - a.total_cases
            })

            //Adding the each of the 6 "total_cases" values to the empty set
            //This empty set will be sent to the updateYAxis() function - Function to update the y-axis
            //values dynamically
            for(var i = 0; i<newDataLOLLIPOP.length; i++){
                highCaseNumSetLOLLIPOP.add(newDataLOLLIPOP[i].total_cases)
            }

            //Call the function to update the x-axis values accordingly
            axes(newDataLOLLIPOP)

            //Call the function to update the y-axis values accordingly
            updateYAxis(highCaseNumSetLOLLIPOP)


            //Creating the lollipop chart based on the dataset provided
            var z = svgLOLLIPOP.selectAll(".lollipopLine")
                                .data(newDataLOLLIPOP)

                z.enter()
                   .append("line")
                   .attr("class", "lollipopLine")
                   .merge(z)
                   .transition()    //Using a transition, so that the lines appear smoothly                        
                   .duration(900)
                   .attr("stroke", "grey")
                   .attr("x1", function(d) { 

                        //Setting the x1-coordinate of the line based on the current location
                        return x(d.location) + 100;      
                    })
                    .attr("x2", function(d) { 

                        //Setting the x2-coordinate of the line based on the current location
                        return x(d.location) + 100; 
                    })
                    .attr("y1", function(d) { 

                        //Setting the x1-coordinate of the line based on the current "total_cases" value
                        return y(d.total_cases) + 36; 
                    })
                    //To the y, 0 is being sent here as we want the chart to appear vertically
                    .attr("y2", y(0) + 36)    //(Holtz, 2022)
            
                    
            //Creating the markers that appear on the top of the line
            var p = svgLOLLIPOP.selectAll(".marker")
                                .data(newDataLOLLIPOP)

                p.enter()
                    .append("circle")
                    .attr("class", "marker")
                    .merge(p)
                    .on("mouseover", mouseOverLolli)    //Listening for mouseover events
                    .on("mouseout", mouseOutLolli)      //Listening for mouseout events    
                    .transition()         //Using a transition, so that the markers appear smoothly  
                    .duration(900)
                    .attr("stroke", "black")
                    .style("fill", "#CD0046")
                    .attr("cx", function(d){

                        //Setting the x-coordinate of the markers
                        return x(d.location) + 100;
                    })
                    .attr("cy", function(d){

                        //Setting the x-coordinate of the markers
                        return y(d.total_cases) + 36;
                    })
                    .attr("r", 5)     //Setting teh radius of the markers

            
            //Function that deals with mouseover events
            function mouseOverLolli(d, i){
                d3.select(this)
                .transition()           //Adding the transition for the animation
                .duration(400)

                p.enter()
                    .append("text")             //Adding and SVG text element
                    .attr("class", "textShow")
                    .attr("x", function(){

                        //Setting the x-coordinate of the text element
                        return x(i.location) + 105;
                    })
                    .attr("y", function(){

                        //Setting the y-coordinate of the text element
                        return y(i.total_cases) + 36;
                    })
                    .attr("font-size", "10px")
                    .text(function(){

                        //When the mouse hovers over the markers, the value i.e, the current value's "total_cases" is displayed 
                        //on the right side of the marker
                        return i.total_cases             
                    })
            }

            //Function that deals with mouseout events
            function mouseOutLolli(d, i){
                d3.select(this)
                .transition()           //Adding the transition for the animation
                .duration(400)

                //Remove the SVG text element (appears when mousing over the marker) present next to each of the markers
                d3.selectAll(".textShow")
                    .remove()
            }
        }

        //Pass the filtered dataset to teh function, so that the lollipop chart can be drawn accordingly
        drawChartLollipop(filteredArr)
    })
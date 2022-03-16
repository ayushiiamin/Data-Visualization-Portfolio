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

// 11) Holtz, Y. (2022). Update X axis limits in d3.js scatterplot. D3-graph-gallery.com. [online] 
//    Available at: https://www.d3-graph-gallery.com/graph/scatter_buttonXlim.html




    //Setting the dimensions
    const marginSCATTER = {top: 10, right: 30, bottom: 70, left: 155};
    const widthSCATTER = 400 - marginSCATTER.left - marginSCATTER.right;
    const heightSCATTER = 220 - marginSCATTER.top - marginSCATTER.bottom;

    //Initializing an empty array to store the data extracted from the csv file
    var asiaArrSCATTER = [];

    //As the date in the csv file is represented in the format - "YYYY-MM-DD", 
    //we create a format function to convert the dates from string to "Date" object type
    var	parseDate = d3.timeParse("%Y-%m-%d");            //(Ordonez, 2020)

    //The below function is used for converting each of the csv column data to their original type
    //The column containing string data, are left as it is
    //The function returns a dictionary array, containing key-value pairs from the csv file
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

    //Loading the csv file
    d3.csv("data/asia.csv", function(d, i){

        //Using the function to convert each of the data read, to their respective data type
        //The returned dictionary is push to the empty array initialized above
        asiaArrSCATTER.push(toOriginal(d))
    }).then(function(data){

        //Creating a list of the 12 months
        const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

        //Creating the SVG with a width and height of 393 and 290 respectively
        var svgSCATTER = d3.select('body')
                            .append("svg")
                            .attr("class","scatter")
                            .attr("width", widthSCATTER + marginSCATTER.left + marginSCATTER.right)
                            .attr("height", heightSCATTER + marginSCATTER.top + marginSCATTER.bottom)
                            .attr("transform", "translate(20, 20)")

        //Creating a group container
        var gSCATTER = svgSCATTER.selectAll("g")
                            .data(asiaArrSCATTER)
                            .enter()
                            .append("g")
                            .attr("transform", function(d, i) {
                                return "translate(" + marginSCATTER.left + "," + marginSCATTER.top + ")";
                            })
        
        //To the above created group container, we append and SVG text element
        //This SVG text element serves as the heading for the scatter plot
        gSCATTER.append("text")
                            .attr("x", 2)
                            .attr("y", 30)
                            .attr("font-size", "15px")
                            .attr("font-family", "sans-serif")
                            .text("Rise in cases and deaths")    
        
        //Counter to see the number of times the showScatter() function is called
        var cSCATTER = 0
        
        //Defining an ordinal scale of colors (2 colors are present)
        var color = d3.scaleOrdinal().range(["#01949A", "#CD0046"]);

        //Defining the x-axis for the scatter plot                     
        var x = d3.scaleBand()
                   .range([0, widthSCATTER])
                    .padding(0.1)         //Adding a padding of 0.1 between the markers, so that the markers aren't too close to each other       
        
        //Creating a horizontal bottom x-axis using the data generated for the x-axis above        
        var xBottomAxis = d3.axisBottom()
                            .scale(x)
        
        //Adding the bottom x-axis to the svg        
        var x_bottom = svgSCATTER.append("g")
                              .attr("class", "xaxisSCATTER")
                              .attr("transform", "translate(100," + (heightSCATTER+50) + ")")
                              .call(xBottomAxis)

        //Defining the y-axis for the scatter plot                    
        var y = d3.scaleLinear()
                  .range([heightSCATTER, 0])
        
        //Creating a vertical left y-axis using the data generated for the y-axis above
        var yLeftAxis = d3.axisLeft()
                           .scale(y)
        
        //Adding the left y-axis to the svg 
        var y_left = svgSCATTER.append("g")
                            .attr("class", "myYaxisSCATTER")
                            .attr("transform", "translate(" + (widthSCATTER-115) + ", 50)")
                            .call(yLeftAxis);
        
        //Creating a group container
        var gr = svgSCATTER.append("g")

        
        //Global function
        //Called in map.js
        //This function gets the name of the country that was clicked on the map                    
        window.getCountrySCATTER = function(country){

            //Storing the country name (that was clicked on) in an empty variable countryNameSCATTER
            var countryNameSCATTER;
            countryNameSCATTER = country;


        //The below function is used for updating x-axis values dynamically    
        function axes(data){

            //The domain is set according the current month being read from the input data
            x.domain(data.map(function(d) {            //(Holtz, 2022)
                return month[d.date.getMonth()];              //(W3schools.com, 2022)
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

        

        //The below function generates the scatter plot based on the data provided as input to the function
        function showScatter(data){

            //Creating an SVG circle element that serves as the button for filtering out the data
            //on the line chart
            svgSCATTER.append("circle")
                    .attr("cx", 400)
                    .attr("cy", 130)
                    .attr("fill", "#2D1674")
                    .attr("r", 32)
                    //On clicking the circle, call the global function onClickLINE() to filter
                    //out the data accordingly
                    //The global function is defined in lineChart.js
                    .on("click", onClickLINE)
            
            //Creating an SVG text element that serves as a label for the button 
            //that filters out data for the line chart       
            svgSCATTER.append("text")
                        .text("Filter Line Chart")
                        .attr("x", 400)
                        .attr("y", 130)
                        .attr("text-anchor", "middle")
                        .attr("font-size", "9px")
                        .attr("fill", "white")

            //Creating an SVG circle element that serves as the button for filtering out the data
            //on the bar chart
            svgSCATTER.append("circle")
                    .attr("cx", 400)
                    .attr("cy", 200)
                    .attr("fill", "#A998EE")
                    .attr("r", 32)
                    //On clicking the circle, call the global function onClickBAR() to filter
                    //out the data accordingly
                    //The global function is defined in barChart.js
                    .on("click", onClickBAR)
            
            //Creating an SVG text element that serves as a label for the button 
            //that filters out data for the bar chart  
            svgSCATTER.append("text")
                        .text("Filter Bar Chart")
                        .attr("x", 400)
                        .attr("y", 200)
                        .attr("text-anchor", "middle")
                        .attr("font-size", "10px")
                        .attr("fill", "#130170")


            //Defining a list of legend labels
            const legendData = ["Cases", "Deaths"]

            //Adding the markers of the legend
            svgSCATTER.selectAll("legendDots")
                        .data(legendData)
                        .enter()
                        .append("circle")
                        .attr("cx", 350)
                        .attr("cy", function(d,i){                 //Adding a space of 20 between each of the legend markers
                            return 40 + i*20              //(Holtz, 2022)
                        }) 
                        .attr("r", 7)
                        .style("fill", function(d){ 
                            return color(d)       //The colors are set according to the ordinal color scale defined above
                        })
            
            //Adding the labels of the legend
            svgSCATTER.selectAll("legendLabels")
                        .data(legendData)
                        .enter()
                        .append("text")
                        .attr("font-size", "13px")
                        .attr("x", 360)
                        .attr("y", function(d,i){                 //Adding a space of 20 between each of the legend labels 
                            return 41 + i*20            //(Holtz, 2022)
                        }) 
                        .attr("fill", "black")
                        .text(function(d){ 
                              return d                 //The data present in the legendData list is the text that appears as the labels
                        })
                        .attr("text-anchor", "left")
                        .style("alignment-baseline", "middle")         //(Holtz, 2022)
            
            //Counter to check how many times the function was called
            cSCATTER++
            
            //Call the function to update the x-axis values accordingly
            axes(data);

            //Initailizng empty sets and arrays for storing particular data
            var caseNumSetSCATTER1 = new Set()
            var reqMonthsSCATTER1 = []
            var reqValuesSCATTER1 = []

            //Variable to store the last dates of each month            
            var lastDateSCATTER;


            //The below code will be dealing with the "total_cases" values (the first scatter plot - represented by teal in color)



            //This loops iterates over the data provided            
            for(var i = 0; i<data.length; i++){

                //As we are printing the rise in the number of cases for each month, 
                //we extract the last day of each month
                lastDateSCATTER = function(d){

                    //The below generates a "Date" object for the provided month and year
                    return new Date(d.getFullYear(), d.getMonth() + 1, 0)                 //(w3resource, 2020)
                }

                //Checking if the current date that the function is reading is equal to the last day of the month
                if(data[i].date.getTime() == lastDateSCATTER(data[i].date).getTime()){           //(GeeksforGeeks, 2019)
                        //Append that date's month to the empty array defined above
                        reqMonthsSCATTER1.push(month[data[i].date.getMonth()])
                        //Append the "total_cases" to the empty array defined above
                        reqValuesSCATTER1.push(data[i].total_cases)
                        //Add the "total_cases" value to the set that is sent to the updateYAxis() function
                        caseNumSetSCATTER1.add(data[i].total_cases)
                }
            }

            //Call the function to update the y-axis values accordingly
            updateYAxis(caseNumSetSCATTER1)

            //Filtering out only the required values
            var newDataSCATTER1 = data.filter(chart1Func)
            function chart1Func(dat){
                if(dat.date.getTime() == lastDateSCATTER(dat.date).getTime()){          //(GeeksforGeeks, 2019)
                    //Checking to see if the current "total_cases" value that is been read, is present
                    //in the array defined above
                    return (reqValuesSCATTER1.includes(dat.total_cases))
                }   
            }

            //Creating the scatter plot based on the dataset provided
            var s1 = svgSCATTER.selectAll(".scatt1")
                                .data(newDataSCATTER1)

            
                        s1.enter()
                            .append("circle")
                            .attr("class","scatt1")
                            .merge(s1)
                            .on("mouseover", onMouseOverBAR)          //Listening for mouseover events
                            .on("mouseout", onMouseOutBAR)            //Listening for mouseout events
                            .transition()           
                            .duration(900)              //Using a transition, so that the markers appear smoothly
                            .attr("r", 3)
                            .attr("fill", function(d, i){

                                //Set the the markers color as the first value of the ordinal scale of colors, i.e., teal
                                return color(0);
                            })
                            .attr("cx", function(d) { 
                                
                                //Setting the x-ccordinate of the markers based on the current month that is been read
                                return x(month[d.date.getMonth()]) + 108; 
                            })
                            .attr("cy", function(d) { 

                                //setting the y-coordinate of the markers based on the current "total_cases" value
                                return y(d.total_cases)  + 50 ;
                            })
                            

            //The below code will be dealing with the "total_deaths" values (the second scatter plot - represented by pink in color)                

            //Initailizng empty arrays for storing particular data          
            var reqMonthsSCATTER2 = []
            var reqValuesSCATTER2 = []            
            

            //This loops iterates over the data provided
            for(var i = 0; i<data.length; i++){

                //As we are printing the rise in the number of deaths for each month, 
                //we extract the last day of each month
                lastDateSCATTER = function(d){
                    //The below generates a "Date" object for the provided month and year
                    return new Date(d.getFullYear(), d.getMonth() + 1, 0)           //(w3resource, 2020) 
                }

                //Checking if the current date that the function is reading is equal to the last day of the month
                if(data[i].date.getTime() == lastDateSCATTER(data[i].date).getTime()){         //(GeeksforGeeks, 2019)
                        //Append that date's month to the empty array defined above
                        reqMonthsSCATTER2.push(month[data[i].date.getMonth()])
                        //Append the "total_deaths" to the empty array defined above
                        reqValuesSCATTER2.push(data[i].total_deaths)
                }
            }

            //Filtering out only the required values
            var newDataSCATTER2 = data.filter(chart2Func)
            function chart2Func(dat){
                if(dat.date.getTime() == lastDateSCATTER(dat.date).getTime()){           //(GeeksforGeeks, 2019)
                    //Checking to see if the current "total_deaths" value that is been read, is present
                    //in the array defined above
                    return (reqValuesSCATTER2.includes(dat.total_deaths))
                }   
            }

            //Creating the scatter plot based on the dataset provided
            var s2 = svgSCATTER.selectAll(".scatt2")
                                .data(newDataSCATTER2)

                    s2.enter()
                        .append("circle")
                        .attr("class","scatt2")
                        .merge(s2)
                        .on("mouseover", onMouseOverLINE)         //Listening for mouseover events
                        .on("mouseout", onMouseOutLINE)           //Listening for mouseout events
                        .transition()           
                        .duration(900)            //Using a transition, so that the markers appear smoothly
                        .attr("r", 3)
                        .attr("fill", function(d, i){

                            //Set the the markers color as the second value of the ordinal scale of colors, i.e., pink
                            return color(1);
                        })
                        .attr("cx", function(d) { 
                            
                            //Setting the x-ccordinate of the markers based on the current month that is been read
                            return x(month[d.date.getMonth()]) + 108; 
                        })
                        .attr("cy", function(d) { 

                            //Setting the y-coordinate of the markers based on the current "total_deaths" value
                            return y(d.total_deaths)  + 50 ;
                        })
                        

            //If the showScatter() function is called 2 or more than 2 times, the function clearSCATTER() is called            
            if(cSCATTER >= 2){
                clearSCATTER()
            }

            //Clearing the markers
            s1.exit().remove()
            s2.exit().remove()
        }

        //The below function is used for clearing the markers, as soon as a new country
        //is clicked on
        //This is done so that the chart gets updated automatically with the new country's data
        function clearSCATTER(){

            //Select all the teal markers (belonging to scatt1 class)
            //and remove them - Done so that the next teal markers can appear
            d3.selectAll(".scatt1")
                .exit()
                .remove()

            //Select all the pink markers (belonging to scatt2 class)
            //and remove them - Done so that the next pink markers can appear
            d3.selectAll(".scatt2")
                .exit()
                .remove()
            
            //Reset the counter to 0
            cSCATTER=0
            showScatter(countryArrSCATTER)         //Again call the function for drawing the markers
        }

        //Variable that stores the data for the particular country that was clicked on
        var countryArrSCATTER = asiaArrSCATTER.filter(yearCountry)      //(dedpo, 2016)
        function yearCountry(d){
            //Filter out the data for that particular country that was clicked on
            //and only filter data for the year 2020
            return ((d.location == countryNameSCATTER) && (d.date.getFullYear() == 2020))   
        }

        //Pass the filtered dataset to the function, so that the scatter plot can be drawn accordingly
        showScatter(countryArrSCATTER)

    }
})
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
    
// 7) Plunkett, O. (2015). Using d3 - How do I select specific data from array to highlight when I click a button? [online] Stack Overflow. 
//    Available at: https://stackoverflow.com/questions/33241490/using-d3-how-do-i-select-specific-data-from-array-to-highlight-when-i-click-a

// 8) santoku (2018). How to filter elements and hide others? [online] Stack Overflow. 
//    Available at: https://stackoverflow.com/questions/49517904/how-to-filter-elements-and-hide-others

// 9) Saxena, U. (2017). Animating using D3 transitions vs using CSS animation. [online] Stack Overflow. 
//    Available at: https://stackoverflow.com/questions/46675499/animating-using-d3-transitions-vs-using-css-animation

// 10) Holtz, Y. (2022). Update X axis limits in d3.js scatterplot. [online] D3-graph-gallery.com. 
//     Available at: https://www.d3-graph-gallery.com/graph/scatter_buttonXlim.html
    
    
    
    
    
    //Setting the dimensions
    const marginLINE = {top: 10, right: 30, bottom: 70, left: 155};
    const widthLINE = 400 - marginLINE.left - marginLINE.right;
    const heightLINE = 220 - marginLINE.top - marginLINE.bottom;

    //Initializing an empty array to store the data extracted from the csv file
    var asiaArrLINE = [];

    //As the date in the csv file is represented in the format - "YYYY-MM-DD", 
    //we create a format function to convert the dates from string to "Date" object type
    var	parseDate = d3.timeParse("%Y-%m-%d");            //(Ordonez, 2020)


    //The below function is used for converting each of the csv column data to their original type
    //The column containing string data, are left as it is
    //The function returns a dictionary array, containing key-value pairs from the csv file
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
    
    //Loading the csv file
    d3.csv("data/asia.csv", function(d, i){
        
        //Using the function to convert each of the data read, to their respective data type
        //The returned dictionary is push to the empty array initialized above
        asiaArrLINE.push(strToOriginal(d))
    }).then(function(data){

        //Creating a list of the 12 months
        const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

        //Creating the SVG with a width and height of 393 and 290 respectively
        var svgLINE = d3.select('body')
                            .append("svg")
                            .attr("class","line")
                            .attr("width", widthLINE + marginLINE.left + marginLINE.right)
                            .attr("height", heightLINE + marginLINE.top + marginLINE.bottom)
                            .attr("transform", "translate(10, 20)")

        //Creating a group container
        var gLINE = svgLINE.selectAll("g")
                        .data(asiaArrLINE)
                        .enter()
                        .append("g")
                        .attr("transform", function(d, i) {
                            return "translate(" + marginLINE.left + "," + marginLINE.top + ")";
                        })

        //To the above created group container, we append and SVG text element
        //This SVG text element serves as the heading for the line chart                
        gLINE.append("text")
                        .attr("x", 2)
                        .attr("y", 30)
                        .attr("font-size", "15px")
                        .attr("font-family", "sans-serif")
                        .text("Rise in deaths")  

        //Counter to see the number of times the drawLine() function is called
        var cLINE = 0 
        //Counter to see the number of times the showDots() function is called
        var cDOT = 0 
        
        //Defining the x-axis for the line chart
        var x = d3.scaleBand()
                    .range([0, widthLINE])
                    .padding(0.1)              //Adding a padding of 0.1 between the ticks         

        //Creating a horizontal bottom x-axis using the data generated for the x-axis above
        var xBottomAxis = d3.axisBottom()
                                .scale(x)

        //Adding the bottom x-axis to the svg
        var x_bottom = svgLINE.append("g")
                                .attr("class", "xaxisLINE")
                                .attr("transform", "translate(100," + (heightLINE+50) + ")")
                                .call(xBottomAxis)                 
        
        //Defining the y-axis for the line chart
        var y = d3.scaleLinear()
                    .range([heightLINE, 0])
        
        //Creating a vertical left y-axis using the data generated for the y-axis above
        var yLeftAxis = d3.axisLeft()
                            .scale(y)
        
        //Adding the left y-axis to the svg 
        var y_left = svgLINE.append("g")
                                .attr("class", "myYaxisLINE")
                                .attr("transform", "translate(" + (widthLINE-115) + ", 50)")
                                .call(yLeftAxis);
        
        //Creating a group container
        var gr = svgLINE.append("g") 
        

        //The global function
        //This function is called in scatterPlot.js file
        //When the mouse hovers over any of the points in the scatt2 class,
        //the markers of the line chart become dark teal in color and become bigger                
        window.onMouseOverLINE = function(){
                    d3.selectAll(".point")
                        .transition()
                        .duration(900)
                        .attr("r", 5)
                        .attr("fill", "#004369")
        }

        //The global function
        //This function is called in scatterPlot.js file
        //When the mouse cursor moves away from the points in the scatt2 class,
        //the markers of the line chart return back to their original radius value and become back to pink in color  
        window.onMouseOutLINE = function(){
            // console.log("entered mouseout")
            d3.selectAll(".point")
                .transition()
                .duration(900)
                .attr("r", 3)
                .attr("fill", "#CD0046")
        }

        //Global function
        //Called by the "Filter Line Chart" circle in scatterPlot.js
        window.onClickLINE = function(){
            //The function removes the markers that dont have a value greater than 1,200
            d3.selectAll(".point")
                .filter(function(d){
                    return !(d.total_deaths > 1200)           
                })
                .remove()           //(santoku, 2018)
            
            //The function filters out the markers that have a "total_deaths" value greater than 1,200
            //These markers become bigger and turn pinkish purple in color
            d3.selectAll(".point")
                .filter(function(d){
                    return (d.total_deaths > 1200);     //(Plunkett, 2015)
                })
                .transition()
                .duration(1000)
                .attr("fill", "#713770")
                .attr("r", 5)
        }

        //Global function
        //Called in barChart.js
        window.whileMousingOver = function(){
            //Select all of the markers present on the line chart
            d3.selectAll(".point")
                .transition()
                .duration(1000)
                .attr("r", 5)         //Increase the radius to 5
                .attr("fill", "#2E765E")        //Change the marker color to green
                .transition()
                .duration(1000)
                .attr("r", 3)          //After 1 minute change the radius value back to 3
                .attr("fill", "#CD0046")            //Additionally, change the color back to pink
                //The below is done so that the transition is done infinitely
                //while the cursor is on one of the bars of the bar chart
                //This helps the line chart markers achieve a pulsing effect
                .on("end", whileMousingOver)           //(Saxena, 2017)

            //Select all of the markers present in scatt2 class
            d3.selectAll(".scatt2")
                .transition()
                .duration(1000)
                .attr("r", 5)            //Increase the radius to 5
                .attr("fill", "#0461B1")          //Change the marker color to blue
                .transition()
                .duration(1000)
                .attr("r", 3)             //After 1 minute change the radius value back to 3
                .attr("fill", "#CD0046")           //Additionally, change the color back to pink
                //The below is done so that the transition is done infinitely
                //while the cursor is on one of the bars of the bar chart
                //This helps the scatter plot markers achieve a pulsing effect
                .on("end", whileMousingOver)           //(Saxena, 2017)
        }

        //Global function
        //Called in barChart.js
        window.whileMousingOut = function(){
            //When the mouse moves away from the bars of the bar chart
            //Change the line chart markers back to their original color i.e., pink
            //and by doing this, the pulsing animation also stops and the radius returns back to its original value 3
            d3.selectAll(".point")
                .transition()
                .duration(1000)
                .attr("r", 3)
                .attr("fill", "#CD0046")

            //When the mouse moves away from the bars of the bar chart
            //Change the scatter plot markers back to their original color i.e., pink
            //and by doing this, the pulsing animation also stops and the radius returns back to its original value 3
            d3.selectAll(".scatt2")
                .transition()
                .duration(1000)
                .attr("r", 3)
                .attr("fill", "#CD0046")
        }


        //Global function
        //Called in map.js
        //This function gets the name of the country that was clicked on the map
        window.getCountryLINE = function(country){

            //Storing the country name (that was clicked on) in an empty variable countryNameLINE
            var countryNameLINE;
            countryNameLINE = country;   
                       
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

        //The below function generates the line chart based on the data provided as input to the function
        function drawLine(data){

            //Counter to check how many times the function was called
            cLINE++

            //Call the function to update the x-axis values accordingly
            axes(data);

            //Initailizng empty sets and arrays for storing particular data
            var deaNumSet = new Set()
            var reqMonths = []
            var reqValues1 = []

            //Variable to store the last dates of each month
            var lastDate;
            
            //This loops iterates over the data provided
            for(var i = 0; i<data.length; i++){

                //As we are printing the rise in the number of deaths for each month, 
                //we extract the last day of each month
                lastDate = function(d){
                    //The below generates a "Date" object for the provided month and year
                    return new Date(d.getFullYear(), d.getMonth() + 1, 0)
                }

                //Checking if the current date that the function is reading is equal to the last day of the month
                if(data[i].date.getTime() == lastDate(data[i].date).getTime()){
                        //Append that date's month to the empty array defined above
                        reqMonths.push(month[data[i].date.getMonth()])
                        //Append the "total_deaths" to the empty array defined above
                        reqValues1.push(data[i].total_deaths)
                        //Add the "total_deaths" value to the set that is sent to the updateYAxis() function
                        deaNumSet.add(data[i].total_deaths)
                }
            }

            //Call the function to update the y-axis values accordingly
            updateYAxis(deaNumSet)

            //Filtering out only the required values
            var newData1 = data.filter(chart1Func)
            function chart1Func(dat){
                if(dat.date.getTime() == lastDate(dat.date).getTime()){
                    //Checking to see if the current "total_deaths" value that is been read, is present
                    //in the array defined above
                    return (reqValues1.includes(dat.total_deaths))
                }   
            }

            //Creating the line chart based on the dataset provided
            var l = svgLINE.selectAll(".line")
                            .data([newData1]);

            l.enter()
              .append("path")
              .attr("class","line")
              .merge(l)
              .transition()        
              .duration(900)             //Setting a transition, so that the chart appears smoothly
              .attr("fill", "none")
              .attr("stroke", "#CD0046")            //Setting the color of the line as pink in color    
              .attr("stroke-width", 1.5)
              .attr("d", d3.line()
              .x(function(d){

                    //Setting the x-coordinate of the line based on the current month that is been read
                    return x(month[d.date.getMonth()]) + 108
                })
               .y(function(d){

                    //setting the y-coordinate of the line based on the current "total_deaths" value
                    return y(d.total_deaths) + 50   
                })
              )
            
            //If the drawLine() function is called 2 or more than 2 times, the function clearLINE() is called  
            if(cLINE >= 2){
                clearLINE()
            }

            //Calling the function which displays the markers
            showDots(newData1)

            //Clearing the lines
            l.exit().remove()
        }

        //This function is used to display the markers on the line chart
        function showDots(data){

            //Counter to check how many times the function was called
            cDOT++

            //Creating the markers based on the dataset provided
            var d = svgLINE.selectAll(".point")
                           .data(data)

            d.enter()
               .append("circle")
               .attr("class","point")
               .merge(d)
               .on("mouseover", whileMousingOverLINE)           //Listening for mouseover events
               .on("mouseout", whileMousingOutLINE)             //Listening for mouseout events
               .transition()           
               .duration(900)           //Using a transition, so that the markers appear smoothly
               .attr("cx", function(d){
                   
                   //Setting the x-coordinate of the markers based on the current month that is been read 
                   return x(month[d.date.getMonth()]) + 108; 
               })
               .attr("cy", function(d){

                   //Setting the y-coordinate of the markers based on the current "total_deaths" value
                   return y(d.total_deaths) + 50  
               })
               .attr("r", 3)            //Setting the radius of the marker              
               .attr("fill", "#CD0046")      //Setting the marker color to be pink
            
            
            //If the showDots() function is called 2 or more than 2 times, the function clearLINE() is called   
            if(cDOT >= 2){
                clearLINE()
            }

            //Clearing the markers
            d.exit().remove()
        }

        //The below function is used for clearing the line and markers, as soon as a new country
        //is clicked on
        //This is done so that the chart gets updated automatically with the new country's data
        function clearLINE(){

            //Select the lines in the line chart 
            //and remove them - Done so that the next lines can appear
            d3.selectAll(".line")
                .exit()
                .remove()

            //Select all the markers in the line chart 
            //and remove them - Done so that the next set of markers can appear
            d3.selectAll(".point")
                .exit()
                .remove()
            
            //Reset the counter to 0
            cLINE=0
            cDOT=0
            
            //Again call the function for drawing the line chart
            drawLine(countryArrLINE)
        }

        //Variable that stores the data for the particular country that was clicked on
        var countryArrLINE = asiaArrLINE.filter(yearCountry)      //(dedpo, 2016)

        function yearCountry(d){
            //Filter out the data for that particular country that was clicked on
            //and only filter data for the year 2020
            return ((d.location == countryNameLINE) && (d.date.getFullYear() == 2020))   
        }

        //Pass the filtered dataset to the function, so that the line chart can be drawn accordingly
        drawLine(countryArrLINE)

    }
})
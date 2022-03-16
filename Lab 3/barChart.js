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




    //Setting the dimensions
    const marginCHART = {top: 10, right: 30, bottom: 70, left: 155};
    const widthCHART = 400 - marginCHART.left - marginCHART.right;
    const heightCHART = 220 - marginCHART.top - marginCHART.bottom;

    //Initializing an empty array to store the data extracted from the csv file
    var asiaArr = [];

    //As the date in the csv file is represented in the format - "YYYY-MM-DD", 
    //we create a format function to convert the dates from string to "Date" object type
    var	parseDate = d3.timeParse("%Y-%m-%d");            //(Ordonez, 2020)


    //The below function is used for converting each of the csv column data to their original type
    //The column containing string data, are left as it is
    //The function returns a dictionary array, containing key-value pairs from the csv file
    function toNumDate(d) {
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
        asiaArr.push(toNumDate(d))
    }).then(function(data){

        //Creating a list of the 12 months
        const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

        //Creating the SVG with a width and height of 393 and 290 respectively
        var svgCHART = d3.select('body')
                            .append("svg")
                            .attr("class","bar")
                            .attr("width", widthCHART + marginCHART.left + marginCHART.right)
                            .attr("height", heightCHART + marginCHART.top + marginCHART.bottom)
                            .attr("transform", "translate(20, 20)")

        //Creating a group container
        var g = svgCHART.selectAll("g")
                        .data(asiaArr)
                        .enter()
                        .append("g")
                        .attr("transform", function(d, i) {
                            return "translate(" + marginCHART.left + "," + marginCHART.top + ")";
                        })
        
        //To the above created group container, we append and SVG text element
        //This SVG text element serves as the heading for the bar chart
        g.append("text")
                        .attr("x", 2)
                        .attr("y", 30)
                        .attr("font-size", "15px")
                        .attr("font-family", "sans-serif")
                        .text("Rise in cases")               
        

        //Counter to see the number of times the drawBar() function is called
        var cBar = 0                
                        
        //Defining the x-axis for the lollipop chart                
        var x = d3.scaleBand()
                    .range([0, widthCHART])
                    .padding(0.4)          //Adding a padding of 0.4 between the bars, so that the bar elements aren't too close to each other       

        //Creating a horizontal bottom x-axis using the data generated for the x-axis above
        var xBottomAxis = d3.axisBottom()
                                .scale(x)

        //Adding the bottom x-axis to the svg
        var x_bottom = svgCHART.append("g")
                                .attr("class", "xaxis")
                                .attr("transform", "translate(100," + (heightCHART+50) + ")")
                                .call(xBottomAxis)                 
        
        //Defining the y-axis for the lollipop chart
        var y = d3.scaleLinear()
                    .range([heightCHART, 0])
        
        //Creating a vertical left y-axis using the data generated for the y-axis above
        var yLeftAxis = d3.axisLeft()
                            .scale(y)
        
        //Adding the left y-axis to the svg 
        var y_left = svgCHART.append("g")
                                .attr("class", "myYaxis")
                                .attr("transform", "translate(" + (widthCHART-115) + ", 50)")
                                .call(yLeftAxis);
        
        //Creating a group container
        var gr = svgCHART.append("g")  
        
        //The global function
        //This function is called in scatterPlot.js file
        //When the mouse hovers over any of the points in the scatt1 class,
        //the bar of the bar chart become dark blue in color and become wider
        window.onMouseOverBAR = function(d, i){   
            
            d3.selectAll(".barRect")
                .transition()
                .duration(1000)
                .attr("fill", "#130170")
                .attr("width", x.bandwidth() + 5) 
            
        } 
        
        //The global function
        //This function is called in scatterPlot.js file
        //When the mouse cursor moves away from the points in the scatt1 class,
        //the bar of the bar chart return back to their original width and become back to teal in color  
    window.onMouseOutBAR = function(){
            
            d3.selectAll(".barRect")
                .transition()
                .duration(1000)
                .attr("fill", "#01949A")
                .attr("width", x.bandwidth()) 
        } 
    
    //Global function
    //Called by the "Filter Bar Chart" circle in scatterPlot.js
    window.onClickBAR = function(){
        //The function removes the bars that dont have a value greater than 50,000
        d3.selectAll(".barRect")
            .filter(function(d){
                return !(d.total_cases > 50000)           
            })
            .remove()           //(santoku, 2018)
        
        //The function filters out the bars that have a "total_cases" value graeter than 50,000
        //These bars become wider and turn light pink in color
        d3.selectAll(".barRect")
            .filter(function(d){
                return (d.total_cases > 50000);     //(Plunkett, 2015)
            })
            .transition()
            .duration(1000)
            .attr("fill", "#C15B78")
            .attr("width", x.bandwidth() + 5)
    }

    //Global function
    //Called in lineChart.js
    window.whileMousingOverLINE = function(){
        d3.selectAll(".barRect")
            .transition()
            .ease(d3.easeLinear)           //Adding the linear ease so a bliking lights effect comes on the bars
            .duration(1000)
            .attr("fill", "#533440")        //The bars turn brown in color
            .transition()
            .duration(1000)
            .attr("fill", "#01949A")         //After 1 min, the bars tunr back to teal in color
            //The below is done so that the transition is done infinitely
            //while the cursor is on one of the marks in the line chart
            .on("end", whileMousingOverLINE)           //(Saxena, 2017)

        //Select all of the markers present in scatt1 class
        d3.selectAll(".scatt1")
            .transition()
            .duration(1000)
            .attr("r", 5)           //Increase the radius to 5
            .attr("fill", "#FEE900")        //Change the marker color to yellow
            .transition()
            .duration(1000)
            .attr("r", 3)           //After 1 minute change the radius value back to 3
            .attr("fill", "#01949A")          //Additionally, change the color back to pink
            //The below is done so that the transition is done infinitely
            //while the cursor is on one of the marks in the line chart
            //This helps the markers achieve a pulsing effect
            .on("end", whileMousingOverLINE)           //(Saxena, 2017)
    }

    //Global function
    //Called in lineChart.js
    window.whileMousingOutLINE = function(){
        //When the mouse moves away from the markers of the line chart
        //Change the bars of the chart back to their original color i.e., teal
        d3.selectAll(".barRect")
            .transition()
            .duration(1000)
            .attr("fill", "#01949A")

        //When the mouse moves away from the markers of the line chart
        //Change the scatter chart dots back to their original color i.e., teal
        //and by doing this, the pulsing animation also stops and the radius returns back to its original value 3
        d3.selectAll(".scatt1")
            .transition()
            .duration(1000)
            .attr("r", 3)
            .attr("fill", "#01949A")
    }


    //Global function
    //Called in map.js
    //This function gets the name of the country that was clicked on the map
    window.getCountryBAR = function(country){           //(Subin Siby, 2014)

            //Storing the country name in an empty variable countryName
            var countryName; 
            countryName = country;
        
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

        //The below function generates the bar chart based on teh data provided as input to the function
        function drawBAR(data) {

            //Counter to check how many times the function was called
            cBar++

                //Call the function to update the x-axis values accordingly
                axes(data);

                //Initailizng empty sets and arrays for storing particular data
                var caseNumSetBAR = new Set()
                var reqMonthsBAR = []
                var reqValuesBAR = []
                
                //Variable to store the last dates of each month
                var lastDateBAR;

                //This loops iterates over the data provided
                for(var i = 0; i<data.length; i++){

                    //As we are printing the rise in the number of cases for each month, 
                    //we extract the last day of each month
                    lastDateBAR = function(d){
                        //The below geneartes a "Date" object for the provided month and year
                        return new Date(d.getFullYear(), d.getMonth() + 1, 0)          //(w3resource, 2020) 
                    }

                    //Checking if the current date that the function is reading is equal to the last day of the month
                    if(data[i].date.getTime() == lastDateBAR(data[i].date).getTime()){      //(GeeksforGeeks, 2019)
                            //Append that date's month to the empty array defined above
                            reqMonthsBAR.push(month[data[i].date.getMonth()])
                            //Append the "total_cases" to the empty array defined above
                            reqValuesBAR.push(data[i].total_cases)
                            //Add teh "total_cases" value to the set that is sent to the updateYAxis() function
                            caseNumSetBAR.add(data[i].total_cases)
                    }
                }

                //Call the function to update the y-axis values accordingly
                updateYAxis(caseNumSetBAR)

                //Filtering out only the required values
                var newDataBAR = data.filter(barFunc)
                function barFunc(dat){
                    if(dat.date.getTime() == lastDateBAR(dat.date).getTime()){          //(GeeksforGeeks, 2019)
                        //Checking to see if the current "total_cases" value that is been read, is present
                        //in the array defined above
                        return (reqValuesBAR.includes(dat.total_cases))
                    }   
                }
                
                //Creating the bar chart based on the dataset provided
                var u = svgCHART.selectAll(".barRect")
                                .data(newDataBAR)
                            
                   u.enter()
                    .append("rect")
                    .attr("class", "barRect")
                    .merge(u)
                    .on("mouseover", whileMousingOver)
                    .on("mouseout", whileMousingOut)
                    .transition()                        
                    .duration(900)          ////Using a transition, so that the bars appear smoothly
                    .attr("x", function(d){
                        //Setting the x-ccordinate of the bars
                        return x(month[d.date.getMonth()]) + 100      
                    })
                    .attr("y", function(d){
                        //setting the y-coordinate of the bars
                        return y(d.total_cases) + 50    
                    })
                    .attr("width", x.bandwidth())    
                    .attr("height", function(d){
                        //Setting the height value dynamically
                        return heightCHART - y(d.total_cases)
                    })
                    .attr("fill", "#01949A")
                    
                if(cBar >= 2){
                    clearBar()
                }

                u.exit().remove()
                        
            }

            function clearBar(){
                d3.selectAll(".barRect")
                    .exit()
                    .remove()
                
                // d3.selectAll(".xaxis")
                //     .transition()                            
                //     .duration(1000)
                //     .remove() 

                // d3.selectAll(".myYaxis")
                //     .transition()
                //     .duration(1000)
                //     .remove()

                
                cBar=0
                

                drawBAR(barCountry)
            }

            var barCountry = asiaArr.filter(yearCountry)      //(dedpo, 2016)

            function yearCountry(d){
                return ((d.location == countryName) && (d.date.getFullYear() == 2020))
            }

            drawBAR(barCountry)
            
            
        }

      })

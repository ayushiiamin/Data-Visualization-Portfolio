//REFERENCES - 

// 1) Ocks.org. (2018). getBBox. [online] 
//    Available at: https://bl.ocks.org/mbostock/1160929

// 2) G, S. (2017). D3.js append tspan to text element. [online] Stack Overflow. 
//    Available at: https://stackoverflow.com/questions/42215205/d3-js-append-tspan-to-text-element

// 2) Shuvo, N.A. (2021). X Axis text labels are not rotating in d3. [online] Stack Overflow. 
//    Available at: https://stackoverflow.com/questions/65920124/x-axis-text-labels-are-not-rotating-in-d3


//Global function
//Within this function, the SVG object will be created for the scatter plot
//This function is called when the user selects the "Property" crime category
window.callBubbleChart_LA = function(la_data){

    const marginBUBBLE_LA = {top: 10, right: 30, bottom: 40, left: 155};
    const widthBUBBLE_LA = 400 - marginBUBBLE_LA.left - marginBUBBLE_LA.right;
    const heightBUBBLE_LA = 300 - marginBUBBLE_LA.top - marginBUBBLE_LA.bottom;

    //Initializing an empty array to store the data extracted from the csv file
    var bubbleArrPropertyLA = [];

    //The below function is used for converting each of the csv column data to their original type
    //The column containing string data, are left as it is, whereas the numeric values are converted to 'Number' type
    //The function returns a dictionary array, containing key-value pairs from the csv file
    function toOriginalTypeBUBBLE_LA(d){
        return {
            state: d.state,
            year: Number(d.year),
            
            population: Number(d.population),

            property_rates_all: Number(d.property_rates_all),
            rates_burglary: Number(d.rates_burglary),
            rates_larceny: Number(d.rates_larceny),
            rates_motor: Number(d.rates_motor),

            violent_rates_all: Number(d.violent_rates_all),
            rates_assault: Number(d.rates_assault),
            rates_murder: Number(d.rates_murder),
            rates_rape: Number(d.rates_rape),
            rates_robbery: Number(d.rates_robbery),

            property_total_all: Number(d.property_total_all),
            total_burglary: Number(d.total_burglary),
            total_larceny: Number(d.total_larceny),
            total_motor: Number(d.total_motor),

            violent_total_all: Number(d.violent_total_all),
            total_assault: Number(d.total_assault),
            total_murder: Number(d.total_murder),
            total_rape: Number(d.total_rape),
            total_robbery: Number(d.total_robbery)
        };
    }

    //Loading the csv file 
    d3.csv("data/crimeUS.csv", function(d, i){

        //Using the function to convert each data value into their respective data type
        //The result is pushed to an empty array
        bubbleArrPropertyLA.push(toOriginalTypeBUBBLE_LA(d))
    }).then(function(bubbleData_LA){

        //Creating the SVG object
        var svgBUBBLE_LA = d3.select('body')
                                .append("svg")
                                .attr("class","bubblePropertyLA")
                                .attr("width", widthBUBBLE_LA + marginBUBBLE_LA.left + marginBUBBLE_LA.right - 7)
                                .attr("height", heightBUBBLE_LA + marginBUBBLE_LA.top + marginBUBBLE_LA.bottom + 18)
                                .attr("transform", "translate(-453, 27)")

        //Creating a group container
        var gBUBBLE_LA = svgBUBBLE_LA.selectAll("g")
                                            .data(bubbleArrPropertyLA)
                                            .enter()
                                            .append("g")
                                            .attr("transform", function(d, i) {
                                                return "translate(" + (marginBUBBLE_LA.left+10) + "," + marginBUBBLE_LA.top + ")";
                                            })
        
        //To the above created group container, we append and SVG text element
        //This SVG text element serves as the heading for the scatter plot
        gBUBBLE_LA.append("text")
                  .attr("x", -150)
                  .attr("y", 20)
                  .attr("font-size", "17px")
                  .attr("font-family", "sans-serif")
                  .attr("fill", "#C5C5C5")
                  .text("Larceny")
        
        //Defining the x-axis for the scatter plot 
        var x = d3.scaleLinear()
                    .range([0, widthBUBBLE_LA])
        
        //Creating a horizontal bottom x-axis using the data generated for the x-axis above
        var xBottomAxis = d3.axisBottom()
                            .scale(x)
        
        //Adding the bottom x-axis to the svg
        var x_bottom = svgBUBBLE_LA.append("g")
                                    .attr("class", "xaxis_LA")
                                    .attr("transform", "translate(100," + (heightBUBBLE_LA+50) + ")")
                                    .attr("color", "white")
                                    .call(xBottomAxis) 
        
        //The below is done so that the values on the x-axis appear
        //in a slanted manner
        x_bottom.selectAll("text")               
                .style("text-anchor", "end")
                .attr("dx", "-.8em")              //(Shuvo, 2021)
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)" )
                .attr("fill", "#C5C5C5")
        
        //Defining the y-axis for the scatter plot 
        var y = d3.scaleLinear()
                .range([heightBUBBLE_LA, 0])
        
        //Creating a vertical left y-axis using the data generated for the y-axis above
        var yLeftAxis = d3.axisLeft()
                        .scale(y)
        
        //Adding the left y-axis to the svg 
        var y_left = svgBUBBLE_LA.append("g")
                                    .attr("class", "myYaxis_LA")
                                    .attr("transform", "translate(" + (widthBUBBLE_LA-115) + ", 50)")
                                    .attr("color", "white")
                                    .call(yLeftAxis)
        
        //Setting teh color of the y-axis values
        y_left.selectAll("text")
            .attr("fill", "#C5C5C5")
        
        //Creating a group container
        var gr_LA = svgBUBBLE_LA.append("g")
        
        //Setting the color scale for coloring each of the markers on the plot
        var colorScale_LA = d3.scaleOrdinal()
                                .range(d3.schemeGreys[7]);
        
        //Counter to keep track of how many time the filterData_LA() function is called
        var filter_la = 0

        window.filterData_LA = function(state){
            //Increment the counter
            filter_la++
            
            //Seelect all elements under this class and hide all the markers
            //except chosen state's marker
            d3.selectAll(".rate_LA")
                .filter(function(d){
                    return !(d.state == state)
                })
                .style("visibility", "hidden") 
            
            //Check if the counter value is greater than or equal to 2
            if(filter_la >= 2){
                //Seelect all markers under this class and set their visibility
                //to visible
                d3.selectAll(".rate_LA")
                   .style("visibility", "visible")  
                
                //Reset the counter to 0
                filter_la = 0
                
                //Call the function again to hide the non-required markers
                filterData_LA(state)
            }
        }

        //The below function is used for updating x-axis values dynamically
        function axes(data){

            //The domain is set according to the max value present in the input
            //data fed to this function
            x.domain(
                [0, d3.max(data)]
            )
            
            //Update the bottom x-axis accordingly
            xBottomAxis = d3.axisBottom()
                            .scale(x)
            
            //Smoothly transform the updated bottom x-axis
            x_bottom.transition()
                    .duration(900)
                    .call(xBottomAxis) 

            //Position the values on the x-axis to a slanting position
            x_bottom.selectAll("text")              
                    .style("text-anchor", "end")
                    .attr("dx", "-.8em")              //(Shuvo, 2021)
                    .attr("dy", ".15em")
                    .attr("transform", "rotate(-65)")
                    .attr("fill", "#C5C5C5")
        }

        //The below function is used for updating y-axis values dynamically
        function updateYAxis(data){

            //The domain is set according to the max value present in the input
            //data fed to this function
            y.domain(
                [0, d3.max(data)]
            )
            
            //Update the y-axis accordingly
            yLeftAxis = d3.axisLeft()
                            .scale(y)
            
            //Smoothly transform the updated y-axis
            y_left.transition()                  
                .duration(900)
                .call(yLeftAxis)
            
            //Setting teh color of the y-axis values
            y_left.selectAll("text")
                .attr("fill", "#C5C5C5")
        }

        //Function to dynamically update the color scale used for coloring teh markers
        function updateColorScale(data){

            //The domain is set according to the min and max values present in the input
            //data fed to this function
            colorScale_LA.domain(
                [d3.min(data), d3.max(data)]
            )
        }

        //The below function generates the scatter plot based on the data provided as input to the function
        function drawBubbleChart_LA(data){

            //Creating an SVG rectangle element that serves as the button for reseting the filtered data
            svgBUBBLE_LA.append("rect")
                        .attr("x", 370)
                        .attr("y", 30)
                        .attr("fill", "#F8CF40")
                        .attr("width", 60)
                        .attr("height", 20)
                        //On clicking on the button, the below function is triggered 
                        //which resets the "visibility" attribute to "visible" for all markers present
                        //on the dashboard
                        .on("click", onClickLA)
            
            //Creating an SVG text element that serves as a label for above created button
            svgBUBBLE_LA.append("text")
                        .text("Reset Filter")
                        .attr("x", 400)
                        .attr("y", 43)
                        .attr("text-anchor", "middle")
                        .attr("font-size", "12px")
                        .attr("fill", "#0000FF")
                        //On clicking on the button, the below function is triggered 
                        //which resets the "visibility" attribute to "visible" for all markers present
                        //on the dashboard
                        .on("click", onClickLA)

            //Initializing an empty array to store all the population values recorded for all states in 
            //a particular year
            var laPop = []

            //Initializing an empty array to store all the Larceny rate values recorded for all states in 
            //a particular year
            var laRate = []

            //For loop to iterate over the input data
            for (var i = 0; i<data.length; i++){

                //To the empty array defined above, store the population values
                //for all the states and federal district
                laPop.push(data[i].population)

                //To the empty array defined above, store the Larceny crime rate values
                //for all the states and federal district
                laRate.push(data[i].rates_larceny)
            }

            //Call the functions to update the values accordingly
            axes(laPop)
            updateYAxis(laRate)
            updateColorScale(laRate)

            var a = svgBUBBLE_LA.selectAll(".rate_LA")
                                    .data(data)

                a.enter()
                    .append("circle")
                    .attr("class", "rate_LA")
                    .merge(a)
                    .on("mouseover", onMouseOver_LA)
                    .on("mouseout", onMouseOut_LA)
                    .transition()
                    .duration(900)
                    // .style("fill", "#29A0B1")
                    .style("fill", function(d){

                        //Set the the markers color based on what the color scale generates for te given inout value
                        //i.e. the Larceny crime rate values
                        return colorScale_LA(d.rates_larceny)
                    })
                    .attr("cx", function(d){
                        //Setting the x-ccordinate of the markers based on the current population value that is been read
                        return x(d.population) + 107
                    })
                    .attr("cy", function(d){

                        //setting the y-coordinate of the markers based on the current "rates_larceny" value
                        return y(d.rates_larceny) + 50
                    })
                    .attr("r", 5)

            a.exit().remove()
        }

        var tooltipRect_LA = d3.select(".bubblePropertyLA")
                            .append("g")
                            .append("rect")
                            .style("position", "absolute")
                            .style("visibility", "hidden")
                            .attr("fill", "#695E93")     
                            
        var tooltip_LA = d3.select(".bubblePropertyLA")
                            .append("g")
                            .append("text")
                            .attr("class", "laText")
                            .style("position", "absolute")
                            .style("visibility", "hidden")       //The visibility is set to "hidden"      
                            .attr("fill", "#EFDCF9")         
                            .attr("font-size", "15px")

        var ttRect_LA;

        function onMouseOver_LA(event, d, i){


            //Getting the BBox
            //This BBbox is genearted as per the width, height, and position of the svg text element
            ttRect_LA = tooltip_LA.node().getBBox()

            tooltipRect_LA.style("visibility", "visible")
                        .attr("x", d3.pointer(event)[0])    //Setting the x coordinate as per the position of the mouse cursor
                        .attr("y", d3.pointer(event)[1] - 12)   //Setting the y coordinate
                        .attr("width", ttRect_LA.width)     //Setting the width as per the value generated by the BBox
                        .attr("height", ttRect_LA.height)     //Setting the height as per the value generated by the BBox

            tooltip_LA.style("visibility", "visible")
                    .attr("x", d3.pointer(event)[0])    //Setting the x coordinate as per the position of the mouse cursor
                    .attr("y", d3.pointer(event)[1])    //Setting the y coordinate
                    .text(function(){
                        return "State: " + d.state      //Return the State name
                    })
                    .append("tspan")                  //(G, 2017)
                    .attr("x", d3.pointer(event)[0])
                    .attr("y", d3.pointer(event)[1] + 15)
                    .text(function(){
                        return "Population: " + d.population      //Return the Population value
                    })
                    .append("tspan")                  //(G, 2017)
                    .attr("x", d3.pointer(event)[0])
                    .attr("y", d3.pointer(event)[1] + 30)
                    .text(function(){
                        return "Larceny Rate: " + d.rates_larceny         //Return the Larceny crime rate value
                    })
        }

        //This function is triggered when the mouse cursor moves away from the marker
        function onMouseOut_LA(event, d, i){

            //Set the tooltip's visibility to hidden
            tooltip_LA.style("visibility", "hidden")
            tooltipRect_LA.style("visibility", "hidden")
        }

        function onClickLA(){
            //Selecet all elmenets belonging to thsi class
            //and set their "visibility" back to "visible"
            d3.selectAll(".rate_LA")
                .style("visibility", "visible")
        }

        //Global function that is used to extract the data
        window.changeBUBBLE_LA = function(yearBUBBLE_LA) {

            //Since the scatter plot is generated as per the current year
            //the code extracts all the records collected for that particular year
            var newBubbleArr_LA = bubbleArrPropertyLA.filter(filteringDataBUBBLE_LA)
                
            function filteringDataBUBBLE_LA(d){
                if(d.year == +yearBUBBLE_LA){
                    //If the current year that is being read is the year chosen on the slider
                    //then extract the relative records for that year
                    return d
                }
            }
            //Call the function used for creating the scatter plot
            //Pass the newly created array as an argument to the function
            drawBubbleChart_LA(newBubbleArr_LA)  
        }

        changeBUBBLE_LA(la_data)
    })

}
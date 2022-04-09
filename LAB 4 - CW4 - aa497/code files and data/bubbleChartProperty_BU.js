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
window.callBubbleChart_BU = function(bu_data){

    const marginBUBBLE_BU = {top: 10, right: 30, bottom: 40, left: 155};
    const widthBUBBLE_BU = 400 - marginBUBBLE_BU.left - marginBUBBLE_BU.right;
    const heightBUBBLE_BU = 300 - marginBUBBLE_BU.top - marginBUBBLE_BU.bottom;

    //Initializing an empty array to store the data extracted from the csv file
    var bubbleArrPropertyBU = [];

    //The below function is used for converting each of the csv column data to their original type
    //The column containing string data, are left as it is, whereas the numeric values are converted to 'Number' type
    //The function returns a dictionary array, containing key-value pairs from the csv file
    function toOriginalTypeBUBBLE_BU(d){
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
        //The result is pushed to an empty arra
        bubbleArrPropertyBU.push(toOriginalTypeBUBBLE_BU(d))
    }).then(function(bubbleData_BU){
        
        //Creating the SVG object
        var svgBUBBLE_BU = d3.select('body')
                                .append("svg")
                                .attr("class","bubblePropertyBU")
                                .attr("width", widthBUBBLE_BU + marginBUBBLE_BU.left + marginBUBBLE_BU.right - 7)
                                .attr("height", heightBUBBLE_BU + marginBUBBLE_BU.top + marginBUBBLE_BU.bottom + 18)
                                .attr("transform", "translate(10, -340)")

        //Creating a group container
        var gBUBBLE_BU = svgBUBBLE_BU.selectAll("g")
                                            .data(bubbleArrPropertyBU)
                                            .enter()
                                            .append("g")
                                            .attr("transform", function(d, i) {
                                                return "translate(" + (marginBUBBLE_BU.left+10) + "," + marginBUBBLE_BU.top + ")";
                                            })
        
        //To the above created group container, we append and SVG text element
        //This SVG text element serves as the heading for the scatter plot
        gBUBBLE_BU.append("text")
                    .attr("x", -150)
                    .attr("y", 20)
                    .attr("font-size", "17px")
                    .attr("font-family", "sans-serif")
                    .attr("fill", "#1E77BD")
                    .text("Burglary") 
        
        //Defining the x-axis for the scatter plot                                    
        var x = d3.scaleLinear()
                    .range([0, widthBUBBLE_BU])
        
        //Creating a horizontal bottom x-axis using the data generated for the x-axis above
        var xBottomAxis = d3.axisBottom()
                            .scale(x)
        
        //Adding the bottom x-axis to the svg                     
        var x_bottom = svgBUBBLE_BU.append("g")
                                    .attr("class", "xaxis_BU")
                                    .attr("transform", "translate(100," + (heightBUBBLE_BU+50) + ")")
                                    .attr("color", "white")
                                    .call(xBottomAxis) 
        
        //The below is done so that the values on the x-axis appear
        //in a slanted manner
        x_bottom.selectAll("text")               
                .style("text-anchor", "end")
                .attr("dx", "-.8em")              //(Shuvo, 2021)
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)" )
                .attr("fill", "#1E77BD")
        

        //Defining the y-axis for the scatter plot 
        var y = d3.scaleLinear()
                .range([heightBUBBLE_BU, 0])
        
        //Creating a vertical left y-axis using the data generated for the y-axis above
        var yLeftAxis = d3.axisLeft()
                        .scale(y)
        
        //Adding the left y-axis to the svg 
        var y_left = svgBUBBLE_BU.append("g")
                                    .attr("class", "myYaxis_BU")
                                    .attr("transform", "translate(" + (widthBUBBLE_BU-115) + ", 50)")
                                    .attr("color", "white")
                                    .call(yLeftAxis)
        
        //Setting teh color of the y-axis values
        y_left.selectAll("text")
            .attr("fill", "#1E77BD")
        
        //Creating a group container
        var gr_BU = svgBUBBLE_BU.append("g")
        
        //Setting the color scale for coloring each of the markers on the plot
        var colorScale_BU = d3.scaleOrdinal()
                                .range(d3.schemeBlues[7]);
        
        //Counter to keep track of how many time the filterData_BU() function is called
        var filter_bu = 0
        
        
        window.filterData_BU = function(state){
            //Increment the counter
            filter_bu++

            //Seelect all elements under this class and hide all the markers
            //except chosen state's marker
            d3.selectAll(".rate_BU")
               .filter(function(d){
                   return !(d.state == state)
               })
               .style("visibility", "hidden") 
            
            //Check if the counter value is greater than or equal to 2
            if(filter_bu >= 2){
                //Seelect all markers under this class and set their visibility
                //to visible
                d3.selectAll(".rate_BU")
                  .style("visibility", "visible")  

                //Reset the counter to 0
                filter_bu = 0

                //Call the function again to hide the non-required markers
                filterData_BU(state)
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
                    .attr("transform", "rotate(-65)" )
                    .attr("fill", "#1E77BD")
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
                .attr("fill", "#1E77BD")
        }

        //Function to dynamically update the color scale used for coloring teh markers
        function updateColorScale(data){

            //The domain is set according to the min and max values present in the input
            //data fed to this function
            colorScale_BU.domain(
                [d3.min(data), d3.max(data)]
            )
        }

        //The below function generates the scatter plot based on the data provided as input to the function
        function drawBubbleChart_BU(data){

            //Creating an SVG rectangle element that serves as the button for reseting the filtered data
            svgBUBBLE_BU.append("rect")
                        .attr("x", 370)
                        .attr("y", 30)
                        .attr("fill", "#F8CF40")
                        .attr("width", 60)
                        .attr("height", 20)
                        //On clicking on the button, the below function is triggered 
                        //which resets the "visibility" attribute to "visible" for all markers present
                        //on the dashboard
                        .on("click", onClickBU)
            
            //Creating an SVG text element that serves as a label for above created button
            svgBUBBLE_BU.append("text")
                        .text("Reset Filter")
                        .attr("x", 400)
                        .attr("y", 43)
                        .attr("text-anchor", "middle")
                        .attr("font-size", "12px")
                        .attr("fill", "#0000FF")
                        //On clicking on the button, the below function is triggered 
                        //which resets the "visibility" attribute to "visible" for all markers present
                        //on the dashboard
                        .on("click", onClickBU)

            //Initializing an empty array to store all the population values recorded for all states in 
            //a particular year
            var buPop = []

            //Initializing an empty array to store all the Burglary rate values recorded for all states in 
            //a particular year
            var buRate = []

            //For loop to iterate over the input data
            for (var i = 0; i<data.length; i++){

                //To the empty array defined above, store the population values
                //for all the states and federal district
                buPop.push(data[i].population)

                //To the empty array defined above, store the Burglary crime rate values
                //for all the states and federal district
                buRate.push(data[i].rates_burglary)
            }

            //Call the function to update the x-axis values accordingly
            axes(buPop)

            //Call the function to update the y-axis values accordingly
            updateYAxis(buRate)

            //Call the function to set the domain of the color scale
            updateColorScale(buRate)

            //Creating the scatter plot based on the input data provided
            var b = svgBUBBLE_BU.selectAll(".rate_BU")
                                    .data(data)

                b.enter()
                    .append("circle")
                    .attr("class", "rate_BU")
                    .merge(b)
                    .on("mouseover", onMouseOver_BU)   //Listening for mouseover events
                    .on("mouseout", onMouseOut_BU)      //Listening for mouseout events
                    .transition()        //Using a transition, so that the markers appear smoothly
                    .duration(900)
                    .style("fill", function(d){

                        //Set the the markers color based on what the color scale generates for te given inout value
                        //i.e. the Burglary crime rate values
                        return colorScale_BU(d.rates_burglary)
                    })
                    .attr("cx", function(d){

                        //Setting the x-ccordinate of the markers based on the current population value that is been read
                        return x(d.population) + 107
                    })
                    .attr("cy", function(d){

                        //setting the y-coordinate of the markers based on the current "rates_burglary" value
                        return y(d.rates_burglary) + 50
                    })
                    .attr("r", 5)
            
            //Clearing the markers for the updated values
            b.exit().remove()
        }

        //Creating an svg rectangle that appears behind the text
        var tooltipRect_BU = d3.select(".bubblePropertyBU")
                            .append("g")
                            .append("rect")
                            .style("position", "absolute")
                            .style("visibility", "hidden")    //The visibility is set to "hidden" 
                            .attr("fill", "#695E93")     
        
        //Creating an svg text, that provides basic information about teh marker
        var tooltip_BU = d3.select(".bubblePropertyBU")
                            .append("g")
                            .append("text")
                            .attr("class", "buText")
                            .style("position", "absolute")
                            .style("visibility", "hidden")     //The visibility is set to "hidden"       
                            .attr("fill", "#EFDCF9")         
                            .attr("font-size", "15px")

        var ttRect_BU;

        //This function is triggered when the mouse hovers over any marker
        function onMouseOver_BU(event, d, i){

            //Getting the BBox
            //This BBbox is genearted as per the width, height, and position of the svg text element
            ttRect_BU = tooltip_BU.node().getBBox()

            tooltipRect_BU.style("visibility", "visible")
                        .attr("x", d3.pointer(event)[0])     //Setting the x coordinate as per the position of the mouse cursor
                        .attr("y", d3.pointer(event)[1] - 12)    //Setting the y coordinate 
                        .attr("width", ttRect_BU.width)         //Setting the width as per the value generated by the BBox
                        .attr("height", ttRect_BU.height)        //Setting the height as per the value generated by the BBox

            tooltip_BU.style("visibility", "visible")
                    .attr("x", d3.pointer(event)[0])     //Setting the x coordinate as per the position of the mouse cursor
                    .attr("y", d3.pointer(event)[1])     //Setting the y coordinate as per the position of the mouse cursor
                    .text(function(){
                        return "State: " + d.state        //Return the State name
                    })
                    .append("tspan")                  //(G, 2017)
                    .attr("x", d3.pointer(event)[0])
                    .attr("y", d3.pointer(event)[1] + 15)
                    .text(function(){
                        return "Population: " + d.population   //Return the Population value
                    })
                    .append("tspan")                  //(G, 2017)
                    .attr("x", d3.pointer(event)[0])
                    .attr("y", d3.pointer(event)[1] + 30)
                    .text(function(){
                        return "Burglary Rate: " + d.rates_burglary  //Return the Burglary crime rate value
                    })
        }

        //This function is triggered when the mouse cursor moves away from the marker
        function onMouseOut_BU(event, d, i){

            //Set the tooltip's visibility to hidden
            tooltip_BU.style("visibility", "hidden")
            tooltipRect_BU.style("visibility", "hidden")
        }

        //This function is triggered when "Reset Filter" button is clicked on
        function onClickBU(){
            //Selecet all elmenets belonging to thsi class
            //and set their "visibility" back to "visible"
            d3.selectAll(".rate_BU")
                .style("visibility", "visible")
        }

        //Global function that is used to extract the data
        window.changeBUBBLE_BU = function(yearBUBBLE_BU){

            //Since the scatter plot is generated as per the current year
            //the code extracts all the records collected for that particular year
            var newBubbleArr_BU = bubbleArrPropertyBU.filter(filteringDataBUBBLE_BU)
                
            function filteringDataBUBBLE_BU(d){
                if(d.year == +yearBUBBLE_BU){
                    //If the current year that is being read is the year chosen on the slider
                    //then extract the relative records for that year
                    return d
                }
            }
            //Call the function used for creating the scatter plot
            //Pass the newly created array as an argument to the function
            drawBubbleChart_BU(newBubbleArr_BU)  
        }

        changeBUBBLE_BU(bu_data)
    
    })

}
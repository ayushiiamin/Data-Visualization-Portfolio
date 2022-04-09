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
window.callBubbleChart_MO = function(mo_data){

    const marginBUBBLE_MO = {top: 10, right: 30, bottom: 40, left: 155};
    const widthBUBBLE_MO = 400 - marginBUBBLE_MO.left - marginBUBBLE_MO.right;
    const heightBUBBLE_MO = 300 - marginBUBBLE_MO.top - marginBUBBLE_MO.bottom;

    //Initializing an empty array to store the data extracted from the csv file
    var bubbleArrPropertyMO = [];

    //The below function is used for converting each of the csv column data to their original type
    //The column containing string data, are left as it is, whereas the numeric values are converted to 'Number' type
    //The function returns a dictionary array, containing key-value pairs from the csv file
    function toOriginalTypeBUBBLE_MO(d){
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
            rates_larceny: Number(d.total_larceny),
            total_motor: Number(d.total_motor),

            violent_total_all: Number(d.violent_total_all),
            total_assault: Number(d.total_assault),
            total_murder: Number(d.total_murder),
            total_rape: Number(d.total_rape),
            total_robbery: Number(d.total_robbery)
        };
    }

    d3.csv("data/crimeUS.csv", function(d, i){

        //Using the function to convert each data value into their respective data type
        //The result is pushed to an empty array
        bubbleArrPropertyMO.push(toOriginalTypeBUBBLE_MO(d))
    }).then(function(bubbleData_MO){

        //Creating the SVG object
        var svgBUBBLE_MO = d3.select('body')
                                .append("svg")
                                .attr("class","bubblePropertyMO")
                                .attr("width", widthBUBBLE_MO + marginBUBBLE_MO.left + marginBUBBLE_MO.right - 7)
                                .attr("height", heightBUBBLE_MO + marginBUBBLE_MO.top + marginBUBBLE_MO.bottom + 18)
                                .attr("transform", "translate(484, -332)")

        //Creating a group container
        var gBUBBLE_MO = svgBUBBLE_MO.selectAll("g")
                                            .data(bubbleArrPropertyMO)
                                            .enter()
                                            .append("g")
                                            .attr("transform", function(d, i) {
                                                return "translate(" + (marginBUBBLE_MO.left+10) + "," + marginBUBBLE_MO.top + ")";
                                            })
        
        //To the above created group container, we append and SVG text element
        //This SVG text element serves as the heading for the scatter plot
        gBUBBLE_MO.append("text")
                    .attr("x", -150)
                    .attr("y", 20)
                    .attr("font-size", "17px")
                    .attr("font-family", "sans-serif")
                    .attr("fill", "#FF0080")
                    .text("Motor")
        
        //Defining the x-axis for the scatter plot
        var x = d3.scaleLinear()
                    .range([0, widthBUBBLE_MO])
        
        //Creating a horizontal bottom x-axis using the data generated for the x-axis above
        var xBottomAxis = d3.axisBottom()
                            .scale(x)
        
        //Adding the bottom x-axis to the svg
        var x_bottom = svgBUBBLE_MO.append("g")
                                    .attr("class", "xaxis_MO")
                                    .attr("transform", "translate(100," + (heightBUBBLE_MO+50) + ")")
                                    .attr("color", "white")
                                    .call(xBottomAxis) 
        
        //The below is done so that the values on the x-axis appear
        //in a slanted manner
        x_bottom.selectAll("text")               
                .style("text-anchor", "end")
                .attr("dx", "-.8em")              //(Shuvo, 2021)
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)" )
                .attr("fill", "#FF0080")
        
        //Defining the y-axis for the scatter plot 
        var y = d3.scaleLinear()
                .range([heightBUBBLE_MO, 0])
        
        //Creating a vertical left y-axis using the data generated for the y-axis above
        var yLeftAxis = d3.axisLeft()
                        .scale(y)
        
        //Adding the left y-axis to the svg
        var y_left = svgBUBBLE_MO.append("g")
                                    .attr("class", "myYaxis_MO")
                                    .attr("transform", "translate(" + (widthBUBBLE_MO-115) + ", 50)")
                                    .attr("color", "white")
                                    .call(yLeftAxis)
        
        //Setting teh color of the y-axis values
        y_left.selectAll("text")
            .attr("fill", "#FF0080")
                            
        var gr_MO = svgBUBBLE_MO.append("g")
        
        //Setting the color scale for coloring each of the markers on the plot
        var colorScale_MO = d3.scaleOrdinal()
                                .range(d3.schemePuRd[7]);
        
        //Counter to keep track of how many time the filterData_MO() function is called
        var filter_mo = 0

        window.filterData_MO = function(state){
            filter_mo++
            
            //Seelect all elements under this class and hide all the markers
            //except chosen state's marker
            d3.selectAll(".rate_MO")
                .filter(function(d){
                    return !(d.state == state)
                })
                .style("visibility", "hidden") 
            
            //Check if the counter value is greater than or equal to 2
            if(filter_mo >= 2){
                //Seelect all markers under this class and set their visibility
                //to visible
                d3.selectAll(".rate_MO")
                    .style("visibility", "visible")  
                
                //Reset the counter to 0
                filter_mo = 0
                
                //Call the function again to hide the non-required markers
                filterData_MO(state)
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
            
            x_bottom.selectAll("text")              
                    .style("text-anchor", "end")
                    .attr("dx", "-.8em") 
                    .attr("dy", ".15em")
                    .attr("transform", "rotate(-65)")
                    .attr("fill", "#FF0080")
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

            y_left.selectAll("text")
                .attr("fill", "#FF0080")
        }

        function updateColorScale(data){

            //The domain is set according to the min and max values present in the input
            //data fed to this function
            colorScale_MO.domain(
                [d3.min(data), d3.max(data)]
            )
        }

        function drawBubbleChart_MO(data){

            //Creating an SVG rectangle element that serves as the button for reseting the filtered data
            svgBUBBLE_MO.append("rect")
                        .attr("x", 370)
                        .attr("y", 30)
                        .attr("fill", "#F8CF40")
                        .attr("width", 60)
                        .attr("height", 20)
                        //On clicking on the button, the below function is triggered 
                        //which resets the "visibility" attribute to "visible" for all markers present
                        //on the dashboard
                        .on("click", onClickMO)
            
             //Creating an SVG text element that serves as a label for above created button
            svgBUBBLE_MO.append("text")
                        .text("Reset Filter")
                        .attr("x", 400)
                        .attr("y", 43)
                        .attr("text-anchor", "middle")
                        .attr("font-size", "12px")
                        .attr("fill", "#0000FF")
                        //On clicking on the button, the below function is triggered 
                        //which resets the "visibility" attribute to "visible" for all markers present
                        //on the dashboard
                        .on("click", onClickMO)

            //Initializing an empty array to store all the population values recorded for all states in 
            //a particular year
            var moPop = []

            //Initializing an empty array to store all the Motor rate values recorded for all states in 
            //a particular year
            var moRate = []

            for (var i = 0; i<data.length; i++){

                //To the empty array defined above, store the population values
                //for all the states and federal district
                moPop.push(data[i].population)

                //To the empty array defined above, store the Motor crime rate values
                //for all the states and federal district
                moRate.push(data[i].rates_motor)
            }

            //Call the functions to update the values accordingly
            axes(moPop)
            updateYAxis(moRate)
            updateColorScale(moRate)

            var o = svgBUBBLE_MO.selectAll(".rate_MO")
                                    .data(data)

                o.enter()
                    .append("circle")
                    .attr("class", "rate_MO")
                    .merge(o)
                    .on("mouseover", onMouseOver_MO)
                    .on("mouseout", onMouseOut_MO)
                    .transition()
                    .duration(900)
                    .style("fill", function(d){

                        //Set the the markers color based on what the color scale generates for te given inout value
                        return colorScale_MO(d.rates_motor)
                    })
                    .attr("cx", function(d){
                        //Setting the x-ccordinate of the markers
                        return x(d.population) + 107
                    })
                    .attr("cy", function(d){
                        //setting the y-coordinate of the markers
                        return y(d.rates_motor) + 50
                    })
                    .attr("r", 5)

            o.exit().remove()
        }

        var tooltipRect_MO = d3.select(".bubblePropertyMO")
                            .append("g")
                            .append("rect")
                            .style("position", "absolute")
                            .style("visibility", "hidden")
                            .attr("fill", "#695E93")     
                            
        var tooltip_MO = d3.select(".bubblePropertyMO")
                            .append("g")
                            .append("text")
                            .attr("class", "moText")
                            .style("position", "absolute")
                            .style("visibility", "hidden")         
                            .attr("fill", "#EFDCF9")         
                            .attr("font-size", "15px")

        var ttRect_MO;

        function onMouseOver_MO(event, d, i){

            //Getting the BBox
            //This BBbox is genearted as per the width, height, and position of the svg text element
            ttRect_MO = tooltip_MO.node().getBBox()

            //Setting the attrbutes
            tooltipRect_MO.style("visibility", "visible")
                        .attr("x", d3.pointer(event)[0]) 
                        .attr("y", d3.pointer(event)[1] - 12)
                        .attr("width", ttRect_MO.width)
                        .attr("height", ttRect_MO.height)

            tooltip_MO.style("visibility", "visible")
                    .attr("x", d3.pointer(event)[0])
                    .attr("y", d3.pointer(event)[1])
                    .text(function(){ 
                        return "State: " + d.state   //Return the State name
                    })
                    .append("tspan") 
                    .attr("x", d3.pointer(event)[0])
                    .attr("y", d3.pointer(event)[1] + 15)
                    .text(function(){
                        return "Population: " + d.population    //Return the Population value
                    })
                    .append("tspan") 
                    .attr("x", d3.pointer(event)[0])
                    .attr("y", d3.pointer(event)[1] + 30)
                    .text(function(){
                        return "Motor Rate: " + d.rates_motor   //Return the Motor crime rate value
                    })
        }

        function onMouseOut_MO(event, d, i){

            //Set the tooltip's visibility to hidden
            tooltip_MO.style("visibility", "hidden")
            tooltipRect_MO.style("visibility", "hidden")
        }

        function onClickMO(){
            //Selecet all elmenets belonging to thsi class
            //and set their "visibility" back to "visible"
            d3.selectAll(".rate_MO")
                .style("visibility", "visible")
        }

        window.changeBUBBLE_MO = function(yearBUBBLE_MO) {

            //Since the scatter plot is generated as per the current year
            //the code extracts all the records collected for that particular year
            var newBubbleArr_MO = bubbleArrPropertyMO.filter(filteringDataBUBBLE_MO)
                
            function filteringDataBUBBLE_MO(d){
                if(d.year == +yearBUBBLE_MO){
                    //If the current year that is being read is the year chosen on the slider
                    //then extract the relative records for that year
                    return d
                }
            }

            drawBubbleChart_MO(newBubbleArr_MO)  
        }

        changeBUBBLE_MO(mo_data)
    })
}


//Global function
window.callBubbleChart_RA = function(ra_data){

    const marginBUBBLE_RA = {top: 10, right: 30, bottom: 40, left: 155};
    const widthBUBBLE_RA = 400 - marginBUBBLE_RA.left - marginBUBBLE_RA.right;
    const heightBUBBLE_RA = 300 - marginBUBBLE_RA.top - marginBUBBLE_RA.bottom;

    var bubbleArrViolentRA = [];

    //The below function is used for converting each of the csv column data to their original type
    //The column containing string data, are left as it is, whereas the numeric values are converted to 'Number' type
    //The function returns a dictionary array, containing key-value pairs from the csv file
    function toOriginalTypeBUBBLE_RA(d){
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

    d3.csv("data/crimeUS.csv", function(d, i){

        //Using the function to convert each data value into their respective data type
        //The result is pushed to an empty array
        bubbleArrViolentRA.push(toOriginalTypeBUBBLE_RA(d))
    }).then(function(bubbleData_RA){

        var svgBUBBLE_RA = d3.select('body')
                                .append("svg")
                                .attr("class","bubbleViolentRA")
                                .attr("width", widthBUBBLE_RA + marginBUBBLE_RA.left + marginBUBBLE_RA.right - 7)
                                .attr("height", heightBUBBLE_RA + marginBUBBLE_RA.top + marginBUBBLE_RA.bottom + 18)
                                .attr("transform", "translate(484, -332)")

        //Creating a group container
        var gBUBBLE_RA = svgBUBBLE_RA.selectAll("g")
                                            .data(bubbleArrViolentRA)
                                            .enter()
                                            .append("g")
                                            .attr("transform", function(d, i) {
                                                return "translate(" + (marginBUBBLE_RA.left+10) + "," + marginBUBBLE_RA.top + ")";
                                            })

        gBUBBLE_RA.append("text")
                    .attr("x", -150)
                    .attr("y", 20)
                    .attr("font-size", "17px")
                    .attr("font-family", "sans-serif")
                    .attr("fill", "#32CD30")
                    .text("Rape")
        
                    //Defining the x-axis 
        var x = d3.scaleLinear()
                    .range([0, widthBUBBLE_RA])
                            
        var xBottomAxis = d3.axisBottom()
                            .scale(x)
                            
        var x_bottom = svgBUBBLE_RA.append("g")
                                    .attr("class", "xaxis_RA")
                                    .attr("transform", "translate(100," + (heightBUBBLE_RA+50) + ")")
                                    .attr("color", "white")
                                    .call(xBottomAxis) 
        
                            //The below is done so that the values on the x-axis appear
        //in a slanted manner
        x_bottom.selectAll("text")               
                .style("text-anchor", "end")
                .attr("dx", "-.8em")              //(Shuvo, 2021)
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)" )
                .attr("fill", "#32CD30")
        
                //Defining the y-axis
        var y = d3.scaleLinear()
                .range([heightBUBBLE_RA, 0])
                                
        var yLeftAxis = d3.axisLeft()
                        .scale(y)
        //Adding the left y-axis to the svg                     
        var y_left = svgBUBBLE_RA.append("g")
                                    .attr("class", "myYaxis_RA")
                                    .attr("transform", "translate(" + (widthBUBBLE_RA-115) + ", 50)")
                                    .attr("color", "white")
                                    .call(yLeftAxis)
                            
        y_left.selectAll("text")
            .attr("fill", "#32CD30")
                            
        var gr_RA = svgBUBBLE_RA.append("g")
           //Setting the color scale for coloring each of the markers on the plot
        var colorScale_RA = d3.scaleOrdinal()
                                .range(d3.schemeGreens[7]);

        var filter_ra = 0

        window.filterData_RA = function(state){
            filter_ra++
            
            //Seelect all elements under this class and hide all the markers
            //except chosen state's marker
            d3.selectAll(".rate_RA")
                .filter(function(d){
                    return !(d.state == state)
                })
                .style("visibility", "hidden") 
                                                                                                                        
           if(filter_ra >= 2){
               //Seelect all markers under this class and set their visibility
                //to visible
                d3.selectAll(".rate_RA")
                    .style("visibility", "visible")  
                      //Reset the counter to 0                                                                                                  
                filter_ra = 0
                          //Call the function again to hide the non-required markers                                                                                                
                filterData_RA(state)
            }
        }
        //Function to update the x axis
        function axes(data){

            x.domain(
                [0, d3.max(data)]
            )

            xBottomAxis = d3.axisBottom()
                            .scale(x)

            x_bottom.transition()
                    .duration(900)
                    .call(xBottomAxis) 
            
            x_bottom.selectAll("text")              
                    .style("text-anchor", "end")
                    .attr("dx", "-.8em")              //(Shuvo, 2021)
                    .attr("dy", ".15em")
                    .attr("transform", "rotate(-65)" )
                    .attr("fill", "#32CD30")
        }
        //Function to update the y axis
        function updateYAxis(data){

            y.domain(
                [0, d3.max(data)]
            )

            yLeftAxis = d3.axisLeft()
                            .scale(y)
            
            y_left.transition()                  
                .duration(900)
                .call(yLeftAxis)

            y_left.selectAll("text")
                .attr("fill", "#32CD30")
        }
        //Function to update the color scale
        function updateColorScale(data){

            colorScale_RA.domain(
                [d3.min(data), d3.max(data)]
            )
        }

        function drawBubbleChart_RA(data){

            svgBUBBLE_RA.append("rect")
                        .attr("x", 370)
                        .attr("y", 30)
                        .attr("fill", "#F8CF40")
                        .attr("width", 60)
                        .attr("height", 20)
                        .on("click", onClickRA)
            
            svgBUBBLE_RA.append("text")
                        .text("Reset Filter")
                        .attr("x", 400)
                        .attr("y", 43)
                        .attr("text-anchor", "middle")
                        .attr("font-size", "12px")
                        .attr("fill", "#0000FF")
                        .on("click", onClickRA)

            var raPop = []
            var raRate = []

            for (var i = 0; i<data.length; i++){
                //To the empty array defined above, store the population values
                //for all the states and federal district
                raPop.push(data[i].population)
                //To the empty array defined above, store the rape crime rate values
                //for all the states and federal district
                raRate.push(data[i].rates_rape)
            }

            //Call the functions to update the values accordingly
            axes(raPop)
            updateYAxis(raRate)
            updateColorScale(raRate)

            var ra = svgBUBBLE_RA.selectAll(".rate_RA")
                                    .data(data)

                ra.enter()
                    .append("circle")
                    .attr("class", "rate_RA")
                    .merge(ra)
                    .on("mouseover", onMouseOver_RA)
                    .on("mouseout", onMouseOut_RA)
                    .transition()
                    .duration(900)
                    .style("fill", function(d){
                        //seting color
                        return colorScale_RA(d.rates_rape)
                    })
                    .attr("cx", function(d){
                        //setting the x-coordinate of the markers
                        return x(d.population) + 107
                    })
                    .attr("cy", function(d){
                        //setting the y-coordinate of the markers
                        return y(d.rates_rape) + 50
                    })
                    .attr("r", 5)

            ra.exit().remove()
        }

        var tooltipRect_RA = d3.select(".bubbleViolentRA")
                                .append("g")
                                .append("rect")
                                .style("position", "absolute")
                                .style("visibility", "hidden")
                                .attr("fill", "#695E93")     
                
        var tooltip_RA = d3.select(".bubbleViolentRA")
                            .append("g")
                            .append("text")
                            .attr("class", "raText")
                            .style("position", "absolute")
                            .style("visibility", "hidden")         
                            .attr("fill", "#EFDCF9")         
                            .attr("font-size", "15px")

        var ttRect_RA;

        function onMouseOver_RA(event, d, i){

            ttRect_RA = tooltip_RA.node().getBBox()

            tooltipRect_RA.style("visibility", "visible")
                            .attr("x", d3.pointer(event)[0]) 
                            .attr("y", d3.pointer(event)[1] - 12)
                            .attr("width", ttRect_RA.width)
                            .attr("height", ttRect_RA.height)

            tooltip_RA.style("visibility", "visible")
                        .attr("x", d3.pointer(event)[0])
                        .attr("y", d3.pointer(event)[1])
                        .text(function(){
                            return "State: " + d.state   //Return the State name
                        })
                        .append("tspan")                  //(G, 2017)
                        .attr("x", d3.pointer(event)[0])
                        .attr("y", d3.pointer(event)[1] + 15)
                        .text(function(){
                            return "Population: " + d.population        //Return the population
                        })
                        .append("tspan")                  //(G, 2017)
                        .attr("x", d3.pointer(event)[0])
                        .attr("y", d3.pointer(event)[1] + 30)
                        .text(function(){
                            return "Rape Rate: " + d.rates_rape
                        })
        }

        function onMouseOut_RA(event, d, i){
            //Set the tooltip's visibility to hidden
            tooltip_RA.style("visibility", "hidden")
            tooltipRect_RA.style("visibility", "hidden")
        }

        function onClickRA(){
            //Selecet all elmenets belonging to thsi class
            //and set their "visibility" back to "visible"
            d3.selectAll(".rate_RA")
                .style("visibility", "visible")
        }

        window.changeBUBBLE_RA = function(yearBUBBLE_RA) {

            //Since the scatter plot is generated as per the current year
            //the code extracts all the records collected for that particular year
            var newBubbleArr_RA = bubbleArrViolentRA.filter(filteringDataBUBBLE_RA)
                
            function filteringDataBUBBLE_RA(d){
                if(d.year == +yearBUBBLE_RA){
                    //If the current year that is being read is the year chosen on the slider
                    //then extract the relative records for that year
                    return d
                }
            }

            drawBubbleChart_RA(newBubbleArr_RA)  
        }

        changeBUBBLE_RA(ra_data)
    })

}
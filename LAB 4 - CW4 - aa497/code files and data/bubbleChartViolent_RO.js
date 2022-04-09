window.callBubbleChart_RO = function(ro_data){

    const marginBUBBLE_RO = {top: 10, right: 30, bottom: 40, left: 155};
    const widthBUBBLE_RO = 400 - marginBUBBLE_RO.left - marginBUBBLE_RO.right;
    const heightBUBBLE_RO = 300 - marginBUBBLE_RO.top - marginBUBBLE_RO.bottom;

    var bubbleArrViolentRO = [];

    //The below function is used for converting each of the csv column data to their original type
    //The column containing string data, are left as it is, whereas the numeric values are converted to 'Number' type
    //The function returns a dictionary array, containing key-value pairs from the csv file

    function toOriginalTypeBUBBLE_RO(d){
        return {
            state: d.state,
            year: Number(d.year),
            
            population: Number(d.population),

            property_ROtes_all: Number(d.property_ROtes_all),
            rates_burglary: Number(d.rates_burglary),
            rates_larceny: Number(d.rates_larceny),
            rates_motor: Number(d.rates_motor),

            violent_ROtes_all: Number(d.violent_ROtes_all),
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
        bubbleArrViolentRO.push(toOriginalTypeBUBBLE_RO(d))
    }).then(function(bubbleData_RO){

        var svgBUBBLE_RO = d3.select('body')
                                .append("svg")
                                .attr("class","bubbleViolentRO")
                                .attr("width", widthBUBBLE_RO + marginBUBBLE_RO.left + marginBUBBLE_RO.right - 7)
                                .attr("height", heightBUBBLE_RO + marginBUBBLE_RO.top + marginBUBBLE_RO.bottom + 18)
                                .attr("transform", "translate(-453, 35)")

        //Creating a group container
        var gBUBBLE_RO = svgBUBBLE_RO.selectAll("g")
                                            .data(bubbleArrViolentRO)
                                            .enter()
                                            .append("g")
                                            .attr("transform", function(d, i) {
                                                return "translate(" + (marginBUBBLE_RO.left+10) + "," + marginBUBBLE_RO.top + ")";
                                            })

        gBUBBLE_RO.append("text")
                    .attr("x", -150)
                    .attr("y", 20)
                    .attr("font-size", "17px")
                    .attr("font-family", "sans-serif")
                    .attr("fill", "#7F4AA4")
                    .text("Robbery")
        //Defining the x-axis 
        var x = d3.scaleLinear()
                    .range([0, widthBUBBLE_RO])
                            
        var xBottomAxis = d3.axisBottom()
                            .scale(x)
                            
        var x_bottom = svgBUBBLE_RO.append("g")
                                    .attr("class", "xaxis_RO")
                                    .attr("transform", "translate(100," + (heightBUBBLE_RO+50) + ")")
                                    .attr("color", "white")
                                    .call(xBottomAxis) 
        //The below is done so that the values on the x-axis appear
        //in a slanted manner                    
        x_bottom.selectAll("text")               
                .style("text-anchor", "end")
                .attr("dx", "-.8em")              //(Shuvo, 2021)
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)" )
                .attr("fill", "#7F4AA4")
                            
        var y = d3.scaleLinear()
                .range([heightBUBBLE_RO, 0])
                                
        var yLeftAxis = d3.axisLeft()
                        .scale(y)
                            
        var y_left = svgBUBBLE_RO.append("g")
                                    .attr("class", "myYaxis_RO")
                                    .attr("transform", "translate(" + (widthBUBBLE_RO-115) + ", 50)")
                                    .attr("color", "white")
                                    .call(yLeftAxis)
                            
        y_left.selectAll("text")
            .attr("fill", "#7F4AA4")
                            
        var gr_RO = svgBUBBLE_RO.append("g")
//Setting the color scale for coloring each of the markers on the plot
        var colorScale_RO = d3.scaleOrdinal()
                                .range(d3.schemePurples[7]);

        var filter_ro = 0

        window.filterData_RO = function(state){
            filter_ro++
            //Seelect all elements under this class and hide all the markers
            //except chosen state's marker                                                                                                                                   
            d3.selectAll(".rate_RO")
                .filter(function(d){
                    return !(d.state == state)
                })
                .style("visibility", "hidden") 
                                                                                                                                                
            if(filter_ro >= 2){
                //Seelect all markers under this class and set their visibility
                //to visible
                d3.selectAll(".rate_RO")
                    .style("visibility", "visible")  
                                                                                                                                                
                filter_ro = 0
                                                                                                                                                
                filterData_RO(state)
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
                    .attr("fill", "#7F4AA4")
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
                .attr("fill", "#7F4AA4")
        }

        function updateColorScale(data){

            colorScale_RO.domain(
                [d3.min(data), d3.max(data)]
            )
        }

        function drawBubbleChart_RO(data){

            svgBUBBLE_RO.append("rect")
                        .attr("x", 370)
                        .attr("y", 30)
                        .attr("fill", "#F8CF40")
                        .attr("width", 60)
                        .attr("height", 20)
                        .on("click", onClickRO)
            
            svgBUBBLE_RO.append("text")
                        .text("Reset Filter")
                        .attr("x", 400)
                        .attr("y", 43)
                        .attr("text-anchor", "middle")
                        .attr("font-size", "12px")
                        .attr("fill", "#0000FF")
                        .on("click", onClickRO)

            var roPop = []
            var roRate = []

            for (var i = 0; i<data.length; i++){
                roPop.push(data[i].population)
                roRate.push(data[i].rates_robbery)
            }
//Call the functions to update the values accordingly
            axes(roPop)
            updateYAxis(roRate)
            updateColorScale(roRate)

            var ro = svgBUBBLE_RO.selectAll(".rate_RO")
                                    .data(data)

                ro.enter()
                    .append("circle")
                    .attr("class", "rate_RO")
                    .merge(ro)
                    .on("mouseover", onMouseOver_RO)
                    .on("mouseout", onMouseOut_RO)
                    .transition()
                    .duration(900)
                    .style("fill", function(d){
                        return colorScale_RO(d.rates_robbery)
                    })
                    .attr("cx", function(d){
                        //setting the x-coordinate of the markers
                        return x(d.population) + 107
                    })
                    .attr("cy", function(d){
                        //setting the y-coordinate of the markers
                        return y(d.rates_robbery) + 50
                    })
                    .attr("r", 5)

            ro.exit().remove()
        }

        var tooltipRect_RO = d3.select(".bubbleViolentRO")
                                .append("g")
                                .append("rect")
                                .style("position", "absolute")
                                .style("visibility", "hidden")
                                .attr("fill", "#695E93")     
                
        var tooltip_RO = d3.select(".bubbleViolentRO")
                            .append("g")
                            .append("text")
                            .attr("class", "roText")
                            .style("position", "absolute")
                            .style("visibility", "hidden")         
                            .attr("fill", "#EFDCF9")         
                            .attr("font-size", "15px")

        var ttRect_RO;

        function onMouseOver_RO(event, d, i){

            ttRect_RO = tooltip_RO.node().getBBox()

            tooltipRect_RO.style("visibility", "visible")
                            .attr("x", d3.pointer(event)[0]) 
                            .attr("y", d3.pointer(event)[1] - 12)
                            .attr("width", ttRect_RO.width)
                            .attr("height", ttRect_RO.height)

            tooltip_RO.style("visibility", "visible")
                        .attr("x", d3.pointer(event)[0])
                        .attr("y", d3.pointer(event)[1])
                        .text(function(){
                            return "State: " + d.state     //Return the State name
                        })
                        .append("tspan")                  //(G, 2017)
                        .attr("x", d3.pointer(event)[0])
                        .attr("y", d3.pointer(event)[1] + 15)
                        .text(function(){
                            return "Population: " + d.population       //Return the population
                        })
                        .append("tspan")                  //(G, 2017)
                        .attr("x", d3.pointer(event)[0])
                        .attr("y", d3.pointer(event)[1] + 30)
                        .text(function(){
                            return "Robbery Rate: " + d.rates_robbery
                        })
        }

        function onMouseOut_RO(event, d, i){
            //Set the tooltip's visibility to hidden
            tooltip_RO.style("visibility", "hidden")
            tooltipRect_RO.style("visibility", "hidden")
        }

        function onClickRO(){
            //Selecet all elmenets belonging to thsi class
            //and set their "visibility" back to "visible"
            d3.selectAll(".rate_RO")
                .style("visibility", "visible")
        }

        window.changeBUBBLE_RO = function(yearBUBBLE_RO) {
            
            //Since the scatter plot is generated as per the current year
            //the code extracts all the records collected for that particular year
            var newBubbleArr_RO = bubbleArrViolentRO.filter(filteringDataBUBBLE_RO)
                
            function filteringDataBUBBLE_RO(d){
                if(d.year == +yearBUBBLE_RO){
                    //If the current year that is being read is the year chosen on the slider
                    //then extract the relative records for that year
                    return d
                }
            }

            drawBubbleChart_RO(newBubbleArr_RO)  
        }

        changeBUBBLE_RO(ro_data)
    })

}
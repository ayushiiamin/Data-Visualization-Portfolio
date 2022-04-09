
//Global function
window.callBubbleChart_MU = function(mu_data){

    const marginBUBBLE_MU = {top: 10, right: 30, bottom: 40, left: 155};
    const widthBUBBLE_MU = 400 - marginBUBBLE_MU.left - marginBUBBLE_MU.right;
    const heightBUBBLE_MU = 300 - marginBUBBLE_MU.top - marginBUBBLE_MU.bottom;

    var bubbleArrViolentMU = [];

    //The below function is used for converting each of the csv column data to their original type
    //The column containing string data, are left as it is, whereas the numeric values are converted to 'Number' type
    //The function returns a dictionary array, containing key-value pairs from the csv file
    function toOriginalTypeBUBBLE_MU(d){
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
        bubbleArrViolentMU.push(toOriginalTypeBUBBLE_MU(d))
    }).then(function(bubbleData_MU){

        var svgBUBBLE_MU = d3.select('body')
                                .append("svg")
                                .attr("class","bubbleViolentMU")
                                .attr("width", widthBUBBLE_MU + marginBUBBLE_MU.left + marginBUBBLE_MU.right - 7)
                                .attr("height", heightBUBBLE_MU + marginBUBBLE_MU.top + marginBUBBLE_MU.bottom + 18)
                                .attr("transform", "translate(-453, 27)")

        //Creating a group container
        var gBUBBLE_MU = svgBUBBLE_MU.selectAll("g")
                                            .data(bubbleArrViolentMU)
                                            .enter()
                                            .append("g")
                                            .attr("transform", function(d, i) {
                                                return "translate(" + (marginBUBBLE_MU.left+10) + "," + marginBUBBLE_MU.top + ")";
                                            })

        gBUBBLE_MU.append("text")
                    .attr("x", -150)
                    .attr("y", 20)
                    .attr("font-size", "17px")
                    .attr("font-family", "sans-serif")
                    .attr("fill", "#E80000")
                    .text("Murder")
        //Defining the x-axis 
        var x = d3.scaleLinear()
                    .range([0, widthBUBBLE_MU])
                            
        var xBottomAxis = d3.axisBottom()
                            .scale(x)
                            
        var x_bottom = svgBUBBLE_MU.append("g")
                                    .attr("class", "xaxis_MU")
                                    .attr("transform", "translate(100," + (heightBUBBLE_MU+50) + ")")
                                    .attr("color", "white")
                                    .call(xBottomAxis) 
        //The below is done so that the values on the x-axis appear
        //in a slanted manner                    
        x_bottom.selectAll("text")               
                .style("text-anchor", "end")
                .attr("dx", "-.8em")              //(Shuvo, 2021)
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)" )
                .attr("fill", "#E80000")
                            
        var y = d3.scaleLinear()
                .range([heightBUBBLE_MU, 0])
                                
        var yLeftAxis = d3.axisLeft()
                        .scale(y)
                            
        var y_left = svgBUBBLE_MU.append("g")
                                    .attr("class", "myYaxis_MU")
                                    .attr("transform", "translate(" + (widthBUBBLE_MU-115) + ", 50)")
                                    .attr("color", "white")
                                    .call(yLeftAxis)
                            
        y_left.selectAll("text")
            .attr("fill", "#E80000")
                            
        var gr_MU = svgBUBBLE_MU.append("g")
//Setting the color scale for coloring each of the markers on the plot
        var colorScale_MU = d3.scaleOrdinal()
                                .range(d3.schemeReds[7]);

        var filter_mu = 0

        window.filterData_MU = function(state){
            filter_mu++
            
            //Seelect all elements under this class and hide all the markers
            //except chosen state's marker
            d3.selectAll(".rate_MU")
                .filter(function(d){
                    return !(d.state == state)
                })
                .style("visibility", "hidden") 
                                                                                                
            if(filter_mu >= 2){
                //Seelect all markers under this class and set their visibility
                //to visible
                d3.selectAll(".rate_MU")
                    .style("visibility", "visible")  
                                                                                                
                filter_mu = 0
                                                                                                
                filterData_MU(state)
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
                    .attr("fill", "#E80000")
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
                .attr("fill", "#E80000")
        }

        function updateColorScale(data){

            colorScale_MU.domain(
                [d3.min(data), d3.max(data)]
            )
        }

        function drawBubbleChart_MU(data){

            svgBUBBLE_MU.append("rect")
                        .attr("x", 370)
                        .attr("y", 30)
                        .attr("fill", "#F8CF40")
                        .attr("width", 60)
                        .attr("height", 20)
                        .on("click", onClickMU)
            
            svgBUBBLE_MU.append("text")
                        .text("Reset Filter")
                        .attr("x", 400)
                        .attr("y", 43)
                        .attr("text-anchor", "middle")
                        .attr("font-size", "12px")
                        .attr("fill", "#0000FF")
                        .on("click", onClickMU)

            var muPop = []
            var muRate = []

            for (var i = 0; i<data.length; i++){
                muPop.push(data[i].population)
                muRate.push(data[i].rates_murder)
            }
            //Call the functions to update the values accordingly
            axes(muPop)
            updateYAxis(muRate)
            updateColorScale(muRate)

            var mu = svgBUBBLE_MU.selectAll(".rate_MU")
                                    .data(data)

                mu.enter()
                    .append("circle")
                    .attr("class", "rate_MU")
                    .merge(mu)
                    .on("mouseover", onMouseOver_MU)
                    .on("mouseout", onMouseOut_MU)
                    .transition()
                    .duration(900)
                    .style("fill", function(d){
                        return colorScale_MU(d.rates_murder)
                    })
                    .attr("cx", function(d){
                        //setting the x-coordinate of the markers
                        return x(d.population) + 107
                    })
                    .attr("cy", function(d){
                        //setting the y-coordinate of the markers
                        return y(d.rates_murder) + 50
                    })
                    .attr("r", 5)

            mu.exit().remove()
        }

        var tooltipRect_MU = d3.select(".bubbleViolentMU")
                                .append("g")
                                .append("rect")
                                .style("position", "absolute")
                                .style("visibility", "hidden")
                                .attr("fill", "#695E93")     
                
        var tooltip_MU = d3.select(".bubbleViolentMU")
                            .append("g")
                            .append("text")
                            .attr("class", "muText")
                            .style("position", "absolute")
                            .style("visibility", "hidden")         
                            .attr("fill", "#EFDCF9")         
                            .attr("font-size", "15px")

        var ttRect_MU;

        function onMouseOver_MU(event, d, i){

            ttRect_MU = tooltip_MU.node().getBBox()

            tooltipRect_MU.style("visibility", "visible")
                            .attr("x", d3.pointer(event)[0]) 
                            .attr("y", d3.pointer(event)[1] - 12)
                            .attr("width", ttRect_MU.width)
                            .attr("height", ttRect_MU.height)

            tooltip_MU.style("visibility", "visible")
                        .attr("x", d3.pointer(event)[0])
                        .attr("y", d3.pointer(event)[1])
                        .text(function(){
                            return "State: " + d.state     //Return the State name
                        })
                        .append("tspan")                  //(G, 2017)
                        .attr("x", d3.pointer(event)[0])
                        .attr("y", d3.pointer(event)[1] + 15)
                        .text(function(){
                            return "Population: " + d.population  //Return the population
                        })
                        .append("tspan")                  //(G, 2017)
                        .attr("x", d3.pointer(event)[0])
                        .attr("y", d3.pointer(event)[1] + 30)
                        .text(function(){
                            return "Murder Rate: " + d.rates_murder
                        })
        }

        function onMouseOut_MU(event, d, i){
            //Set the tooltip's visibility to hidden
            tooltip_MU.style("visibility", "hidden")
            tooltipRect_MU.style("visibility", "hidden")
        }

        function onClickMU(){
            //Selecet all elmenets belonging to thsi class
            //and set their "visibility" back to "visible"
            d3.selectAll(".rate_MU")
                .style("visibility", "visible")
        }

        window.changeBUBBLE_MU = function(yearBUBBLE_MU) {
            //Since the scatter plot is generated as per the current year
            //the code extracts all the records collected for that particular year
            var newBubbleArr_MU = bubbleArrViolentMU.filter(filteringDataBUBBLE_MU)
                
            function filteringDataBUBBLE_MU(d){
                if(d.year == +yearBUBBLE_MU){
                    //If the current year that is being read is the year chosen on the slider
                    //then extract the relative records for that year
                    return d
                }
            }

            drawBubbleChart_MU(newBubbleArr_MU)  
        }

        changeBUBBLE_MU(mu_data)
    })
}
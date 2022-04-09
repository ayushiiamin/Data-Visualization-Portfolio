//REFERENCES - 

// 1) Ocks.org. (2018). getBBox. [online] 
//    Available at: https://bl.ocks.org/mbostock/1160929

// 2) G, S. (2017). D3.js append tspan to text element. [online] Stack Overflow. 
//    Available at: https://stackoverflow.com/questions/42215205/d3-js-append-tspan-to-text-element

// 2) Shuvo, N.A. (2021). X Axis text labels are not rotating in d3. [online] Stack Overflow. 
//    Available at: https://stackoverflow.com/questions/65920124/x-axis-text-labels-are-not-rotating-in-d3


//Global function
//Within this function, the SVG object will be created for the scatter plot
//This function is called when the user selects the "Violent" crime category
window.callBubbleChart_AS = function(as_data){


    const marginBUBBLE_AS = {top: 10, right: 30, bottom: 40, left: 155};
    const widthBUBBLE_AS = 400 - marginBUBBLE_AS.left - marginBUBBLE_AS.right;
    const heightBUBBLE_AS = 300 - marginBUBBLE_AS.top - marginBUBBLE_AS.bottom;

    var bubbleArrViolentAS = [];

    //The below function is used for converting each of the csv column data to their original type
    //The column containing string data, are left as it is, whereas the numeric values are converted to 'Number' type
    //The function returns a dictionary array, containing key-value pairs from the csv file
    function toOriginalTypeBUBBLE_AS(d){
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
        bubbleArrViolentAS.push(toOriginalTypeBUBBLE_AS(d))
    }).then(function(bubbleData_AS){

        var svgBUBBLE_AS = d3.select('body')
                                .append("svg")
                                .attr("class","bubbleViolentAS")
                                .attr("width", widthBUBBLE_AS + marginBUBBLE_AS.left + marginBUBBLE_AS.right - 7)
                                .attr("height", heightBUBBLE_AS + marginBUBBLE_AS.top + marginBUBBLE_AS.bottom + 18)
                                .attr("transform", "translate(10, -340)")

        //Creating a group container
        var gBUBBLE_AS = svgBUBBLE_AS.selectAll("g")
                                            .data(bubbleArrViolentAS)
                                            .enter()
                                            .append("g")
                                            .attr("transform", function(d, i) {
                                                return "translate(" + (marginBUBBLE_AS.left+10) + "," + marginBUBBLE_AS.top + ")";
                                            })
         
        //To the above created group container, we append and SVG text element
        //This SVG text element serves as the heading for the scatter plot
         gBUBBLE_AS.append("text")
                    .attr("x", -150)
                    .attr("y", 20)
                    .attr("font-size", "17px")
                    .attr("font-family", "sans-serif")
                    .attr("fill", "#FF8300")
                    .text("Assault")
        
        //Defining the x-axis for the scatter plot
        var x = d3.scaleLinear()
                    .range([0, widthBUBBLE_AS])
        
        //Creating a horizontal bottom x-axis using the data generated for the x-axis above
        var xBottomAxis = d3.axisBottom()
                            .scale(x)
        
        //Adding the bottom x-axis to the svg
        var x_bottom = svgBUBBLE_AS.append("g")
                                    .attr("class", "xaxis_AS")
                                    .attr("transform", "translate(100," + (heightBUBBLE_AS+50) + ")")
                                    .attr("color", "white")
                                    .call(xBottomAxis) 
        
        //The below is done so that the values on the x-axis appear
        //in a slanted manner
        x_bottom.selectAll("text")               
                .style("text-anchor", "end")
                .attr("dx", "-.8em")              //(Shuvo, 2021)
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)" )
                .attr("fill", "#FF8300")
        
        //Defining the y-axis for the scatter plot 
        var y = d3.scaleLinear()
                .range([heightBUBBLE_AS, 0])
        
            //Creating a vertical left y-axis using the data generated for the y-axis above
        var yLeftAxis = d3.axisLeft()
                        .scale(y)
         //Adding the left y-axis to the svg                   
        var y_left = svgBUBBLE_AS.append("g")
                                    .attr("class", "myYaxis_AS")
                                    .attr("transform", "translate(" + (widthBUBBLE_AS-115) + ", 50)")
                                    .attr("color", "white")
                                    .call(yLeftAxis)
                            
        y_left.selectAll("text")
            .attr("fill", "#FF8300")
                            
        var gr_AS = svgBUBBLE_AS.append("g")


        //Setting the color scale for coloring each of the markers on the plot
        var colorScale_AS = d3.scaleOrdinal()
                                .range(d3.schemeOranges[7]);

        var filter_as = 0

        window.filterData_AS = function(state){
            filter_as++
            
            //Seelect all elements under this class and hide all the markers
            //except chosen state's marker
            d3.selectAll(".rate_AS")
                .filter(function(d){
                    return !(d.state == state)
                })
                .style("visibility", "hidden") 
                                                                        
            if(filter_as >= 2){
                //Seelect all markers under this class and set their visibility
                //to visible
                d3.selectAll(".rate_AS")
                    .style("visibility", "visible")  
                
                    //Reset the counter to 0
                filter_as = 0
                     //Call the function again to hide the non-required markers                                                   
                filterData_AS(state)
            }
        }

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
                    .attr("dx", "-.8em")              //(Shuvo, 2021)
                    .attr("dy", ".15em")
                    .attr("transform", "rotate(-65)" )
                    .attr("fill", "#FF8300")
        }

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
                .attr("fill", "#FF8300")
        }

        function updateColorScale(data){
            //The domain is set according to the min and max values present in the input
            //data fed to this function
            colorScale_AS.domain(
                [d3.min(data), d3.max(data)]
            )
        }

        function drawBubbleChart_AS(data){

            svgBUBBLE_AS.append("rect")
                        .attr("x", 370)
                        .attr("y", 30)
                        .attr("fill", "#F8CF40")
                        .attr("width", 60)
                        .attr("height", 20)
                        //On clicking on the button, the below function is triggered 
                        //which resets the "visibility" attribute to "visible" for all markers present
                        //on the dashboard
                        .on("click", onClickAS)
            
            svgBUBBLE_AS.append("text")
                        .text("Reset Filter")
                        .attr("x", 400)
                        .attr("y", 43)
                        .attr("text-anchor", "middle")
                        .attr("font-size", "12px")
                        .attr("fill", "#0000FF")
                        //On clicking on the button, the below function is triggered 
                        //which resets the "visibility" attribute to "visible" for all markers present
                        //on the dashboard
                        .on("click", onClickAS)

            var asPop = []
            var asRate = []

            for (var i = 0; i<data.length; i++){

                //To the empty array defined above, store the population values
                //for all the states and federal district
                asPop.push(data[i].population)

                //To the empty array defined above, store the Motor crime rate values
                //for all the states and federal district
                asRate.push(data[i].rates_assault)
            }

            //Call the functions to update the values accordingly
            axes(asPop)
            updateYAxis(asRate)
            updateColorScale(asRate)

            var as = svgBUBBLE_AS.selectAll(".rate_AS")
                                    .data(data)

                as.enter()
                    .append("circle")
                    .attr("class", "rate_AS")
                    .merge(as)
                    .on("mouseover", onMouseOver_AS)
                    .on("mouseout", onMouseOut_AS)
                    .transition()
                    .duration(900)
                    .style("fill", function(d){
                        //Set the the markers color based on what the color scale generates for te given inout value
                        return colorScale_AS(d.rates_assault)
                    })
                    .attr("cx", function(d){
                        //Setting the x-ccordinate of the markers
                        return x(d.population) + 107
                    })
                    .attr("cy", function(d){
                        //setting the y-coordinate of the markers
                        return y(d.rates_assault) + 50
                    })
                    .attr("r", 5)

            as.exit().remove()
        }

        var tooltipRect_AS = d3.select(".bubbleViolentAS")
                            .append("g")
                            .append("rect")
                            .style("position", "absolute")
                            .style("visibility", "hidden")
                            .attr("fill", "#695E93")     
                            
        var tooltip_AS = d3.select(".bubbleViolentAS")
                            .append("g")
                            .append("text")
                            .attr("class", "asText")
                            .style("position", "absolute")
                            .style("visibility", "hidden")         
                            .attr("fill", "#EFDCF9")         
                            .attr("font-size", "15px")

        var ttRect_AS;

        function onMouseOver_AS(event, d, i){

            ttRect_AS = tooltip_AS.node().getBBox()
            //Setting the attrbutes
            tooltipRect_AS.style("visibility", "visible")
                        .attr("x", d3.pointer(event)[0]) 
                        .attr("y", d3.pointer(event)[1] - 12)
                        .attr("width", ttRect_AS.width)
                        .attr("height", ttRect_AS.height)

            tooltip_AS.style("visibility", "visible")
                    .attr("x", d3.pointer(event)[0])
                    .attr("y", d3.pointer(event)[1])
                    .text(function(){
                        return "State: " + d.state    //Return the State name
                    })
                    .append("tspan")                  //(G, 2017)
                    .attr("x", d3.pointer(event)[0])
                    .attr("y", d3.pointer(event)[1] + 15)
                    .text(function(){
                        return "Population: " + d.population    //Return the Population value
                    })
                    .append("tspan")                  //(G, 2017)
                    .attr("x", d3.pointer(event)[0])
                    .attr("y", d3.pointer(event)[1] + 30)
                    .text(function(){ 
                        return "Assault Rate: " + d.rates_assault    //Return the assault crime rate value
                    })
        }

        function onMouseOut_AS(event, d, i){
            //Set the tooltip's visibility to hidden
            tooltip_AS.style("visibility", "hidden")
            tooltipRect_AS.style("visibility", "hidden")
        }

        function onClickAS(){
            //Selecet all elmenets belonging to thsi class
            //and set their "visibility" back to "visible"
            d3.selectAll(".rate_AS")
                .style("visibility", "visible")
        }

        window.changeBUBBLE_AS = function(yearBUBBLE_AS){

            //Since the scatter plot is generated as per the current year
            //the code extracts all the records collected for that particular year
            var newBubbleArr_AS = bubbleArrViolentAS.filter(filteringDataBUBBLE_AS)
                
            function filteringDataBUBBLE_AS(d){
                if(d.year == +yearBUBBLE_AS){
                    //If the current year that is being read is the year chosen on the slider
                    //then extract the relative records for that year
                    return d
                }
            }

            drawBubbleChart_AS(newBubbleArr_AS)  
        }

        changeBUBBLE_AS(as_data)
    })
}
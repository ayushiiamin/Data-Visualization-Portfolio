//REFERENCES - 

//1) Holtz, Y. (2022). Displaying label on a circular barplot in d3.js. [online] D3-graph-gallery.com. 
// Available at: https://d3-graph-gallery.com/graph/circular_barplot_label.html



//Global function
//Within this function, the SVG object will be created for the circular bar plot
//This function is called when the user selects the "Violent" crime category
window.callCircularBarplot_violent = function(violent_data){

    //Setting the dimensions
    const marginCIRCBARPLOT_violent = {top: 100, right: 0, bottom: 0, left: 0};
    const widthCIRCBARPLOT_violent = 465 - marginCIRCBARPLOT_violent.left - marginCIRCBARPLOT_violent.right;
    const heightCIRCBARPLOT_violent = 465 - marginCIRCBARPLOT_violent.top - marginCIRCBARPLOT_violent.bottom;

    //Initializing an empty array to store the data extracted from the csv file
    var circularArrViolent = [];


    //The below function is used for converting each of the csv column data to their original type
    //The column containing string data, are left as it is, whereas the numeric values are converted to 'Number' type
    //The function returns a dictionary array, containing key-value pairs from the csv file
    function toOriginalTypeCIRCBARPLOT_violent(d){
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

    //Loading the csv file 
    d3.csv("data/crimeUS.csv", function(d, i){

        //Using the function to convert each data value into their respective data type
        //The result is pushed to an empty array
        circularArrViolent.push(toOriginalTypeCIRCBARPLOT_violent(d))
    }).then(function(circData_violent){

        //Creating the SVG with both a width and height of 465
        var svgCIRCBARPLOT_violent = d3.select('body')
                                .append("svg")
                                .attr("class","circularBarplotViolent")
                                .attr("width", widthCIRCBARPLOT_violent + marginCIRCBARPLOT_violent.left + marginCIRCBARPLOT_violent.right)
                                .attr("height", heightCIRCBARPLOT_violent + marginCIRCBARPLOT_violent.top + marginCIRCBARPLOT_violent.bottom)
                                .attr("transform", "translate(20, 20)")
                                .append("g")
                                .attr("transform", "translate(" + (widthCIRCBARPLOT_violent/2+marginCIRCBARPLOT_violent.left - 20) + "," + (heightCIRCBARPLOT_violent/2+marginCIRCBARPLOT_violent.top - 70) + ")")

        //Creating a group container
        var gCIRCBARPLOT_violent = svgCIRCBARPLOT_violent.selectAll("g")
                                                .data(circularArrViolent)
                                                .enter()
                                                .append("g")
                                                .attr("transform", function(d, i) {
                                                    return "translate(" + (marginCIRCBARPLOT_violent.left+10) + "," + marginCIRCBARPLOT_violent.top + ")";
                                                })
        
        //Manually defining the inner radius for the circular bar plot arcs
        const innerRadius = 90

        //Initializing the outer radius of the circular bar plot arcs
        //These are generated by taking the minimum of the width and height (465) defined above
        //After computing the result, the average is taken
        const outerRadius = Math.min(widthCIRCBARPLOT_violent, heightCIRCBARPLOT_violent)/2;       //(Holtz, 2022)
        
        //Defining the x-axis for the circular bar plot chart 
        var x = d3.scaleBand()
                    //The range is till (2*Math.PI) to ensure a full circle appears for the circular bar chart
                    //instead of a semi circle
                    .range([0, 2 * Math.PI])     //(Holtz, 2022)
                    .align(0)   
                    .domain(circularArrViolent.map(function(d) {
                        //The domain is set according to the current state name that is being read
                        return d.state; 
                    }));
        
        //Defining the y-axis for the circular bar plot
        var y = d3.scaleRadial()
                    .range([innerRadius, outerRadius]) 
        
        //The below function is used for updating y-axis values dynamically
        function updateYAxis(data){

            //The domain is set according to the max value present in the input
            //data fed to this function
            y.domain(
                [0, d3.max(data)]
            )
        }

        //Initializing a counter to keep track of the number of times the code 
        //to generate the circular bar plot labels is called
        //This counter acts as a flag variable
        var cCircularBarPlot_violent = 0

        //The below function generates the circular bar plot based on the data provided as input to the function
        function drawCircularPlot(data){

            //Initializing an empty array to store all the Violent rate values recorded for all states in 
            //a particular year
            var violentArr = []

            //For loop to iterate over the input data
            for (var i = 0; i<data.length; i++){

                //To the empty array defined above, store the Violent crime rate values
                //for all the states and federal district
                violentArr.push(data[i].violent_rates_all)
            }

            //Call the function to update the y-axis values accordingly
            updateYAxis(violentArr)

            //Creating the circular bar plot based on the dataset provided
            var cbv = svgCIRCBARPLOT_violent.selectAll(".circular_violent")
                                            .data(data)
            
                cbv.enter()
                .append("path")
                .attr("class", "circular_violent")    //The bars belong to this class
                .merge(cbv)
                .transition()
                .duration(900)
                .attr("fill", "#A98AB0")
                //Manually setting the values of the various arc() properties
                .attr("d", d3.arc()              //(Holtz, 2022)
                    .innerRadius(innerRadius)          //The inner radius is already defined above
                    .outerRadius(function(d) { 
                        //Set the outer radius based on the Violent rate values and the scale defined for y axis
                        return y(d['violent_rates_all']); 
                    })
                    .startAngle(function(d) { 
                        //Set the start angle based on the states and the scale defined for x axis
                        return x(d.state); 
                    })
                    .endAngle(function(d) { 
                        //Set the end angle based on the states and the scale defined for x axis
                        //and add the bandwidth of the x axis to the above result
                        return x(d.state) + x.bandwidth();  //(Holtz, 2022)
                    })
                    //Add padding between each of the bars present in the chart
                    .padAngle(0.01)
                    .padRadius(innerRadius)
                )  
            
            //Check if the counter is 1
            if ((cCircularBarPlot_violent == 1)){

                    //If the counter is 1, then don't add any extra labels to the bar plot
                    svgCIRCBARPLOT_violent.selectAll("g")
                                            .data(data)
                                            .attr("class", "textClass_violent")
                                            .join("g")
                                                .attr("text-anchor", function(d){
                                                    //To set the text-anchor attribute, the following logic is used
                                                    //First, calculate the following equation: (x(d.state) + x.bandwidth() / 2 + Math.PI)
                                                    //Then, take the modulus of the above computed result and (2 * Math.PI) [Math.PI = 3.14....]
                                                    //If this output is less than 3.14....., then true is automatically returned
                                                    //then set the text-anchor towards the SVG object border (end)
                                                    //Else, set the text-anchor towards the bar (start)
                                                    if( ((x(d.state) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI) == true){   //(Holtz, 2022)
                                                        return "end"
                                                    }
                                                    else{
                                                        return "start"
                                                    }
                                                })
                                                //The below transform is done to position the state labels according to their respective bar
                                                //and around the circular bar plot
                                                .attr("transform", function(d){
                                                    return "rotate(" + ((x(d.state) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+ "translate(" + (y(d['violent_rates_all'])+10) + ", 0)";   //(Holtz, 2022)
                                                })
                                                //Adding the SVG text element
                                                .append("text")
                                                .text(function(d){
                                                    return(d.state)     //The name of the state serves as the label
                                                })
                                                .attr("transform", function(d){
                                                    //To flip the label accordingly, the following logic is used
                                                    //First, calculate the following equation: (x(d.state) + x.bandwidth() / 2 + Math.PI)
                                                    //Then, take the modulus of the above computed result and (2 * Math.PI) [Math.PI = 3.14....]
                                                    //If this output is less than 3.14....., then true is automatically returned
                                                    //Set the transform attribute as rotate(180)
                                                    //Else, flip the label on teh opposite side
                                                    if( ((x(d.state) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI) == true){  //(Holtz, 2022)
                                                        return "rotate(180)"
                                                    }
                                                    else{
                                                        return "rotate(0)"
                                                    }
                                                })
                                                .style("font-size", "11px")
                                                .style("fill", "#29A0B1")
                                                .attr("alignment-baseline", "middle")
            }
            //Check if the counter is 0
            else if((cCircularBarPlot_violent == 0)){

                //Increase the counter to 1
                cCircularBarPlot_violent++

                //Since the counter value is 0, add the labels
                svgCIRCBARPLOT_violent.append("g")
                                    .selectAll("g")
                                    .data(data)
                                    .attr("class", "textClass_violent")
                                    .join("g")
                                        .attr("text-anchor", function(d){
                                            //To set the text-anchor attribute, the following logic is used
                                            //First, calculate the following equation: (x(d.state) + x.bandwidth() / 2 + Math.PI)
                                            //Then, take the modulus of the above computed result and (2 * Math.PI) [Math.PI = 3.14....]
                                            //If this output is less than 3.14....., then true is automatically returned
                                            //then set the text-anchor towards the SVG object border (end)
                                            //Else, set the text-anchor towards the bar (start)
                                            if( ((x(d.state) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI) == true){     //(Holtz, 2022)
                                                return "end"
                                            }
                                            else{
                                                return "start"
                                            }
                                        })
                                        //The below transform is done to position the state labels according to their respective bar
                                        //and around the circular bar plot
                                        .attr("transform", function(d){
                                            return "rotate(" + ((x(d.state) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+ "translate(" + (y(d['violent_rates_all'])+10) + ", 0)";   //(Holtz, 2022)
                                        })
                                        //Adding the SVG text element
                                        .append("text")
                                        .text(function(d){
                                            return(d.state)       //The name of the state serves as the label
                                        })
                                        .attr("transform", function(d){
                                            //To flip the label accordingly, the following logic is used
                                            //First, calculate the following equation: (x(d.state) + x.bandwidth() / 2 + Math.PI)
                                            //Then, take the modulus of the above computed result and (2 * Math.PI) [Math.PI = 3.14....]
                                            //If this output is less than 3.14....., then true is automatically returned
                                            //Set the transform attribute as rotate(180)
                                            //Else, flip the label on teh opposite side
                                            if( ((x(d.state) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI) == true){   //(Holtz, 2022)
                                                return "rotate(180)"
                                            }
                                            else{
                                                return "rotate(0)"
                                            }
                                        })
                                        .style("font-size", "11px")
                                        .style("fill", "#29A0B1")
                                        .attr("alignment-baseline", "middle")
                
            }
            
            //Remove the previous bars as the dashboard is updated
            cbv.exit().remove() 
        
        }
        
        //Global function that is used extracts the data
        window.changeCIRCBARPLOT_violent = function(yearCIRCBARPLOT_violent) {

            //Since the circular bar plot is generated as per the current year
            //the code extracts all the records collected for that particular year
            var newCircularBarPlotArr_violent = circularArrViolent.filter(filteringDataCIRCBARPLOT_violent)
                
            function filteringDataCIRCBARPLOT_violent(d){
                if(d.year == +yearCIRCBARPLOT_violent){
                    //If the current year that is being read is the year chosen on the slider
                    //then extract the relative records for that year
                    return d
                }
            }
            //Call the function used for creating the circular bar plot
            //Pass the newly created array as an argument to the function
            drawCircularPlot(newCircularBarPlotArr_violent)  
        }
        
        changeCIRCBARPLOT_violent(violent_data)
    })

}
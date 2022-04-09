//REFERENCES - 

// 1) Holtz, Y. (2022). Basic choropleth map in d3.js. [online] D3-graph-gallery.com. 
//    Available at: https://d3-graph-gallery.com/graph/choropleth_basic.html

// 2) Ocks.org. (2022). Basic US State Map - D3. [online] 
//    Available at: http://bl.ocks.org/michellechandra/0b2ce4923dc9b5809922?msclkid=5fd820d1b04c11ec96257d35f02359f2

// 3) Ocks.org. (2018). getBBox. [online] 
//    Available at: https://bl.ocks.org/mbostock/1160929

// 4) G, S. (2017). D3.js append tspan to text element. [online] Stack Overflow. 
//    Available at: https://stackoverflow.com/questions/42215205/d3-js-append-tspan-to-text-element

// 5) B.Oss (2019). How to display the slider value in html? [online] Stack Overflow. 
//    Available at: https://stackoverflow.com/questions/56033426/how-to-display-the-slider-value-in-html




//Defining the dimensions and margins of the map
const margin = {top: 30, right: 30, bottom: 70, left: 155};
const widthSVG = 1060 - margin.left - margin.right;
const heightSVG = 750 - margin.top - margin.bottom;

//Initializing an empty array to store the data extracted from the 2 csv files
var mapArr = [];
var financeArr = []


//The below 2 functions are used for converting each of the csv column data to their original type
//The column containing string data, are left as it is, whereas the numeric values are converted to 'Number' type
//The function returns a dictionary array, containing key-value pairs from the csv file
function toOriginalType(d){
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

//The below function is of a similar format as the above
function toOriginalTypeFINANCE(d){
    return {
        state: d.state,
        year: Number(d.year),
        
        capital_outlay_total: Number(d.capital_outlay_total),

        revenue_total: Number(d.revenue_total),
        expenditure_total: Number(d.expenditure_total),
        general_expenditure_total: Number(d.general_expenditure_total),
        general_revenue_total: Number(d.general_revenue_total),

        insurance_trust_revenue_total: Number(d.insurance_trust_revenue_total),
        intergovernmental_total: Number(d.intergovernmental_total),
        license_tax_total: Number(d.license_tax_total),
        selective_sales_tax_total: Number(d.selective_sales_tax_total),
        tax_total: Number(d.tax_total),

        correction_total: Number(d.correction_total),
        education_total: Number(d.education_total),
        assistance_subsidies: Number(d.assistance_subsidies),
        cash_securities_total: Number(d.cash_securities_total),

        health_total_txpenditure: Number(d.health_total_txpenditure),
        intergovernmental_expenditure: Number(d.intergovernmental_expenditure),
        intergovernmental_combined_unallocable: Number(d.intergovernmental_combined_unallocable),
        natural_resources_construction: Number(d.natural_resources_construction),
        utilities_current_operation: Number(d.utilities_current_operation),
        welfare_institution_total_expenditure: Number(d.welfare_institution_total_expenditure),
        parks_total_expenditure: Number(d.parks_total_expenditure),
        highways_total_expenditure: Number(d.highways_total_expenditure),
        debt_at_end_of_fiscal_year: Number(d.debt_at_end_of_fiscal_year),
        insurance_benefits_and_repayments: Number(d.insurance_benefits_and_repayments),
        interest_on_debt: Number(d.interest_on_debt),
        interest_on_general_debt: Number(d.interest_on_general_debt),
        miscellaneous_general_revenue: Number(d.miscellaneous_general_revenue),
        other_taxes: Number(d.other_taxes),
        police_protection: Number(d.police_protection)
    };
}

//Loading the csv file which contains the data related to the finance of the US
d3.csv("data/financeUS.csv", function(d,i){
    //Using the toOriginalTypeFINANCE() function for converting each data value into their respective data type
    financeArr.push(toOriginalTypeFINANCE(d))
})

//Loading the csv file which contains the data related to the crime rate of the US (the main dataset)
d3.csv("data/crimeUS.csv", function(d, i){
    mapArr.push(toOriginalType(d))
}).then(function(mapData){

    //Creating an svg for the map
    var svg = d3.select('body')
                .append("svg")
                .attr("class","map")
                .attr("transform", "translate(10, 10)")
                .attr("width", widthSVG + margin.left + margin.right)
                .attr("height", heightSVG + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                "translate(" + 0 + "," + 10 + ")");


    //The below code is used for building the projection of the map
    //This is used for converting each of the coordinates
    //to SVG pixels so that the map can be displayed as an SVG image
    //The geoAlbersUsa() is used so that the map of Alaska and Hawaii appear below the main body 
    //of the US, so that much space isn't wasted on the SVG
    var mapProjection = d3.geoAlbersUsa()                   //(Ocks.org, 2022)
                            .scale(520)
                            .translate([220, 140])


    //Defining the color scale for the choropleth map
    //The range is defined dynamically below via a local function
    const colorScale = d3.scaleThreshold()                 //(Holtz, 2022)
                            .domain([1000, 32000])

    
    //Loading the JSON file (publicly available on https://github.com/PublicaMundi/MappingAPI/blob/master/data/geojson/us-states.json )
    d3.json("data/us-states.json").then(function(data){
      
      //When a user selects an option on the radio buttons, the below function gets triggered
      window.callMap = function(dat1){

        //Storing the selected option in a loacl variable called selectedOption
        var selectedOption;
            selectedOption = dat1

        //Since the max and min value of the slider isn't set on the main HTML page
        //The code uses D3 to set the respective values by accessing the ID of the slider
        //and by using the "min", "max", and "value" attributes of the slider
        //Since the min value of the year in the dataset is 1965, the "min" attribute of the slider 
        //is set as 1965
        //For the similar reason, 2019 is set as the "max" attribute value
        d3.select("#yearCrime")
            .attr("min", 1965)
            .attr("max", 2019)
            .attr("value", 1965)

            var currentYear;
            var testMap;

            //Accessing the <span> and slider elements
            var slider = document.getElementById("yearCrime");
            var output = document.getElementById("displayYear");

            //The below is done, so that the chosen year appears (within the span tag) beside the 
            //slider (on the left side of the slider)
            output.innerHTML = slider.value;           //(B.Oss, 2019)

            //Storing the current value of the slider in a local variable
            currentYear = slider.value;

            //Sending the current value of the slider to the global functions present in various 
            //JavaScript files
            change(currentYear)
            changePIE(currentYear)

            //Checking if the chosen option is the Property crime category
            if(selectedOption == "Property"){

                //Since elements belonging to the bubbleViolentAS class come under the
                //Violent category, the code removes them
                d3.selectAll(".bubbleViolentAS")           
                    .remove()
                
                //Since elements belonging to the bubbleViolentMU class come under the
                //Violent category, the code removes them
                d3.selectAll(".bubbleViolentMU")                 
                    .remove()
                
                //Since elements belonging to the bubbleViolentRA class come under the
                //Violent category, the code removes them
                d3.selectAll(".bubbleViolentRA")           
                    .remove()

                //Since elements belonging to the bubbleViolentRO class come under the
                //Violent category, the code removes them
                d3.selectAll(".bubbleViolentRO")           
                    .remove()

                //Since elements belonging to the circularBarplotViolent class come under the
                //Violent category, the code removes them
                d3.selectAll(".circularBarplotViolent")          
                    .remove()

                //Since elements belonging to the areaViolent class come under the
                //Violent category, the code removes them
                d3.selectAll(".areaViolent")          
                    .remove()
                
                //Call only the global functions that deal with the Property crime category 
                //and subcategories of Property crime
                callCircularBarplot_property(currentYear)    
                callBubbleChart_BU(currentYear)
                callBubbleChart_LA(currentYear)
                callBubbleChart_MO(currentYear)
                callAREA_property()
            }

            //Checking if the chosen option is the Violent crime category
            else if(selectedOption == "Violent"){

                //Since elements belonging to the bubblePropertyBU class come under the
                //Property category, the code removes them
                d3.selectAll(".bubblePropertyBU")
                    .remove()
                
                //Since elements belonging to the bubblePropertyLA class come under the
                //Property category, the code removes them
                d3.selectAll(".bubblePropertyLA")
                    .remove()

                //Since elements belonging to the bubblePropertyMO class come under the
                //Property category, the code removes them
                d3.selectAll(".bubblePropertyMO")
                    .remove()

                //Since elements belonging to the circularBarplotProperty class come under the
                //Property category, the code removes them
                d3.selectAll(".circularBarplotProperty")
                    .remove()
                
                //Since elements belonging to the areaProperty class come under the
                //Property category, the code removes them
                d3.selectAll(".areaProperty")          
                    .remove()

                //Call only the global functions that deal with the Violent crime category 
                //and subcategories of Vioelent crime
                callCircularBarplot_violent(currentYear)
                callBubbleChart_AS(currentYear)
                callBubbleChart_MU(currentYear)
                callBubbleChart_RA(currentYear)
                callBubbleChart_RO(currentYear)
                callAREA_violent()
            }
            

            //Listening for input events on the slider
            //When the user slides the marker present on the slider, the below function is triggered
            slider.oninput = function() {

                //Getting the current value on the slider so that it can appear next to the slider
                output.innerHTML = this.value;           //(B.Oss, 2019)

                //Storing the current value of the slider in a local variable 
                currentYear = this.value
                
                //Sending the new values to the global functions
                change(currentYear)
                changePIE(currentYear)
                
                //If the user has selcted the "Property" crime caetgory, then the below if statement code snippet
                //is executed
                //This if statement removes all instances that come under the Violent category and calls the global functions
                //that deal with the Property crime category
                if(selectedOption == "Property"){
                    d3.selectAll(".bubbleViolentAS")
                       .remove()

                    d3.selectAll(".bubbleViolentMU")           
                       .remove()
                    
                    d3.selectAll(".bubbleViolentRA")          
                       .remove()

                    d3.selectAll(".bubbleViolentRO")             
                       .remove()

                    d3.selectAll(".circularBarplotViolent")          
                       .remove()
                    
                    changeCIRCBARPLOT_property(currentYear)
                    changeBUBBLE_BU(currentYear)
                    changeBUBBLE_LA(currentYear)
                    changeBUBBLE_MO(currentYear)
                }

                //Else if the user has selcted the "Violent" crime caetgory, then the below else if statement code snippet
                //is executed
                //This else if statement removes all instances that come under the Property category and calls the global functions
                //that deal with the Violent crime category
                else if(selectedOption == "Violent"){
                    d3.selectAll(".bubblePropertyBU")
                        .remove()
                    
                    d3.selectAll(".bubblePropertyLA")            
                        .remove()

                    d3.selectAll(".bubblePropertyMO")
                        .remove()

                    d3.selectAll(".circularBarplotProperty")
                        .remove()

                    changeCIRCBARPLOT_violent(currentYear)
                    changeBUBBLE_AS(currentYear)
                    changeBUBBLE_MU(currentYear)
                    changeBUBBLE_RA(currentYear)
                    changeBUBBLE_RO(currentYear)
                }
            }
        
        //Function that actually deals with the map
        function change(yearMAP) {
            // var testMap = new Map()
            // var arrMap = [];
            // var testArr = []

            //Since the Choropleth map is genearted as per the current year
            //the code extracts all the records collected for that partivular year
            var newMapArr = mapArr.filter(filteringDataMAP)
            
            function filteringDataMAP(d){
                //If the current year that is being read is the year chosen on the slider
                //then extract the relative records
                if(d.year == +yearMAP){
                    return d
                }
            }

            //Extracting the records from the finance dataset for the chosen year
            //This helps us get the revenue of a country on that partivular year
            var finArr = financeArr.filter(filterFinance)

            function filterFinance(d){
                if(d.year == +yearMAP){
                    return d
                }
            }
            
            //The below function is used for setting the domain of the color scale dynamically
            function changeColorScale(dat){
                
                //If the user selected the "Property" crime category
                //then the Sequential green color scheme is set as the domain
                if(dat == "Property"){
                    colorScale.range(d3.schemeGreens[3]);
                }
                //Else if the user chose the "Violent" crime category
                //then the Sequential blue color scheme is set as the domain instead
                else if(dat == "Violent"){
                    colorScale.range(d3.schemeBlues[3]);
                }
            }
            //Calling the above defined function                    
            changeColorScale(selectedOption)

            //Function used for getting the total property value of a specific state
            function propFunc(dat, stateName){

                //For loop that iterates over the array
                for(var i = 0; i< dat.length; i++){
                    //Checking If the current state name that is being read is equal to the argument
                    //provided to the function
                    if(dat[i].state == stateName){
                        //Return the total property value for that partivular state
                        return dat[i].property_total_all
                    }
                }
            }

            //Function used for getting the total violent value of a specific state
            function violentFunc(dat, stateName){

                //For loop that iterates over the array
                for(var i = 0; i< dat.length; i++){
                    //Checking If the current state name that is being read is equal to the argument
                    //provided to the function
                    if(dat[i].state == stateName){
                        //Return the total violent value for that particular state
                        return dat[i].violent_total_all
                    }
                }
            }

            //Function used for getting the population of a specific state
            function returnPop(dat, stateName){

                //For loop that iterates over the array
                for(var i = 0; i< dat.length; i++){
                    //Checking If the current state name that is being read is equal to the argument
                    //provided to the function
                    if(dat[i].state == stateName){
                        //Return the population value for that particular state
                        return dat[i].population
                    }
                }
            }

            //Function used for getting the total revenue of a specific state
            function returnFin(dat, stateName){

                //For loop that iterates over the array
                for(var i = 0; i< dat.length; i++){
                    //Checking If the current state name that is being read is equal to the argument
                    //provided to the function
                    //Since the state names under the Finance dataset are all in Upper case, 
                    //the code compares both the values by converting both of them into lower case
                    if(dat[i].state.toLowerCase() == stateName.toLowerCase()){
                        //Return the total revenue value for that particular state
                        return dat[i].revenue_total
                    }
                }
            }
        
        //The below code is used for drawing the map
        var map = svg.append("g")
                        .selectAll("path")
                        .data(data.features)
                        .enter()
                        .append("path")
                        .attr("class", "map")
                        .attr("d", d3.geoPath()          //Creating a geographic path and setiing the current projection for the map
                                        //The projection is used for converting the coordinates of the states into pixels so that the map is displayed as an SVG image
                                        .projection(mapProjection)
                        )
                        //Setting the color of the Choropleth map
                        .attr("fill", function(d){
                            //If the selected option is Property, then execute the below if statement
                            if(selectedOption == "Property"){
                                //Pass the array created above (related to crime) and the states
                                //to the function that gets the total property crime value for that state
                                d.total = propFunc(newMapArr, d.properties.name) || 0;
                                //Pass the acquired value to the color scale to genearate a color for a state
                                return colorScale(d.total)  
                            }
                            //If the selected option is violent, then execute the below if statement
                            else if(selectedOption == "Violent"){
                                //Pass the array created above (related to crime) and the states
                                //to the function that gets the total violent crime value for that state
                                d.total = violentFunc(newMapArr, d.properties.name) || 0;
                                //Pass the acquired value to the color scale to genearate a color for a state
                                return colorScale(d.total)
                            }
                            
                        })
                        .style("stroke", "#8A8A8A")
                        .style("opacity", 0.75)
                        .on("mouseover", onMouseOver)   //Listen for mouseover events
                        .on("mouseout", onMouseOut)      //Listen for mouseout events
                        .on("click", onMouseClick)       //Listen for mouse click events  
        
        //Creating an svg rectangle that appears behind the text
        var tooltipRect = d3.select("svg")
                            .append("g")
                            .append("rect")
                            .style("position", "absolute")
                            .style("visibility", "hidden")        //The visibility is set to "hidden"
                            .attr("fill", "#695E93")     
        
        //Creating an svg text, that provides some basic information of the state
        var tooltip = d3.select("svg")
                            .append("g")
                            .append("text")
                            .attr("class", "mapText")
                            .style("position", "absolute")
                            .style("visibility", "hidden")    //The visibility is set to "hidden"      
                            .attr("fill", "#EFDCF9")         
                            .attr("font-size", "15px") 

        var ttRect;
        
        //This function is triggered when the mouse hovers over any state
        function onMouseOver(event, d, i){
            d3.select(this)
                .transition()
                .duration(50)
                .style("stroke", "#000000")

            //Getting the BBox
            //This BBbox is genearted as per the width, height, and position of the svg text element
            ttRect = tooltip.node().getBBox()                 //(Ocks.org, 2018)

            tooltipRect.style("visibility", "visible")
                        .attr("x", ttRect.x)     //Setting the x coordinate as per the value generated by the BBox
                        .attr("y", ttRect.y)     //Setting the y coordinate as per the value generated by the BBox   
                        .attr("width", ttRect.width)    //Setting the width as per the value generated by the BBox      
                        .attr("height", ttRect.height)       //Setting the height as per the value generated by the BBox
            
            //The visibility is set as "visible"
            tooltip.style("visibility", "visible")
                    .attr("x", d3.pointer(event)[0])        //Setting the x coordinate as per the position of the mouse cursor
                    .attr("y", d3.pointer(event)[1])        //Setting the y coordinate as per the position of the mouse cursor
                    .text(function(){
                        return "State: " + d.properties.name      //Return the State name
                    })
                    //Add another svg text element to the tooltip
                    .append("tspan")                  //(G, 2017)
                    .attr("x", d3.pointer(event)[0])       //Setting the x coordinate as per the position of the mouse cursor
                    .attr("y", d3.pointer(event)[1] + 15)  //Setting the y coordinate
                    .text(function(){
                        //Pass the array created above (related to crime) and the states
                        //to the function that gets the total population value for that state
                        d.pop = returnPop(newMapArr, d.properties.name) || "Unknown";    //If no pouplation value is acquired, then set it as "Unknown"
                        return "Population: " + d.pop
                    })
                    //Add another svg text element to the tooltip
                    .append("tspan")                  //(G, 2017)
                    .attr("x", d3.pointer(event)[0])         //Setting the x coordinate as per the position of the mouse cursor
                    .attr("y", d3.pointer(event)[1] + 30)         //Setting the y coordinate
                    .text(function(){
                        //Pass the array created above (related to finance) and the states
                        //to the function that gets the total revenue value for that state
                        d.fin = returnFin(finArr, d.properties.name) || "Unknown";       //If no revenue value is acquired, then set it as "Unknown"
                        return "Total Revenue: " + d.fin
                    })
        }
        
        //This function is triggered when the mouse cursor moves away from the state
        function onMouseOut(event, d, i){
            d3.select(this)
                .transition()
                .duration(50)
                .style("stroke", "#8A8A8A")

            //Set the tooltip's visibility to hidden
            tooltip.style("visibility", "hidden")
            tooltipRect.style("visibility", "hidden")
        }

        //This function is triggered when a state is clicked on
        function onMouseClick(event, d, i){
            d3.select(this)
                .transition()
                .duration(50)
                .style("stroke", "#000000")

            //If teh selected crime category is "Property", then excute the below if statement
            if(selectedOption == "Property"){

                //Call the global functions that deal with the Property crime category
                changeAREA_property(yearMAP, d.properties.name)
                filterData_BU(d.properties.name)
                filterData_LA(d.properties.name)
                filterData_MO(d.properties.name)
            }

            //If teh selected crime category is "Violent", then excute the below else if statement
            else if(selectedOption == "Violent"){

                //Call the global functions that deal with the Violent crime category
                changeAREA_violent(yearMAP, d.properties.name)
                filterData_AS(d.properties.name)
                filterData_MU(d.properties.name)
                filterData_RA(d.properties.name)
                filterData_RO(d.properties.name)
            }
        }

    }
}
        
    })


})





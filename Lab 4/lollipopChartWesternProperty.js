//REFERENCES - 

// 1) Shuvo, N.A. (2021). X Axis text labels are not rotating in d3. [online] Stack Overflow. 
//    Available at: https://stackoverflow.com/questions/65920124/x-axis-text-labels-are-not-rotating-in-d3

const marginLOLLIPOP_WE = {top: 10, right: 30, bottom: 40, left: 155};
const widthLOLLIPOP_WE = 400 - marginLOLLIPOP_WE.left - marginLOLLIPOP_WE.right;
const heightLOLLIPOP_WE = 300 - marginLOLLIPOP_WE.top - marginLOLLIPOP_WE.bottom;


var lollipopArrPropertyWE = [];

function toOriginalTypeLOLLIPOP_WE(d){
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

d3.csv("data/westernRegionUS.csv", function(d, i){
    lollipopArrPropertyWE.push(toOriginalTypeLOLLIPOP_WE(d))
}).then(function(lollipopData_WE){

    var svgLOLLIPOP_WE = d3.select('body')
                            .append("svg")
                            .attr("class","lollipopWesternProperty")
                            .attr("width", widthLOLLIPOP_WE + marginLOLLIPOP_WE.left + marginLOLLIPOP_WE.right - 7)
                            .attr("height", heightLOLLIPOP_WE + marginLOLLIPOP_WE.top + marginLOLLIPOP_WE.bottom - 10)
                            .attr("transform", "translate(20, 20)")

    //Creating a group container
    var gLOLLIPOP_WE = svgLOLLIPOP_WE.selectAll("g")
                                        .data(lollipopArrPropertyWE)
                                        .enter()
                                        .append("g")
                                        .attr("transform", function(d, i) {
                                            return "translate(" + (marginLOLLIPOP_WE.left+10) + "," + marginLOLLIPOP_WE.top + ")";
                                        })

    var x = d3.scaleBand()
                .range([0, widthLOLLIPOP_WE])
                .padding(0.1)

    var xBottomAxis = d3.axisBottom()
                        .scale(x)

    var x_bottom = svgLOLLIPOP_WE.append("g")
                                .attr("class", "xaxis_WE")
                                .attr("transform", "translate(100," + (heightLOLLIPOP_WE+50) + ")")
                                .attr("color", "white")
                                .call(xBottomAxis) 

    x_bottom.selectAll("text")               
            .style("text-anchor", "end")
            .attr("dx", "-.8em")              //(Shuvo, 2021)
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)" )
            .attr("fill", "#29A0B1")

    var y = d3.scaleLinear()
                .range([heightLOLLIPOP_WE, 0])
    
    var yLeftAxis = d3.axisLeft()
                        .scale(y)

    var y_left = svgLOLLIPOP_WE.append("g")
                            .attr("class", "myYaxis_WE")
                            .attr("transform", "translate(" + (widthLOLLIPOP_WE-115) + ", 50)")
                            .attr("color", "white")
                            .call(yLeftAxis)

    y_left.selectAll("text")
            .attr("fill", "#29A0B1")

    var gr_WE = svgLOLLIPOP_WE.append("g")

    var stateNameCode_WE = new Map([
            ["Alabama", "AL"],
            ["Alaska", "AK"],
            ["Arizona", "AZ"],
            ["Arkansas", "AR"],
            ["California", "CA"],
            ["Colorado", "CO"],
            ["Connecticut", "CT"],
            ["Delaware", "DE"],
            ["District of Columbia", "DC"],
            ["Florida", "FL"],
            ["Georgia", "GA"],
            ["Hawaii", "HI"],
            ["Idaho", "ID"],
            ["Illinois", "IL"],
            ["Indiana", "IN"],
            ["Iowa", "IA"],
            ["Kansas", "KS"],
            ["Kentucky", "KY"],
            ["Louisiana", "LA"],
            ["Maine", "ME"],
            ["Maryland", "MD"],
            ["Massachusetts", "MA"],
            ["Michigan", "MI"],
            ["Minnesota", "MN"],
            ["Mississippi", "MS"],
            ["Missouri", "MO"],
            ["Montana", "MT"],
            ["Nebraska", "NE"],
            ["Nevada", "NV"],
            ["New Hampshire", "NH"],
            ["New Jersey", "NJ"],
            ["New Mexico", "NM"],
            ["New York", "NY"],
            ["North Carolina", "NC"],
            ["North Dakota", "ND"],
            ["Ohio", "OH"],
            ["Oklahoma", "OK"],
            ["Oregon", "OR"],
            ["Pennsylvania", "PA"],
            ["Puerto Rico", "PR"],
            ["Rhode Island", "RI"],
            ["South Carolina", "SC"],
            ["South Dakota", "SD"],
            ["Tennessee", "TN"],
            ["Texas", "TX"],
            ["Utah", "UT"],
            ["Vermont", "VT"],
            ["Virginia", "VA"],
            ["Virgin Islands", "VI"],
            ["Washington", "WA"],
            ["West Virginia", "WV"],
            ["Wisconsin", "WI"],
            ["Wyoming", "WY"]
        ])

    function axes(data){

        x.domain(data.map(function(d){
            d.stateCode = stateNameCode_WE.get(d.state) || 0
            return d.stateCode
        }))

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
                .attr("fill", "#29A0B1")
    }

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
              .attr("fill", "#29A0B1")
    }

    function drawLollipopChart_WE(data){
        
        axes(data)
        var popRate = []

        for (var i = 0; i<data.length; i++){
            popRate.push(data[i].property_rates_all)
        }

        updateYAxis(popRate)

        var l = svgLOLLIPOP_WE.selectAll(".lollipopLine_WE")
                                .data(data)
        
            l.enter()
             .append("line")
             .attr("class", "lollipopLine_WE")
             .merge(l)
             .transition()
             .duration(900)
             .attr("stroke", "grey")
             .attr("x1", function(d){
                d.stateCode = stateNameCode_WE.get(d.state) || 0
                return x(d.stateCode) + 107
             })
             .attr("x2", function(d){
                d.stateCode = stateNameCode_WE.get(d.state) || 0
                return x(d.stateCode) + 107
             })
             .attr("y1", function(d){
                 return y(d.property_rates_all) + 50
             })
             .attr("y2", y(0) + 50)


        var m = svgLOLLIPOP_WE.selectAll(".marker_WE")
                                .data(data)

            m.enter()
                .append("circle")
                .attr("class", "marker_WE")
                .merge(m)
                .transition()
                .duration(900)
                // .attr("stroke", "black")
                .style("fill", "#29A0B1")
                .attr("cx", function(d){
                    d.stateCode = stateNameCode_WE.get(d.state) || 0
                    return x(d.stateCode) + 107
                })
                .attr("cy", function(d){
                    return y(d.property_rates_all) + 50
                })
                .attr("r", 5)
        
        l.exit().remove()
        m.exit().remove()
    }

    window.changeLOLLIPOP_WE = function(yearLOLLIPOP_WE) {

        var newLollipopArr_WE = lollipopArrPropertyWE.filter(filteringDataLOLLIPOP_WE)
            
        function filteringDataLOLLIPOP_WE(d){
            if(d.year == +yearLOLLIPOP_WE){
                return d
            }
        }

        drawLollipopChart_WE(newLollipopArr_WE)  
    }  
})






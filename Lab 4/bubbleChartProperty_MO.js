const marginBUBBLE_MO = {top: 10, right: 30, bottom: 40, left: 155};
const widthBUBBLE_MO = 400 - marginBUBBLE_MO.left - marginBUBBLE_MO.right;
const heightBUBBLE_MO = 300 - marginBUBBLE_MO.top - marginBUBBLE_MO.bottom;

var bubbleArrPropertyMO = [];

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
    bubbleArrPropertyMO.push(toOriginalTypeBUBBLE_MO(d))
}).then(function(bubbleData_MO){

    var svgBUBBLE_MO = d3.select('body')
                            .append("svg")
                            .attr("class","bubblePropertyMO")
                            .attr("width", widthBUBBLE_MO + marginBUBBLE_MO.left + marginBUBBLE_MO.right - 7)
                            .attr("height", heightBUBBLE_MO + marginBUBBLE_MO.top + marginBUBBLE_MO.bottom + 13)
                            .attr("transform", "translate(20, 20)")

    //Creating a group container
    var gBUBBLE_MO = svgBUBBLE_MO.selectAll("g")
                                        .data(bubbleArrPropertyMO)
                                        .enter()
                                        .append("g")
                                        .attr("transform", function(d, i) {
                                            return "translate(" + (marginBUBBLE_MO.left+10) + "," + marginBUBBLE_MO.top + ")";
                                        })
    
    var x = d3.scaleLinear()
                .range([0, widthBUBBLE_MO])
                        
    var xBottomAxis = d3.axisBottom()
                        .scale(x)
                        
    var x_bottom = svgBUBBLE_MO.append("g")
                                  .attr("class", "xaxis_MO")
                                  .attr("transform", "translate(100," + (heightBUBBLE_MO+50) + ")")
                                  .attr("color", "white")
                                  .call(xBottomAxis) 
                        
    x_bottom.selectAll("text")               
            .style("text-anchor", "end")
            .attr("dx", "-.8em")              //(Shuvo, 2021)
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)" )
            .attr("fill", "#FF0080")
                        
    var y = d3.scaleLinear()
              .range([heightBUBBLE_MO, 0])
                            
    var yLeftAxis = d3.axisLeft()
                      .scale(y)
                        
    var y_left = svgBUBBLE_MO.append("g")
                                .attr("class", "myYaxis_MO")
                                .attr("transform", "translate(" + (widthBUBBLE_MO-115) + ", 50)")
                                .attr("color", "white")
                                .call(yLeftAxis)
                        
    y_left.selectAll("text")
           .attr("fill", "#FF0080")
                        
    var gr_MO = svgBUBBLE_MO.append("g")

    var colorScale_MO = d3.scaleOrdinal()
                            .range(d3.schemePuRd[7]);

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
                .attr("transform", "rotate(-65)")
                .attr("fill", "#FF0080")
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
              .attr("fill", "#FF0080")
    }

    function updateColorScale(data){

        colorScale_MO.domain(
            [d3.min(data), d3.max(data)]
        )
    }

    function drawBubbleChart_MO(data){

        var moPop = []
        var moRate = []

        for (var i = 0; i<data.length; i++){
            moPop.push(data[i].population)
            moRate.push(data[i].rates_motor)
        }

        axes(moPop)
        updateYAxis(moRate)
        updateColorScale(moRate)

        var o = svgBUBBLE_MO.selectAll(".rate_MO")
                                .data(data)

            o.enter()
                .append("circle")
                .attr("class", "rate_MO")
                .merge(o)
                .transition()
                .duration(900)
                .style("fill", function(d){
                    return colorScale_MO(d.rates_motor)
                })
                .attr("cx", function(d){
                    return x(d.population) + 107
                })
                .attr("cy", function(d){
                    return y(d.rates_motor) + 50
                })
                .attr("r", 5)

        o.exit().remove()
    }

    window.changeBUBBLE_MO = function(yearBUBBLE_MO) {

        var newBubbleArr_MO = bubbleArrPropertyMO.filter(filteringDataBUBBLE_MO)
            
        function filteringDataBUBBLE_MO(d){
            if(d.year == +yearBUBBLE_MO){
                return d
            }
        }

        drawBubbleChart_MO(newBubbleArr_MO)  
    }
})
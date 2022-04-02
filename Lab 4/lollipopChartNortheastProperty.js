// const marginLOLLIPOP = {top: 30, right: 30, bottom: 70, left: 155};
// const widthLOLLIPOP = 1060  - marginLOLLIPOP.left - marginLOLLIPOP.right;
// const heightLOLLIPOP = 750 - marginLOLLIPOP.top - marginLOLLIPOP.bottom;

const marginLOLLIPOP = {top: 10, right: 30, bottom: 40, left: 155};
const widthLOLLIPOP = 400 - marginLOLLIPOP.left - marginLOLLIPOP.right;
const heightLOLLIPOP = 300 - marginLOLLIPOP.top - marginLOLLIPOP.bottom;


var lollipopArrPropertyNE = [];

function toOriginalTypeLOLLIPOP(d){
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

d3.csv("data/northEastRegionUS.csv", function(d, i){
    lollipopArrPropertyNE.push(toOriginalTypeLOLLIPOP(d))
}).then(function(lollipopData){

    var svgLOLLIPOP = d3.select('body')
                    .append("svg")
                    .attr("class","lollipopNorthEastProperty")
                    .attr("width", widthLOLLIPOP + marginLOLLIPOP.left + marginLOLLIPOP.right - 7)
                    .attr("height", heightLOLLIPOP + marginLOLLIPOP.top + marginLOLLIPOP.bottom - 10)
                    .attr("transform", "translate(20, 20)")

    //Creating a group container
    var gLOLLIPOP = svgLOLLIPOP.selectAll("g")
                                .data(lollipopArrPropertyNE)
                                .enter()
                                .append("g")
                                .attr("transform", function(d, i) {
                                    return "translate(" + (marginLOLLIPOP.left+10) + "," + marginLOLLIPOP.top + ")";
                                })

    var x = d3.scaleBand()
                .range([0, widthLOLLIPOP])
                .padding(1)

    var xBottomAxis = d3.axisBottom()
                        .scale(x)

    var x_bottom = svgLOLLIPOP.append("g")
                                .attr("class", "xaxis")
                                .attr("transform", "translate(100," + (heightLOLLIPOP+50) + ")")
                                .call(xBottomAxis) 

    var y = d3.scaleLinear()
                .range([heightLOLLIPOP, 0])
    
    var yLeftAxis = d3.axisLeft()
                        .scale(y)

    var y_left = svgLOLLIPOP.append("g")
                            .attr("class", "myYaxis")
                            .attr("transform", "translate(" + (widthLOLLIPOP-115) + ", 50)")
                            .call(yLeftAxis);

    var gr = svgLOLLIPOP.append("g")

    var stateNameCode = new Map([
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
            d.stateCode = stateNameCode.get(d.state) || 0
            return d.stateCode
        }))

        xBottomAxis = d3.axisBottom()
                        .scale(x)

        x_bottom.transition()
                .duration(900)
                .call(xBottomAxis)                 
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
    }

    function drawLollipopChart(data){
        
        axes(data)
        var popRate = []

        for (var i = 0; i<data.length; i++){
            popRate.push(data[i].property_rates_all)
        }

        var mean_popRate = d3.mean(popRate)

        updateYAxis(popRate)

        var l = svgLOLLIPOP.selectAll(".lollipopLine")
                            .data(data)
        
            l.enter()
             .append("line")
             .attr("class", "lollipopLine")
             .merge(l)
             .transition()
             .duration(900)
             .attr("stroke", "grey")
             .attr("x1", function(d){
                d.stateCode = stateNameCode.get(d.state) || 0
                return x(d.stateCode) + 100
             })
             .attr("x2", function(d){
                d.stateCode = stateNameCode.get(d.state) || 0
                return x(d.stateCode) + 100
             })
             .attr("y1", function(d){
                console.log(d.state)
                 console.log(y(d.property_rates_all))
                 return y(d.property_rates_all) + 50
             })
             .attr("y2", y(0) + 50)


        var m = svgLOLLIPOP.selectAll(".marker")
                            .data(data)

            m.enter()
                .append("circle")
                .attr("class", "marker")
                .merge(m)
                .transition()
                .duration(900)
                // .attr("stroke", "black")
                .style("fill", "#29A0B1")
                .attr("cx", function(d){
                    d.stateCode = stateNameCode.get(d.state) || 0
                    return x(d.stateCode) + 100
                })
                .attr("cy", function(d){
                    return y(d.property_rates_all) + 50
                })
                .attr("r", 5)
        
        l.exit().remove()
        m.exit().remove()
    }

    window.changeLOLLIPOP = function(yearLOLLIPOP) {

        var newLollipopArr = lollipopArrPropertyNE.filter(filteringDataLOLLIPOP)
            
        function filteringDataLOLLIPOP(d){
            if(d.year == +yearLOLLIPOP){
                return d
            }
        }

        drawLollipopChart(newLollipopArr)  
    }  
})






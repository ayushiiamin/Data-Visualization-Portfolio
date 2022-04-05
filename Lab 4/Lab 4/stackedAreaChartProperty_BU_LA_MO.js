const marginSTACK_BU_LA_MO = {top: 10, right: 30, bottom: 40, left: 155};
const widthSTACK_BU_LA_MO = 400 - marginSTACK_BU_LA_MO.left - marginSTACK_BU_LA_MO.right;
const heightSTACK_BU_LA_MO = 300 - marginSTACK_BU_LA_MO.top - marginSTACK_BU_LA_MO.bottom;

var stackArrProperty_BU_LA_MO = [];

function toOriginalTypeSTACK_BU_LA_MO(d){
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
    stackArrProperty_BU_LA_MO.push(toOriginalTypeSTACK_BU_LA_MO(d))
}).then(function(STACKData_BU_LA_MO){

    var svgSTACK_BU_LA_MO = d3.select('body')
                                .append("svg")
                                .attr("class","stackProperty_BU_LA_MO")
                                .attr("width", widthSTACK_BU_LA_MO + marginSTACK_BU_LA_MO.left + marginSTACK_BU_LA_MO.right - 7)
                                .attr("height", heightSTACK_BU_LA_MO + marginSTACK_BU_LA_MO.top + marginSTACK_BU_LA_MO.bottom + 13)
                                .attr("transform", "translate(20, 20)")

    //Creating a group container
    var gSTACK_BU_LA_MO = svgSTACK_BU_LA_MO.selectAll("g")
                                            .data(stackArrProperty_BU_LA_MO)
                                            .enter()
                                            .append("g")
                                            .attr("transform", function(d, i) {
                                                return "translate(" + (marginSTACK_BU_LA_MO.left+10) + "," + marginSTACK_BU_LA_MO.top + ")";
                                            })

    var x = d3.scaleTime()
              .domain(d3.extent(stackArrProperty_BU_LA_MO, function(d){
                  return d.year
              }))
              .range([0, widthSTACK_BU_LA_MO])

    var xBottomAxis = d3.axisBottom()
                        .tickFormat(d3.format("d"))
                        .scale(x)
    
    var x_bottom = svgSTACK_BU_LA_MO.append("g")
                                    .attr("class", "xaxis_BU_LA_MO")
                                    .attr("transform", "translate(100," + (heightSTACK_BU_LA_MO+50) + ")")
                                    .attr("color", "white")
                                    .call(xBottomAxis) 

        x_bottom.selectAll("text")               
                .style("text-anchor", "end")
                .attr("dx", "-.8em")              //(Shuvo, 2021)
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)" )
                .attr("fill", "#FF0080")


    var y = d3.scaleLinear()
            //   .domain([0, d3.max(stackArrProperty_BU_LA_MO, function(d){
            //       return d.total_burglary
            //   })])
              .range([heightSTACK_BU_LA_MO, 0])

    var yLeftAxis = d3.axisLeft()
                        .scale(y)

    var y_left = svgSTACK_BU_LA_MO.append("g")
                                    .attr("class", "myYaxis_BU_LA_MO")
                                    .attr("transform", "translate(" + (widthSTACK_BU_LA_MO-115) + ", 50)")
                                    .attr("color", "white")
                                    .call(yLeftAxis)          

    y_left.selectAll("text")
            .attr("fill", "#FF0080")

    const keys = ["total_larceny", "total_burglary", "total_motor"]

    const color = d3.scaleOrdinal()
                    .domain(keys)
                    .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf'])
    
    const stackedData = d3.stack()
                            .keys(keys)

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
    
    function drawStackChart_BU_LA_MO(data, arr){

        var stackBU = []

        for (var i = 0; i<arr.length; i++){
            stackBU.push(arr[i].total_burglary)
            stackBU.push(arr[i].total_larceny)
        }

        updateYAxis(stackBU)

        var s1 = svgSTACK_BU_LA_MO.selectAll(".stacked_BU_LA_MO1")
                                .data(data)

        s1.enter()
          .append("path")
          .attr("class", "stacked_BU_LA_MO1")
          .merge(s1)
          .transition()
          .duration(900)
        //   .attr("fill", "#cce5df")
        //   .attr("stroke", "#69b3a2")
        //   .attr("stroke-width", 1.5)
          .style("fill", function(d){
              return color(d.key)
          })
          .attr("d", d3.area()
              .x(function(d, i){
                  return x(d.data.year) + 100
              })
              .y0(function(d){
                  return y(d[0]) + 50
              })
              .y1(function(d){
                  return y(d[1]) + 50
              })
          )
    } 
    
    window.changeSTACK_BU_LA_MO = function(stateSTACK_BU_LA_MO) {

        var newStackArr_BU_LA_MO = stackArrProperty_BU_LA_MO.filter(filteringDataSTACK_BU_LA_MO)
            
        function filteringDataSTACK_BU_LA_MO(d){
            if(d.state == stateSTACK_BU_LA_MO){
                return d
            }
        }

        var testData = stackedData(newStackArr_BU_LA_MO)

        drawStackChart_BU_LA_MO(testData, newStackArr_BU_LA_MO)  
    }
     
})
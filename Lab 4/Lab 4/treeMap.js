const marginTREE = {top: 10, right: 30, bottom: 70, left: 155};
const widthTREE = 400 - marginTREE.left - marginTREE.right;
const heightTREE = 220 - marginTREE.top - marginTREE.bottom;


var treeArr = [];

function toOriginalTypeTREE(d){
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
    treeArr.push(toOriginalTypeTREE(d))
}).then(function(treeData){

        //Creating an svg for the map
    var svgTREE = d3.select('body')
                    .append("svg")
                    .attr("class","treeMap")
                    .attr("transform", "translate(20, 20)")
                    .attr("width", widthTREE + marginTREE.left + marginTREE.right)
                    .attr("height", heightTREE + marginTREE.top + marginTREE.bottom)

    var gTREE = svgTREE.selectAll("g")
                        .data(treeArr)
                        .enter()
                        .append("g")
                        .attr("transform", function(d, i){
                            return "translate(" + marginTREE.left + "," + marginTREE.top + ")";
                        })

    var newTreeArr = treeArr.filter(filteringDataTREE)
            
    function filteringDataTREE(d){
        if(d.year == 1960){
            return d
        }
    }

    const hierarchy = d3.hierarchy(newTreeArr)
                        .sum(function(d){
                            return d.property_total_all
                        })
                        // .sort(function(a,b){
                        //     return b.property_total_all - a.property_total_all
                        // })

    const treemap = d3.treemap()
                        .size([400, 450]) // width: 400px, height:450px
                        .padding(4);
    
    const root = treemap(hierarchy);

    var t = svgTREE.selectAll(".treeNodes")
                    .data(root.leaves())   
                    .enter()
                    .append("rect")
                    .attr("class", "treeNodes")
                    .attr("x", function(d){
                        return d.x0
                    })
                    .attr("y", function(d){
                        return d.y0
                    })
                    .attr("width", function(d){
                        console.log(d)
                        return d.x1 - d.x0
                    })
                    .attr("height", function(d){
                        return d.y1 - d.y0
                    })
                    .attr("fill", "#5AB7A9")

                    svgTREE
                    .selectAll("text")
                    .data(root.leaves())
                    .join("text")
                      .attr("x", function(d){ return d.x0+10})    // +10 to adjust position (more right)
                      .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
                      .text(function(d){ return d.data.name})
                      .attr("font-size", "15px")
                      .attr("fill", "white")
})
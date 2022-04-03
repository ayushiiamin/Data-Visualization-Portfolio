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
    
    const keys = [total_burglary, total_larceny, total_motor]

    const stackedData = d3.stack()
      .keys(keys)
})
const margin = {top: 30, right: 30, bottom: 70, left: 155};
const widthSVG = 1060 - margin.left - margin.right;
const heightSVG = 750 - margin.top - margin.bottom;


            //Creating an svg for the map
            var svg = d3.select('body')
                        .append('div')
                        .append("svg")
                        .attr("class","map")
                        .attr("width", widthSVG + margin.left + margin.right)
                        .attr("height", heightSVG + margin.top + margin.bottom)
                        // .style("border", '1px solid green')
                        // .style("background-color","green")
                        .append("g")
                        .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");


            //The below code is used for building the projection of the map
            //This projection will be used for converting each of the countries coordinates
            //to pixels so that the map can be displayed on the SVG
            var mapProjection = d3.geoMercator()                    //(Holtz, 2022)
                                    .scale(70)
                                    .center([0,55])
                                    .translate([65, 105])


            //The JSON file which consists of the data, is hosted on GitHub
            //Storing the path of the GitHub file in a variable
                        //(Holtz, 2022)
            let mapJSON = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

         

            //Loading the JSON file
            d3.json(mapJSON).then(function(data){
                // console.log(Object.keys(data))

                //The below code is used for drawing the map
                var map = svg.append("g")
                                .selectAll("path")
                                .data(data.features)
                                .enter()
                                .append("path")
                                .attr("class", "map")
                                .attr("fill", "#CD0046")
                                .attr("d", d3.geoPath()          //Creating a geographic path and sets the current projection
                                              //The projection will be used for converting the coordinates of the countries into pixels
                                                .projection(mapProjection)                                  //(Holtz, 2022)
                                )
                                .style("opacity", 0.75)           //Setting the opacity of the svg     
                                .on("click", function(d, i){
                                    // console.log(i.properties.name)
                                    getCountry(i.properties.name)
                                    d3.select(this)
                                        .transition()
                                        .duration(100)
                                        .attr("fill", "#0C4160")
                                        .style("stroke", "black")
                                })     
                    // d3.select("path")
                    //     .on("click", function(d, i){
                    //         // console.log("helo")
                    //         d3.select(this)
                    //                     .transition()
                    //                     .duration(100)
                    //                     .attr("fill", "#CD0046")
                    //                     .style("stroke", "transparent")
                    //     })            


                

                //When the mouse cursor moves over any country, the below function is called
                // function onMouseOver(d, i){
                //     // console.log(i.properties.name)
                //     d3.select(this)
                //        .transition()
                //        .duration(400)          //Setting the duration of the transition
                //        .attr("fill", "#1D5939")         //When the mouse moves over the country, make the country pink in color
                //        //Draw an outline around the selected country     
                //        .style("stroke", "black")                                //(Angelica Lo Duca, 2021)
                    
                // }


                // //When the mouse cursor moves away from any country, the below function is called
                // function onMouseOut(){
                //     d3.selectAll(".map")
                //         .transition()
                //         .duration(400)    //Setting the duration of the transition
                //         .attr("fill", "#CD0046")        //Setting the color of the country, back to its original color
                //         //Setting the outline of the country to be transparent
                //         .style("stroke", "transparent")                 //(Angelica Lo Duca, 2021)
                // }


            })
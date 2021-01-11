//plots the default display data and map
function init() {

  d3.json("/test").then((importedData) => {
    console.log(importedData);
   
  //assigns the data
  var data = importedData
 
  console.log(data)
 
  //selects the drop down
  var dropdownMenu = d3.select("#selDataset");
  
  //assigns the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");
  
  console.log(dataset);
  
  //filters the sample data by this variable
  var filteredData = data.filter(a => a.NM_REGION === "BBN");
 
  console.log(filteredData)
  
  //filters the metadata by this variable
  //var filteredMetadata = mdata.filter(a => a.id === parseInt(dataset));
 
  var rainfall = filteredData.map(object => object.Rainfall)
 
  console.log(rainfall)
 
 
  var amPeak = filteredData.map(object => object.AM_PEAK_VOLUME)
 
  console.log(amPeak)
 
  var pmPeak = filteredData.map(object => object.PM_PEAK_VOLUME)
 
  var dates = filteredData.map(object => object.Date)
 
  var lat = filteredData.map(object => object.Lat)
 
  console.log(lat[0])
 
  var long = filteredData.map(object => object.Long)
 
  console.log(long[0])
 
  var region = filteredData.map(object => object.Region)
 
  
  var trace1 = {
   x: amPeak,
   y: rainfall,
   mode: 'markers',
   name: 'AM Peak',
   type: 'scatter',
   text: dates,
   marker: { size: 12}
 };
    
    var data = [trace1];
 
    var layout = {
     xaxis: {
       title: "AM Peak"
     },
     yaxis: {
       title: "Rainfall (mm)"
     },
 
     title:(`Peak of traffic during morning rush hour vs Rainfall (mm) July 2016 for ${region[0]}`)
   };
    
    Plotly.newPlot('bar', data, layout);
 
    var trace2 = {
     x: pmPeak,
     y: rainfall,
     mode: 'markers',
     name: 'PM Peak',
     type: 'scatter',
     text: dates,
     marker: { size: 12}
   };
      
      var data = [trace2];
   
      var layout2 = {
       xaxis: {
         title: "PM Peak"
       },
       yaxis: {
         title: "Rainfall (mm)"
       },
   
       title:("Peak of traffic during afternoon rush hour vs Rainfall (mm) July 2016")
     };
      
      Plotly.newPlot('bar2', data, layout2);
 
      var dataMap = [
       {
         type: "scattermapbox",
         fill: "toself",
         text: region[0],
         lon: long[0],
         lat: lat[0],
         marker: { size: 100, color: "orange" }
       }
     ];
     
     var layoutMap = {
       mapbox: {
         style: "stamen-terrain",
         center: { lat: lat[0], lon: long[0] },
         zoom: 12
       },
       showlegend: false,
       height: 800,
       width: 1200,
       title: (`${region[0]}`)
     };
     
     Plotly.newPlot("bubble", dataMap, layoutMap);
  
   });
 

}

function optionChanged() {

  //imports the data
  d3.json("/test").then((importedData) => {
   console.log(importedData);
  
 //assigns the data
 var data = importedData

 console.log(data)

 //selects the drop down
 var dropdownMenu = d3.select("#selDataset");

 var dropdownMenu2 = d3.select("#selDataset2");

 var dropdownMenu3 = d3.select("#selDataset3");

 //console.log(dropdownMenu3)
 
 //assigns the value of the dropdown menu option to a variable
 var dataset = dropdownMenu.property("value");
 
 console.log(dataset);

 var dataset2 = dropdownMenu2.property("value");

 console.log(dataset2);

 var dataset3 = dropdownMenu3.property("value");

 console.log(dataset3);
 
 //filters the sample data by this variable
 var filteredData = data.filter(a => a.NM_REGION === dataset);

 console.log(filteredData)

 var filteredData2 = data.filter(a => a.NM_REGION === dataset2);

 console.log(filteredData2)
 
 //sets the variables for the x and y axis, region names and coordinates
 var rainfall = filteredData.map(object => object.Rainfall)
 var rainfall2 = filteredData2.map(object => object.Rainfall)
 var amPeak = filteredData.map(object => object.AM_PEAK_VOLUME)
 var amPeak2 = filteredData2.map(object => object.AM_PEAK_VOLUME)
 var pmPeak = filteredData.map(object => object.PM_PEAK_VOLUME)
 var pmPeak2 = filteredData2.map(object => object.PM_PEAK_VOLUME)
 var dates = filteredData.map(object => object.Date)
 var lat = filteredData.map(object => object.Lat)
 var lat2 = filteredData2.map(object => object.Lat)
 var long = filteredData.map(object => object.Long)
 var long2 = filteredData2.map(object => object.Long)
 var region = filteredData.map(object => object.Region)
 var region2 = filteredData2.map(object => object.Region)

 //for loop to determine which y axis to display based on the value selected under the Weather dropdown
 if (dataset3 === "Rainfall") {
  y_axis = filteredData.map(object => object.Rainfall);
  y_axis_title = "Rainfall (mm)"
}
else {
  y_axis = filteredData.map(object => object.MaxTemp);
  y_axis_title = "Max Temp (C)"
}

//console.log(y_axis)
 
//plots the AM Peak scatter plots
 var trace1 = {
  x: amPeak,
  y: y_axis,
  mode: 'markers',
  name: region[0],
  type: 'scatter',
  text: dates,
  marker: { size: 12}
};

var trace2 = {
  x: amPeak2,
  y: y_axis,
  mode: 'markers',
  name: region2[0],
  type: 'scatter',
  text: dates,
  marker: { size: 12}
};
   
   var data = [trace1, trace2];

   var layout = {
    xaxis: {
      title: "AM Peak"
    },
    yaxis: {
      title: y_axis_title
    },

    title:(`Peak of traffic during morning rush hour vs ${y_axis_title} July 2016`)
  };
   
   Plotly.newPlot('bar', data, layout);


   //plots the PM Peak scatter plots
   var trace3 = {
    x: pmPeak,
    y: y_axis,
    mode: 'markers',
    name: region[0],
    type: 'scatter',
    text: dates,
    marker: { size: 12}
  };

  var trace4 = {
    x: pmPeak2,
    y: y_axis,
    mode: 'markers',
    name: region2[0],
    type: 'scatter',
    text: dates,
    marker: { size: 12}
  };
     
     var data2 = [trace3, trace4];
  
     var layout2 = {
      xaxis: {
        title: "PM Peak"
      },
      yaxis: {
        title: y_axis_title
      },
  
      title:(`Peak of traffic during afternoon rush hour vs ${y_axis_title} July 2016`)
    };
     
     Plotly.newPlot('bar2', data2, layout2);

     //plots the map for the regions selected
     var dataMap = [
      {
        type: "scattermapbox",
        fill: "toself",
        text: region[0],
        lon: long[0],
        lat: lat[0],
        marker: { size: 100, color: "orange" }
      }
    ];
    
    var layoutMap = {
      mapbox: {
        style: "stamen-terrain",
        center: { lat: lat[0], lon: long[0] },
        zoom: 12
      },
      showlegend: false,
      height: 800,
      width: 1200,
      title: (`${region[0]}`)
    };
    
    Plotly.newPlot("bubble", dataMap, layoutMap);

    var dataMap2 = [
      {
        type: "scattermapbox",
        fill: "toself",
        text: region2[0],
        lon: long2[0],
        lat: lat2[0],
        marker: { size: 100, color: "orange" }
      }
    ];

    var layoutMap2 = {
      mapbox: {
        style: "stamen-terrain",
        center: { lat: lat2[0], lon: long2[0] },
        zoom: 12
      },
      showlegend: false,
      height: 800,
      width: 1200,
      title: (`${region2[0]}`)
    };
    
    Plotly.newPlot("bubble2", dataMap2, layoutMap2);
 
  });
}

init();

$(function () {
    $('[data-toggle="popover"]').popover()
  })

$('.popover-dismiss').popover({
    trigger: 'focus'
  })
  
var TableSpanID = ["#TotalCases","#Recovered","#Deaths","#Limbo"];
var CovidSummaryStats = {};

class CountryStats{
    PopulateData(DataObj){
        this.country = DataObj[0].Country;
        this.dates = [];
        this.cases = [];
        for(var i = 0; i < DataObj.length;i++){
            this.cases.push(DataObj[i].Cases);
            this.dates.push(String(DataObj[i].Date));
        }
        return;        
    }

    
    constructor(){
        this.cases = [];
        this.dates = [];
        this.country = "";
        return;
    }
    
    get GetCases(){
        return this.cases;
    }
    
    get GetDates(){
        return this.dates;
    }

    get GetCountryName(){
        return this.country;
    }
    
}



function GetApiData(scriptUrl)
{
     var result = null;
    //  var scriptUrl = 'https://corona.lmao.ninja/all';
     $.ajax({
        url: scriptUrl,
        type: 'get',
        dataType: 'json',
        async: false,
        error: function(){
            alert("Error. Could not find data")
        },
        success: function(data) {
            result = data;
        } 
     });
     return result;
}

CovidSummaryStats = GetApiData('https://corona.lmao.ninja/all');

function PopulateSummaryTable(){
    $("#TotalCases").text(CovidSummaryStats.cases);
    $("#Recovered").text(CovidSummaryStats.recovered);
    $("#Deaths").text(CovidSummaryStats.deaths);
    $("#Limbo").text(CovidSummaryStats.active);   
}

PopulateSummaryTable();

let South_Africa = new CountryStats();
South_Africa.PopulateData(GetApiData('https://api.covid19api.com/total/country/south-africa/status/confirmed'))


function PlotLine(xAxis,yAxis,Label,CanvasID,colour){
    console.log(yAxis)
    console.log(xAxis)
    console.log(Label)
    var ctx = document.getElementById(String(CanvasID)).getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: xAxis,
    datasets: [{ 
        data: yAxis,
        label: String(Label) + " COVID cases",
        borderColor: String(colour),
        fill: false
    }
    
    ]
  },
    options: {
        legend:{
            labels:{fontSize : 20}
            
        },
        title: {
            display: true,
            text: String(Label) + " COVID cases",
            fontSize : 20
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontSize : 20
                }
            }],
            xAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        fontSize : 20
                    }
                }
            ]
        }
    }
});
}

PlotLine(South_Africa.GetDates,South_Africa.GetCases,South_Africa.GetCountryName,"myChart","#c45850");

// function StreamedData(){
    
//     $.get('https://api.covid19api.com/total/country/south-africa/status/confirmed', function(returnedSessionData)
//     {
//         var RSA_Cases = returnedSessionData;
//         var Cases = [];
//         var Date = [];
//         RSA_Cases.forEach(function(obj){
//             Cases.push(obj.Cases);
//             Date.push(String(obj.Date));
//         })
//         var ctx = document.getElementById('myChart').getContext('2d');
// var myChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels: Date,
//     datasets: [{ 
//         data: Cases,
//         label: "RSA COVID cases",
//         borderColor: "#3e95cd",
//         fill: false
//     }
//     //     data: [282,350,411,502,635,809,947,1402,3700,5267],
//     //     label: "Asia",
//     //     borderColor: "#8e5ea2",
//     //     fill: false
//     //   }, { 
//     //     data: [168,170,178,190,203,276,408,547,675,734],
//     //     label: "Europe",
//     //     borderColor: "#3cba9f",
//     //     fill: false
//     //   }, { 
//     //     data: [40,20,10,16,24,38,74,167,508,784],
//     //     label: "Latin America",
//     //     borderColor: "#e8c3b9",
//     //     fill: false
//     //   }, { 
//     //     data: [6,3,2,2,7,26,82,172,312,433],
//     //     label: "North America",
//     //     borderColor: "#c45850",
//     //     fill: false
//     //   }
//     ]
//   },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// });
        
//     },"json").done(function(){
//         console.log("Completed request")
        
//     });
    
// }
let Compare_Country = new CountryStats();

$("#CountryButton").on("click",function(){

    var EnteredData = String($("#CountryInput").val());
    EnteredData = EnteredData.toLowerCase();
    for(var i = 0; i < EnteredData.length;i++){
        EnteredData = EnteredData.replace(" ","-")
    }
    var API_URL = 'https://api.covid19api.com/total/country/'+EnteredData+'/status/confirmed';
    var Obj = GetApiData(API_URL);
    // var Cases = [];
    // var Dates = [];
    // for(var j = 0; j < Obj.length; j++){
    //     Cases.push(Obj[j].Cases);
    //     Dates.push(Obj[j].Date);
    // }
    Compare_Country.PopulateData(Obj);
    PlotLine(Compare_Country.GetDates,Compare_Country.GetCases,Compare_Country.GetCountryName,"mySecondChart","#3cba9f")
    return;
        
})


// $("#DrawingDiv #myCanvas").mouseenter(function(event){
//     var canvas = document.getElementById('myCanvas');
//     console.log($("#DrawingDiv").width())
//     console.log($("#DrawingDiv").height())
//     console.log($(this).offset())
//     x = $(this).offset().left;
//     y = $(this).offset().top;
//     if (canvas.getContext) {
//         console.log('here')
//         var ctx = canvas.getContext('2d');
    
    
//         var circle = new Path2D();
//         circle.moveTo(x+50, y+50);
//         circle.arc(x, y, 25, 0, 2 * Math.PI);
//         ctx.fillStyle = "black";
       
//       }

// })
// $("#myCanvas").mouseleave(function(event){
//     alert("Bye")
// })

// OBSOLETE JQuery Code

// $("#Covid").on("click",function(event){
//     $("#InfoParagraph").text("COVID-19 has symptoms similar to pneumonia... check the WHO information page listed above or speak to your local doctor. IGNORE UNVALIDATED INFO ON SOCIAL MEDIA")
//     $("#HeartIcon").removeClass("fas fa-heart")
// })

// $("#Etiquette").on("click",function(event){
//     $("#InfoParagraph").text("Please practise good respiratory hygiene; cough and sneeze into a tissue or a flexed elbow. Discard any tissues into a bin and then sanitise your hands ")
//     $("#HeartIcon").removeClass("fas fa-heart")
// })

// $("#Persevere").on("click",function(event){
//     $("#InfoParagraph").text("We'll get through this. Listen to the authorities, look out for one another and stay healthy.")
//     $("#HeartIcon").addClass("fas fa-heart")
    
// })


// var Indices = [];
// for(var h = 0; h < South_Africa.GetCases.length;h++){
//     Indices.push(h);
// }


// // 5th order poly is working well for SA


// // const x = [50, 50, 50, 70, 70, 70, 80, 80, 80, 90, 90, 90, 100, 100, 100];
// // const y = [3.3, 2.8, 2.9, 2.3, 2.6, 2.1, 2.5, 2.9, 2.4, 3.0, 3.1, 2.8, 3.3, 3.5, 3.0];
// const degree = 4; // setup the maximum degree of the polynomial

// const regression = new ML.PolynomialRegression(Indices, South_Africa.GetCases, degree);
// var IndicesLength = Indices.length
// for(var h = 0; h < 25;h++){
//     Indices.push(h+IndicesLength);
// }

// var Predictions = [];
// for(var h = 0; h < Indices.length; h++){
//     Predictions.push(regression.predict(h))
// }

// var ObjArr = [];

// for(var g = 0; g < Indices.length; g++){
//     var DummyObj ={};
//     DummyObj.Cases = Predictions[g];
//     DummyObj.Date = Indices[g];
//     DummyObj.Country = "RSA COVID 19 Predictions";
//     ObjArr.push(DummyObj);
// }

// let RSA_Prediction = new CountryStats();
// RSA_Prediction.PopulateData(ObjArr);
// PlotLine(RSA_Prediction.GetDates,RSA_Prediction.GetCases,RSA_Prediction.GetCountryName,"PredictionChart","rgb(155, 102, 0)")


function CountryCaseSummary(Data){
    var CountrySummary = [];
    var CumulativeCases = 0;
    for(var i = 0; i < Data.Countries.length; i++){
        
        if(Number(Data.Countries[i].TotalConfirmed) > 10000 && Data.Countries[i].Country != "Iran")
        {
            CumulativeCases += Data.Countries[i].TotalConfirmed
            CountrySummary.push({
            CountryName: Data.Countries[i].Country,
            TotalCases: Data.Countries[i].TotalConfirmed
        })
        }
    
}
CumulativeCases = Math.round((CumulativeCases/CovidSummaryStats.cases)*100);
$("#FractionWorldCases").text(CumulativeCases);
$("#ActualTotalCases").text(CovidSummaryStats.cases)
return CountrySummary;
}

function PlotPieChart(CountryDataObj){
    var CountryList = [];
    var Cases = [];
    var Colours = [];
    for(var j = 0; j < CountryDataObj.length;j++){
        CountryList.push(CountryDataObj[j].CountryName);
        Cases.push(CountryDataObj[j].TotalCases);
        var a = Math.floor((Math.random() * 255) + 0);
        var b = Math.floor((Math.random() * 255) + 0);
        var c = Math.floor((Math.random() * 255) + 0);
        // "rgb(155, 102, 0)"
        Colours.push("rgb("+a+", "+b+", "+c+")")

    }
    console.log(Colours);
    console.log(Cases);
    console.log(CountryList);
    new Chart(document.getElementById("SummaryPieChart"), {
        type: 'doughnut',
        data: {
          labels: CountryList,
          datasets: [
            {
              label: "COVID 19 Summary",
              backgroundColor: Colours,
              data: Cases
            }
          ]
        },
        options: {
            tooltips: {
                titleFontSize: 20,
                bodyFontSize: 20
              },
            legend:{
                labels:{fontSize : 20}
                
            },
          title: {
            display: true,
            text: 'Largest COVID 19 Cases',
            fontSize : 20
          }
        }
    });
    return;
}
PlotPieChart(CountryCaseSummary(GetApiData('https://api.covid19api.com/summary')));

$("#slider-distance").on("click",function(){
 
    var Indices = [];

for(var h = 0; h < South_Africa.GetCases.length;h++){
    Indices.push(h);
}
console.log('Training Indices: ' + Indices)

const degree = 4; // setup the maximum degree of the polynomial

const regression = new ML.PolynomialRegression(Indices, South_Africa.GetCases, degree);
console.log(regression.coefficients)

Indices = [];
for(var h = Number( $("#MinValue").val()); h < Number( $("#MaxValue").val());h++){
    Indices.push(h);
}


var Predictions = [];
for(var h = Number( $("#MinValue").val()); h < Number( $("#MaxValue").val()); h++){
    Predictions.push(regression.predict(h)-regression.coefficients[0])
}

var ObjArr = [];

for(var g = 0; g < Indices.length; g++){
    var DummyObj ={};
    DummyObj.Cases = Predictions[g];
    DummyObj.Date = Indices[g];
    DummyObj.Country = "RSA COVID 19 Predictions";
    ObjArr.push(DummyObj);
}

let RSA_Prediction = new CountryStats();
RSA_Prediction.PopulateData(ObjArr);
PlotLine(RSA_Prediction.GetDates,RSA_Prediction.GetCases,RSA_Prediction.GetCountryName,"PredictionChart","rgb(155, 102, 0)")

})



function bubbleSort(arr){
    console.log(arr)
    var len = arr.length;
    for (var i = len-1; i>=0; i--){
      for(var j = 1; j<=i; j++){
        if(arr[j-1].TotalCases<arr[j].TotalCases){
            var temp = arr[j-1];
            arr[j-1] = arr[j];
            arr[j] = temp;
         }
      }
    }
    // arr.pop();
    // arr.pop();
    return arr;
 }

//  <li class="list-group-item d-flex justify-content-between align-items-center">
//                   Cras justo odio
//                   <span class="badge badge-primary badge-pill">14</span>
//                 </li>
// "<li>"+CountryArr[i].CountryName+" - "+CountryArr[i].TotalCases+" cases</li>"

 function AddToCaseRank(CountryArr){
     CountryArr = bubbleSort(CountryArr)
    for(var i = 0; i < CountryArr.length;i++){
        console.log(CountryArr[i].CountryName)
        $("#CaseRankings").append
        (
            "<li class='list-group-item d-flex justify-content-between align-items-center'>"+
            CountryArr[i].CountryName+
            "<span class='badge badge-primary badge-pill'>"+CountryArr[i].TotalCases+"</span>"+
            "</li>"
        )
    }
}

AddToCaseRank(CountryCaseSummary(GetApiData('https://api.covid19api.com/summary')));

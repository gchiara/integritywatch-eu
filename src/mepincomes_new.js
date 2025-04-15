import jquery from 'jquery';
window.jQuery = jquery;
window.$ = jquery;
require( 'datatables.net' )( window, $ )
require( 'datatables.net-dt' )( window, $ )

import underscore from 'underscore';
window.underscore = underscore;
window._ = underscore;

import '../public/vendor/js/popper.min.js'
import '../public/vendor/js/bootstrap.min.js'
import { csv } from 'd3-request'
import { json } from 'd3-request'

import '../public/vendor/css/bootstrap.min.css'
import '../public/vendor/css/dc.css'
import '/scss/main.scss';

import Vue from 'vue';
import Loader from './components/Loader.vue';
import ChartHeader from './components/ChartHeader.vue';


// Data object - is also used by Vue

var vuedata = {
  page: 'mepincomes',
  previousmandate: false,
  loader: true,
  showInfo: true,
  showShare: true,
  chartMargin: 60,
  charts: {
    country: {
      title: 'Country',
      info: 'This chart reflects the numbers of MEPs per EU Member state.'
    },
    politicalGroup: {
      title: 'Political group',
      info: 'Number of MEPs per political group in the European Political Parliament. Share of pie indicates the number of MEPs each political group has from a total of 705.'
    },
    outsideIncome: {
      title: 'Estimated outside income per year',
      info: 'Total estimated outside income declared by the member in the Declaration of Private Interests (EUR). Members declare their income in either monthly or yearly amounts. They can also provide free text instructions, which were interpreted to come to a yearly amount. Incomes where no frequency is provided are considered a one-off. Amounts provided in national currencies are converted to Euro using the exchange rate applicable on the day the data analysis was performed.'
    },
    outsideActivities: {
      title: 'Side activities',
      info: 'Number of side activities declared by MEPs. This includes both paid and unpaid activities.'
    },
    gender: {
      title: 'Gender',
      info: 'Share of MEPs by gender.'
    },
    gea: {
      title: 'General Expenditure Allowance (GEA)',
      info: 'Share of MEPs publishing audited accounts of their General Expenditure Allowance. This is a monthly lump sum provided to MEPs to support their office. MEPs can publish a voluntary audit of these expenditures.'
    },
    age: {
      title: 'Age',
      info: 'Number of MEPs by age group.'
    },
    mepTable: {
      chart: null,
      type: 'table',
      title: 'MEPs',
      info: 'Click on any MEP to view their latest declaration of private interest filled as published on the European Parliament website. Links to their GEA and travel declarations are also provided. Use the table headers to rank MEPs accordingly. By default, the table displays the highest earners on top.'
    }
  },
  selectedMep: {'activitiesData': {}, 'doi': {}, 'attendance': {}},
  colors: {
    groups: {
      "EPP": "#2c4b8e",
      "S&D": "#c31618",
      //"RE": "#0099ff",
      "RE": "#f5c002",
      "Greens/EFA": "#0b7432",
      "Greens / EFA": "#0b7432",
      "ID": "#4A412A",
      "ECR": "#0773a1",
      "NI": "#aaaaaa",
      "NA": "#aaaaaa",
      "NA/NI": "#aaaaaa",
      "GUE/NGL": "#8c1612",
      "ALDE": "#ffc200",
      "EFDD": "#5eced6",
      "ENF": "#a1480d",
      "PfE": "#2b1f57",
      "ESN": "#576476"
    },
    gender: {
      "M": "#2a7aae",
      "F": "#3d95d1",
      "N/A": "#ddd"
    },
    gea: {
      "Yes": "#2a7aae",
      "No": "#ddd",
    },
    //countries: ["#3d95d1"],
    countries: ['#2a7aae'],
    numPies: {
      "0": "#52c993",
      "1": "#42b983",
      "2": "#229983",
      "3": "#1a8883",
      "4": "#127983",
      ">5": "#026973"
    },
    incomes: {
      "None": "#ccc",
      "1 - 5,000": "#3d96d1",
      "5,000 - 10,000": "#3583b8",
      "10,000 - 50,000": "#2e719e",
      "> 50,000": "#265f85",
      "/": "#bbb"
    }
  }
}



//Set vue components and Vue app

Vue.component('chart-header', ChartHeader);
Vue.component('loader', Loader);

new Vue({
  el: '#app',
  data: vuedata,
  methods: {
    //Share
    share: function (platform) {
      if(platform == 'twitter'){
        var thisPage = window.location.href.split('?')[0];
        var shareText = 'How much income is your #MEP earning outside @Europarl_EN? Find out on @TI_EU’s #integritywatch ' + thisPage;
        var shareURL = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareText);
        window.open(shareURL, '_blank');
        return;
      }
      if(platform == 'facebook'){
        //var toShareUrl = window.location.href.split('?')[0];
        var toShareUrl = 'https://integritywatch.eu';
        var shareURL = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(toShareUrl);
        window.open(shareURL, '_blank', 'toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250,top=300,left=300');
        return;
      }
    },
    //Get url parameter
    getUrlParameter: function(sParam) {
      var sPageURL = decodeURIComponent(window.location.search.substring(1)),
          sURLVariables = sPageURL.split('&'),
          sParameterName,
          i
      for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=')
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1]
        }
      }
    },
    //Add commas
    addcommasModal: function (x){
      if(parseInt(x)){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      return x;
    }
  },
  mounted: function () {
  }
});

//Initialize info popovers
$(function () {
  $('[data-toggle="popover"]').popover()
})

//Show notice modal
//$('#noticeModal').modal();

//Charts

var charts = {
  country: {
    chart: dc.rowChart("#country_chart"),
    type: 'row',
  },
  politicalGroup: {
    chart: dc.pieChart("#group_chart"),
    type: 'pie',
  },
  outsideIncome: {
    chart: dc.pieChart("#income_chart"),
    type: 'pie',
  },
  outsideActivities: {
    chart: dc.barChart("#activities_chart"),
    type: 'bar'
  },
  gender: {
    chart: dc.pieChart("#gender_chart"),
    type: 'pie'
  },
  gea: {
    chart: dc.pieChart("#gea_chart"),
    type: 'pie'
  },
  /*
  age: {
    chart: dc.barChart("#age_chart"),
    type: 'bar'
  },
  */
  mepTable: {
    chart: null,
    type: 'table',
  }
}

//Functions for responsivness
var recalcWidth = function() {
  return document.getElementById("countries_chart_col").offsetWidth - vuedata.chartMargin;
};
var recalcCharsLength = function(width) {
  return parseInt(width / 8);
};
var recalcWidthExpense = function() {
  var width = document.getElementById("countries_chart_col").offsetWidth - vuedata.chartMargin;
  return width;
};
var calcPieSize = function() {
  var newWidth = recalcWidth();
  var sizes = {
    'width': newWidth,
    'height': 0,
    'radius': 0,
    'innerRadius': 0,
    'cy': 0,
    'legendY': 0
  }
  if(newWidth < 300) { 
    sizes.height = newWidth + 170;
    sizes.radius = (newWidth)/2;
    sizes.innerRadius = (newWidth)/4;
    sizes.cy = (newWidth)/2;
    sizes.legendY = (newWidth) + 30;
  } else {
    var fraction = 0.75;
    sizes.height = newWidth*fraction + 170;
    sizes.radius = (newWidth*fraction)/2;
    sizes.innerRadius = (newWidth*fraction)/4;
    sizes.cy = (newWidth*fraction)/2;
    sizes.legendY = (newWidth*fraction) + 50;
  }
  return sizes;
};
var resizeGraphs = function() {
  var newWidth = recalcWidth();
  var charsLength = recalcCharsLength(newWidth);
  var sizes = calcPieSize();
  for (var c in charts) {
    if(charts[c].type == 'row'){
      charts[c].chart.width(newWidth);
      charts[c].chart.label(function (d) {
        if(d.key.length > charsLength){
          return d.key.substring(0,charsLength) + '...';
        }
        return d.key;
      })
      charts[c].chart.redraw();
    } else if(charts[c].type == 'pie') {
      charts[c].chart
        .width(sizes.width)
        .height(sizes.height)
        .cy(sizes.cy)
        .innerRadius(sizes.innerRadius)
        .radius(sizes.radius)
        .legend(dc.legend().x(0).y(sizes.legendY).gap(10).autoItemWidth(true).horizontal(true).legendWidth(sizes.width));
      charts[c].chart.redraw();
    } else if(charts[c].type == 'bar') {
      charts[c].chart.width(recalcWidthExpense());
      charts[c].chart.rescale();
      charts[c].chart.redraw();
    }
  }
};
//Calculate age and age range
var getAge = function(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  var agerange = 0;
  if(age < 20){
    agerange = "< 20";
  } else if(age < 30){
    agerange = "20-29";
  } else if(age < 40){
    agerange = "30-39";
  } else if(age < 50){
    agerange = "40-49";
  } else if(age < 60){
    agerange = "50-59";
  } else if(age < 70){
    agerange = "60-69";
  } else if(age < 80){
    agerange = "70-79";
  } else if(age >= 80){
    agerange = "80+";
  } else {
    agerange = "N/A";
    age = "N/A";
  }
  return [age, agerange];
};

//Add commas to thousands
function addcommas(x){
  if(parseInt(x)){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return x;
}

function isNumber(value) {
  return typeof value === 'number';
}

//Custom ordering for min and max
jQuery.extend( jQuery.fn.dataTableExt.oSort, {
  "num-html-pre": function ( a ) {
    var x = String(a).replace( /<[\s\S]*?>/g, "" );
    x = x.split(',').join('')
    return parseFloat( x );
  },
  "num-html-asc": function ( a, b ) {
    return ((a < b) ? -1 : ((a > b) ? 1 : 0));
  },
  "num-html-desc": function ( a, b ) {
      return ((a < b) ? 1 : ((a > b) ? -1 : 0));
  }
});

//Get URL parameters
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

//Load data and generate charts
//Generate random parameter for dynamic dataset loading (to avoid caching)

var randomPar = '';
var randomCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
for ( var i = 0; i < 5; i++ ) {
  randomPar += randomCharacters.charAt(Math.floor(Math.random() * randomCharacters.length));
}

//Select doi datasets, current or previous legislature depending on parameter
var mepsDataset = "./data/meps/dpi_legislature_10/meps.json?" + randomPar;
var doiDataset = "./data/meps/dpi_legislature_10/new_dpi_activities_1.csv?" + randomPar;
var doiExtraFieldsDataset = "./data/meps/dpi_legislature_10/doiExtraFields.json?" + randomPar;

if(getParameterByName('previousmandate') == '1' && getParameterByName('legislature') == '9') {
  mepsDataset = "./data/meps/dpi_legislature_9/meps.json?" + randomPar;
  doiDataset = "./data/meps/dpi_legislature_9/new_dpi_activities_1.csv?" + randomPar;
  doiExtraFieldsDataset = "./data/meps/dpi_legislature_9/doiExtraFields.json?" + randomPar;
  vuedata.previousmandate = true;
}

json(mepsDataset, (err, meps) => {
  csv(doiDataset, (err, doi) => {
    json(doiExtraFieldsDataset , (err, doiExtraFields ) => {
        //Remove doi entries marked as to be removed
        doi =  _.filter(doi, function (x) { return x.to_remove.trim() == '' || (x.to_remove.toLowerCase().trim() !== 'yes' && x.to_remove.toLowerCase().trim() !== 'x')});
        //Parse data
        var doiCategoriesToCountForIncome = ['B', 'C', 'D'];
        _.each(meps, function (d) {
          //Define strings for committees, delegations and substitutes
          d.committeeString = '';
          d.substituteString = '';
          d.delegationString = '';
          if(d.committee && d.committee.length > 0)
          {
            d.committeeString = d.committee.join(', ');
          }
          if(d.substitute && d.substitute.length > 0)
          {
            d.substituteString = d.substitute.join(', ');
          }
          if(d.delegation && d.delegation.length > 0)
          {
            d.delegationString = d.delegation.join(', ');
          }
          //Get DOI
          d.doi = {
            'A': [],
            'B': [],
            'C': [],
            'D': []
          };
          d.activitiesData = {'activitiesNum': 0, 'incomeAmt': 0, 'min': 0, 'max': 0, 'openscale': false};
          d.doiEntries =  _.filter(doi, function (x) { return x.mep_id == d.epid });
          d.doiEfgEntries =  _.find(doiExtraFields, function (x) { return x.mepId == d.epid });
          if(!d.doiEfgEntries) {
            //console.log("No efg fields data");
            d.doiEfgEntries = {
            'E': '',
            'F': '',
            'G': ''};
          }
          if(d.doiEntries && d.doiEntries.length > 0) {
            //TODO - Loop through entries and recreate json structure
            _.each(d.doiEntries, function (act) {
              //Add to main counts
              if(doiCategoriesToCountForIncome.indexOf(act.activity_type) > -1) {
                d.activitiesData.activitiesNum ++;
                if(act.income_amt_total_eur_manual && act.income_amt_total_eur_manual != "" && parseFloat(act.income_amt_total_eur_manual) > 0) {
                  d.activitiesData.incomeAmt += parseFloat(act.income_amt_total_eur_manual);
                } else if(act.income_amt_total_eur_auto && act.income_amt_total_eur_auto != "" && parseFloat(act.income_amt_total_eur_auto) > 0) {
                  d.activitiesData.incomeAmt += parseFloat(act.income_amt_total_eur_auto);
                }
              }
              //console.log(d.full_name + '  |  ' + d.activitiesData.incomeAmt);
              //Add to object
              d.doi[act.activity_type].push(act);
            });
          }
          else {
          }
          d.activitiesData.incomeAmt = parseFloat(d.activitiesData.incomeAmt).toFixed(2);

          //Parse data (gender, age and parties)
          if(d.gender == ""){
            d.gender = "N/A";
          }
          d.age = 'N/A';
          d.ageRange = 'N/A';
          if(d.birthdate && d.birthdate.indexOf('-') > -1){
            var age = getAge(d.birthdate);
            d.age = age[0];
            d.ageRange = age[1];
          }
          if(d.eugroup == 'Group of the European United Left - Nordic Green Left') {
            d.eugroup = 'GUE/NGL';
          }
          if(d.eugroup == 'The Left group in the European Parliament - GUE/NGL') {
            d.eugroup = 'GUE/NGL';
          }
          if(d.eugroup == 'PPE') {
            d.eugroup = 'EPP';
          }
          if(d.eugroup == 'Verts/ALE') {
            d.eugroup = 'Greens/EFA';
          }
          if(d.eugroup == 'Greens / EFA') {
            d.eugroup = 'Greens/EFA';
          }
        });

        //Set dc main vars
        var ndx = crossfilter(meps);
        var searchDimension = ndx.dimension(function (d) {
            var entryString = d.country + ' ' + d.full_name + ' ' + d.party;
            //var entryString = d.country + ' ' + d.first_name + ' ' + d.last_name + ' ' + d.party;
            return entryString.toLowerCase();
        });

        //CHART 1 - Countries
        var createCountriesChart = function() {
          var chart = charts.country.chart;
          var dimension = ndx.dimension(function (d) {
              return d.country;
          });
          var group = dimension.group().reduceSum(function (d) {
              return 1;
          });
          var width = recalcWidth();
          var charsLength = recalcCharsLength(width);
          chart
            .width(width)
            .height(570)
            .margins({top: 0, left: 0, right: 0, bottom: 20})
            .group(group)
            .gap(2)
            .dimension(dimension)
            .ordinalColors(vuedata.colors.countries)
            .label(function (d) {
              var thisKey = d.key;
                if(thisKey.length > charsLength){
                  return thisKey.substring(0,charsLength) + '...';
                }
                return thisKey;
            })
            .title(function (d) {
                return d.key + ': ' + d.value;
            })
            .elasticX(true)
            .xAxis().ticks(4);
          chart.render();
        }

        //CHART 2 - Group
        var createGroupChart = function() {
          var chart = charts.politicalGroup.chart;
          var dimension = ndx.dimension(function (d) {
            return d.eugroup;  
          });
          var group = dimension.group().reduceSum(function (d) { return 1; });
          var sizes = calcPieSize();
          chart
            .width(sizes.width)
            .height(sizes.height)
            .cy(sizes.cy)
            .innerRadius(sizes.innerRadius)
            .radius(sizes.radius)
            .ordering(function(d) { 
              switch(d.key) {
                case 'EPP':
                  return 0;
                  break;
                case 'ECR':
                  return 1;
                  break;
                case 'ID':
                  return 2;
                  break;
                case 'NI':
                  return 3;
                  break;
                case 'NA':
                  return 3;
                  break;
                case 'GUE/NGL':
                  return 4;
                  break;
                case 'S&D':
                  return 5;
                  break;
                case 'Greens/EFA':
                  return 6;
                  break;
                case 'RE':
                  return 6;
                  break;
                default:
                  return 7;
              }
            })
            .legend(dc.legend().x(0).y(sizes.legendY).gap(15).autoItemWidth(true).horizontal(true).legendWidth(sizes.width).legendText(function(d) { 
              var thisKey = d.name;
              if(thisKey.length > 40){
                return thisKey.substring(0,40) + '...';
              }
              return thisKey;
            }))
            .title(function(d){
              return d.key + ': ' + d.value;
            })
            .dimension(dimension)
            .group(group)
            .colorCalculator(function(d, i) {
              return vuedata.colors.groups[d.key];
            });
          chart.render();
        }

        //CHART 3 - Outside income
        var createIncomesChart = function() {
          var chart = charts.outsideIncome.chart;
          var dimension = ndx.dimension(function (d) {
            if (d.activitiesData.incomeAmt == 0) return "None"; 
            if (d.activitiesData.incomeAmt <= 5000 ) return "1 - 5,000"; 
            if (d.activitiesData.incomeAmt <= 10000 ) return "5,000 - 10,000"; 
            if (d.activitiesData.incomeAmt <= 50000 ) return "10,000 - 50,000"; 
            if (d.activitiesData.incomeAmt > 50000 ) return "> 50,000"; 
            return "/";
          });
          var group = dimension.group().reduceSum(function (d) { return 1; });
          var sizes = calcPieSize();
          chart
            .width(sizes.width)
            .height(sizes.height)
            .cy(sizes.cy)
            .ordering(function(d) { 
              switch(d.key) {
                case 'None':
                  return 0;
                  break;
                case '1 - 5,000':
                  return 1;
                  break;
                case '5,000 - 10,000':
                  return 2;
                  break;
                case '10,000 - 50,000':
                  return 3;
                  break;
                case '> 50,000':
                  return 4;
                  break;
                case '/':
                  return 5;
                  break;
                default:
                  return 6;
              }
            })
            .innerRadius(sizes.innerRadius)
            .radius(sizes.radius)
            .legend(dc.legend().x(0).y(sizes.legendY).gap(10).autoItemWidth(true).horizontal(false).legendWidth(sizes.width).legendText(function(d) { 
              var thisKey = d.name;
              if(thisKey.length > 40){
                return thisKey.substring(0,40) + '...';
              }
              return thisKey;
            }))
            .title(function(d){
              return d.key + ': ' + d.value;
            })
            .dimension(dimension)
            .group(group)
            .colorCalculator(function(d, i) {
              return vuedata.colors.incomes[d.key];
            });
          chart.render();
        }

        //CHART 4 - Outside activities
        var createActivitiesChart = function() {
          var chart = charts.outsideActivities.chart;
          var dimension = ndx.dimension(function (d) {
              var activities = d.activitiesData.activitiesNum;
              if(activities > 10) {
                activities = '> 10';
              }
              return activities.toString();
          });
          var group = dimension.group().reduceSum(function (d) {
              return 1;
          });
          var width = recalcWidthExpense();
          chart
            .width(width)
            .height(440)
            .group(group)
            .dimension(dimension)
            .on("preRender",(function(chart,filter){
            }))
            .margins({top: 0, right: 10, bottom: 20, left: 20})
            .x(d3.scaleBand().domain([0,1,2,3,4,5,6,7,8,9,10,"> 10"]))
            .xUnits(dc.units.ordinal)
            .gap(5)
            .elasticY(true)
            .ordinalColors(vuedata.colors.countries)
          chart.render();
        }

        //CHART 5 - Gender
        var createGenderChart = function() {
          var chart = charts.gender.chart;
          var dimension = ndx.dimension(function (d) {
            return d.gender;  
          });
          var group = dimension.group().reduceSum(function (d) { return 1; });
          var filteredGroup = (function(source_group) {
            return {
              all: function() {
                return source_group.all().filter(function(d) {
                  return (d.key == 'M' || d.key == 'F');
                });
              }
            };
          })(group);
          var sizes = calcPieSize();
          chart
            .width(sizes.width)
            .height(sizes.height)
            .cy(sizes.cy)
            .innerRadius(sizes.innerRadius)
            .radius(sizes.radius)
            .legend(dc.legend().x(0).y(sizes.legendY).gap(10).legendText(function(d) { 
              var thisKey = d.name;
              if(thisKey.length > 40){
                return thisKey.substring(0,40) + '...';
              }
              return thisKey;
            }))
            .title(function(d){
              return d.key + ': ' + d.value;
            })
            .dimension(dimension)
            .group(filteredGroup)
            .colorCalculator(function(d, i) {
              return vuedata.colors.gender[d.key];
            });
          chart.render();
        }

        //CHART 6 - GEA
        var createGeaChart = function() {
          var chart = charts.gea.chart;
          var dimension = ndx.dimension(function (d) {
            if(d.has_general_expenditure_allowance == "true"){
              return "Yes";
            } else {
              return "No";
            }
          });
          var group = dimension.group().reduceSum(function (d) { return 1; });
          var sizes = calcPieSize();
          chart
            .width(sizes.width)
            .height(sizes.height)
            .cy(sizes.cy)
            .innerRadius(sizes.innerRadius)
            .radius(sizes.radius)
            .legend(dc.legend().x(0).y(sizes.legendY).gap(10).legendText(function(d) { 
              var thisKey = d.name;
              if(thisKey.length > 40){
                return thisKey.substring(0,40) + '...';
              }
              return thisKey;
            }))
            .title(function(d){
              return d.key + ': ' + d.value;
            })
            .dimension(dimension)
            .group(group)
            .colorCalculator(function(d, i) {
              return vuedata.colors.gea[d.key];
            });
          chart.render();
        }

        //CHART 6 - Age
        var createAgeChart = function() {
          var chart = charts.age.chart;
          var dimension = ndx.dimension(function (d) {
              return d.ageRange;
          });
          var group = dimension.group().reduceSum(function (d) {
              return 1;
          });
          var width = recalcWidthExpense();
          chart
            .width(width)
            .height(440)
            .group(group)
            .dimension(dimension)
            .on("preRender",(function(chart,filter){
            }))
            .margins({top: 0, right: 10, bottom: 20, left: 20})
            .x(d3.scaleBand().domain(["N/A", "< 20", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80+"]))
            .xUnits(dc.units.ordinal)
            .gap(10)
            .elasticY(true)
            .ordinalColors(vuedata.colors.countries)
          chart.render();
        }

        //TABLE
        var createTable = function() {
          var count=0;
          charts.mepTable.chart = $("#dc-data-table").dataTable({
            "columnDefs": [
              {
                "searchable": false,
                "orderable": false,
                "targets": 0,   
                data: function ( row, type, val, meta ) {
                  return count;
                }
              },
              {
                "searchable": false,
                "orderable": true,
                "targets": 1,
                "defaultContent":"N/A",
                "data": function(d) {
                  return d.first_name + ' ' + d.last_name;
                }
              },
              {
                "searchable": false,
                "orderable": true,
                "targets": 2,
                "defaultContent":"N/A",
                "data": function(d) {
                  return d.country;
                }
              },
              {
                "searchable": false,
                "orderable": true,
                "targets": 3,
                "defaultContent":"N/A",
                "data": function(d) {
                  return d.eugroup;
                }
              },
              {
                "searchable": false,
                "orderable": true,
                "targets": 4,
                "defaultContent":"N/A",
                "orderSequence": ['desc', 'asc', ''],
                "data": function(d) {
                  return d.activitiesData.activitiesNum;
                }
              },
              {
                "searchable": false,
                "orderable": true,
                "targets": 5,
                "defaultContent":"N/A",
                "type": "num-html",
                "orderSequence": ['desc', 'asc', ''],
                "data": function(d) {
                  if(d.activitiesData.incomeAmt)
                  {
                    return addcommas(d.activitiesData.incomeAmt) + ' €';
                  }
                }
              },
              {
                "searchable": false,
                "orderable": true,
                "targets": 6,
                "defaultContent":"N/A",
                "orderSequence": ['desc', 'asc', ''],
                "data": function(d) {
                  if(d.has_general_expenditure_allowance == "true"){
                    return "Yes";
                  } else {
                    return "No";
                  }
                }
              },
              {
                "searchable": false,
                "orderable": true,
                "targets": 7,
                "defaultContent":"N/A",
                "orderSequence": ['desc', 'asc', ''],
                "data": function(d) {
                  if(d.events_declaration_num){
                    return d.events_declaration_num;
                  } else {
                    return 0;
                  }
                }
              }
            ],
            "iDisplayLength" : 25,
            "bPaginate": true,
            "bLengthChange": true,
            "bFilter": false,
            "order": [[ 5, "desc" ]],
            "bSort": true,
            "bInfo": true,
            "bAutoWidth": false,
            "bDeferRender": true,
            "aaData": searchDimension.top(Infinity),
            "bDestroy": true,
          });
          var datatable = charts.mepTable.chart;
          datatable.on( 'draw.dt', function () {
            var PageInfo = $('#dc-data-table').DataTable().page.info();
              datatable.DataTable().column(0, { page: 'current' }).nodes().each( function (cell, i) {
                  cell.innerHTML = i + 1 + PageInfo.start;
              });
            });
            datatable.DataTable().draw();

          $('#dc-data-table tbody').on('click', 'tr', function () {
            var data = datatable.DataTable().row( this ).data();
            vuedata.selectedMep = data;
            //console.log(vuedata.selectedMep);
            if(vuedata.selectedMep.doi == 'undefined' || vuedata.selectedMep.doi == null) {
              vuedata.selectedMep.doi = {'url': '', 'date': '/'};
            }
            $('#detailsModal').modal();
          });
        }
        //REFRESH TABLE
        function RefreshTable() {
          dc.events.trigger(function () {
            var alldata = searchDimension.top(Infinity);
            charts.mepTable.chart.fnClearTable();
            charts.mepTable.chart.fnAddData(alldata);
            charts.mepTable.chart.fnDraw();
          });
        }

        //SEARCH INPUT FUNCTIONALITY
        var typingTimer;
        var doneTypingInterval = 1000;
        var $input = $("#search-input");
        $input.on('keyup', function () {
          clearTimeout(typingTimer);
          typingTimer = setTimeout(doneTyping, doneTypingInterval);
        });
        $input.on('keydown', function () {
          clearTimeout(typingTimer);
        });
        function doneTyping () {
          var s = $input.val().toLowerCase();
          searchDimension.filter(function(d) { 
            return d.indexOf(s) !== -1;
          });
          throttle();
          var throttleTimer;
          function throttle() {
            window.clearTimeout(throttleTimer);
            throttleTimer = window.setTimeout(function() {
                dc.redrawAll();
            }, 250);
          }
        }

        //Reset charts
        var resetGraphs = function() {
          for (var c in charts) {
            if(charts[c].type !== 'table' && charts[c].chart.hasFilter()){
              charts[c].chart.filterAll();
            }
          }
          searchDimension.filter(null);
          $('#search-input').val('');
          dc.redrawAll();
        }
        $('.reset-btn').click(function(){
          resetGraphs();
        })
        
        //Render charts
        createCountriesChart();
        createGroupChart();
        createIncomesChart();
        createActivitiesChart();
        createGenderChart();
        createGeaChart();
        //createAgeChart();
        createTable();

        $('.dataTables_wrapper').append($('.dataTables_length'));

        //Hide loader
        vuedata.loader = false;

        //COUNTERS
        //Main counter
        var all = ndx.groupAll();
        var counter = dc.dataCount('.dc-data-count')
          .dimension(ndx)
          .group(all);
        counter.render();
        counter.on("renderlet.resetall", function(c) {
          RefreshTable();
        });
        //Custom counters
        function minToNum(min) {
          if(isNaN(min)){
            return 0;
          } else {
            return min;
          }
        };
        function drawActivitiesCounter() {
          var dim = ndx.dimension (function(d) {
            if (!d.epid) {
              return "";
            } else {
              return d.epid;
            }
          });
          var group = dim.group().reduce(
            function(p,d) {  
              p.nb +=1;
              if (!d.epid || !d.activitiesData) {
                return p;
              }
              p.actnum = +d.activitiesData.activitiesNum;
              p.min += +minToNum(d.activitiesData.incomeAmt);
              return p;
            },
            function(p,d) {  
              p.nb -=1;
              if (!d.epid || !d.activitiesData) {
                return p;
              }
              p.actnum = +d.activitiesData.activitiesNum;
              p.min -= +minToNum(d.activitiesData.incomeAmt);
              return p;
            },
            function(p,d) {  
              return {nb: 0, actnum:0, min: 0}; 
            }
          );
          group.order(function(p){ return p.nb });
          var actnum = 0;
          var min = 0;
          var counter = dc.dataCount(".count-box-activities")
          .dimension(group)
          .group({value: function() {
            min = 0;
            return group.all().filter(function(kv) {
              if (kv.value.nb >0) {
                actnum += +kv.value.actnum;
                min += +kv.value.min;
              }
              return kv.value.nb > 0; 
            }).length;
          }})
          .renderlet(function (chart) {
            $(".nbactivities").text(addcommas(Math.round(actnum)));
            $(".nbestimated").text(addcommas(Math.round(min)) + ' €');
            actnum=0;
          });
          counter.render();
        }
        drawActivitiesCounter();

        //Window resize function
        window.onresize = function(event) {
          resizeGraphs();
        };
        //Show disclaimer modal
        //$('#disclaimerModal').modal();
    });
  });
});
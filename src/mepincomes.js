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
  loader: true,
  showInfo: true,
  showShare: true,
  showDOIdateCol: false,
  chartMargin: 60,
  charts: {
    country: {
      title: 'Country',
      info: 'This chart reflects the numbers of MEPs per EU Member state.'
    },
    politicalGroup: {
      title: 'Political group',
      info: 'Number of MEPs per political group in the European Political Parliament. Share of pie indicates the number of MEPs each political group has from a total of 751.'
    },
    outsideIncome: {
      title: 'Outside income per year',
      info: 'Total yearly outside income declared by the member in the Declaration of Financial Interests (EUR).'
    },
    outsideActivities: {
      title: 'Outside activities',
      info: 'Number of outside activities declared by MEPs. This includes both paid and unpaid activities.'
    },
    gender: {
      title: 'Gender',
      info: 'Number of MEPs by gender.'
    },
    age: {
      title: 'Age',
      info: 'Number of MEPs by age group.'
    },
    mepTable: {
      chart: null,
      type: 'table',
      title: 'MEPs',
      info: 'Click on any MEP to view their latest declaration of financial interest filled with the European Parliament. Minimum and Maximum outside income are displayed on a per annum basis.'
    }
  },
  selectedMep: {'activitiesData': {}, 'doi': {}, 'attendance': {}},
  colors: {
    groups: {
      "EPP": "#2c4b8e",
      "S&D": "#c31618",
      "RE": "#0099ff",
      "Greens/EFA": "#0b7432",
      "ID": "#0c6eb5",
      "ECR": "#0773a1",
      "NI": "#aaaaaa",
      "NA": "#aaaaaa",
      "NA/NI": "#aaaaaa",
      "GUE/NGL": "#8c1612",
      "ALDE": "#ffc200",
      "EFDD": "#5eced6",
      "ENF": "#a1480d"
    },
    gender: {
      "M": "#2a7aae",
      "F": "#3d95d1",
      "N/A": "#ccc"
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
      "< 6,000": "#3d96d1",
      "< 12,000": "#3583b8",
      "< 60,000": "#2e719e",
      "< 120,000": "#265f85",
      "120,000 or more": "#1f4d6b"
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
    },
    //Calc activity income for modal
    calcIncomeRange: function (d, isNewDoi) {
      var i = d[1];
      var min = 0;
      var max = 0;
      var openscale = false;
      if((i >= 4 && i < 100 && !isNewDoi) || (i > 4 && i < 100 && isNewDoi)) {
        openscale = true;
        if(i > 4 && !isNewDoi) {
          i = 4;
        }
        if(i > 5 && isNewDoi) {
          i = 5;
        }
      }
      if(isNaN(i) || i >= 100) {
        if (i.slice(-3)  == "EUR") {
          if(i.substring(0, 1).match("\\d.*")){
            min += i.substr(0,i.length - 4) * 1;
            max += i.substr(0,i.length - 4) * 1;
          } else {
            min += parseInt(i.replace(/[^0-9\.]/g, ''), 10);
            max += parseInt(i.replace(/[^0-9\.]/g, ''), 10);
          }
        } else {
          min += Math.round(convert (i));
          max += Math.round(convert (i));
        } 
      } else {
        if(isNewDoi){
          if(i < 0){
            min += 0;
            max += 0;
          } else if(i == 0){
            min += rangeEURnew[i].min;
            max += 0;
          } else {
            min += rangeEURnew[i].min;
            max += rangeEURnew[i].max;
          }
        } else {
          if(i < 0){
            min += 0;
            max += 499;
          } else if(i == 0){
            min += rangeEUR[i].min;
            max += 0;
          } else {
            min += rangeEUR[i].min;
            max += rangeEUR[i].max;
          }
        }
      }
      var totals = {'min': min, 'max': max, 'openscale': openscale};
      if(min == max) {
        return this.addcommasModal(max);
      } else if(max == 'Infinity'){
        return this.addcommasModal(min) + ' or more';
      }
      return this.addcommasModal(min) + ' ↝ ' + this.addcommasModal(max);
    }
  },
  mounted: function () {
    if(this.getUrlParameter('showdoidate') == 'true'){
      this.showDOIdateCol = true;
      vuedata.showDOIdateCol = true;
    }
  }
});

//Initialize info popovers
$(function () {
  $('[data-toggle="popover"]').popover()
})

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
  age: {
    chart: dc.barChart("#age_chart"),
    type: 'bar'
  },
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
}
var rangeEUR = [
  {min:0,max:499},
  {min:500,max:1000},
  {min:1001,max:5000},
  {min:5001,max:10000},
  {min:10001,max:Number.POSITIVE_INFINITY},
]; 
var rangeEURnew = [
  {min:0,max:0},
  {min:1,max:499},
  {min:500,max:1000},
  {min:1001,max:5000},
  {min:5001,max:10000},
  {min:10001,max:Number.POSITIVE_INFINITY},
];
var convert = function (i) {
  var numvalue = parseInt(i.replace(/[^0-9\.]/g, ''), 10);
  if (i.slice(-3)  == "EUR") return numvalue * 1;
  if (i.slice(-3)  == "GBP") return numvalue * 1.25;
  if (i.slice(-3)  == "SEK") return numvalue * 0.11;
  if (i.slice(-3)  == "HRK") return numvalue * 0.13;
  if (i.slice(-3)  == "CZK") return numvalue * 0.035;
  if(isNaN(parseInt(i))){
    return 0;
  }
  return parseInt(i);
}
//Calculate activities number and income
//Single activity cal is done in Vue method to be used in modal
//All activities
var sumActivities = function(doi) {
  var fields = ["activity","holding","mandate","occasional","membership"];
  var activitiesNum = 0;
  var min = 0;
  var max = 0;
  var openscale = false;
  _.each (fields, function (f) {
    if(doi[f] && doi[f].length > 0){
      activitiesNum += doi[f].length;
      //Loop through activities
      _.each(doi[f], function (d) {
        var i = d[1];
        if((i >= 4 && i < 100 && !doi.isNewDoi) || (i > 4 && i < 100 && doi.isNewDoi)) {
          openscale = true;
          if(i > 4 && !doi.isNewDoi) {
            i = 4;
          }
          if(i > 5 && doi.isNewDoi) {
            i = 5;
          }
        }
        if(isNaN(i) || i >= 100) {
          if (i.slice(-3)  == "EUR") {
            if(i.substring(0, 1).match("\\d.*")){
              min += i.substr(0,i.length - 4) * 1;
              max += i.substr(0,i.length - 4) * 1;
            } else {
              min += parseInt(i.replace(/[^0-9\.]/g, ''), 10);
              max += parseInt(i.replace(/[^0-9\.]/g, ''), 10);
            }
          } else {
            min += Math.round(convert (i));
            max += Math.round(convert (i));
          } 
        } else {
          if(doi.isNewDoi){
            if(i < 0){
              min += 0;
              max += 0;
            } else if(i == 0){
              min += rangeEURnew[i].min;
              max += 0;
            } else {
              min += rangeEURnew[i].min;
              max += rangeEURnew[i].max;
            }
          } else {
            if(i < 0){
              min += 0;
              max += 499;
            } else if(i == 0){
              min += rangeEUR[i].min;
              max += 0;
            } else {
              min += rangeEUR[i].min;
              max += rangeEUR[i].max;
            }
          }
        }
      });
    }
  });
  return {'activitiesNum': activitiesNum, 'min': min, 'max': max, 'openscale': openscale};
}
//Add commas to thousands
function addcommas(x){
  if(parseInt(x)){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return x;
}
//New or old DOI type for income values
var isNewDoi = function(doi) {
  var ddate = doi.date;
  if(ddate != ""){
    var dparts = ddate.split('/');
    var ddate2 = new Date(dparts[2],dparts[1]-1,dparts[0]);
    var ddate3 = new Date('2017','2','1');
    if(ddate2.getTime() >= ddate3.getTime()){
      return true;
    }
  }
  return false;
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

//Load data and generate charts

csv('./data/meps/mep.csv', (err, meps) => {
  json('./data/meps/doi-pretty.json', (err, doi) => {
    csv('./data/meps/attendance.csv', (err, attendance) => {
      csv('./data/meps/doifix.csv', (err, doifix) => {
        //Ignore extra people
        var ignoreIds = ['128717', '124840', '96901', '4545', '124743', '124903'];
        meps = _.filter(meps, function(mep, index) {
          //console.log(mep);
          return ignoreIds.indexOf(mep.epid) == -1;
        });
        //Parse data
        _.each(meps, function (d) {
          //Get DOI
          d.doi =  _.find(doi, function (x) { return x.mep_id == d.epid });
          //Doifix - replace text and value
          if(d.epid == 124753 && d.doi.mandate[0]){
            d.doi.mandate[0][0] = "Conseillère municipale (sans indemnité)";
            d.doi.mandate[0][1] = "0";
          }
          if(d.epid == 124760 && d.doi.mandate[0]){
            d.doi.mandate[0][0] = "Conseiller régional de Haute Normandie";
            d.doi.mandate[0][1] = "2000";
          }
          if(d.epid == 124951 && d.doi.mandate[0]){
            d.doi.mandate[0][0]  = "County Councillor";
            d.doi.mandate[0][1] = "937.18 EUR (833,33 GBP)";
          }
          //Apply doifix from csv
          var tofix = _.filter(doifix, function (f) { return f.mep_id == d.epid  });
          var acttypes = ['mandate','occasional','membership','holding','activity','occupation','events'];
          if(tofix.length > 0){
            if(d.epid == '72775') {
              //console.log(tofix);
            }
            _.each(tofix, function (tf) {
              acttypes.forEach(function(type) {
                if(d.doi[type]){
                  for (var i = 0; i < d.doi[type].length; i++) {
                    if (d.doi[type][i][0] === tf.activities) {
                      d.doi[type][i][1] = tf.income + ' EUR';
                      break;
                    }
                  }
                }
              });
            });	
          }
          //End apply doifix
          d.activitiesData = {'activitiesNum': 0, 'min': 0, 'max': 0, 'openscale': false};
          if(d.doi) {
            d.doi.isNewDoi = isNewDoi(d.doi);
            d.activitiesData = sumActivities(d.doi);
          }
          //Get attendance
          d.attendance = {"total": 0 , "attended": 0, "score": 0};
          var a = _.find(attendance,function (x) { return x.id == d.epid  });
          if(a) {
            d.attendance = {"total": parseInt(a.votes,10) , "attended": parseInt(a.voted,10), "score": parseFloat(a.percent)};
          }
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
          if(d.eugroup == 'PPE') {
            d.eugroup = 'EPP';
          }
          if(d.eugroup == 'Verts/ALE') {
            d.eugroup = 'Greens/EFA';
          }
        });

        //Set dc main vars
        var ndx = crossfilter(meps);
        var searchDimension = ndx.dimension(function (d) {
            var entryString = d.country + ' ' + d.first_name + ' ' + d.last_name + ' ' + d.party;
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
            .height(550)
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
            .legend(dc.legend().x(0).y(sizes.legendY).gap(10).autoItemWidth(true).horizontal(true).legendWidth(sizes.width).legendText(function(d) { 
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
            if (d.activitiesData.min == 0 && d.activitiesData.max == 0) return "None"; 
            if (d.activitiesData.min < 500 ) return "< 6,000"; 
            if (d.activitiesData.min < 1001 ) return "< 12,000"; 
            if (d.activitiesData.min < 5001 ) return "< 60,000"; 
            if (d.activitiesData.min < 10001 ) return "< 120,000"; 
            return "120,000 or more";
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
                case '< 6,000':
                  return 1;
                  break;
                case '< 12,000':
                  return 2;
                  break;
                case '< 60,000':
                  return 3;
                  break;
                case '< 120,000':
                  return 4;
                  break;
                case '120,000 or more':
                  return 5;
                  break;
                default:
                  return 6;
              }
            })
            .innerRadius(sizes.innerRadius)
            .radius(sizes.radius)
            .legend(dc.legend().x(0).y(sizes.legendY).gap(10).autoItemWidth(true).horizontal(true).legendWidth(sizes.width).legendText(function(d) { 
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
              /*
              {
                "searchable": false,
                "orderable": true,
                "targets": 4,
                "defaultContent":"N/A",
                "data": function(d) {
                  return d.attendance.score + '%';
                }
              },
              */
              {
                "searchable": false,
                "orderable": true,
                "targets": 4,
                "defaultContent":"N/A",
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
                "data": function(d) {
                  return addcommas((d.activitiesData.min * 12).toFixed(0)) + ' €';
                }
              },
              {
                "searchable": false,
                "orderable": true,
                "targets": 6,
                "defaultContent":"N/A",
                "type": "num-html",
                "data": function(d) {
                  var max = d.activitiesData.max;
                  if(max == 'Infinity'){
                    return addcommas((d.activitiesData.min * 12).toFixed(0)) + ' +' + ' €';
                  }
                  return addcommas((max * 12).toFixed(0)) + ' €';
                }
              },
              {
                "searchable": false,
                "orderable": true,
                "targets": 7,
                "defaultContent":"N/A",
                "data": function(d) {
                  if(d.doi){
                    return d.doi.date;
                  } else {
                    return "X";
                  }
                }
              }
            ],
            "iDisplayLength" : 25,
            "bPaginate": true,
            "bLengthChange": true,
            "bFilter": false,
            "order": [[ 6, "desc" ]],
            "bSort": true,
            "bInfo": true,
            "bAutoWidth": false,
            "bDeferRender": true,
            "aaData": searchDimension.top(Infinity),
            "bDestroy": true,
          });
          var datatable = charts.mepTable.chart;
          //Hide DOI date column if parameter is not true
          if(vuedata.showDOIdateCol == false) {
            datatable.DataTable().column(7).visible(false);
          }
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
        createAgeChart();
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
            return min*12;
          }
        };
        function maxToNum(min,max) {
          if(isNaN(max)){
            return 0;
          } else if(max == 'Infinity'){
            return min*12;
          } else {
            return max*12;
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
              p.min += +minToNum(d.activitiesData.min);
              p.max += +maxToNum(d.activitiesData.min, d.activitiesData.max);
              return p;
            },
            function(p,d) {  
              p.nb -=1;
              if (!d.epid || !d.activitiesData) {
                return p;
              }
              p.actnum = +d.activitiesData.activitiesNum;
              p.min -= +minToNum(d.activitiesData.min);
              p.max -= +maxToNum(d.activitiesData.min, d.activitiesData.max);
              return p;
            },
            function(p,d) {  
              return {nb: 0, actnum:0, min: 0, max: 0}; 
            }
          );
          group.order(function(p){ return p.nb });
          var actnum = 0;
          var min = 0;
          var max = 0;

          var counter = dc.dataCount(".count-box-activities")
          .dimension(group)
          .group({value: function() {
            min = 0;
            max = 0;
            return group.all().filter(function(kv) {
              if (kv.value.nb >0) {
                actnum += +kv.value.actnum;
                min += +kv.value.min;
                max += +kv.value.max;
              }
              return kv.value.nb > 0; 
            }).length;
          }})
          .renderlet(function (chart) {
            $(".nbactivities").text(addcommas(Math.round(actnum)));
            $(".nbmin").text(addcommas(Math.round(min)) + ' €');
            $(".nbmax").text(addcommas(Math.round(max)) + ' €');
            actnum=0;
          });
          counter.render();
        }
        drawActivitiesCounter();

        //Window resize function
        window.onresize = function(event) {
          resizeGraphs();
        };
      });
    });
  });
});
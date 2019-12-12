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

import '../public/vendor/css/bootstrap.min.css'
import '../public/vendor/css/dc.css'
import '/scss/main.scss';

import Vue from 'vue';
import Loader from './components/Loader.vue';
import ChartHeader from './components/ChartHeader.vue';


// Data object - is also used by Vue

var vuedata = {
  page: 'organizations',
  loader: true,
  showInfo: true,
  showShare: true,
  chartMargin: 60,
  charts: {
    topCountries: {
      title: 'Top 10 countries',
      info: 'Countries where organisations are headquartered according to their filings with the EU Transparency Register. Graph indicates the number of organisations headquartered in each country. Note: many organisations choose Brussels as their headquarters but are not necessarily Belgian organisations.'
    },
    expense: {
      title: 'Lobbying expense',
      info: 'Lobby budget as declared by the organisation in the EU Transparency Register under estimate of the annual costs related to activities covered by the register. According to the official guidelines estimates should include staff costs, office, administrative and operational expenses, outsourced activities, memberships and other relevant costs. The costs are often declared on an annual basis.'
    },
    accreditations: {
      title: 'Parliament accreditations',
      info: 'Number of access badges to the European Parliament per lobby organisation. All registered lobby organisations can obtain access badges to the European Parliament – numbers are not caped. Share of the pie indicates the number of organisations that have this many badges.'
    },
    meetings: {
      title: 'Number of high-level lobby meetings',
      info: 'Number of high-level lobby meetings with the European Commission per lobby organisation. Share of pie indicates the number of organisations that have this many meetings.'
    },
    lobbyists: {
      title: 'Lobbyists',
      info: 'Number of lobbyists (in full-time equivalent) as declared by the organisation on the eu transparency register. '
    },
    orgCategory: {
      title: 'Category of lobby organisation',
      info: 'The classifications in this graph reflect the categories established by the EU Transparency Register. Names have been shortened. The shares of the pie reflect the number of registered organisations per category.'
    },
    orgSubcategory: {
      title: 'Sub-category of lobby organisation',
      info: 'The classifications in this graph reflect the sub-categories established by the EU Transparency Register. Some names have been shortened. Graph indicates the number of registered lobby organisations per sub-category.'
    },
    orgTable: {
      chart: null,
      type: 'table',
      title: 'Registered lobby organisations',
      info: '<strong>meetings:</strong><br />Number of high-level meetings the organisation has had with the european commission since december 2014.<br /><br /><strong>lobby expense:</strong><br />Lobby budget as declared by the organisation in the eu transparency register under “estimate of the annual costs related to activities covered by the register”. according to the official guidelines estimates should include staff costs, office, administrative and operational expenses, outsourced activities, memberships and other relevant costs.<br /><br /> <strong>lobbyists:</strong><br />Number of lobbyists (in full-time equivalent) as declared by the organisation on the eu transparency register.<br /><br /> <strong>ep badges:</strong><br />Number of access badges to the european parliament that the organisation holds for the lobbyists. information published on the eu transparency register.'
    }
  },
  selectedOrg: { "Name": "", "Country": "", "Meetings": 0, "Id": "", "People": 0, "Accred": 0, "CostsR": "" },
  categories: {
    "I": "Consultants",
    "II": "Corporate",
    "III": "NGOs",
    "IV": "Think tanks",
    "V": "Churches",
    "VI": "Municipal",
    "": "Unknown"
  },
  subCategories: {
    "Law firms": "Law firms",
    "Professional consultancies": "Professional consultancies",
    "Self-employed consultants": "Self-employed consultants",
    "Companies & groups": "Companies & groups",
    "Other organisations": "Other in house lobbyists",
    "Trade and business associations": "Trade and business organisations",
    "Trade unions and professional associations": "Trade unions",
    "Non-governmental organisations, platforms and networks and similar": "NGO's & civil society",
    "Academic institutions": "Academic institutions",
    "Think tanks and research institutions": "Think tanks and research institutions",
    "Organisations representing churches and religious communities": "Churches & religious communities",
    "Other public or mixed entities, created by law whose purpose is to act in the public interest": "Other public or mixed entities",
    "Other sub-national public authorities": "Other sub-national public authorities",
    "Regional structures": "Regional structures",
    "Transnational associations and networks": "Transnational public networks",
    "Transnational associations and networks of public regional or other sub-national authorities": "Transnational public networks",
    "Unknown": "Unknown"
  },
  subCategoriesCat: {
    "Law firms": "Consultants",
    "Professional consultancies": "Consultants",
    "Self-employed consultants": "Consultants",
    "Companies & groups": "Corporate",
    "Other in house lobbyists": "Corporate",
    "Trade and business organisations": "Corporate",
    "Trade unions": "Corporate",
    "NGO's & civil society": "NGOs",
    "Academic institutions": "Think tanks",
    "Think tanks and research institutions": "Think tanks",
    "Churches & religious communities": "Churches",
    "Other public or mixed entities": "Municipal",
    "Other sub-national public authorities": "Municipal",
    "Regional structures": "Municipal",
    "Transnational public networks": "Municipal",
    "Unknown": "Unknown"
  },
  countries: [],
  colors: {
    orgType: {
      "Consultants": "#42b983",
      "Corporate": "#449188",
      "NGOs": "#52c993",
      "Think tanks": "#28b99f",
      "Churches": "#127983",
      "Municipal": "#026973",
      "Unknown": "#ccc"
    },
    //countries: ["#52c993"],
    countries: ["#127983"],
    numPies: {
      "0": "#52c993",
      "1": "#42b983",
      "2": "#229983",
      "3": "#1a8883",
      "4": "#127983",
      ">5": "#026973"
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
        var shareText = 'Who’s #lobbying the @EU_Commission and how much are they spending? Check out @TI_EU’s #integritywatch ' + thisPage;
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
    }
  }
});

//Initialize info popovers
$(function () {
  $('[data-toggle="popover"]').popover()
})



//Charts

var charts = {
  topCountries: {
    chart: dc.rowChart("#topcountries_chart"),
    type: 'row',
  },
  expense: {
    chart: dc.barChart("#expense_chart"),
    type: 'bar',
  },
  orgCategory: {
    chart: dc.pieChart("#orgcategory_chart"),
    type: 'pie',
  },
  accreditations: {
    chart: dc.pieChart("#accreditations_chart"),
    type: 'pie',
    customLegend: ' accredited lobbyists: '
  },
  meetings: {
    chart: dc.pieChart("#meetings_chart"),
    type: 'pie',
    customLegend: ' meetings: '
  },
  lobbyists: {
    chart: dc.pieChart("#lobbyists_chart"),
    type: 'pie',
    customLegend: ' lobbyists: '
  },
  orgSubcategory: {
    chart: dc.rowChart("#orgsubcategory_chart"),
    type: 'row',
  },
  orgTable: {
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
  var width = document.getElementById("expense_chart_col").offsetWidth - vuedata.chartMargin;
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
    sizes.height = newWidth*0.75 + 170;
    sizes.radius = (newWidth*0.75)/2;
    sizes.innerRadius = (newWidth*0.75)/4;
    sizes.cy = (newWidth*0.75)/2;
    sizes.legendY = (newWidth*0.75) + 30;
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
        var thisKey = d.key;
        if(thisKey.indexOf('###') > -1){
          thisKey = thisKey.split('###')[0];
        }
        if(thisKey.length > charsLength){
          return thisKey.substring(0,charsLength) + '...';
        }
        return thisKey;
      })
      charts[c].chart.redraw();
    } else if(charts[c].type == 'pie') {
      charts[c].chart
        .width(sizes.width)
        .height(sizes.height)
        .cy(sizes.cy)
        .innerRadius(sizes.innerRadius)
        .radius(sizes.radius)
        .legend(dc.legend().x(0).y(sizes.legendY).gap(10));
      charts[c].chart.redraw();
    } else if(charts[c].type == 'bar') {
      charts[c].chart.width(recalcWidthExpense());
      charts[c].chart.rescale();
      charts[c].chart.redraw();
    }
  }
};
//Add commas to thousands
function addcommas(x){
  if(parseInt(x)){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return x;
}
//Custom date order for dataTables
var dmy = d3.timeParse("%d/%m/%Y");
jQuery.extend( jQuery.fn.dataTableExt.oSort, {
  "date-eu-pre": function (date) {
    if(date.indexOf("Cancelled") > -1){
      date = date.split(" ")[0];
    }
      return dmy(date);
  },
  "date-eu-asc": function ( a, b ) {
      return ((a < b) ? -1 : ((a > b) ? 1 : 0));
  },
  "date-eu-desc": function ( a, b ) {
      return ((a < b) ? 1 : ((a > b) ? -1 : 0));
  }
});

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
//Generate random parameter for dynamic dataset loading (to avoid caching)

var randomPar = '';
var randomCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
for ( var i = 0; i < 5; i++ ) {
  randomPar += randomCharacters.charAt(Math.floor(Math.random() * randomCharacters.length));
}

csv('./data/organizations.csv?' + randomPar, (err, organizations) => {
  //Parse data
  _.each(organizations, function (d) {
    //Add country to array if not present
    if(vuedata.countries.indexOf(d.Country) == -1){
      vuedata.countries.push(d.Country);
    }
    //Short category name
    d.CatShort = '';
    if(d.Cat.indexOf(' - ') > -1){
      d.CatShort = d.Cat.split(' - ')[0];
    }
    d.CatName = vuedata.categories[d.CatShort];
    d.subCatName = 'Unknown';
    if(vuedata.subCategories[d.Cat2]){
      d.subCatName = vuedata.subCategories[d.Cat2];
    }
    d.Color = vuedata.colors.orgType[d.CatName];
    //Cost Amount if available, else lowest value of cost Range. Also create cost string for modal
    d.costVal = '';
    d.costValType = 'R';
    d.costString = '';
    if(d.CostsA && $.isNumeric(d.CostsA)){
      d.costVal = parseInt(d.CostsA);
      d.costValType = 'A';
      d.costString = addcommas(d.costVal) + ' €';
    } else if(d.CostsR && d.CostsR.indexOf('-') > -1){
      var costsplit = d.CostsR.split('-');
      d.costVal = parseInt(costsplit[0]);
      d.costString = 'min ' + addcommas(costsplit[0]) + ' € / max ' + addcommas(costsplit[1]) + ' €';
    } else if(d.CostsR && d.CostsR.indexOf('>') > -1){
      d.costVal = parseInt(d.CostsR.split('>')[1]);
      d.costString = '> ' + addcommas(d.costVal) + ' €';
    }
    d.expenseVal = 0;
    if(!$.isNumeric(d.costVal)){
      d.expenseVal = 'N/A';
    } else if(d.costVal == 0 && d.costValType == 'A'){
      d.expenseVal = '0';
    } else if(d.costVal < 10000){
      d.expenseVal = '< 10K';
    } else if(d.costVal <= 50000){
      d.expenseVal = '10-50K';
    } else if(d.costVal <= 100000){
      d.expenseVal = '50-100K';
    } else if(d.costVal <= 500000){
      d.expenseVal = '100-500K';
    } else if(d.costVal <= 1000000){
      d.expenseVal = '500K-1M';
    } else if(d.costVal <= 2000000){
      d.expenseVal = '1-2M';
    } else if(d.costVal <= 5000000){
      d.expenseVal = '2-5M';
    } else if(d.costVal > 5000000){
      d.expenseVal = '> 5M';
    }
    
    //Accredited value for pie
    d.accredNum = 0;
    if(d.Accred && d.Accred.length > 0){
      d.accredNum = parseInt(d.Accred);
      if(d.accredNum >= 5){
        d.accredNum = '>5';
      }
    }
    d.accredNum = d.accredNum.toString();
    //Meetings vaue for pie
    d.meetingsNum = 0;
    if(d.Meetings && d.Meetings.length > 0){
      d.meetingsNum = parseInt(d.Meetings);
      if(d.meetingsNum >= 5){
        d.meetingsNum = '>5';
      }
    }
    d.meetingsNum = d.meetingsNum.toString();
    //Lobbyists value for pie
    d.lobbyistsNum = 0;
    if(d.People && d.People.length > 0){
      d.lobbyistsNum = parseInt(d.People);
      if(d.lobbyistsNum >= 5){
        d.lobbyistsNum = '>5';
      }
    }
    d.lobbyistsNum = d.lobbyistsNum.toString();
  });

  //Add options to country select
  vuedata.countries.sort();	
  for (var i = 0; i < vuedata.countries.length; i++) {
    var thisCountry = vuedata.countries[i];
    $('#countryselect').append('<option value="'+thisCountry+'">'+thisCountry+'</option>');
  }

  //Set dc main vars
  var ndx = crossfilter(organizations);
  var searchDimension = ndx.dimension(function (d) {
      var entryString = d.Name + ' ' + d.RegDate + ' ' + d.Cat + ' ' + d.Cat2 + ' ' + 'country=' + d.Country;
      return entryString.toLowerCase();
  });

  //CHART 1 - Countries
  var createCountriesChart = function() {
    var chart = charts.topCountries.chart;
    var dimension = ndx.dimension(function (d) {
        return d.Country;
    });
    var group = dimension.group().reduceSum(function (d) {
        return 1;
    });
    var filteredGroup = (function(source_group) {
      return {
        all: function() {
          return source_group.top(10).filter(function(d) {
            return (d.value != 0);
          });
        }
      };
    })(group);
    var width = recalcWidth();
    var charsLength = recalcCharsLength(width);
    chart
      .width(width)
      .height(410)
      .margins({top: 0, left: 0, right: 0, bottom: 20})
      .group(filteredGroup)
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

  //CHART 2 - Expense
  var createExpenseChart = function() {
    var chart = charts.expense.chart;
    var dimension = ndx.dimension(function (d) {
        return d.expenseVal;
    });
    var group = dimension.group().reduceSum(function (d) {
        return 1;
    });
    var width = recalcWidthExpense();
    var charsLength = recalcCharsLength(width);
    chart
      .width(width)
      .height(440)
      .margins({top: 0, left: 0, right: 0, bottom: 20})
      .group(group)
      .dimension(dimension)
      .on("preRender",(function(chart,filter){
      }))
      .margins({top: 0, right: 10, bottom: 20, left: 40})
      .x(d3.scaleBand().domain(["0", "< 10K", "10-50K", "50-100K", "100-500K", "500K-1M", "1-2M", "2-5M", "> 5M"]))
      .xUnits(dc.units.ordinal)
      .gap(15)
      .elasticY(true)
      .ordinalColors(vuedata.colors.countries)
    chart.render();
  }

  //CHART 3 - Category
  var createOrgCategoryChart = function() {
    var chart = charts.orgCategory.chart;
    var dimension = ndx.dimension(function (d) {
      return d.CatName;   
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
        var thisKey = d.key;
        return thisKey + ': ' + d.value;
      })
      .dimension(dimension)
      .group(group)
      .colorCalculator(function(d, i) {
        return vuedata.colors.orgType[d.key];
      });
    chart.render();
  }

  //CHART 4 - Accreditations
  var createAccreditationsChart = function() {
    var chart = charts.accreditations.chart;
    var dimension = ndx.dimension(function (d) {
      return d.accredNum;
    });
    var group = dimension.group().reduceSum(function (d) { return 1; });
    var sizes = calcPieSize();
    chart
      .width(sizes.width)
      .height(sizes.height)
      .ordering(dc.pluck('key'))
      .cy(sizes.cy)
      .innerRadius(sizes.innerRadius)
      .radius(sizes.radius)
      .legend(dc.legend().x(0).y(sizes.legendY).gap(10).legendText(function(d) { 
        var thisKey = d.name + ' accredited lobbyists';
        if(d.name == 1) {
          thisKey = d.name + ' accredited lobbyist';
        }
        if(thisKey.length > 40){
          return thisKey.substring(0,40) + '...';
        }
        return thisKey;
      }))
      .title(function(d){
        var thisKey = d.key;
        return thisKey + ': ' + d.value;
      })
      .dimension(dimension)
      .group(group)
      .colorCalculator(function(d, i) {
        return vuedata.colors.numPies[d.key];
      });
    chart.render();
  }

  //CHART 5 - Meetings
  var createMeetingsChart = function() {
    var chart = charts.meetings.chart;
    var dimension = ndx.dimension(function (d) {
      return d.meetingsNum;
    });
    var group = dimension.group().reduceSum(function (d) { return 1; });
    var sizes = calcPieSize();
    chart
      .width(sizes.width)
      .height(sizes.height)
      .ordering(dc.pluck('key'))
      .cy(sizes.cy)
      .innerRadius(sizes.innerRadius)
      .radius(sizes.radius)
      .legend(dc.legend().x(0).y(sizes.legendY).gap(10).legendText(function(d) { 
        var thisKey = d.name + ' meetings';
        if(d.name == 1) {
          thisKey = d.name + ' meeting';
        }
        if(thisKey.length > 40){
          return thisKey.substring(0,40) + '...';
        }
        return thisKey;
      }))
      .title(function(d){
        var thisKey = d.key;
        return thisKey + ': ' + d.value;
      })
      .dimension(dimension)
      .group(group)
      .colorCalculator(function(d, i) {
        return vuedata.colors.numPies[d.key];
      });
    chart.render();
  }

  //CHART 6 - Lobbyists
  var createLobbyistsChart = function() {
    var chart = charts.lobbyists.chart;
    var dimension = ndx.dimension(function (d) {
      return d.lobbyistsNum;
    });
    var group = dimension.group().reduceSum(function (d) { return 1; });
    var sizes = calcPieSize();
    chart
      .width(sizes.width)
      .height(sizes.height)
      .ordering(dc.pluck('key'))
      .cy(sizes.cy)
      .innerRadius(sizes.innerRadius)
      .radius(sizes.radius)
      .legend(dc.legend().x(0).y(sizes.legendY).gap(10).legendText(function(d) { 
        var thisKey = d.name + ' lobbyists';
        if(d.name == 1) {
          thisKey = d.name + ' lobbyist';
        }
        if(thisKey.length > 40){
          return thisKey.substring(0,40) + '...';
        }
        return thisKey;
      }))
      .title(function(d){
        var thisKey = d.key;
        return thisKey + ': ' + d.value;
      })
      .dimension(dimension)
      .group(group)
      .colorCalculator(function(d, i) {
        return vuedata.colors.numPies[d.key];
      });
    chart.render();
  }

  //CHART 7 - SubCateogry
  var createOrgSubcategoryChart = function() {
    var order = ["Law firms", "Professional consultancies", "Self-employed consultants", "Companies & groups", "Other in house lobbyists", "Trade and business organisations", "Trade unions", "NGO's & civil society", "Academic institutions", "Think tanks and research institutions", "Churches & religious communities", "Other public or mixed entities", "Other sub-national public authorities", "Regional structures", "Transnational public networks", "Unknown"];
    var chart = charts.orgSubcategory.chart;
    var dimension = ndx.dimension(function (d) {
      return d.subCatName;
    });
    var group = dimension.group().reduceSum(function (d) {
      return 1;
    });
    var width = recalcWidth();
    var charsLength = recalcCharsLength(width);
    chart
      .width(width)
      .height(500)
      .margins({top: 0, left: 0, right: 0, bottom: 40})
      .group(group)
      .dimension(dimension)
      .colorCalculator(function(d, i) {
        return vuedata.colors.orgType[vuedata.subCategoriesCat[d.key]];
      })
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
      .ordering(function(d) { return order.indexOf(d.key)})
      .elasticX(true)
      .xAxis().ticks(4);
    chart.render();
  }

  //TABLE
  var createTable = function() {
    var count=0;
    charts.orgTable.chart = $("#dc-data-table").dataTable({
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
            return d.Name;
          }
        },
        {
          "searchable": false,
          "orderable": true,
          "targets": 2,
          "defaultContent":"N/A",
          "data": function(d) {
            return parseInt(d.Meetings);
          }
        },
        {
          "searchable": false,
          "orderable": true,
          "targets": 3,
          "defaultContent":"N/A",
          "type": "num",
          "data": function(d) {
            if(d.Accred) {
              return parseInt(d.Accred);
            }
            return 0;
          }
        },
        {
          "searchable": false,
          "orderable": true,
          "targets": 4,
          "defaultContent":"N/A",
          "data": function(d) {
            return parseInt(d.People);
          }
        },
        {
          "searchable": false,
          "orderable": true,
          "targets": 5,
          "defaultContent":"N/A",
          "type": "num-html",
          "data": function(d) {
            return addcommas(d.costVal) + ' €';
          }
        }
      ],
      "iDisplayLength" : 25,
      "bPaginate": true,
      "bLengthChange": true,
      "bFilter": false,
      "order": [[ 2, "desc" ]],
      "bSort": true,
      "bInfo": true,
      "bAutoWidth": false,
      "bDeferRender": true,
      "aaData": searchDimension.top(Infinity),
      "bDestroy": true,
    });
    var datatable = charts.orgTable.chart;
    datatable.on( 'draw.dt', function () {
      var PageInfo = $('#dc-data-table').DataTable().page.info();
        datatable.DataTable().column(0, { page: 'current' }).nodes().each( function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
      });
      datatable.DataTable().draw();

    $('#dc-data-table tbody').on('click', 'tr', function () {
      var data = datatable.DataTable().row( this ).data();
      vuedata.selectedOrg = data;
      vuedata.selectedOrg.MeetingsInt = parseInt(vuedata.selectedOrg.Meetings);
      if(isNaN(vuedata.selectedOrg.MeetingsInt)){
        vuedata.selectedOrg.MeetingsInt = '/';
      }
      console.log(vuedata.selectedOrg);
      $('#detailsModal').modal();
    });
  }
  //REFRESH TABLE
  function RefreshTable() {
    dc.events.trigger(function () {
      var alldata = searchDimension.top(Infinity);
      charts.orgTable.chart.fnClearTable();
      charts.orgTable.chart.fnAddData(alldata);
      charts.orgTable.chart.fnDraw();
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

  //Country select
  $("#countryselect").change(function () {
    var selcountry = this.value;
    if(selcountry != ''){
      console.log(selcountry);
      searchDimension.filter(function(d) { 
        return d.indexOf('country='+selcountry.toLowerCase()) !== -1;
      });
      dc.redrawAll();
    }
  });

  //Reset charts
  var resetGraphs = function() {
    for (var c in charts) {
      if(charts[c].type !== 'table' && charts[c].chart.hasFilter()){
        charts[c].chart.filterAll();
      }
    }
    searchDimension.filter(null);
    $('#search-input').val('');
    $("#countryselect").val('');
    dc.redrawAll();
  }
  $('.reset-btn').click(function(){
    resetGraphs();
  })
  
  //Render charts
  createCountriesChart();
  createExpenseChart();
  createOrgCategoryChart();
  createAccreditationsChart();
  createMeetingsChart();
  createLobbyistsChart();
  createOrgSubcategoryChart();
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
  function drawAccredCounter() {
    var dim = ndx.dimension (function(d) {
      if (!d.Id) {
        return "";
      } else {
        return d.Id;
      }
    });
    var group = dim.group().reduce(
      function(p,d) {  
        p.nb +=1;
        if (!d.Id || !d.Accred) {
          return p;
        }
        p.accredited = +d.Accred;
        return p;
      },
      function(p,d) {  
        p.nb -=1;
        if (!d.Id || !d.Accred) {
          return p;
        }
        p.accredited = +d.Accred;;
        return p;
      },
      function(p,d) {  
        return {nb: 0, accredited: 0}; 
      }
    );
    group.order(function(p){ return p.nb });
    var accredited = 0;

    var counter = dc.dataCount(".count-box-accred")
    .dimension(group)
    .group({value: function() {
      return group.all().filter(function(kv) {
        if (kv.value.nb >0) {
          accredited += +kv.value.accredited;
        }
        return kv.value.nb > 0; 
      }).length;
    }})
    .renderlet(function (chart) {
      $(".nbaccredited").text(addcommas(Math.round(accredited)));
      accredited=0;
    });
    counter.render();
  }
  drawAccredCounter();

  //Window resize function
  window.onresize = function(event) {
    resizeGraphs();
  };

});

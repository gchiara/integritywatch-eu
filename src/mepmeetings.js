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
  page: 'mepmeetings',
  oldcommission: false,
  loader: true,
  showInfo: true,
  showShare: true,
  chartMargin: 40,
  organizations: {},
  charts: {
    committee: {
      title: 'Committee',
      info: ''
    },
    role: {
      title: 'MEPs publishing meetings',
      info: ''
    },
    group: {
      title: 'Political group',
      info: ''
    },
    country: {
      title: 'Country',
      info: ''
    },
    meetingsTable: {
      chart: null,
      type: 'table',
      title: 'Meetings',
      info: 'Click on any meeting for additional information.'
    }
  },
  selectedMeeting: { "P": "", "Sub": ""},
  selectedMeetingOrg: { "Name": "", "Country": "", "Meetings": 0, "Id": "", "People": 0, "Accred": 0, "CostsR": "" },
  colors: {
    //default: "#2a7aae",
    default: "#3b95d0",
    groups: {
      "EPP": "#2c4b8e",
      "PPE": "#2c4b8e",
      "S&D": "#c31618",
      "RE": "#0099ff",
      "Greens/EFA": "#0b7432",
      "Verts/ALE": "#0b7432",
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
    portfolio: ["#3b95d0"],
    colorSchemeCloud: [ "#4d9e9c", "#62aad9", "#3b95d0", "#42b983", "#449188", "#52c993", "#b7bebf", "#99b6c0" ],
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
  committee: {
    chart: dc.rowChart("#committee_chart"),
    type: 'row',
    divId: 'committee_chart'
  },
  role: {
    chart: dc.pieChart("#role_chart"),
    type: 'pie',
    divId: 'role_chart'
  },
  group: {
    chart: dc.rowChart("#group_chart"),
    type: 'row',
    divId: 'group_chart'
  },
  country: {
    chart: dc.rowChart("#country_chart"),
    type: 'row',
    divId: 'country_chart'
  },
  meetingsTable: {
    chart: null,
    type: 'table',
  }
}

//Functions for responsivness
var recalcWidth = function(divId) {
  return document.getElementById(divId).offsetWidth - vuedata.chartMargin;
};
var recalcWidthWordcloud = function() {
  //Replace element if with wordcloud column id
  var width = document.getElementById("party_chart").offsetWidth - vuedata.chartMargin*2;
  return [width, 550];
};
var recalcCharsLength = function(width) {
  return parseInt(width / 8);
};
var calcPieSize = function(divId) {
  var newWidth = recalcWidth(divId);
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
  for (var c in charts) {
    var sizes = calcPieSize(charts[c].divId);
    var newWidth = recalcWidth(charts[c].divId);
    var charsLength = recalcCharsLength(newWidth);
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
      //Custom resize for chart 3 and 4
      if(charts[c].divId == 'group_chart' || charts[c].divId == 'country_chart') {
        charts[c].chart.x(d3.scaleLinear().range([0,(charts[c].chart.width()-0)]).domain([0,100]));
        charts[c].chart.xAxis()
          .scale(charts[c].chart.x())
          .ticks(5)
          .tickFormat(function(d) { return d + '%' });
      }
      charts[c].chart.redraw();
    } else if(charts[c].type == 'bar') {
      charts[c].chart.width(newWidth);
      charts[c].chart.rescale();
      charts[c].chart.redraw();
    } else if(charts[c].type == 'pie') {
      charts[c].chart
        .width(sizes.width)
        .height(sizes.height)
        .cy(sizes.cy)
        .innerRadius(sizes.innerRadius)
        .radius(sizes.radius)
        .legend(dc.legend().x(0).y(sizes.legendY).gap(10).legendText(function(d) { 
          var thisKey = d.name;
          if(thisKey.length > charsLength){
            return thisKey.substring(0, charsLength) + '...';
          }
          return thisKey;
        }));
      charts[c].chart.redraw();
    } else if(charts[c].type == 'cloud') {
      charts[c].chart.size(recalcWidthWordcloud());
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

var meetingsDataFile = './data/mepmeetings/mepmeetings.csv';
var totalsDataFile = './data/mepmeetings/meptotals.csv';

//Load meetings data
csv(meetingsDataFile + '?' + randomPar, (err, meetings) => {
  if (err) {
    console.error(err)
  }
  csv(totalsDataFile + '?' + randomPar, (err2, totals) => {

    //Loop through meetings data to apply data fixes
    _.each(meetings, function (d) {
      d.dateParsed = d.date.split('T')[0];
      d.committeesArray = [];
      if(d.committees.length > 1) {
        d.committeesArray = JSON.parse(d.committees.replace(/'/g, '"'));
      }
      d.committeesString = d.committeesArray.join(', ');
    });

    //Function to find category totals
    var findTotals = function(category) {
      var total = _.find(totals, function (x) { return x.category == category });
      return total;
    }

    //Set dc main vars
    var ndx = crossfilter(meetings);
    var searchDimension = ndx.dimension(function (d) {
      //epid,mep,country,group,committees,dossier,title,role,topic,location,mep2,lobbyists,date
        var entryString = d.mep + ' ' + d.committeesString + ' ' + d.title + ' ' + d.lobbyists + ' ' + d.group;
        return entryString.toLowerCase();
    });

    //CHART 1
    var createCommitteeChart = function() {
      var chart = charts.committee.chart;
      var dimension = ndx.dimension(function (d) {
        return d.committeesArray;
      }, true);
      var group = dimension.group().reduceSum(function (d) {
          return 1;
      });
      var filteredGroup = (function(source_group) {
        return {
          all: function() {
            return source_group.top(100).filter(function(d) {
              return (d.value != 0);
            });
          }
        };
      })(group);
      var width = recalcWidth(charts.committee.divId);
      var charsLength = recalcCharsLength(width);
      chart
        .width(width)
        .height(500)
        .margins({top: 0, left: 0, right: 0, bottom: 20})
        .group(filteredGroup)
        .dimension(dimension)
        .colorCalculator(function(d, i) {
          return vuedata.colors.default;
        })
        .label(function (d) {
            if(d.key && d.key.length > charsLength){
              return d.key.substring(0,charsLength) + '...';
            }
            return d.key;
        })
        .title(function (d) {
            return d.key + ': ' + d.value;
        })
        .elasticX(true)
        .xAxis().ticks(4);
        //chart.xAxis().tickFormat(numberFormat);
        chart.render();
    }

    //CHART 2
    var createRoleChart = function(){
      var chart = charts.role.chart;
      var dimension = ndx.dimension(function (d) {
        return d.role  
      });
      var group = dimension.group().reduceSum(function (d) { return 1; });
      var sizes = calcPieSize(charts.role.divId);
      chart
        .width(sizes.width)
        .height(sizes.height)
        .cy(sizes.cy)
        .innerRadius(sizes.innerRadius)
        .radius(sizes.radius)
        .legend(dc.legend().x(0).y(sizes.legendY).gap(10))
        .dimension(dimension)
        .group(group);
        /*
        .colorCalculator(function(d, i) {
          return vuedata.colors.ecPolicy[d.key];
        });
        */
      chart.render();
    }

    //CHART 3
    var createGroupChart = function() {
      var chart = charts.group.chart;
      var dimension = ndx.dimension(function (d) {
        return d.group;
      });
      /*
      var group = dimension.group().reduceSum(function (d) {
          return 1;
      });
      */
      //Custom reducer
      var customGroup =  dimension.group().reduce(
        function(p, d) { 
          if(d.epid in p.ids){
              p.ids[d.epid]++;
          }
          else {
              p.ids[d.epid] = 1;
              p.uniquecount++;
          }
          return p;
        },
        function (p, d) {
          p.ids[d.epid]--;
          if(p.ids[d.epid] === 0){
              delete p.ids[d.epid];
              p.uniquecount--;
          }
          return p;
        },
        function () {
          return {
            uniquecount: 0,
            ids: {}
          };
        }
      );
      var width = recalcWidth(charts.group.divId);
      var charsLength = recalcCharsLength(width);
      chart
        .width(width)
        .height(500)
        .margins({top: 0, left: 0, right: 0, bottom: 20})
        .group(customGroup)
        .dimension(dimension)
        .valueAccessor(function(d) { 
          var thisTotal = findTotals(d.key);
          if(!thisTotal) {
            console.log(d.key);
            return 0;
          }
          return (d.value.uniquecount/thisTotal.totalmps)*100;
        })
        .colorCalculator(function(d, i) {
          return vuedata.colors.groups[d.key];
        })
        .label(function (d) {
          var thisTotal = findTotals(d.key);
          var label = d.key;
          if(thisTotal) {
            var percent = (d.value.uniquecount/thisTotal.totalmps)*100;
            label = d.key + ' (' + percent.toFixed(1) + '%)'; 
          }
          if(label && label.length > charsLength){
            return label.substring(0,charsLength) + '...';
          }
          return label;
        })
        .title(function (d) {
            var thisTotal = findTotals(d.key);
            if(!thisTotal) {
              console.log(d.key);
              return 0;
            }
            var percent = (d.value.uniquecount/thisTotal.totalmps)*100;
            return d.key + ': ' + d.value.uniquecount + ' (' + percent.toFixed(1)  + '% )';
        })
        //.xAxis().ticks(4);
        .elasticX(false);
      chart.x(d3.scaleLinear().range([0,(chart.width()-0)]).domain([0,100]));
      chart.xAxis()
        .scale(chart.x())
        .ticks(5)
        .tickFormat(function(d) { return d + '%' });
      chart.render();   
    }

    //CHART 4
    var createCountryChart = function() {
      var chart = charts.country.chart;
      var dimension = ndx.dimension(function (d) {
        return d.country;
      });
      //Custom reducer
      var customGroup =  dimension.group().reduce(
        function(p, d) { 
          if(d.epid in p.ids){
              p.ids[d.epid]++;
          }
          else {
              p.ids[d.epid] = 1;
              p.uniquecount++;
          }
          return p;
        },
        function (p, d) {
          p.ids[d.epid]--;
          if(p.ids[d.epid] === 0){
              delete p.ids[d.epid];
              p.uniquecount--;
          }
          return p;
        },
        function () {
          return {
            uniquecount: 0,
            ids: {}
          };
        }
      );
      var width = recalcWidth(charts.country.divId);
      var charsLength = recalcCharsLength(width);
      chart
        .width(width)
        .height(500)
        .margins({top: 0, left: 0, right: 0, bottom: 20})
        .group(customGroup)
        .dimension(dimension)
        .valueAccessor(function(d) { 
          var thisTotal = findTotals(d.key);
          if(!thisTotal) {
            console.log(d.key);
            return 0;
          }
          console.log(d.key + ' ' + thisTotal.totalmps);
          return (d.value.uniquecount/thisTotal.totalmps)*100;
        })
        .colorCalculator(function(d, i) {
          return vuedata.colors.default;
        })
        .label(function (d) {
          var thisTotal = findTotals(d.key);
          var label = d.key;
          if(thisTotal) {
            var percent = (d.value.uniquecount/thisTotal.totalmps)*100;
            label = d.key + ' (' + percent.toFixed(1) + '%)'; 
          }
          if(label && label.length > charsLength){
            return label.substring(0,charsLength) + '...';
          }
          return label;
        })
        .title(function (d) {
            var thisTotal = findTotals(d.key);
            if(!thisTotal) {
              console.log(d.key);
              return 0;
            }
            var percent = (d.value.uniquecount/thisTotal.totalmps)*100;
            return d.key + ': ' + d.value.uniquecount + ' (' + percent.toFixed(1)  + '% )';
        })
        //.xAxis().ticks(4);
        .elasticX(false);
      chart.x(d3.scaleLinear().range([0,(chart.width()-0)]).domain([0,100]));
      chart.xAxis()
        .scale(chart.x())
        .ticks(5)
        .tickFormat(function(d) { return d + '%' });
      chart.render();   
    }
    
    //TABLE
    var createTable = function() {
      var count=0;
      charts.meetingsTable.chart = $("#dc-data-table").dataTable({
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
            "type":"date-eu",
            "data": function(d) {
              return d.date.split('T')[0];
            }
          },
          {
            "searchable": false,
            "orderable": true,
            "targets": 2,
            "defaultContent":"N/A",
            "data": function(d) {
              return d.mep;
            }
          },
          {
            "searchable": false,
            "orderable": true,
            "targets": 3,
            "defaultContent":"N/A",
            "data": function(d) {
              return d.group;
            }
          },
          {
            "searchable": false,
            "orderable": true,
            "targets": 4,
            "defaultContent":"N/A",
            "data": function(d) {
              return d.committeesString;
            }
          },
          {
            "searchable": false,
            "orderable": true,
            "targets": 5,
            "defaultContent":"N/A",
            "data": function(d) {
              return d.role;
            }
          },
          {
            "searchable": false,
            "orderable": true,
            "targets": 6,
            "defaultContent":"N/A",
            "data": function(d) {
              if(d.topic){
                return d.topic;
              }
              return d.title;
            }
          },
          {
            "searchable": false,
            "orderable": true,
            "targets": 7,
            "defaultContent":"N/A",
            "data": function(d) {
              return d.lobbyists;
            }
          }
        ],
        "iDisplayLength" : 25,
        "bPaginate": true,
        "bLengthChange": true,
        "bFilter": false,
        "order": [[ 1, "desc" ]],
        "bSort": true,
        "bInfo": true,
        "bAutoWidth": false,
        "bDeferRender": true,
        "aaData": searchDimension.top(Infinity),
        "bDestroy": true,
      });
      var datatable = charts.meetingsTable.chart;
      datatable.on( 'draw.dt', function () {
        var PageInfo = $('#dc-data-table').DataTable().page.info();
          datatable.DataTable().column(0, { page: 'current' }).nodes().each( function (cell, i) {
              cell.innerHTML = i + 1 + PageInfo.start;
          });
        });
        datatable.DataTable().draw();

      $('#dc-data-table tbody').on('click', 'tr', function () {
        var data = datatable.DataTable().row( this ).data();
        vuedata.selectedMeeting = data;
        $('#detailsModal').modal();
      });
    }
    //REFRESH TABLE
    function RefreshTable() {
      dc.events.trigger(function () {
        var alldata = searchDimension.top(Infinity);
        charts.meetingsTable.chart.fnClearTable();
        charts.meetingsTable.chart.fnAddData(alldata);
        charts.meetingsTable.chart.fnDraw();
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
    createRoleChart();
    createGroupChart();
    createCommitteeChart();
    createCountryChart();
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
    //Update datatables
    counter.on("renderlet.resetall", function(c) {
      RefreshTable();
    });

    //Custom counters
    //Institutions counter
    function drawMEPsCounter() {
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
          if (!d.epid) {
            return p;
          }
          return p;
        },
        function(p,d) {  
          p.nb -=1;
          if (!d.epid) {
            return p;
          }
          return p;
        },
        function(p,d) {  
          return {nb: 0}; 
        }
      );
      group.order(function(p){ return p.nb });
      var counter = dc.dataCount(".meps-count")
      .dimension(group)
      .group({value: function() {
        return group.all().filter(function(kv) {
          if (kv.value.nb >0) {
          }
          return kv.value.nb > 0; 
        }).length;
      }})
      .renderlet(function (chart) {
      });
      counter.render();
    }
    drawMEPsCounter();

    //Window resize function
    window.onresize = function(event) {
      resizeGraphs();
    };
  })
})

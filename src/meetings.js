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
  page: 'meetings',
  loader: true,
  showInfo: true,
  showShare: true,
  chartMargin: 40,
  organizations: {},
  charts: {
    policyLevel: {
      title: 'Policy level',
      info: 'Current transparency provision apply to Commissioners (including President and Vice-Presidents), their cabinets and all Directors-General. The shares of the pie reflect the number of meetings by hierarchy level.'
    },
    topHosts: {
      title: 'Top 10 hosts',
      info: 'Individuals from the European Commission with most contacts with lobbyists. When individuals meet several lobby organisations in a single meeting, the tool counts each contact separately. The number of contacts can thus be higher than the number of meetings.'
    },
    topOrgs: {
      title: 'Top 10 organisations',
      info: 'Lobby organisations with the most high-level meetings at the European Commission.'
    },
    orgCategory: {
      title: 'Category of lobby organisation',
      info: 'The classifications in this graph reflect the categories established by the EU Transparency Register. Names have been shortened. The shares of the pie reflect the number of registered organisations per category.'
    },
    orgSubcategory: {
      title: 'Sub-category of lobby organisation',
      info: 'The classifications in this graph reflect the sub-categories established by the EU Transparency Register. Some names have been shortened. Graph indicates the number of lobby meetings by sub-category of lobby organisation.'
    },
    portfolio: {
      title: 'Portfolio',
      info: 'The 28 portfolios of the European Commissioners by the number of lobby contacts they have had. Titles have been shortened. Directors-Generals have been included in the portfolios of their Commissioners according to the organisational chart of the European Commission. Full detail in the About section.'
    },
    subject: {
      title: 'Subjects of lobby meetings',
      info: 'This word cloud provides an overview of the most common terms that appear in the meeting subjects. The more meetings on a given subject the bigger it appears in the word cloud.'
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
  colors: {
    ecPolicy: {			
      "Directors-General": "#395a75",
      "Commissioners": "#4081ae",
      "Cabinet Members": "#3b95d0"
    },
    orgType: {
      "Consultants": "#42b983",
      "Corporate": "#449188",
      "NGOs": "#52c993",
      "Think tanks": "#28b99f",
      "Churches": "#127983",
      "Municipal": "#026973",
      "Unknown": "#ccc"
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
  policyLevel: {
    chart: dc.pieChart("#policylevel_chart"),
    type: 'pie',
  },
  topHosts: {
    chart: dc.rowChart("#tophosts_chart"),
    type: 'row',
  },
  topOrgs: {
    chart: dc.rowChart("#toporgs_chart"),
    type: 'row',
  },
  orgCategory: {
    chart: dc.pieChart("#orgcategory_chart"),
    type: 'pie',
  },
  orgSubcategory: {
    chart: dc.rowChart("#orgsubcategory_chart"),
    type: 'row',
  },
  portfolio: {
    chart: dc.rowChart("#portfolio_chart"),
    type: 'row',
  },
  subject: {
    chart: dc.wordCloud("#wordcloud_chart"),
    type: 'cloud',
  },
  meetingsTable: {
    chart: null,
    type: 'table',
  }
}

//Functions for responsivness
var recalcWidth = function() {
  return document.getElementById("portfolio_chart").offsetWidth - vuedata.chartMargin;
};
var recalcCharsLength = function(width) {
  return parseInt(width / 8);
};
var recalcWidthWordcloud = function() {
  var height = document.getElementById("wordcloud_chart_col").offsetHeight;
  var width = document.getElementById("wordcloud_chart_col").offsetWidth - vuedata.chartMargin*2;
  return [width, 550];
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
    } else if(charts[c].type == 'cloud') {
      charts[c].chart.size(recalcWidthWordcloud());
      charts[c].chart.redraw();
    }
  }
};
//Get policy level
var getPolicyLevel = function(host){
  if (host.indexOf ("Director-General") !== -1 || host.indexOf ("Director- General") !== -1 || host.indexOf("Secretary-General") !== -1) {
    return "Directors-General";
  } else if (host.indexOf ("Commissioner") !== -1 || host.indexOf("President") !== -1) {
    return "Commissioners";
  } else {
    return "Cabinet Members";
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



//Load data and generate charts

csv('./data/meetings.csv', (err, meetings) => {
  if (err) {
    console.error(err)
  }
  csv('./data/organizations.csv', (err2, organizations) => {
    csv('./data/portfolios.csv', (err3, portfolios) => {
      _.each(organizations, function (d) {
        //Create cost string for modal
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
        vuedata.organizations[d.Id] = d;
      });
      var meetings_filtered = _.filter(meetings, function(meeting, index) {
        return meeting.Date && meeting.Date.indexOf('Cancelled') == -1;
      });
      _.each(meetings_filtered, function (d) {
        d.CatShort = '';
        if(d.Cat.indexOf(' - ') > -1){
          d.CatShort = d.Cat.split(' - ')[0];
        }
        d.CatName = vuedata.categories[d.CatShort];
        d.subCatName = 'Unknown';
        if(vuedata.subCategories[d.Cat2]){
          d.subCatName = vuedata.subCategories[d.Cat2];
        }
        //Change portfolio of Oettinger meetings
        if(d.Host.indexOf("Günther Oettinger") > -1){
          var year = d.Date.split("/")[2];
          if(parseInt(year) < 2017){
            console.log('tbu');
            d.P = "Digital Economy";
          }
        }
        //Portfolio categories
        d.PortfolioGroup =  _.find(portfolios, function (x) { return x.Portfolio == d.P });
        if(d.PortfolioGroup){
          d.PortfolioGroup = d.PortfolioGroup.Category;
        } else {
          d.PortfolioGroup = d.P;
        }
        
      });

      //Set dc main vars
      var ndx = crossfilter(meetings_filtered);
      var searchDimension = ndx.dimension(function (d) {
          var entryString = d.Date + ' ' + d.Sub + ' ' + d.Host + ' ' + d.Org;
          return entryString.toLowerCase();
      });

      //CHART 1
      var createPolicyLevelChart = function(){
        var chart = charts.policyLevel.chart;
        var dimension = ndx.dimension(function (d) {
          return getPolicyLevel(d.Host);   
        });
        var group = dimension.group().reduceSum(function (d) { return 1; });
        var sizes = calcPieSize();
        chart
          .width(sizes.width)
          .height(sizes.height)
          .cy(sizes.cy)
          .innerRadius(sizes.innerRadius)
          .radius(sizes.radius)
          .legend(dc.legend().x(0).y(sizes.legendY).gap(10))
          .dimension(dimension)
          .group(group)
          .colorCalculator(function(d, i) {
            return vuedata.colors.ecPolicy[d.key];
          });
        chart.render();
      }

      //CHART 2
      var createTopHostsChart = function() {
        var chart = charts.topHosts.chart;
        var dimension = ndx.dimension(function (d) {
            return d.Host;
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
          .height(500)
          .margins({top: 0, left: 0, right: 0, bottom: 20})
          .group(filteredGroup)
          .dimension(dimension)
          .colorCalculator(function(d, i) {
            var level = getPolicyLevel(d.key);
            return vuedata.colors.ecPolicy[level];
          })
          .label(function (d) {
              if(d.key.length > charsLength){
                return d.key.substring(0,charsLength) + '...';
              }
              return d.key;
          })
          .title(function (d) {
              return d.value;
          })
          .elasticX(true)
          .xAxis().ticks(4);
          chart.render();
      }

      //CHART3
      var createTopOrgsChart = function() {
        var chart = charts.topOrgs.chart;
        var dimension = ndx.dimension(function (d) {
            return d.Org + '###' + d.CatName;
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
          .height(500)
          .margins({top: 0, left: 0, right: 0, bottom: 20})
          .group(filteredGroup)
          .dimension(dimension)
          .colorCalculator(function(d, i) {
            var type = d.key.split('###')[1];
            return vuedata.colors.orgType[type];
          })
          .label(function (d) {
            var thisKey = d.key.split('###')[0];
            if(thisKey.length > charsLength){
              return thisKey.substring(0,charsLength) + '...';
            }
            return thisKey;
          })
          .title(function (d) {
              var thisKey = d.key.split('###')[0];
              return thisKey + ': ' + d.value;
          })
          .elasticX(true)
          .xAxis().ticks(4);
        chart.render();
      }

      //CHART 4
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

      //CHART 5
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
          .margins({top: 0, left: 0, right: 0, bottom: 20})
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

      //CHART 6
      var createPortfolioChart = function() {
        var chart = charts.portfolio.chart;
        var dimension = ndx.dimension(function (d) {
            return d.PortfolioGroup;
        });
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
        var width = recalcWidth();
        var charsLength = recalcCharsLength(width);
        chart
          .width(width)
          .height(530)
          .margins({top: 0, left: 0, right: 0, bottom: 20})
          .group(filteredGroup)
          .dimension(dimension)
          .ordinalColors(vuedata.colors.portfolio)
          .label(function (d) {
              if(d.key.length > charsLength){
                return d.key.substring(0,charsLength) + '...';
              }
              return d.key;
          })
          .title(function (d) {
              return d.value;
          })
          .elasticX(true)
          .xAxis().ticks(4);
        chart.render();
      }

      //CHART 7
      var createWordcloudChart = function() {
        var chart = charts.subject.chart;
        var dimension = ndx.dimension(function(d) {
          return d.Sub || "";
        })
        var group   = dimension.group().reduceSum(function(d) { return 1; });
        chart
        .dimension(dimension)
        .group(group)
        .rotate(function() { return ~~(Math.random() * 2) * 90; })
        .maxWords(70)
        .timeInterval(10)
        .duration(200)
        .ordinalColors(vuedata.colors.colorSchemeCloud)
        .size([recalcWidth(),550])
        .font("Impact")
        .stopWords(/^(i|me|my|myself|we|us|our|ours|ourselves|you|your|yours|yourself|yourselves|he|him|his|himself|she|her|hers|herself|it|its|itself|they|them|their|theirs|themselves|what|which|who|whom|whose|this|that|these|those|am|is|are|was|were|be|been|being|have|has|had|having|do|does|did|doing|will|would|should|can|could|ought|i'm|you're|he's|she's|it's|we're|they're|i've|you've|we've|they've|i'd|you'd|he'd|she'd|we'd|they'd|i'll|you'll|he'll|she'll|we'll|they'll|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|doesn't|don't|didn't|won't|wouldn't|shan't|shouldn't|can't|cannot|couldn't|mustn't|let's|that's|who's|what's|here's|there's|when's|where's|why's|how's|a|an|the|and|but|if|or|because|as|until|while|of|at|by|for|with|about|against|between|into|through|during|before|after|above|below|to|from|up|upon|down|in|out|on|off|over|under|again|further|then|once|here|there|when|where|why|how|all|any|both|each|few|more|most|other|some|such|no|nor|not|only|own|same|so|than|too|very|say|says|said|shall|la|du|mr|commissioner|et|des|dg|commission|de|pour|en|les|le|meeting|eu|new|priorities|presentation|preparation|issues|meetings|representatives|work|implementation|general|future|challenge|challenge|skey|role|exchange|views|discuss|discussion|various director|talks|position|global|field|level|initiative|company|state|aspects|context|current|change|european|potential|including|dans|within|developments|play|present|single|policy)$/)
        .onClick(function(d){setword(d.key);})
        .textAccessor(function(d) {return d.Sub;});
        chart.size(recalcWidthWordcloud());
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
                return d.Date;
              }
            },
            {
              "searchable": false,
              "orderable": true,
              "targets": 2,
              "defaultContent":"N/A",
              "data": function(d) {
                return d.Host;
              }
            },
            {
              "searchable": false,
              "orderable": true,
              "targets": 3,
              "defaultContent":"N/A",
              "data": function(d) {
                return d.P;
              }
            },
            {
              "searchable": false,
              "orderable": true,
              "targets": 4,
              "defaultContent":"N/A",
              "data": function(d) {
                return d.Sub;
              }
            },
            {
              "searchable": false,
              "orderable": true,
              "targets": 5,
              "defaultContent":"N/A",
              "data": function(d) {
                return d.Org;
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
          vuedata.selectedMeetingOrg = vuedata.organizations[data.Id];
          vuedata.selectedMeetingOrg.AccredInt = parseInt(vuedata.selectedMeetingOrg.Accred);
          if(isNaN(vuedata.selectedMeetingOrg.AccredInt)){
            vuedata.selectedMeetingOrg.AccredInt = '/';
          }
          vuedata.selectedMeetingOrg.MeetingsInt = parseInt(vuedata.selectedMeetingOrg.Meetings);
          if(isNaN(vuedata.selectedMeetingOrg.MeetingsInt)){
            vuedata.selectedMeetingOrg.MeetingsInt = '/';
          }
          console.log(vuedata.selectedMeetingOrg);
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

      //Set word for wordcloud
      var setword = function(wd) {
        //console.log(charts.subject.chart);
        $("#search-input").val(wd);
        var s = wd.toLowerCase();
        searchDimension.filter(function(d) { 
          return d.indexOf(s) !== -1;
        });
        throttle();
        var throttleTimer;
        function throttle() {
          window.clearTimeout(throttleTimer);
          throttleTimer = window.setTimeout(function() {
            console.log ("redraw");
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
      createPolicyLevelChart();
      createTopHostsChart();
      createTopOrgsChart();
      createOrgCategoryChart();
      createOrgSubcategoryChart();
      createPortfolioChart();
      createWordcloudChart();
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
      var iniCountSetup = false;
      function drawOrgCounter() {
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
            if (!d.Id || !vuedata.organizations[d.Id]) {
              return p;
            }
            p.fte = +vuedata.organizations[d.Id].FTE;
            p.accredited = +vuedata.organizations[d.Id].Accred;
            return p;
          },
          function(p,d) {  
            p.nb -=1;
            if (!d.Id || ! vuedata.organizations[d.Id]) {
              return p;
            }
            p.fte = +vuedata.organizations[d.Id].FTE;
            p.accredited = +vuedata.organizations[d.Id].Accred;
            return p;
          },
          function(p,d) {  
            return {nb: 0, fte: 0, accredited: 0}; 
          }
        );
        group.order(function(p){ return p.nb });
        var fte = 0;
        var accredited = 0;
        var counter = dc.dataCount(".org-count")
        .dimension(group)
        .group({value: function() {
          return group.all().filter(function(kv) {
            if (kv.value.nb >0) {
              fte += +kv.value.fte;
              accredited += +kv.value.accredited;
            }
            return kv.value.nb > 0; 
          }).length;
        }})
        .renderlet(function (chart) {
          $(".nbfte").text(fte);
          $(".nbfte").text(addcommas(Math.round(fte)));
          $(".nbaccredited").text(addcommas(Math.round(accredited)));
          //Set up initial count
          if(iniCountSetup == false){
            $('.count-box-lobbyists .total-count').text(addcommas(Math.round(fte)));
            $('.count-box-accred .total-count').text(addcommas(Math.round(accredited)));
            iniCountSetup = true;
          }
          fte=0;
          accredited=0;
        });
        counter.render();
      }
      drawOrgCounter();

      //Window resize function
      window.onresize = function(event) {
        resizeGraphs();
      };
    })
  })
})

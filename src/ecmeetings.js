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
  page: 'meetings',
  commission: 'vonderleyen2',
  loader: true,
  showInfo: true,
  showShare: true,
  dataUpdateDate: '',
  dataUpdateDateString: '',
  chartMargin: 40,
  organizations: {},
  charts: {
    policyLevel: {
      title: 'Policy level',
      info: 'Current transparency provision apply to Commissioners (including President and Vice-Presidents), their cabinets and all Directors-General. The shares of the pie reflect the number of meetings by hierarchy level.'
    },
    topHosts: {
      title: 'Top 10 hosts',
      info: 'The top 10 officials from the European Commission who have had the most meetings with EU lobbyists.'
    },
    topOrgs: {
      title: 'Top 10 organisations',
      info: 'The top 10 lobby organisations who have had the most high-level meetings with European Commission officials.'
    },
    orgCategory: {
      title: 'Interests represented',
      info: 'This graph shows the share of meetings by category of interest represented. Organisations on the transparency register must indicate which type of interest they represent. Please note that due to a lack of clarity in the guidelines, many organisations have not selected the correct category. Any inconsistency can be directly reported to the <a href="https://ec.europa.eu/transparencyregister/public/contact/contact.do?contactType=OTHER&locale=en" target="_blank">Transparency register</a> or the organisation concerned.'
    },
    orgSubcategory: {
      title: 'Category of lobby organisation',
      info: 'The classifications in this graph reflect the categories established by the EU Transparency Register. The chart indicates the number of lobby meetings per category.'
    },
    portfolio: {
      title: 'Portfolio',
      info: 'This graph shows the number of lobby meetings from the 27 European Commission portfolios. Director-Generals are included and have been assigned to a portfolio according to the <a href="https://ec.europa.eu/commission/commissioners/sites/default/files/team_attachments/allocation_of_portfolios_and_supporting_services_0.pdf" target="_blank">organisational chart</a> of the European Commission. Please note some Director-Generals can be assigned to multiple portfolios, in which case they are counted multiple times in this chart. It is not possible to differentiate between portfolios in these instances.'
    },
    subject: {
      title: 'Subjects of lobby meetings',
      info: 'This word cloud provides an overview of the most common terms that appear in the meeting subjects. The more meetings on a given subject the bigger it appears in the word cloud.'
    },
    timeline: {
      title: 'Monthly meetings timeline by category of lobby organisation',
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
  policyLevelStreamline: {
    "cabinet member": "Cabinet member",
    "vice-president": "Vice-President",
    "commissioner": "Commissioner",
    "executive vice-president": "Executive Vice-President",
    "president": "President",
    "director-general": "Director-General",
    "acting head of service": "Director-General",
    "acting  head of service": "Director-General",
    "secretary-general": "Director-General",
    "director of office": "Director-General",
    "head of service": "Director-General",
    "the chair of the regulatory scrutiny board": "Director-General",
    "head of task force": "Director-General",
    "high representative": "Vice-President",
    "first vice-president": "Vice-President",
    "high representative / Vice-President": "Vice-President",
    "chair of the regulatory scrutiny board": "Director-General",
    //"director": "Director-General",
    //NEW
    "head of unit": "Manager",
    "director": "Manager",
    "acting director": "Manager",
    "deputy director-general": "Director-General",
    "director-general": "Director-General",
    "acting principal adviser": "Manager",
    "acting head of unit": "Manager",
    "principal adviser": "Manager",
    "acting deputy director-general": "Director-General",
    "deputy secretary-general": "Director-General",
    "acting director-general": "Director-General",
    "acting head of representation": "Manager",
    "director of office": "Manager",
    "cabinet-member": "Cabinet member"
    
  },
  categories: {
    "I": "Consultants",
    "II": "Corporate",
    "III": "NGOs",
    "IV": "Think tanks",
    "V": "Churches",
    "VI": "Municipal",
    "": "Unknown"
  },
  catStreamlining: {
    "Academic institutions": "Academic institutions",
    "Associations and networks of public authorities": "Public authorities networks",
    "Companies & groups": "Companies & group",
    "Entities, offices or networks established by third countries": "Third countries entities",
    "Law firms": "Law firms",
    "Non-governmental organisations, platforms and networks and similar": "NGOs",
    "Organisations representing churches and religious communities": "Churches & religious communities",
    "Other organisations, public or mixed entities": "Public or mixed entities",
    "Professional consultancies": "Consultancies",
    "Self-employed individuals": "Self-employed individuals",
    "Think tanks and research institutions": "Think tanks & research institutions",
    "Trade and business associations": "Trade & business associations",
    "Trade unions and professional associations": "Trade unions & professional associations"
  },
  /*
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
  */
  colors: {
    ecPolicy: {		
      "Manager": "#90c6f0",
      "Cabinet member": "#66ade3",
      "Commissioner": "#3b95d0",
      "Director-General": "#4081ae",
      "Executive Vice-President": "#3f6990",
      "Vice-President": "#395a75",
      "President": "#3b4f6a",
      "Other": "#ccc"
    },
    orgType: {
      "Advances interests of their clients": "#bb1d60",
      "Promotes their own interests or the collective interests of their members": "#e51f5c",
      "Does not represent commercial interests": "#ff516a",
      "N/A": "#ddd",
      "": "#ddd",
    },
    organizations: "#e51f5c",
    portfolio: ["#3b95d0"],
    colorSchemeCloud: [ "#e51f5c", "#62aad9", "#3b95d0", "#f43461", "#bb1d60", "#ff516a", "#b7bebf", "#99b6c0"],
    colorSchemeCategories: [ "#e51f5c", "#62aad9", "#3b95d0", "#f43461", "#bb1d60", "#ff516a", "#b7bebf", "#99b6c0", "#154a69", "#0b3954", "#052842", "#216496"],
    categories: {
      "Academic institutions": "#70cc5d",
      "Public authorities networks": "#ff8499",
      "Companies & group": "#e51f40",
      "Third countries entities": "#2a2a2d",
      "Law firms": "#5c0026",
      "NGOs": "#3695d8",
      "Churches & religious communities": "#ea5a0b",
      "Public or mixed entities": "#ea5a0b",
      "Consultancies": "#6b6b6f",
      "Self-employed individuals": "#adadb2",
      "Think tanks & research institutions": "#489b37",
      "Trade & business associations": "#e8bf45",
      "Trade unions & professional associations": "#fce592",
      "N/A": "#ccc"
    }
    //1,4,5,6
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
    divId: "policylevel_chart"
  },
  topHosts: {
    chart: dc.rowChart("#tophosts_chart"),
    type: 'row',
    divId: "tophosts_chart"
  },
  topOrgs: {
    chart: dc.rowChart("#toporgs_chart"),
    type: 'row',
    divId: "toporgs_chart"
  },
  orgCategory: {
    chart: dc.pieChart("#orgcategory_chart"),
    type: 'pie',
    divId: "orgcategory_chart"
  },
  orgSubcategory: {
    chart: dc.rowChart("#orgsubcategory_chart"),
    type: 'row',
    divId: "orgsubcategory_chart"
  },
  /*
  portfolio: {
    chart: dc.rowChart("#portfolio_chart"),
    type: 'row',
  },
  */
 /*
  subject: {
    chart: dc.wordCloud("#wordcloud_chart"),
    type: 'cloud',
  },
  */
  timeline: {
    chart: new dc.CompositeChart("#timeline_chart"),
    type: 'line',
    divId: "timeline_chart"
  },
  timelineOverview: {
    chart: new dc.LineChart("#timelineoverview_chart"),
    type: 'line',
    divId: "timelineoverview_chart"
  },
  meetingsTable: {
    chart: null,
    type: 'table',
    divId: 'dc-data-table'
  }
}

//Functions for responsivness

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
  return parseInt(width / 7.5);
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
      } else if(charts[c].type == 'line'){
        charts[c].chart
        .width(newWidth);
        //.legend(dc.legend().x(10).y(420).itemHeight(12).gap(12).horizontal(true).autoItemWidth(true).legendWidth(newWidth));
        charts[c].chart.rescale();
        charts[c].chart.redraw();
      } else if(charts[c].type == 'd3') {

      }
  }
};

//Get policy level
var getPolicyLevel = function(host){
  if(host.split(' (').length > 1) {
    var policyLevel =  host.split(' (')[1].replace(')','');
    if(vuedata.policyLevelStreamline[policyLevel.toLowerCase()]) {
      return vuedata.policyLevelStreamline[policyLevel.toLowerCase()];
    }
    return policyLevel;
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
var dmy = d3.timeParse("%d-%m-%Y");
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

var datasetsFolder = 'latest';
var backupsManagerPath = 'https://integritywatch.eu/autoupdate_data_eu/lobbyists_ecmeetings/backups.json';

//Load datasets manager file
json(backupsManagerPath + '?' + randomPar, (err, backupsEntries) => {
  _.each(backupsEntries, function (b) {
      if(b.type == 'default' && b.active == true) {
        vuedata.dataUpdateDate = b.timestamp.split('_')[0];
      }
      else if(b.type !== 'default' && b.active == true && b.timestamp.length > 8) {
        datasetsFolder = b.timestamp;
        vuedata.dataUpdateDate = b.timestamp.split('_')[0];
      }
  });
  if(vuedata.dataUpdateDate.length == 8) {
    vuedata.dataUpdateDateString = vuedata.dataUpdateDate.substring(6,8) + '/' + vuedata.dataUpdateDate.substring(4,6) + '/' + vuedata.dataUpdateDate.substring(0, 4);
  }

var datasetsPath = 'https://integritywatch.eu/autoupdate_data_eu/lobbyists_ecmeetings/' + datasetsFolder + '/';
//var meetingsDataFile = './data/ecmeetings/ecmeetings_vonderleyen2.json';
var meetingsDataFile = datasetsPath + 'ecmeetings_vonderleyen2.json';
var portfoliosFile = './data/ecmeetings/portfolios.csv';



if(getParameterByName('commission') && getParameterByName('commission') == 'juncker') {
  vuedata.commission = 'juncker';
  meetingsDataFile = datasetsPath + 'ecmeetings_juncker.json';
  portfoliosFile = './data/ecmeetings/portfolios_2019.csv';
}

if(getParameterByName('commission') && getParameterByName('commission') == 'vonderleyen1') {
  vuedata.commission = 'vonderleyen1';
  meetingsDataFile = datasetsPath + 'ecmeetings_vonderleyen1.json';
  portfoliosFile = './data/ecmeetings/portfolios.csv';
}

if(getParameterByName('commission') && getParameterByName('commission') == 'vonderleyen2') {
  vuedata.commission = 'vonderleyen2';
  meetingsDataFile = datasetsPath + 'ecmeetings_vonderleyen2.json';
  portfoliosFile = './data/ecmeetings/portfolios.csv';
}


//var orgsDataFile = './data/ecmeetings/organizations.csv';
var orgsDataFile = datasetsPath + 'organizations_new.csv';

json(meetingsDataFile + '?' + randomPar, (err, meetings) => {
  if (err) {
    console.error(err)
  }
  csv(portfoliosFile + '?' + randomPar, (err1, portfoliosFile) => {
  csv(orgsDataFile + '?' + randomPar, (err2, organizations) => {
      _.each(organizations, function (d) {
        //Create cost string for modal
        /*
        d.costVal = '';
        d.costValType = 'R';
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
        */
        d.costString = d.Budget;
        vuedata.organizations[d.Id] = d;
      });

      var parseDate = d3.timeParse("%Y-%m-%d");
      var cutoffDate = "2019-12-01";
      var meetings_filtered = _.filter(meetings, function(meeting, index) {
        return meeting.date && meeting.date.indexOf('Cancelled') == -1;
      });
      /*
      if(vuedata.junckercommission) {
        meetings_filtered = _.filter(meetings_filtered, function(meeting, index) {
          return parseDate(meeting.date) < parseDate(cutoffDate);
        });
        console.log(meetings_filtered);
      } else {
        meetings_filtered = _.filter(meetings_filtered, function(meeting, index) {
          return parseDate(meeting.date) >= parseDate(cutoffDate);
        });
      }
      */
      /*
      //If new commission, filter out all meetings before December 1st 2019
      var parseDate = d3.timeParse("%Y-%m-%d");
      var cutoffDate = "2019-12-01";
      meetings_filtered = _.filter(meetings_filtered, function(meeting, index) {
        return parseDate(meeting.date) >= parseDate(cutoffDate);
      });
      */
      var ptf = [];
      var policy_levels = [];
      var portfolios_list = [];
      var noStreamlinedPolicyLevels = [];
      var timelineCategoriesList = [];
      var dateFormatSpecifier = '%d-%m-%Y';
      var dateFormat = d3.timeFormat(dateFormatSpecifier);
      var dateFormatParser = d3.timeParse(dateFormatSpecifier);
      var timelineIniDate = null;
      var timelineEndDate = null;
      var timelineMonths = [];
      var interestsRepresentedMatch = {}
      //Loop through meetings to apply fixes
      _.each(meetings_filtered, function (d) {
        //Date
        var splitDate = d.date.split('-');
        if(splitDate && splitDate.length == 3) {
          d.date = splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0];
        } else {
          console.log(d.date);
        }
        //Date for timeline
        d.parsedDate = dateFormatParser(d.date);
        d.timelineDate = d3.timeMonth(d.parsedDate);
        d.timelineMonthString = splitDate[1] + '-' + splitDate[0];
        if(timelineMonths.includes(d.timelineMonthString) == false) {
          timelineMonths.push(d.timelineMonthString);
        }
        if(timelineIniDate == null || d.timelineDate < timelineIniDate) {
          timelineIniDate = d.timelineDate;
        }
        if(timelineEndDate == null || d.timelineDate > timelineEndDate) {
          timelineEndDate = d.timelineDate;
        }
        //Policy levels
        d.policyLevels = [];
        d.policyLevelsStreamlined = [];
        _.each(d.Host, function (h) {
          if(h.split(' (').length > 1) {
            var thisPolicyLevel = h.split(' (')[1].replace(')','');
            var thisPolicyLevelStreamlined = vuedata.policyLevelStreamline[thisPolicyLevel.toLowerCase()];
            if(!thisPolicyLevelStreamlined || thisPolicyLevelStreamlined == null || thisPolicyLevelStreamlined == "") {
              //console.log("NO STREAMLINED " + thisPolicyLevel);
              thisPolicyLevelStreamlined = "Other";
              if(noStreamlinedPolicyLevels.indexOf(thisPolicyLevel) == -1) {
                noStreamlinedPolicyLevels.push(thisPolicyLevel);
              }
            }
            d.policyLevels.push(thisPolicyLevel);
            d.policyLevelsStreamlined.push(thisPolicyLevelStreamlined);
            if(policy_levels.indexOf(thisPolicyLevel) == -1) {
              policy_levels.push(thisPolicyLevel);
            }
          }
        });
        d.hostString = d.Host.join(', ');
        //Sections and subsections
        d.CatName = d.Cat;
        d.subCatName = d.Cat2;
        d.timelineCategory = vuedata.catStreamlining[d.Cat];
        if(!d.timelineCategory) {
          console.log("Missing cat streamlining:");
          console.log(d);
          d.timelineCategory = "N/A";
        }
        if(timelineCategoriesList.indexOf(d.timelineCategory) == -1) {
          timelineCategoriesList.push(d.timelineCategory);
        }
        //Handle empty portfolios
        if(d.portfolio.length == 0) {
          d.portfolio = ["N/A"]
        }
        //Streamline portfolios for Juncker commission and for newer commission where needed
        _.each(d.portfolio, function (p, pi) {
          var thisStreamlinedPortfolio =  _.find(portfoliosFile, function (x) { return x.Portfolio == p });
          if(thisStreamlinedPortfolio) {
            d.portfolio[pi] = thisStreamlinedPortfolio.Category;
          }
        });
        _.each(d.portfolio, function (p) {
          if(portfolios_list.indexOf(p) == -1) {
            portfolios_list.push(p);
          }
        });
        //Mark as unregistered if no organization
        //Commented out for now since some orgs changed id or name and would appear unregistered even if they aren't
        /*
        if(!vuedata.organizations[d.OrgId]) {
          d.unregistered = true;
        }
        */
      });
      console.log("Policy levels that are missing streamlining:");
      console.log(noStreamlinedPolicyLevels);
      //Set dc main vars
      var ndx = crossfilter(meetings_filtered);
      var searchDimension = ndx.dimension(function (d) {
          var entryString = d.date + ' ' + d.subject + ' ' + d.hostString + ' ' + d.Org;
          return entryString.toLowerCase();
      });

      //CHART 1
      var createPolicyLevelChart = function(){
        var chart = charts.policyLevel.chart;
        var dimension = ndx.dimension(function (d) {
          return d.policyLevelsStreamlined; 
        }, true);
        var group = dimension.group().reduceSum(function (d) { return 1; });
        var sizes = calcPieSize(charts.policyLevel.divId);
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
        }, true);
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
        var width = recalcWidth(charts.topHosts.divId);
        var charsLength = recalcCharsLength(width);
        chart
          .width(width)
          .height(420)
          .margins({top: 0, left: 0, right: 0, bottom: 20})
          .group(filteredGroup)
          .dimension(dimension)
          .colorCalculator(function(d, i) {
            var level = getPolicyLevel(d.key);
            if(vuedata.colors.ecPolicy[level]) {
              return vuedata.colors.ecPolicy[level];
            }
            return "#ccc";
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
            return d.Org + '###' + d.subCatName;
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
        var width = recalcWidth(charts.topOrgs.divId);
        var charsLength = recalcCharsLength(width);
        chart
          .width(width)
          .height(420)
          .margins({top: 0, left: 0, right: 0, bottom: 20})
          .group(filteredGroup)
          .dimension(dimension)
          .colorCalculator(function(d, i) {
            //return vuedata.colors.organizations;
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
          if(d.subCatName == "") {
            return "N/A";
          }
          return d.subCatName;  
        });
        var group = dimension.group().reduceSum(function (d) { return 1; });
        var sizes = calcPieSize(charts.orgCategory.divId);
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
          .ordering(function(d) { 
            switch(d.key) {
              case 'Advances interests of their clients':
                return 0;
                break;
              case 'Promotes their own interests or the collective interests of their members':
                return 1;
                break;
              case 'Does not represent commercial interests':
                return 2;
                break;
              case 'N/A':
                return 3;
                break;
              default:
                return 4;
            }
          })
          .colorCalculator(function(d, i) {
            return vuedata.colors.orgType[d.key];
          });
        chart.render();
      }

      //CHART 5
      var createOrgSubcategoryChart = function() {
        //var order = ["Law firms", "Professional consultancies", "Self-employed consultants", "Companies & groups", "Other in house lobbyists", "Trade and business organisations", "Trade unions", "NGO's & civil society", "Academic institutions", "Think tanks and research institutions", "Churches & religious communities", "Other public or mixed entities", "Other sub-national public authorities", "Regional structures", "Transnational public networks", "Unknown"];
        var chart = charts.orgSubcategory.chart;
        var dimension = ndx.dimension(function (d) {
            return d.timelineCategory;
        });
        var group = dimension.group().reduceSum(function (d) {
            return 1;
        });
        var width = recalcWidth(charts.orgSubcategory.divId);
        var charsLength = recalcCharsLength(width);
        chart
          .width(width)
          .height(540)
          .margins({top: 0, left: 0, right: 0, bottom: 20})
          .group(group)
          .dimension(dimension)
          .colorCalculator(function(d, i) {
            return vuedata.colors.categories[d.key];
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
          //.ordering(function(d) { return order.indexOf(d.key)})
          .elasticX(true)
          .xAxis().ticks(4);
        chart.render();
      }

      //CHART 6
      var createPortfolioChart = function() {
        var chart = charts.portfolio.chart;
        var dimension = ndx.dimension(function (d) {
            return d.portfolio;
        }, true);
        var group = dimension.group().reduceSum(function (d) {
            return 1;
        });
        var topCutoffNum = 100;
        if(vuedata.commission == 'juncker') {
          topCutoffNum = 27;
        }
        var filteredGroup = (function(source_group) {
          return {
            all: function() {
              return source_group.top(topCutoffNum).filter(function(d) {
                return (d.value != 0);
              });
            }
          };
        })(group);
        var width = recalcWidth(charts.portfolio.divId);
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
          return d.subject || "";
        })
        var group = dimension.group().reduceSum(function(d) { return 1; });
        chart
        .dimension(dimension)
        .group(group)
        .rotate(function() { return ~~(Math.random() * 2) * 90; })
        .maxWords(100)
        .timeInterval(10)
        .duration(200)
        .ordinalColors(vuedata.colors.colorSchemeCloud)
        .size([recalcWidth(charts.subject.divId),550])
        .font("Impact")
        .stopWords(/^(i|me|my|myself|we|us|our|ours|ourselves|you|your|yours|yourself|yourselves|he|him|his|himself|she|her|hers|herself|it|its|itself|they|them|their|theirs|themselves|what|which|who|whom|whose|this|that|these|those|am|is|are|was|were|be|been|being|have|has|had|having|do|does|did|doing|will|would|should|can|could|ought|i'm|you're|he's|she's|it's|we're|they're|i've|you've|we've|they've|i'd|you'd|he'd|she'd|we'd|they'd|i'll|you'll|he'll|she'll|we'll|they'll|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|doesn't|don't|didn't|won't|wouldn't|shan't|shouldn't|can't|cannot|couldn't|mustn't|let's|that's|who's|what's|here's|there's|when's|where's|why's|how's|a|an|the|and|but|if|or|because|as|until|while|of|at|by|for|with|about|against|between|into|through|during|before|after|above|below|to|from|up|upon|down|in|out|on|off|over|under|again|further|then|once|here|there|when|where|why|how|all|any|both|each|few|more|most|other|some|such|no|nor|not|only|own|same|so|than|too|very|say|says|said|shall|la|du|mr|commissioner|et|des|dg|commission|de|pour|en|les|le|meeting|eu|new|priorities|presentation|preparation|issues|meetings|representatives|work|implementation|general|future|challenge|challenge|skey|role|exchange|views|discuss|discussion|various director|talks|position|global|field|level|initiative|company|state|aspects|context|current|change|european|potential|including|dans|within|developments|play|present|single|policy)$/)
        .onClick(function(d){setword(d.key);})
        .textAccessor(function(d) {return d.subject;});
        chart.size(recalcWidthWordcloud());
        chart.render();
      }

      //CHART 8
      var createTimelineChart = function(){
        var timelineMonthsNum = timelineMonths.length;
        //console.log(timelineMonths);
        var timelineCategories = [];
        _.each(timelineCategoriesList, function (p, i) {
          timelineCategories.push({name: p, color: vuedata.colors.categories[p]});
        });
        var chart = charts.timeline.chart;
        var dimension = ndx.dimension(function (d) {
          return d.timelineDate; 
        });
        var groups = [];
        var composeArray = [];
        _.each(timelineCategories, function (p) {
          var thisGroup = dimension.group().reduceSum(function(d) { 
            if(d.timelineCategory == p.name) { return 1; }
            return 0; 
          });
          var thisCompose = dc.lineChart(chart)
          .group(thisGroup, p.name)
          .colors(p.color)
          .defined(function(d){
            return d.data.value !== -1;
          })
          .renderDataPoints({
            radius: 2,
            fillOpacity: 0.5,
            strokeOpacity: 0.8
          });
          groups.push(thisGroup);
          composeArray.push(thisCompose);
        });
        var width = recalcWidth(charts.timeline.divId);
        chart
          .width(width)
          .height(400)
          .yAxisPadding(10)
          .renderHorizontalGridLines(true)
          .margins({top: 10, right: 10, bottom: 10, left: 30})
          //.legend(dc.legend().x(10).y(420).itemHeight(12).gap(12).horizontal(true).autoItemWidth(true).legendWidth(width))
          .x(d3.scaleTime().domain([timelineIniDate, timelineEndDate]))
          .round(d3.timeMonth.round)
          .xUnits(d3.timeMonths)
          .brushOn(false)
          .title(function (d) {
            return d.key.toLocaleString('en-EN', { month: 'short', year: 'numeric' }) + ': ' + d.value;
          })
          //.xAxisLabel('Date')
          //.yAxisLabel('Meetings')
          .elasticY(true)
          .dimension(dimension)
          .group(groups[0], '')
          ._rangeBandPadding(1)
          .rangeChart(charts.timelineOverview.chart)
          .compose(composeArray);
        chart.xAxis()
        .ticks(Math.min(20, timelineMonthsNum))
        .tickFormat(d3.timeFormat('%m/%Y'));
        chart.on("postRender", function(chart) {
          chart.select('.axis.x')
               .attr("text-anchor", "end")
               .selectAll("text")
               .attr("transform", "rotate(-45)")
               .attr("dy", "1em")
               .attr("dx", "-0em");
        });
        chart.on('filtered', function(chart) {
        });
        chart.on("postRedraw", function(chart) {
          chart.select('.axis.x')
               .attr("text-anchor", "end")
               .selectAll("text")
               .attr("transform", "rotate(-45)")
               .attr("dy", "1em")
               .attr("dx", "-0em");
        });
        chart.filter = function() {};
        chart.render();
        
        /*
        chart.on('renderlet', function(chart) {
          console.log("renderlet");
          let filteredData = chart.group().all().filter(d => d.value !== 0);
          let tickValues = filteredData.map(d => d.key); // Extract data point keys
          chart.xAxis().tickValues(tickValues); // Set exact tick positions
          chart.redraw();
        });
        */
        
      }

      //CHART 8B
      var createTimelineChartOverview = function(){
        var timelineMonthsNum = timelineMonths.length;
        var chart = charts.timelineOverview.chart;
        var dimension = ndx.dimension(function (d) {
          return d.timelineDate; 
        });
        var group = dimension.group().reduceSum(function (d) {
          return 1;
        });
        var width = recalcWidth(charts.timeline.divId);
        chart.width(width) 
        .height(100)
        .elasticY(true)
        .renderArea(true)
        .margins({top: 20, right: 10, bottom: 20, left: 30})
        .dimension(dimension)
        .group(group)
        //.centerBar(true)
        //.gap(1)
        .x(d3.scaleTime().domain([timelineIniDate, timelineEndDate]))
        .round(d3.timeMonth.round)
        //.alwaysUseRounding(true)
        .xUnits(d3.timeMonths);
        chart.yAxis().ticks(2);
        chart.xAxis().ticks(Math.min(20, timelineMonthsNum));
        
        chart.on('filtered', function(chart) {
          var filteredData = dimension.top(Infinity); 
          var timelineMonthsFiltered = [];
          _.each(filteredData, function (d) {
            if(timelineMonthsFiltered.indexOf(d.timelineMonthString) == -1) {
              timelineMonthsFiltered.push(d.timelineMonthString);
            }
          });
          charts.timeline.chart.xAxis().ticks(Math.min(20, timelineMonthsFiltered.length));
        });
        
        
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
                return d.date;
              }
            },
            {
              "searchable": false,
              "orderable": true,
              "targets": 2,
              "defaultContent":"N/A",
              "data": function(d) {
                return d.Host.join(', ');
              }
            },
            {
              "searchable": false,
              "orderable": true,
              "targets": 3,
              "defaultContent":"N/A",
              "data": function(d) {
                return d.portfolio;
              }
            },
            {
              "searchable": false,
              "orderable": true,
              "targets": 4,
              "defaultContent":"N/A",
              "data": function(d) {
                return d.subject;
              }
            },
            {
              "searchable": false,
              "orderable": true,
              "targets": 5,
              "defaultContent":"N/A",
              "data": function(d) {
                if(d.unregistered) {
                  return d.Org + "<span class='unregistered-tag'>Unregistered</span>";
                }
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
          vuedata.selectedMeetingOrg = vuedata.organizations[data.OrgId];
          if(vuedata.selectedMeetingOrg) {
            vuedata.selectedMeetingOrg.AccredInt = parseInt(vuedata.selectedMeetingOrg.Accred);
            if(isNaN(vuedata.selectedMeetingOrg.AccredInt)){
              vuedata.selectedMeetingOrg.AccredInt = '/';
            }
            vuedata.selectedMeetingOrg.MeetingsInt = parseInt(vuedata.selectedMeetingOrg.Meetings);
            if(isNaN(vuedata.selectedMeetingOrg.MeetingsInt)){
              vuedata.selectedMeetingOrg.MeetingsInt = '/';
            }
          }
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
          if(charts[c].divId == "timeline_chart") {
            charts[c].chart.select('.axis.x')
               .attr("text-anchor", "end")
               .selectAll("text")
               .attr("transform", "rotate(-45)")
               .attr("dy", "1em")
               .attr("dx", "-0em");
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
      //createPortfolioChart();
      //createWordcloudChart();
      createTimelineChart();
      createTimelineChartOverview();
      
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
          if (!d.OrgId) {
            return "";
          } else {
            return d.OrgId;
          }
        });
        var group = dim.group().reduce(
          function(p,d) {  
            p.nb +=1;
            if (!d.OrgId || !vuedata.organizations[d.OrgId]) {
              return p;
            }
            p.fte = +vuedata.organizations[d.OrgId].FTE;
            p.accredited = +vuedata.organizations[d.OrgId].Accred;
            return p;
          },
          function(p,d) {  
            p.nb -=1;
            if (!d.OrgId || ! vuedata.organizations[d.OrgId]) {
              return p;
            }
            p.fte = +vuedata.organizations[d.OrgId].FTE;
            p.accredited = +vuedata.organizations[d.OrgId].Accred;
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
      //Show disclaimer modal
      //$('#disclaimerModal').modal();
    })
  })
})
});

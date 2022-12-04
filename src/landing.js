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
import '/scss/landing.scss';

import Vue from 'vue';
import Loader from './components/Loader.vue';
import ChartHeader from './components/ChartHeader.vue';


Vue.component('chart-header', ChartHeader);

//Commission (meetings), MEPs (income & meetings), EU lobbyists, Redfags, Datahub
new Vue({
  el: '#app',
  data: {
    tools: [
      {
        class: "col-md-4",
        type: "box",
        title: "European Commission",
        subtitle: "",
        description: "User-friendly interactive database that provides a unique overview of the lobby meetings of the European Commission since November 2014.",
        url: "ecmeetings.php",
        btnText: "EC Meetings",
        image: "images/landing_box_ec.jpg"
      },
      {
        class: "col-md-4",
        type: "box",
        title: "EU lobbyists",
        subtitle: "",
        description: "User-friendly interactive database that provides a unique overview of the lobby organisations registered in the EU Transparency Register – the register of Brussels lobbyists",
        url: "organizations.php",
        btnText: "EU Lobbyists",
        image: "images/landing_box_lobbyists.jpg"
      },
      {
        class: "col-md-4",
        type: "box",
        title: "European Parliament",
        subtitle: "",
        description: "User-friendly interactive database that provides a unique overview of the external activities of Members of the European Parliament as well as their lobby meetings. ",
        url: "mepincomes.php",
        btnText: "MEP Income",
        url2: "mepmeetings.php",
        btnText2: "MEP Meetings",
        image: "images/landing_box_mep.jpg"
      },
      {
        class: "col-md-2",
        type: "spacing",
      },
      {
        class: "col-md-4",
        type: "box",
        title: "Red flags",
        subtitle: "",
        description: "This Integrity Watch EU tool flags potential risks in public procurement and helps you navigate tendering procedures published on the EU's Tenders Electronic Database.",
        url: "http://redflags.integritywatch.eu/",
        btnText: "Go to Redflags",
        image: "images/landing_box_redflags.jpg"
      },
      {
        class: "col-md-4",
        type: "box",
        title: "Data Hub",
        subtitle: "",
        description: "This central hub will provide you with an overview of all existing national Integrity Watch platforms deployed across the EU. Register to join the fight against political corruption and gain access to one of the largest databases on political integrity in Europe!",
        url: "https://data.integritywatch.eu/",
        btnText: "Go to the Data Hub",
        image: "images/landing_box_datahub.jpg"
      }
    ]
  },
  methods: {
    getUrlParameter(sParam) {
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
  },
  mounted () {
    
  }
});
<html lang="en">
<head>
    <?php include 'gtag.php' ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Commission Meetings</title>
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@TI_EU" />
    <meta name="twitter:creator" content="@eucampaign" />
    <meta property="og:url" content="https://www.integritywatch.eu" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="EU Integrity Watch: monitor potential conflicts of interests" />
    <meta property="og:description" content="EU Integrity Watch: monitor EU lobbying and potential conflicts of interests. Interactive database that provides a unique overview of the lobby meetings of the European Commission as well as lobby meetings and outside activities of current Members of the European Parliament." />
    <meta property="og:image" content="http://www.integritywatch.eu/images/thumbnail.jpg" />
    <meta property="fb:app_id" content="1611680135716224" />
    <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700,800" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800" rel="stylesheet">
    <link rel="stylesheet" href="fonts/oswald.css">
    <link rel="stylesheet" href="static/ecmeetings.css?v=2">
</head>
<body>
    <div id="app" class="meetings-page">   
      <?php include 'header.php' ?>
      <!-- Filter bar -->
      <div class="footer-bar-top-bg">
        <div class="container-fluid footer-bar footer-bar-top">
          <div class="row">
            <div class="footer-col col-8 col-sm-4">
              <div class="footer-input">
                <input type="text" id="search-input" placeholder="Filter by Lobbyist, Host, Subject…">
                <i class="material-icons">search</i>
              </div>
            </div>
            <div class="footer-col col-4 col-sm-8 footer-counts">
              <div class="dc-data-count count-box">
                <div class="filter-count">0</div>out of <strong class="total-count">0</strong> meetings
              </div>
              <div class="org-count count-box">
                <div class="filter-count">0</div>out of <strong class="total-count">0</strong> organisations
              </div>
              <div class="count-box count-box-lobbyists">
                <div class="filter-count nbfte">0</div> out of <strong class="total-count">0</strong> Lobbyists
              </div>
              <div class="count-box count-box-accred">
                <div class="filter-count nbaccredited">0</div> out of <strong class="total-count">0</strong> EP passes
              </div>
            </div>
          </div>
          <!-- Reset filters -->
          <button class="reset-btn"><i class="material-icons">settings_backup_restore</i><span class="reset-btn-text">Reset</span></button>
        </div>
      </div>

      <!-- FILTERS -->
      <div class="commission-select-container">
        <a href="./ecmeetings.php?commission=vonderleyen2" class="link-button" :class="{active: commission == 'vonderleyen2'}">Von der Leyen Commission II (2024 - 2029)</a>
        <a href="./ecmeetings.php?commission=vonderleyen1" class="link-button" :class="{active: commission == 'vonderleyen1'}">Von der Leyen Commission I (2019 – 2024)</a>
        <a href="./ecmeetings.php?commission=juncker" class="link-button" :class="{active: commission == 'juncker'}">Juncker Commission (2014-2019)</a>
      </div>
      
      <!-- MAIN -->
      <div class="container-fluid dashboard-container-outer">
        <div class="row dashboard-container">
          <!-- CHARTS - FIRST ROW - LEFT -->
          <div class="col-md-6 chart-subrow">
            <div class="row chart-subrow-row">
              <div class="col-md-6 chart-col">
                <div class="boxed-container chart-container meetings_1">
                  <chart-header :title="charts.policyLevel.title" :info="charts.policyLevel.info" ></chart-header>
                  <div class="chart-inner" id="policylevel_chart"></div>
                </div>
              </div>
              <div class="col-md-6 chart-col">
                <div class="boxed-container chart-container meetings_2">
                  <chart-header :title="charts.topHosts.title" :info="charts.topHosts.info" ></chart-header>
                  <div class="chart-inner" id="tophosts_chart"></div>
                </div>
              </div>
            </div>
          </div>
          <!-- CHARTS - FIRST ROW - RIGHT -->
          <div class="col-md-6 chart-subrow">
            <div class="row chart-subrow-row">
              <div class="col-md-6 chart-col">
                <div class="boxed-container chart-container meetings_3">
                  <chart-header :title="charts.topOrgs.title" :info="charts.topOrgs.info" ></chart-header>
                  <div class="chart-inner" id="toporgs_chart"></div>
                </div>
              </div>
              <div class="col-md-6 chart-col">
                <div class="boxed-container chart-container meetings_4">
                  <chart-header :title="charts.orgCategory.title" :info="charts.orgCategory.info" ></chart-header>
                  <div class="chart-inner" id="orgcategory_chart"></div>
                </div>
              </div>
            </div>
          </div>
          <!-- CHARTS - SECOND ROW -->
          <div class="col-md-9 chart-col" id="timeline_chart_col">
            <div class="boxed-container chart-container meetings_6">
              <chart-header :title="charts.timeline.title" :info="charts.timeline.info" ></chart-header>
              <div class="chart-inner" id="timeline_chart"></div>
              <div class="chart-inner" id="timelineoverview_chart"></div>
              <span class="timeline-text">Drag to select a time range and filter</span>
            </div>
          </div>
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container meetings_7">
              <chart-header :title="charts.orgSubcategory.title" :info="charts.orgSubcategory.info" ></chart-header>
              <div class="chart-inner" id="orgsubcategory_chart"></div>
            </div>
          </div>
          <!-- TABLE -->
          <div class="col-12 chart-col">
            <div class="boxed-container chart-container chart-container-table">
              <chart-header :title="charts.meetingsTable.title" :info="charts.meetingsTable.info" ></chart-header>
              <div class="chart-inner chart-table">
                <table class="table table-hover dc-data-table" id="dc-data-table">
                  <thead>
                    <tr class="header">
                      <th class="header">Nr</th> 
                      <th class="header">Date</th> 
                      <th class="header">Host</th> 
                      <th class="header">Portfolio</th> 
                      <th class="header">Subject</th> 
                      <th class="header table-header-meetings-org">Lobby Organisation</th> 
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
          <div class="dataset-date">Last updated on: {{ dataUpdateDateString }}</div>
        </div>
      </div>
      <!-- DETAILS MODAL -->
      <div class="modal" id="detailsModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <div class="modal-title">
                <div class="date">{{ selectedMeeting.date }}</div>
                <div class="subject" v-if="selectedMeeting.subject">Subject: <span v-html="selectedMeeting.subject"></span></div>
              </div>
              <button type="button" class="close" data-dismiss="modal"><i class="material-icons">close</i></button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
              <div class="container">
                <div class="row">
                  <div class="col-md-6 details-left">
                    <div class="details-title details-title-left">EUROPEAN COMMISSION HOST(S)</div>
                    <div class="details-line"><span class="details-line-title" v-if="selectedMeeting.hostString">Host name(s):</span> <span v-html="selectedMeeting.hostString"></span></div>
                    <div class="details-line" v-if="selectedMeeting.portfolio"><span class="details-line-title">Portfolio:</span> {{ selectedMeeting.portfolio.join(', ') }}</div>
                  </div>
                  <div class="col-md-6 details-right">
                    <div class="details-title details-title-right">LOBBY ORGANISATION</div>
                    <div class="details-line" v-if="selectedMeetingOrg && selectedMeetingOrg.Name"><span class="details-line-title">Guest:</span> {{ selectedMeetingOrg.Name }}</div>
                    <div class="details-line" v-else-if="selectedMeeting.Org"><span class="details-line-title">Guest:</span> {{ selectedMeeting.Org }}</div>
                    <div class="details-line" v-if="selectedMeetingOrg && selectedMeetingOrg.Country"><span class="details-line-title">Country:</span> {{ selectedMeetingOrg.Country }}</div>
                    <div class="details-line" v-if="selectedMeetingOrg && selectedMeetingOrg.MeetingsInt"><span class="details-line-title">Reported meetings since Nov 2014:</span> {{ selectedMeetingOrg.MeetingsInt }}</div>
                    <div class="details-line" v-if="selectedMeetingOrg && selectedMeetingOrg.Cat"><span class="details-line-title">Category:</span> {{ selectedMeetingOrg.Cat }}</div>
                    <div class="details-line" v-if="selectedMeetingOrg && selectedMeetingOrg.costString"><span class="details-line-title">Estimate of costs:</span> {{ selectedMeetingOrg.costString }}</div>
                    <div class="details-line" v-if="selectedMeetingOrg && selectedMeetingOrg.People"><span class="details-line-title">Total lobbyists:</span> {{ selectedMeetingOrg.People }}</div>
                    <div class="details-line" v-if="selectedMeetingOrg && selectedMeetingOrg.AccredInt"><span class="details-line-title">Accredited lobbyists:</span> {{ selectedMeetingOrg.AccredInt }}</div>
                    <div class="details-line" v-if="selectedMeetingOrg && selectedMeetingOrg.Id"><span class="details-line-title">Transparency Register Declaration: </span> <a target="_blank" :href="'http://ec.europa.eu/transparencyregister/public/consultation/displaylobbyist.do?id=' + selectedMeetingOrg.Id">Transparency Registry</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Disclaimer modal -->
      <div class="modal" id="disclaimerModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <div class="modal-title">FUNCTIONALITY CHANGES</div>
              <button type="button" class="close" data-dismiss="modal"><i class="material-icons">close</i></button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
              <div class="container">
                <div class="row">
                  <div class="col-md-12">
                    <p>Dear Visitor,</p>  
                    <p>Welcome back to Integrity Watch EU - Commission Meetings!<br />
                    In the last month, we have changed some functionalities:<br /><br />
                    The “portfolio” category was removed from the meetings dataset published by the European Commission. Transparency International EU confirmed with the responsible service that the removal is unfortunately permanent. The portfolio category will only be available for Directors-Generals moving forward.
                    </p> 
                    <p>We thank you for your continued support. For more information or questions, please contact <a href="mailto:rkergueno@transparency.org">rkergueno@transparency.org</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Loader -->
      <loader v-if="loader" :text="''" />
    </div>

    <script type="text/javascript" src="vendor/js/d3.v5.min.js"></script>
    <script type="text/javascript" src="vendor/js/d3.layout.cloud.js"></script>
    <script type="text/javascript" src="vendor/js/crossfilter.min.js"></script>
    <script type="text/javascript" src="vendor/js/dc.js"></script>
    <script type="text/javascript" src="vendor/js/dc.cloud.js"></script>

    <script src="static/ecmeetings.js?v=2"></script>

 
</body>
</html>
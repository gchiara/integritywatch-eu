<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="static/meetings.css">
    <title>Meetings</title>
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@TI_EU" />
    <meta name="twitter:creator" content="@eucampaign" />
    <meta property="og:url" content="http://www.integritywatch.eu" />
    <meta property="og:title" content="EU Integrity Watch: monitor potential conflicts of interests" />
    <meta property="og:description" content="Interactive database that provides a unique overview of the activities and outside income for the members of the European Parliament and Commission" />
    <meta property="og:image" content="http://www.integritywatch.eu/images/thumbnail.jpg" />
    <meta property="fb:app_id" content="1611680135716224" />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Quicksand:500" rel="stylesheet">
</head>
<body>
    <div id="app" class="meetings-page">   
      <?php include 'header.php' ?>
      <div class="container-fluid dashboard-container-outer">
        <div class="row dashboard-container">
          <!-- ROW FOR INFO AND SHARE -->
          <div class="col-md-12">
            <div class="row">
              <!-- INFO -->
              <div class="col-md-8 chart-col" v-if="showInfo">
                <div class="boxed-container description-container">
                  <h1>Integrity watch - Meetings</h1>
                  <p>This is a user-friendly interactive database that provides a unique overview of the lobby meetings of the European Commission since December 2014. 
                  <a href="#">Read more</a></p> 
                  <p>By simply clicking on the graphs or the list below users can rank, sort and filter the meetings.</p>
                  <i class="material-icons close-btn" @click="showInfo = false">close</i>
                </div>
              </div>
              <!-- SHARE -->
              <div class="col-md-4 chart-col" v-if="showShare">
                <div class="boxed-container share-container">
                  <button class="twitter-btn" @click="share('twitter')">Share on Twitter</button>
                  <button class="facebook-btn" @click="share('facebook')">Share on Facebook</button>
                  <i class="material-icons close-btn" @click="showShare = false">close</i>
                </div>
              </div>
            </div>
          </div>
          <!-- CHARTS - FIRST ROW - LEFT -->
          <div class="col-md-6 chart-subrow">
            <div class="row chart-subrow-row">
              <div class="col-md-12 subrow-title-container">
                <div class="subrow-title">European Commission</div>
              </div>
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
              <div class="col-md-12 subrow-title-container subrow-title-container-right">
                <div class="subrow-title subrow-title-right">Lobbyist</div>
              </div>
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
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container meetings_5">
              <chart-header :title="charts.portfolio.title" :info="charts.portfolio.info" ></chart-header>
              <div class="chart-inner" id="portfolio_chart"></div>
            </div>
          </div>
          <div class="col-md-6 chart-col" id="wordcloud_chart_col">
            <div class="boxed-container chart-container meetings_6">
              <chart-header :title="charts.subject.title" :info="charts.subject.info" ></chart-header>
              <div class="chart-inner" id="wordcloud_chart"></div>
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
        </div>
      </div>
      <!-- DETAILS MODAL -->
      <div class="modal" id="detailsModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <div class="modal-title">
                <div class="date">{{ selectedMeeting.Date }}</div>
                <div class="subject">Subject: {{ selectedMeeting.Sub }}</div>
              </div>
              <button type="button" class="close" data-dismiss="modal"><i class="material-icons">close</i></button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
              <div class="container">
                <div class="row">
                  <div class="col-md-6 details-left">
                    <div class="details-title details-title-left">EUROPEAN COMMISSION HOST(S)</div>
                    <div class="details-line"><span class="details-line-title">Host name(s):</span> {{ selectedMeeting.Host }}</div>
                    <div class="details-line"><span class="details-line-title">Portfolio:</span> {{ selectedMeeting.P }}</div>
                  </div>
                  <div class="col-md-6 details-right">
                    <div class="details-title details-title-right">LOBBY ORGANISATION</div>
                    <div class="details-line"><span class="details-line-title">Guest:</span> {{ selectedMeetingOrg.Name }}</div>
                    <div class="details-line"><span class="details-line-title">Country:</span> {{ selectedMeetingOrg.Country }}</div>
                    <div class="details-line"><span class="details-line-title">Reported meetings:</span> {{ selectedMeetingOrg.Meeting }}</div>
                    <div class="details-line"><span class="details-line-title">Category:</span> {{ selectedMeetingOrg.Cat }}</div>
                    <div class="details-line"><span class="details-line-title">Estimate of costs:</span> {{ selectedMeetingOrg.costString }}</div>
                    <div class="details-line"><span class="details-line-title">Total lobbyists:</span> {{ selectedMeetingOrg.People }}</div>
                    <div class="details-line"><span class="details-line-title">Accredited lobbyists:</span> {{ selectedMeetingOrg.AccredInt }}</div>
                    <div class="details-line"><span class="details-line-title">Transparency Register Declaration: </span> <a target="_blank" :href="'http://ec.europa.eu/transparencyregister/public/consultation/displaylobbyist.do?id=' + selectedMeetingOrg.Id">Transparency Registry</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Bottom bar -->
      <div class="container-fluid footer-bar">
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
              <div class="filter-count">0</div>out of <strong class="total-count">0</strong> organizations
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
        <button class="reset-btn"><i class="material-icons">settings_backup_restore</i><span class="reset-btn-text">Reset filters</span></button>
      </div>
      <!-- Loader -->
      <loader v-if="loader" />
    </div>

    <script type="text/javascript" src="vendor/js/d3.v5.min.js"></script>
    <script type="text/javascript" src="vendor/js/d3.layout.cloud.js"></script>
    <script type="text/javascript" src="vendor/js/crossfilter.min.js"></script>
    <script type="text/javascript" src="vendor/js/dc.js"></script>
    <script type="text/javascript" src="vendor/js/dc.cloud.js"></script>

    <script src="static/meetings.js"></script>

 
</body>
</html>
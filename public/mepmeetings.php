<html lang="en">
<head>
    <?php include 'gtag.php' ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>MEP Meetings</title>
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@TI_EU" />
    <meta name="twitter:creator" content="@eucampaign" />
    <meta property="og:url" content="https://www.integritywatch.eu/mepmeetings" />
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
    <link rel="stylesheet" href="static/mepmeetings.css?v=5">
</head>
<body>
    <div id="app" class="mepmeetings-page">   
      <?php include 'header.php' ?>
      <!-- Filters bar -->
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
              <div class="meps-count count-box">
                <div class="filter-count">0</div>out of <strong class="total-count-meps">0</strong> MEPs
              </div>
              <div class="dc-data-count count-box count-box-published-meetings">
                <div class="filter-count">0</div>out of <strong class="total-count">0</strong> published meetings
              </div>
            </div>
          </div>
          <!-- Reset filters -->
          <button class="reset-btn"><i class="material-icons">settings_backup_restore</i><span class="reset-btn-text">Reset</span></button>
        </div>
      </div>
      <!-- MANDATE SELECTOR -->
      <div class="commission-select-container">
        <a href="./mepmeetings.php" class="link-button" :class="{active: previousmandate == false}">10th legislature (2024 – 2029)</a>
        <a href="./mepmeetings.php?previousmandate=1&legislature=9" class="link-button" :class="{active: previousmandate == true}">9th legislature (2019 – 2024)</a>
      </div>
      <!-- MAIN -->
      <div class="container-fluid dashboard-container-outer">
        <div class="row dashboard-container">
          <!-- CHARTS - FIRST ROW -->
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container mepmeetings_1">
              <chart-header :title="charts.committee.title" :info="charts.committee.info" :customclass="'fixed-twoline-height'" ></chart-header>
              <div class="chart-inner" id="committee_chart"></div>
            </div>
          </div>
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container  mepmeetings_2">
              <chart-header :title="charts.group.title" :info="charts.group.info" ></chart-header>
              <div class="chart-inner" id="group_chart"></div>
            </div>
          </div>
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container  mepmeetings_3">
              <chart-header :title="charts.country.title" :info="charts.country.info" ></chart-header>
              <div class="chart-inner" id="country_chart"></div>
            </div>
          </div>
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container  mepmeetings_4">
              <chart-header :title="charts.role.title" :info="charts.role.info" ></chart-header>
              <div class="chart-inner" id="role_chart"></div>
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
                      <th class="header">EP Group</th> 
                      <th class="header">Country</th> 
                      <th class="header">Committee</th> 
                      <th class="header">Role</th> 
                      <th class="header">Subject</th> 
                      <th class="header">Lobbyist (s)</th> 
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
                <div class="date">Date: {{ selectedMeeting.dateParsed }}</div>
                <div class="subject"><strong>Subject:</strong> {{ selectedMeeting.title }}</div>
              </div>
              <button type="button" class="close" data-dismiss="modal"><i class="material-icons">close</i></button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
              <div class="container">
                <div class="row">
                  <div class="col-md-6 details-left">
                    <div class="details-title details-title-left">EUROPEAN PARLIAMENT HOST(S)</div>
                    <div class="details-line"><span class="details-line-title">Name:</span> {{ selectedMeeting.mep }}</div>
                    <div class="details-line"><span class="details-line-title">Political Group:</span> {{ selectedMeeting.group }}</div>
                    <div class="details-line"><span class="details-line-title">Country:</span> {{ selectedMeeting.country }}</div>
                    <div class="details-line" v-if="selectedMeeting.committeesString"><span class="details-line-title">Committee:</span> {{ selectedMeeting.committeesString }}</div>
                    <div class="details-line" v-else><span class="details-line-title">Committee:</span> General</div>
                    <div class="details-line" v-if="selectedMeeting.dossier"><span class="details-line-title">Report:</span> {{ selectedMeeting.dossier }}</div>
                    <div class="details-line" v-else-if="selectedMeeting.topic"><span class="details-line-title">Report:</span> {{ selectedMeeting.topic }}</div>
                    <div class="details-line" v-else><span class="details-line-title">Report:</span> Not applicable</div>
                    <div class="details-line"><span class="details-line-title">Source:</span> <a :href="selectedMeeting.sourceUrl" target="_blank">European Parliament</a></div> 
                  </div>
                  <div class="col-md-6 details-right">
                    <div class="details-title details-title-right">LOBBYIST(S)</div>
                    <div class="details-line"><span class="details-line-title">Name:</span> {{ selectedMeeting.lobbyists }}</div>
                    <div class="details-line"><span class="details-line-title">Location:</span> {{ selectedMeeting.location }}</div>
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
                    <p>Welcome back to Integrity Watch EU - Parliament Meetings!<br />
                    In the last month, we have changed some functionalities:<br /><br />
                    Following changes to the internal European Parliament rules, MEPs must publish their lobby meetings with third-country representatives and lobbyists acting on behalf of third countries as part of their role in a third-country delegation. Select “DELEGATIONS” to view all published meetings held with third-country representatives.
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

    <script src="static/mepmeetings.js?v=5"></script>

 
</body>
</html>
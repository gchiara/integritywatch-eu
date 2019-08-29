<html lang="en">
<head>
  <?php include 'gtag.php' ?>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>MEPs Incomes</title>
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="@TI_EU" />
  <meta name="twitter:creator" content="@eucampaign" />
  <meta property="og:url" content="http://www.integritywatch.eu" />
  <meta property="og:title" content="EU Integrity Watch: monitor potential conflicts of interests" />
  <meta property="og:description" content="Interactive database that provides a unique overview of the activities and outside income for the members of the European Parliament and Commission" />
  <meta property="og:image" content="http://www.integritywatch.eu/images/thumbnail.jpg" />
  <meta property="fb:app_id" content="1611680135716224" />
  <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
  <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Quicksand:500" rel="stylesheet">
  <link rel="stylesheet" href="static/mepincomes.css">
</head>
<body>
    <div id="app" class="incomes-page">   
      <?php include 'header.php' ?>
      <div class="container-fluid dashboard-container-outer">
        <div class="row dashboard-container">
          <!-- ROW FOR INFO AND SHARE -->
          <div class="col-md-12">
            <div class="row">
              <!-- INFO -->
              <div class="col-md-8 chart-col" v-if="showInfo">
                <div class="boxed-container description-container">
                  <h1>Integrity Watch - MEP incomes</h1>
                  <p>This is a user-friendly interactive database that provides a unique overview of the activities of members of the European Parliament. By simply clicking on the graphs or the list below users can rank, sort and filter MEPs. Thereby the database allows to better monitor potential conflicts of interests or to identify those MEPs with more outside activities. 
                  <a href="./about.php?section=4">Read more</a></p> 
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
          <!-- CHARTS - FIRST ROW -->
          <div class="col-md-4 chart-col" id="countries_chart_col">
            <div class="boxed-container chart-container meps_1">
              <chart-header :title="charts.country.title" :info="charts.country.info" ></chart-header>
              <div class="chart-inner" id="country_chart"></div>
            </div>
          </div>
          <div class="col-md-4 chart-col">
            <div class="boxed-container chart-container meps_2">
              <chart-header :title="charts.politicalGroup.title" :info="charts.politicalGroup.info" ></chart-header>
              <div class="chart-inner" id="group_chart"></div>
            </div>
          </div>
          <div class="col-md-4 chart-col">
            <div class="boxed-container chart-container meps_3">
              <chart-header :title="charts.outsideIncome.title" :info="charts.outsideIncome.info" ></chart-header>
              <div class="chart-inner" id="income_chart"></div>
            </div>
          </div>
          <!-- CHARTS - SECOND ROW -->
          <div class="col-md-4 chart-col">
            <div class="boxed-container chart-container meps_4">
              <chart-header :title="charts.outsideActivities.title" :info="charts.outsideActivities.info" ></chart-header>
              <div class="chart-inner" id="activities_chart"></div>
            </div>
          </div>
          <div class="col-md-4 chart-col">
            <div class="boxed-container chart-container meps_5">
              <chart-header :title="charts.gender.title" :info="charts.gender.info" ></chart-header>
              <div class="chart-inner" id="gender_chart"></div>
            </div>
          </div>
          <div class="col-md-4 chart-col">
            <div class="boxed-container chart-container meps_6">
              <chart-header :title="charts.age.title" :info="charts.age.info" ></chart-header>
              <div class="chart-inner" id="age_chart"></div>
            </div>
          </div>
          <!-- TABLE -->
          <div class="col-12 chart-col">
            <div class="boxed-container chart-container chart-container-table">
              <chart-header :title="charts.mepTable.title" :info="charts.mepTable.info" ></chart-header>
              <div class="chart-inner chart-table">
                <table class="table table-hover dc-data-table" id="dc-data-table">
                  <thead>
                    <tr class="header">
                      <th class="header">Nr</th> 
                      <th class="header">Name</th> 
                      <th class="header">Country</th> 
                      <th class="header">Group</th> 
                      <!-- <th class="header">Attendance</th> -->
                      <th class="header">Activities</th> 
                      <th class="header">Outside income min (P.A.)</th>
                      <th class="header">Outside income max (P.A.)</th>
                      <th class="header" v-show="showDOIdateCol">Date of last DOI</th>
                    </tr>
                  </thead>
                </table>
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
              <div class="filter-count">0</div>out of <strong class="total-count">0</strong> MEPs
            </div>
            <div class="count-box count-box-activities">
              <div class="filter-count nbactivities">0</div> activities
            </div>
            <div class="count-box count-box-activities">
              <div class="filter-count nbmin">0</div> income min
            </div>
            <div class="count-box count-box-activities">
              <div class="filter-count nbmax">0</div> income max
            </div>
          </div>
        </div>
        <!-- Reset filters -->
        <button class="reset-btn"><i class="material-icons">settings_backup_restore</i><span class="reset-btn-text">Reset filters</span></button>
      </div>
      <!-- DETAILS MODAL -->
      <div class="modal" id="detailsModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <div class="modal-title">
                <div class="name">{{ selectedMep.first_name }} {{ selectedMep.last_name }}</div>
              </div>
              <button type="button" class="close" data-dismiss="modal"><i class="material-icons">close</i></button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
              <div class="container">
                <div class="row">
                  <div class="col-md-8">
                    <div class="details-line"><span class="details-line-title">Country:</span> {{ selectedMep.country }}</div>
                    <div class="details-line"><span class="details-line-title">Activities:</span> {{ selectedMep.activitiesData.activitiesNum }}</div>
                    <div class="details-line"><span class="details-line-title">Outside revenues:</span> {{ addcommasModal(selectedMep.activitiesData.min) }} ↝ {{ addcommasModal(selectedMep.activitiesData.max) }} € (monthly)</div>
                    <div class="details-line"><span class="details-line-title">Monthly salary:</span> 8757,70 €</div>
                    <!-- <div class="details-line"><span class="details-line-title">Attendance:</span> {{ selectedMep.attendance.score + '%' }}</div> -->
                    <div class="details-line"><span class="details-line-title">Group:</span> {{ selectedMep.eugroup}}</div>
                    <div class="details-line"><span class="details-line-title">Party:</span> {{ selectedMep.party }}</div>
                    <div class="details-line"><span class="details-line-title">Age:</span> {{ selectedMep.age }}</div>
                    <div class="details-line"><span class="details-line-title">Committee:</span> {{ selectedMep.committee }}</div>
                    <div class="details-line"><span class="details-line-title">Substitute:</span> {{ selectedMep.substitute }}</div>
                    <div class="details-line"><span class="details-line-title">Delegation:</span> {{ selectedMep.delegation }}</div>
                    <div class="details-line"><span class="details-line-title">Full profile:</span> <a target="_blank" :href="'http://www.europarl.europa.eu/meps/en/'+selectedMep.epid+'/'">European Parliament Website</a></div>
                    <div class="details-line" v-if="selectedMep.doi.url !== ''"><span class="details-line-title">Source:</span> <a target="_blank" :href="selectedMep.doi.url">Original declaration</a></div>
                    <div class="details-line"><span class="details-line-title">Date of the latest declaration:</span> {{ selectedMep.doi.date }}</div>
                  </div>
                  <div class="col-md-4">
                    <img :src="'http://www.europarl.europa.eu/mepphoto/'+selectedMep.epid+'.jpg'" />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="modal-activities-title">DECLARATION OF MEMBERS' FINANCIAL INTERESTS</div>
                    <div class="modal-activities-subtitle">A. Previous occupation</div>
                    <div class="row modal-activities-row" v-for="act in selectedMep.doi.occupation">
                      <div class="col-md-8 modal-activities-left">{{ act[0] }}</div><div class="col-md-4 modal-activities-right">{{ calcIncomeRange(act, selectedMep.doi.isNewDoi) }}</div>
                    </div>
                    <div class="modal-activities-subtitle">B. Other mandates</div>
                    <div class="row modal-activities-row" v-for="act in selectedMep.doi.mandate">
                      <div class="col-md-8 modal-activities-left">{{ act[0] }}</div><div class="col-md-4 modal-activities-right">{{ calcIncomeRange(act, selectedMep.doi.isNewDoi) }}</div>
                    </div>
                    <div class="modal-activities-subtitle">C. Regular outside activity</div>
                    <div class="row modal-activities-row" v-for="act in selectedMep.doi.activity">
                      <div class="col-md-8 modal-activities-left">{{ act[0] }}</div><div class="col-md-4 modal-activities-right">{{ calcIncomeRange(act, selectedMep.doi.isNewDoi) }}</div>
                    </div>
                    <div class="modal-activities-subtitle">D. Committee & Board memberships</div>
                    <div class="row modal-activities-row" v-for="act in selectedMep.doi.membership">
                      <div class="col-md-8 modal-activities-left">{{ act[0] }}</div><div class="col-md-4 modal-activities-right">{{ calcIncomeRange(act, selectedMep.doi.isNewDoi) }}</div>
                    </div>
                    <div class="modal-activities-subtitle">E. Occasional outside activity</div>
                    <div class="row modal-activities-row" v-for="act in selectedMep.doi.occasional">
                      <div class="col-md-8 modal-activities-left">{{ act[0] }}</div><div class="col-md-4 modal-activities-right">{{ calcIncomeRange(act, selectedMep.doi.isNewDoi) }}</div>
                    </div>
                    <div class="modal-activities-subtitle">F. Holdings</div>
                    <div class="row modal-activities-row" v-for="act in selectedMep.doi.holding">
                      <div class="col-md-8 modal-activities-left">{{ act[0] }}</div><div class="col-md-4 modal-activities-right">{{ calcIncomeRange(act, selectedMep.doi.isNewDoi) }}</div>
                    </div>
                    <div class="modal-activities-subtitle">I. Additional information</div>
                    <div class="row modal-activities-row" v-if="selectedMep.doi.additional">
                      <div class="col-md-12 modal-activities-left">{{ selectedMep.doi.additional }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- NOTICE MODAL -->
      <div class="modal" id="noticeModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <div class="modal-title">
                IMPORTANT NOTICE
              </div>
              <button type="button" class="close" data-dismiss="modal"><i class="material-icons">close</i></button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
              We’re currently in the process of updating our MEP income tool with the declarations of financial interests of the 9th legislature. Please note that a number of declarations are currently missing from the European Parliament website. All of the new declarations will be published on Integrity Watch as soon as we receive clarifications from the competent parliamentary services.
            </div>
          </div>
        </div>
      </div>
      <!-- Loader -->
      <loader v-if="loader" :text="'This is a user-friendly interactive database that provides a unique overview of the activities of members of the European Parliament.'" />
    </div>

    <script type="text/javascript" src="vendor/js/d3.v5.min.js"></script>
    <script type="text/javascript" src="vendor/js/d3.layout.cloud.js"></script>
    <script type="text/javascript" src="vendor/js/crossfilter.min.js"></script>
    <script type="text/javascript" src="vendor/js/dc.js"></script>
    <script type="text/javascript" src="vendor/js/dc.cloud.js"></script>

    <script src="static/mepincomes.js"></script>

 
</body>
</html>
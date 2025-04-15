<html lang="en">
<head>
  <?php include 'gtag.php' ?>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>MEPs Info</title>
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="@TI_EU" />
  <meta name="twitter:creator" content="@eucampaign" />
  <meta property="og:url" content="https://www.integritywatch.eu/mepincomes" />
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
  <link rel="stylesheet" href="static/mepincomes_new.css?v=6">
</head>
<body>
    <div id="app" class="incomes-page new-dois-page">   
      <?php include 'header.php' ?>
      <!-- Filters bar -->
      <div class="footer-bar-top-bg">
        <div class="container-fluid footer-bar footer-bar-top">
          <div class="row">
            <div class="footer-col col-8 col-sm-4">
              <div class="footer-input">
                <input type="text" id="search-input" placeholder="Search MEPs by name">
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
              <div class="count-box count-box-activities-val">
                <div class="filter-count nbestimated">0</div> estimated annual income
              </div>
            </div>
          </div>
          <!-- Reset filters -->
          <button class="reset-btn"><i class="material-icons">settings_backup_restore</i><span class="reset-btn-text">Reset</span></button>
        </div>
      </div>
      <!-- MANDATE SELECTOR -->
      <div class="commission-select-container">
        <a href="./mepincomes.php" class="link-button" :class="{active: previousmandate == false}">10th legislature (2024 – 2029)</a>
        <a href="./mepincomes.php?previousmandate=1&legislature=9" class="link-button" :class="{active: previousmandate == true}">9th legislature (2019 – 2024)</a>
      </div>
      <!-- MAIN -->
      <div class="container-fluid dashboard-container-outer">
        <div class="row dashboard-container">
          <!-- CHARTS - FIRST ROW -->
          <div class="col-md-4 chart-col" id="countries_chart_col">
            <div class="boxed-container chart-container meps_1">
              <chart-header :title="charts.country.title" :info="charts.country.info" ></chart-header>
              <div class="chart-inner" id="country_chart"></div>
            </div>
          </div>
          <div class="col-md-4 chart-col">
            <div class="boxed-container chart-container chart-larger-legend meps_2">
              <chart-header :title="charts.politicalGroup.title" :info="charts.politicalGroup.info" ></chart-header>
              <div class="chart-inner" id="group_chart"></div>
            </div>
          </div>
          <div class="col-md-4 chart-col">
            <div class="boxed-container chart-container chart-larger-legend meps_3">
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
              <chart-header :title="charts.gea.title" :info="charts.gea.info" ></chart-header>
              <div class="chart-inner" id="gea_chart"></div>
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
                      <th class="header">Activities</th> 
                      <th class="header">Estimated annual income</th>
                      <th class="header">GEA</th>
                      <th class="header">Travel</th> 
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
                    <div class="details-line"><span class="details-line-title">Estimated outside annual income:</span> {{ addcommasModal(selectedMep.activitiesData.incomeAmt) }} €</div>
                    <div class="details-line"><span class="details-line-title">Monthly salary:</span> 8,757.70 €</div>
                    <!-- <div class="details-line"><span class="details-line-title">Attendance:</span> {{ selectedMep.attendance.score + '%' }}</div> -->
                    <div class="details-line"><span class="details-line-title">Group:</span> {{ selectedMep.eugroup}}</div>
                    <div class="details-line"><span class="details-line-title">Party:</span> {{ selectedMep.party }}</div>
                    <div class="details-line"><span class="details-line-title">Age:</span> {{ selectedMep.age }}</div>
                    <div class="details-line"><span class="details-line-title">Committee:</span> {{ selectedMep.committeeString }}</div>
                    <div class="details-line"><span class="details-line-title">Substitute:</span> {{ selectedMep.substituteString }}</div>
                    <div class="details-line"><span class="details-line-title">Delegation:</span> {{ selectedMep.delegationString }}</div>
                    <div class="details-line"><span class="details-line-title">Full profile:</span> <a target="_blank" :href="'http://www.europarl.europa.eu/meps/en/'+selectedMep.epid+'/'">European Parliament Website</a></div>
                    <div class="details-line" v-if="selectedMep.DPI_links && selectedMep.DPI_links.length > 0"><span class="details-line-title">Source:</span> <a target="_blank" :href="selectedMep.DPI_links[0].url">Original declaration</a></div>
                    <div class="details-line" v-if="selectedMep.DPI_links && selectedMep.DPI_links.length > 0 && selectedMep.DPI_links[0].title.split(' - ').length > 1"><span class="details-line-title">Date of the latest declaration:</span> {{ selectedMep.DPI_links[0].title.split(' - ')[1] }}</div>
                  </div>
                  <div class="col-md-4">
                    <img class="mep-photo" :src="'http://www.europarl.europa.eu/mepphoto/'+selectedMep.epid+'.jpg'" />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="modal-activities-title">DECLARATION OF MEMBERS' FINANCIAL INTERESTS</div>
                    <div class="modal-activities-subtitle">A. Previous occupations or memberships</div>
                    <table class="modal-table" v-if="selectedMep && selectedMep.doi && selectedMep.doi.A && selectedMep.doi.A.length > 0">
                      <thead><tr>
                        <th>Occupation or Membership</th>
                        <th>Income amount</th>
                        <th>Periodicity</th>
                        <th>Nature of the benefit (if no income)</th>
                      </tr></thead>
                      <tbody>
                        <tr v-for="el in selectedMep.doi.A">
                          <td>{{ el.activity }}</td>
                          <td v-if="el.income_amt !== ''">{{ el.income_amt }}</td><td v-else-if="el.income_none !== ''">None</td><td v-else>/</td>
                          <td v-if="el.periodicity_streamlined == 'other'">{{ el.periodicity_streamlined }}: {{el.periodicity}}</td><td v-else>{{ el.periodicity_streamlined }}</td>
                          <td>{{ el.benefit_nature }}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="modal-table-else" v-else>/</div>

                    <div class="modal-activities-subtitle">B. Current renumerated activities</div>
                    <table class="modal-table" v-if="selectedMep && selectedMep.doi && selectedMep.doi.B && selectedMep.doi.B.length > 0">
                      <thead><tr>
                        <th>Activity</th>
                        <th>Income amount</th>
                        <th>Periodicity</th>
                        <th>Nature of the benefit (if no income)</th>
                        <th>Estimated annual income</th>
                      </tr></thead>
                      <tbody>
                        <tr v-for="el in selectedMep.doi.B">
                          <td>{{ el.activity }}</td>
                          <td v-if="el.income_amt !== ''">{{ el.income_amt }}</td><td v-else-if="el.income_none !== ''">None</td><td v-else>/</td>
                          <td v-if="el.periodicity_streamlined == 'other'">{{ el.periodicity_streamlined }}: {{el.periodicity}}</td><td v-else>{{ el.periodicity_streamlined }}</td>
                          <td>{{ el.benefit_nature }}</td>
                          <td v-if="el.income_amt_total_eur_manual !== ''">{{ el.income_amt_total_eur_manual }}</td><td v-else-if="el.income_amt_total_eur_auto !== ''">{{ el.income_amt_total_eur_auto }}</td><td v-else>/</td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="modal-table-else" v-else>/</div>

                    <div class="modal-activities-subtitle">C. Current board memberships</div>
                    <table class="modal-table" v-if="selectedMep && selectedMep.doi && selectedMep.doi.C && selectedMep.doi.C.length > 0">
                      <thead><tr>
                        <th>Membership</th>
                        <th>Income amount</th>
                        <th>Periodicity</th>
                        <th>Nature of the benefit (if no income)</th>
                        <th>Estimated annual income</th>
                      </tr></thead>
                      <tbody>
                        <tr v-for="el in selectedMep.doi.C">
                          <td>{{ el.activity }}</td>
                          <td v-if="el.income_amt !== ''">{{ el.income_amt }}</td><td v-else-if="el.income_none !== ''">None</td><td v-else>/</td>
                          <td v-if="el.periodicity_streamlined == 'other'">{{ el.periodicity_streamlined }}: {{el.periodicity}}</td><td v-else>{{ el.periodicity_streamlined }}</td>
                          <td>{{ el.benefit_nature }}</td>
                          <td v-if="el.income_amt_total_eur_manual !== ''">{{ el.income_amt_total_eur_manual }}</td><td v-else-if="el.income_amt_total_eur_auto !== ''">{{ el.income_amt_total_eur_auto }}</td><td v-else>/</td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="modal-table-else" v-else>/</div>

                    <div class="modal-activities-subtitle">D. Current business holdings or partnerships with public policy implications</div>
                    <table class="modal-table" v-if="selectedMep && selectedMep.doi && selectedMep.doi.D && selectedMep.doi.D.length > 0">
                      <thead><tr>
                        <th>Holding or partnership</th>
                        <th>Type</th>
                        <th>Income amount</th>
                        <th>Periodicity</th>
                        <th>Nature of the benefit (if no income)</th>
                        <th>Estimated annual income</th>
                      </tr></thead>
                      <tbody>
                        <tr v-for="el in selectedMep.doi.D">
                          <td v-if="el.holding_with_public_implication !== ''">{{ el.holding_with_public_implication }}</td><td v-else-if="el.holding_with_influence !== ''">{{ el.holding_with_influence }}</td><td v-else>/</td>
                          <td v-if="el.holding_with_public_implication !== ''">Holding or partnership with potential public policy implication</td><td v-else-if="el.holding_with_influence !== ''">Holding which gives significant influence</td><td v-else>/</td>
                          <td v-if="el.income_amt !== ''">{{ el.income_amt }}</td><td v-else-if="el.income_none !== ''">None</td><td v-else>/</td>
                          <td v-if="el.periodicity_streamlined == 'other'">{{ el.periodicity_streamlined }}: {{el.periodicity}}</td><td v-else>{{ el.periodicity_streamlined }}</td>
                          <td>{{ el.benefit_nature }}</td>
                          <td v-if="el.income_amt_total_eur_manual !== ''">{{ el.income_amt_total_eur_manual }}</td><td v-else-if="el.income_amt_total_eur_auto !== ''">{{ el.income_amt_total_eur_auto }}</td><td v-else>/</td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="modal-table-else" v-else>/</div>

                    <div class="modal-activities-subtitle">E. Other relevant information</div>
                    <table class="modal-table">
                      <thead><tr>
                        <th>Type</th>
                        <th>Description</th>
                      </tr></thead>
                      <tbody>
                        <tr>
                          <td><strong>Third party financial and material support</strong></td>
                          <td v-if="selectedMep.doiEfgEntries" v-html="selectedMep.doiEfgEntries.E"></td><td v-else></td>
                        </tr>
                        <tr>
                          <td><strong>Direct or Private interests which might influence performance of duties</strong></td>
                          <td v-if="selectedMep.doiEfgEntries">{{ selectedMep.doiEfgEntries.F }}</td><td v-else></td>
                        </tr>
                        <tr>
                          <td><strong>Any additional information</strong></td>
                          <td v-if="selectedMep.doiEfgEntries">{{ selectedMep.doiEfgEntries.G }}</td><td v-else></td>
                        </tr>
                      </tbody>
                    </table>
                    
                  </div>
                  <div class="col-md-12 modal-gea-container" v-if="selectedMep.has_general_expenditure_allowance == 'true'">
                    <div class="modal-activities-title">GENERAL EXPENDITURE ALLOWANCE</div>
                    <div v-for="geaLink in selectedMep.GEA_links">
                      <a :href="geaLink.url" target="_blank">{{geaLink.title}}</a>
                    </div>
                  </div>
                  <div class="col-md-12 modal-gea-container" v-if="selectedMep.events_declaration_num">
                    <div class="modal-activities-title">DECLARATIONS OF PARTICIPATION BY MEMBERS IN EVENTS ORGANISED BY THIRD PARTIES</div>
                    <span v-for="eventLink, i in selectedMep.events_declaration_docs">
                      <a :href="eventLink.url" target="_blank">{{eventLink.title}}</a>
                      <span v-if="i < selectedMep.events_declaration_docs.length - 1"> | </span> 
                    </span>
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
            <div class="modal-header modal-header-blue">
              <div class="modal-title">UPDATE</div>
              <button type="button" class="close" data-dismiss="modal"><i class="material-icons">close</i></button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
              <div class="container">
                <div class="row">
                  <div class="col-md-12">
                    <p>Dear Visitor,</p>  
                    <p>Welcome back to Integrity Watch EU – MEP income!</p>
                    <p><strong>The data currently displayed on this section is from the declaration of private interests from the previous legislature (2019 – 2024).</strong></p>
                    <p>
                    Following the June 2024 European elections, Members of the European Parliament
                    have submitted new declarations of private interests. We are in the process of
                    collecting, cleaning and harmonising the data, before uploading it to the IW EU mep
                    income section. Stay tuned for more news on this shortly.
                    </p> 
                    <p>Thank you for your continued support. Feel free to get in touch with us: <a href="mailto:rkergueno@transparency.org">rkergueno@transparency.org</a></p>
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
      <loader v-if="loader" :text="''" />
    </div>

    <script type="text/javascript" src="vendor/js/d3.v5.min.js"></script>
    <script type="text/javascript" src="vendor/js/d3.layout.cloud.js"></script>
    <script type="text/javascript" src="vendor/js/crossfilter.min.js"></script>
    <script type="text/javascript" src="vendor/js/dc.js"></script>
    <script type="text/javascript" src="vendor/js/dc.cloud.js"></script>

    <script src="static/mepincomes_new.js?v=6"></script>

 
</body>
</html>
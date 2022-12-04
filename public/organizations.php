<html lang="en">
<head>
  <?php include 'gtag.php' ?>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>EU Lobbyists</title>
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="@TI_EU" />
  <meta name="twitter:creator" content="@eucampaign" />
  <meta property="og:url" content="https://www.integritywatch.eu/organizations" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="EU Integrity Watch: monitor potential conflicts of interests" />
  <meta property="og:description" content="EU Integrity Watch: monitor EU lobbying and potential conflicts of interests. Interactive database that provides a unique overview of the lobby meetings of the European Commission as well as lobby meetings and outside activities of current Members of the European Parliament." />
  <meta property="og:image" content="http://www.integritywatch.eu/images/thumbnail.jpg" />
  <meta property="fb:app_id" content="1611680135716224" />
  <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
  <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700,800" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Quicksand:500" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800" rel="stylesheet">
  <link rel="stylesheet" href="fonts/oswald.css">
  <link rel="stylesheet" href="static/organizations.css?v=1">
</head>
<body>
    <div id="app" class="organizations-page">   
      <?php include 'header.php' ?>
      <!-- TOP AREA -->
      <div class="container-fluid top-description-container" style="background-image:url('./images/top-bg-2.png')" v-if="showInfo">
        <div class="row">
          <div class="col-md-12 top-description-content">
            <div class="top-description-text">
              <h1>Integrity Watch EU | Lobbyists</h1>
              <h2>This is a user-friendly interactive database that provides a unique overview of the lobby organisations registered in the EU Transparency Register – the register of Brussels lobbyists.</h2>
              <a class="read-more-btn" href="./about.php?section=4">Read more</a>
              <button class="social-share-btn twitter-btn" @click="share('twitter')"><img src="./images/twitter-nobg.png" />Share on Twitter</button>
              <button class="social-share-btn  facebook-btn" @click="share('facebook')"><img src="./images/facebook-nobg.png" />Share on Facebook</button>
              <p>By simply clicking on the graph or list below users can rank, sort and filter the EU lobby organisations.</p>
            </div>
            <i class="material-icons close-btn" @click="showInfo = false">close</i>
          </div>
        </div>
      </div>
      <!-- MAIN -->
      <div class="container-fluid dashboard-container-outer">
        <div class="row dashboard-container">
          <!-- CHARTS - FIRST ROW -->
          <div class="col-md-3 chart-col" id="countries_chart_col">
            <div class="boxed-container chart-container organizations_1">
              <chart-header :title="charts.topCountries.title" :info="charts.topCountries.info" ></chart-header>
              <div class="countryselect-container">
                <select id="countryselect">
                  <option value="">Select a country</option>
                </select>
              </div>
              <div class="chart-inner" id="topcountries_chart"></div>
            </div>
          </div>
          <div class="col-md-6 chart-col" id="expense_chart_col">
            <div class="boxed-container chart-container organizations_2">
              <chart-header :title="charts.expense.title" :info="charts.expense.info" ></chart-header>
              <!-- <div class="chart-inner" id="expense_chart"></div> -->
              <div class="lobbyists-expenses-message">
                <p>The introduction of new categories of lobbyists results in different financial reporting requirements. Organisations representing commercial interests report their lobbying budget while non-commercial organisations report their total global operating budget, of which a mere fraction is dedicated to EU lobbying. Side by side comparisons between categories is now factually misleading.</p>
                <p>TI EU strongly advocates for uniform reporting obligations for all categories of lobbyists. For more information, please consult the about section.</p>
              </div>
            </div>
          </div>
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container organizations_3">
              <chart-header :title="charts.orgCategory.title" :info="charts.orgCategory.info" ></chart-header>
              <div class="chart-inner" id="orgcategory_chart"></div>
            </div>
          </div>
          <!-- CHARTS - SECOND ROW -->
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container organizations_4">
              <chart-header :title="charts.accreditations.title" :info="charts.accreditations.info" :customclass="'fixed-twoline-height'" ></chart-header>
              <div class="chart-inner" id="accreditations_chart"></div>
            </div>
          </div>
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container organizations_5">
              <chart-header :title="charts.meetings.title" :info="charts.meetings.info" ></chart-header>
              <div class="chart-inner" id="meetings_chart"></div>
            </div>
          </div>
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container organizations_6">
              <chart-header :title="charts.lobbyists.title" :info="charts.lobbyists.info" :customclass="'fixed-twoline-height'"></chart-header>
              <div class="chart-inner" id="lobbyists_chart"></div>
            </div>
          </div>
          <div class="col-md-3 chart-col">
            <div class="boxed-container chart-container organizations_7">
              <chart-header :title="charts.orgSubcategory.title" :info="charts.orgSubcategory.info" ></chart-header>
              <div class="chart-inner" id="orgsubcategory_chart"></div>
            </div>
          </div>
          <!-- TABLE -->
          <div class="col-12 chart-col">
            <div class="boxed-container chart-container chart-container-table">
              <chart-header :title="charts.orgTable.title" :info="charts.orgTable.info" ></chart-header>
              <div class="chart-inner chart-table">
                <table class="table table-hover dc-data-table" id="dc-data-table">
                  <thead>
                    <tr class="header">
                      <th class="header">Nr</th> 
                      <th class="header">Name</th> 
                      <th class="header">Meetings</th> 
                      <th class="header">Accreditations</th> 
                      <th class="header">Lobbyists</th> 
                      <th class="header table-header-organisations-expense">Lobby Expense</th> 
                    </tr>
                  </thead>
                </table>
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
              <div class="modal-title"> WARNING</div>
              <button type="button" class="close" data-dismiss="modal"><i class="material-icons">close</i></button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
              <div class="container">
                <div class="row">
                  <div class="col-md-12">
                    Dear visitor,<br /><br />
                    Please note that we’re in process of updating the EU lobbyist section of Integrity Watch EU. These changes will reflect the introduction of new categories of data that lobbyists must provide on the Transparency Register. All other sections of Integrity Watch EU continue to function as normal and are updated every two weeks.<br /><br />
                    We thank you in advance for your understanding. If you have any questions, feel free to get in touch at:
                    <a href="mailto:rkergueno@transparency.org">rkergueno@transparency.org</a>
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
              <div class="filter-count">0</div>out of <strong class="total-count">0</strong> organisations
            </div>
            <div class="count-box count-box-accred">
              <div class="filter-count nbaccredited">0</div> Accredited Lobbyists
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
                <div class="name" :style="{ color: selectedOrg.Color }">{{ selectedOrg.Name }}</div>
              </div>
              <button type="button" class="close" data-dismiss="modal"><i class="material-icons">close</i></button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
              <div class="container">
                <div class="row">
                  <div class="col-md-12">
                    <div class="details-line"><span class="details-line-title">Type:</span> {{ selectedOrg.Cat }}</div>
                    <div class="details-line"><span class="details-line-title">Subcategory:</span> {{ selectedOrg.Cat2 }}</div>
                    <div class="details-line"><span class="details-line-title">Country:</span> {{ selectedOrg.Country }}</div>
                    <div class="details-line"><span class="details-line-title">Budget:</span> {{ selectedOrg.costsString }}</div>
                    <div class="details-line"><span class="details-line-title">Lobbyists:</span> {{ selectedOrg.People }}</div>
                    <div class="details-line"><span class="details-line-title">FTE:</span> {{ selectedOrg.FTE }}</div>
                    <div class="details-line"><span class="details-line-title">Reported meetings:</span> {{ selectedOrg.MeetingsInt }}</div>
                    <div class="details-line"><span class="details-line-title">Fields of interest:</span> {{ selectedOrg.FoI }}</div>
                    <div class="details-line"><span class="details-line-title">Transparency Register Declaration: </span> <a target="_blank" :href="'http://ec.europa.eu/transparencyregister/public/consultation/displaylobbyist.do?id=' + selectedOrg.Id">Transparency Registry</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Loader -->
      <loader v-if="loader" :text="'This is a user-friendly interactive database that provides a unique overview of the lobby meetings of the European Commission published since November 2014 as well as the outside activities of current Members of the European Parliament.'" />
    </div>

    <script type="text/javascript" src="vendor/js/d3.v5.min.js"></script>
    <script type="text/javascript" src="vendor/js/d3.layout.cloud.js"></script>
    <script type="text/javascript" src="vendor/js/crossfilter.min.js"></script>
    <script type="text/javascript" src="vendor/js/dc.js"></script>
    <script type="text/javascript" src="vendor/js/dc.cloud.js"></script>

    <script src="static/organizations.js"></script>

 
</body>
</html>
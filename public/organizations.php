<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="static/meetings.css">
    <title>Lobbyists</title>
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
    <div id="app" class="organizations-page">   
      <?php include 'header.php' ?>
      <div class="container-fluid dashboard-container-outer">
        <div class="row dashboard-container">
          <!-- ROW FOR INFO AND SHARE -->
          <div class="col-md-12">
            <div class="row">
              <!-- INFO -->
              <div class="col-md-8 chart-col" v-if="showInfo">
                <div class="boxed-container description-container">
                  <h1>Integrity watch - Lobbyists</h1>
                  <p>This is a user-friendly interactive database that provides a unique overview of the lobby organisations registered in the EU Transparency Register – the register of Brussels lobbyists.
                  <a href="#">Read more</a></p> 
                  <p>By simply clicking on the graph or list below users can rank, sort and filter the EU lobby organisations.</p>
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
              <div class="chart-inner" id="expense_chart"></div>
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
              <chart-header :title="charts.accreditations.title" :info="charts.accreditations.info" ></chart-header>
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
              <chart-header :title="charts.lobbyists.title" :info="charts.lobbyists.info" ></chart-header>
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
              <div class="filter-count">0</div>out of <strong class="total-count">0</strong> organizations
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
                    <div class="details-line"><span class="details-line-title">Budget:</span> {{ selectedOrg.costString }}</div>
                    <div class="details-line"><span class="details-line-title">Lobbyists:</span> {{ selectedOrg.People }}</div>
                    <div class="details-line"><span class="details-line-title">FTE:</span> {{ selectedOrg.FTE }}</div>
                    <div class="details-line"><span class="details-line-title">Reported meetings:</span> {{ selectedOrg.Meetings }}</div>
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
      <loader v-if="loader" />
    </div>

    <script type="text/javascript" src="vendor/js/d3.v5.min.js"></script>
    <script type="text/javascript" src="vendor/js/d3.layout.cloud.js"></script>
    <script type="text/javascript" src="vendor/js/crossfilter.min.js"></script>
    <script type="text/javascript" src="vendor/js/dc.js"></script>
    <script type="text/javascript" src="vendor/js/dc.cloud.js"></script>

    <script src="static/organizations.js"></script>

 
</body>
</html>
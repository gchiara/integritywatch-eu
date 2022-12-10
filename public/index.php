<html lang="en">
<head>
    <?php include 'gtag.php' ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Integrity Watch EU</title>
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@TI_EU" />
    <meta name="twitter:creator" content="@eucampaign" />
    <meta property="og:url" content="https://www.integritywatch.eu" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="EU Integrity Watch: monitor potential conflicts of interests" />
    <meta property="og:description" content="EU Integrity Watch is a set of user-friendly online tools that allow citizens, journalists, and civil society to monitor EU lobbying activities as well as financial interests of Members of the European Parliament." />
    <meta property="og:image" content="http://www.integritywatch.eu/images/thumbnail.jpg" />
    <meta property="fb:app_id" content="1611680135716224" />
    <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
    <!-- Icons -->
    <script src="https://kit.fontawesome.com/663f4a7b53.js" crossorigin="anonymous"></script>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700" rel="stylesheet">
    <!-- Css -->
    <link rel="stylesheet" href="fonts/oswald.css">
    <link rel="stylesheet" href="static/landing.css?v=1">
</head>
<body>
  <div id="app"> 
    <div class="landing-top-container" style="background-image:url('./images/landing-bg.jpg')">
      <!-- TOP BAR -->
      <div class="top-nav container-fluid">
          <div class="row">
              <div class="top-nav-left col-6">
                  <img src="./images/ti_eu_logo_white.png" class="nav-logo" />
              </div>
              <div class="top-nav-right col-6">
                <a href="ecmeetings.php">Our tools</a> | 
                <a href="about.php">About & Contacts</a>
              </div>
          </div>
      </div>
      <!-- INFO AREA -->
      <div class="landing-info-area">
          <h1>EU Integrity Watch</h1>
          <div class="description-text">
              <p>Welcome to EU Integrity Watch: a central hub for online tools that allow citizens, journalists, and civil society to monitor the integrity of decisions made by politicians in the European Union. For this purpose, data that is often scattered and difficult to access is collected, harmonised, and made easily available. The platform allows you to search, rank and filter the information in an intuitive way. Thereby EU Integrity Watch contributes to increasing transparency, integrity, and equality of access to EU decision-making and to monitor the EU institutions for potential conflicts of interest, undue influence or even corruption.</p> 
              <p>Should you have any questions or would like to share your thoughts, feel free to <a href="about.php">reach out to us</a>.</p>
          </div>
          <div class="landing-info-btn">
            <a href="./ecmeetings.php" class="landing-btn green-btn">View our tools <i class="fas fa-chevron-right"></i></a>
          </div>
      </div>
      <!-- CTA -->
      <div class="landing-cta-container" style="background-image:url('./images/landing-bg-corner.png')">
          <div class="landing-cta-text">
              <div class="landing-cta-text-inner">
                <div class="landing-cta-text-main">Welcome to Integrity Watch EU!</div>
                <div class="landing-cta-text-secondary">User-friendly interactive databases about the EU Commission, Parliament & more.</div>
              </div>
          </div>
      </div>
  </div>

  <div class="landing-grid-container">
      <div class="platform-boxes-container container-fluid">
          <div class="row">
            <div class="platform-box-col" :class="tool.class" v-for="tool in tools">
              <div class="platform-box" v-if="tool.type == 'box'">
                <img :src="tool.image" class="platform-box-img" />
                <div class="platform-box-text-container">
                  <div class="platform-box-title">{{ tool.title }}</div>
                  <div class="platform-box-subtitle">{{ tool.subtitle }}</div>
                  <div class="platform-box-description">{{ tool.description }}</div>
                  <div class="platform-box-link">
                      <a :href="tool.url" class="landing-btn" target="_blank">{{ tool.btnText }}<i class="fas fa-chevron-right"></i></a>
                      <a v-if="tool.url2" :href="tool.url2" class="landing-btn" target="_blank">{{ tool.btnText2 }}<i class="fas fa-chevron-right"></i></a>
                  </div>
                </div>
              </div>
              <div class="platform-divider" v-else-if="tool.type == 'divider'">
                <div class="platform-divider-title">{{ tool.title }}</div>
                <div class="platform-divider-subtitle">{{ tool.subtitle }}</div>
              </div>
              <div v-else-if="tool.type == 'spacing'"></div>
            </div>
          </div>
      </div>
  </div>

  <footer>
      <div class="footer-inner">
          <div><a href="privacy-policy.pdf">Privacy policy</a> - Should you have any questions or would like to share your thoughts, feel free to reach out to<br />
          Raphaël Kergueno, Policy Officer – EU integrity, Transparency International EU <a href="mailto:rkergueno@transparency.org">rkergueno@transparency.org</a>.</div>
          <div class="footer-credits">Developed by <a href="http://www.chiaragirardelli.net" target="_blank">Chiara Girardelli</a> and Transparency International EU.</div>
      </div>            
  </footer>

  </div>
  <script src="static/landing.js"></script>
</body>
</html>
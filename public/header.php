<nav class="navbar navbar-expand-lg navbar-light bg-light" id="iw-nav">
  <a class="navbar-brand" href="https://transparency.eu/" target="_blank"><img src="./images/ti_eu_logo.png" alt="" /> </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <!--
      <li class="nav-item">
        <a href="./ecmeetings" class="nav-link" :class="{active: page == 'meetings'}">Commission Meetings</a>
      </li>
      -->
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" :class="{active: page == 'meetings'}" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Commission Meetings
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="./ecmeetings.php?commission=juncker" target="_blank">Juncker Commission (2014-2019)</a>
          <a class="dropdown-item" href="./ecmeetings.php?commission=vonderleyen1" target="_blank">Von der Leyen Commission I (2019 – 2024)</a>
          <a class="dropdown-item" href="./ecmeetings.php?commission=vonderleyen2" target="_blank">Von der Leyen Commission II (2024 - 2029)</a>
        </div>
      </li>
      <li class="nav-item">
        <a href="./organizations" class="nav-link" :class="{active: page == 'organizations'}">EU Lobbyists</a>
      </li>
      <li class="nav-item">
        <a href="./mepincomes" class="nav-link" :class="{active: page == 'mepincomes'}">MEP income</a>
      </li>
      <li class="nav-item">
        <a href="./mepmeetings" class="nav-link" :class="{active: page == 'mepmeetings'}">MEP meetings</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          National versions
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="https://www.integritywatch.fr/" target="_blank">France</a>
          <a class="dropdown-item" href="https://www.integritywatch.gr/" target="_blank">Greece</a>
          <a class="dropdown-item" href="http://www.soldiepolitica.it/" target="_blank">Italy</a>
          <a class="dropdown-item" href="https://deputatiuzdelnas.lv/" target="_blank">Latvia</a>
          <a class="dropdown-item" href="https://manoseimas.lt/" target="_blank">Lithuania</a>
          <a class="dropdown-item" href="https://www.integritywatch.nl/" target="_blank">Netherlands</a>
          <a class="dropdown-item" href="http://varuhintegritete.transparency.si/" target="_blank">Slovenia</a>
          <a class="dropdown-item" href="https://integritywatch.es/" target="_blank">Spain</a>
          <a class="dropdown-item" href="https://openaccess.transparency.org.uk/" target="_blank">United Kingdom</a>
          <a class="dropdown-item" href="https://integritywatch.transparency.de/" target="_blank">Germany</a>
        </div>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a href="./about" class="nav-link nav-link-about">About</a>
      </li>
      <!--
      <li class="nav-item">
        <i class="material-icons nav-link icon-btn info-btn" @click="showInfo = !showInfo">info</i>
      </li>
      <li class="nav-item">
        <i class="material-icons nav-link icon-btn share-btn" @click="showShare = !showShare">share</i>
      </li>
      -->
    </ul>
  </div>
</nav>
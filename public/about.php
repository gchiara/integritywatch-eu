<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>About</title>
    <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Quicksand:500" rel="stylesheet">
    <link rel="stylesheet" href="static/about.css">
</head>
<body>
    <?php include 'header.php' ?>

    <div id="app">    
      <div class="container">
        <div class="panel-group" id="accordion">
          <!-- BLOCK 1 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h1 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">1. About</a>
              </h1>
            </div>
            <div id="collapse1" class="panel-collapse collapse in">
              <div class="panel-body">
                <p>EU Integrity Watch is designed to be a central hub for online tools that allow citizens, journalists and civil society to monitor the integrity of decisions made by politicians in the EU. For this purpose, data that is often scattered and difficult to access is collected, harmonised and made easily available. The platform allows citizens to search, rank and filter the information in an intuitive way. Thereby EU Integrity Watch contributes to increasing transparency, integrity and equality of access to EU decision-making and to monitor the EU institutions for potential conflicts of interest, undue influence or even corruption.</p>
                <p>The technology behind the platform (<a href="http://d3js.org/">D3.js</a>) was developed by the New York Times in order to make complex datasets accessible to a wider audience. All datasets are also available for download as this platform strongly supports the principles of open software and open data.</p>
                <p>The website currently contains four different datasets on the following topics:</p>
                <ul>
                  <li>Data on the members of the European Parliament (MEPs), mainly on their outside activities and incomes</li>
                  <li>Data on lobbying in Brussels. For the European Commission, we have combined the records of lobby meetings by senior officials with the information contained in the EU Transparency Register – the register of Brussels lobbyists. For the European Parliament, we have collected the records of lobby meetings with MEPs.</li>
                </ul>
                <p>Information from the declaration of financial interest of MEPs provides a unique overview of their activities and enables a range of rankings and visual comparisons. It also makes it possible to identify those MEPs with a high degree of external activity and to better monitor them for potential conflicts of interests between their legislative work in the Parliament and their outside activities.</p>
                <p>Self-reported data of senior public officials of the European Commission on lobby meetings contains a range of potential important insights on the current dynamics and content of lobby activities. Data from the voluntary Transparency Register provides additional information on who those lobbyists are, how much they spent on lobbying, how many people they have working for them and what files and topics they are active on. Records of lobby meetings published by MEPs are not interconnected with information on lobbyists from the Transparency Register. They nevertheless contain valuable data on the subject matter of lobby meetings and committee work in Parliament.</p> 
                <p>The datasets used on Integrity Watch are exclusively retrieved from the official websites of the European Institutions. We read out this information on a regular basis and publish the date of the latest update prominently on our websites. If you spot inaccurate, incomplete or misleading information, please report those instances and provide us the link to a reliable source. If you are using the data, for research, journalistic or other purposes, please always confirm your findings with the original information on the websites of the EU Institutions.</p>
                <p>EU Integrity Watch was first launched in October 2014 by Transparency International EU (TI EU) under the direction of Daniel Freund, former Head of Advocacy of the Money & Politics team. This project is cofunded by the European Commission and  the <a href="http://www.opensocietyfoundations.org/about/programs/open-society-initiative-europe" target="_blank">Open Society Initiative for Europe (OSIFE)</a>, with a contribution by the <a href="http://www.kbs-frb.be/index.aspx?langtype=1033" target="_blank">King Baudouin Foundation (KBF)</a>.  Neither the European Union institutions and bodies nor any person acting on their behalf may be held responsible for the use which may be made of the information contained therein.</p>
                <div class="about-eu-funding">
                  <img class="logo" src="./images/flag_yellow_low.jpg" />
                  <p style="font-family: Arial">This online platform was funded by the European Union’s Internal Security Fund – Police</p>
                </div>
                <p>For more information on TI EU: <br />
                <a href="http://www.transparencyinternational.eu/"><img class="logo" src="./images/ti_logo_black.png" /></a></p>
                <p>For more information on OSIFE: <br />
                <a href="http://www.opensocietyfoundations.org/about/offices-foundations/open-society-initiative-europe"><img class="logo" src="./images/osf_logo.png" /></a></p>
                <p>For more information on KBF: <br />
                <a href="http://www.kbs-frb.be/index.aspx?langtype=1033"><img class="logo" src="./images/kbf_logo.png" /></a></p>
                <p>Website design and development:<br />
                <a href="http://www.chiaragirardelli.net">Chiara Girardelli</a><br /></p>
                <p>Data on Commission meetings and EU lobbyists are extracted directly from the <a href="https://ec.europa.eu/transparencyregister/public/homePage.do" target="_blank">EU Transparency Register</a>.<br />
                Data on MEPs declarations of financial interests and lobby meetings extracted by Parltrack from the European Parliament website. Information on Parltrack is available <a href="https://parltrack.org/about" target="_blank">here</a>.<br />
                All data is published under the <a href="https://opendatacommons.org/licenses/odbl/1-0/index.html" target="_blank">ODBLv1.0 open data licence</a>.</p> 
            </div>
            </div>
          </div>
          <!-- BLOCK 2 -->     
          <div class="panel panel-default">
            <div class="panel-heading">
              <h2 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">2. Disclaimers</a>
              </h2>
            </div>
            <div id="collapse2" class="panel-collapse collapse">
              <div class="panel-body">
                <p>All information used by EU integrity watch on lobby organisations is gathered from the Transparency Register. All information and data on lobby meetings self-published by High-level Commission officials is retrieved from the EU Open Data portal. All information and data on declarations of financial interests and meetings held with MEPs are gathered from the website of the European Parliament. All data sources are self-reported. We extract this information on a regular basis and publish the date of the latest update prominently on EU Integrity Watch.</p>
                <p>Transparency International and EU Integrity Watch bear no responsibility for the accuracy of the original data as we only reproduce information that is publicly available on the above-mentioned websites.</p>
                <p>Before publication of any findings, please always check the latest data on the websites of the EU Institutions or external websites linked.</p>
                <p>Should you spot any inaccuracies in the data or any functionality that does not work properly please contact <a href="mailto:rkergueno@transparency.org ">rkergueno@transparency.org</a></p>
                <h3>Disclaimer on outside incomes of MEPs</h3>
                <p>The Code of Conduct of the European Parliament establishes that for reasons of transparency, Members of the European Parliament (MEPs) shall submit a declaration of financial interests. Those declarations shall then be published on the Parliament's website.</p> 
                <p>All data of outside incomes of MEPs comes from the website of the European Parliament. EU Integrity Watch automatically extracts the information from the original declarations that are published in Pdf format on the Parliament's website and uses them to regularly update its own database. The date of the latest update is featured on our website. All information contained in the original declaration is under the sole responsibility of the member of the European Parliament that filled out and signed the declaration. As this is the beginning of the legislative mandate, the annual figures are projections based on the provided monthly figures in the current declarations. Furthermore, the information is currently only available in the language in which the member has filled out the declaration. Given that the Parliament only provides the data in Pdf format instead of a reliable open data format our information might not be 100% accurate. On each profile of a member we link to the profile on the Parliament's own website, where the original declaration and all other information can be checked and verified.</p>
                <h3>Disclaimer on lobby meetings with the European Commission</h3>
                <p>Since 1 December 2014, senior European Commission staff, including Commissioners, members of their Cabinets and Directors-General, are required to disclose on their websites details of meetings with lobbyists, including the names of organisations and self-employed participants, time, location and the subject of the meeting (European Commission decision C(2014 9048 final and 9051 final). Under Article 4(1) the information shall be published in a standardised format within a period of two weeks following the meeting.</p>
                <p>This self-reported data is retrieved from a central database of Commission lobby meetings made available on the EU's open data portal. The reporting and publication of the meetings is the sole responsibility of senior staff of the European Commission. Therefore, the validity, completeness and timeliness of publication is ensured by the public officials themselves.</p>
                <p>Additional information on the identification and characterisation of interests groups holding meetings with the European Commission is retrieved from the Transparency Register database, also available on the EU Open Data Portal. The classification of lobby organisations is spelled out in the 2021 <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=uriserv:OJ.L_.2021.207.01.0001.01.ENG">Interinstitutional Agreement</a> on a mandatory Transparency Register.</p>
                <h3>Disclaimer on lobby meetings with Members of the European Parliament</h3>
                <p>The internal rules of the European Parliament oblige Rapporteurs, Shadow Rapporteurs and Committee Chairs to publish their meetings with interests representatives. This obligation is only applicable if the meeting concerns a specific legislative report under the supervision of those MEPs. All other MEPs are encouraged by the rules to publish their lobby meetings on the Parliament website on a voluntary basis, but are not obliged to do so. Voluntary publication is also possible on MEPs’ own bespoke websites. For technical reasons, only meetings published on the European Parliament website are made available on EU Integrity Watch.</p> 
                <p>All data on lobby meetings held with MEPs comes from the website of the European Parliament. EU Integrity Watch automatically extracts, via Parltrack, the information published on the individual profiles of each MEP. The date of the latest update is indicated on our platform. All information contained in the records of lobby meetings is under the sole responsibility of the MEP in question. The information is currently only available in the language in which the MEP decided to publish. Given that the Parliament does not provide the records in a reliable open data format, our information must always be double checked with the source material before publishing. Each lobby meeting record on EU Integrity Watch contains the link to the source page on the Parliament website where the information can be checked and verified.</p>
              </div>
            </div>
          </div>
          <!-- BLOCK 3 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h2 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse3">3. Background information</a>
              </h2>
            </div>
            <div id="collapse3" class="panel-collapse collapse">
              <div class="panel-body">
                <h3 class="mt-0">What's the story behind Integrity Watch?</h3>
                <p>Transparency International EU has identified political corruption as one of the core problems of European democracies and the EU Institutions. In this context, we see the lack of transparency in decision-making, conflicts of interest and undue influence by lobbyists as some of the major challenges for our political systems. For more detailed information please also refer to our main research work:</p>
                <ul>
                  <li>2021 Report: <a href="https://transparency.eu/deep-pockets-open-doors/" target="_blank">Deep pockets, open doors: big tech lobbying in Brussels</a></li>
                  <li>2021 Paper: <a href="https://transparency.eu/new-ethics-body-falls-short/" target="_blank">New ethics body approved European Parliament falls short of expectations, European Commission must set the bar higher</a></li> 
                  <li>2021 Paper: <a href="https://transparency.eu/burning-candle-mep-income/" target="_blank">Burning the candle at both ends: one quarter of MEPs top up their salary with side jobs</a></li> 
                  <li>2021 Paper: <a href="https://transparency.eu/unifying-eu-ethics/" target="_blank">Unifying EU ethics</a></li> 
                  <li>2021 Report: <a href="https://transparency.eu/euis/" target="_blank">European Union Integrity Systems reports</a></li> 
                  <li>2020 Paper: <a href="https://transparency.eu/lobbying-in-lockdown/" target="_blank">Lobbying in lockdown: EU politicians must be transparent about who they meet – even amid the crisis</a></li>  
                  <li>2020 Paper: <a href="https://transparency.eu/tobacco-undue-influence/" target="_blank">Reports of undue influence by tobacco industry strengthen the case for mandatory EU lobbying register</a></li> 
                  <li>2020 Paper: <a href="https://transparency.eu/100-days-lobbying/" target="_blank">100 days of Commission lobbying</a></li> 
                  <li>2019 Paper: <a href="https://transparency.eu/mep-outside-incomes/" target="_blank">EU Integrity Watch reveals the highest outside earners in the European Parliament</a></li> 
                  <li>2019 Paper: <a href="https://transparency.eu/sunny-silicon-vallley/" target="_blank">It’s always sunny in Silicon Valley: how big tech dominates digital lobbying</a></li>
                  <li>2018 Paper: <a href="https://transparency.eu/the-eu-is-vulnerable-to-secret-lobbying/" target="_blank">The EU is vulnerable to secret lobbying</a></li>  
                  <li>2018 Report: <a href="http://transparency.eu/wp-content/uploads/2018/07/TIEU-Moonlighting-in-Brussels-MEP-incomes.pdf" target="_blank">Moonlighting in Brussels – side jobs and ethics concerns at the European parliament</a></li> 
                  <li>2017 Paper: <a href="https://transparency.eu/russialobbying/" target="_blank">From Russia with Lobbying</a></li> 
                  <li>2017 Paper: <a href="https://transparency.eu/uber-lobbyists/" target="_blank">The Uber-Lobbyists: how Silicon Valley is changing Brussels lobbying</a></li> 
                  2017 Report: <a href="https://transparency.eu/wp-content/uploads/2017/01/Access-all-areas.pdf" target="_blank">Access all areas – when EU politicians become lobbyists</a></li>
                  </ul>
                <p>In this context, we aim to rebuild citizens’ trust in the EU Institutions through increased transparency, accountability and citizen engagement using the power of modern analysis and communication technology to empower EU citizens.</p>
                <p>Transparency alone is of course not a solution to all problems, but can only ever be the first step on a long way to reform. Without the basic evidence no problem can be addressed. In this sense transparency is a necessary pre-condition for good governance in political systems, accountable to citizens and free of corruption. EU Integrity Watch seeks to make information which are already in the public domain – but often scattered or in a format difficult to access or search – more accessible to a wider audience. By doing so, we significantly contribute to the adoption of best practices in open governance, including the systematic publication of information in open data.</p>
                <h3>Where does the data come from?</h3>
                <p>All data used for the tools on “MEP incomes”, “Commission meetings”, “EU lobbyists” and "Parliament meetings" come from the websites of the EU institutions. Please find below the list of exact data sources:</p>  
                <ul>
                  <li>
                  MEP incomes:<br />
                  General information on MEPs and their declarations of financial interests are scraped by <a href="https://parltrack.org/" target="_blank">Parltrack</a> from the 705 individual MEP pages of the European Parliament website. The resulting dataset is re-published on Integrity Watch EU. An example declaration is available <a href="https://www.europarl.europa.eu/mepdif/118859_DFI_LEG9_rev0_EN.pdf" target="_blank">here</a>.<br /><br /> 
                  </li>
                  <li>
                  MEP meetings:<br />  
                  The list of self-published lobby meetings of MEPs is directly scraped by Integrity Watch EU from the 705 individual MEP pages of the European Parliament website. An example page is available <a href="https://www.europarl.europa.eu/meps/en/118859/ROBERTA_METSOLA/meetings/past#detailedcardmep" target="_blank">here</a>.<br /><br />    
                  </li>
                  <li>
                  Commission meetings:<br />  
                  The list of self-published meetings of high-level Commission officials are parsed from the <a href="https://data.europa.eu/data/datasets/european-commission-meetings-with-interest-representatives?locale=en" target="_blank">EU Open data portal</a> and republished on Integrity Watch EU. This information is also made available to the public on the individual pages of Commissioners, their Cabinet-Members and Directors-General. An example page is available <a href="http://ec.europa.eu/transparencyinitiative/meetings/meeting.do?host=c8e208ad-7dc2-4a97-acc9-859463c69ec4" target="_blank">here</a>.<br /><br />    
                  </li>
                  <li>
                  EU Lobbyists:<br /> 
                  All information pertaining to EU lobbyists is parsed from the <a href="https://data.europa.eu/data/datasets/transparency-register?locale=en" target="_blank">EU open data portal</a> and re-published on Integrity Watch EU. This information is also made available on the individual entries of lobby organisations on the EU Transparency Register. An example page is available <a href="https://ec.europa.eu/transparencyregister/public/consultation/displaylobbyist.do?id=501222919-71" target="_blank">here</a>.<br />    
                  </li>
                </ul>
                <p>All datasets uploaded to Integrity Watch EU are available for re-use on the <a href="https://data.integritywatch.eu/" target="_blank">Integrity Watch Data hub</a>. For any questions on the data sources and their re-use via Integrity Watch EU, please contact: <a href="mailto:rkergueno@transparency.org" target="_blank">rkergueno@transparency.org</a></p> 
              </div>
            </div>
          </div>
          <!-- CONTACTS -->
          <div class="panel panel-default panel-static">
            <div class="panel-heading">
              <h2 class="panel-title">
                <a href="#">Contact Details</a>
              </h2>
            </div>
            <div id="contact" class="panel-collapse">
              <div class="panel-body">
              <p>If your questions have not been answered or you would like to access the datasets, please get in touch with:</p>
              <p>
                <strong>Raphaël Kergueno</strong><br />
                Senior Policy Officer - Data & Advocacy<br />
                Transparency International EU Office<br />
                +32 487 19 5438<br />
                <a href="mailto:rkergueno@transparency.org">rkergueno@transparency.org</a>
              </p>
            </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <script src="static/about.js"></script>
</body>
</html>
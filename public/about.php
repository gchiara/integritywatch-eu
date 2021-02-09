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
                <p>The datasets used on Integrity Watch are almost exclusively retrieved from the official websites of the European Institutions. We read out this information on a regular basis and publish the date of the latest update prominently on our websites. If you spot inaccurate, incomplete or misleading information, please report those instances and provide us the link to a reliable source. If you are using the data, for research, journalistic or other purposes, please always confirm your findings with the original information on the websites of the EU Institutions.</p>
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
                <p>All information and data used by EU Integrity Watch on lobby organisations and meeting self-publication by high-level Commission officials are gathered from the EU Transparency Register (the register of Brussels lobbyists). All information and data on declarations of financial interests and meetings held with MEPs are gathered from the website of the European Parliament. All data sources are self-reported. We extract this information on a regular basis and publish the date of the latest update prominently on EU Integrity Watch.</p>
                <p>Transparency International and EU Integrity Watch bear no responsibility for the accuracy of the original data as we only reproduce information that is publicly available on the above-mentioned websites.</p>
                <p>Before publication of any findings, please always check the latest data on the websites of the EU Institutions or external websites linked.</p>
                <p>Should you spot any inaccuracies in the data or any functionality that does not work properly please contact <a href="mailto:rkergueno@transparency.org ">rkergueno@transparency.org</a></p>
                <h3>Disclaimer on outside incomes of MEPs</h3>
                <p>The Code of Conduct of the European Parliament establishes that for reasons of transparency, Members of the European Parliament (MEPs) shall submit a declaration of financial interests. Those declarations shall then be published on the Parliament's website.</p> 
                <p>All data of outside incomes of MEPs comes from the website of the European Parliament. EU Integrity Watch automatically extracts the information from the original declarations that are published in Pdf format on the Parliament's website and uses them to regularly update its own database. The date of the latest update is featured on our website. All information contained in the original declaration is under the sole responsibility of the member of the European Parliament that filled out and signed the declaration. As this is the beginning of the legislative mandate, the annual figures are projections based on the provided monthly figures in the current declarations. Furthermore, the information is currently only available in the language in which the member has filled out the declaration. Given that the Parliament only provides the data in Pdf format instead of a reliable open data format our information might not be 100% accurate. On each profile of a member we link to the profile on the Parliament's own website, where the original declaration and all other information can be checked and verified.</p>
                <h3>Disclaimer on lobby meetings with the European Commission</h3>
                <p>Since 1 December 2014, senior European Commission staff, including Commissioners, members of their Cabinets and Directors-General, are required to disclose on their websites details of meetings with lobbyists, including the names of organisations and self-employed participants, time, location and the subject of the meeting (European Commission decision C(2014 9048 final and 9051 final). Under Article 4(1) the information shall be published in a standardised format within a period of two weeks following the meeting.</p>
                <p>These self-reported data is automatically retrieved from the individual webpages of each lobby organisations’ entry on the Transparency Register. The reporting and publication of the meetings is the sole responsibility of senior staff of the European Commission. Therefore, the validity, completeness and timeliness of publication is ensured by the public officials themselves.</p>
                <p>Additional information on the identification and characterisation of the interest groups are also retrieved from the Transparency Register database. The definition of classification has been spelled out in the Annex IX to the Rules of Procedure of the European Parliament and can be found <a href="http://www.europarl.europa.eu/sides/getLastRules.do?reference=ANN-09&language=EN">here</a>.</p>
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
                  <li>2018 Report: <a href="http://transparency.eu/wp-content/uploads/2018/07/TIEU-Moonlighting-in-Brussels-MEP-incomes.pdf">Moonlighting in Brussels – side jobs and ethics concerns at the European parliament</a></li>
                  <li>2017 Report: <a href="https://transparency.eu/wp-content/uploads/2017/01/Access-all-areas.pdf">Access all areas – when EU politicians become lobbyists</a></li>
                  <li>2015 Report: <a href="https://issuu.com/transparencyinternational/docs/2015_lobbyingineurope_en?e=2496456/12316229">Lobbying in Europe – Hidden Influence, Privileged Access</a></li>
                  <li>2015 Paper: <a href="http://transparency.eu/wp-content/uploads/2016/09/Transparency-05-small-text-web-1.pdf">EU Legislative Footprint – What is the real influence of lobbying?</a></li>
                  <li>2014 Report: <a href="http://transparency.eu/wp-content/uploads/2016/10/EU_Integrity_System_Report.pdf">European Union Integrity System Study</a></li>
                  <li>2012 Report: <a href="http://transparency.eu/wp-content/uploads/2016/10/2012-Corruption-Risks-In-Europe.pdf">Money, Politics, Power: Corruption Risks in Europe</a></li>
                </ul>
                <p>In this context, we aim to rebuild citizens’ trust in the EU Institutions through increased transparency, accountability and citizen engagement using the power of modern analysis and communication technology to empower EU citizens.</p>
                <p>Transparency alone is of course not a solution to all problems, but can only ever be the first step on a long way to reform. Without the basic evidence no problem can be addressed. In this sense transparency is a necessary pre-condition for good governance in political systems, accountable to citizens and free of corruption. EU Integrity Watch seeks to make information which are already in the public domain – but often scattered or in a format difficult to access (Pdf) or search – more accessible to a wider audience.</p>
                <h3>Where does the data come from?</h3>
                <p>All data used for the tools on “MEP incomes”, “Commission meetings”, “EU lobbyists” and "Parliament meetings" come from the websites of the EU institutions. EU Integrity Watch directly extracts data from the EU Transparency Register and reuses data published by Parltrack, which itself extracts the information from the European Parliament website.</p>
                <p>For the tool on “MEP incomes”:</p>
                <ul>
                  <li>General information contained on the sites of the 705 MEPs, such as this <a href="https://www.europarl.europa.eu/meps/en/96864/DAVID+MARIA_SASSOLI/home">page</a> for President David Sassoli on nationality, party and group memberships, committee memberships…</li>
                  <li>The declarations of financial interests that all MEPs have to fill out. These declarations are also available on the same page. The example for President Sassoli can be found <a href="http://www.europarl.europa.eu/mepdif/96864_DFI_LEG9_rev0_IT.pdf">here</a>.</li>
                </ul>
                <p>For the tools on “Commission meetings” and “EU Lobbyists”:</p>
                <ul>
                  <li>The lists of meetings with lobbyists published on the websites of European Commissioners and Directors-General. An example for European Commission President Von der Leyen can be found <a href="http://ec.europa.eu/transparencyinitiative/meetings/meeting.do?host=c8e208ad-7dc2-4a97-acc9-859463c69ec4">here</a>. The complete information is scattered over 98 different webpages as each Commissioner, each Cabinet and each Director-General have their own page. However, the individual entries of each lobby organisation on the Transparency Register contains the most up to date lists of meetings published by Commission officials. To access the full dataset of Commission meetings in open data format, please contact <a href="mailto:rkergueno@transparency.org">rkergueno@transparency.org</a>.</li>
                  <li>The information on lobby organisations comes from the EU Transparency Register. The full dataset of the register can be downloaded <a href="https://open-data.europa.eu/en/data/dataset/transparency-register">here</a>.</li>
                </ul>
                <p>For the tool on "Parliament meetings" we used the following datasets:</p> 
                <ul>
                  <li>General information contained on the individual profiles pages of the 705 MEPs, , on nationality, party and group memberships, committee memberships, etc..</li>
                  <li>Records of lobby meetings held published on the individual profile pages of the 705 MEPs, To access the full dataset of Parliament meetings in open data format, please contact <a href="mailto:rkergueno@transparency.org">rkergueno@transparency.org</a>.</li>
                </ul>
              </div>
            </div>
          </div>
          <!-- BLOCK 4 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h2 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse4">4. Additional information on the Commission meetings, Parliament meetings and EU lobbyists tools</a>
              </h2>
            </div>
            <div id="collapse4" class="panel-collapse collapse">
              <div class="panel-body">
                <h3 class="mt-0">What are the rules governing the publication of meetings with lobbyists by the European Commission?</h3>
                <p>The European Commission under President Jean-Claude Juncker has made strong commitments to increased transparency. Since 1 December 2014 Commissioners, their Cabinets and Director-Generals publish their meetings and only meet with lobbyists registered in the EU Transparency Register. Publication is made on the Commission website as explained above. Commission Vice-President Frans Timmermans has been tasked to put forward a proposal for a mandatory register by the end of 2015. As of 2019, the Commission, the Europe parliament and Council are negotiating the adoption of a mandatory transparency register for all three institutions.</p>
                <p>The Commission also pledged to “ensure an appropriate balance and representativeness in the stakeholders they meet”. Indeed, a communication from the President to the Commission on the Working Methods of the European Commission 2014 – 2019 reads: "While contact with stakeholders is a natural and important part of the work of a Member of the Commission, all such contacts should be conducted with transparency and Members of the Commission should seek to ensure an appropriate balance and representativeness in the stakeholders they meet." The full text of the communication can be found <a href="http://ec.europa.eu/transparency/regdoc/rep/3/2014/EN/3-2014-9004-EN-F1-1.Pdf" target="_blank">here</a>.</p>
                <h3>What are the rules governing meetings with lobbyists by the European Parliament?</h3>
                <p>The European Parliament <a href="https://transparency.eu/press-release-european-parliament-to-end-secret-lobby-meetings/" target="_blank">introduced new rules</a> at the beginning of this mandate, which establish an obligation to publish lobby meetings on the website of the European Parliament for Rapporteurs, Shadow Rapporteurs and Committee Chairs. The mandatory provision applies only to lobby meetings held to influence the contents of legislative reports under the supervision of these MEPs. If the meeting on a specific report was held during Committee work, it must be published no later than when the vote in Committee took place. If the meeting on a specific report was held ahead of a plenary session, it must be published no later than the day the vote in plenary took place.</p>
                <p>For MEPs who are not supervising a legislative report, the rules of procedure stipulate that they should voluntarily publish meetings with interest’s representatives. This is not an obligation, merely an incentive, and these MEPs can use their own bespoke websites for this purpose.</p> 
                <p>In practice, this difference between mandatory and voluntary publication coupled with convoluted publication timelines makes it difficult, if not impossible, to monitor compliance with the rules. Furthermore, a “meeting” is understood as any scheduled meeting with interest representatives to discuss EU policy. However, there is no obligation for those interest representatives to be registered, meaning that they do not have to disclose crucial information pertaining to their lobbying activities such as interests pursued, lobby expenditure and lobbyists employed.</p> 
                <h3>What is the EU Transparency Register?</h3>
                <p>Created in 2011 as a joint register for lobbyists by the European Commission and Parliament, the EU Transparency Register provides key information on lobby organisations seeking to influence EU decisions. Lobbyists must disclose interests pursued, lobby expenditure, EU funding received and the number of active lobbyists.</p>
                <p>Although it is a joint register, each institution defines its own engagement:</p> 
                <ul>
                  <li>For the European Commission, the register is mandatory meaning that lobbyists must be present on the register before any meeting is held. Furthermore, the Commission publishes said meetings on the individual page of the 12,000 registered organisations.</li> 
                  <li>For the European Parliament, registration is voluntary though encouraged as registration allows organisations to request access badges to Parliament premises for their lobbyists. In practice, nothing prevents MEPs from meeting unregistered lobbyists. The lack of integration of the Parliament's publication systems with the transparency register makes it impossible to perform detailed analysis of lobbyists "footprint" within the Parliament.</li> 
                </ul>
                <p>Transparency International has been campaigning for a mandatory register common to all three EU institutions with mandatory publication of meetings for all policy-makers and meaningful sanctions for lobbyists who break the rules.</p> 
                <h3>What does Transparency International EU recommend to improve lobbying transparency?</h3>
                <p>The European Commission under Jean-Claude Juncker took important steps in the right direction when it comes to the regulation of lobbying activities in Brussels. Allowing only registered lobbyists to meet Commission officials and publishing those meetings with the highest level of decision-makers has greatly improved transparency and has made our regular analysis of Commission lobbying possible. With the European Parliament having adopted its own lobby transparency rules, the time has come to end unregulated lobbying in Brussels. We recommend that the EU institutions:</p>
                <ol>
                  <li><strong>Make the EU Transparency Register mandatory</strong>
                    <span>Only if registration is mandatory for lobbyists can we be sure to capture all those seeking to directly or indirectly influence EU decision-making. A mandatory register would also allow sanctioning of organisations that do not comply with the rules. The Transparency Register Secretariat needs to be provided with the necessary resources to better check the declarations for possible errors, particularly on those organisations that have frequent meetings at the highest level. Smart online tools like Integrity Watch can help in that regard. The European Parliament and the European Council should follow the Commission’s lead in only meeting with registered lobbyists and publishing their meetings. Such an order to all officials would not create additional costs and could be put in place immediately. All it would take is a decision by the political leadership to say that unregistered lobbyists are no longer welcome and make EU decision-making more transparent and accountable.<br /> 
                    In June 2020, the three main EU institutions agreed to resume negotiations on improving the Transparency Register. Transparency International EU will follow these negotiations closely to ensure that registration and publication become mandatory.</span> 
                  </li>
                  <li><strong>Introduce a legislative footprint for EU decision-making and legislation</strong><br /><span>A legislative footprint is a comprehensive public record of lobbyists’ influence on a piece of legislation or public decision. This can be established through the registration of meetings. The Commission has taken the lead in this regard by pro-actively publishing all meetings with senior officials. The measures need to be extended to all officials involved in the decision-making process. This means extending current provisions to the European Parliament and the Council. Standardisation of subject matters and the mentioning of concrete legislative files as well as the use of open data would greatly increase the usability of the data by a wider audience.</span></li>
                </ol>
              </div>
            </div>
          </div>
          <!-- BLOCK 5 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h2 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse5">5. Additional information on the MEP income tool</a>
              </h2>
            </div>
            <div id="collapse5" class="panel-collapse collapse">
              <div class="panel-body">
                <h3 class="mt-0">What are the rules governing the publication of the declarations of financial interests of MEPs?</h3>
                <p>As a reaction to the cash-for-amendments scandal that hit the European Parliament in 2011 (in which four members accepted payments from undercover journalists posing as lobbyists in exchange for the introduction of legislative amendments) a new <a href="http://www.europarl.europa.eu/pdf/meps/201206_code_of_conduct_en.pdf">code of conduct</a> was introduced in 2012.</p>
                <p>The Code obliges Members of the European Parliament (MEPs) to submit information on their financial interests, to declare their attendance at third party events and to reveal any gifts that they have received.</p>
                <p>On paper the 2012 Code of Conduct meant significant progress and the reporting obligations were quite extensive at the time. Unfortunately the implementation proved less ambitious. Despite recommendations by the Advisory Committee to the President of the European Parliament finding that 24 MEPs had breached the Code of Conduct, there has been only one reprimand and no breaches.</p>
                <p>National Parliaments across Europe – Germany, France and the United Kingdom in particular – have significantly tightened their rules and reporting obligations during the last two years. Often these steps came in direct responses to scandals. In comparison, the European Parliament is now falling behind standards at national level, and this in a moment when euro-scepticism and public perception of the EU institutions as corrupt are at an all-time high.</p>
                <h3>Transparency International’s recommendations to improve the Code of Conduct:</h3>
                <p>One conclusion that can already be drawn from the EU Integrity Watch database is that the declarations of financial interest and thus the Code of Conduct of the European Parliament need reform. Meaningful monitoring of conflicts of interest is impossible when MEPs declare that their side-job is “consultant”, “freelancer”, “manager” or something that goes under an abbreviation such as “RvC FMO” or “ASDCAM”. The financial thresholds in the declarations need to be revised and should allow much more accurate reporting instead of capping the information at “more than 10,000 EUR”. Better guidelines on how to fill out the declarations are needed and the European Parliament should better monitor the submitted declarations. An independent ethics committee should monitor compliance and publish recommendations in case of an alleged breach.</p>
                <h3>Core recommendations:</h3>
                <ul>
                  <li>Publish more detailed information in the declarations to allow a meaningful monitoring of potential conflicts of interest</li>
                  <li>Revise the financial thresholds in the declaration to allow more accurate reporting and monitoring of outside revenue</li>
                  <li>Translate all declarations into all official languages</li>
                  <li>The European Parliament administration should better check the declarations for plausibility and possible errors – false declarations should lead to sanctions</li>
                  <li>The Code of Conduct needs to be fully respected in word and in spirit and violations need to be sanctioned by the EP President</li>
                  <li>Standardise as much of the information as possible to allow better comparisons and groupings and to connect the information with other databases, such as the Transparency Register</li>
                  <li>Publish all declarations of interest in a centralised, searchable manner, including historical declarations (xml/json files instead of Pdf)</li>
                </ul>
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
                Policy Officer EU Integrity<br />
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
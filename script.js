document.addEventListener("DOMContentLoaded", () => {
  const repo = "IQSS/dataverse";
  const prAuthors =
    "donsizemore,GPortas,landreev,pdurbin,poikilotherm,qqmyers,sekmiller";
  const issueAuthors =
    "app/sync-by-unito,djbrooke,dlmurphy,donsizemore,eaquigley,esotiri,ferrys,GPortas,jggautier,kcondon,landreev,mercecrosas,mheppler,mreekie,oscardssmith,pameyer,pdurbin,poikilotherm,posixeleni,qqmyers,raprasad,rtreacy,sbarbosadataverse,scolapasta,sekmiller,suenjedt,TaniaSchlatter";
  const issueRoles =
    "User Role: API User,User Role: Curator,User Role: Depositor,User Role: Guest,User Role: Hackathon Participant,User Role: Superuser,User Role: Sysadmin";
  const issueFeatures =
    "Feature: API,Feature: API Guide,Feature: Accessibility,Feature: Account & User Info,Feature: Admin Guide,Feature: Analytics,Feature: Branding,Feature: Code Infrastructure,Feature: Container Guide,Feature: Controlled Vocabulary,Feature: DOI & Handle,Feature: DataTags,Feature: Dataverse General Info,Feature: Deaccession,Feature: Developer Guide,Feature: Email Dataset Contact,Feature: External Tool,Feature: File Upload & Handling,Feature: Geospatial,Feature: Guestbook,Feature: Harvesting,Feature: In Review Workflow,Feature: Indexing,Feature: Installation Guide,Feature: Installer,Feature: Internationalization,Feature: Messaging,Feature: Metadata,Feature: Metrics + Reports,Feature: Migration,Feature: My Data,Feature: Notifications,Feature: Performance & Stability,Feature: Permissions,Feature: Preservation,Feature: Provenance,Feature: Publishing & Versions,Feature: Request Access Workflow,Feature: Search/Browse,Feature: Signposting,Feature: Style Guide,Feature: Superuser Dashboard,Feature: Templates,Feature: Terms & Licensing,Feature: TwoRavens,Feature: User Guide,Feature: Widgets,Feature: WorldMap & GeoConnect";
  addLink(repo, "pr", prAuthors);
  addLink(repo, "issue", issueAuthors);
  addLink2(repo, "roles", issueRoles);
  addLink2(repo, "features", issueFeatures);
  document.querySelector("#form-pr").onsubmit = () => {
    const authors = document.querySelector("#skip-pr").value;
    addLink(repo, "pr", authors);
    return false;
  };
  document.querySelector("#form-issue").onsubmit = () => {
    const authors = document.querySelector("#skip-issue").value;
    addLink(repo, "issue", authors);
    return false;
  };
  document.querySelector("#form-roles").onsubmit = () => {
    const roles = document.querySelector("#skip-roles").value;
    addLink2(repo, "roles", roles);
    return false;
  };
  document.querySelector("#form-features").onsubmit = () => {
    const features = document.querySelector("#skip-features").value;
    addLink2(repo, "features", features);
    return false;
  };
});

function addLink(repo, type, authors) {
  console.log(type);
  document.querySelector("#repo-" + type).value = repo;
  document.querySelector("#skip-" + type).value = authors;
  const baseUrl = "https://github.com/search?s=created&o=desc&state=open&q=";
  var url = baseUrl + "repo:" + repo + " is:" + type;
  const authorsToSkip = authors.split(",");

  for (i of authorsToSkip) {
    url += " -author:" + i;
  }

  const p = document.createElement("p");
  p.innerHTML = "Skipping " + authorsToSkip.join(", ");
  document.querySelector("#results-" + type).append(p);

  var link = document.createElement("a");
  var linkText = document.createTextNode(url);
  link.setAttribute("href", url);
  link.setAttribute("target", "_blank");
  link.appendChild(linkText);
  document.querySelector("#results-" + type).append(link);
}

function addLink2(repo, type, authors) {
  //console.log("addLink2");
  //console.log(type);
  document.querySelector("#repo-" + type).value = repo;
  document.querySelector("#skip-" + type).value = authors;
  const baseUrl = "https://github.com/search?s=created&o=desc&state=open&q=";
  //type = "issue"; // FIXME: had to add this
  //var url = baseUrl + "repo:" + repo + " is:" + type;
  var url = baseUrl + "repo:" + repo + " is:" + "issue";
  const authorsToSkip = authors.split(",");

  for (i of authorsToSkip) {
    //url += ' -label:"' + i + '"';
    url += ' -label:"' + encodeURIComponent(i) + '"';
  }

  const p = document.createElement("p");
  p.innerHTML = "Skipping " + authorsToSkip.join(", ");
  document.querySelector("#results-" + type).append(p);

  var link = document.createElement("a");
  var linkText = document.createTextNode(url);
  link.setAttribute("href", url);
  link.setAttribute("target", "_blank");
  link.appendChild(linkText);
  document.querySelector("#results-" + type).append(link);
}

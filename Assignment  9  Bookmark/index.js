var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var bookmarkName = document.getElementById("bookmarkName");
var bookmarkURL = document.getElementById("bookmarkURL");
var webSiteName = "webSName";
var webSites;

function setItem() {
  localStorage.setItem(webSiteName, JSON.stringify(webSites));
}

if (localStorage.getItem(webSiteName) == null) {
  webSites = [];
} else {
  webSites = JSON.parse(localStorage.getItem(webSiteName));
  display(webSites);
}

function addSite() {
  if (validBookmakName() == true && validBookmakUrl() == true) {
    var sites = {
      name: siteName.value,
      url: siteURL.value,
    };

    webSites.push(sites);
    display(webSites);
    clearForm();
    setItem();
  } else if (validBookmakUrl() == false) {
    validBookmakUrl();
  }
}

function deleteName(i) {
  webSites.splice(i, 1);
  setItem();
  display(webSites);
}

function display(webSites) {
  var blackBox = ``;
  for (var i = 0; i < webSites.length; i++) {
    blackBox += ` <tr>
        <tr>
        <td>${i + 1}</td>
        <td>${webSites[i].name}</td>
        <td>
        <button class="btn btn-success px-4">
        <i class="fa-solid fa-eye pe-2"></i> <a href="${
          webSites[i].url
        }">Visit</a> 
                </button>
                </td>
                <td>
                <button onClick="deleteName(${i})" class="btn btn-danger px-4">
                <i class="fa-solid fa-trash-can"></i> </i>Delete
                </button>
            </td>
          </tr>`;
  }

  document.getElementById("tBody").innerHTML = blackBox;
}

function clearForm() {
  siteName.value = "";
  siteURL.value = "";
}

function validBookmakName() {
  var regex = /^[A-Za-z][a-z]{3,8}$/;
  if (regex.test(siteName.value) == true) {
    siteName.style.border = "none";
    bookmarkName.classList.replace("d-flex", "d-none");
    return true;
  } else {
    alertMessageName();
    return false;
  }
}

function validBookmakUrl() {
  var regex =
    /^(http|ftp|https)?(\:\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^!=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])+$/i;
  if (regex.test(siteURL.value) == true) {
    siteURL.style.border = "none";
    bookmarkURL.classList.replace("d-flex", "d-none");
    return true;
  } else {
    alertMessageUrl();
    return false;
  }
}

function alertMessageName() {
  siteName.style.border = " .2rem solid rgba(202, 14, 14, 0.596)";
  bookmarkName.innerHTML = `Site name must contain at least 3 characters`;
  bookmarkName.classList.replace("d-none", "d-flex");
}
function alertMessageUrl() {
  siteURL.style.border = " .2rem solid rgba(202, 14, 14, 0.596)";
  bookmarkURL.innerHTML = `Site URL must be a valid one`;
  bookmarkURL.classList.replace("d-none", "d-flex");
}

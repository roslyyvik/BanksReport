function openRatio(evt, cityName) { var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("contentratio"); for (i = 0; i < tabcontent.length; i++) { tabcontent[i].style.display = "none"; }
    tablinks = document.getElementsByClassName("linkratio"); for (i = 0; i < tablinks.length; i++) { tablinks[i].className = tablinks[i].className.replace(" active", ""); }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active"; }

function openIndicator(evt, cityName) { var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent"); for (i = 0; i < tabcontent.length; i++) { tabcontent[i].style.display = "none"; }
    tablinks = document.getElementsByClassName("tablinks"); for (i = 0; i < tablinks.length; i++) { tablinks[i].className = tablinks[i].className.replace(" active", ""); }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active"; }

function openLiabilities(evt, cityName) { var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontentliabilit"); for (i = 0; i < tabcontent.length; i++) { tabcontent[i].style.display = "none"; }
    tablinks = document.getElementsByClassName("tabliabilit"); for (i = 0; i < tablinks.length; i++) { tablinks[i].className = tablinks[i].className.replace(" active", ""); }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active"; }

function openCapital(evt, cityName) { var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontentcapital"); for (i = 0; i < tabcontent.length; i++) { tabcontent[i].style.display = "none"; }
    tablinks = document.getElementsByClassName("tabcapital"); for (i = 0; i < tablinks.length; i++) { tablinks[i].className = tablinks[i].className.replace(" active", ""); }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active"; }

function openProfit(evt, cityName) { var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontentprofit"); for (i = 0; i < tabcontent.length; i++) { tabcontent[i].style.display = "none"; }
    tablinks = document.getElementsByClassName("tabprofit"); for (i = 0; i < tablinks.length; i++) { tablinks[i].className = tablinks[i].className.replace(" active", ""); }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active"; }
document.getElementById("defaultOpen").click();
var acc = document.getElementsByClassName("accordion");
var i;
for (i = 0; i < acc.length; i++) { acc[i].addEventListener("click", function() { this.classList.toggle("active"); var panel = this.nextElementSibling; if (panel.style.maxHeight) { panel.style.maxHeight = null; } else { panel.style.maxHeight = panel.scrollHeight + "px"; } }); }
$(document).ready(function() { $("li>a").on('click', function(event) { if (this.hash !== "") { event.preventDefault(); var hash = this.hash;
            $('html, body').animate({ scrollTop: $(hash).offset().top }, 800, function() { window.location.hash = hash; }); } }); });

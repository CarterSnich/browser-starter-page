const searchEngines = {
  google: "https://google.com/search?q=",
  duckduckgo: "https://duckduckgo.com/?q=",
  youtube: "https://www.youtube.com/results?search_query=",
  wikipedia: "https://en.wikipedia.org/wiki/Special:Search?go=Go&search=",
  reddit: "https://www.reddit.com/search/?q=",
  aur: "https://aur.archlinux.org/packages?K=",
  "debian pkg search": "https://packages.debian.org/search?keywords=",
  "binge-browser": "https://binge-browser.vercel.app/?search_query=",
  rule34: "https://rule34.xxx/index.php?page=post&s=list&tags=",
};

const timeEl = document.getElementById("time");
const amEl = document.getElementById("am");
const pmEl = document.getElementById("pm");
const dateEl = document.getElementById("date");
const searchEngineEl = document.getElementById("search-engine");
const searchBarForm = document.getElementById("search-bar");

for (let se in searchEngines) {
  const option = document.createElement("option");
  option.text = se;
  option.value = searchEngines[se];
  searchEngineEl.appendChild(option);
}

setInterval(
  (function setDatetime() {
    const dt = new Date();
    const time = new Intl.DateTimeFormat("en", {
      hour: "2-digit",
      hour12: true,
      minute: "2-digit",
    })
      .format(dt)
      .split(" ");
    const date = new Intl.DateTimeFormat("en", {
      weekday: "short",
      month: "short",
      day: "2-digit",
    }).format(dt);

    if (time[1].toLocaleLowerCase() === "am") {
      amEl.classList.add("active");
      pmEl.classList.remove("active");
    } else {
      amEl.classList.remove("active");
      pmEl.classList.add("active");
    }

    timeEl.innerText =
      dt.getSeconds() % 2 ? time[0] : time[0].replace(":", " ");
    dateEl.innerText = date;

    return setDatetime;
  })(),
  1000
);

searchBarForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const url = this["search-engine"].value;
  const query = this["search-query"].value;

  window.location.href = url + query;
});

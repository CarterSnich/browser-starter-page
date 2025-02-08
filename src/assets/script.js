const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("sw.js", {
        scope: "./",
      });

      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

const osaka = document.querySelector("#osaka > img");
const saataa_andagii = document.getElementById("saataa-andagii");

const timeEl = document.getElementById("time");
const amEl = document.getElementById("am");
const pmEl = document.getElementById("pm");
const dateEl = document.getElementById("date");

const links = document.getElementById("links");

const openDialogButton = document.getElementById("open-dialog-button");
const closeDialogButton = document.getElementById("close-dialog-button");
const speedDialManagerDialog = document.getElementById("speed-dial-manager");
const speedDialTextArea = document.getElementById("speed-dial-links");
const saveSpeedDials = document.getElementById("save-speed-dials");

function getSpeedDials() {
  const stored = localStorage.getItem("speedDials");
  const speedDials = JSON.parse(stored);

  if (speedDials === null) {
    return [
      "https://google.com",
      "https://youtube.com",
      "https://web.facebook.com",
    ];
  }

  return speedDials;
}

function renderSpeedDials(speedDials) {
  links.innerHTML = "";
  speedDials.forEach((link) => {
    const url = new URL(link);

    const a = document.createElement("a");
    const img = document.createElement("img");

    a.href = url.toString();
    img.src = `https://icon.horse/icon/${url.hostname}`;

    a.appendChild(img);
    links.appendChild(a);
  });
}

function setSpeedDials(s) {
  renderSpeedDials(s);
  localStorage.setItem("speedDials", JSON.stringify(s));
}

osaka.addEventListener("click", function () {
  saataa_andagii.play();
});

openDialogButton.addEventListener("click", function () {
  speedDialManagerDialog.showModal();
});
closeDialogButton.addEventListener("click", function () {
  speedDialManagerDialog.close();
});
saveSpeedDials.addEventListener("click", function () {
  const textAreaValue = speedDialTextArea.value.trim();
  setSpeedDials(textAreaValue.split("\n"));
  speedDialManagerDialog.close();
});

(function () {
  const speedDials = getSpeedDials();
  renderSpeedDials(speedDials);
  speedDialTextArea.textContent = speedDials.join("\n");
})();

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

registerServiceWorker();

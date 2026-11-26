
// JAM DAN TANGGAL
function updateClock() {
  const now = new Date();

  document.getElementById("clock").textContent =
    now.toLocaleTimeString("id-ID");

  document.getElementById("date").textContent =
    now.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
}

setInterval(updateClock, 1000);
updateClock();

// DAFTAR KEGIATAN
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTasks();
}

function addTask() {
  const input = document.getElementById("taskInput");
  const value = input.value.trim();

  if (!value) {
    alert("Masukkan kegiatan terlebih dahulu!");
    return;
  }

  tasks.push({
    name: value,
    done: false
  });

  input.value = "";
  saveTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
}

function showTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = task.done;
    check.style.width = "18px";
    check.addEventListener("change", () => toggleTask(index));

    const span = document.createElement("span");
    span.textContent = task.name;

    const del = document.createElement("button");
    del.textContent = "Hapus";
    del.addEventListener("click", () => deleteTask(index));

    li.append(check, span, del);
    list.appendChild(li);
  });

  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;
  const percent = total
    ? Math.round(completed / total * 100)
    : 0;

  document.getElementById("percent").textContent =
    percent + "% selesai";

  document.getElementById("progress").style.width =
    percent + "%";

  document.getElementById("stats").textContent =
    `${completed} dari ${total} kegiatan selesai`;
}

showTasks();

// JADWAL HARIAN
let schedules =
  JSON.parse(localStorage.getItem("schedules")) || [];

function saveSchedules() {
  localStorage.setItem("schedules", JSON.stringify(schedules));
  showSchedules();
}

function addSchedule() {
  const time = document.getElementById("scheduleTime").value;
  const name = document.getElementById("scheduleName").value.trim();

  if (!time || !name) {
    alert("Lengkapi waktu dan kegiatan!");
    return;
  }

  schedules.push({ time, name });
  schedules.sort((a,b) => a.time.localeCompare(b.time));

  document.getElementById("scheduleTime").value = "";
  document.getElementById("scheduleName").value = "";

  saveSchedules();
}

function showSchedules() {
  const list = document.getElementById("scheduleList");
  list.innerHTML = "";

  schedules.forEach((item,index) => {
    const li = document.createElement("li");
    const span = document.createElement("span");

    span.textContent = item.time + " - " + item.name;

    const del = document.createElement("button");
    del.textContent = "Hapus";

    del.addEventListener("click", () => {
      schedules.splice(index,1);
      saveSchedules();
    });

    li.append(span,del);
    list.appendChild(li);
  });
}

showSchedules();

// POMODORO TIMER
let seconds = 25 * 60;
let interval = null;

function displayTimer() {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  document.getElementById("timer").textContent =
    String(min).padStart(2,"0") + ":" +
    String(sec).padStart(2,"0");
}

function startTimer() {
  if (interval) return;

  interval = setInterval(() => {
    if (seconds > 0) {
      seconds--;
      displayTimer();
    } else {
      pauseTimer();
      alert("Waktu fokus selesai! Saatnya istirahat 🌷");
    }
  },1000);
}

function pauseTimer() {
  clearInterval(interval);
  interval = null;
}

function resetTimer() {
  pauseTimer();
  seconds = 25 * 60;
  displayTimer();
}

displayTimer();

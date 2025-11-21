// ========================
// AUTO SAVE (langsung simpan tiap kali dicentang)
// ========================
function autoSave() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const data = [];

  checkboxes.forEach((cb, index) => {
    data.push({ id: index, checked: cb.checked });
  });

  localStorage.setItem('jadwalCheckbox', JSON.stringify(data));
}

// ========================
// LOAD DATA |
 // ========================
function loadCheckboxes() {
  const saved = localStorage.getItem('jadwalCheckbox');
  if (!saved) return;

  const data = JSON.parse(saved);
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  data.forEach((item, index) => {
    if (checkboxes[index]) {
      checkboxes[index].checked = item.checked;
    }
  });
}

// ========================
// RESET DATA
// ========================
function resetCheckboxes() {
  localStorage.removeItem('jadwalCheckbox');

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(cb => cb.checked = false);
  
  alert("✔ Semua checkbox telah direset!");
}

// ========================
// EVENT LISTENER
// ========================
document.addEventListener("DOMContentLoaded", () => {
  loadCheckboxes();

  // AUTO-SAVE setiap checkbox berubah
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener("change", autoSave);
  });

  // Reset (berfungsi)
  document.getElementById("resetBtn").addEventListener("click", resetCheckboxes);

  // Tombol Save tidak difungsikan — tidak diberi event listener
  // document.getElementById("saveBtn") <-- sengaja dibiarkan kosong
});

// ===============================
// PINDAHKAN JADWAL SESUAI HARI
// ===============================
function geserJadwalHariIni() {
  const hariIndonesia = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu"
  ];

  const today = new Date().getDay();  // 0 = Minggu, 1 = Senin, dst
  const hariIni = hariIndonesia[today];

  const sections = document.querySelectorAll("section.jadwal");
  const main = document.querySelector("main");

  sections.forEach(sec => {
    const h2 = sec.querySelector("h2");
    if (h2 && h2.textContent.trim() === hariIni) {
      main.insertBefore(sec, main.children[1]); 
      // children[0] = "Mata Pelajaran"
      // jadi jadwal hari ini pindah menjadi elemen kedua (paling atas setelah daftar mata pelajaran)
    }
  });
}

// =====================================
// JALANKAN SAAT HALAMAN DILOAD
// =====================================
document.addEventListener("DOMContentLoaded", () => {
  geserJadwalHariIni();
});
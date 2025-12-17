let keranjang = [];
let totalHarga = 0;

function tambah(namaProduk, hargaProduk) {
    keranjang.push(namaProduk);
    totalHarga = totalHarga + hargaProduk;
    updateTampilan();
}

function kurang(namaProduk, hargaProduk) {

    let posisi = keranjang.indexOf(namaProduk);
    
    if (posisi !== -1) {

        keranjang.splice(posisi, 1);

        totalHarga = totalHarga - hargaProduk;

        updateTampilan();
    } else {
        alert("Kamu belum memesan " + namaProduk + "!");
    }
}

function batalSemua() {
    keranjang = [];
    totalHarga = 0;
    updateTampilan();
}

function updateTampilan() {
    let elementTeks = document.getElementById("teks-total");
    let elementBar = document.getElementById("keranjang-layang");

    elementTeks.innerText = keranjang.length + " Item | Rp " + totalHarga.toLocaleString("id-ID");

    if (keranjang.length === 0) {
        elementBar.style.display = "none";
    } else {
        elementBar.style.display = "flex";
    }
}

function selesai() {
    let tanya = "Kamu memesan " + keranjang.length + " item.\nTotal: Rp " + totalHarga.toLocaleString("id-ID") + "\n\nKirim pesanan via WhatsApp?";
    
    if (confirm(tanya) == true) {
        let daftarPesanan = keranjang.join("\n- ");
        let pesanWA = "Halo, saya mau pesan:\n- " + daftarPesanan + "\n\nTotal: Rp " + totalHarga.toLocaleString("id-ID");
        let nomorWA = "6281232576813"; 
        window.open("https://wa.me/" + nomorWA + "?text=" + encodeURIComponent(pesanWA));
    }
}
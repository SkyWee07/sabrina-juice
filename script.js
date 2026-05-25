/* ============================
   DATA PRODUK
   ============================ */
let produkList = [];

async function fetchProduk() {
    try {
        const response = await fetch('/api/produk.php');
        if (!response.ok) throw new Error('Jaringan bermasalah');

        const data = await response.json();
        produkList = data.data;
        renderProduk();
    } catch (error) {
        console.error('Gagal mengambil data:', error);
        document.getElementById('daftar-produk').innerHTML =
            '<p style="text-align:center; width:100%;">Gagal memuat menu. Coba muat ulang halaman.</p>';
    }
}


/* ============================
   STATE
   ============================ */
let keranjang = {};


/* ============================
   RENDER PRODUK
   ============================ */
function renderProduk() {
    const container = document.getElementById('daftar-produk');

    // Produk tersedia duluan, habis di bawah
    const sorted = [...produkList].sort((a, b) => b.tersedia - a.tersedia);

    container.innerHTML = sorted.map((p, i) => {
        const habis = p.tersedia == 0;

        const badgeHabis = habis
            ? `<div class="label-produk" style="background:#ef4444;">Habis</div>`
            : (p.label ? `<div class="label-produk">${p.label}</div>` : '');

        const qtyCtrl = habis
            ? `<div class="qty-ctrl">
                   <button class="btn-qty btn-min" disabled style="opacity:0.4;cursor:not-allowed;">−</button>
                   <span class="qty-display" id="qty-${p.id}">0</span>
                   <button class="btn-qty btn-plus" disabled style="opacity:0.4;cursor:not-allowed;">+</button>
               </div>`
            : `<div class="qty-ctrl">
                   <button class="btn-qty btn-min"
                           onclick="kurang('${p.id}', '${p.nama}', ${p.harga})"
                           aria-label="Kurangi ${p.nama}">−</button>
                   <span class="qty-display" id="qty-${p.id}">0</span>
                   <button class="btn-qty btn-plus"
                           onclick="tambah('${p.id}', '${p.nama}', ${p.harga})"
                           aria-label="Tambah ${p.nama}">+</button>
               </div>`;

        return `
        <div class="kartu-produk${habis ? ' habis' : ''}"
             data-id="${p.id}"
             data-kategori="${p.kategori}"
             data-nama="${p.nama.toLowerCase()}"
             style="animation-delay: ${i * 0.04}s${habis ? '; opacity: 0.55;' : ''}">
            ${badgeHabis}
            <div class="kartu-gambar">
                <img src="${p.gambar_url}"
                     alt="${p.nama}"
                     loading="lazy"
                     onerror="this.src='https://images.unsplash.com/photo-1546171753-97d7676e4602?q=80&w=400'">
            </div>
            <div class="kartu-info">
                <h3>${p.nama}</h3>
                <p>${p.deskripsi}</p>
                <div class="kartu-bawah">
                    <span class="harga">Rp ${p.harga.toLocaleString('id-ID')}</span>
                    ${qtyCtrl}
                </div>
            </div>
        </div>`;
    }).join('');
}

/* ============================
   CART ACTIONS
   ============================ */
function tambah(id, nama, harga) {
    const produk = produkList.find(p => p.id == id);
    if (!produk || produk.tersedia == 0) return;

    if (keranjang[id]) {
        keranjang[id].qty++;
    } else {
        keranjang[id] = { nama, harga, qty: 1 };
    }
    updateQtyDisplay(id);
    updateCartUI();
    tampilToast(`✅ ${nama} ditambahkan!`, 'tambah');
}

function kurang(id, nama, harga) {
    if (!keranjang[id]) return;
    keranjang[id].qty--;
    if (keranjang[id].qty <= 0) {
        delete keranjang[id];
        tampilToast(`🗑️ ${nama} dihapus.`, 'hapus');
    } else {
        tampilToast(`➖ ${nama} dikurangi.`, 'hapus');
    }
    updateQtyDisplay(id);
    updateCartUI();
}

function batalSemua() {
    keranjang = {};
    document.querySelectorAll('.qty-display').forEach(el => (el.textContent = '0'));
    document.querySelectorAll('.kartu-produk.dipilih').forEach(el => el.classList.remove('dipilih'));
    updateCartUI();
    tampilToast('🧹 Keranjang dikosongkan.', 'hapus');
    tutupKeranjang();
}


/* ============================
   UI UPDATES
   ============================ */
function updateQtyDisplay(id) {
    const el = document.getElementById(`qty-${id}`);
    if (!el) return;
    const qty = keranjang[id] ? keranjang[id].qty : 0;
    el.textContent = qty;

    const kartu = document.querySelector(`.kartu-produk[data-id="${id}"]`);
    if (kartu) {
        qty > 0 ? kartu.classList.add('dipilih') : kartu.classList.remove('dipilih');
    }
}

function getTotalItem() {
    return Object.values(keranjang).reduce((s, item) => s + item.qty, 0);
}

function getTotalHarga() {
    return Object.values(keranjang).reduce((s, item) => s + item.harga * item.qty, 0);
}

function updateCartUI() {
    const total = getTotalItem();
    const badge = document.getElementById('cart-badge');

    if (total > 0) {
        badge.textContent = total;
        badge.classList.add('visible');
    } else {
        badge.classList.remove('visible');
    }

    renderKeranjangList();
}

function renderKeranjangList() {
    const list   = document.getElementById('keranjang-list');
    const footer = document.getElementById('keranjang-footer');
    const total  = getTotalItem();
    const harga  = getTotalHarga();

    if (total === 0) {
        list.innerHTML = `
            <div class="keranjang-kosong">
                <div class="kosong-icon">🧃</div>
                <p>Keranjangmu masih kosong</p>
                <small>Yuk pilih minuman favoritmu!</small>
            </div>`;
        footer.style.display = 'none';
        return;
    }

    list.innerHTML = Object.entries(keranjang).map(([id, item]) => `
        <div class="keranjang-item">
            <div class="keranjang-item-info">
                <span class="keranjang-item-nama">${item.nama}</span>
                <span class="keranjang-item-harga">Rp ${item.harga.toLocaleString('id-ID')} × ${item.qty}</span>
            </div>
            <div class="keranjang-item-ctrl">
                <button class="btn-qty btn-min" onclick="kurang('${id}', '${item.nama}', ${item.harga})">−</button>
                <span>${item.qty}</span>
                <button class="btn-qty btn-plus" onclick="tambah('${id}', '${item.nama}', ${item.harga})">+</button>
            </div>
            <span class="keranjang-item-subtotal">Rp ${(item.harga * item.qty).toLocaleString('id-ID')}</span>
        </div>
    `).join('');

    document.getElementById('keranjang-total').innerHTML = `
        <div class="total-row">
            <span>Total (${total} item)</span>
            <span class="total-harga">Rp ${harga.toLocaleString('id-ID')}</span>
        </div>`;

    footer.style.display = 'block';
}


/* ============================
   CART DRAWER
   ============================ */
function bukaKeranjang() {
    document.getElementById('cart-drawer').classList.add('open');
    document.getElementById('cart-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function tutupKeranjang() {
    document.getElementById('cart-drawer').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('open');
    document.body.style.overflow = '';
}


/* ============================
   FILTER & SEARCH
   ============================ */
let kategoriAktif = 'semua';

function filterKategori(kategori) {
    kategoriAktif = kategori;
    const searchInput = document.getElementById('search-input');
    searchInput.value = '';

    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-kategori="${kategori}"]`).classList.add('active');

    tampilkanProduk(kategori, '');
}

function cariProduk(query) {
    kategoriAktif = 'semua';
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-kategori="semua"]').classList.add('active');

    tampilkanProduk('semua', query.toLowerCase().trim());
}

function tampilkanProduk(kategori, query) {
    let adaYangTerlihat = false;

    document.querySelectorAll('.kartu-produk').forEach(kartu => {
        const cocokKategori = kategori === 'semua' || kartu.dataset.kategori === kategori;
        const cocokQuery    = !query || kartu.dataset.nama.includes(query);
        const tampil        = cocokKategori && cocokQuery;

        kartu.style.display = tampil ? 'flex' : 'none';
        if (tampil) adaYangTerlihat = true;
    });

    const emptyState = document.getElementById('produk-kosong');
    emptyState.style.display = adaYangTerlihat ? 'none' : 'block';
}


/* ============================
   CHECKOUT — PESAN KE ADMIN
   ============================ */

let pesananAktifId   = null;
let pollingPesanan   = null;

// Tombol "Pesan Sekarang" di keranjang — buka form dulu
function selesai() {
    if (getTotalItem() === 0) return;
    tutupKeranjang();
    document.getElementById('form-nama').value    = '';
    document.getElementById('form-wa').value      = '';
    document.getElementById('form-catatan').value = '';
    document.getElementById('form-order-error').style.display = 'none';
    const modal = document.getElementById('modal-form-order');
    modal.style.display = 'flex';
}

function tutupFormOrder() {
    document.getElementById('modal-form-order').style.display = 'none';
}

// Kirim pesanan ke backend
async function kirimPesanan() {
    const nama    = document.getElementById('form-nama').value.trim();
    const wa      = document.getElementById('form-wa').value.trim();
    const catatan = document.getElementById('form-catatan').value.trim();
    const errBox  = document.getElementById('form-order-error');
    const btn     = document.getElementById('btn-kirim-order');

    if (!nama) {
        errBox.textContent = 'Nama tidak boleh kosong.';
        errBox.style.display = 'block';
        return;
    }

    const harga = getTotalHarga();
    const items = Object.keys(keranjang).map(id => ({
        produk_id   : parseInt(id),
        jumlah      : keranjang[id].qty,
        harga_satuan: keranjang[id].harga
    }));

    const payload = {
        nama_pelanggan: nama,
        no_whatsapp   : wa || '-',
        total_harga   : harga,
        catatan       : catatan,
        items
    };

    btn.textContent = 'Mengirim...';
    btn.disabled    = true;
    errBox.style.display = 'none';

    try {
        const res  = await fetch('/api/pesanan.php', {
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body   : JSON.stringify(payload)
        });
        const data = await res.json();

        if (!res.ok || !data.success) throw new Error(data.message || 'Gagal mengirim pesanan');

        pesananAktifId = data.pesanan_id;
        const nomorAntrian = data.nomor_antrian ?? '—';

        // Tutup form, buka modal tunggu
        tutupFormOrder();
        document.getElementById('modal-nomor-antrian').textContent = nomorAntrian;
        resetStatusModal();
        document.getElementById('modal-tunggu').style.display = 'flex';

        // Kosongkan keranjang
        keranjang = {};
        document.querySelectorAll('.qty-display').forEach(el => el.textContent = '0');
        document.querySelectorAll('.kartu-produk.dipilih').forEach(el => el.classList.remove('dipilih'));
        updateCartUI();

        // Mulai polling status
        startPollingStatus();

    } catch (err) {
        errBox.textContent = err.message;
        errBox.style.display = 'block';
    } finally {
        btn.textContent = '🛒 Pesan Sekarang';
        btn.disabled    = false;
    }
}

// Polling status pesanan setiap 5 detik
function startPollingStatus() {
    if (pollingPesanan) clearInterval(pollingPesanan);
    pollingPesanan = setInterval(cekStatusPesanan, 5000);
}

function stopPollingStatus() {
    if (pollingPesanan) { clearInterval(pollingPesanan); pollingPesanan = null; }
}

async function cekStatusPesanan() {
    if (!pesananAktifId) return;
    try {
        const res  = await fetch(`/api/status_pesanan.php?id=${pesananAktifId}`);
        const data = await res.json();

        if (data.status === 'selesai') {
            stopPollingStatus();
            tampilKonfirmasiSelesai();
        }
    } catch (_) {
        // silent — tetap polling
    }
}

function resetStatusModal() {
    const box  = document.getElementById('modal-status-box');
    const text = document.getElementById('modal-status-text');
    box.style.background  = '#fef9c3';
    box.style.border      = '1px solid #fde047';
    text.style.color      = '#854d0e';
    text.textContent      = 'Menunggu konfirmasi admin…';
    box.querySelector('span').style.background = '#eab308';
}

function tampilKonfirmasiSelesai() {
    const box  = document.getElementById('modal-status-box');
    const text = document.getElementById('modal-status-text');
    box.style.background  = '#dcfce7';
    box.style.border      = '1px solid #86efac';
    text.style.color      = '#166534';
    text.textContent      = '✅ Pesanan kamu sudah selesai dibuat!';
    box.querySelector('span').style.background = '#22c55e';

    // Tutup otomatis setelah 4 detik
    setTimeout(() => {
        document.getElementById('modal-tunggu').style.display = 'none';
        pesananAktifId = null;
        tampilToast('✅ Pesanan selesai! Silakan ambil minumanmu.', 'tambah');
    }, 4000);
}


/* ============================
   TOAST
   ============================ */
function tampilToast(pesan, tipe) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${tipe}`;
    toast.textContent = pesan;
    container.appendChild(toast);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => toast.classList.add('show'));
    });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 350);
    }, 2500);
}


/* ============================
   MOBILE MENU
   ============================ */
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const btn  = document.getElementById('hamburger');
    menu.classList.toggle('open');
    btn.classList.toggle('open');
}

function tutupMobileMenu() {
    document.getElementById('mobile-menu').classList.remove('open');
    document.getElementById('hamburger').classList.remove('open');
}


/* ============================
   NAVBAR SCROLL EFFECT
   ============================ */
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    navbar.style.boxShadow = window.scrollY > 10
        ? '0 2px 16px rgba(0,0,0,0.25)'
        : '0 2px 12px rgba(0,0,0,0.18)';
});


/* ============================
   INIT
   ============================ */
document.addEventListener('DOMContentLoaded', () => {
    fetchProduk();
});

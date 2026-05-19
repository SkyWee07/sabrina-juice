/* ============================
   DATA PRODUK
   ============================ */
let produkList = [];

async function fetchProduk() {
    try {
        const response = await fetch('https://sabrinajuice.gt.tc/api/produk.php');
        if (!response.ok) throw new Error('Jaringan bermasalah');
        
        const data = await response.json();
        produkList = data; // Memasukkan data dari database
        renderProduk();    // Tampilkan produk ke layar
    } catch (error) {
        console.error('Gagal mengambil data:', error);
        document.getElementById('daftar-produk').innerHTML = '<p style="text-align:center; width:100%;">Gagal memuat menu. Coba muat ulang halaman.</p>';
    }
}


/* ============================
   STATE
   ============================ */
// keranjang: { [id]: { nama, harga, qty } }
let keranjang = {};


/* ============================
   RENDER PRODUK
   ============================ */
function renderProduk() {
    const container = document.getElementById('daftar-produk');
    container.innerHTML = produkList.map((p, i) => `
        <div class="kartu-produk"
             data-id="${p.id}"
             data-kategori="${p.kategori}"
             data-nama="${p.nama.toLowerCase()}"
             style="animation-delay: ${i * 0.04}s">
            ${p.label ? `<div class="label-produk">${p.label}</div>` : ''}
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
                    <div class="qty-ctrl">
                        <button class="btn-qty btn-min"
                                onclick="kurang('${p.id}', '${p.nama}', ${p.harga})"
                                aria-label="Kurangi ${p.nama}">−</button>
                        <span class="qty-display" id="qty-${p.id}">0</span>
                        <button class="btn-qty btn-plus"
                                onclick="tambah('${p.id}', '${p.nama}', ${p.harga})"
                                aria-label="Tambah ${p.nama}">+</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}


/* ============================
   CART ACTIONS
   ============================ */
function tambah(id, nama, harga) {
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
    // Reset all qty displays
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
    // Reset search
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
   CHECKOUT (SIMPAN KE DB & WA)
   ============================ */
async function selesai() {
    const total = getTotalItem();
    if (total === 0) return;

    const daftar = Object.values(keranjang)
        .map(item => `• ${item.nama} ×${item.qty} = Rp ${(item.harga * item.qty).toLocaleString('id-ID')}`)
        .join('\n');
    const harga = getTotalHarga();
    const pesan = `Halo Sabrina Juice! 🍹\n\nSaya mau pesan:\n${daftar}\n\n*Total: Rp ${harga.toLocaleString('id-ID')}*\n\nTerima kasih! 🙏`;
    const nomor = '6281232576813';

    const orderItems = Object.keys(keranjang).map(id => ({
        produk_id: id,
        nama_produk: keranjang[id].nama,
        harga: keranjang[id].harga,
        jumlah: keranjang[id].qty
    }));

    const payload = {
        nama_pembeli: "Pelanggan Web",
        nomor_wa: nomor,
        total_harga: harga,
        items: orderItems
    };

    try {
        const btnCheckout = document.querySelector('.btn-checkout');
        const originalText = btnCheckout.innerHTML;
        btnCheckout.innerHTML = 'Memproses...';
        btnCheckout.disabled = true;

        const response = await fetch('https://sabrinajuice.gt.tc/api/pesanan.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error('Gagal menyimpan pesanan');

        window.open(`https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`, '_blank');
        
        batalSemua();

    } catch (error) {
        console.error('Error checkout:', error);
        alert('Maaf, terjadi kesalahan saat memproses pesanan. Silakan coba lagi.');
    } finally {
        const btnCheckout = document.querySelector('.btn-checkout');
        btnCheckout.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> Pesan via WA`;
        btnCheckout.disabled = false;
    }
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
    const menu  = document.getElementById('mobile-menu');
    const btn   = document.getElementById('hamburger');
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
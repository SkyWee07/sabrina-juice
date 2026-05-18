/* ============================
   DATA PRODUK
   ============================ */
const produkList = [
    // TEH
    { id: 'es-teh',           nama: 'Es Teh',               harga: 3000,  kategori: 'teh',     gambar: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=600',   deskripsi: 'Teh manis dingin yang menyegarkan dahaga.',        label: null },
    { id: 'teh-hangat',       nama: 'Teh Hangat',           harga: 3000,  kategori: 'teh',     gambar: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600', deskripsi: 'Teh manis hangat yang menenangkan jiwa.',          label: null },
    { id: 'milk-tea',         nama: 'Milk Tea',             harga: 5000,  kategori: 'teh',     gambar: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600',   deskripsi: 'Teh susu creamy dan manis, cocok kapan saja.',     label: 'Favorit' },
    // JERUK
    { id: 'es-jeruk',         nama: 'Es Jeruk Peras',       harga: 5000,  kategori: 'jeruk',   gambar: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=600', deskripsi: 'Jeruk peras asli dengan es batu segar.',           label: null },
    { id: 'jeruk-hangat',     nama: 'Jeruk Peras Hangat',   harga: 5000,  kategori: 'jeruk',   gambar: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=600', deskripsi: 'Jeruk peras hangat, kaya vitamin C alami.',        label: null },
    { id: 'jus-jeruk',        nama: 'Jus Jeruk',            harga: 6000,  kategori: 'jeruk',   gambar: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=600', deskripsi: 'Minuman jus dari jeruk pilihan yang lembut.',       label: null },
    // JUS MURNI
    { id: 'jus-jambu',        nama: 'Jus Jambu Merah',      harga: 7000,  kategori: 'jus',     gambar: 'https://linesnews.co.id/wp-content/uploads/2025/12/mzv08kmuqs2dufi80iweywp6mwu689kx.jpg',  deskripsi: 'Baik untuk trombosit dan pencernaan.',  label: null },
    { id: 'jus-mangga',       nama: 'Jus Mangga',           harga: 7000,  kategori: 'jus',     gambar: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=600', deskripsi: 'Baik untuk mata dan sistem imun tubuh.',           label: null },
    { id: 'jus-semangka',     nama: 'Jus Semangka',         harga: 7000,  kategori: 'jus',     gambar: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?q=80&w=600', deskripsi: 'Kaya akan air dan vitamin A alami.',               label: null },
    { id: 'jus-apel',         nama: 'Jus Apel',             harga: 8000,  kategori: 'jus',     gambar: 'https://www.tokomesin.com/wp-content/uploads/2015/10/jus-apel-tokomesin.jpg', deskripsi: 'Tinggi serat dan vitamin C.',                  label: null },
    { id: 'jus-belimbing',    nama: 'Jus Belimbing',        harga: 7000,  kategori: 'jus',     gambar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJotp8ShVynFggzYzg24MxBKl_0qu3PDIdlg&s', deskripsi: 'Kaya akan vitamin C dan serat.',  label: null },
    { id: 'jus-buahnaga',     nama: 'Jus Buah Naga',        harga: 7000,  kategori: 'jus',     gambar: 'https://i0.wp.com/resepkoki.id/wp-content/uploads/2018/04/Resep-Jus-Buah-Naga-Stroberi.jpg?fit=1630%2C1920&ssl=1', deskripsi: 'Tinggi antioksidan dan vitamin.',  label: null },
    { id: 'jus-nanas',        nama: 'Jus Nanas',            harga: 7000,  kategori: 'jus',     gambar: 'https://cdn0-production-images-kly.akamaized.net/MtXEnuN0WErGuk44pKdav_YrzLY=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1168002/original/047769200_1457685356-nanas.jpg', deskripsi: 'Enzim pencernaan alami dari nanas segar.', label: null },
    { id: 'jus-tomat',        nama: 'Jus Tomat',            harga: 7000,  kategori: 'jus',     gambar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScTeKpl30ERuIgamBKhI6LxVNQKeV0VQ_DgQ&s', deskripsi: 'Bagus untuk kesehatan jantung dan kulit.',  label: null },
    { id: 'jus-wortel',       nama: 'Jus Wortel',           harga: 7000,  kategori: 'jus',     gambar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUntsA2BmsZFoycsw4dk9KR7-vRFT35FEUtA&s', deskripsi: 'Bagus untuk kesehatan mata dan imun.',     label: null },
    // + SUSU
    { id: 'jus-jambu-susu',   nama: 'Jus Jambu + Susu',     harga: 8000,  kategori: 'susu',    gambar: 'https://www.alodokter.com/wp-content/uploads/2024/07/manfaat-jus-jambu.jpg', deskripsi: 'Lebih lezat dan creamy dengan tambahan susu.',  label: null },
    { id: 'jus-alpukat',      nama: 'Jus Alpukat + Susu',   harga: 10000, kategori: 'susu',    gambar: 'https://images.unsplash.com/photo-1601039641847-7857b994d704?q=80&w=600',   deskripsi: 'Baik untuk kesehatan jantung dan kulit.',        label: 'Terlaris' },
    { id: 'jus-mangga-susu',  nama: 'Jus Mangga + Susu',    harga: 8000,  kategori: 'susu',    gambar: 'https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=600',       deskripsi: 'Creamy, manis, dan penuh nutrisi.',              label: null },
    { id: 'jus-semangka-susu',nama: 'Jus Semangka + Susu',  harga: 8000,  kategori: 'susu',    gambar: 'https://assets.radarcirebon.id/main/2023/08/jus-semangka-sehat.jpg',           deskripsi: 'Segar dan creamy, paduan sempurna.',             label: null },
    { id: 'jus-apel-susu',    nama: 'Jus Apel + Susu',      harga: 9000,  kategori: 'susu',    gambar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhF1UgoUSjjcVNzLTqX5SfXhphlY9OMSSz7g&s', deskripsi: 'Manis dan creamy dari paduan apel dan susu.', label: null },
    { id: 'jus-belimbing-susu',nama:'Jus Belimbing + Susu', harga: 8000,  kategori: 'susu',    gambar: 'https://img-global.cpcdn.com/recipes/8f33f3509a58775c/680x781f0.5_0.50125_1.0q80/jus-belimbing-susu-foto-resep-utama.jpg', deskripsi: 'Varian susu yang lebih creamy dan lezat.', label: null },
    { id: 'jus-buahnaga-susu',nama: 'Jus Buah Naga + Susu', harga: 8000,  kategori: 'susu',    gambar: 'https://img-global.cpcdn.com/recipes/845fdcf6fdbc7e9c/680x781cq80/jus-buah-naga-susu-foto-resep-utama.jpg', deskripsi: 'Antioksidan tinggi dengan tambahan susu.', label: null },
    { id: 'jus-nanas-susu',   nama: 'Jus Nanas + Susu',     harga: 8000,  kategori: 'susu',    gambar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6hzZx9jJQomnPC5-lg0g7QoI2roywf2Onhw&s', deskripsi: 'Perpaduan nanas segar dan susu creamy.', label: null },
    { id: 'jus-tomat-susu',   nama: 'Jus Tomat + Susu',     harga: 8000,  kategori: 'susu',    gambar: 'https://cdn.yummy.co.id/content-images/images/20210314/k96v9vP0YxxFKjDXy6RxOtTRdepbAAgQ-31363135363934333534d41d8cd98f00b204e9800998ecf8427e.jpg', deskripsi: 'Nutrisi tomat dengan kelezatan susu.', label: null },
    // SPESIAL / MIX
    { id: 'mix-tomat-wortel', nama: 'Mix Tomat + Wortel',   harga: 9000,  kategori: 'spesial', gambar: 'https://awsimages.detik.net.id/community/media/visual/2023/07/28/1493448938_169.jpeg?w=1200', deskripsi: 'Paduan tomat dan wortel penuh vitamin.', label: 'Mix' },
    { id: 'mix-apel-wortel',  nama: 'Mix Apel + Wortel',    harga: 9000,  kategori: 'spesial', gambar: 'https://www.tokomesin.com/wp-content/uploads/2015/10/juice-manis-tokomesin.jpg', deskripsi: 'Varian mix apel dan wortel yang menyehatkan.', label: 'Mix' },
    { id: 'sop-buah',         nama: 'Sop Buah Spesial',     harga: 10000, kategori: 'spesial', gambar: 'https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?q=80&w=600',   deskripsi: 'Buah-buahan segar dicampur susu yang creamy.',   label: 'Spesial' },
    { id: 'salad-buah',       nama: 'Salad Buah Spesial',   harga: 10000, kategori: 'spesial', gambar: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?q=80&w=600',   deskripsi: 'Salad buah segar, menyehatkan, dan mengenyangkan.', label: 'Spesial' },
];


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
                <img src="${p.gambar}"
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
   CHECKOUT
   ============================ */
function selesai() {
    const total = getTotalItem();
    if (total === 0) return;

    const daftar = Object.values(keranjang)
        .map(item => `• ${item.nama} ×${item.qty} = Rp ${(item.harga * item.qty).toLocaleString('id-ID')}`)
        .join('\n');

    const harga = getTotalHarga();
    const pesan = `Halo Sabrina Juice! 🍹\n\nSaya mau pesan:\n${daftar}\n\n*Total: Rp ${harga.toLocaleString('id-ID')}*\n\nTerima kasih! 🙏`;
    const nomor = '6281232576813';

    window.open(`https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`, '_blank');
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
    renderProduk();
});

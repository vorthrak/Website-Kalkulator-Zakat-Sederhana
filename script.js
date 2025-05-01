function formatRupiah(angka) {
    if (isNaN(angka)) return 'Rp 0';
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
}

function parseRupiah(rupiah) {
    return parseInt(rupiah.replace(/[^0-9]+/g, ""), 10);
}

function switchTab(id) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    event.target.classList.add('active');
    document.getElementById('result').innerText = '';
    resetButtons();
}

function updateNisab(type) {
    const hargaEmas = parseRupiah(document.getElementById(`hargaemas-${type}`).value || "0");
    const nisabTahun = hargaEmas * 85;
    const nisabBulan = Math.floor(nisabTahun / 12);
    document.getElementById(`nisab-tahun-${type}`).value = formatRupiah(nisabTahun);
    document.getElementById(`nisab-bulan-${type}`).value = formatRupiah(nisabBulan);
}

function updatePenghasilanBersihProfesi() {
    const penghasilan = parseRupiah(document.getElementById('penghasilan-profesi').value || "0");
    const kebutuhan = parseRupiah(document.getElementById('kebutuhan-profesi').value || "0");
    document.getElementById('penghasilan-bersih-profesi').value = formatRupiah(penghasilan - kebutuhan);
}

function updateHartaSimpananMaal() {
    const a = parseRupiah(document.getElementById('a').value || "0");
    const b = parseRupiah(document.getElementById('b').value || "0");
    const c = parseRupiah(document.getElementById('c').value || "0");
    const d = parseRupiah(document.getElementById('d').value || "0");
    const e = parseRupiah(document.getElementById('e').value || "0");
    const g = parseRupiah(document.getElementById('g').value || "0");
    const f = a + b + c + d + e;
    document.getElementById('f').value = formatRupiah(f);
    document.getElementById('h').value = formatRupiah(f - g);
}

function hitungZakat(type) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    resetButtons();

    if (type === 'profesi') {
        const penghasilanBersih = parseRupiah(document.getElementById('penghasilan-bersih-profesi').value || "0");
        const nisabBulan = parseRupiah(document.getElementById('nisab-bulan-profesi').value || "0");

        if (penghasilanBersih >= nisabBulan) {
            const zakat = penghasilanBersih * 0.025;
            resultDiv.innerHTML = `✅ Anda Wajib Zakat. Besaran zakat: <strong>${formatRupiah(zakat)}</strong>`;
            document.getElementById('buttons-above-nisab').style.display = 'block';
        } else {
            resultDiv.innerHTML = `❌ Anda belum wajib zakat. Silakan bersedekah jika mampu.`;
            document.getElementById('buttons-below-nisab').style.display = 'block';
        }
    }

    if (type === 'maal') {
        const h = parseRupiah(document.getElementById('h').value || "0");
        const nisabTahun = parseRupiah(document.getElementById('nisab-tahun-maal').value || "0");

        if (h >= nisabTahun) {
            const zakat = h * 0.025;
            resultDiv.innerHTML = `✅ Anda Wajib Zakat. Besaran zakat: <strong>${formatRupiah(zakat)}</strong>`;
            document.getElementById('buttons-above-nisab-maal').style.display = 'block';
        } else {
            resultDiv.innerHTML = `❌ Anda belum wajib zakat. Silakan bersedekah jika mampu.`;
            document.getElementById('buttons-below-nisab-maal').style.display = 'block';
        }
    }
}

function resetForm() {
    document.querySelectorAll('input').forEach(input => input.value = '');
    document.getElementById('result').innerText = '';
    resetButtons();
}

function resetButtons() {
    ['buttons-below-nisab', 'buttons-above-nisab', 'buttons-below-nisab-maal', 'buttons-above-nisab-maal'].forEach(id => {
        document.getElementById(id).style.display = 'none';
    });
}

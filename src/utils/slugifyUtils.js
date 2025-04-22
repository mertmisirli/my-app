function slugify(str) {
    return str
        .toString()
        .normalize("NFD") // Türkçe karakter desteği için
        .replace(/[\u0300-\u036f]/g, "") // aksanları sil
        .replace(/ç/g, "c").replace(/ğ/g, "g")
        .replace(/ı/g, "i").replace(/ö/g, "o")
        .replace(/ş/g, "s").replace(/ü/g, "u")
        .replace(/[^a-zA-Z0-9\s-]/g, "") // özel karakterleri sil
        .trim()
        .replace(/\s+/g, "-")
        .toLowerCase();
}

export default slugify  ;
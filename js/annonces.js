// annonces.js - Gestion des annonces avec images 100% fiables

// Données des annonces avec images fonctionnelles
const annoncesData = [
    {
        id: 1,
        title: "Tracteur d'occasion",
        description: "Tracteur en excellent état, année 2020, faible kilométrage. Idéal pour travaux agricoles.",
        category: "offre",
        region: "Dakar",
        price: 1850000,
        date: "2025-01-15",
        imageUrl: "https://cdn.pixabay.com/photo/2016/11/29/04/19/tractor-1867740_640.jpg",
        fallbackIcon: "fas fa-tractor"
    },
    {
        id: 2,
        title: "Semences de maïs hybride",
        description: "Semences de qualité supérieure, rendement garanti. Lot de 50kg.",
        category: "demande",
        region: "Thiès",
        price: 8500,
        date: "2025-01-16",
        imageUrl: "https://cdn.pixabay.com/photo/2016/11/29/04/19/corn-1867742_640.jpg",
        fallbackIcon: "fas fa-seedling"
    },
    {
        id: 3,
        title: "Engrais biologique",
        description: "Engrais 100% naturel, production locale. Sac de 50kg.",
        category: "offre",
        region: "Saint-Louis",
        price: 12500,
        date: "2025-01-14",
        imageUrl: "https://cdn.pixabay.com/photo/2016/03/31/21/29/fertilizer-1296627_640.png",
        fallbackIcon: "fas fa-spray-can"
    },
    {
        id: 4,
        title: "Pulvérisateur agricole",
        description: "Pulvérisateur à dos, capacité 16L. Idéal pour petits champs.",
        category: "offre",
        region: "Dakar",
        price: 35000,
        date: "2025-01-13",
        imageUrl: "https://cdn.pixabay.com/photo/2020/07/06/10/49/sprayer-5374907_640.jpg",
        fallbackIcon: "fas fa-spray-can-sparkles"
    },
    {
        id: 5,
        title: "Conseils en irrigation",
        description: "Expertise pour optimisation de l'irrigation goutte à goutte.",
        category: "demande",
        region: "Thiès",
        price: 0,
        date: "2025-01-12",
        imageUrl: "https://cdn.pixabay.com/photo/2017/08/07/06/18/irrigation-2601326_640.jpg",
        fallbackIcon: "fas fa-hand-holding-heart"
    },
    {
        id: 6,
        title: "Champ à louer",
        description: "Terrain agricole de 2 hectares à louer. Idéal pour culture maraîchère.",
        category: "offre",
        region: "Dakar",
        price: 250000,
        date: "2025-01-11",
        imageUrl: "https://cdn.pixabay.com/photo/2016/08/11/23/48/fields-1587179_640.jpg",
        fallbackIcon: "fas fa-map-marked-alt"
    },
    {
        id: 7,
        title: "Main-d'œuvre agricole",
        description: "Recherche ouvriers agricoles pour récolte de tomates.",
        category: "demande",
        region: "Thiès",
        price: 5000,
        date: "2025-01-10",
        imageUrl: "https://cdn.pixabay.com/photo/2015/07/02/09/57/farmers-828777_640.jpg",
        fallbackIcon: "fas fa-users"
    },
    {
        id: 8,
        title: "Serre agricole",
        description: "Serre tunnel 100m², excellente condition.",
        category: "offre",
        region: "Saint-Louis",
        price: 350000,
        date: "2025-01-09",
        imageUrl: "https://cdn.pixabay.com/photo/2017/08/07/06/18/greenhouse-2601318_640.jpg",
        fallbackIcon: "fas fa-home"
    },
    {
        id: 9,
        title: "Récolte de mangues",
        description: "Vente directe de mangues fraîches, production biologique.",
        category: "offre",
        region: "Dakar",
        price: 2500,
        date: "2025-01-08",
        imageUrl: "https://cdn.pixabay.com/photo/2018/09/17/18/09/mango-3683841_640.jpg",
        fallbackIcon: "fas fa-apple-alt"
    },
    {
        id: 10,
        title: "Formation agricole",
        description: "Formation en techniques agricoles modernes. 3 jours.",
        category: "demande",
        region: "Saint-Louis",
        price: 25000,
        date: "2025-01-07",
        imageUrl: "https://cdn.pixabay.com/photo/2015/12/08/00/31/agriculture-1082206_640.jpg",
        fallbackIcon: "fas fa-chalkboard-user"
    }
];

let currentPage = 1;
const itemsPerPage = 6;
let filteredAnnonces = [...annoncesData];

// Formater le prix
function formatPrice(price) {
    if (price === 0) return "Gratuit";
    return price.toLocaleString('fr-FR') + " FCFA";
}

// Formater la date relative
function formatRelativeDate(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaines`;
    return date.toLocaleDateString('fr-FR');
}

// Gestionnaire d'erreur d'image
function handleImageError(img, fallbackIcon) {
    const parent = img.parentElement;
    parent.innerHTML = `<i class="${fallbackIcon}" style="font-size: 4rem; color: var(--primary);"></i>`;
    parent.style.display = 'flex';
    parent.style.alignItems = 'center';
    parent.style.justifyContent = 'center';
}

// Afficher les annonces
function displayAnnonces() {
    const container = document.getElementById('annoncesContainer');
    if (!container) return;
    
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageAnnonces = filteredAnnonces.slice(start, end);
    const totalPages = Math.ceil(filteredAnnonces.length / itemsPerPage);
    
    if (pageAnnonces.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:3rem;"><i class="fas fa-search" style="font-size:3rem;color:var(--primary);"></i><p>Aucune annonce trouvée</p></div>';
        document.getElementById('annoncesCount').textContent = '0 annonce';
        return;
    }
    
    container.innerHTML = pageAnnonces.map(annonce => `
        <div class="annonce-card" data-id="${annonce.id}">
            <div class="annonce-badge ${annonce.category}">${annonce.category === 'offre' ? 'Offre' : 'Demande'}</div>
            <div class="annonce-image">
                <img src="${annonce.imageUrl}" 
                     alt="${annonce.title}"
                     loading="lazy"
                     onerror="handleImageError(this, '${annonce.fallbackIcon}')">
            </div>
            <div class="annonce-content">
                <h3 class="annonce-title">${annonce.title}</h3>
                <p class="annonce-description">${annonce.description.substring(0, 80)}${annonce.description.length > 80 ? '...' : ''}</p>
                <div class="annonce-meta">
                    <span class="meta-item"><i class="fas fa-map-marker-alt"></i> ${annonce.region}</span>
                    <span class="meta-item"><i class="far fa-clock"></i> ${formatRelativeDate(annonce.date)}</span>
                </div>
                <div class="annonce-price">${formatPrice(annonce.price)}</div>
                <div class="annonce-actions">
                    <button class="btn-view" onclick="viewAnnonce(${annonce.id})"><i class="fas fa-eye"></i> Voir</button>
                    <button class="btn-contact" onclick="contactAnnonce(${annonce.id})"><i class="fas fa-phone"></i> Contacter</button>
                    <button class="btn-subscribe" onclick="subscribeToAnnonce(${annonce.id})"><i class="fas fa-bell"></i> S'abonner</button>
                </div>
            </div>
        </div>
    `).join('');
    
    document.getElementById('annoncesCount').textContent = `${filteredAnnonces.length} annonce${filteredAnnonces.length > 1 ? 's' : ''}`;
    updatePagination(totalPages);
}

// Mettre à jour la pagination
function updatePagination(totalPages) {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    let html = '';
    html += `<button class="page-btn ${currentPage === 1 ? 'disabled' : ''}" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}><i class="fas fa-chevron-left"></i> Précédent</button>`;
    
    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="page-btn ${currentPage === i ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
    }
    
    html += `<button class="page-btn ${currentPage === totalPages ? 'disabled' : ''}" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Suivant <i class="fas fa-chevron-right"></i></button>`;
    
    paginationContainer.innerHTML = html;
}

// Changer de page
function changePage(page) {
    const totalPages = Math.ceil(filteredAnnonces.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    displayAnnonces();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Appliquer les filtres
function applyFilters() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const category = document.getElementById('categoryFilter')?.value || '';
    const region = document.getElementById('regionFilter')?.value || '';
    const priceMax = document.getElementById('priceFilter')?.value || '';
    
    filteredAnnonces = annoncesData.filter(annonce => {
        const matchSearch = searchTerm === '' || 
            annonce.title.toLowerCase().includes(searchTerm) || 
            annonce.description.toLowerCase().includes(searchTerm);
        const matchCategory = category === '' || annonce.category === category;
        const matchRegion = region === '' || annonce.region === region;
        const matchPrice = priceMax === '' || annonce.price <= parseInt(priceMax);
        
        return matchSearch && matchCategory && matchRegion && matchPrice;
    });
    
    currentPage = 1;
    displayAnnonces();
    showToast(`${filteredAnnonces.length} annonce(s) trouvée(s)`, 'success');
}

// Réinitialiser les filtres
function resetFilters() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const regionFilter = document.getElementById('regionFilter');
    const priceFilter = document.getElementById('priceFilter');
    
    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = '';
    if (regionFilter) regionFilter.value = '';
    if (priceFilter) priceFilter.value = '';
    
    filteredAnnonces = [...annoncesData];
    currentPage = 1;
    displayAnnonces();
    showToast('Filtres réinitialisés', 'success');
}

// Voir une annonce
function viewAnnonce(id) {
    const annonce = annoncesData.find(a => a.id === id);
    if (annonce) {
        showToast(`📋 Détails: ${annonce.title}`, 'info');
    }
}

// Contacter pour une annonce
function contactAnnonce(id) {
    const annonce = annoncesData.find(a => a.id === id);
    if (annonce) {
        showToast(`📞 Contact pour: ${annonce.title}`, 'info');
    }
}

// S'abonner à une annonce
function subscribeToAnnonce(id) {
    const annonce = annoncesData.find(a => a.id === id);
    if (annonce && confirm(`🔔 S'abonner aux alertes pour: "${annonce.title}" ?`)) {
        // Sauvegarder l'abonnement
        let subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
        if (!subscriptions.includes(id)) {
            subscriptions.push(id);
            localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
        }
        showToast(`✅ Abonné aux alertes pour: ${annonce.title}`, 'success');
    }
}

// Rendre handleImageError accessible globalement
window.handleImageError = handleImageError;

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    displayAnnonces();
    
    const applyBtn = document.getElementById('applyFilters');
    const resetBtn = document.getElementById('resetFilters');
    const searchBtn = document.getElementById('searchButton');
    
    if (applyBtn) applyBtn.addEventListener('click', applyFilters);
    if (resetBtn) resetBtn.addEventListener('click', resetFilters);
    if (searchBtn) searchBtn.addEventListener('click', applyFilters);
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') applyFilters();
        });
    }
    
    console.log('📱 Annonces chargées:', annoncesData.length);
});
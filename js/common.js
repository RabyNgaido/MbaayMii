// common.js - Fonctions partagées entre toutes les pages

// Affiche une notification toast
function showToast(message, type = 'success') {
    // Supprimer les toasts existants
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span style="margin-left: 8px;">${message}</span>
    `;
    
    // Style selon le type
    if (type === 'success') {
        toast.style.background = '#2E7D32';
    } else if (type === 'error') {
        toast.style.background = '#dc3545';
    } else {
        toast.style.background = '#FF9800';
    }
    
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.color = 'white';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '8px';
    toast.style.zIndex = '9999';
    toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    toast.style.animation = 'slideInRight 0.3s ease';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    
    document.body.appendChild(toast);
    
    // Animation de sortie
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) toast.remove();
        }, 300);
    }, 3000);
}

// Ajouter les animations CSS si elles n'existent pas
function addToastAnimations() {
    if (!document.querySelector('#toast-animations')) {
        const style = document.createElement('style');
        style.id = 'toast-animations';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Met à jour l'année dans le footer
function updateCopyrightYear() {
    const yearSpans = document.querySelectorAll('#currentYear');
    const currentYear = new Date().getFullYear();
    yearSpans.forEach(span => {
        span.textContent = currentYear;
    });
}

// Menu burger pour mobile
function initMobileMenu() {
    const burgerBtn = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav-list');
    
    if (burgerBtn && nav) {
        burgerBtn.addEventListener('click', () => {
            nav.classList.toggle('show');
            burgerBtn.classList.toggle('active');
        });
    }
}

// Navigation active
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else if (currentPage === 'index.html' && href === 'index.html') {
            link.classList.add('active');
        } else if (currentPage === '' && href === 'index.html') {
            link.classList.add('active');
        }
    });
}

// Charger les données depuis localStorage
function loadFromStorage(key, defaultValue = null) {
    const data = localStorage.getItem(key);
    if (data) {
        try {
            return JSON.parse(data);
        } catch (e) {
            return data;
        }
    }
    return defaultValue;
}

// Sauvegarder dans localStorage
function saveToStorage(key, value) {
    const toStore = typeof value === 'object' ? JSON.stringify(value) : value;
    localStorage.setItem(key, toStore);
}

// Formater le prix en FCFA
function formatFCFA(price) {
    if (price === 0 || price === null) return 'Gratuit';
    return price.toLocaleString('fr-FR') + ' FCFA';
}

// Formater la date relative
function formatRelativeDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaines`;
    return date.toLocaleDateString('fr-FR');
}

// Validation d'email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Debounce pour les recherches
function debounce(func, delay) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, delay);
    };
}

// Initialisation commune à toutes les pages
document.addEventListener('DOMContentLoaded', () => {
    // Ajouter les animations
    addToastAnimations();
    
    // Mettre à jour l'année
    updateCopyrightYear();
    
    // Navigation active
    setActiveNav();
    
    // Menu mobile
    initMobileMenu();
    
    // Ajouter un écouteur pour les liens de navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Supprimer la classe active de tous les liens
            navLinks.forEach(l => l.classList.remove('active'));
            // Ajouter la classe active au lien cliqué
            this.classList.add('active');
        });
    });
    
    console.log('Mbaay Mi - Application initialisée');
});

// Export pour utilisation dans d'autres fichiers (si module)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showToast,
        formatFCFA,
        formatRelativeDate,
        isValidEmail,
        debounce,
        loadFromStorage,
        saveToStorage
    };
}
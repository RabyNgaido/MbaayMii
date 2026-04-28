// dashboard.js - Gestion du tableau de bord

// Données des régions
const regionsStats = [
    { region: "Dakar", subscribers: 65, growth: "+15%", activity: "Élevée", activityType: "success" },
    { region: "Thiès", subscribers: 48, growth: "+8%", activity: "Moyenne", activityType: "warning" },
    { region: "Saint-Louis", subscribers: 32, growth: "+12%", activity: "Élevée", activityType: "success" },
    { region: "Kaolack", subscribers: 25, growth: "-3%", activity: "Basse", activityType: "danger" },
    { region: "Ziguinchor", subscribers: 10, growth: "+5%", activity: "Moyenne", activityType: "warning" }
];

// Données météo
const weatherData = [
    { region: "Dakar", temp: 32, humidity: 45, wind: 15, rain: 10, icon: "☀️", advice: "Conditions idéales pour l'irrigation" },
    { region: "Thiès", temp: 30, humidity: 50, wind: 12, rain: 30, icon: "🌤️", advice: "Bonnes conditions pour les semis" },
    { region: "Saint-Louis", temp: 28, humidity: 65, wind: 20, rain: 60, icon: "⛅", advice: "Prévoir une protection contre la pluie" }
];

// Mettre à jour les statistiques
function updateStats() {
    const totalSubscribers = regionsStats.reduce((sum, r) => sum + r.subscribers, 0);
    const newThisMonth = Math.floor(totalSubscribers * 0.12);
    const totalViews = 1247;
    
    document.getElementById('totalSubscriptions').textContent = totalSubscribers;
    document.getElementById('newThisMonth').textContent = `+${newThisMonth}`;
    document.getElementById('totalViews').textContent = totalViews;
}

// Initialiser le graphique
function initChart() {
    const ctx = document.getElementById('subscriptionChart')?.getContext('2d');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
            datasets: [{
                label: 'Abonnements',
                data: [65, 78, 90, 105, 120, 135, 150, 160, 170, 175, 178, 180],
                borderColor: '#2E7D32',
                backgroundColor: 'rgba(46, 125, 50, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#FF9800',
                pointBorderColor: '#fff',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top', labels: { font: { size: 12 } } },
                tooltip: { backgroundColor: '#2E7D32', titleColor: '#fff', bodyColor: '#fff' }
            },
            scales: {
                y: { beginAtZero: true, title: { display: true, text: "Nombre d'abonnés", font: { weight: 'bold' } } },
                x: { title: { display: true, text: "Mois", font: { weight: 'bold' } } }
            }
        }
    });
}

// Remplir le tableau des statistiques
function populateStatsTable() {
    const tbody = document.getElementById('statsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = regionsStats.map(region => `
        <tr>
            <td>${region.region}</td>
            <td>${region.subscribers}</td>
            <td class="${region.growth.includes('+') ? 'positive' : 'negative'}">${region.growth}</td>
            <td><span class="badge badge-${region.activityType}">${region.activity}</span></td>
        </tr>
    `).join('');
}

// Afficher la météo
function displayWeather() {
    const container = document.getElementById('weatherContainer');
    if (!container) return;
    
    container.innerHTML = weatherData.map(weather => `
        <div class="weather-card">
            <div class="region-header">
                <h3>${weather.region}</h3>
                <span class="weather-icon">${weather.icon}</span>
            </div>
            <div class="weather-info">
                <p><i class="fas fa-thermometer-half"></i> Température: <strong>${weather.temp}°C</strong></p>
                <p><i class="fas fa-tint"></i> Humidité: <strong>${weather.humidity}%</strong></p>
                <p><i class="fas fa-wind"></i> Vent: <strong>${weather.wind} km/h</strong></p>
                <p><i class="fas fa-cloud-rain"></i> Pluie: <strong>${weather.rain}%</strong></p>
            </div>
            <div class="weather-advice">
                <i class="fas fa-lightbulb"></i> <strong>Conseil:</strong> ${weather.advice}
            </div>
        </div>
    `).join('');
}

// Rafraîchir la météo
function refreshWeather() {
    showToast('🌤️ Météo actualisée avec succès', 'success');
    displayWeather();
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    updateStats();
    initChart();
    populateStatsTable();
    displayWeather();
    
    const refreshBtn = document.getElementById('refreshWeather');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', refreshWeather);
    }
});
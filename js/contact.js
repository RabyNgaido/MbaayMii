// contact.js - Gestion du formulaire de contact

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const messageDiv = document.getElementById('formMessage');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const firstname = document.getElementById('firstname')?.value.trim();
            const lastname = document.getElementById('lastname')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const message = document.getElementById('message')?.value.trim();
            
            // Validation
            if (!firstname || !lastname || !email || !message) {
                messageDiv.textContent = "Veuillez remplir tous les champs";
                messageDiv.className = "form-message error";
                return;
            }
            
            if (!email.includes('@') || !email.includes('.')) {
                messageDiv.textContent = "Veuillez entrer un email valide";
                messageDiv.className = "form-message error";
                return;
            }
            
            // Envoi simulé
            messageDiv.textContent = `Merci ${firstname} ${lastname}, votre message a bien été envoyé ! Nous vous répondrons dans les plus brefs délais.`;
            messageDiv.className = "form-message success";
            
            // Réinitialiser le formulaire
            form.reset();
            
            // Afficher une notification
            showToast('Message envoyé avec succès !', 'success');
            
            // Effacer le message après 5 secondes
            setTimeout(() => {
                messageDiv.textContent = '';
                messageDiv.className = 'form-message';
            }, 5000);
        });
    }
});
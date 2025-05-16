
        // DOM Elements
        const actionBtn = document.getElementById('actionBtn');
        const imageCard = document.getElementById('imageCard');
        const themeToggle = document.querySelector('.theme-toggle');
        const prefsBtn = document.getElementById('prefsBtn');
        const body = document.body;

        // 1. LocalStorage for User Preferences
        function savePreferences() {
            const preferences = {
                darkMode: body.classList.contains('dark-mode'),
                pulseAnimation: actionBtn.classList.contains('animated'),
                lastInteraction: new Date().toISOString()
            };
            localStorage.setItem('userPreferences', JSON.stringify(preferences));
            console.log('Preferences saved:', preferences);
            
            // Visual feedback
            showToast('Preferences saved to local storage');
        }

        function loadPreferences() {
            const savedPrefs = localStorage.getItem('userPreferences');
            if (savedPrefs) {
                const preferences = JSON.parse(savedPrefs);
                
                // Apply preferences
                if (preferences.darkMode) {
                    body.classList.add('dark-mode');
                }
                
                if (preferences.pulseAnimation) {
                    actionBtn.classList.add('animated');
                }
                
                console.log('Loaded preferences:', preferences);
                return preferences;
            }
            return null;
        }

        // 2. Animation Triggers
        function triggerImageAnimation() {
            imageCard.classList.add('shake');
            
            // Remove animation class after it completes
            setTimeout(() => {
                imageCard.classList.remove('shake');
            }, 500);
        }

        function toggleButtonAnimation() {
            actionBtn.classList.toggle('animated');
            
            // Visual feedback
            if (actionBtn.classList.contains('animated')) {
                showToast('Button animation enabled');
            } else {
                showToast('Button animation disabled');
            }
        }

        // 3. Helper Functions
        function showToast(message) {
            const toast = document.createElement('div');
            toast.textContent = message;
            toast.style.position = 'fixed';
            toast.style.bottom = '20px';
            toast.style.left = '50%';
            toast.style.transform = 'translateX(-50%)';
            toast.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            toast.style.color = 'white';
            toast.style.padding = '10px 20px';
            toast.style.borderRadius = '5px';
            toast.style.zIndex = '1000';
            toast.style.animation = 'fadeInOut 2.5s forwards';
            
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.remove();
            }, 2500);
        }

        // Add CSS for toast animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
                20% { opacity: 1; transform: translateX(-50%) translateY(0); }
                80% { opacity: 1; transform: translateX(-50%) translateY(0); }
                100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            }
        `;
        document.head.appendChild(style);

        // 4. Event Listeners
        actionBtn.addEventListener('click', () => {
            triggerImageAnimation();
            toggleButtonAnimation();
        });

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
        });

        prefsBtn.addEventListener('click', savePreferences);

        // 5. Initialize
        document.addEventListener('DOMContentLoaded', () => {
            const loadedPrefs = loadPreferences();
            if (loadedPrefs) {
                console.log('User preferences loaded from localStorage');
            } else {
                console.log('No saved preferences found');
            }
        });
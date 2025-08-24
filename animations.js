// ===== ANIMATIONS MODULE =====
class AnimationManager {
    constructor() {
        this.heartPool = [];
    }

    // ===== HEARTS ANIMATION =====
    spawnHearts(x, y) {
        const container = document.getElementById('hearts-container');
        const heartCount = 12;
        
        for (let i = 0; i < heartCount; i++) {
            setTimeout(() => {
                this.createHeart(x, y, container);
            }, i * 100);
        }
    }

    spawnHeartsRandom() {
        const container = document.getElementById('hearts-container');
        const heartCount = 6;
        
        for (let i = 0; i < heartCount; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = window.innerHeight - 100;
                this.createHeart(x, y, container);
            }, i * 150);
        }
    }

    createHeart(x, y, container) {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        let heart;
        
        // Reuse heart from pool or create new one
        if (this.heartPool.length > 0) {
            heart = this.heartPool.pop();
        } else {
            heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = '❤️';
        }

        // Position the heart
        heart.style.left = `${x - 12}px`;
        heart.style.top = `${y - 12}px`;
        heart.style.animation = 'none';
        
        container.appendChild(heart);
        
        // Trigger animation
        requestAnimationFrame(() => {
            heart.style.animation = 'floatUp 3s ease-out forwards';
        });

        // Return to pool after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
                this.heartPool.push(heart);
            }
        }, 3000);
    }

    // ===== CHAPTER-SPECIFIC EFFECTS =====
    createBirthdayConfetti() {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const container = document.getElementById('hearts-container');
        const confettiCount = 15;
        const colors = ['#ff6b9d', '#d4879c', '#e6a8bb', '#f2c8d4', '#ffd700', '#ff8c00'];
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.textContent = Math.random() > 0.5 ? '🎉' : '🎂';
                
                // Random position and color
                confetti.style.left = `${Math.random() * 100}%`;
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = `${Math.random() * 0.5}s`;
                confetti.style.animationDuration = `${2 + Math.random()}s`;
                
                container.appendChild(confetti);
                
                // Remove after animation
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 3000);
            }, i * 50);
        }
    }

    createHomeGlow() {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const mainContent = document.getElementById('main-content');
        mainContent.classList.add('home-glow');
        
        // Remove the glow class after animation
        setTimeout(() => {
            mainContent.classList.remove('home-glow');
        }, 450);
    }

    createPinFloat() {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        // Find all pin elements and trigger float animation
        const pins = document.querySelectorAll('.pin-float');
        pins.forEach(pin => {
            pin.classList.add('animate');
            
            // Remove animation class after it completes
            setTimeout(() => {
                pin.classList.remove('animate');
            }, 1200);
        });
    }

    createGoldenGlow() {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const mainContent = document.getElementById('main-content');
        mainContent.classList.add('golden-glow');
        
        // Remove the glow class after animation
        setTimeout(() => {
            mainContent.classList.remove('golden-glow');
        }, 500);
    }

    createIntimateAtmosphere() {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const mainContent = document.getElementById('main-content');
        mainContent.classList.add('intimate-atmosphere');
        
        // Remove the atmosphere class after animation
        setTimeout(() => {
            mainContent.classList.remove('intimate-atmosphere');
        }, 600);
    }

    createHeartConfetti() {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const container = document.getElementById('hearts-container');
        const confettiCount = 16;
        const heartTypes = ['❤️', '💕', '💖', '💞', '💝'];
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'heart-confetti';
                heart.textContent = heartTypes[Math.floor(Math.random() * heartTypes.length)];
                
                // Random position
                heart.style.left = `${Math.random() * 100}%`;
                heart.style.top = `${Math.random() * 20}%`;
                
                // Random animation properties
                heart.style.animationDelay = `${Math.random() * 0.5}s`;
                heart.style.animationDuration = `${2 + Math.random() * 2}s`;
                
                container.appendChild(heart);
                
                // Remove after animation
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }, 4000);
            }, i * 100);
        }
    }

    createRainDrops() {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const container = document.getElementById('hearts-container');
        const dropCount = 12;
        const dropVariations = ['💧', '🌧️', '💙'];
        
        // Create multiple waves of raindrops for continuous effect
        for (let wave = 0; wave < 3; wave++) {
            setTimeout(() => {
                for (let i = 0; i < dropCount; i++) {
                    setTimeout(() => {
                        const drop = document.createElement('div');
                        drop.className = 'raindrop';
                        
                        // Vary the drop type
                        drop.textContent = dropVariations[Math.floor(Math.random() * dropVariations.length)];
                        
                        // Better distributed horizontal positioning
                        drop.style.left = `${(i * (100 / dropCount)) + (Math.random() * (100 / dropCount))}%`;
                        
                        // More controlled timing
                        const baseDuration = 3;
                        const durationVariation = Math.random() * 1.5;
                        drop.style.animationDuration = `${baseDuration + durationVariation}s`;
                        
                        // Staggered start times within each wave
                        drop.style.animationDelay = `${Math.random() * 0.8}s`;
                        
                        // Slight size variation
                        const sizeVariation = 0.8 + (Math.random() * 0.4);
                        drop.style.fontSize = `${1.2 * sizeVariation}rem`;
                        
                        container.appendChild(drop);
                        
                        // Remove after animation completes
                        setTimeout(() => {
                            if (drop.parentNode) {
                                drop.parentNode.removeChild(drop);
                            }
                        }, (baseDuration + durationVariation + 1) * 1000);
                    }, i * 150);
                }
            }, wave * 1000);
        }
    }

    // ===== CLEANUP =====
    cleanupAllEffects() {
        // Clear all animated elements and effects
        const heartsContainer = document.getElementById('hearts-container');
        if (heartsContainer) {
            heartsContainer.innerHTML = '';
        }

        // Remove all temporary animation classes
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.classList.remove('home-glow', 'golden-glow', 'intimate-atmosphere');
        }

        // Remove all pin-float animate classes
        document.querySelectorAll('.pin-float.animate').forEach(pin => {
            pin.classList.remove('animate');
        });

        // Remove all floating elements
        document.querySelectorAll('.floating-heart, .floating-spark').forEach(el => {
            if (el.parentNode) {
                el.parentNode.removeChild(el);
            }
        });

        // Remove any confetti or raindrops
        document.querySelectorAll('.confetti, .raindrop, .heart-confetti').forEach(el => {
            if (el.parentNode) {
                el.parentNode.removeChild(el);
            }
        });
    }
}

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AnimationManager };
} else if (typeof window !== 'undefined') {
    window.AnimationManager = AnimationManager;
}

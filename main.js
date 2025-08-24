// ===== MODULAR LOVE STORY APPLICATION =====
class LoveStoryApp {
    constructor() {
        this.currentChapter = 1;
        this.isTypewriting = false;
        this.typewriterTimeout = null;
        this.settings = {
            typewriterEnabled: true,
            soundEnabled: false,
            theme: 'light'
        };
        this.audioContext = null;
        
        // Initialize modules
        this.animationManager = new AnimationManager();
        this.contentProcessor = new ContentProcessor();
        
        this.init();
    }

    // ===== INITIALIZATION =====
    init() {
        this.loadState();
        this.setupEventListeners();
        this.initTheme();
        this.renderChapter(this.currentChapter);
        this.updateProgress();
        this.initAudio();
    }

    // ===== STATE MANAGEMENT =====
    loadState() {
        try {
            const saved = localStorage.getItem('loveStory_state');
            if (saved) {
                const state = JSON.parse(saved);
                this.currentChapter = Math.max(1, Math.min(7, state.currentChapter || 1));
                this.settings = { ...this.settings, ...state.settings };
            }
        } catch (error) {
            console.warn('Could not load saved state:', error);
        }
    }

    saveState() {
        try {
            const state = {
                currentChapter: this.currentChapter,
                settings: this.settings
            };
            localStorage.setItem('loveStory_state', JSON.stringify(state));
        } catch (error) {
            console.warn('Could not save state:', error);
        }
    }

    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        // Navigation buttons
        document.getElementById('prev-btn').addEventListener('click', () => this.goToPreviousChapter());
        document.getElementById('next-btn').addEventListener('click', () => this.goToNextChapter());
        
        // Progress dots
        document.querySelectorAll('.progress-dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                const chapter = parseInt(e.target.dataset.chapter);
                this.goToChapter(chapter);
            });
        });

        // Heart button
        document.getElementById('heart-btn').addEventListener('click', (e) => {
            this.animationManager.spawnHearts(e.clientX, e.clientY);
        });

        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());

        // Settings modal
        document.getElementById('settings-btn').addEventListener('click', () => this.openSettings());
        document.getElementById('close-modal').addEventListener('click', () => this.closeSettings());
        document.getElementById('settings-modal').addEventListener('click', (e) => {
            if (e.target.id === 'settings-modal') this.closeSettings();
        });

        // Settings toggles
        document.getElementById('typewriter-toggle').addEventListener('click', () => this.toggleTypewriter());
        document.getElementById('sound-toggle').addEventListener('click', () => this.toggleSound());
        document.getElementById('theme-modal-toggle').addEventListener('click', () => this.toggleTheme());

        // Other controls
        document.getElementById('reset-btn').addEventListener('click', () => this.resetProgress());
        document.getElementById('skip-animation').addEventListener('click', () => this.skipTypewriter());
        document.getElementById('export-pdf').addEventListener('click', () => this.exportToPDF());
        document.getElementById('final-surprise').addEventListener('click', () => this.openSurprise());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // ESC key for modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.getElementById('settings-modal').classList.contains('active')) {
                this.closeSettings();
            }
        });
    }

    handleKeyboard(e) {
        // Don't interfere when modal is open
        if (document.getElementById('settings-modal').classList.contains('active')) return;

        switch (e.key) {
            case 'ArrowRight':
            case ' ':
            case 'Enter':
                e.preventDefault();
                this.goToNextChapter();
                break;
            case 'ArrowLeft':
            case 'Backspace':
                e.preventDefault();
                this.goToPreviousChapter();
                break;
            case 'Home':
                e.preventDefault();
                this.goToChapter(1);
                break;
            case 'End':
                e.preventDefault();
                this.goToChapter(7);
                break;
            case 'Escape':
                if (this.isTypewriting) {
                    this.skipTypewriter();
                }
                break;
        }
    }

    // ===== CHAPTER NAVIGATION =====
    goToChapter(chapterNumber, showConfirmation = true) {
        if (chapterNumber < 1 || chapterNumber > 7) return;
        
        // Show confirmation if jumping ahead
        if (showConfirmation && chapterNumber > this.currentChapter) {
            if (!confirm(`¿Estás segura de que querés saltar al Capítulo ${chapterNumber}? Podrías perderte parte de la historia.`)) {
                return;
            }
        }

        this.currentChapter = chapterNumber;
        this.renderChapter(chapterNumber);
        this.updateProgress();
        this.saveState();
        this.playSound();
        this.animationManager.spawnHeartsRandom();
    }

    goToNextChapter() {
        if (this.currentChapter < 7) {
            this.goToChapter(this.currentChapter + 1, false);
        }
    }

    goToPreviousChapter() {
        if (this.currentChapter > 1) {
            this.goToChapter(this.currentChapter - 1, false);
        }
    }

    // ===== CLEANUP FUNCTIONS =====
    cleanupPreviousEffects() {
        // Stop typewriter if running
        if (this.isTypewriting) {
            clearTimeout(this.typewriterTimeout);
            this.isTypewriting = false;
            this.hideTypewriterControls();
        }

        // Clear all animated elements and effects using animation manager
        this.animationManager.cleanupAllEffects();

        // Clear all chapter-specific body classes
        document.body.classList.remove('chapter-3-active', 'chapter-4-active', 'chapter-5-active', 'chapter-6-active', 'chapter-7-active');
    }

    // ===== CHAPTER RENDERING =====
    renderChapter(chapterNumber) {
        const chapter = CHAPTERS.find(c => c.id === chapterNumber);
        if (!chapter) return;

        // Stop any ongoing effects from previous chapters
        this.cleanupPreviousEffects();

        // Update title
        document.getElementById('chapter-title').textContent = chapter.title;

        // Clear content
        const contentEl = document.getElementById('chapter-content');
        contentEl.innerHTML = '';

        // Add chapter-specific class
        const mainContent = document.getElementById('main-content');
        mainContent.className = `main-content chapter-${chapterNumber}`;
        
        // Add special class for chapter effects
        this.setChapterActiveClass(chapterNumber);

        // Split body into paragraphs
        const paragraphs = chapter.body.split('\n').filter(p => p.trim());

        if (this.settings.typewriterEnabled) {
            this.typewriterRender(contentEl, paragraphs, chapterNumber);
        } else {
            this.instantRender(contentEl, paragraphs, chapterNumber);
        }

        // Update navigation buttons
        document.getElementById('prev-btn').disabled = chapterNumber === 1;
        document.getElementById('next-btn').disabled = chapterNumber === 7;
        
        // Show final surprise button on chapter 7
        const finalSurpriseBtn = document.getElementById('final-surprise');
        if (chapterNumber === 7) {
            finalSurpriseBtn.style.display = 'block';
        } else {
            finalSurpriseBtn.style.display = 'none';
        }

        // Scroll to top of content
        document.getElementById('main-content').scrollIntoView({ behavior: 'smooth' });
    }

    setChapterActiveClass(chapterNumber) {
        // Remove all chapter classes first
        document.body.classList.remove('chapter-3-active', 'chapter-4-active', 'chapter-5-active', 'chapter-6-active', 'chapter-7-active');
        
        // Add specific chapter class for special effects
        if (chapterNumber >= 3 && chapterNumber <= 7) {
            document.body.classList.add(`chapter-${chapterNumber}-active`);
        }
    }

    instantRender(contentEl, paragraphs, chapterNumber) {
        paragraphs.forEach((paragraph, index) => {
            const p = document.createElement('p');
            p.innerHTML = this.contentProcessor.processChapterContent(paragraph, chapterNumber);
            contentEl.appendChild(p);
            
            // Add floating elements
            this.contentProcessor.addFloatingElements(contentEl, chapterNumber, index);
            
            // Trigger chapter-specific effects
            this.triggerChapterEffects(chapterNumber, index, paragraphs.length);
        });
        this.hideTypewriterControls();
    }

    typewriterRender(contentEl, paragraphs, chapterNumber) {
        this.isTypewriting = true;
        this.showTypewriterControls();
        
        let paragraphIndex = 0;
        let charIndex = 0;
        let currentP = null;

        const typeNextChar = () => {
            if (paragraphIndex >= paragraphs.length) {
                this.isTypewriting = false;
                this.hideTypewriterControls();
                return;
            }

            if (charIndex === 0) {
                currentP = document.createElement('p');
                contentEl.appendChild(currentP);
                
                // Add floating elements
                this.contentProcessor.addFloatingElements(contentEl, chapterNumber, paragraphIndex);
            }

            const currentParagraph = paragraphs[paragraphIndex];
            const processedContent = this.contentProcessor.processChapterContent(
                currentParagraph.slice(0, charIndex + 1), 
                chapterNumber
            );
            currentP.innerHTML = processedContent;
            
            charIndex++;

            if (charIndex >= currentParagraph.length) {
                // Trigger effects when paragraph is complete
                this.triggerChapterEffects(chapterNumber, paragraphIndex, paragraphs.length);
                
                paragraphIndex++;
                charIndex = 0;
                this.typewriterTimeout = setTimeout(typeNextChar, 75); // 4x faster (reduced from 300)
            } else {
                this.typewriterTimeout = setTimeout(typeNextChar, 9); // 4x faster (reduced from 35)
            }
        };

        typeNextChar();
    }

    triggerChapterEffects(chapterNumber, paragraphIndex, totalParagraphs) {
        switch (chapterNumber) {
            case 2:
                if (paragraphIndex === 1) {
                    this.animationManager.createRainDrops();
                }
                break;
            case 3:
                if (paragraphIndex === 1) {
                    this.animationManager.createBirthdayConfetti();
                }
                break;
            case 4:
                if (paragraphIndex === 0) {
                    this.animationManager.createHomeGlow();
                }
                if (paragraphIndex === 1) {
                    this.animationManager.createPinFloat();
                }
                break;
            case 5:
                if (paragraphIndex === 0) {
                    this.animationManager.createGoldenGlow();
                }
                break;
            case 6:
                if (paragraphIndex === 0) {
                    this.animationManager.createIntimateAtmosphere();
                }
                break;
            case 7:
                if (paragraphIndex === totalParagraphs - 1) {
                    this.animationManager.createHeartConfetti();
                }
                break;
        }
    }

    skipTypewriter() {
        if (!this.isTypewriting) return;
        
        clearTimeout(this.typewriterTimeout);
        this.isTypewriting = false;
        this.hideTypewriterControls();
        
        const chapter = CHAPTERS.find(c => c.id === this.currentChapter);
        const contentEl = document.getElementById('chapter-content');
        
        // Clear the content completely before rendering
        contentEl.innerHTML = '';
        
        const paragraphs = chapter.body.split('\n').filter(p => p.trim());
        
        this.instantRender(contentEl, paragraphs, this.currentChapter);
    }

    showTypewriterControls() {
        document.getElementById('typewriter-controls').style.display = 'flex';
    }

    hideTypewriterControls() {
        document.getElementById('typewriter-controls').style.display = 'none';
    }

    // ===== PROGRESS MANAGEMENT =====
    updateProgress() {
        // Update text
        document.getElementById('progress-text').textContent = `Capítulo ${this.currentChapter} de 7`;
        
        // Update progress bar
        const percentage = (this.currentChapter / 7) * 100;
        document.getElementById('progress-fill').style.width = `${percentage}%`;
        
        // Update dots
        document.querySelectorAll('.progress-dot').forEach((dot, index) => {
            const chapterNum = index + 1;
            dot.classList.remove('active', 'completed');
            dot.removeAttribute('aria-current');
            
            if (chapterNum === this.currentChapter) {
                dot.classList.add('active');
                dot.setAttribute('aria-current', 'true');
            } else if (chapterNum < this.currentChapter) {
                dot.classList.add('completed');
            }
        });
    }

    resetProgress() {
        if (confirm('¿Estás segura de que querés reiniciar la historia desde el principio?')) {
            this.currentChapter = 1;
            this.renderChapter(1);
            this.updateProgress();
            this.saveState();
        }
    }

    // ===== THEME MANAGEMENT =====
    initTheme() {
        const savedTheme = this.settings.theme;
        
        if (savedTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            this.updateThemeToggle(true);
        } else if (savedTheme === 'light') {
            document.body.removeAttribute('data-theme');
            this.updateThemeToggle(false);
        } else {
            // Auto mode - follow system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                document.body.setAttribute('data-theme', 'dark');
            }
            this.updateThemeToggle(prefersDark);
        }
    }

    toggleTheme() {
        const isDark = document.body.hasAttribute('data-theme');
        
        if (isDark) {
            document.body.removeAttribute('data-theme');
            this.settings.theme = 'light';
            this.updateThemeToggle(false);
        } else {
            document.body.setAttribute('data-theme', 'dark');
            this.settings.theme = 'dark';
            this.updateThemeToggle(true);
        }
        
        this.saveState();
    }

    updateThemeToggle(isDark) {
        const themeBtn = document.getElementById('theme-toggle');
        const modalToggle = document.getElementById('theme-modal-toggle');
        
        themeBtn.textContent = isDark ? '☀️' : '🌙';
        themeBtn.setAttribute('aria-label', isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
        
        if (isDark) {
            modalToggle.classList.add('active');
        } else {
            modalToggle.classList.remove('active');
        }
    }

    // ===== SETTINGS MANAGEMENT =====
    openSettings() {
        const modal = document.getElementById('settings-modal');
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        
        // Update toggles
        document.getElementById('typewriter-toggle').classList.toggle('active', this.settings.typewriterEnabled);
        document.getElementById('sound-toggle').classList.toggle('active', this.settings.soundEnabled);
        
        // Focus the close button
        document.getElementById('close-modal').focus();
    }

    closeSettings() {
        const modal = document.getElementById('settings-modal');
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        
        // Return focus to settings button
        document.getElementById('settings-btn').focus();
    }

    toggleTypewriter() {
        this.settings.typewriterEnabled = !this.settings.typewriterEnabled;
        document.getElementById('typewriter-toggle').classList.toggle('active', this.settings.typewriterEnabled);
        this.saveState();
    }

    toggleSound() {
        this.settings.soundEnabled = !this.settings.soundEnabled;
        document.getElementById('sound-toggle').classList.toggle('active', this.settings.soundEnabled);
        this.saveState();
    }

    // ===== AUDIO MANAGEMENT =====
    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.warn('Web Audio API not supported');
        }
    }

    playSound() {
        if (!this.settings.soundEnabled || !this.audioContext) return;
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.1);
        } catch (error) {
            console.warn('Could not play sound:', error);
        }
    }

    // ===== UTILITY FUNCTIONS =====
    exportToPDF() {
        window.print();
    }

    openSurprise() {
        // Placeholder function - will be replaced with actual link
        console.log('Opening surprise... (placeholder function)');
        alert('¡Tu sorpresa está esperándote! 🎁\n(Esta función será conectada a tu sorpresa real)');
        
        // Trigger hearts celebration
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.animationManager.spawnHeartsRandom();
            }, i * 300);
        }
    }
}

// ===== APPLICATION INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    window.loveStoryApp = new LoveStoryApp();
});

// ===== GLOBAL FUNCTIONS FOR EXTERNAL ACCESS =====
function openSurprise() {
    if (window.loveStoryApp) {
        window.loveStoryApp.openSurprise();
    }
}

// Export app for external access
window.openSurprise = openSurprise;

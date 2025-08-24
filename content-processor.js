// ===== CONTENT PROCESSOR MODULE =====
class ContentProcessor {
    // ===== CHAPTER CONTENT PROCESSING =====
    processChapterContent(text, chapterNumber) {
        switch (chapterNumber) {
            case 1:
                return this.processChapter1Content(text);
            case 2:
                return this.processChapter2Content(text);
            case 3:
                return this.processChapter3Content(text);
            case 4:
                return this.processChapter4Content(text);
            case 5:
                return this.processChapter5Content(text);
            case 6:
                return this.processChapter6Content(text);
            case 7:
                return this.processChapter7Content(text);
            default:
                return text;
        }
    }

    processChapter1Content(text) {
        // Process special formatting for Chapter 1
        return text
            // Handle italics (thoughts)
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Handle bold emphasis
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Handle passion words
            .replace(/PASIÓN/g, '<span class="passion-word">PASIÓN</span>')
            // Handle surprise words
            .replace(/NOS OFICIALIZAMOS COMO PAREJA/g, '<span class="surprise-word">NOS OFICIALIZAMOS COMO PAREJA</span>')
            // Handle perfect words
            .replace(/perfecto/g, '<span class="perfect-word">perfecto</span>')
            // Handle affectionate phrases
            .replace(/me atrapó/g, '<span class="affection">me atrapó</span>')
            .replace(/me encantaba/g, '<span class="affection">me encantaba</span>')
            // Make certain emojis larger
            .replace(/🔥/g, '<span class="huge-emoji">🔥</span>')
            .replace(/💍/g, '<span class="huge-emoji">💍</span>')
            .replace(/💖/g, '<span class="large-emoji">💖</span>')
            .replace(/😍/g, '<span class="large-emoji">😍</span>')
            .replace(/🥰/g, '<span class="large-emoji">🥰</span>');
    }

    processChapter2Content(text) {
        // Process special formatting for Chapter 2 (storm theme)
        return text
            // Handle italics (thoughts)
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Handle bold emphasis
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Handle storm words with fade effect
            .replace(/tormenta/g, '<span class="storm-word">tormenta</span>')
            // Handle refuge words
            .replace(/refugio/g, '<span class="refuge-word">refugio</span>')
            // Handle promise with pulse
            .replace(/Me prometí no abandonarte en tu momento más difícil/g, '<span class="promise-pulse">Me prometí no abandonarte en tu momento más difícil</span>')
            // Handle hope words with blue tone
            .replace(/💙/g, '<span class="hope-blue">💙</span>')
            .replace(/🌈/g, '<span class="hope-blue">🌈</span>')
            // Make storm emojis dramatic
            .replace(/🌧️/g, '<span class="storm-emoji">🌧️</span>')
            .replace(/⚡/g, '<span class="storm-emoji">⚡</span>')
            .replace(/💔/g, '<span class="storm-emoji">💔</span>');
    }

    processChapter3Content(text) {
        // Process special formatting for Chapter 3 (sunrise/growth theme)
        return text
            // Handle italics (thoughts)
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Handle bold emphasis
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Handle connection words with wavy underline
            .replace(/juntos/g, '<span class="underline-wavy pulse-soft">juntos</span>')
            .replace(/conectándonos/g, '<span class="underline-wavy">conectándonos</span>')
            .replace(/nos elegíamos/g, '<span class="underline-wavy">nos elegíamos</span>')
            // Handle heat shimmer effect
            .replace(/MUCHÍSIMO CALOR/g, '<span class="heat-shimmer">MUCHÍSIMO CALOR</span>')
            // Make growth emojis larger and special
            .replace(/🌞/g, '<span class="large-emoji">🌞</span>')
            .replace(/✨/g, '<span class="large-emoji">✨</span>')
            .replace(/🎂/g, '<span class="large-emoji">🎂</span>')
            .replace(/🎉/g, '<span class="large-emoji">🎉</span>')
            .replace(/💞/g, '<span class="large-emoji">💞</span>')
            .replace(/💫/g, '<span class="large-emoji">💫</span>')
            .replace(/🥵/g, '<span class="large-emoji">🥵</span>')
            .replace(/🪭/g, '<span class="large-emoji">🪭</span>');
    }

    processChapter4Content(text) {
        // Process special formatting for Chapter 4 (home/refuge theme)
        return text
            // Handle italics (thoughts)
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Handle bold emphasis
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Handle connection words with wavy underline and pulse
            .replace(/juntos/g, '<span class="underline-wavy pulse-soft">juntos</span>')
            .replace(/funcionamos/g, '<span class="underline-wavy pulse-soft">funcionamos</span>')
            // Add pin float to Paraná
            .replace(/📍Paraná/g, '<span class="pin-float">📍</span>Paraná')
            // Style key home/cozy words
            .replace(/refugio/g, '<span class="home-glow">refugio</span>')
            .replace(/casa/g, '<span class="home-glow">casa</span>')
            // Add chip styling to activities
            .replace(/mates compartidos 🧉/g, '<span class="chip">🧉 mates compartidos</span>')
            .replace(/caminatas cortas al atardecer 🚶‍♂️🚶‍♀️/g, '<span class="chip">🚶‍♂️🚶‍♀️ caminatas</span>')
            .replace(/pizzas 🍕/g, '<span class="chip">🍕 pizzas</span>')
            .replace(/helado 🍨/g, '<span class="chip">🍨 helado</span>')
            .replace(/hamburguesas 🍔/g, '<span class="chip">🍔 hamburguesas</span>')
            // Make cozy emojis larger
            .replace(/🏡/g, '<span class="large-emoji">🏡</span>')
            .replace(/💞/g, '<span class="large-emoji">💞</span>')
            .replace(/✨/g, '<span class="large-emoji">✨</span>');
    }

    processChapter5Content(text) {
        // Process special formatting for Chapter 5 (pride and admiration theme)
        return text
            // Handle italics (thoughts)
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Handle bold emphasis
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Handle rise-soft animation for "despegar"
            .replace(/despegar/g, '<span class="rise-soft">despegar</span>')
            // Handle fan badge
            .replace(/fan número uno/g, 'fan número uno')
            // Handle gold glow for admiration
            .replace(/admiración/g, '<span class="gold-glow">admiración</span>')
            // Make achievement emojis larger
            .replace(/🌟/g, '<span class="large-emoji">🌟</span>')
            .replace(/🏅/g, '<span class="large-emoji">🏅</span>')
            .replace(/💖/g, '<span class="large-emoji">💖</span>')
            .replace(/✨/g, '<span class="large-emoji">✨</span>');
    }

    processChapter6Content(text) {
        // Process special formatting for Chapter 6 (present/intimate theme)
        return text
            // Handle italics (thoughts)
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Handle bold emphasis
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Handle ink-script for love declarations
            .replace(/te amo muchísimo/g, '<span class="heart-beat-once ink-script">te amo muchísimo</span>')
            // Handle breath effect for intimate phrases
            .replace(/Nuestra casa es donde estamos juntos/g, '<span class="breath ink-script">Nuestra casa es donde estamos juntos</span>')
            // Make intimate emojis larger
            .replace(/💞/g, '<span class="large-emoji">💞</span>')
            .replace(/😂/g, '<span class="large-emoji">😂</span>')
            .replace(/🤫/g, '<span class="large-emoji">🤫</span>')
            .replace(/🔥/g, '<span class="large-emoji">🔥</span>');
    }

    processChapter7Content(text) {
        // Process special formatting for Chapter 7 (future/hope theme)
        return text
            // Handle italics (thoughts)
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Handle bold emphasis
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Handle shine-soft for future phrases
            .replace(/sé que lo que viene será más grande, más lindo y más nuestro/g, '<span class="shine-soft">sé que lo que viene será más grande, más lindo y más nuestro</span>')
            // Make hope emojis larger
            .replace(/🍫/g, '<span class="large-emoji">🍫</span>')
            .replace(/🐥/g, '<span class="large-emoji">🐥</span>')
            .replace(/✨/g, '<span class="large-emoji">✨</span>')
            .replace(/🏡/g, '<span class="large-emoji">🏡</span>')
            .replace(/✈️/g, '<span class="large-emoji">✈️</span>')
            .replace(/💖/g, '<span class="large-emoji">💖</span>')
            .replace(/🌹/g, '<span class="large-emoji">🌹</span>');
    }

    // ===== FLOATING ELEMENTS =====
    addFloatingElements(contentEl, chapterNumber, paragraphIndex) {
        if (chapterNumber === 1) {
            // Add floating elements for Chapter 1
            if (paragraphIndex === 2) { // After the first conversation paragraph
                const heart = document.createElement('div');
                heart.className = 'floating-heart';
                heart.innerHTML = '💕';
                contentEl.appendChild(heart);
            }
            if (paragraphIndex === 5) { // After the ñoquis paragraph
                const spark = document.createElement('div');
                spark.className = 'floating-spark';
                spark.innerHTML = '✨';
                contentEl.appendChild(spark);
            }
        }
    }
}

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ContentProcessor };
} else if (typeof window !== 'undefined') {
    window.ContentProcessor = ContentProcessor;
}

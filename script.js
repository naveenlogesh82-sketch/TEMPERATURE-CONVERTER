// ===== ThermoShift — Temperature Converter =====

(function () {
    'use strict';

    // ===== DOM References =====
    const tempInput = document.getElementById('temp-input');
    const inputUnitDisplay = document.getElementById('input-unit-display');
    const errorMsg = document.getElementById('error-msg');
    const unitBtns = document.querySelectorAll('.unit-btn');
    const selectorHighlight = document.getElementById('selector-highlight');
    const convertBtn = document.getElementById('convert-btn');
    const resultsSection = document.getElementById('results-section');
    const resultsGrid = document.getElementById('results-grid');
    const scaleCard = document.getElementById('scale-card');
    const scaleMarker = document.getElementById('scale-marker');
    const markerLabel = document.getElementById('marker-label');
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');

    let selectedUnit = 'C';

    // ===== Unit Data =====
    const unitData = {
        C: { symbol: '°C', name: 'Celsius', emoji: '🧊' },
        F: { symbol: '°F', name: 'Fahrenheit', emoji: '🌤️' },
        K: { symbol: 'K', name: 'Kelvin', emoji: '⚛️' }
    };

    // ===== Particle Background =====
    function initParticles() {
        let particles = [];
        let animationId;
        const PARTICLE_COUNT = 60;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function createParticle() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 0.3,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.4 + 0.1,
                hue: Math.random() > 0.5 ? 160 : 195 // teal or blue
            };
        }

        function init() {
            resize();
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(createParticle());
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, i) => {
                // Move
                p.x += p.speedX;
                p.y += p.speedY;

                // Wrap
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Draw
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, ${p.opacity})`;
                ctx.fill();

                // Connect nearby particles
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = p.x - particles[j].x;
                    const dy = p.y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `hsla(170, 60%, 50%, ${0.06 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });

            animationId = requestAnimationFrame(drawParticles);
        }

        window.addEventListener('resize', resize);
        init();
        drawParticles();
    }

    // ===== Unit Selector =====
    function updateHighlight(btnEl) {
        const btns = Array.from(unitBtns);
        const idx = btns.indexOf(btnEl);
        const width = btnEl.parentElement.clientWidth;
        const btnWidth = (width - 12) / 3; // account for padding
        selectorHighlight.style.left = `${6 + idx * (btnWidth + 2.67)}px`;
        selectorHighlight.style.width = `${btnWidth}px`;
    }

    unitBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            unitBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedUnit = btn.dataset.unit;
            inputUnitDisplay.textContent = unitData[selectedUnit].symbol;
            updateHighlight(btn);

            // Clear previous results
            resultsSection.classList.remove('visible');
            scaleCard.classList.remove('visible');
            errorMsg.textContent = '';
            tempInput.classList.remove('error');
        });
    });

    // Init highlight position
    setTimeout(() => {
        updateHighlight(document.querySelector('.unit-btn.active'));
    }, 50);

    window.addEventListener('resize', () => {
        updateHighlight(document.querySelector('.unit-btn.active'));
    });

    // ===== Validation =====
    function validateInput(value) {
        if (value.trim() === '') {
            return { valid: false, message: 'Please enter a temperature value.' };
        }

        const num = Number(value);

        if (isNaN(num)) {
            return { valid: false, message: 'Invalid input. Please enter a valid number.' };
        }

        // Check for absolute zero violations
        if (selectedUnit === 'C' && num < -273.15) {
            return { valid: false, message: 'Temperature cannot be below absolute zero (-273.15°C).' };
        }
        if (selectedUnit === 'F' && num < -459.67) {
            return { valid: false, message: 'Temperature cannot be below absolute zero (-459.67°F).' };
        }
        if (selectedUnit === 'K' && num < 0) {
            return { valid: false, message: 'Kelvin cannot be negative.' };
        }

        return { valid: true, value: num };
    }

    // ===== Conversion Logic =====
    function convertTemperature(value, fromUnit) {
        let celsius;

        // Convert to Celsius first
        switch (fromUnit) {
            case 'C': celsius = value; break;
            case 'F': celsius = (value - 32) * 5 / 9; break;
            case 'K': celsius = value - 273.15; break;
        }

        return {
            C: celsius,
            F: celsius * 9 / 5 + 32,
            K: celsius + 273.15
        };
    }

    function formatTemp(value) {
        // Show up to 2 decimal places, trim trailing zeros
        return parseFloat(value.toFixed(2)).toString();
    }

    // ===== Display Results =====
    function showResults(conversions) {
        resultsGrid.innerHTML = '';

        const targetUnits = Object.keys(unitData).filter(u => u !== selectedUnit);

        targetUnits.forEach(unit => {
            const data = unitData[unit];
            const card = document.createElement('div');
            card.className = 'result-card';
            card.innerHTML = `
                <div class="result-unit-info">
                    <div class="result-emoji">${data.emoji}</div>
                    <div>
                        <div class="result-unit-name">${data.name}</div>
                        <div class="result-unit-symbol">${data.symbol}</div>
                    </div>
                </div>
                <div class="result-value">${formatTemp(conversions[unit])}${data.symbol}</div>
            `;
            resultsGrid.appendChild(card);
        });

        resultsSection.classList.add('visible');
    }

    // ===== Temperature Scale Visualizer =====
    function updateScale(celsiusValue) {
        scaleCard.classList.add('visible');

        // Map celsius to 0-100% on the scale bar
        // Scale: -273 to 1000
        const min = -273;
        const max = 1000;
        const clamped = Math.max(min, Math.min(max, celsiusValue));
        const pct = ((clamped - min) / (max - min)) * 100;

        scaleMarker.style.left = `${pct}%`;
        markerLabel.textContent = `${formatTemp(celsiusValue)}°C`;
    }

    // ===== Convert Button Click =====
    convertBtn.addEventListener('click', () => {
        const raw = tempInput.value;
        const validation = validateInput(raw);

        if (!validation.valid) {
            errorMsg.textContent = validation.message;
            tempInput.classList.add('error');
            resultsSection.classList.remove('visible');
            scaleCard.classList.remove('visible');

            // Remove error state after animation
            setTimeout(() => tempInput.classList.remove('error'), 500);
            return;
        }

        errorMsg.textContent = '';
        tempInput.classList.remove('error');

        const conversions = convertTemperature(validation.value, selectedUnit);
        showResults(conversions);
        updateScale(conversions.C);

        // Button feedback animation
        convertBtn.style.transform = 'scale(0.97)';
        setTimeout(() => {
            convertBtn.style.transform = '';
        }, 150);
    });

    // ===== Enter Key Support =====
    tempInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            convertBtn.click();
        }
    });

    // ===== Clear error on typing =====
    tempInput.addEventListener('input', () => {
        if (errorMsg.textContent) {
            errorMsg.textContent = '';
            tempInput.classList.remove('error');
        }
    });

    // ===== Init =====
    initParticles();

})();

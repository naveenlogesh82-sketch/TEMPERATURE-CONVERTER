# 🌡️ ThermoShift — Temperature Converter

A visually stunning, modern temperature converter web application that supports real-time conversions between **Celsius**, **Fahrenheit**, and **Kelvin**.

---

## 🎯 Objective

To build a creative, responsive temperature converter with a premium dark-themed UI. The app provides instant, accurate conversions across three major temperature scales while delivering an engaging user experience through modern design aesthetics, animations, and interactive visual feedback.

---

## 🛠️ Tools & Technologies Used

| Category       | Technology                                            |
| -------------- | ----------------------------------------------------- |
| **Structure**  | HTML5 (semantic elements, SVG icons)                  |
| **Styling**    | Vanilla CSS (custom properties, glassmorphism, grids) |
| **Logic**      | Vanilla JavaScript (ES6+, Canvas API)                 |
| **Typography** | Google Fonts — *Inter*, *JetBrains Mono*              |
| **Design**     | Dark theme, glassmorphism, gradient accents            |

---

## 📋 Steps Performed

1. **Designed the UI layout** — Built a centered, single-column card layout with a header, converter card, temperature scale visualizer, and footer.

2. **Implemented the input system** — Created a monospaced text input with a dynamic unit suffix indicator (`°C`, `°F`, `K`) that updates based on the selected unit.

3. **Built the unit selector** — Designed a three-button toggle (Celsius / Fahrenheit / Kelvin) with a sliding highlight indicator and icon/label/symbol display for each unit.

4. **Developed conversion logic** — Wrote a two-step conversion engine that normalizes any input to Celsius first, then converts to the remaining two target units. Results are formatted to two decimal places with trailing zeros trimmed.

5. **Added input validation** — Implemented validation for empty input, non-numeric values, and absolute zero violations for each scale (`-273.15°C`, `-459.67°F`, `0 K`).

6. **Created result cards** — Dynamically generated result cards that display the converted values with emoji indicators, unit names, and gradient-styled output values.

7. **Built the temperature scale visualizer** — Added a horizontal gradient bar (`-273°C` to `1000°C`) with a pulsing marker that animates to the converted temperature's position. Includes reference points for absolute zero, freezing point, body temperature, and boiling point.

8. **Styled with glassmorphism** — Applied frosted-glass card backgrounds using `backdrop-filter: blur()`, subtle borders, and layered box shadows for depth.

9. **Added particle background** — Used the Canvas API to render 60 animated particles (teal/blue hues) with connecting lines between nearby particles for a dynamic, ambient backdrop.

10. **Added floating emoji icons** — Layered looping `🌡️ ❄️ 🔥` emojis that float upward across the viewport for visual flair.

11. **Implemented animations** — Added `fadeInUp`, `fadeInDown`, `slideInRight`, `shake` (for errors), and `pulse` keyframe animations for a polished feel.

12. **Made it responsive** — Added CSS media queries for screens ≤ 600px, adjusting padding, font sizes, and grid layouts for mobile devices.

---

## ✅ Outcome

A fully functional, single-page temperature converter featuring:

- **Accurate conversions** between Celsius, Fahrenheit, and Kelvin.
- **Input validation** with error shake animation and clear error messages.
- **Interactive temperature scale** with an animated marker and reference points.
- **Premium dark UI** with glassmorphism, gradient accents, and particle effects.
- **Responsive design** that works seamlessly on desktop and mobile screens.
- **Zero dependencies** — built entirely with vanilla HTML, CSS, and JavaScript.

---

## 🚀 How to Run

1. Open the project folder.
2. Double-click `index.html` to launch in any modern browser.

> No build tools, package managers, or server setup required.

---

## 📁 Project Structure

```
Temperature/
├── index.html    → Page structure and semantic markup
├── style.css     → Design tokens, glassmorphism, animations, responsive styles
├── script.js     → Conversion logic, validation, particle engine, UI interactions
└── README.md     → Project documentation (this file)
```

---

*Built with precision & style • ThermoShift © 2026*

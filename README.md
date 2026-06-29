# ⌨️ Type — Digital Typewriter & Focus Deck

A gorgeous, distraction-free, zero-dependency digital typewriter that turns your web browser into an offline focal writing deck. Inspired by minimalist retro terminal layouts and modern aesthetic devlogs, it operates with complete silence to maximize deep work.

![Typewriter Interface Preview](https://via.placeholder.com/800x450.png?text=Type+-+Digital+Typewriter+Interface+Preview)

---

## ✨ Unique Features

*   **🌅 Immersive Ambient Aesthetic:** High-fidelity, vibrant color gradient background wrapped with a classic textured, lined paper notebook element.
*   **📅 Automated Daily Rolling Sheets:** The main canvas automatically rolls out a fresh, completely blank page the exact moment a new calendar day arrives. Past pages are safely retained inside your device's isolated local history cache.
*   **📌 Permanent Sticky-Pins Board:** An integrated left-hand side-panel pin board that stores long-term milestones, core agendas, or macro task lists. Pinned elements stay locked in view indefinitely until you manually erase them.
*   **🔒 Local-First Data Privacy:** Zero cloud trackers, zero databases, and zero API analytical frameworks. 100% of your notes are stored directly in your native browser container using secure `localStorage` API caching mechanisms.
*   **🪶 Ultra Lightweight:** Built cleanly using single-file vanilla HTML5, modern CSS variables, and native asynchronous JavaScript. It uses zero dependencies and runs flawlessly on old hardware or low-resource dev machines.

---

## 🛠️ Global Desktop Autostart Configuration

Make this typewriter application launch automatically the moment you boot your machine so you see your agenda before getting distracted by the open web.

### 🐧 1. Linux Setup (Firefox, Chrome, Brave, Chromium)
Linux uses local XDG Autostart vectors to execute terminal triggers cleanly.

1. Open your terminal app and create a launcher configuration file:
```bash
nano ~/.config/autostart/typewriter.desktop

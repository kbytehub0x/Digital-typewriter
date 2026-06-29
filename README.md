# ⌨️ Type — Digital Typewriter & Focus Deck

A gorgeous, distraction-free, zero-dependency digital typewriter that turns your web browser into an offline focal writing deck. Inspired by minimalist retro terminal layouts and modern aesthetic devlogs, it operates with complete silence to maximize deep work.

![Typewriter Interface Preview](index.html)

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

1.Paste the following configuration, replacing /PATH/TO/YOUR/ with your exact folder location:
```bash 
[Desktop Entry]
Type=Application
Name=Digital Typewriter
Comment=Launch focus deck on system boot
Exec=firefox file:///PATH/TO/YOUR/Digital-typewriter/readme/index.html
Terminal=false
X-GNOME-Autostart-enabled=true 

(Note: Swap firefox out for google-chrome-stable, brave-browser, or chromium depending on your favorite environment). 
2.Save and close (Ctrl+O followed by Enter, then Ctrl+X).

---
🍏 2. macOS Setup (Safari & Chrome)
1.Open the built-in Automator app on your Mac and select New Document -> Application.
2.Search the actions menu for Run Shell Script and drag it into the design container.
3.Set the script command payload:
```bash
   open /Users/YOUR_USERNAME/Documents/Digital-typewriter/readme/index.html
   
4.Save the Automator file as LaunchTypewriter.app.
5.Go to System Settings > General > Login Items, click the + button under "Open at Login", and select your newly built .app.

---
🪟 3. Windows 11 / 10 Setup (Edge & Chrome)
1.Press Win + R on your keyboard, type shell:startup, and press Enter to open the hidden Windows startup script directory.
2.Right-click inside the blank folder and select New -> Shortcut.
3.In the path entry location box, copy and paste the target link to your local index file:
```bash 
   file:///C:/Users/YOUR_USERNAME/Documents/Digital-typewriter/readme/index.html 
4.Click Next, name the shortcut "Typewriter", and click Finish.

---
💡 Manual Testing & Development
If you just want to play with the code locally without installing global startup scripts, navigate into the directory containing index.html and launch your favorite browser profile directly: 
```bash
   python3 -m http.server 8000 
Then visit http://localhost:8000 inside your web window.

---
📄 License
Distributed under the permissive MIT License. Built with open-source methodologies.

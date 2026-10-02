/* ==========================================================================
   UnixSphere Studio - Official Landing Page JavaScript
   Interactive Terminal, FAQ Accordion & Mobile Navigation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. Mobile Menu Drawer
    // -------------------------------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');

    if (mobileMenuBtn && mobileDrawer) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileDrawer.classList.toggle('active');
        });

        // Close drawer when clicking a link
        mobileDrawer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('active');
            });
        });
    }

    // -------------------------------------------------------------------------
    // 2. FAQ Accordion
    // -------------------------------------------------------------------------
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (questionBtn && answer) {
            questionBtn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close other opened FAQs
                faqItems.forEach(other => {
                    other.classList.remove('active');
                    const otherAnswer = other.querySelector('.faq-answer');
                    if (otherAnswer) otherAnswer.style.maxHeight = null;
                });

                // Toggle current FAQ
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }
    });

    // -------------------------------------------------------------------------
    // 3. Interactive Web Terminal Simulator
    // -------------------------------------------------------------------------
    const terminalBody = document.getElementById('webTerminalBody');
    const terminalInput = document.getElementById('terminalInput');
    const clearTerminalBtn = document.getElementById('clearTerminalBtn');
    const commandChips = document.querySelectorAll('.chip');

    let commandHistory = [];
    let historyIndex = -1;

    // Helper: append a line to terminal
    function appendTerminalLine(text, cssClass = 'output-text') {
        if (!terminalBody) return;
        const line = document.createElement('div');
        line.className = `term-line ${cssClass}`;
        line.innerHTML = text;
        terminalBody.appendChild(line);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    // Command executor
    function executeCommand(rawCommand) {
        const cmd = rawCommand.trim();
        if (!cmd) return;

        // Print input prompt line
        appendTerminalLine(`<span class="term-prompt">user@unixsphere:~$</span> ${escapeHtml(cmd)}`, 'output-text');
        
        commandHistory.push(cmd);
        historyIndex = commandHistory.length;

        const lowerCmd = cmd.toLowerCase();

        if (lowerCmd === 'clear') {
            terminalBody.innerHTML = '';
            return;
        }

        if (lowerCmd === 'help') {
            appendTerminalLine('Commandes disponibles dans le simulateur :', 'output-accent');
            appendTerminalLine('&nbsp;• <span class="output-success">ls -la</span> : Lister les fichiers et répertoires', 'output-text');
            appendTerminalLine('&nbsp;• <span class="output-success">cat cours.txt</span> : Lire un extrait de cours', 'output-text');
            appendTerminalLine('&nbsp;• <span class="output-success">python -c &quot;...&quot;</span> : Exécuter un code Python', 'output-text');
            appendTerminalLine('&nbsp;• <span class="output-success">kali --scan</span> : Simuler un scan de sécurité Nmap', 'output-text');
            appendTerminalLine('&nbsp;• <span class="output-success">stats</span> : Voir les statistiques de l\'académie', 'output-text');
            appendTerminalLine('&nbsp;• <span class="output-success">whoami</span> : Afficher votre identité système', 'output-text');
            appendTerminalLine('&nbsp;• <span class="output-success">uname -a</span> : Afficher le noyau du système', 'output-text');
            appendTerminalLine('&nbsp;• <span class="output-success">clear</span> : Effacer l\'écran du terminal', 'output-text');
            return;
        }

        if (lowerCmd === 'whoami') {
            appendTerminalLine('cyber_apprentice@unixsphere-studio (privilèges standard)', 'output-success');
            return;
        }

        if (lowerCmd === 'uname -a') {
            appendTerminalLine('Linux unixsphere 6.6.14-android-aarch64 #1 SMP PREEMPT GNU/Linux', 'output-muted');
            return;
        }

        if (lowerCmd === 'stats') {
            appendTerminalLine('═══════════════════════════════════════════════', 'output-accent');
            appendTerminalLine('⭐ STATISTIQUES OFFICIELLES UNIXSPHERE STUDIO :', 'output-accent');
            appendTerminalLine('  • 130+ Modules de formation interactifs', 'output-success');
            appendTerminalLine('  • 4 Cursus : Python, Linux, Kali Cyber & DevOps', 'output-success');
            appendTerminalLine('  • 30 Fiches de référence & Cheat-Sheets', 'output-success');
            appendTerminalLine('  • 100% Fonctionnel hors-ligne sans connexion', 'output-success');
            appendTerminalLine('  • Diplôme & Certificat d\'Aptitude officiel inclus', 'output-success');
            appendTerminalLine('═══════════════════════════════════════════════', 'output-accent');
            return;
        }

        if (lowerCmd === 'ls' || lowerCmd === 'ls -l' || lowerCmd === 'ls -la') {
            appendTerminalLine('total 42', 'output-muted');
            appendTerminalLine('drwxr-xr-x 2 user student 4096 Oct 02 12:00 <span class="output-accent">python_masterclass/</span>', 'output-text');
            appendTerminalLine('drwxr-xr-x 2 user student 4096 Oct 02 12:00 <span class="output-accent">linux_fondamentaux/</span>', 'output-text');
            appendTerminalLine('drwxr-xr-x 2 user student 4096 Oct 02 12:00 <span class="output-accent">kali_cybersecurity/</span>', 'output-text');
            appendTerminalLine('drwxr-xr-x 2 user student 4096 Oct 02 12:00 <span class="output-accent">devops_engineering/</span>', 'output-text');
            appendTerminalLine('-rw-r--r-- 1 user student 1240 Oct 02 12:00 <span class="output-success">cours.txt</span>', 'output-text');
            appendTerminalLine('-rwxr-xr-x 1 user student  840 Oct 02 12:00 <span class="output-warning">script_audit.py</span>', 'output-text');
            appendTerminalLine('-rw-r--r-- 1 user student 2048 Oct 02 12:00 <span class="output-text">Certificat_Aptitude.pdf</span>', 'output-text');
            return;
        }

        if (lowerCmd.startsWith('cat cours.txt')) {
            appendTerminalLine('┌─────────────────────────────────────────────────────────────┐', 'output-accent');
            appendTerminalLine('│ MODULE #03 : LES PERMISSIONS UNIX (CHMOD & CHOWN)           │', 'output-accent');
            appendTerminalLine('├─────────────────────────────────────────────────────────────┤', 'output-accent');
            appendTerminalLine('│ [Analogie] Imaginez un immeuble avec un badge sécurisé :    │', 'output-text');
            appendTerminalLine('│ - Propriétaire (u) : le locataire du bureau                 │', 'output-text');
            appendTerminalLine('│ - Groupe (g) : l\'équipe de son entreprise                   │', 'output-text');
            appendTerminalLine('│ - Autres (o) : les visiteurs de l\'immeuble                  │', 'output-text');
            appendTerminalLine('│ Syntaxe clé : chmod 755 mon_script.sh (rwxr-xr-x)           │', 'output-success');
            appendTerminalLine('│ ⚠️ Attention : Ne faites jamais chmod 777 sur un serveur !  │', 'output-warning');
            appendTerminalLine('└─────────────────────────────────────────────────────────────┘', 'output-accent');
            return;
        }

        if (lowerCmd.startsWith('python')) {
            // Check if string contains print
            if (cmd.includes('print')) {
                const match = cmd.match(/print\s*\(\s*["'](.*?)["']\s*\)/);
                const outText = match ? match[1] : 'Bienvenue dans UnixSphere Studio !';
                appendTerminalLine(`[Python 3.11 Runtime] >>>`, 'output-muted');
                appendTerminalLine(`${outText}`, 'output-success');
            } else {
                appendTerminalLine('[Python 3.11 Runtime] Script exécuté avec succès (Code sortie: 0).', 'output-success');
            }
            return;
        }

        if (lowerCmd.includes('kali') || lowerCmd.includes('nmap') || lowerCmd.includes('scan')) {
            appendTerminalLine('Starting Nmap 7.94 ( https://nmap.org ) at 2026-10-02 12:00 UTC', 'output-muted');
            appendTerminalLine('Nmap scan report for target-lab.unixsphere.local (10.0.2.15)', 'output-text');
            appendTerminalLine('Host is up (0.00042s latency).', 'output-text');
            appendTerminalLine('PORT     STATE SERVICE VERSION', 'output-accent');
            appendTerminalLine('22/tcp   open  ssh     OpenSSH 9.3p1 (Debian)', 'output-success');
            appendTerminalLine('80/tcp   open  http    nginx/1.24.0 (UnixSphere WebLab)', 'output-success');
            appendTerminalLine('443/tcp  open  https   nginx/1.24.0 (TLS 1.3 Active)', 'output-success');
            appendTerminalLine('8080/tcp open  http-proxy (Sandbox API container)', 'output-warning');
            appendTerminalLine('Nmap done: 1 IP address (1 host up) scanned in 1.45 seconds.', 'output-success');
            return;
        }

        // Default: command not found
        appendTerminalLine(`bash: ${escapeHtml(cmd)}: commande introuvable. Tapez 'help' pour voir les commandes.`, 'output-error');
    }

    // Handle Input Submit
    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const val = terminalInput.value;
                terminalInput.value = '';
                executeCommand(val);
            } else if (e.key === 'ArrowUp') {
                if (historyIndex > 0) {
                    historyIndex--;
                    terminalInput.value = commandHistory[historyIndex] || '';
                }
            } else if (e.key === 'ArrowDown') {
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    terminalInput.value = commandHistory[historyIndex] || '';
                } else {
                    historyIndex = commandHistory.length;
                    terminalInput.value = '';
                }
            }
        });
    }

    // Clear Terminal button
    if (clearTerminalBtn) {
        clearTerminalBtn.addEventListener('click', () => {
            if (terminalBody) terminalBody.innerHTML = '';
        });
    }

    // Command Chips Click
    commandChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const cmd = chip.getAttribute('data-cmd');
            if (cmd) {
                executeCommand(cmd);
                if (terminalInput) terminalInput.focus();
            }
        });
    });

    // Helper: Escape HTML
    function escapeHtml(string) {
        const entityMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return String(string).replace(/[&<>"']/g, function (s) {
            return entityMap[s];
        });
    }
});

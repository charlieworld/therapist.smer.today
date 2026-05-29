// CSV Parsing Logic
function parseCSV(csv) {
    const lines = [];
    let p = 0;
    let row = [];
    let inQuote = false;
    let field = '';

    // Skip header
    let nextLinePos = csv.search(/[\r\n]+/);
    if (nextLinePos !== -1) {
        // Find end of first line to skip it properly
        // Actually, the main loop handles it better if we just process from char 0
        // But we want to skip the first row (header).
        // Let's implement a robust state machine parser.
    }

    for (let i = 0; i < csv.length; i++) {
        const char = csv[i];
        const nextChar = csv[i + 1];

        if (inQuote) {
            if (char === '"' && nextChar === '"') {
                field += '"';
                i++; // skip next quote
            } else if (char === '"') {
                inQuote = false;
            } else {
                field += char;
            }
        } else {
            if (char === '"') {
                inQuote = true;
            } else if (char === ',') {
                row.push(field.trim());
                field = '';
            } else if (char === '\n' || char === '\r') {
                // Handle line break
                if (field || row.length > 0) {
                    row.push(field.trim());
                    if (row.length > 1) { // Skip empty lines
                        lines.push(row);
                    }
                }
                row = [];
                field = '';
                // Handle \r\n
                if (char === '\r' && nextChar === '\n') i++;
            } else {
                field += char;
            }
        }
    }
    // Last field
    if (field || row.length > 0) {
        row.push(field.trim());
        if (row.length > 1) lines.push(row);
    }

    // Headers are the first line
    // 0: Name, 1: Gender, 2: Title, 3: Region, 4: Agency, 5: Booking, 6: Topics, 7: Notes
    const data = [];
    // Start from index 1 to skip header
    for (let i = 1; i < lines.length; i++) {
        const r = lines[i];
        if (r.length < 5) continue; // Skip incomplete
        const region = r[3] || '';
        const is_remote = region.includes('遠距') || region.includes('線上') || region.includes('可遠距');

        data.push({
            name: r[0],
            gender: r[1],
            title: r[2],
            region: region,
            agency: r[4],
            booking: r[5],
            topics: r[6],
            notes: r[7],
            is_remote: is_remote
        });
    }
    return data;
}

const resources = parseCSV(csvData);

// Populate Region Dropdown
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('resourceGrid');
    const searchInput = document.getElementById('searchInput');
    const regionFilter = document.getElementById('regionFilter');
    const remoteFilter = document.getElementById('remoteFilter');
    const noResults = document.getElementById('noResults');

    const regions = new Set();
    resources.forEach(r => {
        // Simple extraction of main region (e.g., '台北' from '台北、遠距')
        // Split by separators commonly used: 、 , /
        const parts = r.region.split(/[、，,\/]/).map(s => s.trim()).filter(s => s);
        parts.forEach(part => {
            // Exclude '遠距', '僅實體', '線上' from region list to keep it clean, they are covered by method filter or context
            if (!['遠距', '線上', '僅實體', '可遠距'].includes(part)) {
                if (part) regions.add(part);
            }
        });
    });

    // Sort regions and add to dropdown
    Array.from(regions).sort().forEach(region => {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        regionFilter.appendChild(option);
    });

    function renderCards(items) {
        grid.innerHTML = '';
        if (items.length === 0) {
            noResults.classList.remove('hidden');
            return;
        }
        noResults.classList.add('hidden');

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-xl shadow-sm border border-brand-100 p-6 hover:shadow-md transition-shadow duration-200 flex flex-col h-full';

            // Header: Name + Title + Gender
            let headerHtml = `
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="text-xl font-bold text-brand-800">${escapeHtml(item.name)}</h3>
                        <p class="text-sm text-brand-600 font-medium">${escapeHtml(item.title)} <span class="text-brand-400 mx-1">|</span> ${escapeHtml(item.gender)}</p>
                    </div>
            `;

            // Badge for Remote
            if (item.is_remote) {
                headerHtml += `
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        可遠距
                    </span>
                `;
            }

            headerHtml += `</div>`;

            // Content
            const contentHtml = `
                <div class="space-y-3 flex-grow text-sm text-brand-700">
                    <div class="flex items-start">
                        <svg class="w-5 h-5 mr-2 text-brand-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        <span>${escapeHtml(item.region)}</span>
                    </div>
                    <div class="flex items-start">
                        <svg class="w-5 h-5 mr-2 text-brand-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                        <span>${escapeHtml(item.agency)}</span>
                    </div>
                    ${item.booking ? `
                    <div class="flex items-start">
                        <svg class="w-5 h-5 mr-2 text-brand-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        <span>${linkify(escapeHtml(item.booking))}</span>
                    </div>` : ''}
                </div>
            `;

            // Topics
            let topicsHtml = '';
            if (item.topics) {
                const topicsList = item.topics.split(/[、，,\n]/).map(t => t.trim()).filter(t => t);
                topicsHtml = `
                    <div class="mt-4 pt-4 border-t border-brand-100">
                        <h4 class="text-xs font-semibold text-brand-500 uppercase tracking-wider mb-2">擅長議題</h4>
                        <div class="flex flex-wrap gap-2">
                            ${topicsList.map(topic => `<span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-brand-100 text-brand-800">${escapeHtml(topic)}</span>`).join('')}
                        </div>
                    </div>
                `;
            }

            card.innerHTML = headerHtml + contentHtml + topicsHtml;
            grid.appendChild(card);
        });
    }

    function filterResources() {
        const query = searchInput.value.toLowerCase().trim();
        const region = regionFilter.value;
        const onlyRemote = remoteFilter.checked;

        const filtered = resources.filter(item => {
            // Search Text
            const searchable = [item.name, item.agency, item.topics, item.region, item.notes].join(' ').toLowerCase();
            const matchesSearch = !query || searchable.includes(query);

            // Region Filter
            // If region is selected, item's region string must include it
            const matchesRegion = !region || item.region.includes(region);

            // Remote Filter
            const matchesRemote = !onlyRemote || item.is_remote;

            return matchesSearch && matchesRegion && matchesRemote;
        });

        renderCards(filtered);
    }

    // Event Listeners
    searchInput.addEventListener('input', filterResources);
    regionFilter.addEventListener('change', filterResources);
    remoteFilter.addEventListener('change', filterResources);

    // Initial Render
    renderCards(resources);
});

// Utilities
function escapeHtml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function linkify(text) {
    // Detect URLs and turn them into links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
        return `<a href="${url}" target="_blank" class="text-blue-600 hover:underline break-all">${url}</a>`;
    });
}

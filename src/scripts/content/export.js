function createExportButton(pubType) {
    const exportButton = document.createElement("input");
    exportButton.type = "submit";
    exportButton.name = "btnExport";
    exportButton.value = "Exportar Artículo";
    exportButton.className = "CformBoton";
    exportButton.style.backgroundColor = "#ffd000";
    exportButton.onclick = () => exportConicet(pubType);
    return exportButton;
}

async function exportConicet(formatType) {
    try {
        const url = chrome.runtime.getURL(`format/${formatType}.json`);
        const response = await fetch(url);
        const fieldMapping = await response.json();

        const conicetDict = {};

        Object.entries(fieldMapping).forEach(([k, v]) => {
            // console.log(`${k}: ${v.query}`);
            conicetDict[k] = v.single
                ? document.querySelector(v.query)[v.field]
                : window[v.callback.export](
                    document.querySelectorAll(v.query), ...(v.params.export || []));
        });

        const linkFullText = document.querySelector('a[href*="archivosAdjuntos.do"]');
        const baseUrl = window.location.href.split("/").slice(0, 4).join("/");
        const downloadUrl = `${baseUrl}/${linkFullText.getAttribute("href")}`;
        conicetDict.fullTextBase64 = await encode(downloadUrl);

        const json = JSON.stringify(conicetDict, null, 4);
        downloadFile(json, `[${formatType.toUpperCase()}] ${conicetDict.produccion}.json`, "application/json");
    } catch (error) {
        console.error("Error loading or parsing JSON:", error);
    }
}

function getAffiliations(organizacionTable, entityType) {
    const authorAffiliations = {};
    for (let i = 0; i < organizacionTable.length; i++) {
        const authorNameInput = organizacionTable[i].querySelector(`input[type="text"][name="${entityType}ParticipacionLabel"]`);
        if (authorNameInput) {
            const authorName = authorNameInput.value;
            // Initialize the array for the author if not done yet
            if (!authorAffiliations[authorName]) {
                authorAffiliations[authorName] = [];
            }
            const organizacionLabels = organizacionTable[i].querySelectorAll(`input[type="hidden"][name="${entityType}OrganizacionLabel"]`);
            const organizacionIds = organizacionTable[i].querySelectorAll(`input[type="hidden"][name="${entityType}OrganizacionId"]`);
            // Iterate over all organizations for the current author
            for (let j = 0; j < organizacionLabels.length; j++) {
                const organizacionLabel = organizacionLabels[j].value;
                const organizacionId = organizacionIds[j].value;
                const organizacionText = `${organizacionLabel} {${organizacionId}}`;
                // Add the organization info to the author's array
                authorAffiliations[authorName].push(organizacionText);
            }
        }
    }
    return authorAffiliations;
}

function getRadioValue(dummy_arg, query) {
    const selected = document.querySelector(`${query}:checked`);
    return selected ? selected.value : "";
}

function getDisciplinar(dummy_arg, query_1, query_2) {
    const campo_1 = document.querySelector(query_1);
    const campo_2 = document.querySelector(query_2);
    const text_1 = campo_1.options[campo_1.selectedIndex].text;
    const text_2 = campo_2.options[campo_2.selectedIndex].text;
    return [
        `${text_1} {${campo_1.value}}`,
        `${text_2} {${campo_2.value}}`
    ];
}

function getKeywords(palabraTable) {
    const keywords = [];
    for (let i = 0; i < palabraTable.length; i++) {
        keywords.push(palabraTable[i].value);
    }
    return keywords;
}

async function encode(downloadUrl) {
    try {
        const response = await fetch(downloadUrl);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = function () {
                const base64 = reader.result.split(",")[1]; // Remove the Base64 prefix
                resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob); // Read the blob as Base64
        });
    } catch (error) {
        console.error("Error retrieving or encoding the file:", error);
        throw error;
    }
}

function downloadFile(data, filename, type) {
    const file = new Blob([data], { type: type });
    const a = document.createElement("a");
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}

globalThis.createExportButton = createExportButton;

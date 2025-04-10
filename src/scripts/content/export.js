function createExportButton(pubType) {
    let exportButton = document.createElement("input");
    exportButton.type = "submit";
    exportButton.name = "btnExport";
    exportButton.value = "Exportar JSON";
    exportButton.className = "CformBoton";
    exportButton.style.backgroundColor = "#ffd000";
    switch (pubType) {
        case "bcoProduccionListaPublicacionCongreso":
            exportButton.onclick = () => exportConicetCongress();
            break;
        case "bcoProduccionListaPublicacionCapituloLibro":
            exportButton.onclick = () => exportConicetChapter();
            break;
        case "bcoProduccionArticuloPublicacion":
            exportButton.onclick = () => exportConicetJournal();
            break;
        default:
            break;
    }
    return exportButton;
}

async function exportConicetCongress() {
    try {
        const url = chrome.runtime.getURL('format/congress.json');
        const response = await fetch(url);
        const data = await response.json();

        let conicetDict = {};

        Object.entries(data).forEach(([k, v]) => {
            console.log(`${k}: ${v.query}`);
            conicetDict[k] = document.querySelector(v.query)[v.value];
            console.log(document.querySelector(v.query))
        });

        const autorTable = document.querySelectorAll("#autorTable tr");
        conicetDict.autorTable = getAffiliations(autorTable, "autor");

        const campo_0 = document.getElementsByName("campo_0")[0];
        const campo_0_0 = document.getElementsByName("campo_0_0")[0];
        conicetDict.disciplinarTable = getFields(campo_0, campo_0_0);

        const palabraTable = document.querySelectorAll('#palabraTable input[name="palabraLabel"]');
        conicetDict.palabraTable = getKeywords(palabraTable);

        const linkFullText = document.querySelector('a[href*="archivosAdjuntos.do"]');
        const baseUrl = window.location.href.split('/').slice(0, 4).join('/');
        const downloadUrl = `${baseUrl}/${linkFullText.getAttribute('href')}`;
        conicetDict.fullTextBase64 = await encode(downloadUrl);

        const json = JSON.stringify(conicetDict, null, 4);
        download(json, `${conicetDict.produccion}.json`, "application/json");

    } catch (error) {
        console.error('Error al cargar el JSON:', error);
    }
}

async function exportConicetChapter() {
    try {
        const url = chrome.runtime.getURL('format/chapters.json');
        const response = await fetch(url);
        const data = await response.json();

        let conicetDict = {};

        Object.entries(data).forEach(([k, v]) => {
            console.log(`${k}: ${v.query}`);
            conicetDict[k] = document.querySelector(v.query)[v.value];
            console.log(document.querySelector(v.query))
        });

        const autorTable = document.querySelectorAll("#autorTable tr");
        conicetDict.autorTable = getAffiliations(autorTable, "autor");

        const compiladorTable = document.querySelectorAll("#compiladorTable tr.odd");
        conicetDict.compiladorTable = getAffiliations(compiladorTable, "compilador");

        const campo_0 = document.getElementsByName("campo_0")[0];
        const campo_0_0 = document.getElementsByName("campo_0_0")[0];
        conicetDict.disciplinarTable = getFields(campo_0, campo_0_0);

        const palabraTable = document.querySelectorAll('#palabraTable input[name="palabraLabel"]');
        conicetDict.palabraTable = getKeywords(palabraTable);

        const linkFullText = document.querySelector('a[href*="archivosAdjuntos.do"]');
        const baseUrl = window.location.href.split('/').slice(0, 4).join('/');
        const downloadUrl = `${baseUrl}/${linkFullText.getAttribute('href')}`;
        conicetDict.fullTextBase64 = await encode(downloadUrl);

        const json = JSON.stringify(conicetDict, null, 4);
        download(json, `${conicetDict.produccion}.json`, "application/json");

    } catch (error) {
        console.error('Error al cargar el JSON:', error);
    }
}

async function exportConicetJournal() {
    alert("Esta función aún no está implementada. Próximamente disponible.");
}

function getAffiliations(organizacionTable, entityType) {
    let authorAffiliations = {};
    for (let i = 0; i < organizacionTable.length; i++) {
        let authorNameInput = organizacionTable[i].querySelector(`input[type="text"][name="${entityType}ParticipacionLabel"]`);
        if (authorNameInput) {
            let authorName = authorNameInput.value;
            // Initialize the array for the author if not done yet
            if (!authorAffiliations[authorName]) {
                authorAffiliations[authorName] = [];
            }
            let organizacionLabels = organizacionTable[i].querySelectorAll(`input[type="hidden"][name="${entityType}OrganizacionLabel"]`);
            let organizacionIds = organizacionTable[i].querySelectorAll(`input[type="hidden"][name="${entityType}OrganizacionId"]`);
            // Iterate over all organizations for the current author
            for (let j = 0; j < organizacionLabels.length; j++) {
                let organizacionLabel = organizacionLabels[j].value;
                let organizacionId = organizacionIds[j].value;
                let organizacionText = `${organizacionLabel} {${organizacionId}}`;
                // Add the organization info to the author's array
                authorAffiliations[authorName].push(organizacionText);
            }
        }
    }
    return authorAffiliations;
}

function getFields(campo_0, campo_0_0) {
    let text_0 = campo_0.options[campo_0.selectedIndex].text;
    let text_0_0 = campo_0_0.options[campo_0_0.selectedIndex].text;
    return [
        `${text_0} {${campo_0.value}}`,
        `${text_0_0} {${campo_0_0.value}}`
    ];
}

function getKeywords(palabraTable) {
    let keywords = [];
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
            reader.onloadend = function() {
                const base64 = reader.result.split(',')[1]; // Remove the Base64 prefix
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

function download(data, filename, type) {
    let file = new Blob([data], { type: type });
    let a = document.createElement("a");
    let url = URL.createObjectURL(file);
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

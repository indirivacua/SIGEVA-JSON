function createExportButton() {
    let exportButton = document.createElement("input");
    exportButton.type = "submit";
    exportButton.name = "btnExport";
    exportButton.value = "Exportar JSON";
    exportButton.className = "CformBoton";
    exportButton.style.backgroundColor = "#ffd000";
    exportButton.onclick = exportConicet;
    return exportButton;
}

async function exportConicet() {
    let conicetDict = {};

    let tipoTrabajo = document.getElementsByName("tipoTrabajo")[0];
    conicetDict.tipoTrabajo = tipoTrabajo.value;
    let produccion = document.getElementsByName("produccion")[0];
    conicetDict.produccion = produccion.value;
    let idioma = document.getElementsByName("idioma")[0];
    conicetDict.idioma = idioma.value;
    let tituloPublicacion = document.getElementsByName("tituloPublicacion")[0];
    conicetDict.tituloPublicacion = tituloPublicacion.value;
    let tipoPublicacion = document.getElementsByName("tipoPublicacion")[0];
    conicetDict.tipoPublicacion = tipoPublicacion.value;
    let issnIsbn = document.getElementsByName("issnIsbn")[0];
    conicetDict.issnIsbn = issnIsbn.value;
    let paisEdicion = document.getElementsByName("paisEdicion")[0];
    conicetDict.paisEdicion = paisEdicion.value;
    let lugarPublicacion = document.getElementsByName("lugarPublicacion")[0];
    conicetDict.lugarPublicacion = lugarPublicacion.value;
    let editorial = document.getElementsByName("editorial")[0];
    conicetDict.editorial = editorial.value;
    let anioPublica = document.getElementsByName("anioPublica")[0];
    conicetDict.anioPublica = anioPublica.value;
    let tipoSoporteChecked0 = document.getElementsByName("tipoSoporteChecked")[0];
    conicetDict.tipoSoporteChecked0 = tipoSoporteChecked0.checked;
    let tipoSoporteChecked1 = document.getElementsByName("tipoSoporteChecked")[1];
    conicetDict.tipoSoporteChecked1 = tipoSoporteChecked1.checked;
    let web = document.getElementsByName("web")[0];
    conicetDict.web = web.value;
    let reunionCientifica = document.getElementsByName("reunionCientifica")[0];
    conicetDict.reunionCientifica = reunionCientifica.value;
    let tipoReunion = document.getElementsByName("tipoReunion")[0];
    conicetDict.tipoReunion = tipoReunion.value;
    let alcanceNacional = document.getElementsByName("alcanceNacional")[0];
    conicetDict.alcanceNacional = alcanceNacional.checked;
    let alcanceInternacional = document.getElementsByName("alcanceInternacional")[0];
    conicetDict.alcanceInternacional = alcanceInternacional.checked;
    let paisEvento = document.getElementsByName("paisEvento")[0];
    conicetDict.paisEvento = paisEvento.value;
    let lugarReunion = document.getElementsByName("lugarReunion")[0];
    conicetDict.lugarReunion = lugarReunion.value;
    let fechaReunion = document.getElementsByName("fechaReunion")[0];
    conicetDict.fechaReunion = fechaReunion.value;
    let institucionOrganizadora = document.getElementsByName("institucionOrganizadora")[0];
    conicetDict.institucionOrganizadora = institucionOrganizadora.value;
    let autorTable = document.querySelectorAll("#autorTable tr");
    conicetDict.autorTable = getAuthorAffiliations(autorTable);
    let campo_0 = document.getElementsByName("campo_0")[0];
    let campo_0_0 = document.getElementsByName("campo_0_0")[0];
    conicetDict.disciplinarTable = getFields(campo_0, campo_0_0);
    let palabraTable = document.querySelectorAll('#palabraTable input[type="text"][name="palabraLabel"]');
    conicetDict.palabraTable = getKeywords(palabraTable);
    let hdnresumen = document.getElementsByName("hdnresumen")[0];
    conicetDict.hdnresumen = hdnresumen.value;
    let filePath = document.querySelector('input[name="linkFullText"]').value;
    let downloadUrl =
        `https://si.conicet.gov.ar/eva/archivosAdjuntos.do?archivo=fullText&elementoId=${filePath.split('/')[4]}`;
    conicetDict.fullTextBase64 = await encode(downloadUrl);

    let json = JSON.stringify(conicetDict, null, 4);

    download(json, `${conicetDict.produccion}.json`, "application/json");
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

function getAuthorAffiliations(organizacionTable) {
    let authorAffiliations = {};
    for (let i = 0; i < organizacionTable.length; i++) {
        let authorNameInput = organizacionTable[i].querySelector('input[type="text"][name="autorParticipacionLabel"]');
        if (authorNameInput) {
            let authorName = authorNameInput.value;
            // Initialize the array for the author if not done yet
            if (!authorAffiliations[authorName]) {
                authorAffiliations[authorName] = [];
            }
            let organizacionLabels = organizacionTable[i].querySelectorAll('input[type="hidden"][name="autorOrganizacionLabel"]');
            let organizacionIds = organizacionTable[i].querySelectorAll('input[type="hidden"][name="autorOrganizacionId"]');
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

async function encode(url) {
    try {
        const response = await fetch(url);
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

globalThis.createExportButton = createExportButton;

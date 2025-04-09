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
    conicetDict.autorTable = getAffiliations(autorTable, "autor");
    let campo_0 = document.getElementsByName("campo_0")[0];
    let campo_0_0 = document.getElementsByName("campo_0_0")[0];
    conicetDict.disciplinarTable = getFields(campo_0, campo_0_0);
    let palabraTable = document.querySelectorAll('#palabraTable input[type="text"][name="palabraLabel"]');
    conicetDict.palabraTable = getKeywords(palabraTable);
    let hdnresumen = document.getElementsByName("hdnresumen")[0];
    conicetDict.hdnresumen = hdnresumen.value;
    let linkFullText = document.querySelector('a[href*="archivosAdjuntos.do"]');
    let baseUrl = window.location.href.split('/').slice(0, 4).join('/');
    let downloadUrl = `${baseUrl}/${linkFullText.getAttribute('href')}`;
    conicetDict.fullTextBase64 = await encode(downloadUrl);

    let json = JSON.stringify(conicetDict, null, 4);
    download(json, `${conicetDict.produccion}.json`, "application/json");
}

async function exportConicetChapter() {
    let conicetDict = {};

    let tipoParteLibro = document.getElementsByName("tipoParteLibro")[0];
    conicetDict.tipoParteLibro = tipoParteLibro.value;
    let tituloLibro = document.getElementsByName("tituloLibro")[0];
    conicetDict.tituloLibro = tituloLibro.value;
    let produccion = document.getElementsByName("produccion")[0];
    conicetDict.produccion = produccion.value;
    let isbn = document.getElementsByName("isbn")[0];
    conicetDict.isbn = isbn.value;
    let idioma = document.getElementsByName("idioma")[0];
    conicetDict.idioma = idioma.value;
    let volumen = document.getElementsByName("volumen")[0];
    conicetDict.volumen = volumen.value;
    let tomo = document.getElementsByName("tomo")[0];
    conicetDict.tomo = tomo.value;
    let numero = document.getElementsByName("numero")[0];
    conicetDict.numero = numero.value;
    let totalPaginasLibro = document.getElementsByName("totalPaginasLibro")[0];
    conicetDict.totalPaginasLibro = totalPaginasLibro.value;
    let paginaInicial = document.getElementsByName("paginaInicial")[0];
    conicetDict.paginaInicial = paginaInicial.value;
    let paginaFinal = document.getElementsByName("paginaFinal")[0];
    conicetDict.paginaFinal = paginaFinal.value;
    let publicado = document.querySelector('input[name="publicado"]:checked');
    conicetDict.publicado = publicado ? publicado.value : "";
    let referato = document.querySelector('input[name="referato"]:checked');
    conicetDict.referato = referato ? referato.value : "";
    let pais = document.getElementsByName("pais")[0];
    conicetDict.pais = pais.value;
    let lugarEdicion = document.getElementsByName("lugarEdicion")[0];
    conicetDict.lugarEdicion = lugarEdicion.value;
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
    conicetDict.isAutor = document.getElementsByName("isAutor")[0].checked;
    conicetDict.isEditor = document.getElementsByName("isEditor")[0].checked;
    conicetDict.isRevisor = document.getElementsByName("isRevisor")[0].checked;
    let autorTable = document.querySelectorAll("#autorTable tr");
    conicetDict.autorTable = getAffiliations(autorTable, "autor");
    let compiladorTable = document.querySelectorAll("#compiladorTable tr.odd");
    conicetDict.compiladorTable = getAffiliations(compiladorTable, "compilador");
    let campo_0 = document.getElementsByName("campo_0")[0];
    let campo_0_0 = document.getElementsByName("campo_0_0")[0];
    conicetDict.disciplinarTable = getFields(campo_0, campo_0_0);
    let palabraTable = document.querySelectorAll('#palabraTable input[name="palabraLabel"]');
    conicetDict.palabraTable = getKeywords(palabraTable);
    let hdnresumen = document.getElementsByName("hdnresumen")[0];
    conicetDict.hdnresumen = hdnresumen.value;
    let linkFullText = document.querySelector('a[href*="archivosAdjuntos.do"]');
    let baseUrl = window.location.href.split('/').slice(0, 4).join('/');
    let downloadUrl = `${baseUrl}/${linkFullText.getAttribute('href')}`;
    conicetDict.fullTextBase64 = await encode(downloadUrl);

    let json = JSON.stringify(conicetDict, null, 4);
    download(json, `${conicetDict.produccion}.json`, "application/json");
}

async function exportConicetJournal() {
    alert("Esta función aún no está implementada. Próximamente disponible.");
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

globalThis.createExportButton = createExportButton;

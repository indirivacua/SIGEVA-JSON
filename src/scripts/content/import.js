function createImportButton(pubType) {
    let importButton = document.createElement("input");
    importButton.type = "button";
    importButton.name = "btnImport";
    importButton.value = "Importar JSON";
    importButton.className = "CformBoton";
    importButton.style.backgroundColor = "#ffd000";
    importButton.style.position = "absolute";
    importButton.style.top = "1";
    importButton.style.right = "5";
    switch (pubType) {
        case "bcoProduccionListaPublicacionCongreso":
            importButton.onclick = () => loadFile(importConicetCongress);
            break;
        case "bcoProduccionListaPublicacionCapituloLibro":
            importButton.onclick = () => loadFile(importConicetChatper);
            break;
        case "bcoPrecargarArticulo":
            importButton.onclick = () => loadFile(importConicetJournal);
            break;
        default:
            break;
    }
    return importButton;
}

function importConicetChatper(conicetDict) {
    let tipoParteLibro = document.getElementsByName("tipoParteLibro")[0];
    tipoParteLibro.value = conicetDict["tipoParteLibro"];
    let tituloLibro = document.getElementsByName("tituloLibro")[0];
    tituloLibro.value = conicetDict["tituloLibro"];
    let produccion = document.getElementsByName("produccion")[0];
    produccion.value = conicetDict["produccion"];
    let isbn = document.getElementsByName("isbn")[0];
    isbn.value = conicetDict["isbn"];
    let idioma = document.getElementsByName("idioma")[0];
    idioma.value = conicetDict["idioma"];
    let volumen = document.getElementsByName("volumen")[0];
    volumen.value = conicetDict["volumen"];
    let tomo = document.getElementsByName("tomo")[0];
    tomo.value = conicetDict["tomo"];
    let numero = document.getElementsByName("numero")[0];
    numero.value = conicetDict["numero"];
    let totalPaginasLibro = document.getElementsByName("totalPaginasLibro")[0];
    totalPaginasLibro.value = conicetDict["totalPaginasLibro"];
    let paginaInicial = document.getElementsByName("paginaInicial")[0];
    paginaInicial.value = conicetDict["paginaInicial"];
    let paginaFinal = document.getElementsByName("paginaFinal")[0];
    paginaFinal.value = conicetDict["paginaFinal"];
    document.querySelector(`input[name="publicado"][value="${conicetDict["publicado"]}"]`).checked = true;
    document.querySelector(`input[name="referato"][value="${conicetDict["referato"]}"]`).checked = true;
    let pais = document.getElementsByName("pais")[0];
    pais.value = conicetDict["pais"];
    let lugarEdicion = document.getElementsByName("lugarEdicion")[0];
    lugarEdicion.value = conicetDict["lugarEdicion"];
    let editorial = document.getElementsByName("editorial")[0];
    editorial.value = conicetDict["editorial"];
    let anioPublica = document.getElementsByName("anioPublica")[0];
    anioPublica.value = conicetDict["anioPublica"];
    document.getElementsByName("tipoSoporteChecked")[0].checked = conicetDict["tipoSoporteChecked1"];
    document.getElementsByName("tipoSoporteChecked")[1].checked = conicetDict["tipoSoporteChecked2"];
    let web = document.getElementsByName("web")[0];
    web.value = conicetDict["web"];
    document.getElementsByName("isAutor")[0].checked = conicetDict["isAutor"];
    document.getElementsByName("isEditor")[0].checked = conicetDict["isEditor"];
    document.getElementsByName("isRevisor")[0].checked = conicetDict["isRevisor"];
    let autorTable = conicetDict["autorTable"];
    setAffiliations(autorTable, "autor");
    let compiladorTable = conicetDict["compiladorTable"];
    setAffiliations(compiladorTable, "compilador");
    let disciplinarTable = conicetDict["disciplinarTable"];
    setDisciplinar(disciplinarTable);
    let palabraTable = conicetDict["palabraTable"];
    setKeywords(palabraTable);
    let hdnresumen = document.getElementsByName("hdnresumen")[0];
    hdnresumen.value = conicetDict["hdnresumen"];
    decode(conicetDict["fullTextBase64"], conicetDict["produccion"]);
}

function importConicetJournal(conicetDict) {
    alert("Esta función aún no está implementada. Próximamente disponible.");
}

function importConicetCongress(conicetDict) {
    let tipoTrabajo = document.getElementsByName("tipoTrabajo")[0];
    tipoTrabajo.value = conicetDict["tipoTrabajo"];
    let produccion = document.getElementsByName("produccion")[0];
    produccion.value = conicetDict["produccion"];
    let idioma = document.getElementsByName("idioma")[0];
    idioma.value = conicetDict["idioma"];
    let tipoPublicacion = document.getElementsByName("tipoPublicacion")[0];
    tipoPublicacion.value = conicetDict["tipoPublicacion"];
    let tituloPublicacion = document.getElementsByName("tituloPublicacion")[0];
    tituloPublicacion.value = conicetDict["tituloPublicacion"];
    let issnIsbn = document.getElementsByName("issnIsbn")[0];
    issnIsbn.value = conicetDict["issnIsbn"];
    let paisEdicion = document.getElementsByName("paisEdicion")[0];
    paisEdicion.value = conicetDict["paisEdicion"];
    let lugarPublicacion = document.getElementsByName("lugarPublicacion")[0];
    lugarPublicacion.value = conicetDict["lugarPublicacion"];
    let editorial = document.getElementsByName("editorial")[0];
    editorial.value = conicetDict["editorial"];
    let anioPublica = document.getElementsByName("anioPublica")[0];
    anioPublica.value = conicetDict["anioPublica"];
    let tipoSoporteChecked1 = document.getElementsByName("tipoSoporteChecked")[0];
    tipoSoporteChecked1.checked = conicetDict["tipoSoporteChecked1"];
    let tipoSoporteChecked2 = document.getElementsByName("tipoSoporteChecked")[1];
    tipoSoporteChecked2.checked = conicetDict["tipoSoporteChecked2"];
    let web = document.getElementsByName("web")[0];
    web.value = conicetDict["web"];
    let reunionCientifica = document.getElementsByName("reunionCientifica")[0];
    reunionCientifica.value = conicetDict["reunionCientifica"];
    let tipoReunion = document.getElementsByName("tipoReunion")[0];
    tipoReunion.value = conicetDict["tipoReunion"];
    let alcanceNacional = document.getElementsByName("alcanceNacional")[0];
    alcanceNacional.checked = conicetDict["alcanceNacional"];
    let alcanceInternacional = document.getElementsByName("alcanceInternacional")[0];
    alcanceInternacional.checked = conicetDict["alcanceInternacional"];
    let paisEvento = document.getElementsByName("paisEvento")[0];
    paisEvento.value = conicetDict["paisEvento"];
    let lugarReunion = document.getElementsByName("lugarReunion")[0];
    lugarReunion.value = conicetDict["lugarReunion"];
    let fechaReunion = document.getElementsByName("fechaReunion")[0];
    fechaReunion.value = conicetDict["fechaReunion"];
    let institucionOrganizadora = document.getElementsByName("institucionOrganizadora")[0];
    institucionOrganizadora.value = conicetDict["institucionOrganizadora"];
    let autorTable = conicetDict["autorTable"];
    setAffiliations(autorTable, "autor");
    let disciplinarTable = conicetDict["disciplinarTable"];
    setDisciplinar(disciplinarTable);
    let palabraTable = conicetDict["palabraTable"];
    setKeywords(palabraTable);
    let hdnresumen = document.getElementsByName("hdnresumen")[0];
    hdnresumen.value = conicetDict["hdnresumen"];
    decode(conicetDict["fullTextBase64"], conicetDict["produccion"]);
}

function loadFile(callback) {
    let fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.id = "file_input";
    fileInput.accept = ".json";
    fileInput.style.display = "none";

    fileInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                try {
                    conicetDict = JSON.parse(event.target.result);
                    callback(conicetDict);
                } catch (error) {
                    console.error("Error al parsear el JSON:", error);
                }
            };

            reader.readAsText(file);
        }
    });

    fileInput.click();
}

function setAffiliations(entityTable, entityType) {
    let entityParticipacionLabel = document.getElementsByName(`${entityType}ParticipacionLabel`);
    let entityNuevo = document.getElementsByName(`${entityType}Nuevo`)[0];
    Object.keys(entityTable).forEach((entity, i) => {
        if (i >= entityParticipacionLabel.length) {
            entityNuevo.click();
            entityParticipacionLabel = document.getElementsByName(`${entityType}ParticipacionLabel`);
        }
        entityParticipacionLabel[i].value = entity;
        let afiliaciones = entityTable[entity];
        if (afiliaciones.length > 0) {
            let entityTable = entityParticipacionLabel[i].closest("table").querySelector("tbody");
            afiliaciones.forEach((afiliacion) => {
                let regex = /(.+?)\s\{(.+?)\}/;
                let matches = afiliacion.match(regex);
                if (matches) {
                    let organizacion = matches[1].trim();
                    let organizacionId = matches[2].trim();
                    let nuevaFila = `
                    <tr class="odd">
                        <td colspan="2" style="width:500;border-top: 1px solid #888;">
                            <div>${organizacion}</div>
                            <input type="hidden" name="${entityType}OrganizacionLabel" value="${organizacion}">
                            <input type="hidden" name="${entityType}OrganizacionId" value="${organizacionId}">
                            <input type="hidden" name="${entityType}ParticipacionOrganizacionId" value="">
                            <input type="hidden" name="${entityType}ParticipacionId" value="">
                            <input type="hidden" name="${entityType}isOtraOrganizacion" value="false">
                            <input type="hidden" name="${entityType}PaisId" value="">
                            <input type="hidden" name="${entityType}ProvinciaId" value="">
                            <input type="hidden" name="${entityType}RelacionadaId" value="">
                            <input type="hidden" name="${entityType}Nivel" value="">
                            <input type="hidden" name="${entityType}Ruta" value="${organizacion}">
                            <input type="hidden" name="${entityType}TipoId" value="">
                            <input type="hidden" name="${entityType}AffiliationId" value="">
                        </td>
                        <td style="width:30;border-top: 1px solid #888;">
                            <input type="button" name="${entityType}OrganizacionBorrar" value="Borrar" class="borrar" align="right">
                        </td>
                    </tr>`;
                    entityTable.insertAdjacentHTML("beforeend", nuevaFila);
                }
            });
        }
    });
}

function setDisciplinar(disciplinarTable) {
    let [text_0, value_0] = disciplinarTable[0].match(/(.+) \{(\d+)\}/).slice(1);
    let [text_0_0, value_0_0] = disciplinarTable[1].match(/(.+) \{(\d+)\}/).slice(1);
    let campo_0 = document.getElementsByName("campo_0")[0];
    campo_0.value = value_0;
    campo_0.dispatchEvent(new Event("change"));
    setTimeout(() => {
        let campo_0_0 = document.getElementsByName("campo_0_0")[0];
        campo_0_0.value = value_0_0;
        campo_0_0.dispatchEvent(new Event("change"));
    }, 1000);
}

function setKeywords(palabraTable) {
    let palabraLabel = document.getElementsByName("palabraLabel");
    let palabraNuevo = document.getElementsByName("palabraNuevo")[0];
    for (let i = 0; i < palabraTable.length; i++) {
        if (i >= palabraLabel.length) {
            palabraNuevo.click();
            setTimeout(function () {
                palabraLabel = document.getElementsByName("palabraLabel");
            }, 500);
        }
        palabraLabel[i].value = palabraTable[i].trim();
    }
}

function decode(fullTextBase64, fileName) {
    const byteCharacters = atob(fullTextBase64); // Decode Base64
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const fileBlob = new Blob([byteArray], { type: "application/pdf" });
    const file = new File([fileBlob], `${fileName}.pdf`, { type: "application/pdf" });

    const inputFile = document.querySelector('input[name="theFile"]');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    inputFile.files = dataTransfer.files;
}

globalThis.createImportButton = createImportButton;

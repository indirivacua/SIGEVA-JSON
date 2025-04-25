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
    importButton.onclick = () => loadFile(importConicet, pubType);
    return importButton;
}

async function importConicet(conicetDict, formatType) {
    try {
        const url = chrome.runtime.getURL(`format/${formatType}.json`);
        const response = await fetch(url);
        const fieldMapping = await response.json();

        Object.entries(fieldMapping).forEach(([k, v]) => {
            // console.log(`${k}: ${v.query}`);
            if (v.single) {
                document.querySelector(v.query)[v.field] = conicetDict[k];
            } else {
                window[v.callback.import](conicetDict[k], ...(v.params.import || []));
            }
        });

        decode(conicetDict["fullTextBase64"], conicetDict["produccion"]);
    } catch (error) {
        console.error("Error loading or parsing JSON:", error);
    }
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

function setRadioValue(value, query) {
    document.querySelectorAll(query).forEach((el) => {
        if (el.value === value) {
            el.checked = true;
            el.dispatchEvent(new Event("change")); // Needed to dispatch 'seleccionarAutor(this);' in Journal Article
        }
    });
}

function setDisciplinar(disciplinarTable, query_1, query_2) {
    let [text_0, value_0] = disciplinarTable[0].match(/(.+) \{(\d+)\}/).slice(1);
    let [text_0_0, value_0_0] = disciplinarTable[1].match(/(.+) \{(\d+)\}/).slice(1);
    let campo_0 = document.querySelector(query_1);
    campo_0.value = value_0;
    campo_0.dispatchEvent(new Event("change"));
    setTimeout(() => {
        let campo_0_0 = document.querySelector(query_2);
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

function loadFile(callback, formatType) {
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
                    callback(conicetDict, formatType);
                } catch (error) {
                    console.error("Error loading or parsing JSON:", error);
                }
            };

            reader.readAsText(file);
        }
    });

    fileInput.click();
}

globalThis.createImportButton = createImportButton;

currentUrl = window.location.href;
pubType = extractPublicationType(currentUrl);

let datosBasicosTd = document.querySelector('td.CformRowHeader');
if (datosBasicosTd
    && !currentUrl.includes("action=Editar")
    && (!datosBasicosTd.textContent.includes("Ingresar el DOI o ISSN"))) {
    let importButton = globalThis.createImportButton(pubType);
    datosBasicosTd.style.position = "relative"; // Necesario para la superposición
    datosBasicosTd.appendChild(importButton);
}

let guardarButton = document.querySelector('input[value="Modificar"]');
if (guardarButton
    && currentUrl.includes("action=Editar")) {
    exportButton = globalThis.createExportButton(pubType);
    guardarButton.parentNode.insertBefore(exportButton, guardarButton.nextSibling);
    guardarButton.insertAdjacentHTML("afterend", " &nbsp; ");
}

function extractPublicationType(url) {
    let match = url.match(/\/([^\/]+)\.do/); // Captura la última palabra antes de ".do"
    return match ? match[1] : null; // Devuelve la palabra encontrada o null si no hay coincidencia
}
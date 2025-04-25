currentUrl = window.location.href;
pubType = window.FINDEX[new URL(currentUrl).pathname];

let datosBasicosTd = document.querySelector('td.CformRowHeader');
if (datosBasicosTd && pubType !== undefined
    && !currentUrl.includes("action=Editar")) {
    let importButton = globalThis.createImportButton(pubType);
    datosBasicosTd.style.position = "relative"; // Necesario para la superposición
    datosBasicosTd.appendChild(importButton);
}

let guardarButton = document.querySelector('input[value="Modificar"]');
if (guardarButton && pubType !== undefined
    && currentUrl.includes("action=Editar")) {
    exportButton = globalThis.createExportButton(pubType);
    guardarButton.parentNode.insertBefore(exportButton, guardarButton.nextSibling);
    guardarButton.insertAdjacentHTML("afterend", " &nbsp; ");
}

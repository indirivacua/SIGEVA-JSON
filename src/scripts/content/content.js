currentUrl = window.location.href;
pubType = window.FINDEX[new URL(currentUrl).pathname];

const datosBasicosTd = document.querySelector('td.CformRowHeader');
if (datosBasicosTd && pubType !== undefined
    && !currentUrl.includes("action=Editar")) {
    const importButton = globalThis.createImportButton(pubType);
    datosBasicosTd.style.position = "relative"; // Necesario para la superposición
    datosBasicosTd.appendChild(importButton);
}

const guardarButton = document.querySelector('input[value="Modificar"]');
if (guardarButton && pubType !== undefined) {
    exportButton = globalThis.createExportButton(pubType);
    guardarButton.parentNode.insertBefore(exportButton, guardarButton.nextSibling);
    guardarButton.insertAdjacentHTML("afterend", " &nbsp; ");
}

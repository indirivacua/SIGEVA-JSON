currentUrl = window.location.href;
if (currentUrl.includes("bcoProduccionListaPublicacionCongreso")) {
    let datosBasicosTd = document.querySelector('td.CformRowHeader[colspan="10"]');
    if (datosBasicosTd && currentUrl.includes("action=Nuevo")) {
        let importButton = globalThis.createImportButton();
        datosBasicosTd.style.position = "relative"; // Necesario para la superposición
        datosBasicosTd.appendChild(importButton);
    }

    let guardarButton = document.querySelector('input[value="Modificar"]');
    if (guardarButton && currentUrl.includes("action=Editar")) {
        exportButton = globalThis.createExportButton();
        guardarButton.parentNode.insertBefore(exportButton, guardarButton.nextSibling);
        guardarButton.insertAdjacentHTML("afterend", " &nbsp; ");
    }
}

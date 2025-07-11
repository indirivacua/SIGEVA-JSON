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

chrome.storage.local.get(
    { institution: "1", password: "", autosubmit: true },
    (config) => {
        const hasValidationError = document.querySelector('.form-section-errors.alert-danger');
        if (hasValidationError || config.password === "") return;
        const labels = document.getElementsByClassName("CformNombre");
        if (!labels.length || labels[0].textContent !== "Institución:") return;
        document.getElementsByName("organizacion")[0].value = config.institution;
        const passwordField = document.getElementsByName("contrasenia")[0];
        passwordField.value = config.password;
        config.autosubmit && document.getElementsByName("btnSubmit")[0].click();
    },
);

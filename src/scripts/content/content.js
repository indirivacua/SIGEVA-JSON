const currentUrl = window.location.href;
const pubType = window.FINDEX[new URL(currentUrl).pathname];

const hasPrecargaButton = [...document.querySelectorAll('input[type="submit"][name="btnSubmit"]')]
    .some(btn => btn.value.toLowerCase().includes("precarga"));

const datosBasicosTd = document.querySelector('td.CformRowHeader');
if (datosBasicosTd && pubType !== undefined
    && !currentUrl.includes("action=Editar")) {
    const importButton = globalThis.createImportButton(pubType);
    datosBasicosTd.style.position = "relative"; // Necesario para la superposición
    datosBasicosTd.appendChild(importButton);
    hasPrecargaButton && (importButton.onclick = () => alert("Presiona el botón OMITIR"));
}

const guardarButton = document.querySelector('input[value="Modificar"]');
if (guardarButton && pubType !== undefined) {
    const exportButton = globalThis.createExportButton(pubType);
    guardarButton.parentNode.insertBefore(exportButton, guardarButton.nextSibling);
    guardarButton.insertAdjacentHTML("afterend", " &nbsp; ");
    hasPrecargaButton && (exportButton.onclick = () => alert("Presiona el botón EDITAR DATOS PRECARGADOS"));
}

chrome.storage.local.get(
    { institution: "1", password: "", autosubmit: true },
    (config) => {
        const hasValidationError = document.querySelector('.form-section-errors');
        if (hasValidationError || config.password === "") return;
        const labels = document.getElementsByClassName("CformNombre");
        if (!labels.length || labels[0].textContent !== "Institución:") return;
        document.getElementsByName("organizacion")[0].value = config.institution;
        const passwordField = document.getElementsByName("contrasenia")[0];
        passwordField.value = config.password;
        config.autosubmit && document.getElementsByName("btnSubmit")[0].click();
    },
);

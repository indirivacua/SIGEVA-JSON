const currentUrl = window.location.href;
const pubType = window.FINDEX[new URL(currentUrl).pathname];

const submitButtonQuery = 'input[type="submit"][name="btnSubmit"]';
const hasPrecargaButton = [...document.querySelectorAll(submitButtonQuery)]
    .some(btn => btn.value.toLowerCase().includes("precarga"));

const datosBasicosTd = document.querySelector('td.CformRowHeader');
if (datosBasicosTd && pubType !== undefined
    && !currentUrl.includes("action=Editar")) {
    const importButton = globalThis.createImportButton(pubType);
    datosBasicosTd.style.position = "relative"; // Necesario para la superposición
    datosBasicosTd.appendChild(importButton);
    hasPrecargaButton && (importButton.onclick = () =>
        { alertHighlightElement(submitButtonQuery + '[value="Omitir"]'); });
}

const guardarButton = document.querySelector('input[value="Modificar"]');
if (guardarButton && pubType !== undefined) {
    const exportButton = globalThis.createExportButton(pubType);
    guardarButton.parentNode.insertBefore(exportButton, guardarButton.nextSibling);
    guardarButton.insertAdjacentHTML("afterend", " &nbsp; ");
    hasPrecargaButton && (exportButton.onclick = () =>
        { alertHighlightElement(submitButtonQuery + '[value="Editar datos precargados"]'); });
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

function alertHighlightElement(query) {
    const element = document.querySelector(query);
    element.scrollIntoView({ behavior: "smooth", block: "center" });
    element.focus();
    element.classList.add("attention-highlight");
    alert(`PRESIONA: ${element.value.toUpperCase()}`)
    setTimeout(() => { element.classList.remove("attention-highlight"); }, 2000);
}

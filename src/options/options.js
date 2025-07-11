function saveOptions() {
    const institution = document.getElementById("institution").value;
    const password = document.getElementById("password").value;
    const autosubmit = document.getElementById("autosubmit").checked;

    chrome.storage.local.set({ institution, password, autosubmit }, () => {
        const status = document.getElementById("status");
        status.textContent = "Opciones guardadas.";
        setTimeout(() => {
            status.textContent = "";
        }, 1000);
    });
}

function restoreOptions() {
    chrome.storage.local.get(
        { institution: "1", password: "", autosubmit: true },
        (items) => {
            document.getElementById("institution").value = items.institution;
            document.getElementById("password").value = items.password;
            document.getElementById("autosubmit").checked = items.autosubmit;
        },
    );
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);

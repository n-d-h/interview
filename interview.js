const converter = new showdown.Converter();
const folderPath = "files/";

async function fetchMarkdownFiles() {
    try {
        const response = await fetch(folderPath);
        if (!response.ok) throw new Error("Could not access folder.");
        const text = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        const links = doc.querySelectorAll("a[href$='.md']");

        const fileSelect = document.getElementById("fileSelect");
        links.forEach(link => {
            let fileName = link.textContent.trim();

            // Chỉ lấy string filename trước `.md`
            fileName = fileName.split('.md')[0] + '.md';

            const option = document.createElement("option");
            option.value = fileName;
            option.textContent = fileName;
            fileSelect.appendChild(option);
        });

    } catch (error) {
        console.error("Error fetching files:", error);
    }
}

async function loadMarkdown() {
    const file = document.getElementById("fileSelect").value;
    if (!file) return;

    try {
        const response = await fetch(`${folderPath}${file}`);
        const text = await response.text();
        document.getElementById("content").innerHTML = converter.makeHtml(text);
    } catch (error) {
        console.error("Error loading file:", error);
    }
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}


const converter = new showdown.Converter();
const folderPath = "files/";

// async function fetchMarkdownFiles() {
//     try {
//         // const response = await fetch(folderPath);
//         // if (!response.ok) throw new Error("Could not access folder.");
//         // const text = await response.text();

//         // const parser = new DOMParser();
//         // const doc = parser.parseFromString(text, "text/html");
//         // const links = doc.querySelectorAll("a[href$='.md']");

//         // const fileSelect = document.getElementById("fileSelect");
//         // links.forEach(link => {
//         //     let fileName = link.textContent.trim();

//         //     // Chỉ lấy string filename trước `.md`
//         //     fileName = fileName.split('.md')[0] + '.md';

//         //     const option = document.createElement("option");
//         //     option.value = fileName;
//         //     option.textContent = fileName;
//         //     fileSelect.appendChild(option);
//         // });

//     } catch (error) {
//         console.error("Error fetching files:", error);
//     } finally {
//         document.querySelector(".loading").style.display = "none";
//     }
// }


async function fetchMarkdownFiles() {
    try {
        document.querySelector(".loading").style.display = "flex";

        const response = await fetch('https://api.github.com/repos/n-d-h/interview/contents/files');
        if (!response.ok) throw new Error("Could not access folder.");

        const files = await response.json();
        const fileSelect = document.getElementById("fileSelect");
        fileSelect.innerHTML = "<option value=''>Select a file</option>";

        files.forEach(file => {
            if (file.name.endsWith(".md")) {
                const option = document.createElement("option");
                option.value = file.download_url;
                option.textContent = file.name.split('.md')[0];
                fileSelect.appendChild(option);
            }
        });
    } catch (error) {
        console.error("Error fetching files:", error);
    } finally {
        document.querySelector(".loading").style.display = "none";
    }
}

async function loadMarkdown(markdownFile) {
    document.querySelector(".loading").style.display = "flex";
    const file = markdownFile || document.getElementById("fileSelect").value;

    if (!file) {
        document.querySelector(".loading").style.display = "none";
        return;
    }

    if (!file.startsWith("https")) {
        file = `https://raw.githubusercontent.com/n-d-h/interview/main/files/${markdownFile}.md`;
    }

    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error("Failed to load markdown file.");

        const text = await response.text();
        document.getElementById("content").innerHTML = converter.makeHtml(text);
    } catch (error) {
        console.error("Error loading file:", error);
    } finally {
        document.querySelector(".loading").style.display = "none";
    }
}


function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}


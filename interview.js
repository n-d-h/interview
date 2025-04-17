const converter = new showdown.Converter({ tables: true, strikethrough: true, tasklists: true, ghCodeBlocks: true });
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

// async function fetchMarkdownFiles() {
//     try {
//         document.querySelector(".loading").style.display = "flex";

//         const response = await fetch('https://api.github.com/repos/n-d-h/interview/contents/files');
//         if (!response.ok) throw new Error("Could not access folder.");

//         const files = await response.json();
//         const fileList = document.getElementById("fileList");
//         fileList.innerHTML = "<h3>Files</h3>";

//         files.forEach(file => {
//             if (file.name.endsWith(".md")) {
//                 const btn = document.createElement("button");
//                 btn.textContent = file.name.split('.md')[0];
//                 btn.onclick = () => loadMarkdown(file.download_url);
//                 fileList.appendChild(btn);
//             }
//         });

//         // init file if no file selected
//         const introFile = files.find(file => file.name === "introduction.md");
//         if (introFile) {
//             loadMarkdown(introFile.download_url);
//         }

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
        const fileList = document.getElementById("fileList");
        fileList.innerHTML = "<h3>Files</h3>";

        // Handle top-level .md files
        for (const file of files) {
            if (file.type === "file" && file.name.endsWith(".md")) {
                const btn = document.createElement("button");
                btn.textContent = file.name.replace(".md", "");
                btn.onclick = () => loadMarkdown(file.download_url);
                fileList.appendChild(btn);
            }

            // Handle folders
            if (file.type === "dir") {
                const folderWrapper = document.createElement("div");
                folderWrapper.classList.add("folder-wrapper");

                const toggleBtn = document.createElement("button");
                toggleBtn.classList.add("folder-toggle");
                toggleBtn.textContent = `📂 ${file.name}`;
                toggleBtn.onclick = () => {
                    const content = folderWrapper.querySelector(".folder-content");
                    content.style.display = content.style.display === "none" ? "block" : "none";
                };

                const folderContent = document.createElement("div");
                folderContent.classList.add("folder-content");
                folderContent.style.display = "none";

                folderWrapper.appendChild(toggleBtn);
                folderWrapper.appendChild(folderContent);
                fileList.appendChild(folderWrapper);

                // Fetch files inside the folder
                const folderRes = await fetch(file.url);
                if (!folderRes.ok) continue;
                const childFiles = await folderRes.json();

                childFiles.forEach(child => {
                    if (child.name.endsWith(".md")) {
                        const childBtn = document.createElement("button");
                        childBtn.textContent = child.name.replace(".md", "");
                        childBtn.onclick = () => loadMarkdown(child.download_url);
                        folderContent.appendChild(childBtn);
                    }
                });
            }
        }

        // Load intro if exists
        const intro = files.find(f => f.name === "introduction.md");
        if (intro) {
            loadMarkdown(intro.download_url);
        }

    } catch (err) {
        console.error("Error fetching files:", err);
    } finally {
        document.querySelector(".loading").style.display = "none";
    }
}



function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const menuButton = document.querySelector('.menu-toggle');
    sidebar.classList.toggle('hidden');
    menuButton.classList.toggle('active');
    menuButton.innerHTML = sidebar.classList.contains('hidden') ? '☰' : '✖';
}

function hideSidebar(event) {
    const sidebar = document.querySelector('.sidebar');
    const menuButton = document.querySelector('.menu-toggle');
    if (sidebar.classList.contains('hidden')) return;
    if (event.target === menuButton) return;
    if (!sidebar.contains(event.target) && !menuButton.contains(event.target)) {
        toggleSidebar();
    }
}

async function loadMarkdown(markdownFile) {
    document.querySelector(".loading").style.display = "flex";

    let fileUrl = markdownFile;

    if (!fileUrl) {
        document.querySelector(".loading").style.display = "none";
        return;
    }

    // If not full GitHub raw URL, construct it
    if (!fileUrl.startsWith("https://")) {
        fileUrl = `https://raw.githubusercontent.com/n-d-h/interview/main/files/${markdownFile}.md`;
    }

    try {
        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error("Failed to load markdown file.");

        const text = await response.text();

        document.getElementById("content").innerHTML = converter.makeHtml(text);

        // Highlight code blocks
        document.querySelectorAll("pre code").forEach(block => {
            hljs.highlightElement(block);
        });

    } catch (error) {
        console.error("Error loading file:", error);
        document.getElementById("content").innerHTML = `<p style="color: red;">⚠️ ${error.message}</p>`;
    } finally {
        document.querySelector(".loading").style.display = "none";
    }
}


// async function loadMarkdown(markdownFile) {
//     document.querySelector(".loading").style.display = "flex";
//     const file = markdownFile;

//     if (!file) {
//         document.querySelector(".loading").style.display = "none";
//         return;
//     }

//     if (!file.startsWith("https")) {
//         file = `https://raw.githubusercontent.com/n-d-h/interview/main/files/${markdownFile}.md`;
//     }

//     try {
//         const response = await fetch(file);
//         if (!response.ok) throw new Error("Failed to load markdown file.");

//         const text = await response.text();
//         document.getElementById("content").innerHTML = converter.makeHtml(text);
//         document.querySelectorAll('pre code').forEach((block) => {
//             hljs.highlightElement(block);
//         });
//     } catch (error) {
//         console.error("Error loading file:", error);
//     } finally {
//         document.querySelector(".loading").style.display = "none";
//     }
// }


function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}




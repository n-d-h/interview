const converter = new showdown.Converter({ tables: true, strikethrough: true, tasklists: true, ghCodeBlocks: true });

async function fetchMarkdownFiles() {
    try {
        document.querySelector(".loading").style.display = "flex";

        const response = await fetch("fileStructure.json");
        if (!response.ok) throw new Error("Could not load local structure.");
        const files = await response.json();

        const fileList = document.getElementById("fileList");
        fileList.innerHTML =
            `<div class="sidebar-header">
                <h3>Files</h3>
                <button type="button" onclick="toggleSidebar()">❌</button>
            </div>`;

        const singleFile = document.createElement("div");
        singleFile.classList.add("single-file");
        for (const file of files) {
            if (file.type === "file") {
                const btn = document.createElement("button");
                btn.textContent = file.name.replace(".md", "");
                btn.onclick = () => {
                    loadMarkdown(file.path);
                    const activeBtn = fileList.querySelector(".active-file");
                    activeBtn && activeBtn.classList.remove("active-file");
                    const openFolder = fileList.querySelector(".open");
                    openFolder && openFolder.classList.remove("open");
                    btn.classList.add("active-file");
                };
                if (file.name === "1. Introduction.md") {
                    btn.classList.add("active-file");
                }
                singleFile.appendChild(btn);
                if (!fileList.contains(singleFile)) {
                    fileList.appendChild(singleFile);
                }
            }

            if (file.type === "dir") {
                const folderWrapper = document.createElement("div");
                folderWrapper.classList.add("folder-wrapper");

                const toggleBtn = document.createElement("button");
                toggleBtn.classList.add("folder-toggle");
                toggleBtn.innerHTML = `📂 ${file.name}`;
                toggleBtn.onclick = () => {
                    const content = folderWrapper.querySelector(".folder-content");
                    const isOpen = content.style.display === "block";
                    content.style.display = isOpen ? "none" : "block";
                };

                const folderContent = document.createElement("div");
                folderContent.classList.add("folder-content");
                folderContent.style.display = "none";

                file.children.forEach(child => {
                    const childBtn = document.createElement("button");
                    childBtn.innerHTML = `<li>${child.name.replace(".md", "")}</li>`;
                    childBtn.onclick = () => {
                        loadMarkdown(child.path);
                        const activeBtn = fileList.querySelector(".active-file");
                        activeBtn && activeBtn.classList.remove("active-file");
                        childBtn.classList.add("active-file");
                        const openFolder = fileList.querySelector(".open");
                        openFolder && openFolder.classList.remove("open");
                        toggleBtn.classList.add("open");
                    }
                    folderContent.appendChild(childBtn);
                });

                folderWrapper.appendChild(toggleBtn);
                folderWrapper.appendChild(folderContent);
                fileList.appendChild(folderWrapper);
            }
        }

        // add footer to fileList
        const footer = document.createElement("div");
        footer.classList.add("sidebar-footer");
        fileList.appendChild(footer);
        const intro = files.find(f => f.name === "1. Introduction.md");
        if (intro) loadMarkdown(intro.path);

    } catch (err) {
        console.error("Error fetching local files:", err);
    } finally {
        document.querySelector(".loading").style.display = "none";
    }
}



// async function fetchMarkdownFiles() {
//     try {
//         document.querySelector(".loading").style.display = "flex";

//         const response = await fetch('https://api.github.com/repos/n-d-h/interview/contents/files');
//         if (!response.ok) throw new Error("Could not access folder.");

//         const files = await response.json();
//         const fileList = document.getElementById("fileList");
//         fileList.innerHTML = "<h3>Files</h3>";

//         // Handle top-level .md files
//         for (const file of files) {
//             if (file.type === "file" && file.name.endsWith(".md")) {
//                 const btn = document.createElement("button");
//                 btn.textContent = file.name.replace(".md", "");
//                 btn.onclick = () => loadMarkdown(file.download_url);
//                 fileList.appendChild(btn);
//             }

//             // Handle folders
//             if (file.type === "dir") {
//                 const folderWrapper = document.createElement("div");
//                 folderWrapper.classList.add("folder-wrapper");

//                 const toggleBtn = document.createElement("button");
//                 toggleBtn.classList.add("folder-toggle");
//                 toggleBtn.textContent = `${file.name} <i class="fa-solid fa-chevron-right"></i>`;
//                 toggleBtn.onclick = () => {
//                     const content = folderWrapper.querySelector(".folder-content");
//                     const isOpen = content.style.display === "block";
//                     content.style.display = isOpen ? "none" : "block";
//                     toggleBtn.textContent = `${isOpen ? '<i class="fa-solid fa-chevron-down"></i>' : '<i class="fa-solid fa-chevron-right"></i>'} `;
//                 };

//                 const folderContent = document.createElement("div");
//                 folderContent.classList.add("folder-content");
//                 folderContent.style.display = "none";

//                 folderWrapper.appendChild(toggleBtn);
//                 folderWrapper.appendChild(folderContent);
//                 fileList.appendChild(folderWrapper);

//                 // Fetch child files
//                 const folderRes = await fetch(file.url);
//                 if (!folderRes.ok) continue;
//                 const childFiles = await folderRes.json();

//                 childFiles.forEach(child => {
//                     if (child.name.endsWith(".md")) {
//                         const childBtn = document.createElement("button");
//                         childBtn.textContent = child.name.replace(".md", "");
//                         childBtn.onclick = () => loadMarkdown(child.download_url);
//                         folderContent.appendChild(childBtn);
//                     }
//                 });
//             }

//         }

//         // Load intro if exists
//         const intro = files.find(f => f.name === "1. Introduction.md");
//         if (intro) {
//             loadMarkdown(intro.download_url);
//         }

//     } catch (err) {
//         console.error("Error fetching files:", err);
//     } finally {
//         document.querySelector(".loading").style.display = "none";
//     }
// }



function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const menuButton = document.querySelector('.menu-toggle');
    sidebar.classList.toggle('hidden');
    menuButton.classList.toggle('active');
    menuButton.innerHTML = sidebar.classList.contains('hidden') ? '☰' : '✖';
    document.body.classList.toggle('no-scroll', menuButton.classList.contains('active'));
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

// async function loadMarkdown(markdownFile) {
//     document.querySelector(".loading").style.display = "flex";

//     let fileUrl = markdownFile;

//     if (!fileUrl) {
//         document.querySelector(".loading").style.display = "none";
//         return;
//     }

//     // If not full GitHub raw URL, construct it
//     if (!fileUrl.startsWith("https://")) {
//         fileUrl = `https://raw.githubusercontent.com/n-d-h/interview/main/files/${markdownFile}.md`;
//     }

//     try {
//         const response = await fetch(fileUrl);
//         if (!response.ok) throw new Error("Failed to load markdown file.");

//         const text = await response.text();

//         document.getElementById("content").innerHTML = converter.makeHtml(text);

//         // Highlight code blocks
//         document.querySelectorAll("pre code").forEach(block => {
//             hljs.highlightElement(block);
//         });

//     } catch (error) {
//         console.error("Error loading file:", error);
//         document.getElementById("content").innerHTML = `<p style="color: red;">⚠️ ${error.message}</p>`;
//     } finally {
//         document.querySelector(".loading").style.display = "none";
//     }
// }

async function loadMarkdown(markdownFile) {
    document.querySelector(".loading").style.display = "flex";

    if (!markdownFile) {
        document.querySelector(".loading").style.display = "none";
        return;
    }

    try {
        const response = await fetch(markdownFile);
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
        if  (window.innerWidth < 768) {
            toggleSidebar();
        }
    }
}



function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}




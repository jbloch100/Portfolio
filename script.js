document.addEventListener("DOMContentLoaded", function() {
    const githubUsername = "jbloch100"; // Update with your GitHub username
    const githubReposContainer = document.getElementById("github-repos");

    fetch(`https://api.github.com/users/${githubUsername}/repos`)
        .then(response => response.json())
        .then(repos => {
            if (Array.isArray(repos)) {
                repos.forEach(repo => {
                    const repoName = repo.name;
                    const repoUrl = repo.html_url;

                    // Fetch README content
                    fetch(`https://raw.githubusercontent.com/${githubUsername}/${repoName}/main/README.md`)
                        .then(response => response.text())
                        .then(readmeContent => {
                            const description = readmeContent.split("\n")[0] || "No description available.";
                            const repoElement = document.createElement("div");
                            repoElement.classList.add("project");
                            repoElement.innerHTML = `
                                <h3><a href="${repoUrl}" target="_blank" rel="noopener noreferrer">${repoName}</a></h3>
                                <p>${description}</p>
                            `;
                            githubReposContainer.appendChild(repoElement);
                        })
                        .catch(() => {
                            const repoElement = document.createElement("div");
                            repoElement.classList.add("project");
                            repoElement.innerHTML = `
                                <h3><a href="${repoUrl}" target="_blank" rel="noopener noreferrer">${repoName}</a></h3>
                                <p>No description available.</p>
                            `;
                            githubReposContainer.appendChild(repoElement);
                        });
                });
            }
        })
        .catch(error => console.error("Error fetching GitHub repositories:", error));
});
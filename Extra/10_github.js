const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

const profileImg = document.getElementById('profile-img');
const profileName = document.getElementById('profile-name');
const profileUsername = document.getElementById('profile-username');
const profileId = document.getElementById('profile-id');

const repositories = document.getElementById('repositories');

async function fetchGitHubProfile() {
    const username = searchInput.value.trim();
    if (!username) 
    {
        profileName.textContent = 'Enter a username';
        profileUsername.textContent = '';
        profileId.textContent = '';
        profileImg.src = '';

        repositories.innerHTML = `<p class="repo-placeholder">Search for a GitHub user</p>`;
        return;
    }


    try 
    {
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok)
            throw new Error('User not found');

        const userData = await userResponse.json();

        profileImg.src = userData.avatar_url;
        profileName.textContent = userData.name || userData.login;
        profileUsername.textContent = `@${userData.login}`;
        profileId.textContent = `ID: ${userData.id}`;

        const repoResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=8`);

        if (!repoResponse.ok)
            throw new Error('Could not fetch repositories');

        const repoData = await repoResponse.json();
        repositories.innerHTML = '';

        if (repoData.length === 0)
        {
            repositories.innerHTML = `<p class="repo-placeholder">No public repositories found.</p>`;
            return;
        }


        repoData.slice(0, 8).forEach(repo => {
            const repoElement = document.createElement('div');
            repoElement.classList.add('repository');
            const description = repo.description || 'No description';
            const language = repo.language || 'Unknown';

            repoElement.innerHTML = 
            `<div class="repository-name">${repo.name}</div>
             <div class="repository-description">${description}</div>
             <span class="repository-language">${language}</span>
            `;

            repositories.appendChild(repoElement);
        });
    } catch (error) {
        console.error(error);
        profileImg.src = '';
        profileName.textContent = 'User not found';
        profileUsername.textContent = '';
        profileId.textContent = '';

        repositories.innerHTML = `<p class="repo-placeholder">Could not find this GitHub user.</p>`;
    }
}

searchButton.addEventListener('click', fetchGitHubProfile);
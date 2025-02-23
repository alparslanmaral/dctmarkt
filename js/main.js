// main.js
document.addEventListener("DOMContentLoaded", function() {
    fetch('data/players.json')
        .then(response => response.json())
        .then(players => {
            const teams = new Set(players.map(player => player.team_code)); // Takım kodlarını alıyoruz

            const teamsSection = document.getElementById("teams");
            teams.forEach(teamCode => {
                const teamCard = document.createElement("div");
                teamCard.classList.add("team-card");
                teamCard.innerHTML = `
                    <img src="assets/images/${teamCode}.webp" alt="${teamCode}">
                    <h3>${teamCode}</h3>
                    <a href="team.html?team=${teamCode}">Oyuncuları Görüntüle</a>
                `;
                teamsSection.appendChild(teamCard);
            });
        })
        .catch(error => console.error('Veri alınırken bir hata oluştu:', error));
});

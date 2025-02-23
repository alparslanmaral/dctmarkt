// team.js
document.addEventListener("DOMContentLoaded", function() {
    const teamId = new URLSearchParams(window.location.search).get('team');
    fetch('data/players.json')
        .then(response => response.json())
        .then(players => {
            const teamPlayers = players.filter(player => player.team_code === teamId);

            const teamDetailsSection = document.getElementById("team-details");
            if (teamPlayers.length > 0) {
                teamPlayers.forEach(player => {
                    const playerCard = document.createElement("div");
                    playerCard.classList.add("player-card");
                    playerCard.innerHTML = `
                        <img src="assets/images/${player.player_code}.webp" alt="${player.name}">
                        <h3>${player.name}</h3>
                        <p>Mevki: ${player.position}</p>
                        <p>Rating: ${player.rating}</p>
                        <a href="player.html?player=${player.player_code}">Detayları Görüntüle</a>
                    `;
                    teamDetailsSection.appendChild(playerCard);
                });
            } else {
                teamDetailsSection.innerHTML = "<p>Bu takıma ait oyuncu bulunamadı.</p>";
            }
        })
        .catch(error => console.error('Veri alınırken bir hata oluştu:', error));
});

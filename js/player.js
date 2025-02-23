document.addEventListener("DOMContentLoaded", function () {
    const playerCode = new URLSearchParams(window.location.search).get("player");

    fetch("data/players.json")
        .then(response => response.json())
        .then(players => {
            const player = players.find(p => p.player_code === playerCode);

            // HTML elemanlarını kontrol et (hata almamak için)
            const playerImageDiv = document.getElementById("player-image");
            const playerInfoDiv = document.getElementById("player-info");
            const playerRatingDiv = document.getElementById("player-rating");

            if (!playerImageDiv || !playerInfoDiv || !playerRatingDiv) {
                console.error("Gerekli HTML elemanları bulunamadı!");
                return;
            }

            if (player) {
                // JSON'daki doğum tarihi "17 Mart 1986" formatında olduğundan, bunu Date formatına çevirelim
                const months = {
                    "Ocak": 0, "Şubat": 1, "Mart": 2, "Nisan": 3, "Mayıs": 4, "Haziran": 5,
                    "Temmuz": 6, "Ağustos": 7, "Eylül": 8, "Ekim": 9, "Kasım": 10, "Aralık": 11
                };

                const birthParts = player.birth_date.split(" ");
                const birthDate = new Date(
                    parseInt(birthParts[2]), 
                    months[birthParts[1]], 
                    parseInt(birthParts[0])
                );

                // Yaşı hesapla
                const today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();
                if (today.getMonth() < birthDate.getMonth() || 
                   (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
                    age--;
                }

                playerImageDiv.innerHTML = `
                    <img src="assets/images/${player.player_code}.webp" alt="${player.name}">
                `;

                playerInfoDiv.innerHTML = `
                    <h2>${player.name}</h2>
                    <p>Yaş: ${age}</p>
                    <p>Boy: ${player.height} cm</p>
                    <p>Mevki: ${player.position}</p>
                    <p>Piyasa Değeri: ${player.market_value} M€</p>
                `;

                playerRatingDiv.innerHTML = `
                    <div class="rating-box">
                        <h1>${player.rating}</h1>
                        <p>Hız: ${player.pace}</p>
                        <p>Şut: ${player.shooting}</p>
                        <p>Pas: ${player.passing}</p>
                        <p>Dripling: ${player.dribbling}</p>
                        <p>Defans: ${player.defense}</p>
                        <p>Fizik: ${player.physical}</p>
                    </div>
                `;
            } else {
                document.getElementById("player-container").innerHTML = "<p>Oyuncu bulunamadı.</p>";
            }
        })
        .catch(error => console.error("Veri alınırken hata oluştu:", error));
});

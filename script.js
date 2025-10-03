window.onload = () => {
    gsap.from(".container", {
        y: -80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    });
    gsap.from("h1", {
        scale: 0.7,
        opacity: 0,
        delay: 0.5,
        duration: 0.8,
        ease: "back.out(1.7)"
    });
    gsap.from(".controls, .text-analysis", {
        y: 40,
        opacity: 0,
        delay: 0.8,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });
};
document.addEventListener('DOMContentLoaded', function() {
    
    
const API_KEY = "AIzaSyAPyn6lH8xXXjB1nx6YK-w5mwlgoSdglqM"; // <-- API key must be in quotes

document.getElementById("generatePlaylist").onclick = async function () {
    const mood = document.getElementById("mood").value;
    const playlistDiv = document.getElementById("playlist");
    playlistDiv.innerHTML = "Loading...";

    // Map moods to search queries
    const moodQueries = {
        happy: "happy songs playlist",
        sad: "sad songs playlist",
        energetic: "energetic songs playlist",
        relax: "relaxing music playlist"
    };

    const query = moodQueries[mood] || "music playlist";

    try {
        const res = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(query)}&key=${API_KEY}`
        );
        const data = await res.json();

        if (data.items && data.items.length > 0) {
            playlistDiv.innerHTML = data.items
                .map(
                    (item) => `
                    <div style="margin-bottom:16px;">
                        <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">
                            <img src="${item.snippet.thumbnails.medium.url}" alt="${item.snippet.title}" style="border-radius:8px;width:100%;max-width:320px;">
                            <div style="margin-top:8px;font-weight:600;">${item.snippet.title}</div>
                        </a>
                    </div>
                `
                )
                .join("");
        } else {
            playlistDiv.innerHTML = "No results found.";
        }
    } catch (err) {
        playlistDiv.innerHTML = "Error fetching playlist.";
    }
};

    document.getElementById("analyzeText").onclick = function() {
        // Your analyzeText logic here
        alert("Analyze Text button clicked! (Add your logic here)");
    };
});
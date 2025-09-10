---
title: "MP4 Downloader"
date: "2025-09-10"
slug: "mp4-downloader"
---


```javascript
// Function to download all .mp4 files from <video> elements on the current page
function downloadMP4sFromVideos() {
    // Select all video elements on the page
    const videos = document.querySelectorAll('video[src$=".mp4"]');
    
    // Check if there are any video elements with .mp4 sources
    if (videos.length === 0) {
        console.log("No .mp4 files found in video elements on this page.");
        return;
    }

    // Loop through each video element and create a download
    videos.forEach(video => {
        const url = video.src;
        const a = document.createElement('a');
        a.href = url;
        a.download = url.split('/').pop(); // Set the download attribute to the file name
        document.body.appendChild(a);
        a.click(); // Trigger the download
        document.body.removeChild(a); // Clean up
    });

    console.log(`${videos.length} .mp4 file(s) downloaded from video elements.`);
}

// Call the function to download .mp4 files from video elements
downloadMP4sFromVideos();

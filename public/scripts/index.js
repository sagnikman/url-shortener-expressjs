document.getElementById('reset-button').addEventListener('click', function () {
    window.location.href = '/';
});


const copyButton = document.getElementById("copyButton");

if(copyButton) {
    copyButton.addEventListener("click", function () {
        const shortUrlTag = document.getElementById("short-url-link");
        const shortUrl = shortUrlTag.href;
        navigator.clipboard.writeText(shortUrl)
        .then(() => {
            copyButton.classList.add("clicked");
            setTimeout(() => {
                copyButton.classList.remove("clicked");
            }, 250);
        })
        .catch(err => {
            copyButton.classList.add("error");
            setTimeout(() => {
                copyButton.classList.remove("error");
            }, 250);
        })
    });
}





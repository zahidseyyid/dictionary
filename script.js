document.addEventListener("DOMContentLoaded", function () {
    const playIcon = document.getElementById("playIcon");
    const searchInput = document.getElementById("searchInput");
    const hiddenBox = document.getElementById("hiddenBox");
    const searchButton = document.getElementById("searchButton"); 
    const card = document.getElementById("result");
    const container = document.getElementById("container");

    playIcon.addEventListener("click", function () {
        playIcon.style.display = "none";
        hiddenBox.style.display = "block";
        searchInput.style.width = "400px";
    });

    searchInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            container.style.minHeight = "20vh";
            search();
        }
    });

    searchButton.addEventListener("click", () => {
        const newWord = searchInput.value.trim(); 
        if (newWord !== "") {
            container.style.minHeight = "20vh";
            search();
        }
    });


    function search() {
        const newWord = searchInput.value.trim();
        if (newWord !== "") {
            wordCheck(newWord);
        }
    }



    async function wordCheck(word) {
        var url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
    
        try {
            const responseDict = await fetch(url);
            const dataDict = await responseDict.json();
    
            // Api data çekme başlangıç
    
            var wordResponse = dataDict[0].word;  // Kelime
            var wordMeaning = dataDict[0].meanings[0].partOfSpeech; // Kelimenin cümledeki anlamı
            var readingWord = dataDict[0].phonetics[0].text; // Okunuşu
            var audio = dataDict[0].phonetics[0].audio; // Okunuşun ses dosyası
            var definition = dataDict[0].meanings[0].definitions[0].definition; // Kelimenin anlamı
            var synonyms = dataDict[0].meanings[0].definitions[0].synonyms; // Kelimenin eş anlamlıları
            var antonyms = dataDict[0].meanings[0].definitions[0].antonyms; // Kelimenin zıt anlamlıları
            var example = dataDict[0].meanings[0].definitions[0].example; // Kelimenin örneği
            
            // Api data çekme bitiş
    
            card.style.display = "block";
            // Burada kelimenin bilgilerini doldurabilirsiniz.
            document.getElementById("word").textContent = wordResponse;
            document.getElementById("meaning").textContent = wordMeaning;
            document.getElementById("readingWord").textContent = readingWord;
            document.getElementById("audio").src = audio;
            document.getElementById("definition").textContent = definition;
            document.getElementById("synonyms").textContent =  synonyms;
            document.getElementById("antonyms").textContent =  antonyms;
            document.getElementById("example").textContent = example;
    
    
        } catch (error) {
            console.error("API isteği sırasında bir hata oluştu: " + error);
        }
    
    
    }

});









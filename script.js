// Function to find Ayah from the API
function findAya() {
  // Get Surah and Ayah numbers from the input fields
  let suraNumber = document.getElementById('suraNumber').value;
  let ayaNumber = document.getElementById('ayaNumber').value;

  // If either value is empty, display an error
  if (!suraNumber || !ayaNumber) {
    document.getElementById('result').innerHTML = 'Please enter both Surah and Ayah numbers.';
    return;
  }

  // API URLs to fetch the Ayah and its translation
  let ayahUrl = `https://api.alquran.cloud/v1/ayah/${suraNumber}:${ayaNumber}`;
  let translationUrl = `https://api.alquran.cloud/v1/ayah/${suraNumber}:${ayaNumber}/en.sahih`;

  // Fetch Ayah data from the API
  fetch(ayahUrl)
    .then(response => response.json())
    .then(ayahData => {
      if (ayahData.code === 200) {
        // Extract necessary details from the response
        let suraName = ayahData.data.surah.name;
        let suraNumber = ayahData.data.surah.number;
        let ayaNumber = ayahData.data.numberInSurah;
        let ayaText = ayahData.data.text;

        // Fetch translation
        fetch(translationUrl)
          .then(transResponse => transResponse.json())
          .then(transData => {
            let translation = transData.data.text;

            // Display the results
            document.getElementById('result').innerHTML = `
              <strong>Surah Name:</strong> ${suraName}<br>
              <strong>Surah Number:</strong> ${suraNumber}<br>
              <strong>Ayah Number:</strong> ${ayaNumber}<br>
              <strong>Ayah Text:</strong> ${ayaText}<br>
              <strong>Translation:</strong> ${translation}
            `;
          })
          .catch(() => {
            document.getElementById('result').innerHTML = 'Translation not found.';
          });
      } else {
        document.getElementById('result').innerHTML = 'Error fetching Ayah data.';
      }
    })
    .catch(() => {
      document.getElementById('result').innerHTML = 'Error fetching Ayah data.';
    });
}

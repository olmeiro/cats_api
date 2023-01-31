const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=3&&api_key=live_l5UFrA4tPIxU7gGVsqbu3fb8hp1oZ8TxlCmRNHldJE6diDWOggjbPd12xQGhDj8t'

async function reload() {
  const response = await fetch(API_URL)
  const data = await response.json()

  console.log(data)

  const img1 = document.getElementById('img1')
  const img2 = document.getElementById('img2')
  const img3 = document.getElementById('img3')

  img1.src = data[0].url
  img2.src = data[1].url
  img3.src = data[2].url
}

reload(); //primera img

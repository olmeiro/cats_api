const api_key =
  "live_l5UFrA4tPIxU7gGVsqbu3fb8hp1oZ8TxlCmRNHldJE6diDWOggjbPd12xQGhDj8t";

const api = axios.create({
  baseURL: "https://api.thecatapi.com/v1/",
  headers: { 'x-api-key': api_key }
});

const endpoints = {
  API_URL: "https://api.thecatapi.com/v1/images/search",
  API_URL_LIMIT: (limit = 4) =>
    `https://api.thecatapi.com/v1/images/search?limit=${limit}`,
  API_URL_KEY: (key, limit = 4) =>
    [
      "https://api.thecatapi.com/v1/images/search",
      `?limit=${limit}`,
      `&api_key=${key}`,
    ].join(""),
  API_URL_FAVORITES: `https://api.thecatapi.com/v1/favourites`,
  API_URL_FAVORITES_DELETE: (id) =>
    `https://api.thecatapi.com/v1/favourites/${id}`,
  URL_UPLOAD: `https://api.thecatapi.com/v1/images/upload`,
  URL_OWN_CATS: "https://api.thecatapi.com/v1/images/",
};

let HTTPStatus = [
  {
    number: 200,
    link: "https://t4.ftcdn.net/jpg/05/34/44/37/240_F_534443710_dLVbUS1MtquWRhdWQ0a1iN3M5aZpyLOq.jpg",
  },
  {
    number: 201,
    link: "https://t4.ftcdn.net/jpg/01/01/50/43/240_F_101504362_Y9uq3U32d3JdmyeWGFzU5aNCwUiLzkoO.jpg",
  },
  {
    number: 203,
    link: "https://www.onlinesolutionsgroup.de/wp-content/uploads/203-Non-Authoritative-Information-1000x600.jpg",
  },
  {
    number: 300,
    link: "https://www.onlinesolutionsgroup.de/wp-content/uploads/statuscode-300-multiple-choices-1.jpg",
  },
  {
    number: 307,
    link: "https://t4.ftcdn.net/jpg/02/38/85/91/240_F_238859191_dXYTC8lTaJ3nBpEYYI6UNaRjd3vTDNUh.jpg",
  },

  {
    number: 400,
    link: "https://as1.ftcdn.net/v2/jpg/01/35/88/24/1000_F_135882447_SeFbWwnJ7Ig5ZQ9mpG22NHBhs6L2fBVy.jpg",
  },

  {
    number: 401,
    link: "https://as1.ftcdn.net/v2/jpg/01/35/88/24/1000_F_135882440_5epLvLQRBM42f90SD8yyKQIPno03j5Ef.jpg",
  },

  {
    number: 403,
    link: "https://www.seokratie.de/wp-content/uploads/2022/06/AdobeStock_135882455-751x501.jpeg",
  },

  {
    number: 404,
    link: "https://www.onlinemarketingmonkey.be/wp-content/uploads/2022/05/Uitgelicht-404.jpg",
  },

  {
    number: 500,
    link: "https://as1.ftcdn.net/v2/jpg/01/35/88/24/1000_F_135882460_jMCfN05mhPOm2C8MvqvYym0e4qj5cKAC.jpg",
  },

  {
    number: 503,
    link: "https://as2.ftcdn.net/v2/jpg/03/61/45/09/1000_F_361450985_YulVwRLEJmn7S5cOVITufWX1czh9lGKA.jpg",
  },

  {
    number: 504,
    link: "https://t3.ftcdn.net/jpg/00/91/06/04/240_F_91060405_sqGYr6VG208sMURrSdSlPcay3ds1mlyV.jpg",
  },
];

const spanError = document.getElementById("error");

async function loadRandomCats() {
  const response = await fetch(endpoints.API_URL_LIMIT(4));
  const data = await response.json();

  console.log("random: ");
  console.log(data);

  if (response.status !== 200) {
    const error = HTTPStatus.find((item) => item.number === response.status);
    const imageStatus = document.createElement("img");
    imageStatus.className = "imageStatus";
    imageStatus.src = error.link;
    spanError.appendChild(imageStatus);
  } else {
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const img3 = document.getElementById("img3");
    const img4 = document.getElementById("img4");

    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    const btn3 = document.getElementById("btn3");
    const btn4 = document.getElementById("btn4");

    btn1.onclick = () => saveFavoriteCat(data[0].id);
    btn2.onclick = () => saveFavoriteCat(data[1].id);
    btn3.onclick = () => saveFavoriteCat(data[2].id);
    btn4.onclick = () => saveFavoriteCat(data[3].id);

    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
    img4.src = data[3].url;
  }
}

async function loadFavoritesCats() {
  const response = await fetch(endpoints.API_URL_FAVORITES, {
    headers: {
      "content-type": "application/json",
      "x-api-key": api_key,
    },
  });
  const data = await response.json();

  console.log("favorites:");
  console.log(data);

  if (response.status !== 200) {
    const error = HTTPStatus.find((item) => item.number === response.status);
    const imageStatus = document.createElement("img");

    imageStatus.className = "imageStatus";
    imageStatus.src = error.link;
    spanError.appendChild(imageStatus);
  } else {
    const sectionFavorites = document.getElementById("favoritesCats");
    sectionFavorites.innerHTML = "";
    data.forEach((cat) => {
      const article = document.createElement("article");
      const imageFavoriteCat = document.createElement("img");
      const buttonFavorite = document.createElement("button");
      const btnText = document.createTextNode("Sacar de favoritos");

      buttonFavorite.appendChild(btnText);
      buttonFavorite.setAttribute("data-id", `${cat.id}`);
      imageFavoriteCat.src = cat.image.url;
      buttonFavorite.onclick = () => deleteFavoriteCat(cat.id);

      article.appendChild(imageFavoriteCat);
      article.appendChild(buttonFavorite);
      sectionFavorites.appendChild(article);
    });
  }
}

async function saveFavoriteCat(id) {
  // const response = await fetch(endpoints.API_URL_FAVORITES, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json", "x-api-key": api_key },
  //   body: JSON.stringify({
  //     image_id: id,
  //   }),
  // });

  // console.log("SAVE:");
  // console.log(response);

  // if (response.status !== 200) {
  //   const error = HTTPStatus.find((item) => item.number === response.status);
  //   const imageStatus = document.createElement("img");

  //   imageStatus.className = "imageStatus";
  //   imageStatus.src = error.link;
  //   spanError.appendChild(imageStatus);
  // } else {
  //   console.log("Gato guardado con éxito.");
  //   loadFavoritesCats();
  // }

  //con Axios queda:
  const { status } = await api.post("/favourites", {
    image_id: id,
  });

  if (status !== 200) {
    const error = HTTPStatus.find((item) => item.number === status);
    const imageStatus = document.createElement("img");

    imageStatus.className = "imageStatus";
    imageStatus.src = error.link;
    spanError.appendChild(imageStatus);
  } else {
    console.log("Gato guardado con éxito.");
    loadFavoritesCats();
  }
}

async function deleteFavoriteCat(id) {
  const response = await fetch(endpoints.API_URL_FAVORITES_DELETE(id), {
    method: "DELETE",
    headers: { "Content-Type": "application/json", "x-api-key": api_key },
  });

  const data = await response.json();

  if (response.status !== 200) {
    const error = HTTPStatus.find((item) => item.number === response.status);
    const imageStatus = document.createElement("img");

    imageStatus.className = "imageStatus";
    imageStatus.src = error.link;
    spanError.appendChild(imageStatus);
  } else {
    console.log("GAto eliminado de favoritos.");
    loadFavoritesCats();
  }
}

const previewCat = document.getElementById("preview");
previewCat.src = "./poo-solid.svg";

async function uploadCatPhoto() {
  const form = document.getElementById("uploadingForm");
  const formData = new FormData(form);

  // console.log("formData", formData.get("file"));

  // const response = await fetch(endpoints.URL_UPLOAD, {
  //   method: "POST",
  //   headers: {
  //     "x-api-key": api_key,
  //   },
  //   body: formData,
  // });

  // const data = await response.json();

  // if (response.status > 299) {
  //   const error = HTTPStatus.find((item) => item.number === response.status);
  //   const imageStatus = document.createElement("img");

  //   imageStatus.className = "imageStatus";
  //   imageStatus.src = error.link;
  //   spanError.appendChild(imageStatus);
  // } else if (response.status === 201) {
  //   console.log("Foto de michi cargada :)");
  //   console.log({ data });
  //   console.log(data.url);
  //   saveFavoriteCat(data.id); //para agregar el michi cargado a favoritos.
  //   loadFavoritesCats();
  // }

  //con Axios:
  const { data, status } = await api.post('images/upload', {
    data: formData
  })

  if (status !== 201) {
    const error = HTTPStatus.find((item) => item.number === response.status);
    const imageStatus = document.createElement("img");

    imageStatus.className = "imageStatus";
    imageStatus.src = error.link;
    spanError.appendChild(imageStatus);
  } else {
    console.log("Foto de michi cargada :)");
    console.log({ data });
    console.log(data.url);
    saveFavoriteCat(data.id); //para agregar el michi cargado a favoritos.
    loadFavoritesCats();
  }
}

const previewImage = () => {
  const file = document.getElementById("file").files;
  console.log(file);
  if (file.length > 0) {
    const fileReader = new FileReader();

    fileReader.onload = function (e) {
      document.getElementById("preview").setAttribute("src", e.target.result);
    };
    fileReader.readAsDataURL(file[0]);
  }
};

loadRandomCats();
loadFavoritesCats();

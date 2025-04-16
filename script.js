// Gestion du bouton burger
const burgerButton = document.querySelector(".burger-button");
const main = document.querySelector(".nav-main");
const typeList = document.querySelectorAll(".type");

burgerButton.addEventListener("click", () => {
  burgerButton.classList.toggle("clicked");
  main.classList.toggle("true");
  setTimeout(() => {
    for (let i = 0; i < typeList.length; i++) {
      typeList[i].style.transitionDelay = `${(i * 1) / 10}s`;
      typeList[i].classList.toggle("show");
    }
  }, 500);
});

// Index aléatoire
function randomSelector(max) {
  let random = Math.random();
  let randomNumber = Math.floor(random * max);
  return randomNumber;
}

// classement des données dans dataCenter
const dataCenter = {
  amour: loveData,
  passion: passionData,
  loisir: loisirData,
  amitié: amitieData,
  temps: tempsData,
  bonheur: bonheurData,
  sagesse: sagesseData,
  nature: natureData,
  réussite: reussiteData,
  liberté: liberteData,
};

const typeDefinition = {
  amour:
    "L’amour est un sentiment profond d’affection et d’attachement envers une personne, un animal, une idée ou même un objet. Il peut être romantique, familial, amical ou universel.",
  passion:
    "La passion est une émotion intense ou un enthousiasme débordant pour une activité, une personne ou une cause. Elle peut être créative, motivante, mais parfois exigeante.",
  loisir:
    "Un loisir est une activité pratiquée pendant le temps libre pour se détendre, s’amuser ou développer un intérêt personnel.",
  amitié:
    "L’amitié est une relation sincère et bienveillante entre deux personnes basée sur la confiance, le respect mutuel et le partage.",
  temps:
    "Le temps est une dimension fondamentale dans laquelle se déroulent les événements et les changements. C'est aussi une ressource précieuse qui structure la vie.",
  bonheur:
    "Le bonheur est un état d’épanouissement et de satisfaction profonde, souvent lié à des expériences positives et au bien-être.",
  sagesse:
    "La sagesse est la capacité d’utiliser l’expérience, le jugement et la connaissance pour prendre des décisions réfléchies et équilibrées.",
  nature:
    "La nature englobe tout ce qui existe indépendamment de l’action humaine, incluant les plantes, les animaux, les paysages, et les forces naturelles.",
  réussite:
    "La réussite est l’accomplissement d’objectifs ou de projets qui apportent une satisfaction personnelle ou sociale.",
  liberté:
    "La liberté est le pouvoir ou le droit d’agir, de parler ou de penser sans contrainte, dans le respect des autres et de soi-même.",
};

// Sélecteurs
const citationPlace = document.querySelector("#quote-content");
const authorPlace = document.querySelector("#author");
const refreshButton = document.querySelector("#actualiser");
const typeContainer = document.querySelector("#type-container");
const bgcolorList = [
  "linear-gradient(135deg, #ff5d5d 50%, #e01f1f 50%)",
  "linear-gradient(135deg, #8B0000 50%, #FF4500 50%)",
  "linear-gradient(135deg, #344A5E 50%, #4F6367 50%)",
  "linear-gradient(135deg, #2D4059 50%, #1C7293 50%)",
  "linear-gradient(135deg, #2C3E50 50%, #5A6E73 50%)",
  "linear-gradient(135deg, #214C39 50%, #F0C808 50%)",
  "linear-gradient(135deg, #1B263B 50%, #5C6784 50%)",
  "linear-gradient(135deg, #004B49 50%, #3B945E 50%)",
  "linear-gradient(135deg, #1F2833 50%, #45A29E 50%)",
  "linear-gradient(135deg, #0F2027 50%, #2C5364 50%)",
];
const quoteMain = document.querySelector(".quote-main");
let title = "amour";
let data = dataCenter[title.toLowerCase()];
const quoteDefinition = document.querySelector(".definition-place");
const definitionTitle = document.querySelectorAll(".definition-title");
const imageRepresentationSection = document.querySelector(
  ".image-representation"
);
const imageRepresentation = document.querySelector(".image-representation>img");
const definitionContainer = document.querySelectorAll(".container>p");

// Amour définit par défaut
typeList[0].classList.add("active");

// Mise à jour des catégories
typeList.forEach((type, index) => {
  type.addEventListener("click", () => {
    quoteMain.style.background = bgcolorList[index];
    title = type.getAttribute("data-type");
    typeContainer.textContent = title;
    typeList.forEach((autreType) => {
      autreType.classList.remove("active");
    });
    type.classList.add("active");
    setTimeout(() => {
      imageRepresentation.setAttribute("src", `assets\/${title}.jpeg`);
    }, 500);
    // mise à jour de data
    data = dataCenter[title.toLowerCase()];

    // lancement de la fonction
    definitionReveal();
    quoteLanced();
  });
});

const quoteComplement = document.querySelectorAll(".quote-complement");

// Génération des citations
function quoteLanced() {
  for (let i = 0; i < quoteComplement.length; i++) {
    quoteComplement[i].style.transitionDelay = `${i / 10}s`;
    quoteComplement[i].classList.remove("show");
  }
  setTimeout(() => {
    data = dataCenter[title.toLowerCase()];
    let index = randomSelector(data.length);
    let citation = data[index].citation;
    let author = data[index].auteur;
    typeContainer.innerHTML = `<h1 class="title">${title}</h1>`;
    citationPlace.innerHTML = `<p class="citation">${citation}</p>`;
    authorPlace.innerHTML = `<p class="author">${author}</p>`;
    for (let i = 0; i < quoteComplement.length; i++) {
      quoteComplement[i].classList.add("show");
      quoteComplement[i].style.transitionDelay = `${(i * 3) / 10}s`;
    }
  }, 1000);
}

// apparition de la définition
function definitionReveal() {
  quoteDefinition.style.transform = "translateX(10px)";
  quoteDefinition.style.opacity = "0";
  imageRepresentationSection.style.transform = "translateX(-10px)";
  imageRepresentationSection.style.opacity = "0";
  setTimeout(() => {
    definitionTitle.forEach((defTitle) => {
      defTitle.textContent = title;
    });
    quoteDefinition.style.transform = "translateX(0)";
    quoteDefinition.style.opacity = "1";
    definitionContainer.forEach((defContainer) => {
      defContainer.textContent = typeDefinition[title.toLowerCase()];
    });
    setTimeout(() => {
      imageRepresentationSection.style.transform = "translateX(0)";
      imageRepresentationSection.style.opacity = "1";
    }, 1000);
  }, 500);
}

// Affichage initial
quoteLanced();
definitionReveal();

// Rafraîchir la citation
refreshButton.addEventListener("click", () => {
  quoteLanced();
});

//Variabler der henter elemnter fra intro sektionen
const intro = document.querySelector(".intro");
const video = intro.querySelector("video");
const text1 = intro.querySelector(".text1");
const text2 = intro.querySelector(".text2");

//Variabler der henter elemnter fra info sektionen
const info = document.querySelector(".moreinfo");
const end = info.querySelector(".end");

//Controlleren er den som kommer til at styre animationerne på siden - både video og tekst
const controller = new ScrollMagic.Controller();

// Når du laver en ny animation med Scroll Magic - skal du lave en scene. Tænk på det ligesom lag i Photoshop

//Første Scene er videoen
let scene = new ScrollMagic.Scene({
  //duration er hvor mange px - animatioen skal vare. Min video er 6 sek - så den er sat til 6000. Da en px i denne sammenhæng svare til en ms.
  duration: 6000,
  // triggerElement definere hvor på siden animation skal starte
  triggerElement: intro,
  triggerHook: 0
})
  //setPin sørger for at sektionen er låst i den samme position til animation er færdig.
  .setPin(intro)
  //her tilføjer jeg scenen til controlleren
  .addTo(controller);

// Den næste scene er til sidens title
// fremgangsmåden er næsten den samme.

// Der skal dog defineres en animation til teksten, der får den til at fade ude. Her bruger jeg GSAP - et js animation bibliotek
// hvad der sker i parenteserne (elementet der animeres, varighed {udgangspunkt}, {resultat})
const textAnim1 = TweenMax.fromTo(text1, 3, { opacity: 1}, {opacity: 0});

let scene2 =  new ScrollMagic.Scene({
  //tiden her 3000 så teksten fader før videoen er færdig. - Halvvejs
  duration: 3000,
  triggerElement: intro,
  triggerHook: 0
})

//afspiller animatioen
.setTween(textAnim1)
.addTo(controller);

// Den trejde scene er endnu et tekst element, der udskifter titlen.

const textAnim2 = TweenMax.fromTo(text2, 3, { opacity: 0}, {opacity: 1});

let scene3 =  new ScrollMagic.Scene({
  duration: 3000,
  // Offset forskyder animationen med x antal px: i dette tilfælde med 2000, så de to h-tags ikke er synlig på samme tid
  offset: 2000
})

.setTween(textAnim2)
.addTo(controller);


// den sidste scene er også et tekst element, men det er i en ny sektion.
const textAnim3 = TweenMax.fromTo(end, 2, { opacity: 0}, {opacity: 1});

let scene4 =  new ScrollMagic.Scene({
  duration: 2000,
  // der skal derfor defineres en anden trigger - i dette tilfælde den sektion teksten befinder sig i.
  triggerElement: info,
  triggerHook: 0
})
.setTween(textAnim3)
//Husk også at ændre hvilket sektion der skal pins.
.setPin(info)
.addTo(controller);

//Video Animation
// dette kode sørger for at videoen bevæger sig, samt har en kort ease periode efter man stopper med at scroll.
let accelamount = 0.1;
let scrollpos = 0;
let delay = 0;

// dette er praktisk talt en eventlistner, man kender fra vanilla Javascript
scene.on('update', e => {
  scrollpos = e.scrollPos / 1000; //positionen bliver divideret med 1000 for at få et resultat der er til svarende til sekunder.
})

// dette er en såkaldt ease af animationen. Det får videoen til at kører et øjeblik mere efter man er stoppet med at scroll
setInterval(() => {
    delay += (scrollpos - delay) * accelamount;

    video.currentTime = delay;
}, 41,6)

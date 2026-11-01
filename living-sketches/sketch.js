// original images
let scannedImages = [];
let croppedImages = [];
let currentImage = 0;

async function setup() {
  createCanvas(800, 500);

  // Load all three images
  const imagePromises = [];
  for (let i = 1; i <= 3; i++) {
    let img = await loadImage("assets/pumpkin" + i + ".png");
    scannedImages.push(img);
  }
  // erase background and crop images
  // how to use: eraseBackground(imageArray, threshold);
  eraseBackground(scannedImages, 10);

  // crop parts of images
  // how to use: crop(imageArray, x, y, width, height);
  croppedImages = crop(scannedImages, 100, 15, 440, 330);
}

function draw() {
  background(255);

  // Display the current image
  if (scannedImages.length === 3) {
    image(scannedImages[currentImage], 0, 0, 800, 500);
  }

  // Switch image every 30 frames
  if (frameCount % 30 === 0 && scannedImages.length === 3) {
    currentImage = (currentImage + 1) % 3;
  }
  
  // show the first image
  image(scannedImages[0], 0, 0);

  // show the cropped image
  image(croppedImages[0], 0, 0, 40, 30);

  // display the mouse position
  // push();
  // let txt = round(mouseX) + ", " + round(mouseY);
  // fill(0, 255, 0);
  // text(txt, mouseX, mouseY);
  // pop();
}











// IMAGE PROCESSING FUNCTIONS
// You shouldn't need to modify these helper functions:
function crop(images, x, y, width, height) {
  const croppedImages = [];

  for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
    croppedImages.push(images[imageIndex].get(x, y, width, height));
  }

  return croppedImages;
}

function eraseBackground(images, threshold = 10) {
  for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
    const currentImage = images[imageIndex];
    currentImage.loadPixels();

    for (let pixelIndex = 0; pixelIndex < currentImage.pixels.length; pixelIndex += 4) {
      let distanceFromWhite = 255 - currentImage.pixels[pixelIndex];
      distanceFromWhite += 255 - currentImage.pixels[pixelIndex + 1];
      distanceFromWhite += 255 - currentImage.pixels[pixelIndex + 2];

      if (distanceFromWhite < threshold) {
        currentImage.pixels[pixelIndex + 3] = 0;
      }
    }

    currentImage.updatePixels();
  }
  // this function uses the pixels array
  // we will cover this later in the semester - stay tuned :D
}

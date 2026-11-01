// original images
let scannedImages = [];

// cropped parts of images
let eyes;
let rockets;
let doodleYellow;
let doodleCyan;

// current indices for animation
let currentEyeIndex = 0;
let currentRocketIndex = 0;
let currentDoodleYellowIndex = 0;
let currentDoodleCyanIndex = 0;

// rocket position and speed for movement
let rocketY = 500;
let rocketSpeedY = 0;

async function setup() {
  createCanvas(800, 500);

  // load all images first
  const imagePromises = [];
  for (let i = 0; i < 6; i++) {
    imagePromises.push(loadImage("assets/image" + i + ".jpg"));
  }
  scannedImages = await Promise.all(imagePromises);

  // erase background and crop images
  // how to use: eraseBackground(imageArray, threshold);
  eraseBackground(scannedImages, 10);

  // crop parts of images
  // how to use: crop(imageArray, x, y, width, height);
  eyes = crop(scannedImages, 0, 0, 585, 356);
  rockets = crop(scannedImages, 1600, 90, 650, 420);
  doodleYellow = crop(scannedImages, 1514, 1300, 830, 300);
  doodleCyan = crop(scannedImages, 100, 1300, 366, 311);
}

function draw() {
  background(255);

  // EXAMPLES: EYE
  // update eye index
  currentEyeIndex = floor((frameCount / 20) % eyes.length);
  // display eye
  image(
    eyes[currentEyeIndex],
    mouseX,
    mouseY,
    eyes[0].width * 0.25,
    eyes[0].height * 0.25
  );

  // EXAMPLE: ROCKET
  // update rocket index (animation only has 4 frames)
  currentRocketIndex = floor((frameCount / 10) % 4);
  // move rocket
  rocketY += rocketSpeedY;
  rocketSpeedY += -0.1;
  if (rocketY < -100) {
    rocketY = 500;
    rocketSpeedY = 0;
  }
  // display rocket
  push();
  translate(width / 2, rocketY);
  rotate(radians(-90));
  imageMode(CENTER);
  image(
    rockets[currentRocketIndex],
    0,
    0,
    rockets[0].width * 0.25,
    rockets[0].height * 0.25
  );
  pop();

  // EXAMPLES: DOODLE YELLOW
  // update DoodleYellow index, using sin()
  currentDoodleYellowIndex = floor(map(sin(frameCount / 10), -1, 1, 0, doodleYellow.length));
  // display DoodleYellow
  image(
    doodleYellow[currentDoodleYellowIndex],
    0,
    0,
    doodleYellow[0].width * 0.5,
    doodleYellow[0].height * 0.5
  );

  // EXAMPLES: DOODLE CYAN
  // update DoodleCyan index, if close to mouse
  let distanceToDoodleCyan = dist(mouseX, mouseY, 491, 387);
  if (distanceToDoodleCyan < 200) {
    currentDoodleCyanIndex = floor(map(sin(frameCount / 10), -1, 1, 0, doodleCyan.length));
  }
  // display DoodleCyan
  image(
    doodleCyan[currentDoodleCyanIndex],
    400,
    300,
    doodleCyan[0].width * 0.5,
    doodleCyan[0].height * 0.5
  );
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

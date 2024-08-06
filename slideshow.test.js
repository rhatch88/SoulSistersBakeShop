// Import the necessary libraries
const { JSDOM } = require('jsdom');

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      images: [
        { url: 'img/Strawberries.jpg' },
        { url: 'img/Oreo_cake.jpg' },
        { url: 'img/Dipped_Oreos.jpg' },
        { url: 'img/Reese_cupcakes.jpg' },
        { url: 'img/chocolate_strawberry_cake.jpg' },
        { url: 'img/oreo_cupcakes2.jpg' },
        { url: 'img/heart_cake.jpg', alt: 'Heart Cake' },
        { url: 'img/Cookie_and_cream_cupcakes.jpg' },
        { url: 'img/Lemon_curd.jpg' },
        { url: 'img/Mixed_dozen_2.jpg' },
        { url: 'img/Strawberry_cupcakes.jpg' },
        { url: 'img/sode_bread.jpg' },
        { url: 'img/german_chocolate.jpg' },
        { url: 'img/Coconut_almond_cake.jpg' },
        { url: 'img/pink_cupcakes.jpg' },
        { url: 'img/white_cupcakes.jpg' },
        { url: 'img/Mixed_dozen_cupcakes.jpg' },
        { url: 'img/white_chocolate_cake.jpg' },
        { url: 'img/heath.jpg' },
        { url: 'img/flower_cake.jpg' },
        { url: 'img/mixed_muffins.jpg' },
        { url: 'img/amung_us2.jpg' },
        { url: 'img/cookies.jpg' },
        { url: 'img/Chocolate_caramel_cake.jpg' },
        { url: 'img/red_velvet.jpg' },
        { url: 'img/oreo_cupcakes.jpg' },
        { url: 'img/unicorn_cake.jpg' },
        { url: 'img/Salted_caramel_cookie_cake.jpg' },
        { url: 'img/cookie_cake.jpg' },
        { url: 'img/4.jpg' },
        { url: 'img/caramel_butter_cake.jpg' },
        { url: 'img/k.jpg' },
        { url: 'img/pies.jpg' },
        { url: 'img/Chocolate_cake.jpg' },
        { url: 'img/candy_cupcakes.jpg' },
        { url: 'img/flower_cupcakes.jpg' },
        { url: 'img/orange_cupcakes.jpg' },
        { url: 'img/candyland_cupcakes.jpg' },
        { url: 'img/banana_pudding_cake.jpg' }
      ]
    })
  })
);

describe('Slideshow functionality', () => {
  let document, window;

  beforeEach(() => {
    const dom = new JSDOM(`
      <div class="image-container">
        <div class="image-list"></div>
      </div>
    `);
    document = dom.window.document;
    window = dom.window;
    global.document = document;
    global.window = window;

    // Import the JavaScript file after setting up the DOM
    require('./slideshow');
  });

  test('images are added to the image list', async () => {
    await new Promise(setImmediate); 

    
    const images = document.querySelectorAll('.image-list img');
    expect(images.length).toBe(40); // 20 original + 20 cloned

    
    expect(images[0].src).toContain('img/Strawberries.jpg');
    expect(images[1].src).toContain('img/Oreo_cake.jpg');
    expect(images[2].src).toContain('img/Dipped_Oreos.jpg');
    expect(images[3].src).toContain('img/Reese_cupcakes.jpg');
    
  });

  test('startSlideshow function sets up interval', () => {
    jest.useFakeTimers(); 

    
    function startSlideshow() {
      slideInterval = setInterval(() => {
        currentSlide++;
        updateSlidePosition();
      }, slideDuration);
    }

    
    startSlideshow();

    jest.runAllTimers();

   
    expect(setInterval).toHaveBeenCalledTimes(1);
  });

  test('updateSlidePosition updates the slide position correctly', () => {
    // Set up initial state
    const imageList = document.querySelector('.image-list');
    imageList.style.transform = '';
    imageList.style.transition = '';

    for (let i = 0; i < 40; i++) {
      const img = document.createElement('img');
      img.src = `img/test_image_${i}.jpg`;
      img.classList.add('image-item');
      imageList.appendChild(img);
    }

   
    imageList.children[0].clientWidth = 100;

    
    updateSlidePosition();

   
    expect(imageList.style.transform).toBe('translateX(-0px)');
  });
});

import scrape from 'website-scraper';

const options = {
  urls: [
    'https://esim.holafly.com/es/shop/'
  ],
  directory: './holafly-clone-temp',
  sources: [
    { selector: 'img', attr: 'src' },
    { selector: 'link[rel="stylesheet"]', attr: 'href' },
    { selector: 'script', attr: 'src' }
  ],
  request: {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    }
  }
};

console.log("Starting clone for shop...");
scrape(options).then((result) => {
    console.log("Website successfully cloned into ./holafly-clone-temp directory.");
}).catch((err) => {
    console.error("An error occurred", err);
});

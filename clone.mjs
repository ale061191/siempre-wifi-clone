import scrape from 'website-scraper';

const options = {
  urls: [
    'https://esim.holafly.com/es/',
    'https://esim.holafly.com/es/blog/esim/que-es-esim/',
    'https://esim.holafly.com/es/faq/',
    'https://esim.holafly.com/es/contacto/',
    'https://esim.holafly.com/es/planes-esim/?ref=navbar',
    'https://esim.holafly.com/es/programa-afiliados/',
    'https://partners.holafly.com/es/',
    'https://esim.holafly.com/es/shop/'
  ],
  directory: './holafly-clone',
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

console.log("Starting clone for 8 pages...");
scrape(options).then((result) => {
    console.log("Websites successfully cloned into ./holafly-clone directory.");
}).catch((err) => {
    console.error("An error occurred", err);
});

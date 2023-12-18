// npm i axios cheerio

const axios = require('axios');
const cheerio = require('cheerio');

// 取得使用者輸入的選項（預設為 'text'）
const option = process.argv[2] || 'text';

// 要爬取的網頁 URL
const url = 'https://www.ettoday.net/news/20231218/2645979.htm';

// 傳送 HTTP 請求取得頁面內容
axios
  .get(url)
  .then((response) => {
    // 使用 Cheerio 解析 HTML
    const $ = cheerio.load(response.data);

    // 在這裡使用 jQuery 選擇器來提取你需要的資訊
    const title = $('title').text();
    console.log('Title:', title);

    // 根據使用者選擇提取內容
    if (option === 'text') {
      const pageContent = $('p').text();
      console.log('Page Content:', pageContent);
    } else if (option === 'href') {
      // 範例：提取頁面中所有連結
      const links = [];
      $('a').each((index, element) => {
        links.push($(element).attr('href'));
      });
      console.log('Links:', links);
    } else {
      console.log('Invalid option. Please use "text" or "href".');
    }
  })
  .catch((error) => {
    console.error('Error fetching the page:', error);
  });

// node app.js 默認輸出文章內容
// node app.js href 輸出連結
import { readFile, writeFile } from 'node:fs/promises';

const INDEX_HTML_PATH = 'build/client/index.html';
const META_TITLE = '인기보다 나에게 맞게, Cosmetch';
const META_DESCRIPTION =
  "'인기순'의 함정에서 벗어나, 데이터로 '나만의 화장품'을 찾는 스마트 솔루션";
const META_IMAGE_URL = 'https://www.cosmetch.kr/assets/og/og_img.png';
const META_IMAGE_WIDTH = '1200';
const META_IMAGE_HEIGHT = '728';

const metaMarkup = [
  `<title>${META_TITLE}</title>`,
  `<meta name="description" content="${META_DESCRIPTION}"/>`,
  '<meta property="og:type" content="website"/>',
  '<meta property="og:locale" content="ko_KR"/>',
  '<meta property="og:site_name" content="Cosmetch"/>',
  `<meta property="og:title" content="${META_TITLE}"/>`,
  `<meta property="og:description" content="${META_DESCRIPTION}"/>`,
  `<meta property="og:image" content="${META_IMAGE_URL}"/>`,
  `<meta property="og:image:width" content="${META_IMAGE_WIDTH}"/>`,
  `<meta property="og:image:height" content="${META_IMAGE_HEIGHT}"/>`,
  '<meta name="twitter:card" content="summary_large_image"/>',
  `<meta name="twitter:title" content="${META_TITLE}"/>`,
  `<meta name="twitter:description" content="${META_DESCRIPTION}"/>`,
  `<meta name="twitter:image" content="${META_IMAGE_URL}"/>`,
].join('');

const html = await readFile(INDEX_HTML_PATH, 'utf8');

const patchedHtml = html
  .replace(/<title>.*?<\/title>/, metaMarkup)
  .replace(/<html lang="en">/, '<html lang="ko">');

await writeFile(INDEX_HTML_PATH, patchedHtml);

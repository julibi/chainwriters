/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.NEXT_SITE_URL  || 'http://localhost:4200',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  outDir: 'public/',
}
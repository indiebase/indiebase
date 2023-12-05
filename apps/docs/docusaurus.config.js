// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const i18n = require('./i18n');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Indiebase',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',
  i18n,
  // Set the production url of your site here
  url: 'https://your-docusaurus-test-site.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Indiebase', // Usually your GitHub org/user name.
  projectName: 'indiebase', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".

  customFields: {
    deskbtmURL: 'https://deskbtm.com/en',
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          remarkPlugins: [
            // @ts-ignore
            [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
          ],
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve('@mantine/core/styles.css'),
            require.resolve('@fontsource/inter'),
          ],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      hideOnScroll: true,
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
      navbar: {
        hideOnScroll: true,
        logo: {
          alt: 'Indiebase',
          src: 'img/text-logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'overview',
            position: 'right',
            label: 'Docs',
          },
          {
            type: 'doc',
            docId: 'overview1',
            position: 'right',
            label: 'Pricing',
          },
          {
            type: 'doc',
            docId: 'overview2',
            position: 'right',
            label: 'Blog',
          },
          {
            type: 'doc',
            docId: 'overview3',
            position: 'right',
            label: 'Abort',
          },
          // {
          //   position: 'right',
          //   // type: 'docSidebar',
          //   to: '/pricing',
          //   sidebarId: 'tutorialSidebar2',
          //   label: 'Pricing',
          // },
          {
            type: 'localeDropdown',
            position: 'left',
          },
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'tutorialSidebar2',
          //   position: 'right',
          //   label: 'Sponsor',
          // },
          // { to: '/blog', label: 'Blog', position: 'right' },
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'tutorialSidebar1',
          //   position: 'right',
          //   label: 'About',
          // },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        // Copyright© {new Date().getFullYear()} Han
        copyright: `Copyright © ${new Date().getFullYear()} Deskbtm (Han)`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
  plugins: [
    require.resolve('./plugins/docusaurus-plugin-vanilla-extract'),
    [
      '@docusaurus/plugin-pwa',
      {
        debug: true,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            type: 'image/x-icon',
            href: '/favicon.ico',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json', // your PWA manifest
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            media: '(prefers-color-scheme: light)',
            content: '#FFFFFF',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            media: '(prefers-color-scheme: light)',
            content: '#242424',
          },
        ],
      },
    ],
  ],
};

module.exports = config;

import { useEffect } from 'react';

const SITE_URL = 'https://swasthikhealthcare.com';

function SEO({
  title,
  description,
  path = '/',
}) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;

    document.title = title;

    let descriptionTag = document.querySelector(
      'meta[name="description"]'
    );

    if (!descriptionTag) {
      descriptionTag = document.createElement('meta');
      descriptionTag.setAttribute('name', 'description');
      document.head.appendChild(descriptionTag);
    }

    descriptionTag.setAttribute('content', description);

    let canonicalTag = document.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }

    canonicalTag.setAttribute('href', url);

    let ogTitle = document.querySelector(
      'meta[property="og:title"]'
    );

    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }

    ogTitle.setAttribute('content', title);

    let ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );

    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute(
        'property',
        'og:description'
      );
      document.head.appendChild(ogDescription);
    }

    ogDescription.setAttribute('content', description);

    let ogUrl = document.querySelector(
      'meta[property="og:url"]'
    );

    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }

    ogUrl.setAttribute('content', url);
  }, [title, description, path]);

  return null;
}

export default SEO;
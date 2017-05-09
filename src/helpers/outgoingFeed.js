import RSS from 'rss';
import { Articles } from '../models';

export default async function getSitemap() {
  try {
    const feed = new RSS({
      title: 'Polski Front-End',
      description: 'Serwis skupiający strony, blogi i serwisy na temat Front-Endu. Tylko w języku polskim!',
      feed_url: 'http://www.polskifrontend.pl/feed',
      site_url: 'http://www.polskifrontend.pl/',
      image_url: 'http://www.polskifrontend.pl/polskifrontend_icon.png',
      webMaster: 'Bartłomiej Dybowski',
      language: 'pl_PL'
    });
    const articles = await Articles.getAllArticles(30);

    articles.forEach(article => {
      feed.item({
        title: article.title,
        description: article.description,
        url: `http://www.polskifrontend.pl/artykuly/${article.slug}`,
        guid: article.id,
        author: article._blog.name,
        date: article.date
      });
    });

    return feed;
  } catch (error) {
    throw error;
  }
}

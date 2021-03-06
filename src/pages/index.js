import React, { useState, useEffect, useRef } from 'react';
import { graphql } from 'gatsby';
import _ from 'lodash';

import { Layout } from '../layout';
import { Header } from '../components/header';
import { Category } from '../components/category';
import { Contents } from '../components/contents';
import { Head } from '../components/head';

import * as ScrollManager from '../utils/scroll';
import * as Storage from '../utils/storage';
import * as IOManager from '../utils/visible';
import * as EventManager from '../utils/event-manager';
import * as Dom from '../utils/dom';

import { CATEGORY_TYPE, HOME_TITLE } from '../constants';

const DEST_POS = 20;
const BASE_LINE = 80;

function getDistance(currentPos) {
  return Dom.getDocumentHeight() - currentPos;
}

export default ({ data, location }) => {
  const initialCount = Storage.getCount(1);
  const initialCategory = Storage.getCategory(CATEGORY_TYPE.ALL);
  const [count, setCount] = useState(initialCount);
  const countRef = useRef(count);
  const [category, setCategory] = useState(initialCategory);
  const { siteMetadata } = data.site;
  const { countOfInitialPost } = siteMetadata.configs;
  const posts = data.allMarkdownRemark.edges;
  const categories = _.uniq(posts.map(({ node }) => node.frontmatter.category));
  const rootPath = `${__PATH_PREFIX__}/`;

  useEffect(() => {
    window.addEventListener(`scroll`, onScroll, { passive: false });
    IOManager.init();
    ScrollManager.init();

    return () => {
      window.removeEventListener(`scroll`, onScroll, { passive: false });
      IOManager.destroy();
      ScrollManager.destroy();
    };
  }, []);

  useEffect(() => {
    countRef.current = count;
    IOManager.refreshObserver();
    Storage.setCount(count);
    Storage.setCategory(category);
  });

  const selectCategory = category => {
    setCategory(category);
    ScrollManager.go(DEST_POS);
  };

  const onScroll = () => {
    const currentPos = window.scrollY + window.innerHeight;
    const isTriggerPos = () => getDistance(currentPos) < BASE_LINE;
    const doesNeedMore = () =>
      posts.length > countRef.current * countOfInitialPost;

    return EventManager.toFit(() => setCount(prev => prev + 1), {
      dismissCondition: () => !isTriggerPos(),
      triggerCondition: () => isTriggerPos() && doesNeedMore(),
    })();
  };

  return (
    <Layout location={location} title={siteMetadata.title}>
      <Head title={HOME_TITLE} keywords={siteMetadata.keywords} />
      <Category
        categories={categories}
        category={category}
        selectCategory={selectCategory}
      />
      <Header location={location} rootPath={rootPath} />
      <Contents
        posts={posts}
        countOfInitialPost={countOfInitialPost}
        count={count}
        category={category}
      />
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        configs {
          countOfInitialPost
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { ne: null } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 200, truncate: true)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            category
          }
        }
      }
    }
  }
`;

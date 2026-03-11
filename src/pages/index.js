import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={clsx('container', styles.heroInner)}>
        <div className={styles.heroText}>
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/intro">
              Read the Docs
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/blog"
              style={{marginLeft: '1rem'}}>
              Visit the Blog
            </Link>
          </div>
        </div>
        <img src="/img/logo.svg" alt="CodeTechSolutions" className={styles.heroLogo} />
      </div>
    </header>
  );
}

function AboutSection() {
  return (
    <main>
      <section className={styles.aboutSection}>
        <div className="container">
          <Heading as="h2">About CodeTechSolutions</Heading>
          <p>
            Founded in 2018 in Budapest, Hungary, CodeTechSolutions is a growing team of approximately 25 professionals dedicated to transforming how enterprises operate through intelligent technology.
          </p>
          <p>
            We specialize in AI-powered enterprise solutions and intelligent management platforms that streamline automated workflows and optimize business processes. Our expertise spans across critical industries including banking, insurance, healthcare, and manufacturing.
          </p>
          <p>
            Led by Dr. Balázs Kovács, our team is committed to delivering innovative solutions that drive real business value and operational excellence.
          </p>
          <Link
            className="button button--primary button--lg"
            to="/about">
            Learn More
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description={siteConfig.tagline}>
      <HomepageHeader />
      <AboutSection />
    </Layout>
  );
}

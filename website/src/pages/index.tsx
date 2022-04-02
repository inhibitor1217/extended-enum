import React from 'react';
import clsx from 'clsx';
import CodeBlock from '@theme/CodeBlock';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/get-started">
            Get Started 🚀
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      description="Grant object-oriented powers to TypeScript enums">
      <HomepageHeader />
      <main className="container margin-vert--xl">
        <section className="row">
          <div className="col col--2" />
          <div className="col col--8">
            <p>
              Extend your TypeScript <code>enum</code> with magic utility, <b><code>extend</code></b>.
            </p>
            <CodeBlock language="ts">
              {`import { extend } from 'extended-enum';

enum _Priority { Critical = 100, High = 50, Medium = 30, Low = 10 }

// now, your native enum is extended!
class Priority extends extend<typeof _Priority, Priority>(Priority) {}`}
            </CodeBlock>
          </div>
          <div className="col col--2" />
        </section>

        <section className="row margin-top--xl">
          <div className="col col--4">
            <h2>
              Out-of-the-box utilities
            </h2>
            <p>
              <b>Parsing, iterating and pattern matching</b> utilties are available from the extended enum class.<br/>
              <br/>
              All of the utilities work seamlessly with TypeScript, so don't worry!
            </p>
          </div>

          <div className="col col--8">
            <CodeBlock language="ts">
              {`// parsing primitives to enums
const priority = Priority.from(50);

// iteration
for (const priority of Priority) { ... }
const keys = [...Priority.keys()];

// matching
const isLow = priority.is('Low');
const isMedium = priority.is(30);
const isHigh = priority.is(Priority.High);
`}
            </CodeBlock>
          </div>
        </section>

        <section className="row margin-top--xl">
          <div className="col col--8">
            <CodeBlock language="ts">
              {`interface IPriority { shouldIgnore(): boolean }

class Priority extends <typeof _Priority, Priority, IPriority>(Priority) {

  // define methods in addition to extended enum class
  shouldIgnore() {
    return this.is(Priority.Medium) || this.is(Priority.Low);
  }

}

Priority.High.shouldIgnore(); // false
Priority.Low.shouldIgnore();  // true`}
            </CodeBlock>
          </div>

          <div className="col col--4">
            <h2>
              Attach your business logic to enums
            </h2>
            <p>
              Native TypeScript <code>enum</code>s are not extensible. Your utilities and business logic should have been defined separately with their definitions.<br/>
              <br/>
              <b>Extended enums allow your logic to be attached to its definition</b>, in similar way with Java Enums.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}

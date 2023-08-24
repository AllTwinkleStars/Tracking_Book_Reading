import React from "react";
import Head from "next/head";

type Props = {
  title?: string;
  desc?: string;
  keywords?: string;
};

// "Discover affordable and fashionable men's and women's clothing online at Haru Fashion. Free Returns ✓ 1000+ New Arrivals Dropped Daily."
const defaultDesc =
  "Tracking Book Reading developed with Next.JS. Coded with 🖤 by Artem Demchenko";
const defaultKeywords =
  "Artem Demchenko, Online Book Reading, Artem Demchenko, NextJS";

const AppHeader: React.FC<Props> = ({
  title = "Book Reading",
  desc = defaultDesc,
  keywords = defaultKeywords,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <link
        href="/favicons/apple-touch-icon.png"
        rel="apple-touch-icon"
        sizes="180x180"
      />
      <link
        href="/favicons/favicon-32x32.png"
        rel="icon"
        sizes="32x32"
        type="image/png"
      />
      <link
        href="/favicons/favicon-16x16.png"
        rel="icon"
        sizes="16x16"
        type="image/png"
      />
      <link href="/favicons/favicon.png" rel="icon" />
      <meta content={desc} name="description" key="description" />
      <meta content={keywords} name="keywords" key="keywords" />
      <meta property="og:description" content={desc} key="og_description" />
      <meta property="og:title" content={title} key="og_title" />
      <meta name="twitter:title" content={title} key="twitter_title" />
      <meta
        name="twitter:description"
        content={desc}
        key="twitter_description"
      />
    </Head>
  );
};

export default AppHeader;

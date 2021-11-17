import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Key, ReactChild, ReactFragment, ReactPortal } from "react";
import styles from "../styles/Home.module.css";
import 'bootstrap/dist/css/bootstrap.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>ExChangeService</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Lobby</h1>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};


export default Home;


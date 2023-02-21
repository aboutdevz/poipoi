import { initializeApp } from "firebase/app";
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

import { useEffect, useState } from 'react'
import poiprofile from '../../public/poi.gif'
import poii from '../../public/sounds/1.wav'
import {
  getFirestore,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  increment
} from 'firebase/firestore'

function Home({ data }) {
  const [count, setCount] = useState(null)
  const [ref, setRef] = useState({})
  
  useEffect(() => {
    const app = initializeApp({
      apiKey: data.apiKey,
      authDomain: data.authDomain,
      projectId: data.projectId,
      storageBucket: data.storageBucket,
      messagingSenderId: data.messagingSenderId,
      appId: data.appId,
      measurementId: data.measurementId
    });
    const ref = doc(collection(getFirestore(app), 'poicount'), data.docId);
    setRef(ref)
    onSnapshot(ref, async function(snapshot) {
      setCount(snapshot.data().count)
    });
  },[])

  const updateCount = async () => {
    playAudio()
    await updateDoc(ref, {count: increment(1)})
  }
  
  const playAudio = () => {
    new Audio(poii).play()
  }

  return (
    <div className={styles.App}>
      <Head>
        <title>MAKE SOME POI — POI NOISE EVERYWHERE</title>
        <link rel="icon" type="image/svg+xml" href="/poi.gif" />
        <meta name="title" content="LETS MAKE SOME POI — POI NOISE EVERYWHERE" key="title" />
        <meta name="description" content="poi poi poi poiii poi poi poi poiii poiiii poiiiiii poi poi poi poiii poi poi poi poiii poi poi poi poiii poiiii poiiiiii poi poi poi poiii poi poi poi poiii poi poi poi poiii poiiii poiiiiii poi poi poi poiii" key="description" />
      </Head>
      <div className={styles.cover}>
        { count !== null &&
          <div className={styles.menu}>
              <div className={styles.title}>
                <img className={styles.poiprofile} src="/poi.gif" width="200" height="200" alt="poi poi" />
              </div>
              <div className={styles.content}>
                  <p className={styles.counter} id="counter">{Number(count).toLocaleString('en-US')}</p>
                  <button className={styles['poi-trigger']} id="poi-trigger" onClick={updateCount}>MAKE SOME POI !!</button>
              </div>
            </div>
        }
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const data = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId,
    docId: process.env.docId
  }
  return { props: { data } }
}

export default Home

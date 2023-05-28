import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import poii from '../../public/sounds/1.wav'

import io from 'socket.io-client'

let socket

function Home() {
  const [count, setCount] = useState(null)
  
  useEffect(() => {
    socketInitializer()
  },[])

  const socketInitializer = async () => {
    await fetch('/api/poi');
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('count-update', msg => {
      setCount(parseInt(msg))
    })
  }

  const updateDoc = async () => {
    await fetch('/api/updateCount');
  }

  const updateCount = async () => {
    playAudio()
    await updateDoc()
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

export default Home

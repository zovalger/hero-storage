import Head from "next/head";

export default function Home() {
  return (
    <>
        <div className={""}>
        <Head>
				<title>HeroStorage</title>
				{/* <link rel="icon" href="/favicon.ico" /> */}
				<link rel="icon" href="/logo.png" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link 
        href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" 
        rel="stylesheet" />
        
			</Head>
        </div>
    </>
  )
}

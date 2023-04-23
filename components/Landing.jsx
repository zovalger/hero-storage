import Image from "next/image";
import Link from "next/link";
import style from "../src/styles/Landing.module.css";

function Landing() {
  return (
    <>
 
<div className={style.container}>
    <div className={style.content}>
        <div className={style.title_container}>
            <h1 className={style.title}>
                Elige a tus heroes favoritos.
                </h1>
            </div>
            <div className={style.text_container}>
                <p className={style.text}>
                    Crea tu propia galeria de superheroes y villanos favoritos de DC y Marvel.
                </p>
            </div>
            <div>
                <Link rel="stylesheet" href="" className={style.button}> ¡Empieza ahora! </Link>
            </div>
    </div>
    <div className={style.container_img_1}>
        <Image
          src={"./img/super_man.svg"}
          alt="superman_img"
          className={style.img}
          width={"400"}
          height={"400"}
        />
      </div>
      <div className={style.container_img_2}>
        <Image
          src={"./img/super_woman.svg"}
          alt="superman_img"
          className={style.img}
          width={"400"}
          height={"400"}
        />
      </div>
</div>
    </>
  );
}

export default Landing;
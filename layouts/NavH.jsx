import style from "../src/styles/Nav/nav.module.css"
import Link from 'next/link'


export default function NavH(props) {
    
const titulo = "HeroStorage"
    if (props.landing === true) {
        {/*Vista de la landing*/ }
        return (
            <div className={style.container}>
                <div className={style.title}>
                    <h2>{titulo}</h2>
                </div>
                <div className={style.container__elL}>


                
                        <Link href={"/"} className={style.btn_lo}>
                            Iniciar sesión
                        </Link>
                  

                 
                        <Link href={"/"} className={style.btn_re}>
                            Registrarse
                        </Link>
                   
                 
                </div>
            </div>
        )
    } else {
        {/*Vista General*/ }
        return (
            <div className={style.container}>

                <div className={style.title}>
                    <h2>{titulo}</h2>
                </div>

                <div className={style.container__el}>

                    <div className={style.productora}>
                        <button>Marvel</button>
                        <button>DC</button>
                    </div>

                    <div>
                        buscador
                    </div>
                    <div>
                        <button>Usuario</button>
                        <button>salir</button>
                    </div>
                </div>
            </div>

        )
    }
}

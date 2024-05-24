'use client'
import BarrasGraphic from "@/components/adminComponents/graphics/PanelEstBarras";
import styles from './dashboard.module.scss'
import Indicadores from "@/components/adminComponents/graphics/Indicadores";
import { CursosDestacados } from "@/components/adminComponents/panel/CursosDestacados";


export default function dashboardPage() {
  return (
    <div className={`${styles.contPrincipal} h-full w-full p-4 flex bg-[#F1F5F6]`}>

      {/* {CONTENEDOR IZQUIERDO} */}
      <div className={`${styles.contPrinIzq} w-max border-b-3 flex flex-col md:lg:xl:pr-3 mr-3 `}>

        <div className={`${styles.contPrinIzq_sup} h-full shadow-sm  inline-flex flex-col justify-around pt-2 items-end rounded-lg mb-2 w-full  bg-[#ffffff]`}>
          <BarrasGraphic />
        </div>
        {/* DIAGRAMAS REDONDOS */}
        <Indicadores />

      </div>
      {/* {CONTENEDOR DERECHO} */}
      <div className={`${styles.contPrinDer} w-1/3 relative   `} >
        <CursosDestacados />
      </div>
    </div>

  );
}

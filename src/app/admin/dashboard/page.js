import BarrasGraphic from "@/components/adminComponents/graphics/panel";
import styles from './dashboard.module.scss'
export default function dashboardPage() {
  return (
    <div className={`${styles.contPrincipal} h-full w-full p-4 flex bg-[#F6F4F2]`}>
      <div className={`${styles.contPrinIzq} w-2/3 h-full  flex flex-col md:lg:xl:pr-3 sm:p-0`}>

        <div className={`${styles.contPrinIzq_sup} inline-flex flex-col justify-center items-end rounded-lg mb-2 w-full h-1/2  bg-[#ffffff]`}>
          <div className="w-full text-start pl-4 pt-2">
            <span className="text-md font-sans  mb-2">Inscripciones en los ultimos meses</span>
          </div>
          <BarrasGraphic />
        </div>
        <div className={`${styles.contPrinIzq_inf} w-full h-1/2  bg-orange-300`}>

        </div>

      </div>
      <div className={`${styles.contPrinDer} w-1/3 h-full  bg-green-400`} >

      </div>
    </div>
  );
}

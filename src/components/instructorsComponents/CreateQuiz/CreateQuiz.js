'use client'
import CircleSpinner from "@/components/usersComponents/CircleSpinner/CircleSpinner"
import { useState } from "react"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import Question from "./Questions/Question"
import useContentCourseHandlers from "@/hooks/useContentCourseHandlers";
import { useParams } from "next/navigation"

export default function CreateQuiz({ idMod, setCrearEvaluacion }) {
    const authState = useSelector(state => state.auth)
    const token = authState.token
    const { course } = useParams()
    const [dataEval, setDataEval] = useState({})
    const [dataQuestion, setDataQuestion] = useState({})
    const [dataAnswer, setDataAnswer] = useState({
        "Id_Preg_Eval": null,
        "Respuestas": []
    })
    const [loading, setLoading] = useState(false)

    const {
        setDataCourse2,
        dataCourse2,
        addQuiz
    } = useContentCourseHandlers(token, course)


    const handleChange = (event) => {
        setDataEval(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }

    const fetchCreateQuiz = async (e) => {
        setLoading(true);
        e.preventDefault();
        const data = { ...dataEval, Id_Module_Cur: idMod };

        let evaluacionId = null;
        let preguntaId = null;

        try {
            // CREAR EVALUACIÓN
            let createEval = await fetch('http://localhost:3000/api/v1/evaluations/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            let responseCreate = await createEval.json();
            if (responseCreate.code === 403) {
                toast.error('Todos los campos son obligatorios.');
                throw new Error('Error al crear la evaluación');
            } else if (responseCreate.type === 'success') {
                const newEvaluation = {
                    Id_Mod_Cur_FK: idMod,
                    Id_Eva: responseCreate.data.insertedId,
                    ...dataEval,
                    ESTADO_REGISTRO: 1,
                    createdAt: new Date(Date.now()).toISOString() // Formatear la fecha como una cadena legible
                };
                evaluacionId = responseCreate.data.insertedId;

                addQuiz(newEvaluation, idMod);
                setDataQuestion(prev => ({ ...prev, Id_Eval: evaluacionId }));
            }

            // Asegúrate de que `dataQuestion` está actualizado
            await new Promise(resolve => setTimeout(resolve, 0)); // Espera un ciclo de evento

            const question = { ...dataQuestion, Id_Eval: evaluacionId };
            console.log(dataCourse2)

            // CREAR PREGUNTAS
            let createQuestions = await fetch('http://localhost:3000/api/v1/preguntasEval/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(question)
            });
            let responseQuestions = await createQuestions.json();
            if (responseQuestions.code === 403) {
                toast.error('Todos los campos son obligatorios.');
                throw new Error('Error al crear las preguntas');
            } else if (responseQuestions.type === 'success') {
                preguntaId = responseQuestions.data.insertedId;
                setDataAnswer(prev => ({
                    ...prev,
                    Id_Preg_Eval: preguntaId
                }));
            } else {
                toast.error('Hubo un error al crear las preguntas.');
                throw new Error('Error al crear las preguntas');
            }

            // Asegúrate de que `dataAnswer` está actualizado
            await new Promise(resolve => setTimeout(resolve, 0)); // Espera un ciclo de evento

            const answers = { ...dataAnswer, Id_Preg_Eval: preguntaId };

            // CREAR RESPUESTAS
            let createAnswers = await fetch('http://localhost:3000/api/v1/respuestasEval/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(answers) // Asegúrate de que dataAnswer esté bien definido
            });
            let responseAnswers = await createAnswers.json();
            if (responseAnswers.code === 403) {
                toast.error('Todos los campos son obligatorios.');
                throw new Error('Error al crear las respuestas');
            } else if (responseAnswers.code !== 403 && responseAnswers.type !== 'success') {
                toast.error('Hubo un error al crear las respuestas.');
                throw new Error('Error al crear las respuestas');
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
            setCrearEvaluacion('')
            toast.success('Evaluación creada correctamente.');
        }
    };



    return (
        <div className='w-full my-4'>
            <div>
                <h1 className='font-bold text-2xl'>Crear evaluación</h1>
                <p className='text-gray-600 font-medium'>Crea una nueva evaluación a tu gusto con preguntas y respuestas.</p>
            </div>
            <form className='flex flex-col items-center gap-4 mt-6' onSubmit={(e) => e.preventDefault()}>
                <div className='flex flex-col gap-1 w-full'>
                    <label className='font-semibold text-gray-600'>Titulo de la evaluación</label>
                    <input required onChange={handleChange} name="Tit_Eva" type='text' className='border-gray-400 border-1 outline-none focus:border-azulSena p-2 rounded-lg' />
                </div>
                <div className='flex flex-col gap-1 w-full'>
                    <label className='font-semibold text-gray-600'>Descripción</label>
                    <input required onChange={handleChange} name="Des_Eva" type='text' className='border-gray-400 border-1 outline-none focus:border-azulSena p-2 rounded-lg' />
                </div>
                <div className='flex flex-col gap-1 w-full'>
                    <label className='font-semibold text-gray-600'>Nota mínima aprobación</label>
                    <div className='flex flex-col'>
                        <input required onChange={handleChange} name="Nota_Min_Apro" type='number' className='border-gray-400 border-1 outline-none focus:border-azulSena p-2 rounded-lg' placeholder='Ej: 70' min={0} max={100} />
                        <span className='text-sm text-gray-600'>En un rango de 0 - 100.</span>
                    </div>
                </div>
                {/* PREGUNTAS */}
                <Question
                    dataAnswer={dataAnswer}
                    setDataAnswer={setDataAnswer}
                    questionNumber={1}
                    setDataQuestion={setDataQuestion}
                    dataQuestion={dataQuestion}
                />

                {/* ---------------- */}
                <div className='flex items-center gap-2'>
                    <button
                        className='bg-azulSena p-2 rounded-lg text-white font-medium flex items-center justify-center hover:bg-black transition-all duration-150'
                        onClick={fetchCreateQuiz}
                    >{loading ? <CircleSpinner /> : 'Crear evaluación'}</button>

                    <div
                        className='bg-red-500 cursor-pointer p-2 rounded-lg text-white font-medium flex items-center justify-center hover:bg-red-600 transition-all duration-150'
                    >Cancelar</div>
                </div>
            </form>
        </div>
    )
}

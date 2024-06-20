'use client'
import React, { useState } from 'react';
import { RadioGroup, Radio } from "@nextui-org/radio";

const API_URL = 'http://localhost:3000/api/evaluations/evaluate'; // Reemplaza con la URL de tu API

export default function EvaluationSection({ titEval, evaluacion, userId, token }) {
    const [preguntaActual, setPreguntaActual] = useState(0);
    const [respuestas, setRespuestas] = useState([]);
    const [evaluacionFinalizada, setEvaluacionFinalizada] = useState(false);
    const [respuestasDelServidor, setRespuestasDelServidor] = useState([]);

    const siguientePregunta = () => {
        if (preguntaActual < evaluacion.preguntasevals.length - 1) {
            setPreguntaActual(preguntaActual + 1);
        } else {
            console.log('Se han respondido todas las preguntas.');
            setEvaluacionFinalizada(true);
        }
    };

    const anteriorPregunta = () => {
        if (preguntaActual > 0) {
            setPreguntaActual(preguntaActual - 1);
        } else {
            // No debería ser necesario hacer nada especial si se está en la primera pregunta
        }
    };

    const handleRespuestaChange = (respuestaSeleccionada) => {
        const nuevasRespuestas = [...respuestas];
        nuevasRespuestas[preguntaActual] = respuestaSeleccionada;
        setRespuestas(nuevasRespuestas);
    };

    const enviarEvaluacion = async () => {
        // Preparar los datos para enviar al servidor
        const data = {
            Id_Eval: evaluacion.Id_Eva, // Asegúrate de tener este dato disponible desde props
            Id_User: userId, // Asegúrate de tener este dato disponible desde props
            OBJ: respuestas.map((respuesta, index) => ({
                Id_Preg: evaluacion.preguntasevals[index].Id_Preg_Eval,
                Id_Res: respuesta
            }))
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': "Bearer " + token,
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const responseData = await response.json();
                setRespuestasDelServidor(responseData.data);
                console.log('Evaluación enviada exitosamente.');
                setEvaluacionFinalizada(true); // Marcar la evaluación como finalizada después de recibir la respuesta
            } else {
                console.error('Error al enviar la evaluación:', response.statusText);
            }
        } catch (error) {
            console.error('Error en la conexión:', error);
        }
    };

    // if (!evaluacion || !evaluacion.preguntasevals) {
    //     return (
    //         <div className="text-white">
    //             <p>Error: No se pudo cargar la evaluación.</p>
    //         </div>
    //     );
    // }

    if (evaluacionFinalizada) {
        return (
            <section className='w-full p-4 flex flex-col text-white items-center justify-center md:w-3/4 h-auto md:h-full bg-black'>
                <div className="text-white flex flex-col items-center">
                    <p>¡Evaluación finalizada!</p>
                    {/* Mostrar retroalimentación */}
                    <div className="mt-4">
                        {respuestasDelServidor.map((respuesta, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <p>Pregunta {index + 1}:</p>
                                <p>{respuesta.Correcta === 1 ? "Correcta" : "Incorrecta"}</p>
                            </div>
                        ))}
                    </div>
                    <button className='bg-verdeSena text-white p-2 rounded-lg font-medium mt-4' onClick={() => location.reload()}>Siguiente</button>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full p-4 flex flex-col text-white items-center justify-center lg:w-3/4 h-auto md:h-full bg-black">
            <div className='w-3/4 mx-auto'>
                <div className='my-4'>
                    <h4 className='text-white font-bold text-3xl mx-auto'>{titEval}</h4>
                    <p className='text-white font-regular mx-auto'>Completa esta evaluación para comprobar tus conocimientos.</p>
                </div>

                <div className='text-white'>
                    <p className='font-semibold text-xl mb-2'>{preguntaActual + 1}. {evaluacion.preguntasevals[preguntaActual].Text_Preg_Eval}</p>
                    <RadioGroup
                        defaultValue={null} // Ojo: esto depende de cómo manejes las respuestas
                        classNames={{ base: "p-3 bg-gray-900 rounded-lg" }}
                        value={respuestas[preguntaActual]}
                        onValueChange={(value) => handleRespuestaChange(value)}
                        radius='sm'
                    >
                        {evaluacion.preguntasevals[preguntaActual].Respuestas.map(res => (
                            <Radio classNames={{ label: "text-white" }} key={res.Id_Res_Eval} value={res.Id_Res_Eval}>
                                {res.Text_Resp_Eval}
                            </Radio>
                        ))}
                    </RadioGroup>
                </div>

                <div className='text-white w-full flex items-center justify-center mt-8'>
                    <span>Pregunta: {preguntaActual + 1}/{evaluacion.preguntasevals.length}</span>
                </div>

                <div className='w-full flex items-center justify-center gap-2 mt-4'>
                    <button className='bg-verdeSena text-white p-2 rounded-lg font-medium' onClick={anteriorPregunta} disabled={preguntaActual === 0}>Anterior</button>
                    {preguntaActual < evaluacion.preguntasevals.length - 1 ? (
                        <button className='bg-verdeSena text-white p-2 rounded-lg font-medium' onClick={siguientePregunta}>Siguiente</button>
                    ) : (
                        <button className='bg-verdeSena text-white p-2 rounded-lg font-medium' onClick={enviarEvaluacion}>Finalizar</button>
                    )}
                </div>
            </div>
        </section>
    );
}



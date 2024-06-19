import React from 'react'

export default function Question({ questionNumber, setDataQuestion, dataQuestion, dataAnswer, setDataAnswer }) {

    const handleChangeQuestion = (event) => {
        setDataQuestion(prev => ({...prev, [event.target.name]: event.target.value }))
        console.log(dataQuestion)
    }
    
    const handleChangeAnswer = (event) => {
        const { id, value } = event.target; // Obtén el ID y el valor del input
        const index = parseInt(id, 10); // Convierte el ID a un número, asumiendo que ID es un índice
    
        setDataAnswer(prev => {
            // Crea una copia del estado anterior
            const updatedRespuestas = [...prev.Respuestas];
            // Si el índice no existe, inicialízalo con un objeto vacío
            if (!updatedRespuestas[index]) {
                updatedRespuestas[index] = {
                    Text_Resp_Eval: '',
                    Resp_Correcta_Eval: 0
                };
            }
            // Actualiza la propiedad 'Text_Resp_Eval' del objeto en el índice correspondiente
            updatedRespuestas[index].Text_Resp_Eval = value;
            return {
                ...prev,
                Respuestas: updatedRespuestas
            };
        });
    
        console.log(dataAnswer); // Asumiendo que dataQuestion es otro estado o variable
    }

    const handleSelectChange = (event) => {
        const { value } = event.target;

        setDataAnswer(prev => ({
            ...prev,
            Respuestas: prev.Respuestas.map((respuesta, index) => ({
                ...respuesta,
                Resp_Correcta_Eval: index === parseInt(value) ? 1 : 0
            }))
        }));
        console.log(dataAnswer); // Asumiendo que dataQuestion es otro estado o variable
    };

    return (
        <div className='flex flex-col gap-1 w-full'>
            <h3 className='font-bold text-xl'>Pregunta {questionNumber}</h3>
            <form className='flex flex-col gap-4'>
                <div className='flex flex-col gap-1 w-full'>
                    <label className='font-semibold text-gray-600'>
                        Pregunta:
                    </label>
                    <textarea onChange={handleChangeQuestion} name='Text_Preg_Eval' type='text' className='w-full border-1 border-gray-600 focus:border-azulSena outline-none p-2 rounded-lg' />
                </div>
                <div className='flex flex-col sm:flex-row gap-2 w-full'>
                    <div>
                        <label className='font-semibold text-gray-600'>
                            Opción 1:
                        </label>
                        <textarea onChange={handleChangeAnswer} id='0' type='text' className='w-full border-1 border-gray-600 focus:border-azulSena outline-none p-2 rounded-lg' />
                    </div>
                    <div>
                        <label className='font-semibold text-gray-600'>
                            Opción 2:
                        </label>
                        <textarea onChange={handleChangeAnswer} id='1' type='text' className='w-full border-1 border-gray-600 focus:border-azulSena outline-none p-2 rounded-lg' />
                    </div>
                    <div>
                        <label className='font-semibold text-gray-600'>
                            Opción 3:
                        </label>
                        <textarea onChange={handleChangeAnswer} id='2' type='text' className='w-full border-1 border-gray-600 focus:border-azulSena outline-none p-2 rounded-lg' />
                    </div>
                    <div>
                        <label className='font-semibold text-gray-600'>
                            Opción 4:
                        </label>
                        <textarea onChange={handleChangeAnswer} id='3' type='text' className='w-full border-1 border-gray-600 focus:border-azulSena outline-none p-2 rounded-lg' />
                    </div>
                </div>
                <div className='flex flex-col gap-1 w-full'>
                    <label className='font-semibold text-gray-600'>
                        Respuesta correcta:
                    </label>
                    <select onChange={handleSelectChange} className='p-2 border rounded-lg border-gray-600 focus:border-azulSena outline-none'>
                        <option value={0}>Opción 1</option>
                        <option value={1}>Opción 2</option>
                        <option value={2}>Opción 3</option>
                        <option value={3}>Opción 4</option>
                    </select>
                </div>
            </form>
        </div>
    )
}


import React from 'react'
import { useSelector } from 'react-redux'

const AddQuestions = async ({ question, dataAnswer }) => {
    const authState = useSelector(state => state.auth);
    const user = authState.user;
    const token = authState.token;

    try {
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
    } catch (error) {
        console.log(error);
    } finally {
        location.reload();
    }
}

export default AddQuestions
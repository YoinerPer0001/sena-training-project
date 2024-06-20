import toast from "react-hot-toast";
// Funcion para capitalizar los textos
export const capitalizestr = (str) => {
  if (typeof str !== 'string') {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const getNumberOfClasses = (course) => {
  let numberOfClasses = 0;
  if (course.Modulocursos?.length == 0) {
    return 0;
  }
  course.Modulocursos?.forEach((modulo) => {
    numberOfClasses += modulo.Contenido_Modulos.length;
  });
  return numberOfClasses;
};

export const AddQuestions = async (question, Id_Eval, dataAnswer, token) => {
  let preguntaId = null
  try {
    const dataQuestion = { Text_Preg_Eval: question, Id_Eval }
    console.log(dataQuestion)
    // CREAR PREGUNTAS
    let createQuestions = await fetch('http://localhost:3000/api/v1/preguntasEval/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(dataQuestion)
    });
    let responseQuestions = await createQuestions.json();
    if (responseQuestions.code === 403) {
      toast.error('Todos los campos son obligatorios.');
      throw new Error('Error al crear las preguntas');
    } else if (responseQuestions.type === 'success') {
      preguntaId = responseQuestions.data.insertedId;
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
    } else if (responseAnswers.type === 'success') {
      location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}
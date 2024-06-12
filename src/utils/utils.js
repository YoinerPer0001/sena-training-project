

// Funcion para capitalizar los textos
export const capitalizestr = (str) => {
  if (typeof str !== 'string') {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const getNumberOfClasses = (course) => {
  let numberOfClasses = 0;
  if(course.Modulocursos?.length == 0) {
    return 0;
  }
  course.Modulocursos?.forEach((modulo) => {
    numberOfClasses += modulo.Contenido_Modulos.length;
  });
  return numberOfClasses;
};
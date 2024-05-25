import { useState } from "react";

const useEditCourse = () => {
    const [editCourse, setEditCourse] = useState({});

    const handleChangeName = e => {
        setEditCourse(prevState => ({
            ...prevState,
            Nom_Cur: e.target.value,
        }));
        console.log(editCourse);
    };

    const handleChangeDes = e => {
        setEditCourse(prevState => ({
            ...prevState,
            Des_Cur: e.target.value,
        }));
        console.log(editCourse);
    };

    const handleChangeCat = e => {
        setEditCourse(prevState => ({
            ...prevState,
            Id_Cat_FK: e.target.value,
        }));
        console.log(editCourse);
    };

    return {
        editCourse,
        handleChangeName,
        handleChangeDes,
        handleChangeCat,
    };
};

export default useEditCourse;
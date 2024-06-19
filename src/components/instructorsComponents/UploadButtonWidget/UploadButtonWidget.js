'use client'
import { memo } from 'react';
import { CldUploadWidget } from "next-cloudinary"; // Asegúrate de importar correctamente // Asegúrate de importar correctamente
import { Video } from 'lucide-react';

const UploadButtonWidget = memo(({ cont, subirVideoContenido, setContenidoVisible, label }) => {
    return (
        <CldUploadWidget onSuccess={(results) => {
            subirVideoContenido(cont.Id_Cont, results.info.secure_url);
            setContenidoVisible('');
        }} uploadPreset="senalearn" options={{ multiple: false, sources: ["local", "url", "google_drive"] }}>
            {({ open }) => {
                return (
                    <button
                        className="bg-azulSena text-sm flex items-center gap-1 text-white p-2 rounded-lg hover:bg-black transition-all duration-150"
                        onClick={() => open()}
                    >
                        <Video size={20} />{label}
                    </button>
                );
            }}
        </CldUploadWidget>
    );
});

UploadButtonWidget.displayName = 'UploadButtonWidget';

export default UploadButtonWidget;
'use client'
import React from 'react'; // Asegúrate de que estos imports sean correctos// Asegúrate de que estos imports sean correctos
import { NavHome } from '@/components/usersComponents/Nav/NavHome';
import { Footer } from '@/components/usersComponents/Footer/Footer';
import { Accordion, AccordionItem } from '@nextui-org/react';

const FAQPage = () => {
    const defaultContent = "Aquí va el contenido por defecto para las preguntas frecuentes.";

    return (
        <div className="flex flex-col min-h-screen">
            <NavHome />
            <main className="flex-grow max-w-[1024px] mx-auto my-[80px]">
                <header className="my-2">
                    <h1 className="font-bold text-3xl text-center my-2">Preguntas frecuentes</h1>
                    <p className="text-gray-600 font-medium">
                        Aquí encontrarás las respuestas a las preguntas más comunes sobre nuestra plataforma de cursos en línea. Si tienes alguna otra duda, no dudes en contactarnos.
                        <span className="underline text-azulSena">senalearn@gmail.com</span>
                    </p>
                </header>
                <div className='font-medium mt-6'>
                    <Accordion selectionMode="multiple" variant="splitted">
                        <AccordionItem key="1" aria-label="Accordion 1" title={<h4 className='text-lg font-bold'>¿Cómo me registro en la plataforma?</h4>}>
                            Para registrarte en nuestra plataforma, sigue estos pasos:
                            <ol className="list-decimal pl-6">
                                <li>Visita nuestro sitio web y haz clic en el botón &quot;Registrarse&quot;.</li>
                                <li>Completa el formulario de registro con tus datos personales y de contacto.</li>
                                <li>Elige el plan que se ajuste a tus necesidades y realiza el pago correspondiente.</li>
                                <li>Recibirás un correo electrónico de confirmación con tus credenciales de acceso.</li>
                            </ol>
                        </AccordionItem>
                        <AccordionItem key="2" aria-label="Accordion 2" title={<h4 className='text-lg font-bold'>¿Cómo puedo acceder a los cursos?</h4>}>
                            Una vez que hayas completado el registro, puedes acceder a los cursos de la siguiente manera:
                            <ol className="list-decimal pl-6">
                                <li>Inicia sesión en la plataforma utilizando tus credenciales de acceso.</li>
                                <li>Navega por el catálogo de cursos y selecciona el que deseas tomar.</li>
                                <li>Haz clic en el curso y comienza a aprender a tu propio ritmo.</li>
                                <li>Puedes acceder a los materiales del curso, realizar actividades y evaluaciones, y obtener el certificado al finalizar.</li>
                            </ol>
                        </AccordionItem>
                        <AccordionItem key="3" aria-label="Accordion 3" title={<h4 className='text-lg font-bold'>¿Cómo puedo recuperar mi contraseña?</h4>}>
                            Si has olvidado tu contraseña, haz clic en el enlace &quot;¿Olvidaste tu contraseña?&quot; en la página de inicio de sesión. Ingresa tu dirección de correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
                        </AccordionItem>
                        <AccordionItem key="4" aria-label="Accordion 4" title={<h4 className='text-lg font-bold'>¿Qué tipos de cursos ofrecen?</h4>}>
                            Ofrecemos una amplia variedad de cursos en diferentes áreas, como desarrollo web, diseño gráfico, marketing digital, programación, negocios y más. Puedes explorar nuestro catálogo para encontrar el curso que mejor se adapte a tus intereses y necesidades.
                        </AccordionItem>
                        <AccordionItem key="5" aria-label="Accordion 5" title={<h4 className='text-lg font-bold'>¿Puedo acceder a los cursos en cualquier momento?</h4>}>
                            Sí, nuestros cursos son de acceso on-demand, lo que significa que puedes acceder a ellos en cualquier momento y a tu propio ritmo. Una vez que te inscribes en un curso, tendrás acceso ilimitado al contenido.
                        </AccordionItem>
                        <AccordionItem key="6" aria-label="Accordion 6" title={<h4 className='text-lg font-bold'>¿Puedo usar mi cuenta en múltiples dispositivos?</h4>}>
                            Sí, puedes acceder a tu cuenta desde cualquier dispositivo con conexión a internet. Simplemente inicia sesión con tus credenciales y podrás continuar donde lo dejaste.
                        </AccordionItem>
                    </Accordion>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default FAQPage;
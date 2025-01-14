import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './App.css';

const App: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    corporateEmail: '',
    contactNumber: '',
    currentPosition: '',
    companyName: '',
    companySector: '',
    aiExperience: '',
    digitalTools: [],
    courseInterest: '',
    aiBenefits: [],
    aiImplementation: '',
    aiUnderstanding: '',
    automationKnowledge: 1,
    predictiveAnalysis: 1,
    chatbotsKnowledge: 1,
    contentGenerationKnowledge: 1,
    receiveMaterials: false,
    dataConsent: false,
    additionalComments: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target
    const { name, value, type } = target;
    if (type === 'checkbox' && 'checked' in target) {
      setFormData({ ...formData, [name]:  (target as HTMLInputElement).checked  });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, [e.target.name]: selectedOptions });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const scriptURL = 'https://script.google.com/macros/s/AKfycby4J1mSc8KOOwCHb6sPArPtP3-uy-tXZYgK5WY-djBXee2h1Y8P7p0J_VlTPyMrGKMf5w/exec';
    try {
      await fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    } catch (error) {
      console.error('Error sending data to Google Sheets:', error);
    }

    const serviceID = 'service_1ai7fib';
    const templateID = 'template_h31ao92';
    const userID = 'k3Gtkyg7rjueQ6Ff2';

    emailjs.send(serviceID, templateID, formData, userID)
      .then((response) => {
        console.log('Email sent successfully:', response);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });

    console.log('Form data submitted:', formData);

    setFormData({
      fullName: '',
      corporateEmail: '',
      contactNumber: '',
      currentPosition: '',
      companyName: '',
      companySector: '',
      aiExperience: '',
      digitalTools: [],
      courseInterest: '',
      aiBenefits: [],
      aiImplementation: '',
      aiUnderstanding: '',
      automationKnowledge: 1,
      predictiveAnalysis: 1,
      chatbotsKnowledge: 1,
      contentGenerationKnowledge: 1,
      receiveMaterials: false,
      dataConsent: false,
      additionalComments: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Formulario de Registro: Curso de IA para Directores</h2>

        {/* Sección 1: Información Personal y Profesional */}
        <h3 className="text-xl font-semibold mb-2">Sección 1: Información Personal y Profesional</h3>
        <label className="block mb-2">Nombre Completo</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-2 border rounded mb-4" required />

        <label className="block mb-2">Correo Electrónico Corporativo</label>
        <input type="email" name="corporateEmail" value={formData.corporateEmail} onChange={handleChange} className="w-full p-2 border rounded mb-4" required />

        <label className="block mb-2">Teléfono de Contacto</label>
        <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} className="w-full p-2 border rounded mb-4" required />

        <label className="block mb-2">Puesto / Cargo Actual</label>
        <input type="text" name="currentPosition" value={formData.currentPosition} onChange={handleChange} className="w-full p-2 border rounded mb-4" required />

        <label className="block mb-2">Nombre de la Empresa</label>
        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full p-2 border rounded mb-4" required />

        <label className="block mb-2">Sector de la Empresa</label>
        <select name="companySector" value={formData.companySector} onChange={handleChange} className="w-full p-2 border rounded mb-4" required>
          <option value="">Seleccione una opción</option>
          <option value="Finanzas">Finanzas</option>
          <option value="Tecnología">Tecnología</option>
          <option value="Manufactura">Manufactura</option>
          <option value="Salud">Salud</option>
          <option value="Educación">Educación</option>
          <option value="Otros">Otros</option>
        </select>

        <label className="block mb-2">¿Tienes alguna experiencia previa con herramientas de Inteligencia Artificial?</label>
        <select name="aiExperience" value={formData.aiExperience} onChange={handleChange} className="w-full p-2 border rounded mb-4" required>
          <option value="">Seleccione una opción</option>
          <option value="Sí, uso herramientas de IA regularmente.">Sí, uso herramientas de IA regularmente.</option>
          <option value="He escuchado de IA, pero no la he usado.">He escuchado de IA, pero no la he usado.</option>
          <option value="No tengo experiencia con IA.">No tengo experiencia con IA.</option>
        </select>

        <label className="block mb-2">¿Qué herramientas digitales utilizas en tu día a día?</label>
        <select multiple name="digitalTools" value={formData.digitalTools} onChange={handleMultiSelectChange} className="w-full p-2 border rounded mb-4">
          <option value="CRM">CRM (Customer Relationship Management)</option>
          <option value="ERP">ERP (Enterprise Resource Planning)</option>
          <option value="Marketing Automation">Herramientas de Automatización de Marketing</option>
          <option value="Chatbots">Chatbots</option>
          <option value="Content Generators">Generadores de Contenido (ChatGPT, Jasper, etc.)</option>
          <option value="Others">Otros</option>
        </select>

        {/* Sección 2: Expectativas del Curso */}
        <h3 className="text-xl font-semibold mb-2">Sección 2: Expectativas del Curso</h3>
        <label className="block mb-2">¿Cuál es tu principal interés en este curso?</label>
        <textarea name="courseInterest" value={formData.courseInterest} onChange={handleChange} className="w-full p-2 border rounded mb-4" placeholder="Ejemplo: 'Quiero aprender cómo la IA puede optimizar procesos en mi empresa.'" required></textarea>

        <label className="block mb-2">¿Qué áreas de tu empresa crees que podrían beneficiarse más de la IA?</label>
        <select multiple name="aiBenefits" value={formData.aiBenefits} onChange={handleMultiSelectChange} className="w-full p-2 border rounded mb-4">
          <option value="Atención al Cliente">Atención al Cliente</option>
          <option value="Ventas">Ventas</option>
          <option value="Marketing">Marketing</option>
          <option value="Operaciones">Operaciones</option>
          <option value="Finanzas">Finanzas</option>
          <option value="Recursos Humanos">Recursos Humanos</option>
        </select>

        <label className="block mb-2">¿Has considerado implementar IA en tu empresa?</label>
        <select name="aiImplementation" value={formData.aiImplementation} onChange={handleChange} className="w-full p-2 border rounded mb-4" required>
          <option value="">Seleccione una opción</option>
          <option value="Sí, ya hemos comenzado.">Sí, ya hemos comenzado.</option>
          <option value="No, pero queremos explorar opciones.">No, pero queremos explorar opciones.</option>
          <option value="No, aún no estamos preparados.">No, aún no estamos preparados.</option>
        </select>

        {/* Sección 3: Conocimientos Previos y Uso de IA */}
        <h3 className="text-xl font-semibold mb-2">Sección 3: Conocimientos Previos y Uso de IA</h3>
        <label className="block mb-2">¿Qué entiendes por Inteligencia Artificial?</label>
        <textarea name="aiUnderstanding" value={formData.aiUnderstanding} onChange={handleChange} className="w-full p-2 border rounded mb-4" placeholder="Ejemplo: 'Sistemas que pueden aprender y automatizar procesos.'" required></textarea>

        <label className="block mb-2">¿Qué tanto conoces sobre estos temas? (Escala del 1 al 5)</label>
        <label className="block mb-2">Automatización de Tareas</label>
        <input type="range" name="automationKnowledge" min="1" max="5" value={formData.automationKnowledge} onChange={handleChange} className="w-full mb-4" />
        <label htmlFor=""> {formData.automationKnowledge}</label>

        <label className="block mb-2">Análisis Predictivo</label>
        <input type="range" name="predictiveAnalysis" min="1" max="5" value={formData.predictiveAnalysis} onChange={handleChange} className="w-full mb-4" />
        <label htmlFor="">{formData.predictiveAnalysis}</label>

        <label className="block mb-2">Chatbots y Asistentes Virtuales</label>
        <input type="range" name="chatbotsKnowledge" min="1" max="5" value={formData.chatbotsKnowledge} onChange={handleChange} className="w-full mb-4" />
        <label htmlFor="">{formData.chatbotsKnowledge}</label>

        <label className="block mb-2">Generación de Contenidos con IA</label>
        <input type="range" name="contentGenerationKnowledge" min="1" max="5" value={formData.contentGenerationKnowledge} onChange={handleChange} className="w-full mb-4" />
        <label htmlFor="">{formData.contentGenerationKnowledge}</label>

        {/* Sección 4: Consentimiento y Confirmación */}
        <h3 className="text-xl font-semibold mb-2">Sección 4: Consentimiento y Confirmación</h3>
        <label className="block mb-2">¿Deseas recibir materiales adicionales y actualizaciones del curso?</label>
        <input type="checkbox" name="receiveMaterials" checked={formData.receiveMaterials} onChange={handleChange} className="mr-2" /> Sí, deseo recibirlos por correo electrónico.

        <label className="block mb-2">Consentimiento de Uso de Datos</label>
        <input type="checkbox" name="dataConsent" checked={formData.dataConsent} onChange={handleChange} className="mr-2" required /> Acepto que mis datos sean utilizados exclusivamente para fines relacionados con este curso.

        <label className="block mb-2">Comentarios Adicionales</label>
        <textarea name="additionalComments" value={formData.additionalComments} onChange={handleChange} className="w-full p-2 border rounded mb-4" placeholder="Ejemplo: '¿Hay algún tema específico que te gustaría tratar durante el curso?'" />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Enviar Registro</button>
      </form>
    </div>
  );
};

export default App;

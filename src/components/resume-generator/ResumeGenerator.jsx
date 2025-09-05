import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaEye, FaEdit, FaTrash, FaPlus, FaFilePdf } from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ResumeGenerator = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      website: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: []
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: Date.now(),
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
        current: false
      }]
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, {
        id: Date.now(),
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: ''
      }]
    }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, {
        id: Date.now(),
        name: '',
        description: '',
        technologies: '',
        link: '',
        github: ''
      }]
    }));
  };

  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, { id: Date.now(), name: '', level: 50 }]
    }));
  };

  const updateField = (section, id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const deleteItem = (section, id) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };

  const generateResume = async () => {
    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    setPreviewMode(true);
  };

  const downloadResumeHTML = () => {
    const element = document.createElement('a');
    const file = new Blob([generateResumeHTML()], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = `${resumeData.personalInfo.name || 'resume'}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadResumePDF = async () => {
    try {
      setIsGenerating(true);
      
      // Create a temporary container for PDF generation
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.style.width = '210mm'; // A4 width
      tempContainer.style.backgroundColor = 'white';
      tempContainer.style.color = 'black';
      tempContainer.style.padding = '20mm';
      tempContainer.style.fontFamily = 'Arial, sans-serif';
      tempContainer.style.fontSize = '12px';
      tempContainer.style.lineHeight = '1.4';
      
      // Generate HTML content for PDF
      tempContainer.innerHTML = generateResumePDFHTML();
      document.body.appendChild(tempContainer);
      
      // Convert to canvas and then to PDF
      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // Clean up
      document.body.removeChild(tempContainer);
      
      // Download PDF
      pdf.save(`${resumeData.personalInfo.name || 'resume'}.pdf`);
      setIsGenerating(false);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      setIsGenerating(false);
      alert('Error generating PDF. Please try again.');
    }
  };

  const generateResumePDFHTML = () => {
    return `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #00d4ff; padding-bottom: 20px;">
          <h1 style="color: #00d4ff; font-size: 32px; margin: 0 0 10px 0;">${resumeData.personalInfo.name || 'Your Name'}</h1>
          <div style="color: #666; font-size: 14px;">
            <p style="margin: 2px 0;">${resumeData.personalInfo.email || 'your.email@example.com'}</p>
            <p style="margin: 2px 0;">${resumeData.personalInfo.phone || 'Your Phone'}</p>
            <p style="margin: 2px 0;">${resumeData.personalInfo.location || 'Your Location'}</p>
            ${resumeData.personalInfo.linkedin ? `<p style="margin: 2px 0;">LinkedIn: ${resumeData.personalInfo.linkedin}</p>` : ''}
            ${resumeData.personalInfo.github ? `<p style="margin: 2px 0;">GitHub: ${resumeData.personalInfo.github}</p>` : ''}
          </div>
        </div>

        ${resumeData.summary ? `
        <div style="margin-bottom: 25px;">
          <h2 style="color: #00d4ff; font-size: 18px; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">PROFESSIONAL SUMMARY</h2>
          <p style="margin: 0; text-align: justify;">${resumeData.summary}</p>
        </div>
        ` : ''}

        ${resumeData.experience.length > 0 ? `
        <div style="margin-bottom: 25px;">
          <h2 style="color: #00d4ff; font-size: 18px; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 5px;">PROFESSIONAL EXPERIENCE</h2>
          ${resumeData.experience.map(exp => `
            <div style="margin-bottom: 20px;">
              <h3 style="color: #333; font-size: 16px; margin: 0 0 5px 0;">${exp.position || 'Position'}</h3>
              <p style="color: #00d4ff; font-weight: bold; margin: 0 0 5px 0;">${exp.company || 'Company'}</p>
              <p style="color: #666; font-size: 14px; margin: 0 0 10px 0;">${exp.startDate || 'Start Date'} - ${exp.current ? 'Present' : (exp.endDate || 'End Date')}</p>
              <p style="margin: 0; text-align: justify;">${exp.description || 'Job description'}</p>
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${resumeData.education.length > 0 ? `
        <div style="margin-bottom: 25px;">
          <h2 style="color: #00d4ff; font-size: 18px; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 5px;">EDUCATION</h2>
          ${resumeData.education.map(edu => `
            <div style="margin-bottom: 15px;">
              <h3 style="color: #333; font-size: 16px; margin: 0 0 5px 0;">${edu.degree || 'Degree'} in ${edu.field || 'Field of Study'}</h3>
              <p style="color: #00d4ff; font-weight: bold; margin: 0 0 5px 0;">${edu.institution || 'Institution'}</p>
              <p style="color: #666; font-size: 14px; margin: 0;">${edu.startDate || 'Start Date'} - ${edu.endDate || 'End Date'}</p>
              ${edu.gpa ? `<p style="color: #666; font-size: 14px; margin: 5px 0 0 0;">GPA: ${edu.gpa}</p>` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${resumeData.skills.length > 0 ? `
        <div style="margin-bottom: 25px;">
          <h2 style="color: #00d4ff; font-size: 18px; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 5px;">TECHNICAL SKILLS</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${resumeData.skills.map(skill => `
              <span style="background-color: #f0f8ff; color: #00d4ff; padding: 4px 12px; border-radius: 15px; font-size: 12px; border: 1px solid #00d4ff;">${skill.name || 'Skill'}</span>
            `).join('')}
          </div>
        </div>
        ` : ''}

        ${resumeData.projects.length > 0 ? `
        <div style="margin-bottom: 25px;">
          <h2 style="color: #00d4ff; font-size: 18px; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 5px;">PROJECTS</h2>
          ${resumeData.projects.map(project => `
            <div style="margin-bottom: 20px;">
              <h3 style="color: #333; font-size: 16px; margin: 0 0 5px 0;">${project.name || 'Project Name'}</h3>
              <p style="margin: 0 0 8px 0; text-align: justify;">${project.description || 'Project description'}</p>
              <p style="color: #666; font-size: 14px; margin: 0 0 5px 0;"><strong>Technologies:</strong> ${project.technologies || 'Technologies used'}</p>
              ${project.link ? `<p style="color: #00d4ff; font-size: 14px; margin: 0 0 5px 0;"><strong>Live Demo:</strong> ${project.link}</p>` : ''}
              ${project.github ? `<p style="color: #00d4ff; font-size: 14px; margin: 0;"><strong>GitHub:</strong> ${project.github}</p>` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}
      </div>
    `;
  };

  const generateResumeHTML = () => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${resumeData.personalInfo.name} - Resume</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .gradient-text { background: linear-gradient(135deg, #0066ff 0%, #00d4ff 50%, #00ff88 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .gradient-bg { background: linear-gradient(135deg, #0066ff 0%, #00d4ff 50%, #00ff88 100%); }
    </style>
</head>
<body class="bg-gray-900 text-white min-h-screen">
    <div class="max-w-4xl mx-auto p-8">
        <header class="text-center mb-8">
            <h1 class="text-4xl font-bold gradient-text mb-2">${resumeData.personalInfo.name}</h1>
            <div class="text-gray-300 space-y-1">
                <p>${resumeData.personalInfo.email}</p>
                <p>${resumeData.personalInfo.phone}</p>
                <p>${resumeData.personalInfo.location}</p>
                ${resumeData.personalInfo.linkedin ? `<p><a href="${resumeData.personalInfo.linkedin}" class="text-blue-400 hover:text-blue-300">LinkedIn</a></p>` : ''}
                ${resumeData.personalInfo.github ? `<p><a href="${resumeData.personalInfo.github}" class="text-blue-400 hover:text-blue-300">GitHub</a></p>` : ''}
            </div>
        </header>

        ${resumeData.summary ? `
        <section class="mb-8">
            <h2 class="text-2xl font-bold gradient-text mb-4">Professional Summary</h2>
            <p class="text-gray-300 leading-relaxed">${resumeData.summary}</p>
        </section>
        ` : ''}

        ${resumeData.experience.length > 0 ? `
        <section class="mb-8">
            <h2 class="text-2xl font-bold gradient-text mb-4">Experience</h2>
            ${resumeData.experience.map(exp => `
                <div class="mb-6 p-4 bg-gray-800 rounded-lg">
                    <h3 class="text-xl font-semibold">${exp.position}</h3>
                    <p class="text-blue-400">${exp.company}</p>
                    <p class="text-gray-400 text-sm">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</p>
                    <p class="text-gray-300 mt-2">${exp.description}</p>
                </div>
            `).join('')}
        </section>
        ` : ''}

        ${resumeData.education.length > 0 ? `
        <section class="mb-8">
            <h2 class="text-2xl font-bold gradient-text mb-4">Education</h2>
            ${resumeData.education.map(edu => `
                <div class="mb-4 p-4 bg-gray-800 rounded-lg">
                    <h3 class="text-xl font-semibold">${edu.degree} in ${edu.field}</h3>
                    <p class="text-blue-400">${edu.institution}</p>
                    <p class="text-gray-400 text-sm">${edu.startDate} - ${edu.endDate}</p>
                    ${edu.gpa ? `<p class="text-gray-300">GPA: ${edu.gpa}</p>` : ''}
                </div>
            `).join('')}
        </section>
        ` : ''}

        ${resumeData.skills.length > 0 ? `
        <section class="mb-8">
            <h2 class="text-2xl font-bold gradient-text mb-4">Skills</h2>
            <div class="flex flex-wrap gap-2">
                ${resumeData.skills.map(skill => `
                    <span class="px-3 py-1 bg-gradient-to-r from-blue-600 to-green-500 rounded-full text-sm">${skill.name}</span>
                `).join('')}
            </div>
        </section>
        ` : ''}

        ${resumeData.projects.length > 0 ? `
        <section class="mb-8">
            <h2 class="text-2xl font-bold gradient-text mb-4">Projects</h2>
            ${resumeData.projects.map(project => `
                <div class="mb-4 p-4 bg-gray-800 rounded-lg">
                    <h3 class="text-xl font-semibold">${project.name}</h3>
                    <p class="text-gray-300 mt-2">${project.description}</p>
                    <p class="text-blue-400 text-sm mt-2">Technologies: ${project.technologies}</p>
                    ${project.link ? `<p class="text-sm mt-1"><a href="${project.link}" class="text-blue-400 hover:text-blue-300">Live Demo</a></p>` : ''}
                    ${project.github ? `<p class="text-sm"><a href="${project.github}" class="text-blue-400 hover:text-blue-300">GitHub</a></p>` : ''}
                </div>
            `).join('')}
        </section>
        ` : ''}
    </div>
</body>
</html>`;
  };

  if (previewMode) {
    return (
      <div className="w-full py-20 border-b-[1px] border-b-black">
        <div className="flex justify-center items-center text-center mb-8">
          <Title title="RESUME PREVIEW" des="Generated Resume" />
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-4 mb-6 flex-wrap">
            <button
              onClick={downloadResumePDF}
              disabled={isGenerating}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-700 hover:to-red-600 transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
            >
              <FaFilePdf /> {isGenerating ? 'Generating PDF...' : 'Download PDF'}
            </button>
            <button
              onClick={downloadResumeHTML}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-lg hover:from-blue-700 hover:to-green-600 transition-all duration-300 flex items-center gap-2"
            >
              <FaDownload /> Download HTML
            </button>
            <button
              onClick={() => setPreviewMode(false)}
              className="px-6 py-3 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center gap-2"
            >
              <FaEdit /> Edit Resume
            </button>
          </div>
          <div 
            className="bg-gray-900 rounded-lg p-8"
            dangerouslySetInnerHTML={{ __html: generateResumeHTML() }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-20 border-b-[1px] border-b-black">
      <div className="flex justify-center items-center text-center mb-8">
        <Title title="RESUME GENERATOR" des="Create Your Professional Resume" />
      </div>
      
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Personal Information */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-2xl font-bold gradient-text mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={resumeData.personalInfo.name}
                onChange={(e) => setResumeData(prev => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, name: e.target.value }
                }))}
                className="contactInput"
              />
              <input
                type="email"
                placeholder="Email"
                value={resumeData.personalInfo.email}
                onChange={(e) => setResumeData(prev => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, email: e.target.value }
                }))}
                className="contactInput"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={resumeData.personalInfo.phone}
                onChange={(e) => setResumeData(prev => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, phone: e.target.value }
                }))}
                className="contactInput"
              />
              <input
                type="text"
                placeholder="Location"
                value={resumeData.personalInfo.location}
                onChange={(e) => setResumeData(prev => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, location: e.target.value }
                }))}
                className="contactInput"
              />
              <input
                type="url"
                placeholder="LinkedIn URL"
                value={resumeData.personalInfo.linkedin}
                onChange={(e) => setResumeData(prev => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, linkedin: e.target.value }
                }))}
                className="contactInput"
              />
              <input
                type="url"
                placeholder="GitHub URL"
                value={resumeData.personalInfo.github}
                onChange={(e) => setResumeData(prev => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, github: e.target.value }
                }))}
                className="contactInput"
              />
            </div>
          </div>

          {/* Professional Summary */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-2xl font-bold gradient-text mb-4">Professional Summary</h3>
            <textarea
              placeholder="Write a brief summary of your professional background and key achievements..."
              value={resumeData.summary}
              onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
              className="contactTextArea h-32"
            />
          </div>

          {/* Experience */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold gradient-text">Experience</h3>
              <button
                onClick={addExperience}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-lg hover:from-blue-700 hover:to-green-600 transition-all duration-300 flex items-center gap-2"
              >
                <FaPlus /> Add Experience
              </button>
            </div>
            {resumeData.experience.map((exp, index) => (
              <div key={exp.id} className="border border-gray-700 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-semibold">Experience #{index + 1}</h4>
                  <button
                    onClick={() => deleteItem('experience', exp.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <FaTrash />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={exp.position}
                    onChange={(e) => updateField('experience', exp.id, 'position', e.target.value)}
                    className="contactInput"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => updateField('experience', exp.id, 'company', e.target.value)}
                    className="contactInput"
                  />
                  <input
                    type="text"
                    placeholder="Start Date (MM/YYYY)"
                    value={exp.startDate}
                    onChange={(e) => updateField('experience', exp.id, 'startDate', e.target.value)}
                    className="contactInput"
                  />
                  <input
                    type="text"
                    placeholder="End Date (MM/YYYY) or leave empty if current"
                    value={exp.endDate}
                    onChange={(e) => updateField('experience', exp.id, 'endDate', e.target.value)}
                    className="contactInput"
                  />
                </div>
                <textarea
                  placeholder="Job description and key achievements..."
                  value={exp.description}
                  onChange={(e) => updateField('experience', exp.id, 'description', e.target.value)}
                  className="contactTextArea h-24 mt-4"
                />
                <label className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => updateField('experience', exp.id, 'current', e.target.checked)}
                    className="mr-2"
                  />
                  Currently working here
                </label>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold gradient-text">Education</h3>
              <button
                onClick={addEducation}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-lg hover:from-blue-700 hover:to-green-600 transition-all duration-300 flex items-center gap-2"
              >
                <FaPlus /> Add Education
              </button>
            </div>
            {resumeData.education.map((edu, index) => (
              <div key={edu.id} className="border border-gray-700 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-semibold">Education #{index + 1}</h4>
                  <button
                    onClick={() => deleteItem('education', edu.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <FaTrash />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => updateField('education', edu.id, 'degree', e.target.value)}
                    className="contactInput"
                  />
                  <input
                    type="text"
                    placeholder="Field of Study"
                    value={edu.field}
                    onChange={(e) => updateField('education', edu.id, 'field', e.target.value)}
                    className="contactInput"
                  />
                  <input
                    type="text"
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) => updateField('education', edu.id, 'institution', e.target.value)}
                    className="contactInput"
                  />
                  <input
                    type="text"
                    placeholder="GPA (optional)"
                    value={edu.gpa}
                    onChange={(e) => updateField('education', edu.id, 'gpa', e.target.value)}
                    className="contactInput"
                  />
                  <input
                    type="text"
                    placeholder="Start Date (MM/YYYY)"
                    value={edu.startDate}
                    onChange={(e) => updateField('education', edu.id, 'startDate', e.target.value)}
                    className="contactInput"
                  />
                  <input
                    type="text"
                    placeholder="End Date (MM/YYYY)"
                    value={edu.endDate}
                    onChange={(e) => updateField('education', edu.id, 'endDate', e.target.value)}
                    className="contactInput"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold gradient-text">Skills</h3>
              <button
                onClick={addSkill}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-lg hover:from-blue-700 hover:to-green-600 transition-all duration-300 flex items-center gap-2"
              >
                <FaPlus /> Add Skill
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resumeData.skills.map((skill, index) => (
                <div key={skill.id} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Skill name"
                    value={skill.name}
                    onChange={(e) => updateField('skills', skill.id, 'name', e.target.value)}
                    className="contactInput flex-1"
                  />
                  <button
                    onClick={() => deleteItem('skills', skill.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold gradient-text">Projects</h3>
              <button
                onClick={addProject}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-lg hover:from-blue-700 hover:to-green-600 transition-all duration-300 flex items-center gap-2"
              >
                <FaPlus /> Add Project
              </button>
            </div>
            {resumeData.projects.map((project, index) => (
              <div key={project.id} className="border border-gray-700 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-semibold">Project #{index + 1}</h4>
                  <button
                    onClick={() => deleteItem('projects', project.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <FaTrash />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Project Name"
                    value={project.name}
                    onChange={(e) => updateField('projects', project.id, 'name', e.target.value)}
                    className="contactInput"
                  />
                  <input
                    type="text"
                    placeholder="Technologies Used"
                    value={project.technologies}
                    onChange={(e) => updateField('projects', project.id, 'technologies', e.target.value)}
                    className="contactInput"
                  />
                  <input
                    type="url"
                    placeholder="Live Demo URL"
                    value={project.link}
                    onChange={(e) => updateField('projects', project.id, 'link', e.target.value)}
                    className="contactInput"
                  />
                  <input
                    type="url"
                    placeholder="GitHub URL"
                    value={project.github}
                    onChange={(e) => updateField('projects', project.id, 'github', e.target.value)}
                    className="contactInput"
                  />
                </div>
                <textarea
                  placeholder="Project description..."
                  value={project.description}
                  onChange={(e) => updateField('projects', project.id, 'description', e.target.value)}
                  className="contactTextArea h-24 mt-4"
                />
              </div>
            ))}
          </div>

          {/* Generate Button */}
          <div className="text-center">
            <button
              onClick={generateResume}
              disabled={isGenerating}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-500 text-white text-lg font-semibold rounded-lg hover:from-blue-700 hover:to-green-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Generating Resume...
                </>
              ) : (
                <>
                  <FaEye /> Generate Resume
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Title component (assuming it exists)
const Title = ({ title, des }) => (
  <div className="flex flex-col gap-4 font-titleFont mb-14">
    <h3 className="text-sm uppercase font-light text-designColor tracking-wide">
      {title}
    </h3>
    <h1 className="text-4xl md:text-5xl text-gray-300 font-bold capitalize">
      {des}
    </h1>
  </div>
);

export default ResumeGenerator;

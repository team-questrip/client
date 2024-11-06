import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SURVEY_FORM } from '../constants/survey';

const Survey = () => {
  const [language, setLanguage] = useState<string>('English');
  const navigate = useNavigate();
  const handleButtonClick = () => {
    if (language) {
      const url = getSurveyUrl(language);
      window.open(url, '_blank');
      navigate('/');
    }
  };

  const getSurveyUrl = (language: string) => {
    switch (language) {
      case 'English':
        return SURVEY_FORM.english;
      case '中文':
        return SURVEY_FORM.chinese;
      case '日本語':
        return SURVEY_FORM.japanese;
      case '臺語':
        return SURVEY_FORM.taiwanese;
      case '廣東話':
        return SURVEY_FORM.cantonese;
      case 'ภาษาไทย':
        return SURVEY_FORM.thai;
      case 'tiếng Việt':
        return SURVEY_FORM.vietnamese;
      case 'العربية':
        return SURVEY_FORM.arabic;
      case 'Русский':
        return SURVEY_FORM.russian;
      case 'Français':
        return SURVEY_FORM.french;
      case 'Español':
        return SURVEY_FORM.spanish;
      case 'Deutsch':
        return SURVEY_FORM.german;
      default:
        return '#';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md items-center justify-center">
          <h1 className="text-2xl mb-4 font-semibold text-center">
            Select Language
          </h1>
          <select
            className="w-full h-[56px] p-2 border rounded-xl mb-4 bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-orange items-center justify-center"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="English">English</option>
            <option value="中文">中文</option>
            <option value="日本語">日本語</option>
            <option value="臺語">臺語</option>
            <option value="廣東話">廣東話</option>
            <option value="ภาษาไทย">ภาษาไทย</option>
            <option value="tiếng Việt">tiếng Việt</option>
            <option value="العربية">العربية</option>
            <option value="Русский">Русский</option>
            <option value="Français">Français</option>
            <option value="Español">Español</option>
            <option value="Deutsch">Deutsch</option>
          </select>
          <button
            className="w-full h-[56px] bg-subColor text-white px-4 py-2 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary-orange"
            onClick={handleButtonClick}
          >
            Start Survey
          </button>
        </div>
      </div>
    </div>
  );
};

export default Survey;

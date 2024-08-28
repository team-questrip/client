import React, { useState } from 'react';
import Button from '../components/Button';
import GoBackHeader from '../components/GoBackHeader/GoBackHeader';
import { useNavigate } from 'react-router-dom';

const NPSForm = () => {
  const [npsScore, setNpsScore] = useState<number | undefined>(undefined);
  const [feedback, setFeedback] = useState('');
  const [charCount, setCharCount] = useState(0);

  const handleNpsChange = (score: number) => {
    setNpsScore(score);
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setFeedback(inputValue);
    setCharCount(inputValue.length);
  };

  const handleSubmit = () => {
    alert(`Submitted NPS: ${npsScore}, Feedback: ${feedback}`);
  };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative h-full">
      <GoBackHeader onBack={handleBack}></GoBackHeader>
      <div className="text-xl font-bold mb-4">
        How would you introduce Questrip app to your friends who are visiting
        Korea?
      </div>
      <div className="flex flex-wrap justify-start items-start gap-2.5 mb-6">
        {Array.from({ length: 12 }, (_, index) => (
          <button
            key={index}
            className={`px-4 py-1.5 flex-col rounded-full justify-center items-center ${
              npsScore === index
                ? 'bg-primary text-white'
                : 'bg-secondaryBackground'
            } hover:bg-primary`}
            onClick={() => handleNpsChange(index)}
          >
            {index}
          </button>
        ))}
      </div>

      <div className="text-xl font-bold mb-4">
        Any messages that you would like to give? (optional)
      </div>
      <div className="text-right text-sm text-hintText mb-4">
        {charCount}/500
      </div>
      <textarea
        className="w-full h-24 p-4 border border-hintText rounded mb-2"
        placeholder="Feel free to send us your opinions"
        value={feedback}
        onChange={handleFeedbackChange}
        maxLength={500}
      />
      <Button
        onClick={handleSubmit}
        type="submit"
        text="Submit"
        className="absolute bottom-5 left-0"
      />
    </div>
  );
};

export default NPSForm;

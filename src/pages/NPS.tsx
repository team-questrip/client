import React, { FormEvent, useState } from 'react';
import Button from '../components/@common/Button';
import GoBackHeader from '../components/@common/GoBackHeader/GoBackHeader';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/@common/ErrorMessage';

const NPSForm = () => {
  const [npsScore, setNpsScore] = useState<number>();
  const [feedback, setFeedback] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [error, setError] = useState<string | null>();

  const handleNpsChange = (score: number) => {
    setError(null);
    setNpsScore(score);
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setFeedback(inputValue);
    setCharCount(inputValue.length);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (npsScore === undefined) {
      setError('This is required.');
    }

    // todo: api 요청 보내기
  };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <GoBackHeader onBack={handleBack} className="mb-5" />
      <form onSubmit={handleSubmit}>
        <div className="text-xl font-bold mb-4">
          How would you introduce Questrip app to your friends who are visiting
          Korea?
        </div>
        <div className="flex flex-wrap justify-start items-start gap-2.5 mb-2">
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
        <ErrorMessage message={error} />
        <div className="text-xl font-bold mb-4">
          Any messages that you would like to give? (optional)
        </div>
        <div className="text-right text-sm text-hintText mb-4">
          {charCount}/500
        </div>
        <textarea
          className="w-full h-24 p-4 border border-hintText rounded mb-2 resize-none"
          placeholder="Feel free to send us your opinions"
          value={feedback}
          onChange={handleFeedbackChange}
          maxLength={500}
        />
        <Button type="submit" text="Submit" className="mt-32" />
      </form>
    </>
  );
};

export default NPSForm;

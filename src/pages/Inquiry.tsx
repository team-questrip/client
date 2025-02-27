import { useForm, SubmitHandler } from 'react-hook-form';
import { InquiryCategory, InquiryInput } from '../types/inquiry';
import ErrorMessage from '../components/@common/ErrorMessage';
import { axiosInstance } from '../api/axiosInstance';
import GoBackHeader from '../components/@common/GoBackHeader/GoBackHeader';
import { useNavigate } from 'react-router-dom';

const Inquiry = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryInput>();
  const onSubmit: SubmitHandler<InquiryInput> = async (data) => {
    try {
      const response = await axiosInstance.post(`/api/v1/question`, data);

      if (response.data.status === 'SUCCESS') {
        alert('Submitted successfully :)');
        reset();
      } else {
        throw new Error('An error occurred while submitting the inquiry.');
      }
    } catch (error) {
      console.error('Error message:', error);
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      <GoBackHeader onBack={() => navigate(-1)}>
        <GoBackHeader.Title>{'Inquiry for Questrip'}</GoBackHeader.Title>
      </GoBackHeader>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 pt-5"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="userEmail" className="font-semibold">
            Your email
          </label>
          <input
            id="userEmail"
            className="border-b-[1px] text-sm"
            placeholder="example@example.com"
            {...register('userEmail', {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
          />
          {errors.userEmail?.type === 'required' && (
            <ErrorMessage message={'Please enter your email.'} />
          )}
          {errors.userEmail?.type === 'pattern' && (
            <ErrorMessage message={'Please enter your email correctely.'} />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="font-semibold">
            Type of Inquiry
          </label>
          <select
            id="category"
            className="text-sm"
            {...register('category', {
              required: 'Please select a category.',
              validate: (value) => value !== InquiryCategory.DEFAULT,
            })}
          >
            <option value={InquiryCategory.DEFAULT} hidden>
              Select category
            </option>
            <option value={InquiryCategory.SERVICE_QUESTION}>
              Service question
            </option>
            <option value={InquiryCategory.FEEDBACK}>Feedback</option>
          </select>
          {errors.category?.type === 'validate' && (
            <ErrorMessage message={'Please select a valid category.'} />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="content" className="font-semibold">
            Content
          </label>
          <textarea
            id="content"
            className="outline-none resize-none  bg-mainColor rounded-md p-3 h-40 overflow-scroll"
            placeholder="Please write your question for this service or feedback"
            {...register('content', {
              required: true,
            })}
          />

          {errors.content?.type === 'required' && (
            <ErrorMessage message={'Please fill the space.'} />
          )}
        </div>
        <button
          className="bg-subColor hover:bg-orange-500 rounded-md text-white p-2"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Inquiry;

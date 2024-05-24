import { ChangeEvent, FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api/axiosInstance";
import blankImage from "../../public/blank.png";
import "./SearchResults.css";
import { GoogleSearchResultItem } from "../../interface/google";

type FormState = {
  activity: string;
  recommendationReason: string;
  images: File[];
};

const textareaStyle =
  "resize-none block w-full h-[158px] border focus:border-subColor focus:outline-none rounded-xl p-6 text-sm";
const characterLimiterStyle = "absolute right-6 bottom-3 text-xs opacity-50";
const formH2Style = "text-subColor mb-3";

const SearchResults = () => {
  const [formState, setFormstate] = useState<FormState>({
    activity: "",
    recommendationReason: "",
    images: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const result = useLocation();
  const {
    place: { place_id, name, formatted_address },
  } = result.state as GoogleSearchResultItem;
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("activity", formState.activity);
    formData.append("recommendationReason", formState.recommendationReason);
    formData.append("googlePlaceId", place_id);

    if (formState.images) {
      Array.from(formState.images).forEach((image) => {
        formData.append("images", image);
      });
    }

    setIsLoading(true);
    document.body.classList.add("upload");
    try {
      await axiosInstance.post("api/v1/place", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsLoading(false);
      document.body.classList.remove("upload");
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      document.body.classList.remove("upload");
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="fixed w-screen h-screen top-0 left-0 bg-sky-500 bg-opacity-40 flex justify-center items-center z-20">
          <div className="loading"></div>
        </div>
      ) : null}
      <div className="h-full overflow-scroll pb-20">
        <h2 className="opacity-50 mb-6">Search Results</h2>
        <div className="flex mb-5">
          <div className="overflow-hidden basis-3/12 h-[80px] rounded-xl mr-4  ">
            <img
              className="w-full h-full"
              src={
                formState.images.length
                  ? URL.createObjectURL(formState.images[0])
                  : blankImage
              }
              alt={formState.images.length ? `${name} Image` : "Blank Image"}
            />
          </div>
          <div>
            <h3 className="font-bold">{name}</h3>
            <span className="text-sm opacity-50">{formatted_address}</span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <h2 className={formH2Style}>Why we recommend it *</h2>
          <div className="relative mb-5">
            <textarea
              className={textareaStyle}
              maxLength={500}
              name="activity"
              placeholder="Please write the reason for your recommendation"
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                setFormstate((prev: FormState) => ({
                  ...prev,
                  ["activity"]: e.target.value,
                }));
              }}
              required
            ></textarea>
            <span className={characterLimiterStyle}>
              {formState.activity.length}/500
            </span>
          </div>
          <h2 className={formH2Style}>Must do *</h2>
          <div className="relative mb-5">
            <textarea
              className={textareaStyle}
              maxLength={500}
              name="recommendationReason"
              placeholder="Please write the reason for your recommendation"
              required
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                setFormstate((prev: FormState) => ({
                  ...prev,
                  ["recommendationReason"]: e.target.value,
                }));
              }}
            ></textarea>
            <span className={characterLimiterStyle}>
              {formState.recommendationReason.length}/500
            </span>
          </div>
          <h2 className={formH2Style}>Select Image *</h2>
          <div>
            <label
              htmlFor="images"
              className="flex justify-center items-center w-full h-[158px] border border-dashed rounded-xl"
            >
              {formState.images.length ? (
                <img
                  className="w-full h-full object-fill"
                  src={URL.createObjectURL(formState.images[0])}
                  alt={
                    formState.images.length ? `${name} Image` : "Blank Image"
                  }
                />
              ) : (
                <span className="opacity-50 text-sm">Select Image</span>
              )}
            </label>
            <input
              type="file"
              id="images"
              name="images"
              className="hidden"
              required
              accept="image/*"
              multiple
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (!e.target.files) return;

                setFormstate((prev: FormState) => ({
                  ...prev,
                  ["images"]: Array.from(e.target.files as FileList),
                }));
              }}
            />
          </div>
          <button
            className="absolute bottom-0 left-0 bg-subColor disabled:bg-[#DBDBDB] text-white block w-full py-5 font-bold"
            type="submit"
          >
            registration
          </button>
        </form>
      </div>
    </>
  );
};

export default SearchResults;

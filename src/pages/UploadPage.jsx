import React, { useState } from "react";
import axios from "axios";
import Spinner from "../spinner";
// import HomeHeader from "../assets/Pneumonia.jpg";

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState("");
  // const [ setPneumoniaState] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setImagePreview(null);
    setResult("");
    // setPneumoniaState("");

    const file = event.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  //Call API to detect Pneumonia and set the state as the result
  // const handlePneumoniaDetection = () => {
  //   setLoading(true);
  //   // setPneumoniaState("Pneumonia Detected");
  //   setTimeout(() => setLoading(false), 2000);
  // };

  //Call API to process image and set the state as the result
  const handleDetectClick = () => {
    setLoading(true);
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    axios
      .post("http://localhost:5000/predict", formData)
      .then((response) => {
        setLoading(false);
        console.log(response.data);
        setResult(response.data?.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
        if (error.response) setError(error.response.data);
      });
  };

  console.log({ result });

  return (
    <>
      {/* <Spinner /> */}
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h1 className="text-center mt-2 text-uppercase">
            Upload Image for Pneumonia Detection
          </h1>
          <div className="d-flex flex-column align-items-center mt-5">
            <div>
              {/* File upload input */}
              <input type="file" onChange={handleFileChange} />
            </div>

            {/* Image preview */}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: "200px", height: "200px" }}
                className="img-thumbnail"
              />
            )}

            {/* <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div> */}
            {/* Process Image button */}
            <button
              type="button"
              className="btn btn-success mt-3"
              onClick={handleDetectClick}
            >
              Process Image
            </button>
            {result.length ? (
              <>
                <>
                  <h3 className="mt-4">Result:</h3>
                  <p>{result}</p>
                </>
              </>
            ) : (
              <></>
            )}

            {error ? (
              <>
                <p>{error}</p>
              </>
            ) : (
              <></>
            )}
          </div>
          {/* <div className="col">
            <img src={HomeHeader} alt="Home Header" className="img-fluid" />
          </div> */}
        </div>
      )}
    </>

    // <div className="row">
    //   <div className="col d-flex flex-column justify-content-center">
    // {/* File upload input */}
    // <input type="file" onChange={handleFileChange} />

    // {/* Image preview */}
    // {imagePreview && (
    //   <img
    //     src={imagePreview}
    //     alt="Preview"
    //     style={{ width: "200px", height: "200px" }}
    //     className="img-thumbnail"
    //   />
    // )}
    //   </div>

    //   <div className="col">
    // {/* Detect button */}
    // <button
    //   type="button"
    //   className="btn btn-success"
    //   onClick={handleDetectClick}
    // >
    //   Detect Pneumonia
    // </button>
    // {result ? <p>{result.message}</p> : <></>}
    //   </div>
    // </div>
  );
};

export default UploadPage;

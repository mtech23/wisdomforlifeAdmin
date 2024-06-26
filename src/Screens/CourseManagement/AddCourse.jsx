import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from "../../Components/CustomInput";
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
export const AddCourse = () => {
  const [categories, setCategories] = useState({});
  const [unit, setUnit] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    course_file: null,
    image: null,
    course_demo_video: null,
  });

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  //   console.log(formData);
  // };

  const [checkpermission, setCheckPermission] = useState(false);

  const handleChange = (event) => {
    const { name, value, checked } = event.target;

    if (name === "is_certified") {
      setCheckPermission(checked);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const filehandleChange = (event) => {
    // const file = event.target.files[0];
    // // console.log(file.name)
    // if (file) {
    //   const fileName = file;
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     image: fileName,
    //   }));
    // }
    // console.log(formData);



    const file = event.target.files[0]
    
    const { name, value } = event.target;
    // console.log(file.name)
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
    }
    console.log(formData);
  };

  const LogoutData = localStorage.getItem("login");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new FormData object
    const formDataMethod = new FormData();
    for (const key in formData) {
      formDataMethod.append(key, formData[key]);
    }

    console.log(formData);
    document.querySelector(".loaderBox").classList.remove("d-none");
    // Make the fetch request
    fetch(`${process.env.REACT_APP_API_URL}api/admin/course-add-update`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${LogoutData}`,
      },
      body: formDataMethod, // Use the FormData object as the request body
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(data);
        setShowModal(true);
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };

  const Coursecatigory = [
    {
      name: "Trending",
      code: "0",
    },
    {
      name: "IT & Software",
      code: "1",
    },
    {
      name: "Marketing",
      code: "2",
    },

    {
      name: "Science",
      code: "3",
    },

    {
      name: "Language",
      code: "3",
    },

    {
      name: "Law",
      code: "4",
    },
  ];
  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Add Course
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Course Title"
                          required
                          id="title"
                          type="text"
                          placeholder="Enter Course Title"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="course_name"
                          value={formData?.course_name}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Course Price"
                          required
                          id="price"
                          type="text"
                          placeholder="Enter price"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="course_price"
                          value={formData?.course_price}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Upload Course File"
                           
                          id="file"
                          type="file"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="course_file"
                          // value={formData.image}
                          onChange={filehandleChange}
                        />
                      </div>

                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Upload Course Image"
                           
                          id="file"
                          type="file"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="image"
                          // value={formData.image}
                          onChange={filehandleChange}
                        />
                      </div>

                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Upload Course Video"
                           
                          id="file"
                          type="file"
                          accept="video/*"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="course_demo_video"
                          // value={formData.image}
                          onChange={filehandleChange}
                        />
                      </div>

                      <div className="col-md-6 mb-4">
                     

                        <SelectBox
                          selectClass="mainInput"
                          name="category_id"
                          label="Course Category"
                          value={formData.category_id}
                          required
                          option={Coursecatigory}
                          onChange={handleChange}
                        />
                      </div>


                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Course Language"
                          required
                          id="course_language"
                          type="text"
                          placeholder="Enter Course Language"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="course_language"
                          value={formData?.course_language}
                          onChange={handleChange}
                        />
                      </div>




                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Course Start Date"
                          required
                          id="course_start_date"
                          type="date"
                          placeholder="Enter Course Language"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="course_start_date"
                          value={formData?.course_start_date}
                          onChange={handleChange}
                        />
                      </div>


                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Course End Date"
                          required
                          id="course_end_date"
                          type="date"
                          placeholder="Enter Course Language"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="course_end_date"
                          value={formData?.course_end_date}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-12 mb-4">
                      <p className="gap-2 d-flex">
                      Certificate
                                                <input
                                                    className="m-lg-2"
                                                    onClick={handleChange}
                                                    type="checkbox"
                                                    id="currently_working_check"
                                                    name="is_certified"
                                                    checked={checkpermission} 
                                                />
                                            </p>
                                            </div>
                      <div className="col-md-12 mb-4">
                        <div className="inputWrapper">
                          <div className="form-controls">
                            <label htmlFor="">Description</label>
                            <textarea
                              name="course_description"
                              className="form-control shadow border-0"
                              id=""
                              cols="30"
                              rows="10"
                              value={formData.course_description}
                              onChange={handleChange}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <CustomButton
                          variant="primaryButton"
                          text="Submit"
                          type="submit"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <CustomModal
          show={showModal}
          close={() => {
            setShowModal(false);
          }}
          success
          heading="Course added Successfully."
        />
      </DashboardLayout>
    </>
  );
};

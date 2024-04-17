import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFilePdf } from "@fortawesome/free-solid-svg-icons";

export const MedicalDetails = () => {

  const { id } = useParams();
  const base_url = process.env.REACT_APP_API_URL;
 

  const [data, setData] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);

  useEffect(() => {
    document.querySelector('.loaderBox')?.classList.remove("d-none");
    document.title = 'Wisdom For Life Admin | Subscription';
    const LogoutData = localStorage.getItem('login');

    fetch(`${base_url}/api/admin/view_userdetails/${id}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LogoutData}`
        },
      }
    )

      .then(response =>
        response.json()
      )
      .then((data) => {
        document.querySelector('.loaderBox')?.classList.add("d-none");
        console.log(data)
        setData(data.data);
      })
      .catch((error) => {
        document.querySelector('.loaderBox')?.classList.add("d-none");
        console.log(error)
      })


  }, []);

  const inActive = () => {
    setShowModal(false)
    setShowModal2(true)
  }
  const Active = () => {
    setShowModal3(false)
    setShowModal4(true)
  }



  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Medical Report Details
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <div className="row mb-3 justify-content-end">
                <div className="col-lg-4 text-end order-1 order-lg-2 mb-3">
                  {/* <button onClick={() => {
                    profileData.status ? setShowModal(true) : setShowModal3(true)
                  }} className="notButton primaryColor fw-bold text-decoration-underline">Mark as {profileData.status ? 'Inactive' : 'Active'}</button> */}
                  <span className="statusBadge statusBadgeActive">Active</span>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="row mb-5">
                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">Name</h4>
                      <p className="secondaryText text-capitalize">{data?.name}</p>
                      {/* <p className="secondaryText">{profileData.name}</p> */}
                    </div>
                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">BLOOD GROUP</h4>
                      <p className="secondaryText">{data?.user_details?.bloodgroupdetails?.name}</p>
                      {/* <p className="secondaryText">{profileData.email}</p> */}
                    </div>
                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">AGE</h4>
                      <p className="secondaryText">{data?.user_details?.age}</p>
                      {/* <p className="secondaryText">{profileData.number}</p> */}
                    </div>
                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">GENDER</h4>
                      <p className="secondaryText">{data?.user_details?.gender?.name}</p>
                      {/* <p className="secondaryText">{profileData.country}</p> */}
                    </div>
                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">Registered On</h4>
                      <p className="secondaryText">{data?.created_at}</p>
                    </div>
                    {/* <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">Allergy</h4>
                      <p className="secondaryText">{data?.allergy?.name}</p>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="row">

                {
                  data.user_category && data.user_category.map((item, index) => (
                    <div className="col-md-12 mb-3 p-4 shadow">
                      <div className="reportBoxCard" key={index}>
                        <div className="reportTitle">
                          <h5 className="font-weight-bold text-capitalize">{item?.name}</h5>
                        </div>
                        <div className="reportBox">
                          {item?.data && item?.data.map((reportData, index) => (
                            <div className="fileBox" key={index}>
                              <a href={base_url + '/' + reportData.file} target="_blank">
                                <FontAwesomeIcon icon={faFilePdf}></FontAwesomeIcon>
                              </a>
                              <p>{reportData?.file_name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                }

              </div>
            </div>
          </div>
        </div>

        <CustomModal show={showModal} close={() => { setShowModal(false) }} action={inActive} heading='Are you sure you want to mark this user as inactive?' />
        <CustomModal show={showModal2} close={() => { setShowModal2(false) }} success heading='Marked as Inactive' />

        <CustomModal show={showModal3} close={() => { setShowModal3(false) }} action={Active} heading='Are you sure you want to mark this user as Active?' />
        <CustomModal show={showModal4} close={() => { setShowModal4(false) }} success heading='Marked as Active' />
      </DashboardLayout>
    </>
  );
};
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomButton from "../../Components/CustomButton";

export const CourseDateil = () => {

    const { id } = useParams();

    const base_url = process.env.REACT_APP_API_URL

    const [data, setData] = useState({});

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);
    const [message, setMessage] = useState(false)

console.log("datadetil" , data)
    const inActive = () => {
        setShowModal(false)
        setShowModal2(true)
    }
    const Active = () => {
        setShowModal3(false)
        setShowModal4(true)
    }

    useEffect(() => {
        const LogoutData = localStorage.getItem('login');
        console.log("LogoutData"  , LogoutData )
        document.title = 'Tim Admin | Book Detail';
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`${process.env.REACT_APP_API_URL}api/admin/course-view/${id}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
            }
        )
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(data)

                setData(data.data)

            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error);
            })
    }, [id]);
    console.log(data)

    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                Course Details
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            {/* <div className="row mb-3 justify-content-end">
                <div className="col-lg-4 text-end order-1 order-lg-2 mb-3">
                  <button onClick={() => {
                    data?.status ? setShowModal(true) : setShowModal3(true)
                  }} className="notButton primaryColor fw-bold text-decoration-underline">Mark as {data?.status ? 'Inactive' : 'Active'}</button>
                  <span className={`statusBadge ${data?.status == 1 ? 'statusBadgeActive' : 'statusBadgeInactive'}`}>{data?.status == 1 ? 'Active' : 'Inactive'}</span>
                </div>
              </div> */}


                            <div className="row">
                                <div className="col-md-12 text-center mb-5">
                                    <h1 className="text-capitalize">{data?.title}</h1>
                                </div>
                                <div className="col-md-4 mb-4">
                                    {
                                        data?.image && data?.image ? (
                                            <div className="productImage">
                                                <img src={base_url + data?.image} />
                                            </div>
                                        ) : (
                                            <h3>No Image Available</h3>
                                        )
                                    }


                                </div>
                                <div className="col-md-6">
                                    <div className="productInfo">
                                        <h3 className="text-capitalize">{data?.course_name}</h3>
                                        <p className="text-capitalize">{data?.course_price}</p>
                                          
                                        <p className="text-capitalize">{data?.course_language}</p>
                                        <p className="text-capitalize">{data?.course_start_date}</p>
                                      
                                        <p className="text-capitalize">{data?.phone_number}</p>
                                        <p>{data?.course_description}</p>
                                    </div>
                                </div>
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


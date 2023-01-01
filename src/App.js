// import logo from './logo.svg';
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Card from "./components/Card";
import toast, { Toaster } from "react-hot-toast";

const getAPIURL = "https://servicesector.onrender.com/sectors";
const postUrl = "https://servicesector.onrender.com/userInfo";
const getUserInfoURL = "https://servicesector.onrender.com/userInfoGet";
function App() {
  const { register, handleSubmit } = useForm();
  const [sectors, setSecotrs] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  const notify = () => {
    toast.success("Successfully Add To Database || Refresh to See Update Data", {
      toastId: "success1",
    });
  };
  const onSubmit = (userData) => {
    // console.log(userData);
    axios({
      method: "post",
      url: postUrl,
      data: userData,
    });
  };

  useEffect(() => {
    getSelectors(getAPIURL);
    getUsersInfo(getUserInfoURL);
  }, []);

  const getSelectors = (selectorsReq) => {
    axios.get(selectorsReq).then((res) => {
      // console.log();
      setSecotrs(res.data[0].sectors);
    });
  };
  const getUsersInfo = (infoReq) => {
    axios.get(infoReq).then((res) => {
      // console.log(res.data);
      setUserInfo(res.data);
      // setSecotrs(res.d);
    });
  };

  return (
    <>
      <Toaster />
      <div className="w-[100%] flex  justify-center p-4">
        <div className="text-center  w-[50%] shadow-md">
          <h3 className="text-xl text-white">
            Please enter your name and pick the Sectors you are currently
            involved in.
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="p-4">
            <Toaster />
            <input
              required
              {...register("userName")}
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full max-w-xs"
            />
            <div className="p-4">
              <select
                required
                multiple="5"
                className="select select-bordered w-full max-w-xs"
                {...register("sectors")}
              >
                {sectors.map((sector) => {
                  return (
                    <option key={sector.id} value={sector?.name}>
                      {sector?.name}
                    </option>
                  );
                })}

                {/* <option>Who shot first?</option>
                <option>Han Solo</option>
                <option>Greedo</option> */}
              </select>
            </div>

            <div className=" flex justify-center items-center gap-2">
              <input
                required
                {...register("terms")}
                type="checkbox"
                className="checkbox checkbox-sm"
              />
              <span>Agree to Terms</span>
            </div>
            <input type="submit" onClick={notify} className="btn btn-success mt-4" />
          </form>
        </div>
        <div>
          {userInfo.map((user, index) => {
            return <Card key={index} user={user} />;
          })}
        </div>
      </div>
    </>
  );
}

export default App;

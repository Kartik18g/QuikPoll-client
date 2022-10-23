import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "../../utils/axios";
import AddQuestion from "../Forms/AddQuestion";

const Admin = ({ user,isAdmin,setIsAdmin }) => {
  const { id: pollId } = useParams();
  const verifyAdmin = async () => {
    try {
      const { data: response } = await axios.get(
        `/poll/verifyAdmin/${pollId}/${user._id}`
      );
      if (response.data.isAdmin) {
        setIsAdmin(true);
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  useEffect(()=>{
    verifyAdmin()
  },[])

  return <>{isAdmin ? (
    <div>
        <AddQuestion poll={pollId} />
    </div>
  ) : null}</>;
};

export default Admin;

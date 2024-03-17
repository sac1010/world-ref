import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import logout from "../assets/logout.svg";
import Modal from "../components/Modal";
import { signOut } from "firebase/auth";
import axios from "axios";
import Card from "../components/Card";
import Navbar from "../components/Navbar";

type Props = {};

export interface MediaData {
  id: string;
  data: any;
}
const Dashboard = (props: Props) => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [logoutModal, setLogoutModal] = useState(false);
  const [deals, setDeals] = useState([]);
  const [added, setAdded] = useState([]);

  const getData = async () => {
    const res = await axios.get("https://fakestoreapi.com/products");
    console.log(res.data);
    setDeals(res.data);
  };

  const fetchUserName = async () => {
    if (user) {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchUserName();
    getData();
  }, [user]);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className="w-full">
      <Navbar logout={logout} setLogoutModal={setLogoutModal} deals={added}></Navbar>
      <div className="w-full grid grid-cols-12 gap-6 p-4 pt-20">
        {deals.map((deal) => {
          return <Card deals={added} setDeal={setAdded} data={deal} />;
        })}
      </div>
      <Modal
        isOpen={logoutModal}
        onClose={() => {
          setLogoutModal(false);
        }}
      >
        <div>Are you sure you want to logout?</div>
        <div className="w-full flex justify-center gap-4 mt-4">
          <button
            onClick={handleLogout}
            className="bg-gray-600 text-white px-4 py-2 rounded-xl"
          >
            yes
          </button>
          <button
            onClick={() => setLogoutModal(false)}
            className="bg-gray-600 text-white px-4 py-2 rounded-xl"
          >
            No
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;

import {
  FaBell,
  FaChartBar,
  FaCog,
  FaFile,
  FaFileAlt,
  FaGlobe,
  FaHome,
  FaRocket,
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaWallet,
  FaWrench,
} from "react-icons/fa";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate, NavLink } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from "react";
import './dashboard.css';
function Dashboard() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="dash">
    <div className="dashboard-container">
         <div className="sidebar"><Sidebar /></div>
         <div className="main"><MainDashboard/></div>
      </div>
     
      {/* <button onClick={handleLogout}>Logout</button>
      <SalesOverviewChart /> */}
    </div>
  );
}
export function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />},
    { name: "Tables", icon: <FaChartBar />, class: 'menu-item'},
    { name: "Billing", icon: <FaWallet />, class: 'menu-item' },
    { name: "RTL", icon: <FaWrench />, class: 'menu-item' },
  ];

  const accountItems = [
    { name: "Profile", icon: <FaUser /> },
    { name: "Sign in", icon: <FaFile /> },
    { name: "Sign up", icon: <FaRocket /> },
  ];

  return (
    <div>
      <div className="logo">
        <img src="/vision-ui-logo.png" alt="logo" />
        <img src="/Vector.png" alt="vector" />
      </div>

      <ul className="menu">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`${item.class} ${
              activeItem === item.name ? "active" : ""
            }`}
            onClick={() => setActiveItem(item.name)}
          >
            <span className="menu-icon">{item.icon}</span>
            <a href="#">{item.name}</a>
          </li>
        ))}
      </ul>

      <ul className="menu second-menu">
        <h4>ACCOUNT PAGES</h4>
        {accountItems.map((item) => (
          <li
            key={item.name}
            className={`menu-item ${
              activeItem === item.name ? "active" : ""
            }`}
            onClick={() => setActiveItem(item.name)}
          >
            <span className="menu-icon">{item.icon}</span>
            <a href="#">{item.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}


const data = [
  { month: "Jan", light: 500, dark: 180 },
  { month: "Feb", light: 200, dark: 210 },
  { month: "Mar", light: 190, dark: 200 },
  { month: "Apr", light: 270, dark: 340 },
  { month: "May", light: 208, dark: 380 },
  { month: "Jun", light: 200, dark: 460 },
  { month: "Jul", light: 250, dark: 409 },
  { month: "Aug", light: 210, dark: 300 },
  { month: "Sep", light: 110, dark: 360 },
  { month: "Oct", light: 100, dark: 210 },
  { month: "Nov", light: 170, dark: 400 },
  { month: "Dec", light: 120, dark: 420 },
];

export function SalesOverviewChart() {
  return (
    <div className="w-full h-[350px] p-4 rounded-2xl shadow-sm bg-white">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Sales overview</h2>
        <p className="text-sm text-gray-400">(+5) more in 2021</p>
      </div>

      <ResponsiveContainer width="160%" height={260}>
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="lightGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5CE1E6" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#5CE1E6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="darkGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis domain={[0, 600]} tickLine={false} axisLine={false} />
          <Tooltip />

          {/* Bottom layer */}
          <Area
            type="monotone"
            dataKey="dark"
            stroke="#3B82F6"
            fill="url(#darkGradient)"
            strokeWidth={2}
          />

          {/* Top layer */}
          <Area
            type="monotone"
            dataKey="light"
            stroke="#5CE1E6"
            fill="url(#lightGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
export function MainDashboard(){
  const card = [{
    name: "Today's Money",
    amount: '$53,000',
    percentage: '+55%',
    icon: <FaWallet/>
  },
{
    name: "Today's Users",
    amount: '$2300',
    percentage: '+5%',
    icon: <FaGlobe/>
  },
{
    name: "New Clients",
    amount: '+3,052',
    percentage: '+14%',
    icon: <FaFileAlt/>
  },{
    name: "Total  Sales",
    amount: '$173,000',
    percentage: '+8%',
    icon: <FaShoppingCart/>
  },]
    return(
      <div className="main-dashboard">
        <div className="pages-dash">
          <div className="left">
            <p><span>Pages</span>/Dashboard</p>
            <h3>Dashboard</h3>
          </div>
          <div className="right">
            <input type="search" placeholder="Type here"/>
            <span className="search-icon"><FaSearch/></span>
            <p> <FaUser/> Sign In </p>
            <FaCog/>
            <FaBell/>
          </div>
        </div>
        <div className="four-cards">
          {card.map((item) => (
            <div key={item.name} className="cards">
              <div className="card-left">
                <p className="name">{item.name}</p>
                <p className="amount">{item.amount}</p> <span className="percent">{item.percentage}</span>
              </div>
             <span className="icon"> {item.icon}</span>
            </div>
          ))}
        </div>
      </div>
    )
}
export default Dashboard;
import olx from "../assets/olx.png";
import lens from "../assets/lens.png";
import arrow from "../assets/arrow.png";
import search from "../assets/search.png";
import Login from "./Login";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/LoginContext";

type searchProp = {
    setSearch: (value: string) => void;
};

const Navbar = (props: searchProp) => {
    const {user,logOut} = UserAuth()
    const [loginPop, setLoginPop] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const navigate = useNavigate()
    
    useEffect(() => {
        if(user){
            setIsLoggedIn(true);
        }else{
            setIsLoggedIn(false)
        }
    }, [user]);

    
    const handleLogout = () => {
        logOut()
        setIsLoggedIn(false); 
        navigate('/')
    };
  

    const handleRouting = () =>{ 
      if(user){
        navigate('/sell')
      }{
        setLoginPop(true)
      }
     
    }

    return (
      <>
          <div className="flex items-center justify-between p-4 bg-slate-100 shadow-md">
              
              <img src={olx} className="w-11 h-9" />
              
              
              <div className="flex border border-black w-64 p-2 bg-white items-center">
                  <img src={lens} className="w-6 h-5" />
                  <input placeholder="Location" className="ml-3 outline-none w-full" />
                  <img src={arrow} className="w-8 h-7" />
              </div>
  
              
              <div className="flex h-12 ml-4 border-2 border-black bg-white items-center">
                  <input
                      onChange={(e) => props?.setSearch(e.target.value)}
                      placeholder="find Cars, Mobile phones and more"
                      className="ml-3 w-96 outline-none"
                  />
                  <img src={search} className="ml-3 w-12 h-12" />
              </div>
  
              
              <div className="flex h-12 ml-4 cursor-pointer items-center">
                  <h1 className="font-semibold">ENGLISH</h1>
                  <img src={arrow} className="w-8 h-7 ml-2" />
              </div>
  
             
              {isLoggedIn ? (
                  <div
                      onClick={handleLogout}
                      className="flex h-12 p-3 cursor-pointer underline hover:no-underline items-center"
                  >
                      <h1 className="font-bold text-lg">Logout</h1>
                  </div>
              ) : (
                  <div
                      onClick={() => setLoginPop(!loginPop)}
                      className="flex h-12 p-3 cursor-pointer underline hover:no-underline items-center"
                  >
                      <h1 className="font-bold text-lg">Login</h1>
                  </div>
              )}
  
             
              <div className="w-28 flex h-12 p-2 ml-4 cursor-pointer rounded-full border border-yellow-500 items-center">
                  <h1 onClick={handleRouting} className="font-bold text-lg ml-3">+ SELL</h1>
              </div>
          </div>
  
         
          {loginPop && <Login setLoginPop={setLoginPop} />}
      </>
  );
  
  
};

export default Navbar;

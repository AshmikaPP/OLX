import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/setup";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/LoginContext";

type Product = {
  id: string;
  title: string;
  price: string;
  category: string;
  image?: string;
};

type ProductsProp = {
  products: Product[];
  search: string;
  menu: string;
};

const Home: React.FC<ProductsProp> = (props) => {
  const { user } = UserAuth();
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getfirebasedata = await getDocs(collection(db, "products"));
        const data = getfirebasedata.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    console.log("1111111111111111111111111111111", user);
    fetchData();
  }, [user]); // Added `user` as a dependency

  console.log(product, "dsfsdf");
  const combinedProducts = [...product, ...props.products];

  return (
    <div className="grid grid-cols-4 p-5">
      {combinedProducts
        .filter((data) =>
          data.title
            .toLowerCase()
            .includes(props.search.toLowerCase() || props.menu.toLowerCase())
        )
        .map((data) => (
          <Link to="/details" state={{ data }} key={data.id}>
            <div className="border border-spacing-1 p-2 ml-3 mt-3">
              <img src={data?.image} className="w-60 h-48" alt={data.title} />
              <h1 className="font-bold text-xl">${data.price}</h1>
              <h1>{data.title} </h1>
              <h1>{data.category}</h1>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Home;

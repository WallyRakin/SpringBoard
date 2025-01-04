import { Link } from "react-router-dom";

export default function Home() {
    return (<>
        <h1>Home</h1>
        <Link to={'/chips'} > chips </Link> <br />
        <Link to={'/soda'} > soda </Link> <br />
        <Link to={'/fries'} > fries </Link> <br />
        <Link to={'/burger'} > burger </Link> <br />
        <Link to={'/pizza'} > pizza </Link> <br />
        <Link to={'/candy'} > candy </Link> <br />
    </>)
};
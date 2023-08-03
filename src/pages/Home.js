import { Link } from "react-router-dom";

function Home() {
    return(
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'30px', margin:'auto', width:'600px', position:'relative'}}>
            <Link to="/signin" style={{width:'80%', height:'100px', backgroundColor:'aliceblue', display:'flex', justifyContent:'center', alignItems:'center', borderRadius:'30px', color:'black', fontSize:'24px', fontWeight:'bolder',textDecoration:'none', cursor:'pointer'}}>
                Sign In &rarr;
            </Link>
            <Link to="/signup" style={{width:'80%', height:'100px', backgroundColor:'aliceblue', display:'flex', justifyContent:'center', alignItems:'center', borderRadius:'30px', color:'black', fontSize:'24px', fontWeight:'bolder',textDecoration:'none', cursor:'pointer'}}>
                Sign Up &rarr;
            </Link>
            <Link to="/todo" style={{width:'80%', height:'100px', backgroundColor:'aliceblue', display:'flex', justifyContent:'center', alignItems:'center', borderRadius:'30px', color:'black', fontSize:'24px', fontWeight:'bolder',textDecoration:'none', cursor:'pointer'}}>
                Go To TodoList &rarr;
            </Link>
        </div>
    )
}

export default Home;
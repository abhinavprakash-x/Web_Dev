import { useState } from 'react';
import { useEffect } from 'react';

export default function App() {
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(1);

    useEffect(()=>{
        async function git_profile() {
            const response = await fetch(`https://api.github.com/users?per_page=${count}`);
            const data = await response.json();
            setUsers(data);
        }
        git_profile();
    }, [count]); // [count] = dependency array

    return (
        <>
            <h1>Github Users</h1>
            <input type="number" value={count} onChange={(e)=>setCount(e.target.value)}></input>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", flexWrap: "wrap"}}>
                {
                    users.map(user=>(
                        <img src={user.avatar_url} height={"100px"} width={"100px"} key={user.login}/>
                    ))
                }
            </div>
        </>
    );
}

export function Clock() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [show, setShow] = useState(true);

    useEffect(()=>{
        if(!show) return;

        const interval = setInterval(()=>{
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval);
    }, [show]);

    return (
        <>
            <button onClick={()=>setShow(!show)}>{show ? "Stop" : "Start"}</button>
            {
                show && <h1>Time: {time}</h1>
            }
        </>
    );
}
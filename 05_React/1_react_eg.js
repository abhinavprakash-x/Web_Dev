function Header({name}) {
    return (
        <h1>{name} Welcome to Indian Election Commission Website</h1>
    )
}

function Main({user}) {
    return (
        <>
            <h2>Hi {user.name}</h2>
            <h3>{user.age>18? "You are eligible for vote": "Your are not eligible for vote"}</h3>
            <p>Your city is {user.city}</p>
        </>
    )
}

function Footer() {
    return (
        <h3>Thanks for visiting our website</h3>
    )
}

function App() {
    return (
        <>
            <Header name="Abhinav"></Header>
            <Main user={{name:"Abhinav",age:21,city:"India"}}></Main>
            <Footer/>
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
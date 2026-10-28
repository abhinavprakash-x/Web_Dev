import Display from "./Display.jsx";

function Header({count}) {
    return (
        <>
            <h1>I am Header</h1>
            <Display count={count} />
        </>
    );
}

export default Header;
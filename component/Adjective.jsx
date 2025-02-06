function Adjective ({who}){
    const allCaps = who.toUpperCase()
    return(
        <div>
            <Bold>{allCaps} is great!</Bold>
        </div>)
};

function Bold ({children}) {
    return (
        <strong className="adjective">{children}</strong>
    )
}; 

export default Adjective;
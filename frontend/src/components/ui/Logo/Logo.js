const Logo = ({ boxSize = 30, fontSize = 24, color = '#4B0082', square='3' }) => {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: boxSize, height: boxSize, border: `${square}px solid ${color}`, borderRadius: "4px" }}>
            </div>
            <h1 style={{ fontSize: fontSize, color: color, margin:0}}>
                LOGO
            </h1>
        </div>
    )
}


export default Logo;
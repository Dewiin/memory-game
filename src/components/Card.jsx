import "../styles/card.css"

export function Card( {index, num, flash, onClick} ) {
    return (
        <div className={`memory-card ${flash === index ? "flash" : ""}`} onClick={(e) => onClick(e, index)} data-key={num} > {num} </div>
    );
}

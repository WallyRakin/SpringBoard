export function Story({ noun1, noun2, color, adjective, toggleSubmit }) {
    return (
        <form onSubmit={toggleSubmit}>
            <h2>There was a {color} {noun1} who loved a {adjective} {noun2}</h2>
            <button>Restart</button>
        </form>
    )
};